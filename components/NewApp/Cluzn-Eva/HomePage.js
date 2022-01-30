import React, { Component, createRef } from 'react'
import {
    Text, View, SafeAreaView, StatusBar, Image, TouchableOpacity, ScrollView,
    FlatList, VirtualizedList, StyleSheet, Dimensions
} from 'react-native'
import { widthtoDP, heighttoDP } from '../Responsive';
GLOBAL = require('../globals');
import axios from 'axios';
let CurrentSlide = 0;
let IntervalTime = 4000;
import AsyncStorage from '@react-native-community/async-storage';

const data = [
    {
        "image": "https://png.pngtree.com/png-clipart/20190611/original/pngtree-foreign-female-doctor-png-image_2983361.jpg"
    },
    {
        "image": "https://png.pngtree.com/png-clipart/20190520/original/pngtree-flat-green-doctor-image-of-male-nurses-png-image_4170593.jpg"
    },
    {
        "image": "https://png.pngtree.com/png-clipart/20190516/original/pngtree-cartoon-doctor-image-element-doctorfemale-doctorcare-workershospitalelement-png-image_4078657.jpg"
    },
    {
        "image": "https://png.pngtree.com/png-clipart/20190611/original/pngtree-foreign-female-doctor-png-image_2983361.jpg"
    },
    {
        "image": "https://png.pngtree.com/png-clipart/20190520/original/pngtree-flat-green-doctor-image-of-male-nurses-png-image_4170593.jpg"
    },
    {
        "image": "https://png.pngtree.com/png-clipart/20190516/original/pngtree-cartoon-doctor-image-element-doctorfemale-doctorcare-workershospitalelement-png-image_4078657.jpg"
    }
]

