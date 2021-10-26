import React from 'react';
import { Text, View, Image, BackHandler, Dimensions, StatusBar, TouchableOpacity, ScrollView, TextInput, SafeAreaView, StyleSheet } from 'react-native';
import { colors } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { widthtoDP, heighttoDP } from './Responsive'
import { COLORS } from './theme'
import { WebView } from 'react-native-webview';
import { h, w } from '../utils/Dimensions'
GLOBAL = require('./globals');

export default class HospitalDepartments extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            alldoctor: [],
            allFacility: [],
            noData: '',
            text: '',
            searchtext: '',
            allmodifieddata: '',
            alloriginaldata: ''
        }
    }

    _onPress(item) {
        this.textInput.clear()
        this.setState({
            allmodifieddata: this.state.alloriginaldata,

        })
        this.props.navigation.navigate('DoctorFaclitiesList', {
            alldoctor: item.all_doctor,
            allFacility: item.all_allFacilty,
            alldept: item.title
        })
    }

    filterdata(text) {
        let searchtext = text
        console.log('searchtext =   ', searchtext)
        let filteredalldata = this.state.alloriginaldata.filter(x => x.title.toLowerCase().includes(searchtext.toLowerCase()))
        this.setState({
            allmodifieddata: filteredalldata
        })
    }

    UNSAFE_componentWillMount() {
        const { alldata } = this.props.route.params;
        this.setState({
            allmodifieddata: alldata,
            alloriginaldata: alldata
        })
    }

    Hospitaldetails(hospitalname1, hospitallocation1, hospitaldesc1, hospitalmultimg, hospitalvideo) {
        this.props.navigation.navigate('HospitalDetails', {
            hospitalname2: hospitalname1,
            hospitallocation2: hospitallocation1,
            hospitaldesc2: hospitaldesc1,
            hospitalmultimg1: hospitalmultimg,
            hospitalvideo1: hospitalvideo
        })
    }

    render() {
        const { hospitalname, hospitallocation, hospitaldesc, hospitalimg, hospitalmultimg, hospitalvideo } = this.props.route.params;
        console.log('allthedata ===  ', this.state.allthedata)
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <StatusBar barStyle="light-content" hidden={false}
                    backgroundColor='#3CB3C3'
                    translucent={true}>
                </StatusBar>
                <View style={{ flex: 1, backgroundColor: GLOBAL.primaryBackGroundColor }}>
                    <Text allowFontScaling={false} style={{
                        color: GLOBAL.primarylighttext2,
                        fontSize: h(3.7),
                        marginTop: h(8),
                        justifyContent: 'center',
                        alignSelf: 'center',
                    }}>Details</Text>
                </View>

                <View style={{ flex: 6, backgroundColor: GLOBAL.primaryBackGroundColor, padding: h(1.5) }}>

                    <View
                        style={{
                            borderRadius: 8,
                            paddingBottom: h(0.6),
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
                        <TouchableOpacity style={{}}
                            onPress={() => this.Hospitaldetails(hospitalname, hospitallocation, hospitaldesc, hospitalmultimg, hospitalvideo)}
                        >
                            <View style={{
                                color: COLORS.black,
                                borderRadius: 20,
                                backgroundColor: GLOBAL.primaryTOuchablecolor,
                                flexDirection: 'row',
                                // marginRight: h(19),
                                marginBottom: h(0),
                                height: h(22), width: w(95)
                            }}>
                                <View style={styles.flex2_view11}>
                                    <Image style={styles.flex2_view1_image} source={{ uri: hospitalimg }} />
                                </View>
                                <View style={{ marginLeft: h(0.5), width: w(50) }}
                                // style={styles.flex2_view2}
                                >
                                    <Text allowFontScaling={false} numberOfLines={3} style={{
                                        fontSize: h(2.3),
                                        fontWeight: 'bold',
                                        marginTop: h(3), color: GLOBAL.primarylighttext2
                                    }}>{hospitalname}</Text>

                                    <Text allowFontScaling={false} numberOfLines={2} style={{
                                        fontSize: h(1.75),
                                        fontWeight: 'bold',
                                        color: GLOBAL.primaryBackGroundColor != "white" ? GLOBAL.primarylighttext1 : '#008080',
                                        marginTop: h(0.5),
                                    }}>{hospitallocation}</Text>

                                    <Text allowFontScaling={false} numberOfLines={2} style={{
                                        fontSize: h(1.6),
                                        fontWeight: 'bold',
                                        color: GLOBAL.primarylighttext2,
                                        marginTop: h(1.7),
                                    }}>{hospitaldesc}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <View style={{ paddingHorizontal: h(2.5), marginTop: h(1) }}>
                            {/* <Text style={styles.flex2_view3_text1}>Departments</Text> */}
                            <View style={{
                                width: w(85), height: h(6), marginBottom: h(1), marginTop: h(2),
                                backgroundColor: '#3CB3C3', borderRadius: 20, alignSelf: 'center', flexDirection: 'row'
                            }}>
                                <TextInput
                                    ref={input => { this.textInput = input }}
                                    allowFontScaling={false}
                                    style={{ width: '80%', paddingLeft: h(5), fontSize: h(2.2) }}
                                    placeholder="Type here..."
                                    onChangeText={(text) => this.filterdata(text)}
                                />
                                <TouchableOpacity style={{ width: '20%', alignItems: 'center', justifyContent: 'center', }}>
                                    <Image source={require('../assets/icons/search.png')} style={{ height: h(3), width: h(3), resizeMode: 'contain' }} />
                                </TouchableOpacity>
                            </View>
                            {/* <TextInput
                                style={{ height: 50, width: 250, borderWidth: 2 }}
                                onChangeText={(text) => this.filterdata(text)}
                            /> */}
                            <FlatList
                                data={this.state.allmodifieddata}
                                contentContainerStyle={{ paddingBottom: h(40) }}
                                showsVerticalScrollIndicator={false}
                                // styles.flatlist_box}
                                keyExtractor={(item, index) => item + index}
                                renderItem={({ item }) =>
                                    <TouchableOpacity onPress={() => this._onPress(item)} style={{ paddingVertical: h(1.5) }}>
                                        <View
                                            style={{
                                                borderRadius: 8,
                                                paddingBottom: h(0.6),
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
                                            <View style={{
                                                shadowOffset: {
                                                    width: h(50),
                                                    height: -h(100)
                                                },
                                                shadowOpacity: 20,
                                                shadowRadius: 40,
                                                // shadowColor: 'red',
                                                elevation: h(1),
                                                marginRight: h(1),
                                                //borderWidth: 1,
                                                backgroundColor: GLOBAL.primaryTOuchablecolor, borderRadius: 8,
                                                flexDirection: 'row', padding: h(2)
                                            }}
                                            // styles.flatlist_view1}
                                            >
                                                <View>
                                                    <Image style={{
                                                        width: h(10),
                                                        height: h(10),
                                                        borderRadius: 5
                                                    }}
                                                        // styles.flatlist_image
                                                        source={{ uri: item.image }} />
                                                </View>
                                                <View style={{
                                                    color: COLORS.black,
                                                    paddingLeft: h(2),
                                                    paddingRight: h(8),
                                                }}
                                                // styles.flatlist_view2}
                                                >
                                                    <Text style={{
                                                        fontWeight: 'bold',
                                                        fontSize: h(1.8),
                                                        color: 'black',
                                                    }}>{item.title}</Text>
                                                    <Text style={{
                                                        fontWeight: 'bold',
                                                        fontSize: h(1.65),
                                                        marginTop: h(0.8),
                                                        //marginRight:h(5),
                                                        color: GLOBAL.primaryBackGroundColor != "white" ? GLOBAL.primarylighttext2 : '#008080',
                                                    }}>{item.short_description}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                }
                            ></FlatList>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    flex1_text1:
    {
        color: GLOBAL.primarylighttext1,
        fontSize: h(3.7),
        marginTop: h(8),
        justifyContent: 'center',
        alignSelf: 'center',
    },
    flex2_view1:
    {
        color: COLORS.black,
        borderRadius: 20,
        backgroundColor: GLOBAL.primaryTOuchablecolor,
        flexDirection: 'row',
        // marginRight: h(19),
        marginBottom: h(0),
        height: h(22), width: w(95)
    },
    flex2_view1_image:
    {
        width: h(18),
        height: h(18),
        borderRadius: 10
    },
    flex2_view2:
    {

    },
    flex2_view2_text1:
    {
        fontSize: h(2.3),
        fontWeight: 'bold',
        marginTop: h(3), color: GLOBAL.primarylighttext2,

    },
    flex2_view2_text2:
    {
        fontSize: h(1.75),
        fontWeight: 'bold',
        color: COLORS.blue,
        marginTop: h(0.5),
    },
    flex2_view2_text3:
    {
        fontSize: h(1.6),
        fontWeight: 'bold',
        color: GLOBAL.primarylighttext2,
        marginTop: h(1.7),
        // paddingRight: h(10)
    },
    flex2_view3_text1:
    {
        fontSize: h(3.1),
        fontWeight: 'bold',
        //paddingTop: h(7),
        //paddingLeft: h(3),
        paddingBottom: h(4)
    },
    flex2_view11:
    {
        height: h(22),
        borderRadius: 10,
        padding: h(2),
        // backgroundColor: 'yellow'
    },
    flatlist_view1:
    {
        backgroundColor: 'white',
        color: COLORS.black,
        borderRadius: 7,
        marginVertical: heighttoDP(number = '2.5%'),
        alignSelf: 'center',
        width: widthtoDP(number = '85%'),
        height: heighttoDP(number = '13%'),
        flexDirection: 'row',
        shadowOffset: {
            width: 80,
            height: -80
        },
        shadowOpacity: 20,
        shadowRadius: 40,
        elevation: 5,
    },
    flatlist_image:
    {
        marginTop: heighttoDP(number = '1%'),
        marginLeft: widthtoDP(number = '3.5%'),
        width: heighttoDP(number = '10%'),
        height: heighttoDP(number = '10%'),
        borderRadius: 5
    },
    flatlist_text1:
    {
        fontWeight: 'bold',
        fontSize: h(1.8),
        color: GLOBAL.primarylighttext1,
    },
    flatlist_text4:
    {
        fontWeight: 'bold',
        fontSize: h(1.65),
        marginTop: h(0.8),
        //marginRight:h(5),
        color: GLOBAL.primarylighttext2,
    },
    flatlist_text2:
    {
        fontWeight: 'bold',
        color: COLORS.blue,
        fontSize: heighttoDP(number = '1.4%'),
        width: widthtoDP(number = '60%'),
    },
    flatlist_view2:
    {
        color: COLORS.black,
        borderRadius: 20,
        marginLeft: h(4),
    },
    flatlist_box:
    {
        paddingBottom: heighttoDP(number = '32%'),
        marginTop: -(heighttoDP(number = '0.5%')),
        paddingTop: heighttoDP(number = '2%'),

    },
})