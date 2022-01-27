import React, { Component } from 'react'
import { Text, View, SafeAreaView, StatusBar, Image, TouchableOpacity, ScrollView, FlatList, VirtualizedList, ActivityIndicator, StyleSheet } from 'react-native'
import { widthtoDP, heighttoDP } from '../Responsive';
import { WebView } from 'react-native-webview';
import Video from 'react-native-video';
GLOBAL = require('../globals');
import { h, w } from '../../utils/Dimensions'
import axios from 'axios';
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
            videos: [],
            isloading1: false,
            packageId: '',
            bookAppointmentList: [],
            videoBufferFlag: true,
            videoLoadedLength: 0,
        }
    }

    UNSAFE_componentWillMount() {
        const { videos, packageId } = this.props.route.params;
        this.setState({
            videos: videos,
            packageId: packageId
        })
    }

    updateFlag() {
        if (this.state.videoLoadedLength >= this.state.videos.length - 1) {
            setTimeout(() => {
                this.setState({
                    videoBufferFlag: false
                });
            }, 3000);
        }
    }

    pressblogButton() {
        this.setState({
            blogsFlag: true,
            videoFlag: false,
            BookAppointmentFlag: false
        })
    }

    generateBookAppointmentList() {
        let api = "http://cluznplus.com/cluzn_backend/api/category-doctors/" + this.state.packageId

        axios.get(api, {
            headers: {
                token: ""
            }
        })
            .then(response => {

                this.setState({
                    bookAppointmentList: [...this.state.bookAppointmentList, ...response.data],
                });

            })
            .catch((error) => {
                this.setState({ bookAppointmentList: [] })
                console.log(error)
            });

    }

    pressbookButton() {
        this.setState({
            blogsFlag: false,
            videoFlag: false,
            BookAppointmentFlag: true,
            bookAppointmentList: []
        })
        this.generateBookAppointmentList()
    }

    pressvideoButton() {
        this.setState({
            blogsFlag: false,
            videoFlag: true,
            BookAppointmentFlag: false
        })
    }
    _onPressBookAppointment(item) {
        this.props.navigation.navigate('DoctorDescription', {
            docfname: item.first_name,
            doclname: item.last_name,
            docfullimage: item.image,
            docspecialization: item.specialization,
            docdescription: item.description,
            docvideo: item.video,
            docimage: item.image,
        });
    }

    _onPressVideo(item) {
        this.props.navigation.navigate('Video1', {
            video_url : item.video
        });
    }


    render() {
        if (this.state.videoFlag == true) {
            if (this.state.isloading1 == false) {
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

                            {/* {this.state.videoBufferFlag ?
                                <View style={{ flex: 1, alignItems: "center", justifyContent: "center", zIndex: 2000 }}>

                                    <ActivityIndicator style={{
                                        height: '100%',
                                        width: '100%'
                                    }} animating={true} size="large" color="red" /></View>
                                : <Text></Text>} */}

                            <View style={{
                                height: heighttoDP(number = '80%'), width: widthtoDP(number = '100%')
                            }}>
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    style={{
                                        marginBottom: heighttoDP(number = '5%'),
                                    }}
                                    data={this.state.videos}
                                    renderItem={({ item }) =>

                                        <View style={{
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
                                                >{item.title}</Text>
                                                <TouchableOpacity 
                                                onPress={() => this._onPressVideo(item)}
                                                style={{
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    height: heighttoDP(number = '20%'),
                                                    width: widthtoDP(number = '90%'),
                                                }}>
                                                    <Image
                                                        style={{
                                                            marginLeft: heighttoDP(number = '3%'),
                                                            height: heighttoDP(number = '21%'),
                                                            width: heighttoDP(number = '14%'),
                                                            borderRadius: heighttoDP(number = '1%'),

                                                        }}
                                                        source={{ uri: "https://i.pinimg.com/236x/d4/9e/4a/d49e4a1204be7530cbbb135da699beaf--medical-students-medical-school.jpg" }} />

                                                    {/* <Video
                                                        source={{
                                                            uri: 'http://techslides.com/demos/sample-videos/small.mp4'
                                                        }}   // Can be a URL or a local file.
                                                        ref={(ref) => { this.player = ref }}
                                                        paused={true}
                                                        controls={true}
                                                        onBuffer={() => {
                                                            
                                                        }}
                                                        onLoad={() => {
                                                            console.log("videoLoadedLength", this.state.videoLoadedLength);
                                                            this.setState({
                                                                videoLoadedLength: this.state.videoLoadedLength + 1
                                                            })
                                                            this.updateFlag();
                                                        }}
                                                        style={{
                                                            backgroundColor: 'red',
                                                            width: '100%',
                                                            height: '30%'
                                                        }}
                                                    /> */}
                                                </TouchableOpacity>
                                            </View>
                                        </View>


                                    }
                                    keyExtractor={(item, index) => item + index}

                                />
                            </View>
                        </View>
                    </SafeAreaView >
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

                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    style={{
                                        marginBottom: heighttoDP(number = '5%'),
                                    }}
                                    data={this.state.videos}
                                    renderItem={({ item }) =>

                                        <View style={{
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
                                                >{item.title}</Text>
                                                <Text style={{
                                                    color: GLOBAL.eva_blue, fontWeight: 'bold',
                                                    fontSize: heighttoDP(number = '1.5%')
                                                }}
                                                >{item.video}</Text>



                                                <View style={{
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    height: heighttoDP(number = '20%'),
                                                    width: widthtoDP(number = '90%')
                                                }}>
                                                    x
                                                </View>
                                            </View>
                                        </View>

                                    }

                                />
                            </View>
                        </View>
                    </SafeAreaView>
                )
            }
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

                            <FlatList
                                showsVerticalScrollIndicator={false}
                                style={{
                                    marginBottom: heighttoDP(number = '5%'),
                                }}
                                data={this.state.videos}
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
                                                source={{ uri: "https://i.pinimg.com/236x/d4/9e/4a/d49e4a1204be7530cbbb135da699beaf--medical-students-medical-school.jpg" }} />
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

                            <FlatList
                                showsVerticalScrollIndicator={false}
                                style={{
                                    marginBottom: heighttoDP(number = '5%'),
                                }}
                                data={this.state.bookAppointmentList}
                                renderItem={({ item }) =>

                                    <TouchableOpacity style={{
                                        height: heighttoDP(number = '25%'),
                                        width: widthtoDP(number = '90%'),
                                        marginVertical: heighttoDP(number = '3%'),
                                        alignSelf: 'center', justifyContent: 'center',
                                        backgroundColor: GLOBAL.eva_midpink,
                                        borderRadius: heighttoDP(number = '2%')
                                    }}
                                        onPress={() => this._onPressBookAppointment(item)}
                                    >
                                        <View style={{ flexDirection: 'row' }}>

                                            <Image
                                                style={{
                                                    marginLeft: heighttoDP(number = '3%'),
                                                    height: heighttoDP(number = '21%'),
                                                    width: heighttoDP(number = '14%'),
                                                    borderRadius: heighttoDP(number = '1%'),

                                                }}
                                                source={{
                                                    uri: "http://cluznplus.com/cluzn_backend/images/" + item.image
                                                    // "https://i.pinimg.com/236x/d4/9e/4a/d49e4a1204be7530cbbb135da699beaf--medical-students-medical-school.jpg"
                                                }} />
                                            <View style={{
                                                marginLeft: heighttoDP(number = '2%'),
                                                width: heighttoDP(number = '27%'),

                                            }}>
                                                <Text style={{
                                                    fontWeight: 'bold',
                                                    color: GLOBAL.eva_blue,
                                                    fontSize: heighttoDP(number = '3%'),
                                                    // marginTop: -heighttoDP(number = '5%')
                                                }}>{item.first_name} {item.last_name}</Text>
                                                <Text style={{
                                                    fontWeight: 'bold',
                                                    color: GLOBAL.eva_green,
                                                    fontSize: heighttoDP(number = '2.3%'),
                                                    marginBottom: heighttoDP(number = '1%')
                                                }}>{item.specialization}</Text>
                                                <Text numberOfLines={6}>
                                                    {item.description}
                                                </Text>

                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                }
                                keyExtractor={(item, index) => item + index}
                            />
                        </View>
                    </View>
                </SafeAreaView>
            )
        }
    }
}
