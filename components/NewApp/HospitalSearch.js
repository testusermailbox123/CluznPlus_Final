
import React from 'react';
import {
    Switch, Text, View, Image, Alert, FlatList, VirtualizedList, TouchableWithoutFeedback, ActivityIndicator, ImageBackground,
    Keyboard, KeyboardAvoidingView, Dimensions, BackHandler, TouchableOpacity, StatusBar, ScrollView,
    TextInput, SafeAreaView, StyleSheet,Button
} from 'react-native';
import { widthtoDP, heighttoDP } from './Responsive'
import { COLORS } from './theme'
import axios from 'axios';
import AutoCompleteInputView from "native-autocomplete-input";
import { h, w } from '../utils/Dimensions'
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
import SelectDropdown from 'react-native-select-dropdown'
import { SliderBox } from "react-native-image-slider-box";
var counter = 0;
GLOBAL = require('./globals');

export default class HospitalSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hospitalList: [],
            alldata: [],
            isEnabled: false,
            hospitalname: '',
            hospitallocation: '',
            hospitaldesc: '',
            cityname1: '',
            cityList: '',
            tagList: [],
            myCity: '',
            myCity1: "",
            hospitalimg: '',
            tokenfromlogin: '',
            search: '',
            screenName: 'hospitalsearch',
            search_value: '',
            isloading: true,
            activeIndex: 0,
            imagename: '',
            isEnabled: false,
            images: [

            ]
        }
        this.switchValueChnage = this.switchValueChnage.bind(this);
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.generateHospitalList();
        this.getCityList()
        BackHandler.addEventListener('hardwareBackPress', function () {
            // console.log(navigation.isFocused());
            if (navigation.isFocused()) {
                Alert.alert(
                    'Exit App',
                    'Are you sure you want to exit?',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                        },
                        {
                            text: 'Yes',
                            onPress: () => {
                                return BackHandler.exitApp();
                            }
                        },
                    ],
                    { cancelable: false },
                );
                return true;
            }
            return false;
        });
    }

    generateHospitalList(selectedItem = this.state.cityname1, search_value = this.state.search_value) {
        if (counter == 0) {
            this.setState({ isloading: true })
        }
        counter = counter + 1
        const { authtokenfromEnterNameDetails } = this.props.route.params;
        const data = {
            search_value: search_value,
            limit: 15,
            page: counter,
            cityName: selectedItem
        }
        console.log('token --- ', authtokenfromEnterNameDetails);
        axios.post('http://cluznplus.com/cluzn_backend/api/hospital/', data, {
            headers: {
                token: authtokenfromEnterNameDetails
            }
        })
            .then(response => {
                if (counter == 1) {
                    this.setState({
                        hospitalList: [],
                    });
                }
                this.setState({
                    hospitalList: [...this.state.hospitalList, ...response.data.data],
                    filterhospitalList: response.data.data,
                    images: response.data.adsdata,
                    allDepartment: this.state.hospitalList,
                    isloading: false
                });
                // console.log("hospitalList", this.state.hospitalList);
                // console.log("res", response.data.data);
            })
            .catch((error) => {
                 console.log('error ' + error);
                this.setState({ hospitalList: [] })
            });
    }

    switchValueChnage() {
        if (!this.state.isEnabled) {
            //Code commented from line 124 to 132 as app will be in dark theme
            // GLOBAL.primaryBackGroundColor = 'white';
            // GLOBAL.primaryTOuchablecolor = '#DFEEFF';
            // GLOBAL.primaryBackGroundColorforBlue = '#3CB3C3';
            // GLOBAL.primarylighttext1 = 'white';
            // GLOBAL.primarylighttext2 = 'black';
            // GLOBAL.primarylighttext3 = '#18D5F2';
            // // GLOBAL.primarybuttonselect = GLOBAL.primaryBackGroundColor == 'white' ? [] : item.multi_images,
            // GLOBAL.primarybuttonselect = '#E0FFFF';
            // GLOBAL.primarybuttonunselect = 'white';
            GLOBAL.primaryBackGroundColor = 'black';
            // primaryBackGroundColor = 'black';
            GLOBAL.primaryTOuchablecolor = '#317F8B';
            GLOBAL.primaryBackGroundColorforBlue = '#317F8B';
            GLOBAL.primarylighttext1 = 'black';
            GLOBAL.primarylighttext2 = 'white';
            GLOBAL.primarylighttext3 = '#18D5F2';
            GLOBAL.primarybuttonselect = 'grey';
            GLOBAL.primarybuttonunselect = 'white';
        } else {
            GLOBAL.primaryBackGroundColor = 'black';
            // primaryBackGroundColor = 'black';
            GLOBAL.primaryTOuchablecolor = '#317F8B';
            GLOBAL.primaryBackGroundColorforBlue = '#317F8B';
            GLOBAL.primarylighttext1 = 'black';
            GLOBAL.primarylighttext2 = 'white';
            GLOBAL.primarylighttext3 = '#18D5F2';
            GLOBAL.primarybuttonselect = 'grey';
            GLOBAL.primarybuttonunselect = 'white';

        }
        this.setState({
            isEnabled: !this.state.isEnabled
        });
    }

    _onEndReachedThreshold() {
        // console.log('in _onEndReachedThreshold')
        this.generateHospitalList()
    }

    getCityList() {

        const { authtokenfromEnterNameDetails } = this.props.route.params;

        axios.get('http://cluznplus.com/cluzn_backend/api/getCity', {

            headers: {
                token: authtokenfromEnterNameDetails
            }
        })
            .then(response => {
                // console.log('all data   ', response.data);
                this.setState({
                    cityList: response.data.data,
                    tagList: response.data.tagdata,
                    isloading: false,
                    // myCity1: ''
                    // myCity1: this.state.cityList[0]
                });

            })
            .catch((error) => {
                // console.log('error ' + error);
                this.setState({ cityList: [] })
            });
    }

    // onChangeText(text) {
    //     console.log(text);
    //     this.setState({ search_value: text });
    // }

    // citynameset(selectedItem) {
    //     // console.log('data1  --- ', data1)
    //     // this.setState({ myCity1: data1 })
    //      console.log('this.state.cityname before setstate --- ', this.state.myCity1)
    //      console.log('this.state.data1 before setstate --- ', selectedItem)
    //     // this.setState({ myCity1: selectedItem + this.state.myCity1 })
    //     this.setState({ myCity1: selectedItem }, () => {
    //         myCity1: selectedItem
    //     });
    //      console.log('this.state.data1  after setstate --- ', selectedItem)
    //      console.log('this.state.myCity1 after setstate  --- ', this.state.myCity1)
    // }

    _onPress(item) {
        this.props.navigation.navigate('HospitalDepartments', {
            alldata: item.allDepartments,
            hospitalname: item.name,
            hospitallocation: item.location,
            hospitaldesc: item.description,
            hospitalimg: item.image,
            hospitalmultimg: item.multi_images == null ? [] : item.multi_images,
            hospitalvideo: item.video
        });
    }

    citynameset(selectedItem) {
        counter = 0
        this.setState({
            hospitalList: []
        });
        // console.log('in citynameset')
        this.generateHospitalList(selectedItem);
    }

    render() {
        // console.log('this.state.myCity --', this.state.myCity)
        if (this.state.isloading) {
            return (
                <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                    <StatusBar barStyle="light-content" hidden={false}
                        backgroundColor='#3CB3C3'

                        translucent={true}>
                    </StatusBar>

                    <View style={{ height: h(32), width: width, backgroundColor: GLOBAL.primaryBackGroundColorforBlue, paddingHorizontal: w(10) }}>
                        <View>
                            <View style={{ paddingTop: h(5.8), flexDirection: 'row', paddingBottom: h(2.5) }}>
                                <Image source={require('../assets/icons/Icon.png')}
                                    style={{ height: h(7), width: h(7) }}
                                />
                                <View style={{ paddingTop: h(0.5) }}>
                                    <View style={{ flexDirection: 'row', marginLeft: w(2) }}>
                                        <Text allowFontScaling={false} style={{ fontSize: h(2.8), color: GLOBAL.primarylighttext1, fontWeight: "bold" }}>Cluzn </Text>
                                        <Text allowFontScaling={false} style={{ fontSize: h(2.8), color: 'red', fontWeight: "bold" }}>Plus</Text>
                                    </View>
                                    <Text allowFontScaling={false} style={{ fontSize: h(1.5), color: GLOBAL.primarylighttext1, marginLeft: w(2) }}>Your Caring Partner</Text>
                                </View>
                                <Switch style={{ marginLeft: w(31) }}
                                    trackColor={{ false: "#7F7E7F", true: "#7F7E7F" }}
                                    thumbColor={this.state.isEnabled ? "#ffff" : "#6FF5E7"}
                                    ios_backgroundColor="#3e3e3e"
                                    value={this.state.isEnabled}
                                    onValueChange={this.switchValueChnage}
                                />
                            </View>
                            {/* <View style={{ flexDirection: 'row', height: h(5.5), marginTop: -h(1.5),alignItems: 'center', justifyContent: 'center' }}> */}
                            <View >
                                <Text allowFontScaling={false} style={{ fontSize: h(2.7), color: GLOBAL.primarylighttext1, alignSelf: 'flex-start' }}>Select City</Text>
                            </View>
                            <View >
                                <SelectDropdown
                                    defaultValue="All City"
                                    dropdownStyle={{ width: h(4), backgroundColor: 'white', fontSize: h(5), height: h(25), marginTop: -h(3) }}
                                    rowStyle={{ height: h(5) }}
                                    defaultButtonText="All City"
                                    buttonStyle={{ width: h(20), height: h(4.5), color: GLOBAL.primarylighttext2, backgroundColor: 'white', borderRadius: h(1), alignSelf: 'flex-end', marginTop: -w(7) }}
                                    data={this.state.cityList}
                                    onSelect={(selectedItem, index) => {
                                        console.log(selectedItem, index)
                                        this.setState({
                                            cityname1: selectedItem
                                        })
                                        this.citynameset(selectedItem)
                                    }}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        // text represented after item is selected
                                        // if data array is an array 
                                        // console.log('selectedItem  ', selectedItem)
                                        // this.setState({ myCity1: selectedItem })
                                        // console.log('myCity1 in drop down  ', this.state.myCity1)
                                        return selectedItem

                                    }}
                                    //buttonTextAfterSelection={this.state.cityname}
                                    rowTextForSelection={(item, index) => {
                                        // text represented for each item in dropdown
                                        // if data array is an array of objects then return item.property to represent item in dropdown
                                        return item
                                    }}
                                />
                            </View>
                            {/* </View> */}
                            <View style={{ height: h(5), marginTop: h(1) }}>
                                <Text allowFontScaling={false} style={{ fontSize: h(1.7), color: 'black' }}>Search by Hospital, Doctor, Disease, Services</Text>
                            </View>
                        </View>
                        <AutoCompleteInputView
                            placeholder="Type here...."
                            placeholderTextColor="black"
                            underlineColorAndroid='transparent'
                            suggestions={this.state.tagList}
                            containerStyle={{ color: 'black', backgroundColor: 'white', borderWidth: 0, }}
                            onChangeText={(value) => {
                                // console.log("Times12121")
                                counter = 0;
                                this.setState({ search_value: value, hospitalList: [] })
                                if (value == "") {
                                    // console.log("blank is called **************************************")
                                    this.setState({ hospitalList: [] })
                                    this.generateHospitalList(this.state.cityname1, "")
                                } else {
                                    this.generateHospitalList(this.state.cityname1, value)
                                }

                            }}
                            onChangeSuggestion={(index, value) => {
                                counter = 0;
                                this.setState({ search_value: value, hospitalList: [] })
                                this.generateHospitalList(this.state.cityname1, value)
                            }}
                            textColor={'black'}
                            fontSize={h(2)}
                            style={{
                                paddingLeft: 10,
                                width: w(80), height: h(6), backgroundColor: 'white', color: 'black', marginTop: -h(1),
                                borderWidth: 0.5, fontSize: h(2.5), borderRadius: 10, alignSelf: 'center', justifyContent: 'center'
                            }}
                        />
                    </View>
                    {/* <View style={{ height: h(20) }}>
                        <SliderBox
                            images={this.state.images}
                            sliderBoxHeight={h(18)}
                            autoplay
                            disableOnPress
                            circleLoop
                            dotStyle={{
                                width: 0,
                                height: 0,
                                borderRadius: 0,
                            }}
                        />
                    </View> */}
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: GLOBAL.primaryBackGroundColor }} >
                        {/* <ActivityIndicator animating={this.state.isloading} size="large" color="#357DF9" /> */}
                        <ActivityIndicator animating={this.state.isloading} size="large" color="red" />
                        <Text style={{ fontSize: h(2.5), color: '#3CB3C3' }}>Hang On..</Text>
                        <Text style={{ fontSize: h(2.5), color: '#3CB3C3' }}>We are getting the details for you..</Text>
                    </View>
                </SafeAreaView>

            )
        }
        else {
            const { search } = this.state;
            return (
                <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                    <StatusBar barStyle="light-content" hidden={false}
                        backgroundColor='#3CB3C3'

                        translucent={true}>
                    </StatusBar>

                    <View style={{ height: h(32), width: width, backgroundColor: GLOBAL.primaryBackGroundColorforBlue, paddingHorizontal: w(10) }}>
                        <View>
                            <View style={{ paddingTop: h(5.8), flexDirection: 'row', paddingBottom: h(2.5) }}>
                                <Image source={require('../assets/icons/Icon.png')}
                                    style={{ height: h(7), width: h(7) }}
                                />
                                <View style={{ paddingTop: h(0.5) }}>
                                    <View style={{ flexDirection: 'row', marginLeft: w(2) }}>
                                        <Text allowFontScaling={false} style={{ fontSize: h(2.8), color: GLOBAL.primarylighttext1, fontWeight: "bold" }}>Cluzn </Text>
                                        <Text allowFontScaling={false} style={{ fontSize: h(2.8), color: 'red', fontWeight: "bold" }}>Plus</Text>
                                        <Button
                                        title="CluznPlus Eva"
                                        onPress={() => {
                                            this.props.navigation.navigate('HomePage')}}/>
                                    </View>
                                    <Text allowFontScaling={false} style={{ fontSize: h(1.5), color: GLOBAL.primarylighttext1, marginLeft: w(2) }}>Your Caring Partner</Text>
                                </View>
                                <Switch style={{ marginLeft: w(31) }}
                                    trackColor={{ false: "#7F7E7F", true: "#7F7E7F" }}
                                    thumbColor={this.state.isEnabled ? "#ffff" : "#6FF5E7"}
                                    ios_backgroundColor="#3e3e3e"
                                    value={this.state.isEnabled}
                                    onValueChange={this.switchValueChnage}
                                />
                            </View>
                            {/* <View style={{ flexDirection: 'row', height: h(5.5), marginTop: -h(1.5),alignItems: 'center', justifyContent: 'center' }}> */}
                            <View >
                                <Text allowFontScaling={false} style={{ fontSize: h(2.7), color: GLOBAL.primarylighttext1, alignSelf: 'flex-start' }}>Select City</Text>
                            </View>
                            <View >
                                <SelectDropdown
                                    defaultValue="All City"
                                    dropdownStyle={{ width: h(4), backgroundColor: 'white', fontSize: h(5), height: h(25), marginTop: -h(3) }}
                                    rowStyle={{ height: h(5) }}
                                    defaultButtonText="All City"
                                    buttonStyle={{ width: h(20), height: h(4.5), color: GLOBAL.primarylighttext2, backgroundColor: 'white', borderRadius: h(1), alignSelf: 'flex-end', marginTop: -w(7) }}
                                    data={this.state.cityList}
                                    onSelect={(selectedItem, index) => {
                                        // console.log(selectedItem, index)
                                        this.setState({
                                            cityname1: selectedItem
                                        })
                                        this.citynameset(selectedItem)
                                    }}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        // text represented after item is selected
                                        // if data array is an array 
                                        // console.log('selectedItem  ', selectedItem)
                                        // this.setState({ myCity1: selectedItem })
                                        // console.log('myCity1 in drop down  ', this.state.myCity1)
                                        return selectedItem

                                    }}
                                    //buttonTextAfterSelection={this.state.cityname}
                                    rowTextForSelection={(item, index) => {
                                        // text represented for each item in dropdown
                                        // if data array is an array of objects then return item.property to represent item in dropdown
                                        return item
                                    }}
                                />
                            </View>
                            {/* </View> */}
                            <View style={{ height: h(5), marginTop: h(1) }}>
                                <Text allowFontScaling={false} style={{ fontSize: h(1.7), color: 'black' }}>Search by Hospital, Doctor, Disease, Services</Text>
                            </View>
                        </View>
                        <AutoCompleteInputView
                            placeholder="Type here...."
                            placeholderTextColor="black"
                            underlineColorAndroid='transparent'
                            suggestions={this.state.tagList}
                            containerStyle={{ color: 'black', backgroundColor: 'white', borderWidth: 0, }}
                            onChangeText={(value) => {
                                // console.log("Times12121")
                                counter = 0;
                                this.setState({ search_value: value, hospitalList: [] })
                                if (value == "") {
                                    // console.log("blank is called **************************************")
                                    this.setState({ hospitalList: [] })
                                    this.generateHospitalList(this.state.cityname1, "")
                                } else {
                                    this.generateHospitalList(this.state.cityname1, value)
                                }

                            }}
                            onChangeSuggestion={(index, value) => {
                                counter = 0;
                                this.setState({ search_value: value, hospitalList: [] })
                                this.generateHospitalList(this.state.cityname1, value)
                            }}
                            textColor={'black'}
                            fontSize={h(2)}
                            style={{
                                paddingLeft: 10,
                                width: w(80), height: h(6), backgroundColor: 'white', color: 'black', marginTop: -h(1),
                                borderWidth: 0.5, fontSize: h(2.5), borderRadius: 10, alignSelf: 'center', justifyContent: 'center'
                            }}
                        />
                    </View>
                    <View style={{ height: h(21) }}>
                        <SliderBox
                            images={this.state.images}
                            sliderBoxHeight={h(21)}
                            autoplay
                            // disableOnPress
                            circleLoop
                            dotStyle={{
                                width: 0,
                                height: 0,
                                borderRadius: 0,
                            }}
                        />
                    </View>
                    <View style={{ backgroundColor: GLOBAL.primaryBackGroundColor, paddingHorizontal: h(1) }}>

                        <FlatList
                            data={this.state.hospitalList}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: h(55) }}
                            showsVerticalScrollIndicator={false}
                            onEndReachedThreshold={0.08} // Tried 0, 0.01, 0.1, 0.7, 50, 100, 700
                            onEndReached={({ distanceFromEnd }) => {
                                this.generateHospitalList()
                            }}
                            keyExtractor={(item, index) => item + index}
                            renderItem={({ item }) =>
                                <TouchableOpacity style={{ paddingVertical: h(1) }}
                                    onPress={() => this._onPress(item)}>
                                    <View
                                        style={{
                                            borderRadius: 8,
                                            padding: h(0.5),
                                            shadowOffset: {
                                                width: h(50),
                                                height: -h(100)
                                            },
                                            shadowColor: GLOBAL.primarylighttext1 == 'white' ? 'black' : 'white',
                                            shadowOpacity: 30,
                                            shadowRadius: 30,
                                            elevation: 3,
                                            zIndex: 999,
                                        }}>
                                        <View
                                            style={{
                                                backgroundColor: GLOBAL.primaryTOuchablecolor,
                                                borderRadius: 8,
                                                flexDirection: 'row', padding: h(2),
                                                shadowOffset: {
                                                    width: h(50),
                                                    height: -h(100)
                                                },
                                                shadowColor: "black",
                                                shadowOpacity: 30,
                                                shadowRadius: 30,
                                                elevation: 3,
                                                zIndex: 999,
                                            }}>
                                            <View>
                                                <Image
                                                    style={{
                                                        width: h(7.5),
                                                        height: h(7.5),
                                                        borderRadius: 50,
                                                        borderWidth: 0.2,
                                                        borderColor: 'black'
                                                    }}
                                                    source={{ uri: item.image }} />
                                            </View>
                                            <View
                                                style={{
                                                    backgroundColor: GLOBAL.primaryTOuchablecolor,
                                                    color: COLORS.black,
                                                    paddingLeft: h(2), width: w(70),
                                                    paddingRight: h(6),
                                                }}
                                            >
                                                <Text style={{
                                                    fontWeight: 'bold',
                                                    fontSize: h(2),
                                                    color: GLOBAL.primarylighttext2
                                                }}>{item.name.substring(0, 90)}</Text>
                                                <Text style={{
                                                    color: GLOBAL.primaryBackGroundColor != "white" ? GLOBAL.primarylighttext1 : '#008080',
                                                    fontSize: h(1.5),
                                                    marginTop: h(0.6),
                                                    fontWeight: 'bold',
                                                }}>{item.location.substring(0, 150)}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            }
                        ></FlatList>

                    </View>

                </SafeAreaView>

            )
        }
    }
}