export default class HomePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            planlist: [],
            categorieslist: [],
            videos: []
        }
    }

    flatList = createRef();

    // TODO _goToNextPage()
    _goToNextPage = () => {
        // console.log("this.state.link ===>>>> ", this.state.link)
        if (CurrentSlide >= data.length - 1) CurrentSlide = 0;

        this.flatList.current.scrollToIndex({
            index: ++CurrentSlide,
            animated: true,
        });
    };

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
        this.props.navigation.navigate('Webinar', {

        });
    }

    UNSAFE_componentWillMount() {
        console.log("UNSAFE_componentWillMount - ");
        const { navigation } = this.props;
        this.generateCategoryList();
        this.generatePlanList();
        this._stopAutoPlay();
        this._startAutoPlay();
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
        console.log("myitem.videos" + myitem.videos)
        console.log("myitem.videos " + myitem.id)
        this.props.navigation.navigate('Categories', {
            videos: myitem.videos,
            packageId: myitem.id,
        });
    }

    generatePlanList() {
        axios.get('https://cluznplus.com/cluzn_backend/api/getPlan', {
            headers: {
                token: ""
            }
        })
            .then(response => {
                this.setState({
                    planlist: [...this.state.planlist, ...response.data.data],
                });
            })
            .catch((error) => {
                this.setState({ planlist: [] })
            });
    }

    generateCategoryList() {
        axios.get('https://cluznplus.com/cluzn_backend/api/categories', {
            headers: {
                token: ""
            }
        })
            .then(response => {
                // console.log("planlist - ", response.data.data[1]);
                this.setState({
                    categorieslist: [...this.state.categorieslist, ...response.data],
                });

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
                    {/* <Text style={{
                        alignSelf: 'center', fontWeight: 'bold', marginTop: heighttoDP(number = '4%'),
                        fontSize: heighttoDP(number = '3%'),
                    }}>Cluzn EVA</Text> */}
                    <Image
                        style={{
                            marginLeft: heighttoDP(number = '10%'),
                            width: widthtoDP(number = '50%'),
                            height: heighttoDP(number = '10%'),
                            borderRadius: heighttoDP(number = '2%'),
                        }}
                        source={require('../../assets/icons/evahome.png')} />
                    <Text style={{
                        color: GLOBAL.eva_black, marginTop: heighttoDP(number = '1%'),
                        fontWeight: 'bold', fontSize: heighttoDP(number = '5%'),
                        marginLeft: widthtoDP(number = "5%"),
                        fontFamily:"MrsSheppards-Regular"
                    }}>Hello Varun,</Text>
                    <Text style={{
                        color: GLOBAL.eva_midpink, marginTop: heighttoDP(number = '1%'),
                        fontWeight: 'bold', fontSize: heighttoDP(number = '3%'),
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
                            height: heighttoDP(number = '12%')
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
                                        height: heighttoDP(number = '11%'),
                                        width: heighttoDP(number = '13%'),
                                        borderRadius: heighttoDP(number = '2%'),
                                        marginLeft: heighttoDP(number = '2%'),
                                        marginTop: -heighttoDP(number = '2%')
                                    }}
                                    source={require('../../assets/icons/doct.png')} />
                            </View>
                            <View style={{
                                // backgroundColor: 'red',
                                width: widthtoDP(number = '55%'),
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Text
                                    style={{
                                        fontSize: heighttoDP(number = '2%'),
                                        fontWeight: 'bold', color: '#EB592A'
                                    }}
                                >Upcoming Webinar / Class</Text>

                                <Text
                                    style={{
                                        marginTop: heighttoDP(number = '1%'),
                                        marginLeft: -heighttoDP(number = '5.5%'),
                                        fontSize: heighttoDP(number = '1.5%'),
                                        // fontWeight: 'bold'
                                    }}
                                >Click here to know more</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{
                        // backgroundColor: 'red',
                        height: heighttoDP(number = '18%'),
                        width: widthtoDP(number = '90'),
                        alignSelf: 'center',
                        // borderRadius: heighttoDP(number = '15%'),
                        marginTop: heighttoDP(number = '2%')
                    }}>
                        <FlatList
                            style={{
                                flex: 1,
                            }}
                            data={data}
                            keyExtractor={this._keyExtractor.bind(this)}
                            renderItem={this._renderItem.bind(this)}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            flatListRef={React.createRef()}
                            ref={this.flatList}
                        />
                    </View>
                    {/* <TouchableOpacity
                        style={{
                            backgroundColor: GLOBAL.eva_midpink,
                            marginTop: heighttoDP(number = '4%'),
                            borderRadius: heighttoDP(number = '2%'),
                            alignItems: 'center', justifyContent: 'center',
                            alignSelf: 'center',
                            width: widthtoDP(number = '85%'),
                            height: heighttoDP(number = '20%')
                        }}
                    >
                        <Image
                            style={{
                                width: widthtoDP(number = '85%'), height: heighttoDP(number = '20%'),
                                borderRadius: heighttoDP(number = '2%'),
                            }}
                            source={require('../../assets/icons/banner.png')} />
                    </TouchableOpacity> */}
                    <View style={{
                        marginTop: widthtoDP(number = '4%'),
                        height: heighttoDP(number = '27%'),
                        width: widthtoDP(number = '100%')
                    }}>
                        <Text style={{
                            color: '#1E1C61', fontSize: widthtoDP(number = '5%'),
                            fontWeight: 'bold', marginLeft: widthtoDP(number = "6%")
                        }}>Exclusive Packages</Text>

                        <FlatList
                            style={{
                                height: heighttoDP(number = '1%')
                            }}
                            data={this.state.planlist}

                            keyExtractor={(item, index) => item + index}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) =>
                                <View style={styles.item}>
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

                                    <Text style={styles.title}>{item.name}</Text>
                                    <TouchableOpacity
                                        onPress={() => this._onPressPackages(item)}
                                        style={{
                                            alignSelf: 'center', justifyContent: 'center',
                                            backgroundColor: GLOBAL.eva_midpink,
                                            width: heighttoDP(number = '12%'),
                                            borderRadius: heighttoDP(number = '10%'),
                                            height: heighttoDP(number = '4%')
                                        }}
                                    >
                                        <Text style={{
                                            alignSelf: 'center', justifyContent: 'center', color: 'white'
                                        }}
                                        >Book Now</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        />
                    </View>
                    <View style={{
                        marginTop: widthtoDP(number = '4%'),
                    }}>
                        <Text style={{
                            color: '#1E1C61', fontSize: widthtoDP(number = '5%'),
                            fontWeight: 'bold', marginLeft: widthtoDP(number = "6%")
                        }}>Categories</Text>
                    </View>

                    {this.state.categorieslist.map((myitem) => {
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
                                            marginLeft: widthtoDP(number = '7%'),
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
                                                    marginTop: -heighttoDP(number = '2%')
                                                }}
                                                source={require('../../assets/icons/1.png')} />
                                            <Text
                                                style={{
                                                    color: GLOBAL.eva_blue, fontWeight: 'bold',
                                                    fontSize: heighttoDP(number = '2%'),
                                                    marginTop: heighttoDP(number = '3%'),
                                                    alignSelf: 'center'
                                                }}
                                            >{myitem.title}</Text>
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
                                            source={{ uri: myitem.image }}
                                        // source={require('../../assets/icons/Home.png')} 
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({

    item: {
        backgroundColor: 'white',
        height: heighttoDP(number = '18%'),
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
        // height: "100%",
        borderTopRightRadius:heighttoDP(number = '2%'),
        borderRadius: heighttoDP(number = '2%'),
        width: widthtoDP(number = '90%'),
    },
});