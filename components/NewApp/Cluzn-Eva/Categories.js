import React, { Component } from 'react'
import { Text, View, SafeAreaView, StatusBar, Image, TouchableOpacity, ScrollView, FlatList, VirtualizedList, ActivityIndicator, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
// import { createThumbnail } from "react-native-create-thumbnail";
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
            authtoken: '',
            videoFlag: true,
            blogsFlag: false,
            BookAppointmentFlag: false,
            videos: [],
            isloading1: false,
            packageId: '',
            bookAppointmentList: [],
            videoBufferFlag: true,
            videoLoadedLength: 0,
            BlogList: [],
            docid: '',
            amount: ''
        }
    }

    async redirectToLogin() {
        try {
            await AsyncStorage.clear();
            this.props.navigation.navigate('GenerateOtpforLoginScreen')
        } catch (error) {
            console.log("Error resetting data" + error);
        }
    }

    async getLocalData() {

        try {
            const loggedInSTatus = await AsyncStorage.getItem('LoggedIn');
            console.log('getLocalData token ' + loggedInSTatus)
            if (loggedInSTatus === 'Yes') {
                try {
                    const authtoken = await AsyncStorage.getItem('auth_token');
                    if (authtoken == "" || authtoken == null) {
                        this.redirectToLogin()
                    } else {
                        this.setState({
                            authtoken: authtoken
                        });
                    }
                } catch (error) {
                    console.log("Error resetting data 12" + error);
                }
            } else {
                this.redirectToLogin()
            }
        } catch (error) {
            console.log("Error resetting data 34" + error);
        }
    }

    UNSAFE_componentWillMount() {
        this.getLocalData();
        const { videos, packageId } = this.props.route.params;
        // this.updateVideoThumbnail(videos);
        this.setState({
            videos: videos,
            packageId: packageId
        })
    }

    // async updateVideoThumbnail(videos) {
    //     console.log("all video")
    //     console.log(videos)
    //     let videoAll = [];
    //     for(let item of videos) {
    //         await createThumbnail({
    //             url: item.video,
    //             timeStamp: 10000,
    //           })
    //             .then((response) => {
    //                 console.log("item", item)
    //                 item.thumbnail = response.path;
    //                 videoAll.push(item);
    //             })
    //             .catch(err => console.log({ err }));
    //     }
    //     this.setState({
    //         videos: videoAll
    //     })

    // }

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
        this.generateBlogList()
        this.setState({
            blogsFlag: true,
            videoFlag: false,
            BookAppointmentFlag: false
        })
    }

    generateBookAppointmentList() {
        let api = "https://cluznplus.com/cluzn_backend/api/category-doctors/" + this.state.packageId

        axios.get(api, {
            headers: {
                token: this.state.authtoken
            }
        })
            .then(response => {
                console.log(response.data)
                if (response.data.status == 'success') {
                    this.setState({
                        bookAppointmentList: response.data.data,
                    });
                } else if (response.data.status == 'fail' && (response.data.message == 'token blanked' || response.data.message == 'token mis matched')) {
                    this.redirectToLogin();
                } else {
                    alert(response.data.message)
                }
            })
            .catch((error) => {
                this.setState({ bookAppointmentList: [] })
                console.log(error)
            });

    }

    generateBlogList() {
        let api = "https://cluznplus.com//wp-json/wp/v2/posts"

        axios.get(api, {
            headers: {
                token: ""
            }
        })
            .then(response => {

                this.setState({
                    BlogList: response.data,
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
        console.log('doctor_image' + item.doctor_image)
        this.props.navigation.navigate('DoctorDescription', {
            docfname: item.first_name,
            doclname: item.last_name,
            docfullimage: item.image,
            docspecialization: item.specialization,
            docdescription: item.description,
            docvideo: item.video,
            docimage: item.image,
            docid: item.id,
            amount: item.consulation_fee,
            doctor_image: item.doctor_image
        });
    }

    _onPressVideo(item) {
        this.props.navigation.navigate('Video1', {
            video_url: item.video
        });
    }

    _onPressImage(item) {
        console.log(item.link)
        this.props.navigation.navigate('BlogDetail', {
            title: item.title.rendered,
            content: item.content.rendered,
            link: item.link
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
                            }}>Hello Evi,</Text>
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
                                    <Text style={{ fontWeight: 'bold', fontSize: heighttoDP(number = '2.2%') }}
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
                                    <Text style={{ fontWeight: 'bold', fontSize: heighttoDP(number = '2.2%') }}
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
                                    <Text style={{ fontWeight: 'bold', fontSize: heighttoDP(number = '2.2%') }}
                                    >Doctors</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                height: heighttoDP(number = '80%'), width: widthtoDP(number = '100%')
                            }}>
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    style={{
                                        marginBottom: heighttoDP(number = '10%'),
                                        marginTop: -heighttoDP(number = '5%'),
                                    }}
                                    data={this.state.videos}
                                    renderItem={({ item }) =>

                                        <View style={{
                                            height: heighttoDP(number = '25%'),
                                            width: widthtoDP(number = '90%'),
                                            marginVertical: heighttoDP(number = '7%'),
                                            alignSelf: 'center', justifyContent: 'center',
                                            // backgroundColor: 'red'
                                        }}
                                        >
                                            <View style={{
                                                // backgroundColor: 'red',
                                                height: heighttoDP(number = '10%')
                                            }}>
                                                <Text style={{
                                                    color: GLOBAL.eva_blue,
                                                    fontWeight: 'bold',
                                                    fontSize: heighttoDP(number = '2%')
                                                }}
                                                >{item.title}</Text>
                                            </View>
                                            <TouchableOpacity
                                                onPress={() => this._onPressVideo(item)}
                                                style={{
                                                    // backgroundColor: 'red',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    height: heighttoDP(number = '20%'),
                                                    width: widthtoDP(number = '90%'),
                                                    marginTop: -heighttoDP(number = '2%'),
                                                }}>
                                                <Image
                                                    style={{
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        height: heighttoDP(number = '25%'),
                                                        width: widthtoDP(number = '90%'),
                                                        borderRadius: heighttoDP(number = '1%'),
                                                        marginTop: heighttoDP(number = '2%'),

                                                    }}
                                                    source={{ uri: item.thumbnail ?? 'https://videopromotion.club/assets/images/default-video-thumbnail.jpg' }} />
                                            </TouchableOpacity>
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
                            }}>Hello Evi,</Text>
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
                                    <Text style={{ fontWeight: 'bold', fontSize: heighttoDP(number = '2.2%') }}
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
                                    <Text style={{ fontWeight: 'bold', fontSize: heighttoDP(number = '2.2%') }}
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
                                    <Text style={{ fontWeight: 'bold', fontSize: heighttoDP(number = '2.2%') }}
                                    >Doctor</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                height: heighttoDP(number = '80%'), width: widthtoDP(number = '100%')
                            }}>

                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    style={{
                                        marginBottom: heighttoDP(number = '10%'),
                                    }}
                                    data={this.state.videos}
                                    renderItem={({ item }) =>

                                        <View style={{
                                            height: heighttoDP(number = '25%'),
                                            width: widthtoDP(number = '90%'),
                                            marginVertical: heighttoDP(number = '7%'),
                                            alignSelf: 'center', justifyContent: 'center',
                                        }}
                                        >
                                            <View style={{ height: heighttoDP(number = '10%') }}>
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
                        }}>Hello Evi,</Text>
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
                                <Text style={{ fontWeight: 'bold', fontSize: heighttoDP(number = '2.2%') }}
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
                                <Text style={{ fontWeight: 'bold', fontSize: heighttoDP(number = '2.2%') }}
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
                                <Text style={{
                                    fontWeight: 'bold', alignSelf: 'center',
                                    fontSize: heighttoDP(number = '2.2%')
                                }}
                                >Doctors</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            height: heighttoDP(number = '80%'), width: widthtoDP(number = '100%')
                        }}>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                style={{
                                    marginBottom: heighttoDP(number = '10%'),
                                    marginTop: -heighttoDP(number = '5%'),
                                }}
                                data={this.state.BlogList}
                                renderItem={({ item }) =>

                                    <View style={{
                                        height: heighttoDP(number = '25%'),
                                        width: widthtoDP(number = '90%'),
                                        marginVertical: heighttoDP(number = '5%'),
                                        alignSelf: 'center',
                                        justifyContent: 'center',
                                        // backgroundColor:'red'

                                    }}
                                    >
                                        <View style={{
                                            marginTop: heighttoDP(number = '3%'),
                                            marginBottom: heighttoDP(number = '12%')
                                        }}>
                                            <Text style={{
                                                color: GLOBAL.eva_blue, fontWeight: 'bold',
                                                fontSize: heighttoDP(number = '2.0%'),
                                                marginBottom: heighttoDP(number = '3.5%'),
                                                marginTop: heighttoDP(number = '5%'),
                                            }}
                                            >{item.title.rendered}</Text>
                                            <TouchableOpacity
                                                onPress={() => this._onPressImage(item)}
                                                style={{
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    height: heighttoDP(number = '20%'),
                                                    width: widthtoDP(number = '90%'),
                                                }}>
                                                <Image
                                                    style={{
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        height: heighttoDP(number = '25%'),
                                                        width: widthtoDP(number = '90%'),
                                                        borderRadius: heighttoDP(number = '1%'),

                                                    }}
                                                    source={{ uri: (item.content.rendered.split('src="')[1]) != undefined ? (item.content.rendered.split('src="')[1]).split('"')[0] : 'https://www.staticwhich.co.uk/static/images/products/no-image/no-image-available.png' }} />

                                            </TouchableOpacity>
                                        </View>
                                    </View>


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
                        }}>Hello Evi,</Text>
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
                                <Text style={{ fontWeight: 'bold', fontSize: heighttoDP(number = '2.2%') }}
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
                                <Text style={{ fontWeight: 'bold', fontSize: heighttoDP(number = '2.2%') }}
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
                                <Text style={{ fontWeight: 'bold', fontSize: heighttoDP(number = '2.2%') }}
                                >Doctors</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            height: heighttoDP(number = '80%'), width: widthtoDP(number = '100%')
                        }}>

                            <FlatList
                                showsVerticalScrollIndicator={false}
                                style={{
                                    marginBottom: heighttoDP(number = '5%'),
                                    marginTop: -heighttoDP(number = '5%'),
                                }}
                                data={this.state.bookAppointmentList}
                                renderItem={({ item }) =>

                                    <TouchableOpacity style={{
                                        height: heighttoDP(number = '35%'),
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
                                                    height: heighttoDP(number = '27%'),
                                                    width: heighttoDP(number = '18%'),
                                                    borderRadius: heighttoDP(number = '1%'),

                                                }}
                                                source={{
                                                    uri: "https://cluznplus.com/cluzn_backend/images/" + item.image
                                                    // "https://i.pinimg.com/236x/d4/9e/4a/d49e4a1204be7530cbbb135da699beaf--medical-students-medical-school.jpg"
                                                }} />
                                            <View style={{
                                                marginLeft: heighttoDP(number = '2%'),
                                                width: heighttoDP(number = '23%'),
                                                // backgroundColor:'red'
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
                                                    marginBottom: heighttoDP(number = '1%'),

                                                }}>{item.specialization}</Text>
                                                <View style={{
                                                    // backgroundColor: 'red',
                                                    height: heighttoDP(number = '14.5%'),
                                                    width: widthtoDP(number = '40%')
                                                }}>
                                                    <Text numberOfLines={4}>
                                                        {item.description}
                                                    </Text>
                                                </View>
                                                <View style={{
                                                    // backgroundColor: 'red',
                                                    height: heighttoDP(number = '4%'),
                                                    width: widthtoDP(number = '40%'),
                                                }}>
                                                    <View style={{
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        backgroundColor: GLOBAL.eva_darkpink,
                                                        height: heighttoDP(number = '4%'),
                                                        width: widthtoDP(number = '40%'),
                                                        borderRadius: heighttoDP(number = '5%'),
                                                    }}>
                                                        <Text style={{
                                                            fontWeight: 'bold',
                                                            fontSize: heighttoDP(number = '2%'),
                                                        }}>Book Appointment</Text>
                                                    </View>
                                                </View>
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
