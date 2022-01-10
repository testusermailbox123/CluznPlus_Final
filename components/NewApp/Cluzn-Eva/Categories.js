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

    pressblogButton() {
        this.setState({
            blogsFlag: true,
            videoFlag: false,
            BookAppointmentFlag: false
        })
    }

    pressbookButton() {
        this.setState({
            blogsFlag: false,
            videoFlag: false,
            BookAppointmentFlag: true
        })
    }

    pressvideoButton() {
        this.setState({
            blogsFlag: false,
            videoFlag: true,
            BookAppointmentFlag: false
        })
    }
    _onPress(item) 
    {
        this.props.navigation.navigate('DoctorDescription', {
            
        });
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
                            flexDirection: 'row',
                            width: widthtoDP(number = '100%'),
                            marginTop: widthtoDP(number = '5%'),
                            justifyContent: 'center', height: heighttoDP(number = '15%')
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
                            onPress={() => this.pressblogButton()}
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
                                onPress={() => this.pressbookButton()}
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
                            height: heighttoDP(number = '80%'), width: widthtoDP(number = '100%')
                        }}>

                            <VirtualizedList
                                showsVerticalScrollIndicator={false}
                                style={{
                                    marginBottom: heighttoDP(number = '5%'),
                                }}
                                data={DATA}
                                renderItem={({ item }) =>
                                
                                    <TouchableOpacity style={{
                                        height: heighttoDP(number = '25%'),
                                        width: widthtoDP(number = '90%'),
                                        marginVertical: heighttoDP(number = '3%'),
                                        alignSelf: 'center', justifyContent: 'center',
                                        // backgroundColor:'red'
                                    }}
                                    >
                                        <View>
                                            <Text style={{
                                                color: GLOBAL.eva_blue, fontWeight: 'bold',
                                                fontSize: heighttoDP(number = '1.5%')
                                            }}
                                            >Irregular periods -Causes and Treatment for Irregular Periods</Text>
                                            <Image
                                                style={{
                                                    height: heighttoDP(number = '20%'),
                                                    width: widthtoDP(number = '90%'),
                                                    borderRadius: heighttoDP(number = '4%'),
                                                    marginTop: heighttoDP(number = '2%'),
                                                }}
                                                source={{ uri: "https://pe-images.s3.amazonaws.com/basics/cc/image-size-resolution/resize-images-for-print/original-image.jpg" }} />

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
                            flexDirection: 'row',
                            width: widthtoDP(number = '100%'),
                            marginTop: widthtoDP(number = '5%'),
                            justifyContent: 'center', height: heighttoDP(number = '15%')
                        }}>
                            <TouchableOpacity
                                onPress={() => this.pressvideoButton()}
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
                                onPress={() => this.pressblogButton()}
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
                                onPress={() => this.pressbookButton()}
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
                            height: heighttoDP(number = '80%'), width: widthtoDP(number = '100%')
                        }}>

                            <VirtualizedList
                                showsVerticalScrollIndicator={false}
                                style={{
                                    marginBottom: heighttoDP(number = '5%'),
                                }}
                                data={DATA}
                                renderItem={({ item }) =>

                                    <TouchableOpacity style={{
                                        height: heighttoDP(number = '25%'),
                                        width: widthtoDP(number = '90%'),
                                        marginVertical: heighttoDP(number = '3%'),
                                        alignSelf: 'center', justifyContent: 'center',
                                        backgroundColor: GLOBAL.eva_midpink,
                                        borderRadius: heighttoDP(number = '2%')
                                    }}
                                    >
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                            <Image
                                                style={{
                                                    marginLeft: heighttoDP(number = '3%'),
                                                    height: heighttoDP(number = '21%'),
                                                    width: heighttoDP(number = '14%'),
                                                    borderRadius: heighttoDP(number = '1%'),

                                                }}
                                                source={{ uri: "https://pe-images.s3.amazonaws.com/basics/cc/image-size-resolution/resize-images-for-print/original-image.jpg" }} />
                                            <View style={{
                                                marginLeft: heighttoDP(number = '2%'),
                                                width: heighttoDP(number = '27%'),
                                            }}>
                                                <Text style={{
                                                    fontWeight: 'bold',
                                                    color: GLOBAL.eva_blue,
                                                    fontSize: heighttoDP(number = '3%'),

                                                }}>Sahu</Text>
                                                <Text numberOfLines={8}>
                                                Ive yet to meet women who enjoy being on their period or 
                                                experience the lovely mood changes that often come with it. 
                                                Many women simply deal with the irritability and bloating and 
                                                get on with life. But sometimes even the toughest of us need 
                                                a little relief from our premenstrual problems...
                                                </Text>
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
        else {
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
                            flexDirection: 'row',
                            width: widthtoDP(number = '100%'),
                            marginTop: widthtoDP(number = '5%'),
                            justifyContent: 'center', height: heighttoDP(number = '15%')
                        }}>
                            <TouchableOpacity
                                onPress={() => this.pressvideoButton()}
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
                                onPress={() => this.pressblogButton()}
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
                                onPress={() => this.pressbookButton()}
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
                        <View style={{
                            height: heighttoDP(number = '80%'), width: widthtoDP(number = '100%')
                        }}>

                            <VirtualizedList
                                showsVerticalScrollIndicator={false}
                                style={{
                                    marginBottom: heighttoDP(number = '5%'),
                                }}
                                data={DATA}
                                renderItem={({ item }) =>

                                    <TouchableOpacity style={{
                                        height: heighttoDP(number = '25%'),
                                        width: widthtoDP(number = '90%'),
                                        marginVertical: heighttoDP(number = '3%'),
                                        alignSelf: 'center', justifyContent: 'center',
                                        backgroundColor: GLOBAL.eva_midpink,
                                        borderRadius: heighttoDP(number = '2%')
                                    }}
                                    onPress={() => this._onPress(item)}
                                    >
                                        <View style={{ flexDirection: 'row' }}>

                                            <Image
                                                style={{
                                                    marginLeft: heighttoDP(number = '3%'),
                                                    height: heighttoDP(number = '21%'),
                                                    width: heighttoDP(number = '14%'),
                                                    borderRadius: heighttoDP(number = '1%'),

                                                }}
                                                source={{ uri: "https://pe-images.s3.amazonaws.com/basics/cc/image-size-resolution/resize-images-for-print/original-image.jpg" }} />
                                            <View style={{
                                                marginLeft: heighttoDP(number = '2%'),
                                                width: heighttoDP(number = '27%'),

                                            }}>
                                                <Text style={{
                                                    fontWeight: 'bold',
                                                    color: GLOBAL.eva_blue,
                                                    fontSize: heighttoDP(number = '3%'),
                                                    // marginTop: -heighttoDP(number = '5%')
                                                }}>Dr. Reema Kane</Text>
                                                <Text style={{
                                                    fontWeight: 'bold',
                                                    color: GLOBAL.eva_green,
                                                    fontSize: heighttoDP(number = '2.3%'),
                                                    marginBottom: heighttoDP(number = '1%')
                                                }}>Dermatologist</Text>
                                                <Text numberOfLines={6}>
                                                I’ve yet to meet women who enjoy being on their period or 
                                                experience the lovely mood changes that often come with it. 
                                                Many women simply deal with the irritability and bloating and 
                                                get on with life. But sometimes even the toughest of us need 
                                                a little relief from our premenstrual problems...
                                                </Text>
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
    }
}
