import React, { Component } from 'react'
import {
    Text, View, SafeAreaView, StatusBar, Image, TouchableOpacity, ScrollView,
    FlatList, VirtualizedList, StyleSheet
} from 'react-native'
import { widthtoDP, heighttoDP } from '../Responsive';
GLOBAL = require('../globals');
import axios from 'axios';

export default class HomePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            planlist: [],
            categorieslist: [],
            videos:[]
        }
    }

    _onPressPackages(item) {
        this.props.navigation.navigate('Packages', {
            amount: item.amount,
            name: item.name,
            expire_in_month: item.expire_in_month
        });
    }

    _onPress_WorkShop() {
        this.props.navigation.navigate('WorkShop', {

        });
    }

    UNSAFE_componentWillMount() {
        console.log("componentDidMount - ");
        const { navigation } = this.props;
        this.generatePlanList();
        this.generateCategoryList();
    }

    _onPresscategories(myitem) {
        this.props.navigation.navigate('Categories', {
            videos: myitem.videos,
        });
    }

    generatePlanList() {
        axios.get('http://cluznplus.com/cluzn_backend/api/getPlan', {
            headers: {
                token: ""
            }
        })
            .then(response => {
                // console.log("planlist - ", response.data.data[1]);
                this.setState({
                    planlist: [...this.state.planlist, ...response.data.data],
                });
                console.log("planlist ", this.state.planlist);
            })
            .catch((error) => {
                this.setState({ planlist: [] })
            });
    }

    async generateCategoryList() {

        let result;
        try {
            result = await axios.request({
                method: 'GET',
                url: `https://cluznplus.com/cluzn_backend/api/categories`,
                headers: {
                },
            })

        } catch (err) {
            err => console.log(err)
        }
        this.setState({
            categorieslist: [...this.state.categorieslist, ...result.data],
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
                        alignSelf: 'center', fontWeight: 'bold', marginTop: heighttoDP(number = '4%'),
                        fontSize: heighttoDP(number = '3%'),
                    }}>Cluzn EVA</Text>
                    <Text style={{
                        color: GLOBAL.eva_black, marginTop: heighttoDP(number = '1%'),
                        fontWeight: 'bold', fontSize: heighttoDP(number = '2.5%'),
                        marginLeft: widthtoDP(number = "5%")
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
                            width: widthtoDP(number = '85%'),
                            height: heighttoDP(number = '10%')
                        }}
                    >
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{
                                width: widthtoDP(number = '30%'),
                                alignItems: 'center', justifyContent: 'center'
                            }}>
                                <Text>Image here</Text>
                            </View>
                            <View style={{
                                width: widthtoDP(number = '55%'),
                                alignItems: 'center', justifyContent: 'space-evenly'
                            }}>
                                <Text>Book</Text>
                                <Text>Workshop</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
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
                    </TouchableOpacity>
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

                                        source={{ uri: "http://cluznplus.com/cluzn_backend/images/" + item.image }}
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
                            <TouchableOpacity style={{
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
                                            backgroundColor: 'white', borderRadius: widthtoDP(number = '4%')
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
                                                    fontSize: heighttoDP(number = '3%'),
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

                    {/* <FlatList
                            data={this.state.hospitalList}
                             ={false}
                            contentContainerStyle={{ paddingBottom: h(55) }}
                            showsVerticalScrollIndicator={false}
                            onEndReachedThreshold={0.08} // Tried 0, 0.01, 0.1, 0.7, 50, 100, 700
                            onEndReached={({ distanceFromEnd }) => {
                                this.generateHospitalList()
                            }}
                            keyExtractor={(item, index) => item + index}
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
                                                source={require('../../assets/icons/Home.png')} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            }
                        >
                        </FlatList>*/}
                    {/* </View> */}
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
});