const styles = StyleSheet.create({
    flex1_text1:
    {
        color: COLORS.white,
        fontSize: h(3.5),
        fontWeight: 'bold',
        // marginLeft: widthtoDP(number = '8%'),
        // marginTop: heighttoDP(number = '5.5%'),
        //textAlignVertical: 'top'

    },
    flex1_text2:
    {
        color: COLORS.white,
        fontSize: h(3.5),
        marginLeft: -(widthtoDP(number = '3%')),
        //fontWeight: 'bold',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: heighttoDP(number = '2%'),
    },
    flex1_textinput1:
    {
        marginTop: heighttoDP(number = '3%'),
        backgroundColor: COLORS.white,
        borderRadius: 40,
        //textAlign: 'center',
        fontWeight: 'bold',
        height: heighttoDP(number = '6%'),
        width: widthtoDP(number = '85%'),
        //justifyContent: 'center',
        alignSelf: 'center',
        fontSize: heighttoDP(number = '2.2%'),
    },
    flex1_image1:
    {
        marginLeft: widthtoDP(number = '82%'),
        marginTop: -(heighttoDP(number = '4.5%')),
        height: heighttoDP(number = '3%'),
        width: widthtoDP(number = '7%'),
    },
    flex2_text1:
    {
        color: COLORS.black,
        fontSize: h(3.5),
        fontWeight: 'bold',
        paddingTop: h(1),
        paddingBottom: h(0.7)
    },
    flatlist_view1:
    {
        backgroundColor: '#DFEEFF',
        color: COLORS.black,
        borderRadius: 8,
        alignSelf: 'center',
        flexDirection: 'row',
        padding: h(2)
    },
    flatlist_box:
    {
        paddingBottom: h(35),
        paddingTop: h(3),
    },
    flatlist_touchable:
    {
        backgroundColor: '#DFEEFF'
    },
    flatlist_image:
    {
        marginTop: heighttoDP(number = '1%'),
        marginLeft: widthtoDP(number = '3.5%'),
        width: widthtoDP(number = '15%'),
        height: widthtoDP(number = '15%'),
        borderRadius: 50,
        borderWidth: 0.5,
        borderColor: 'black'
    },
    flatlist_view2:
    {
        backgroundColor: '#DFEEFF',
        color: COLORS.black,
        borderRadius: 20,
        alignSelf: 'center',
        marginLeft: widthtoDP(number = '4%'),
    },
    flatlist_text1:
    {
        fontWeight: 'bold',
        fontSize: h(2),
        color: GLOBAL.primarylighttext1
    },
    flatlist_text2:
    {
        color: '#3CB3C3',
        fontSize: h(1.5),
        marginTop: h(0.6),
        fontWeight: 'bold',
    }
})