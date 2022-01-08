import React, { Component } from 'react'
import { Text, View, SafeAreaView, StatusBar, Image, TouchableOpacity, ScrollView, FlatList, VirtualizedList, StyleSheet } from 'react-native'
import { widthtoDP, heighttoDP } from '../Responsive';
GLOBAL = require('../globals');
import { h, w } from '../../utils/Dimensions'
const DATA = [];
const getItemCount = (data) => 5;
const getItem = (data, index) => ({
    id: Math.random().toString(12).substring(0),
    title: `Item box ${index + 1}`
});
export default class Categories extends Component {

    constructor(props) {
        super(props)

        this.state = {
            videoFlag: true,
            blogsFlag: false,
            BookAppointmentFlag: false,
        }
    }
    render() {
        if (this.state.videoFlag == true) {
            return (
                <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                    <StatusBar barStyle="light-content" hidden={false}
                        backgroundColor='#FEE1DC'
                        translucent={true}>
                    </StatusBar>
                    <View style={{
                        flex: 1,
                        backgroundColor: GLOBAL.eva_lightpink,
                        height: heighttoDP(number = '100%'), width: widthtoDP(number = '100%')
                    }}>
                        <Text style={{
                            color: GLOBAL.eva_black, marginTop: heighttoDP(number = '5%'),
                            fontWeight: 'bold', fontSize: heighttoDP(number = '3%'),
                            marginLeft: widthtoDP(number = "5%")
                        }}>Hello Varun,</Text>
                        <View style={{
                            flex: 1, flexDirection: 'row',backgroundColor:'red',
                            width: widthtoDP(number = '100%'),
                            marginTop:widthtoDP(number = '5%'),
                            justifyContent: 'center',height: heighttoDP(number='1%')
                        }}>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: GLOBAL.eva_darkpink,
                                    width: widthtoDP(number = '30%'),
                                    height: heighttoDP(number = '7%'),
                                    borderRadius: heighttoDP(number = '2%'),
                                    alignItems: 'center', justifyContent: 'center',
                                    marginRight: heighttoDP(number = '1%'),
                                }}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: heighttoDP(number = '2.2%') }}
                                >Videos</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: GLOBAL.eva_midpink,
                                    width: widthtoDP(number = '30%'),
                                    height: heighttoDP(number = '7%'),
                                    borderRadius: heighttoDP(number = '2%'),
                                    alignItems: 'center', justifyContent: 'center',
                                    marginRight: heighttoDP(number = '1%')
                                }}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: heighttoDP(number = '2.2%') }}
                                >Blogs</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: GLOBAL.eva_midpink,
                                    width: widthtoDP(number = '30%'),
                                    height: heighttoDP(number = '7%'),
                                    borderRadius: heighttoDP(number = '2%'),
                                    alignItems: 'center', justifyContent: 'center'
                                }}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: heighttoDP(number = '2.2%') }}
                                >Book Appointment</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            height: heighttoDP(number = '40%'), width: widthtoDP(number = '100%')
                        }}>
                            
                            <VirtualizedList
                                style={{
                                    marginBottom: heighttoDP(number = '5%') }}
                                data={DATA}
                                horizontal={true}
                                
                                renderItem={({ item }) =>

                                    <TouchableOpacity style={{
                                        height: heighttoDP(number = '25%'),
                                        width: widthtoDP(number = '90%'),

                                        marginVertical: heighttoDP(number = '3%'),
                                        alignSelf: 'center', justifyContent: 'center'
                                    }}
                                    onPress={() => this._onPress(item)}
                                    >
                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                            <View style={{
                                                width: widthtoDP(number = '30%'),
                                                alignItems: 'center', justifyContent: 'center'
                                            }}>
                                                <View style={{
                                                    marginLeft: widthtoDP(number = '7%'),
                                                    width: widthtoDP(number = '30%'),
                                                    height: heighttoDP(number = '20%'),
                                                    backgroundColor: 'white', borderRadius: widthtoDP(number = '4%')
                                                }}>
                                                    <Image
                                                        style={{
                                                            height: heighttoDP(number = '13%'), width: heighttoDP(number = '13%'),
                                                            borderRadius: heighttoDP(number = '2%'),
                                                            marginLeft: heighttoDP(number = '6%'),
                                                            marginTop: -heighttoDP(number = '2%')
                                                        }}
                                                        source={{ uri: "https://pe-images.s3.amazonaws.com/basics/cc/image-size-resolution/resize-images-for-print/original-image.jpg" }} />
                                                    <Text
                                                        style={{
                                                            color: GLOBAL.eva_blue, fontWeight: 'bold',
                                                            fontSize: heighttoDP(number = '3%'),
                                                            marginTop: heighttoDP(number = '3%'),
                                                            alignSelf: 'center'
                                                        }}
                                                    >Varun</Text>
                                                </View>
                                            </View>
                                            <View style={{
                                                width: widthtoDP(number = '55%'),
                                                alignItems: 'center', justifyContent: 'space-evenly'
                                            }}>
                                                <Image
                                                    style={{
                                                        height: heighttoDP(number = '13%'),
                                                        width: widthtoDP(number = '45%'),
                                                        borderRadius: heighttoDP(number = '2%'),
                                                        marginLeft: widthtoDP(number = '12%'),
                                                        marginTop: heighttoDP(number = '6%')
                                                    }}
                                                    source={{ uri: "https://pe-images.s3.amazonaws.com/basics/cc/image-size-resolution/resize-images-for-print/original-image.jpg" }} />

                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                }
                                keyExtractor={(item, index) => item + index}
                                getItemCount={getItemCount}
                                getItem={getItem}
                                
                            />
                        </View>
                    </View>
                </SafeAreaView>
            )
        }
        else if (this.state.blogsFlag == true) {
            return (
                <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                    <StatusBar barStyle="light-content" hidden={false}
                        backgroundColor='#FEE1DC'
                        translucent={true}>
                    </StatusBar>
                    <ScrollView style={{
                        flex: 1,
                        backgroundColor: GLOBAL.eva_lightpink,
                        height: heighttoDP(number = '100%'), width: widthtoDP(number = '100%')
                    }}>
                        <Text style={{
                            color: GLOBAL.eva_black, marginTop: heighttoDP(number = '5%'),
                            fontWeight: 'bold', fontSize: heighttoDP(number = '3%'),
                            marginLeft: widthtoDP(number = "5%")
                        }}>Hello Varun,</Text>
                        <View style={{
                            flex: 1, flexDirection: 'row',
                            alignItems: 'center', width: widthtoDP(number = '100%'),
                            justifyContent: 'center',
                            height: heighttoDP(number = '7%'), marginTop: heighttoDP(number = '3%')
                        }}>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: GLOBAL.eva_midpink,
                                    width: widthtoDP(number = '30%'),
                                    height: heighttoDP(number = '7%'),
                                    borderRadius: heighttoDP(number = '2%'),
                                    alignItems: 'center', justifyContent: 'center',
                                    marginRight: heighttoDP(number = '1%'),
                                }}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: heighttoDP(number = '2.2%') }}
                                >Videos</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: GLOBAL.eva_darkpink,
                                    width: widthtoDP(number = '30%'),
                                    height: heighttoDP(number = '7%'),
                                    borderRadius: heighttoDP(number = '2%'),
                                    alignItems: 'center', justifyContent: 'center',
                                    marginRight: heighttoDP(number = '1%')
                                }}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: heighttoDP(number = '2.2%') }}
                                >Blogs</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: GLOBAL.eva_midpink,
                                    width: widthtoDP(number = '30%'),
                                    height: heighttoDP(number = '7%'),
                                    borderRadius: heighttoDP(number = '2%'),
                                    alignItems: 'center', justifyContent: 'center'
                                }}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: heighttoDP(number = '2.2%') }}
                                >Book Appointment</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            )
        }
        else {
            return (
                <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                    <StatusBar barStyle="light-content" hidden={false}
                        backgroundColor='#FEE1DC'
                        translucent={true}>
                    </StatusBar>
                    <ScrollView style={{
                        flex: 1,
                        backgroundColor: GLOBAL.eva_lightpink,
                        height: heighttoDP(number = '100%'), width: widthtoDP(number = '100%')
                    }}>
                        <Text style={{
                            color: GLOBAL.eva_black, marginTop: heighttoDP(number = '5%'),
                            fontWeight: 'bold', fontSize: heighttoDP(number = '3%'),
                            marginLeft: widthtoDP(number = "5%")
                        }}>Hello Varun,</Text>
                        <View style={{
                            flex: 1, flexDirection: 'row',
                            alignItems: 'center', width: widthtoDP(number = '100%'),
                            justifyContent: 'center',
                            height: heighttoDP(number = '7%'), marginTop: heighttoDP(number = '3%')
                        }}>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: GLOBAL.eva_midpink,
                                    width: widthtoDP(number = '30%'),
                                    height: heighttoDP(number = '7%'),
                                    borderRadius: heighttoDP(number = '2%'),
                                    alignItems: 'center', justifyContent: 'center',
                                    marginRight: heighttoDP(number = '1%'),
                                }}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: heighttoDP(number = '2.2%') }}
                                >Videos</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: GLOBAL.eva_midpink,
                                    width: widthtoDP(number = '30%'),
                                    height: heighttoDP(number = '7%'),
                                    borderRadius: heighttoDP(number = '2%'),
                                    alignItems: 'center', justifyContent: 'center',
                                    marginRight: heighttoDP(number = '1%')
                                }}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: heighttoDP(number = '2.2%') }}
                                >Blogs</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: GLOBAL.eva_darkpink,
                                    width: widthtoDP(number = '30%'),
                                    height: heighttoDP(number = '7%'),
                                    borderRadius: heighttoDP(number = '2%'),
                                    alignItems: 'center', justifyContent: 'center'
                                }}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: heighttoDP(number = '2.2%') }}
                                >Book Appointment</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            )
        }
    }
}
