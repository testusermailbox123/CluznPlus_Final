import React, { Component } from 'react'
import { Text, View, SafeAreaView, StatusBar, Image, TouchableOpacity, ScrollView, FlatList, VirtualizedList, StyleSheet } from 'react-native'
import { widthtoDP, heighttoDP } from '../Responsive';
GLOBAL = require('../globals');
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export default class Webinar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            workshoplist: [],
            image: '',
            wookshopid: '',
            webname: '',
            bookstatus: false,
            authtoken: '',
        }
    }

    async getLocalData() {
        try {
            const loggedInSTatus = await AsyncStorage.getItem('LoggedIn');
            console.log("loggedInSTatus " + loggedInSTatus)
            if (loggedInSTatus === 'Yes') {
                try {
                    const authtoken = await AsyncStorage.getItem('auth_token');
                    console.log("authtoken  30" + authtoken)
                    if (authtoken == "" || authtoken == null) {
                        this.redirectToLogin()
                    } else {
                        this.setState({
                            authtoken: authtoken
                        }, () => {
                            this.generateworkshoplist();
                        });
                        console.log("authtoken from webinar api " + authtoken)
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

    _onPress(item) {
        this.props.navigation.navigate('WebinarDetails', {
            image: item.image,
            wookshopid: item.id,
            amount: item.amount,
            descript: item.description,
            webname: this.state.webname,
            bookstatus: item.bookstatus
        });
    }

    UNSAFE_componentWillMount() {
        const { navigation } = this.props;
        this.getLocalData();

    }

    async redirectToLogin() {
        try {
            await AsyncStorage.clear();
            this.props.navigation.navigate('GenerateOtpforLoginScreen')
        } catch (error) {
            console.log("Error resetting data" + error);
        }
    }

    generateworkshoplist() {
        // const authtoken = AsyncStorage.getItem('auth_token')
        console.log("getWebbinar token " + this.state.authtoken)
        axios.get('https://cluznplus.com/cluzn_backend/api/getWebbinar', {
            headers: {
                token: this.state.authtoken
            }
        })
            .then(response => {
                if (response.data.status == 'success') {
                    console.log("workshoplist - ", response.data.data);
                    this.setState({
                        workshoplist: [...this.state.workshoplist, ...response.data.data],
                    });
                    console.log(this.state.workshoplist)
                } else if (response.data.status == 'fail' && (response.data.message == 'token blanked' || response.data.message == 'token mis matched')) {
                    this.redirectToLogin();
                } else {
                    alert(response.data.message)
                }
            })
            .catch((error) => {
                this.setState({ workshoplist: [] })
            });
    }

    render() {

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <StatusBar barStyle="light-content" hidden={false}
                    backgroundColor='#FEE1DC'
                    translucent={true}>
                </StatusBar>
                <View style={{
                    flex: 1,
                    backgroundColor: GLOBAL.eva_midpink,
                    height: heighttoDP(number = '100%'), width: widthtoDP(number = '100%')
                }}>

                    <View style={{
                        backgroundColor: '#EF716B',
                        // flexDirection: 'row',
                        width: widthtoDP(number = '100%'),
                        marginTop: widthtoDP(number = '5%'),
                        // justifyContent: 'center',
                        height: heighttoDP(number = '20%'),
                        // borderRadius: heighttoDP(number = '3%'),
                        borderBottomLeftRadius: heighttoDP(number = '3%'),
                        borderBottomRightRadius: heighttoDP(number = '3%'),
                        // borderTopLeftRadius: heighttoDP(number = '3%'),
                        // borderTopRightRadius: heighttoDP(number = '3%'),
                    }}>
                        <Text style={{
                            color: GLOBAL.eva_black,
                            marginTop: heighttoDP(number = '5%'),
                            fontWeight: 'bold', fontSize: heighttoDP(number = '3%'),
                            marginLeft: widthtoDP(number = "5%")
                        }}>Hello Varun,</Text>
                        <Text style={{
                            alignSelf: 'center',
                            marginTop: heighttoDP(number = '2%'),
                            color: 'white',
                            marginLeft: widthtoDP(number = "3%"),
                            fontWeight: 'bold',
                            fontSize: heighttoDP(number = '2.3%')
                        }}
                        >Upcoming Webinar and Classes for you</Text>
                    </View>
                    <View style={{
                        height: heighttoDP(number = '80%'),
                        width: widthtoDP(number = '100%')
                    }}>

                        <FlatList
                            style={{
                                height: heighttoDP(number = '1%'),
                                marginBottom: heighttoDP(number = '7%'),
                            }}
                            data={this.state.workshoplist}

                            keyExtractor={(item, index) => item + index}
                            // horizontal={true}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) =>

                                <TouchableOpacity
                                    onPress={() => this._onPress(item)}
                                    style={{
                                        height: heighttoDP(number = '45%'),
                                        width: widthtoDP(number = '90%'),
                                        marginVertical: heighttoDP(number = '5%'),
                                        alignSelf: 'center', justifyContent: 'center',
                                        // backgroundColor:'red'
                                    }}
                                >
                                    <View>
                                        <Text 
                                        
                                        style={{
                                            color: GLOBAL.eva_blue,
                                            fontWeight: 'bold',
                                            fontSize: heighttoDP(number = '2.5%')
                                        }}
                                        >{item.name}</Text>
                                        <Image
                                            style={{
                                                height: heighttoDP(number = '45%'),
                                                width: widthtoDP(number = '90%'),
                                                borderRadius: heighttoDP(number = '2%'),
                                                marginTop: heighttoDP(number = '2%'),
                                            }}
                                            source={{ uri: item.image }}
                                        // source={{ uri: "https://switchindia.org/images/medical-innovation/medical-innovation-workshop-0102.jpg" }}
                                        />

                                    </View>
                                </TouchableOpacity>
                            }
                        />
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}