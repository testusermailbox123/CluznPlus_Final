
import React from 'react';
import { Text, FlatList, View, Image, Dimensions, TouchableOpacity, ScrollView, TextInput, SafeAreaView, StyleSheet } from 'react-native';
import { widthtoDP, heighttoDP } from './Responsive'
import { COLORS } from './theme'
import { StatusBar } from 'react-native'
import { h, w } from '../utils/Dimensions'
GLOBAL = require('./globals');

export default class DoctorFaclitiesList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            doctFlag: true,
            faciFlag: false,
            doctorimage: '',
            doctordescription: '',
            facilitytitle: '',
            facilitydescription: '',
            facilityimage: '',
            alldoctormodifieddata: '',
            alldoctororiginaldata: '',
            allFacilitymodifieddata: '',
            allFacilityoriginaldata: ''
        }
    }

    pressDoctorButton() {
        this.setState({
            doctFlag: true,
            faciFlag: false
        })
    }

    pressFacilitiesButton() {
        this.setState({
            doctFlag: false,
            faciFlag: true
        })
    }

    pressButtonDoctorDetail(item) {
        this.textInput2.clear()
        this.setState({
            alldoctormodifieddata: this.state.alldoctororiginaldata,

        })
        this.props.navigation.navigate('DoctorDetails', {
            firstname: item.first_name,
            lastname: item.last_name,
            doctorimage: item.image,
            doctordescription: item.description,
            doctorspecial: item.specialization
        })
    }

    pressButtonFacilityDetail(item) {
        this.textInput1.clear()
        this.setState({
            allFacilitymodifieddata: this.state.allFacilityoriginaldata,

        })
        this.props.navigation.navigate('FacilityDetails', {
            facilitytitle: item.title,
            facilityimage: item.image,
            facilitydescription: item.description
        })
    }

    filterdoctordata(text) {
        let searchtext = text
        //console.log('searchtext =   ', searchtext)
        let filteredalldata = this.state.alldoctororiginaldata.filter(x => x.first_name.toLowerCase().includes(searchtext.toLowerCase()))
        this.setState({
            alldoctormodifieddata: filteredalldata
        })
    }

    filterfacilitydata(text) {
        let searchtext = text
        //console.log('searchtext =   ', searchtext)
        let filteredalldata = this.state.allFacilityoriginaldata.filter(x => x.title.toLowerCase().includes(searchtext.toLowerCase()))
        this.setState({
            allFacilitymodifieddata: filteredalldata
        })
    }

    UNSAFE_componentWillMount() {
        const { alldoctor, allFacility } = this.props.route.params;
        this.setState({
            alldoctormodifieddata: alldoctor,
            alldoctororiginaldata: alldoctor,
            allFacilitymodifieddata: allFacility,
            allFacilityoriginaldata: allFacility
        })
    }

    render() {
        const { alldoctor, allFacility, alldept } = this.props.route.params;
        if (this.state.doctFlag == true) {
            return (
                <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                    <StatusBar barStyle="light-content" hidden={false}
                        backgroundColor='#3CB3C3'
                        translucent={true}>
                    </StatusBar>
                    <View style={{
                        backgroundColor: GLOBAL.primaryBackGroundColorforBlue,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: h(20),
                        paddingTop: h(3)
                    }}>
                        <TouchableOpacity
                            style={{
                                width: h(20),
                                height: h(6),
                                borderRadius: 8,
                                backgroundColor: GLOBAL.primarybuttonselect,
                                marginRight: h(1.3),
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onPress={() => this.pressDoctorButton()}
                        >
                            <Text allowFontScaling={false} style={{
                                fontWeight: 'bold',
                                color: GLOBAL.primarylighttext2,
                                fontSize: h(3.5),
                            }}>Doctors</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                backgroundColor: GLOBAL.primarybuttonunselect,
                                width: h(20),
                                height: h(6),
                                borderRadius: 8,
                                textAlign: 'center',
                                marginLeft: h(1.3),
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onPress={() => this.pressFacilitiesButton()}
                        >
                            <Text allowFontScaling={false} style={{
                                fontWeight: 'bold',
                                color: GLOBAL.primaryBackGroundColor == "white" ? GLOBAL.primarylighttext2 : GLOBAL.primarylighttext1,
                                // color: GLOBAL.primarylighttext1,
                                fontSize: h(3.5),
                            }}>Facilities</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ backgroundColor: GLOBAL.primaryBackGroundColor, paddingHorizontal: h(5) }}>
                        <Text style={{
                            color: GLOBAL.primarylighttext2,
                            marginTop: h(5),
                            fontSize: h(3),
                            fontWeight: 'bold',
                            paddingBottom: h(4)
                        }}>{alldept} Doctors</Text>
                        <View style={{
                            width: w(85), height: h(6), marginBottom: h(1), marginTop: -h(2),
                            backgroundColor: '#3CB3C3', borderRadius: 20, alignSelf: 'center', flexDirection: 'row'
                        }}>
                            <TextInput
                                ref={input => { this.textInput2 = input }}
                                allowFontScaling={false}
                                style={{ width: '80%', paddingLeft: h(5), fontSize: h(2.2) }}
                                placeholder="Search Doctor..."
                                onChangeText={(text) => this.filterdoctordata(text)}
                            />
                            <TouchableOpacity style={{ width: '20%', alignItems: 'center', justifyContent: 'center', }}>
                                <Image source={require('../assets/icons/search.png')} style={{ height: h(3), width: h(3), resizeMode: 'contain' }} />
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={this.state.alldoctormodifieddata}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: h(55), paddingTop: h(0) }}
                            keyExtractor={(item, index) => item + index}
                            renderItem={({ item }) =>
                                <TouchableOpacity style={{ paddingVertical: h(1.5) }}
                                    onPress={() => this.pressButtonDoctorDetail(item)}>
                                    <View
                                        style={{
                                            borderRadius: 8,
                                            paddingBottom: h(0.7),
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
                                            backgroundColor: GLOBAL.primaryTOuchablecolor, color: COLORS.black,
                                            borderRadius: 8,
                                            flexDirection: 'row', padding: h(2),
                                        }}>
                                            <View>
                                                <Image style={styles.flatlist_image} source={{ uri: item.image }} />
                                            </View>
                                            <View style={styles.flatlist_view2}>
                                                <Text style={styles.flatlist_text2}>{item.first_name} {item.last_name}</Text>
                                                <Text style={{
                                                    fontWeight: 'bold',
                                                    fontSize: h(1.9),
                                                    color: GLOBAL.primaryBackGroundColor != "white" ? GLOBAL.primarylighttext2 : '#008080',
                                                }}>{item.specialization}</Text>
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
        else {
            return (
                <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                    <StatusBar barStyle="light-content" hidden={false}
                        backgroundColor='#3CB3C3'
                        translucent={true}>
                    </StatusBar>
                    <View style={{ 
                         backgroundColor: GLOBAL.primaryBackGroundColorforBlue,
                         flexDirection: 'row',
                         justifyContent: 'center',
                         alignItems: 'center',
                         height: h(20),
                         paddingTop: h(3)
                        }}>
                        <TouchableOpacity
                            style={{
                                width: h(20),
                                height: h(6),
                                borderRadius: 8,
                                backgroundColor: GLOBAL.primarybuttonunselect,
                                marginRight: h(1.3),
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onPress={() => this.pressDoctorButton()}
                        >
                            <Text allowFontScaling={false} style={{
                                fontWeight: 'bold',
                                color: GLOBAL.primaryBackGroundColor == "white" ? GLOBAL.primarylighttext2 : GLOBAL.primarylighttext1,
                                fontSize: h(3.5),
                            }}>Doctors</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                             backgroundColor: GLOBAL.primarybuttonselect,
                             width: h(20),
                             height: h(6),
                             borderRadius: 8,
                             textAlign: 'center',
                             // backgroundColor: '#DFEEFF',
                             marginLeft: h(1.3),
                             alignItems: 'center',
                             justifyContent: 'center',
                        }}
                            onPress={() => this.pressFacilitiesButton()}>
                            <Text allowFontScaling={false} style={{ 
                                fontWeight: 'bold',
                                color: GLOBAL.primaryBackGroundColor != "white" ? GLOBAL.primarylighttext1 : GLOBAL.primarylighttext2,
                                // color: GLOBAL.primarylighttext1,
                                fontSize: h(3.5),
                            }}>Facilities</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ backgroundColor: GLOBAL.primaryBackGroundColor, paddingHorizontal: h(5) }}>
                        <Text style={styles.flex2_text1}>{alldept} Facilities</Text>
                        <View style={{
                            width: w(85), height: h(6), marginBottom: h(1), marginTop: -h(2),
                            backgroundColor: '#3CB3C3', borderRadius: 20, alignSelf: 'center', flexDirection: 'row'
                        }}>
                            <TextInput
                                ref={input => { this.textInput1 = input }}
                                allowFontScaling={false}
                                style={{ width: '80%', paddingLeft: h(5), fontSize: h(2.2) }}
                                placeholder="Search Facility..."
                                onChangeText={(text) => this.filterfacilitydata(text)}
                            />
                            <TouchableOpacity style={{ width: '20%', alignItems: 'center', justifyContent: 'center', }}>
                                <Image source={require('../assets/icons/search.png')} style={{ height: h(3), width: h(3), resizeMode: 'contain' }} />
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={this.state.allFacilitymodifieddata}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.flatlist_box}
                            keyExtractor={(item, index) => item + index}
                            renderItem={({ item }) =>
                                <TouchableOpacity onPress={() => this.pressButtonFacilityDetail(item)}
                                    style={{ paddingVertical: h(1.5) }}>
                                    <View
                                        style={{
                                            borderRadius: 8,
                                            paddingBottom: h(0.7),
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
                                            backgroundColor: GLOBAL.primaryTOuchablecolor,
                                            shadowOpacity: 20,
                                            shadowRadius: 40,
                                            elevation: h(1),
                                            marginRight: h(1),
                                            borderRadius: 8,
                                            flexDirection: 'row', padding: h(2),
                                        }}>
                                            <View>
                                                <Image style={styles.flatlist_image1} source={{ uri: item.image }} />
                                            </View>
                                            <View style={styles.flatlist_view2}>
                                                <Text style={styles.flatlist_text3}>{item.title}</Text>
                                                <Text style={{ 
                                                    fontWeight: 'bold',
                                                    fontSize: h(1.6),
                                                    marginTop: h(0.3),
                                                    color: GLOBAL.primaryBackGroundColor != "white" ? GLOBAL.primarylighttext2 : '#008080',}}>{item.short_description}</Text>
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
    flex1_touchable1:
    {
        // backgroundColor: COLORS.white,
        width: h(20),
        height: h(6),
        borderRadius: 8,
        backgroundColor: GLOBAL.primarybuttonselect,
        marginRight: h(1.3),
        alignItems: 'center',
        justifyContent: 'center',
    },
    flex1_touchable2:
    {
        backgroundColor: GLOBAL.primarybuttonunselect,
        width: h(20),
        height: h(6),
        borderRadius: 8,
        textAlign: 'center',
        marginLeft: h(1.3),
        alignItems: 'center',
        justifyContent: 'center',
    },
    flex1_touchable3:
    {
        backgroundColor: GLOBAL.primarybuttonunselect,
        width: h(20),
        height: h(6),
        borderRadius: 8,
        textAlign: 'center',
        marginRight: h(1.3),
        alignItems: 'center',
        justifyContent: 'center',
    },
    flex1_touchable4:
    {
        backgroundColor: GLOBAL.primarybuttonselect,
        width: h(20),
        height: h(6),
        borderRadius: 8,
        textAlign: 'center',
        // backgroundColor: '#DFEEFF',
        marginLeft: h(1.3),
        alignItems: 'center',
        justifyContent: 'center',
    },
    flex1_text1:
    {
        fontWeight: 'bold',
        color: GLOBAL.primarylighttext1,
        fontSize: h(3.5),
    },

    flex1_text2:
    {
        fontWeight: 'bold',
        color: GLOBAL.primarylighttext1,
        fontSize: h(3.5),

    },
    flex1_view1:
    {
        backgroundColor: GLOBAL.primaryBackGroundColorforBlue,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: h(20),
        paddingTop: h(3)
    },
    flex2_text1:
    {
        color: GLOBAL.primarylighttext2,
        marginTop: h(5),
        fontSize: h(3),
        fontWeight: 'bold',
        paddingBottom: h(4)
    },
    flatlist_box:
    {
        paddingBottom: h(50), paddingTop: h(0)
    },
    flatlist_view1:
    {
        backgroundColor: GLOBAL.primaryTOuchablecolor, color: COLORS.black,
        borderRadius: 8,
        flexDirection: 'row', padding: h(2),
    },
    flatlist_image:
    {
        width: h(7.5),
        height: h(7.5),
        borderRadius: 50,
        borderWidth: 0.2,
        borderColor: 'black'
    },
    flatlist_text1:
    {
        fontWeight: 'bold',
        fontSize: h(1.9),
        color: GLOBAL.primaryBackGroundColor != "white" ? GLOBAL.primarylighttext1 : '#008080',
    },
    flatlist_text4:
    {
        fontWeight: 'bold',
        fontSize: h(1.6),
        marginTop: h(0.3),
        color: GLOBAL.primaryBackGroundColor != "white" ? GLOBAL.primarylighttext2 : '#008080',
    },
    flatlist_text2:
    {
        fontWeight: 'bold',
        color: COLORS.black,
        fontSize: h(2.3),
    },
    flatlist_text3:
    {
        fontWeight: 'bold',
        fontSize: h(1.8),
        color: COLORS.black,
        // color: GLOBAL.primaryBackGroundColor != "white" ? GLOBAL.primarylighttext2 : '#008080'
    },
    flatlist_view2:
    {
        color: COLORS.black,
        paddingLeft: h(2),
        paddingRight: h(6),

    },
    flatlist_view3:
    {
        shadowOffset: {
            width: h(50),
            height: -h(100)
        },
        backgroundColor: GLOBAL.primaryTOuchablecolor,
        shadowOpacity: 20,
        shadowRadius: 40,
        elevation: h(1),
        marginRight: h(1),
        borderRadius: 8,
        flexDirection: 'row', padding: h(2),
    },
    flatlist_image1:
    {
        width: h(7.5),
        height: h(7.5),
        borderRadius: 50,
        borderWidth: 0.2,
        borderColor: 'black'
    },
})