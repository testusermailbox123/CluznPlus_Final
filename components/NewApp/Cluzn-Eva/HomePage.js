import React, { Component, createRef } from 'react'
import {
    Text, View, SafeAreaView, StatusBar, Image, TouchableOpacity, ScrollView,
    FlatList, VirtualizedList, StyleSheet, Dimensions
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { widthtoDP, heighttoDP } from '../Responsive';
GLOBAL = require('../globals');
import axios from 'axios';
let CurrentSlide = 0;
let IntervalTime = 4000;

const data = [
    {
        "image": "https://st1.photogallery.ind.sh/wp-content/uploads/indiacom/health-is-wealth-201711-1510898180.jpg"
    },
    {
        "image": "https://st1.photogallery.ind.sh/wp-content/uploads/indiacom/health-is-wealth-201711-1510898180.jpg"
    },
    {
        "image": "https://st1.photogallery.ind.sh/wp-content/uploads/indiacom/health-is-wealth-201711-1510898180.jpg"
    }
]

export default class HomePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            planlist: [],
            categorieslist: [],
            videos: [],
            authtoken: '',
            adslist: ''
        }
    }

    flatList = createRef();

    // TODO _goToNextPage()
    _goToNextPage = () => {
        // console.log("this.state.link ===>>>> ", this.state.link)
        if (this.state.adslist.length > 0) {
            if (CurrentSlide >= this.state.adslist.length - 1) CurrentSlide = 0;

            this.flatList.current.scrollToIndex({
                index: ++CurrentSlide,
                animated: true,
            });
        }
    };

    async getLocalData() {
        console.log('getLocalData called')
        try {
            const loggedInSTatus = await AsyncStorage.getItem('LoggedIn');
            // console.log('loggedInSTatus in homepage' + loggedInSTatus)

            if (loggedInSTatus === "Yes") {
                // console.log('at 66')
                try {
                    const authtoken = await AsyncStorage.getItem('auth_token');
                    // console.log('at 69' + authtoken)
                    if (authtoken == "" || authtoken == null) {
                        // console.log('71')
                        this.redirectToLogin()
                    } else {
                        this.setState({
                            authtoken: authtoken
                        }, () => {

                            this.generateCategoryList();
                            // console.log('token at 79 ' + this.state.authtoken)
                            this.generatePlanList();
                            // console.log('token at 81 ' + this.state.authtoken)
                            this._stopAutoPlay();
                            // console.log('token at 83 ' + this.state.authtoken)
                            this._startAutoPlay();
                            // console.log('token at 85 ' + this.state.authtoken)
                            this.generateAds()
                            // console.log('token at 88 ' + this.state.authtoken)
                        });
                    }
                } catch (error) {
                    // console.log("Error resetting data 12" + error);
                }
            } else {
                // console.log('88')
                this.redirectToLogin()
            }
        } catch (error) {
            console.log("Error resetting data 34" + error);
        }
        // console.log('token at 98 ' + this.state.authtoken)
    }

    _startAutoPlay = () => {
        this._timerId = setInterval(this._goToNextPage, IntervalTime);
    };

    _stopAutoPlay = () => {
        if (this._timerId) {
            clearInterval(this._timerId);
            this._timerId = null;
        }
    };

    _onPressPackages(item) {
        this.props.navigation.navigate('PackageDetails', {
            amount: item.amount,
            name: item.name,
            expire_in_month: item.expire_in_month,
            plan_id: item.id,
            plan_image: item.full_image,
            status: item.status
        });
    }

    _onPress_WorkShop() {
        // console.log('at 124', this.state.authtoken)
        this.props.navigation.navigate('Webinar', {

        });
    }

    UNSAFE_componentWillMount() {
        // console.log("UNSAFE_componentWillMount starts hermes_enabled - ");
        this.getLocalData();
        this.setState({
            adslist: data
        });
        // console.log('at 131 ' + this.state.authtoken)
        const { navigation } = this.props;

    }

    async redirectToLogin() {
        try {
            await AsyncStorage.clear();
            // console.log('at  AsyncStorage.clear')
            // this.props.navigation.navigate('GenerateOtpforLoginScreen')
            // console.log('133')
        } catch (error) {
            console.log("Error resetting data" + error);
        }
    }

    componentWillUnmount() {
        this._stopAutoPlay();
    }

    _renderItem({ item, index }) {
        return <Image source={{ uri: item.image }}
            // "https://www.pngkit.com/png/full/267-2678423_bacteria-video-thumbnail-default.png" }} 
            style={styles.sliderItems} />;
    }

    // TODO _keyExtractor()
    _keyExtractor(item, index) {
        // console.log(item);
        return index.toString();
    }

    _onPresscategories(myitem) {
        // console.log("myitem.videos" + myitem.videos)
        // console.log("myitem.videos " + myitem.id)
        this.props.navigation.navigate('Categories', {
            videos: myitem.videos,
            packageId: myitem.id,
        });
    }

    generatePlanList() {
        // console.log("generatePlanList api call")
        // console.log("generatePlanList api toekn" + this.state.authtoken)
        axios.get('https://cluznplus.com/cluzn_backend/api/getPlan', {
            headers: {
                token: this.state.authtoken
            }
        })
            .then(response => {
                if (response.data.status == 'success') {
                    this.setState({
                        planlist: [...this.state.planlist, ...response.data.data],
                    });
                } else if (response.data.status == 'fail' && (response.data.message == 'token blanked' || response.data.message == 'token mis matched')) {
                    // console.log('180')
                    this.redirectToLogin();
                } else {
                    alert("check1" + response.data.message)
                }
            })
            .catch((error) => {
                this.setState({ planlist: [] })
            });
    }

    generateAds() {
        // console.log("generateAds api call")
        // console.log("generateAds api call token " + this.state.authtoken)
        axios.get('http://cluznplus.com/cluzn_backend/api/getAdvertismentEva', {
            headers: {
                token: this.state.authtoken
            }
        })
            .then(response => {
                if (response.data.status == 'success') {
                    // console.log(response.data)
                    this.setState({
                        adslist: [...this.state.adslist, ...response.data.data],
                    });
                } else if (response.data.status == 'fail' && (response.data.message == 'token blanked' || response.data.message == 'token mis matched')) {
                    // console.log('203')
                    this.redirectToLogin();
                } else {
                    alert("check3" + response.data.message)
                }
            })
            .catch((error) => {
                this.setState({ adslist: [] })
            });
    }

    generateCategoryList() {
        // console.log("generateCategoryList")
        // console.log("generateCategoryList api toekn" + this.state.authtoken)
        axios.get('https://cluznplus.com/cluzn_backend/api/categories', {
            headers: {
                token: this.state.authtoken
            }
        })
            .then(response => {
                // console.log("response", response.data.data)
                if (response.data.status == 'success') {
                    // console.log("planlist - ", response.data.data[1]);
                    this.setState({
                        categorieslist: [...this.state.categorieslist, ...response.data.data],
                    });
                } else if (response.data.status == 'fail' && (response.data.message == 'token blanked' || response.data.message == 'token mis matched')) {
                    // console.log('225')
                    this.redirectToLogin();
                } else {
                    alert("check2" + response.data.message)
                }
            })
            .catch((error) => {
                this.setState({ categorieslist: [] })
                console.log("categorieslist error", error);
            });
    }

    render() {

        return (
            <SafeAreaView style={{ flex: 2, backgroundColor: 'white' }}>
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
                        color: GLOBAL.eva_darkpink,
                        marginTop: heighttoDP(number = '3%'),
                        fontWeight: 'bold',
                        alignSelf: 'center',
                        fontSize: heighttoDP(number = '4%'),
                        marginLeft: widthtoDP(number = "5%"),
                        fontFamily: "MrsSheppards-Regular"
                    }}>Cluzn Eva Club</Text>
                    <Text style={{ marginLeft: heighttoDP(number = '17%') }}>
                        The world of woman's health
                    </Text>
                    {/* <Image
                        style={{
                            marginLeft: heighttoDP(number = '10%'),
                            width: widthtoDP(number = '50%'),
                            height: heighttoDP(number = '10%'),
                            borderRadius: heighttoDP(number = '2%'),
                        }}
                        source={require('../../assets/icons/evahome.png')} /> */}
                    <Text style={{
                        color: GLOBAL.eva_black,
                        marginTop: heighttoDP(number = '0.5%'),
                        fontWeight: 'bold',
                        fontSize: heighttoDP(number = '3%'),
                        marginLeft: widthtoDP(number = "5%"),
                        fontFamily: "MrsSheppards-Regular"
                    }}>Hello Varun,</Text>
                    <Text style={{
                        color: GLOBAL.eva_midpink,
                        marginTop: heighttoDP(number = '1%'),
                        fontWeight: 'bold',
                        fontSize: heighttoDP(number = '2.5%'),
                        marginLeft: widthtoDP(number = "5%")
                    }}>Find Your Desired Health Solution</Text>
                    <TouchableOpacity
                        onPress={() => this._onPress_WorkShop()}
                        style={{
                            backgroundColor: GLOBAL.eva_midpink,
                            marginTop: heighttoDP(number = '3%'),
                            borderRadius: heighttoDP(number = '2%'),
                            alignSelf: 'center',
                            width: widthtoDP(number = '90%'),
                            height: heighttoDP(number = '20%')
                        }}
                    >
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{
                                width: widthtoDP(number = '30%'),
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Image
                                    style={{
                                        height: heighttoDP(number = '15%'),
                                        width: heighttoDP(number = '15%'),
                                        borderRadius: heighttoDP(number = '2%'),
                                        marginLeft: heighttoDP(number = '2%'),
                                        marginTop: -heighttoDP(number = '2%')
                                    }}
                                    source={require('../../assets/icons/doct.png')} />
                            </View>
                            <View style={{
                                // backgroundColor: 'red',
                                width: widthtoDP(number = '60%'),
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Text
                                    style={{
                                        fontSize: heighttoDP(number = '2.5%'),
                                        fontWeight: 'bold',
                                    }}
                                >Upcoming</Text>

                                <Text
                                    style={{
                                        fontSize: heighttoDP(number = '2%'),
                                        fontWeight: 'bold',
                                    }}
                                >Eva Workshop / Eva Classes</Text>
                                <View style={{
                                    width: widthtoDP(number = '30%'),
                                    height: heighttoDP(number = '4%'),
                                    borderWidth: widthtoDP(number = '0.25%'),
                                    borderRadius: widthtoDP(number = '10%'),
                                    alignItems: 'center', justifyContent: 'center',
                                    marginTop: heighttoDP(number = '2%'),
                                    backgroundColor: GLOBAL.eva_darkpink
                                }}>
                                    <Text
                                        style={{
                                            fontSize: heighttoDP(number = '2%'),
                                            fontWeight: 'bold'
                                        }}
                                    >Book Now</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{
                        // backgroundColor: 'red',
                        height: heighttoDP(number = '25%'),
                        width: widthtoDP(number = '90'),
                        alignSelf: 'center',
                        // borderRadius: heighttoDP(number = '15%'),
                        marginTop: heighttoDP(number = '2%')
                    }}>
                        <FlatList
                            style={{
                                flex: 1,
                            }}
                            data={this.state.adslist}
                            // data={data}
                            keyExtractor={this._keyExtractor.bind(this)}
                            renderItem={this._renderItem.bind(this)}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            flatListRef={React.createRef()}
                            ref={this.flatList}
                        />
                    </View>
                    <View style={{
                        marginTop: widthtoDP(number = '4%'),
                        height: heighttoDP(number = '31%'),
                        width: widthtoDP(number = '100%')
                    }}>
                        <Text style={{
                            color: '#1E1C61', fontSize: widthtoDP(number = '5%'),
                            fontWeight: 'bold', marginLeft: widthtoDP(number = "6%")
                        }}>Eva Programs</Text>

                        <FlatList
                            style={{
                                height: heighttoDP(number = '2%')
                            }}
                            data={this.state.planlist}

                            keyExtractor={(item, index) => item + index}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) =>
                                <TouchableOpacity style={styles.item}
                                    onPress={() => this._onPressPackages(item)}
                                >
                                    <Image
                                        style={{
                                            height: heighttoDP(number = '12%'),
                                            width: heighttoDP(number = '12%'),
                                            borderRadius: heighttoDP(number = '2%'),
                                            marginLeft: heighttoDP(number = '4%'),
                                            marginTop: -heighttoDP(number = '3%')
                                        }}

                                        source={{ uri: item.image }}
                                    />
                                    <View style={{ height: heighttoDP(number = '5%'), marginTop: heighttoDP(number = '0.5%'), }}>
                                        <Text style={styles.title}>{item.name}</Text>
                                    </View>
                                    <View
                                        // onPress={() => this._onPressPackages(item)}
                                        style={{
                                            alignSelf: 'center', justifyContent: 'center',
                                            backgroundColor: GLOBAL.eva_darkpink,
                                            width: heighttoDP(number = '12%'),
                                            borderRadius: heighttoDP(number = '10%'),
                                            height: heighttoDP(number = '4%'),
                                            marginTop: heighttoDP(number = '2%')
                                        }}
                                    >
                                        <Text style={{
                                            alignSelf: 'center', justifyContent: 'center',

                                        }}
                                        >Book Now
                                        </Text>
                                    </View>

                                </TouchableOpacity>

                            }
                        />
                    </View>
                    <View style={{
                        marginTop: widthtoDP(number = '4%'),
                    }}>
                        <Text style={{
                            color: '#1E1C61', fontSize: widthtoDP(number = '5%'),
                            fontWeight: 'bold', marginLeft: widthtoDP(number = "6%")
                        }}>Eva Gallery</Text>
                    </View>

                    {
                        this.state.categorieslist.map((myitem) => {
                            return (
                                <TouchableOpacity
                                    key={myitem.id}
                                    style={{
                                        height: heighttoDP(number = '25%'),
                                        width: widthtoDP(number = '90%'),

                                        marginVertical: heighttoDP(number = '3%'),
                                        alignSelf: 'center', justifyContent: 'center'
                                    }}
                                    onPress={() => this._onPresscategories(myitem)}
                                >
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{
                                            width: widthtoDP(number = '30%'),
                                            alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            <View style={{
                                                // marginLeft: widthtoDP(number = '7%'),
                                                width: widthtoDP(number = '30%'),
                                                height: heighttoDP(number = '20%'),
                                                backgroundColor: GLOBAL.eva_midpink,
                                                borderRadius: widthtoDP(number = '4%')
                                            }}>
                                                <Image
                                                    style={{
                                                        height: heighttoDP(number = '13%'),
                                                        width: heighttoDP(number = '13%'),
                                                        borderRadius: heighttoDP(number = '2%'),
                                                        marginLeft: heighttoDP(number = '6%'),
                                                        marginTop: -heighttoDP(number = '3%')
                                                    }}
                                                    source={require('../../assets/icons/1.png')} />
                                                <View style={{
                                                    // backgroundColor: 'red',
                                                    width: heighttoDP(number = '14%'),
                                                    marginTop: -heighttoDP(number = '2%'),
                                                    height: heighttoDP(number = '11%'),

                                                }}>
                                                    <Text
                                                        style={{
                                                            color: GLOBAL.eva_blue, fontWeight: 'bold',
                                                            fontSize: heighttoDP(number = '2%'),
                                                            marginTop: heighttoDP(number = '3%'),
                                                            marginLeft: heighttoDP(number = '1%'),
                                                        }}
                                                    >{myitem.title}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{
                                            width: widthtoDP(number = '55%'),
                                            alignItems: 'center', justifyContent: 'space-evenly'
                                        }}>
                                            <Image
                                                style={{
                                                    height: heighttoDP(number = '18%'),
                                                    width: widthtoDP(number = '52%'),
                                                    borderRadius: heighttoDP(number = '2%'),
                                                    marginLeft: widthtoDP(number = '12%'),
                                                    // marginTop: heighttoDP(number = '6%')
                                                }}
                                                source={{ uri: myitem.image }}
                                            // source={require('../../assets/icons/Home.png')} 
                                            />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView >
            </SafeAreaView >
        )
    }
}

const styles = StyleSheet.create({

    item: {
        backgroundColor: GLOBAL.eva_midpink,
        height: heighttoDP(number = '21%'),
        width: heighttoDP(number = '15%'),
        marginHorizontal: widthtoDP(number = '4%'),
        // padding: 20,
        borderRadius: 20,
        marginTop: heighttoDP(number = '5%')
    },
    title: {
        alignSelf: 'center',
        fontSize: heighttoDP(number = '2%')
    },
    sliderItems: {
        height: heighttoDP(number = '25%'),
        borderTopRightRadius: heighttoDP(number = '2%'),
        borderRadius: heighttoDP(number = '2%'),
        width: widthtoDP(number = '90%'),
    },
});