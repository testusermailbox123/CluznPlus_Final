import React, { Component, useState } from 'react'
import {
    Text, View, SafeAreaView, StatusBar, Alert, Button, KeyboardAvoidingView,
    TextInput, Image, TouchableOpacity, ScrollView, FlatList, VirtualizedList, StyleSheet
    , BackHandler
} from 'react-native'
import { widthtoDP, heighttoDP } from '../Responsive';
GLOBAL = require('../globals');
import { h, w } from '../../utils/Dimensions'
import DatePicker from 'react-native-date-picker'
import RazorpayCheckout from 'react-native-razorpay';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

export default class PurchaseForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            EMail: '',
            First_Name: '',
            Last_Name: '',
            Mobile_Number: '',
            plan_id: '',
            amount: '',
            name: '',
            authtoken: '',
            expire_in_month: '',
            plan_image: '',
            status: 0,
            authtoken: '',
        }
    }

    async getLocalData() {
        try {
            const loggedInSTatus = await AsyncStorage.getItem('LoggedIn');
            if (loggedInSTatus === 'Yes') {
                try {
                    const authtoken = await AsyncStorage.getItem('auth_token');
                    if (authtoken == "" || authtoken == null) {
                        this.redirectToLogin()
                    } else {
                        this.setState({
                            authtoken: authtoken
                        }, () => {

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

    async redirectToLogin() {
        try {
            await AsyncStorage.clear();
            this.props.navigation.navigate('GenerateOtpforLoginScreen')
        } catch (error) {
            console.log("Error resetting data" + error);
        }
    }

    backAction = () => {
        this.props.navigation.navigate('PackageDetails', {

        });
        return true;
    };

    UNSAFE_componentWillMount() {
        this.getLocalData();
        const { plan_id, amount, expire_in_month, plan_image, status } = this.props.route.params;
        this.setState({
            plan_id: plan_id,
            amount: amount
        })
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    doSubscribe() {
        const data = {
            plan_id: this.state.plan_id,
            first_name: this.state.First_Name,
            last_name: this.state.Last_Name,
            mobile: this.state.Mobile_Number,
            email: this.state.EMail
        }
        axios.post('https://cluznplus.com/cluzn_backend/api/doSubscribe', data, {
            headers: {
                token: this.state.authtoken,
            },
        })
            .then(response => {
                if (response.data.status == 'success') {
                    alert('Booked successfully')
                    this.props.navigation.navigate('PackageDetails', {
                        plan_id: this.state.plan_id,
                        amount: this.state.amount,
                        plan_image: this.state.plan_image,
                        status: 0,
                        name: this.state.name,
                        expire_in_month: this.state.expire_in_month
                    });
                } else if (response.data.status == 'fail' && (response.data.message == 'token blanked' || response.data.message == 'token mis matched')) {
                    this.redirectToLogin();
                } else {
                    alert(response.data.message)
                }
            })
            .catch((error) => {
                console.log("doSubscribe error", error);
            });
    }

    onPressButton() {

        if (this.state.Mobile_Number == '' || this.state.Mobile_Number.length < 10

            || this.state.First_Name == '' || this.state.Last_Name == '' || this.state.Email == ''

        ) {
            alert('Please enter all the details correctly')
        } else {

            // this.props.navigation.navigate('WebinarPurchaseForm', {
            //     plan_id: this.state.plan_id,
            //     amount: this.state.amount,
            // });
            var options = {
                description: this.state.name + ' Price',
                image: 'https://i.imgur.com/3g7nmJC.png',
                currency: 'INR',
                amount: this.state.amount * 100,
                key: 'rzp_live_Y163BMpztraADc',
                // key: 'rzp_test_F2J5RlYk54xkfe',//'rzp_live_Y163BMpztraADc',
                name: this.state.First_Name + " " + this.state.Last_Name,
                prefill: {
                    email: this.state.EMail,
                    contact: this.state.Mobile_Number,
                    name: 'ReactNativeForYou',
                },
                theme: { color: '#528FF0' },
            };

            RazorpayCheckout.open(options)
                .then((data) => {
                    this.doSubscribe();
                    // console.log("Hello check");
                })
                .catch((error) => {
                    console.log(`Error : ${error} | ${error.description}`);
                    console.log(this.state.plan_id + " " + this.state.amount + " " + this.state.plan_image
                        + " " + this.state.name + " " + this.state.expire_in_month
                    )
                    this.props.navigation.navigate('PackageDetails', {
                        plan_id: this.state.plan_id,
                        amount: this.state.amount,
                        plan_image: this.state.plan_image,
                        status: 0,
                        name: this.state.name,
                        expire_in_month: this.state.expire_in_month
                    });
                });
        }
    };

    render() {
        // console.log(this.state.Mobile_Number)
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: GLOBAL.eva_lightpink }}>
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
                    <Text style={{
                        color: GLOBAL.eva_black, marginTop: heighttoDP(number = '5%'),
                        fontWeight: 'bold', fontSize: heighttoDP(number = '4%'),
                        marginLeft: widthtoDP(number = "5%"), alignSelf: 'center'
                    }}>Enter your details</Text>
                    {/* <View style={{
                        flexDirection: 'row', justifyContent: 'center',
                        marginTop: heighttoDP(number = '2.5%')
                    }}> */}
                    <View style={{
                        marginTop: widthtoDP(number = "5%"),
                        alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Text style={{
                            marginBottom: heighttoDP(number = '1%'), fontWeight: 'bold',
                        }}>First Name</Text>
                        <TextInput

                            onChangeText={First_Name =>
                                this.setState({ First_Name })
                            }
                            // maxLength={9}
                            style={{
                                paddingLeft: widthtoDP(number = '4%'),
                                fontSize: heighttoDP(number = '2.7%'),
                                height: heighttoDP(number = '6%'),
                                width: widthtoDP(number = "83%"),
                                borderRadius: heighttoDP(number = '10%'),
                                borderWidth: heighttoDP(number = '.25%'),
                                borderColor: GLOBAL.eva_midpink
                            }} />
                    </View>
                    <View style={{
                        marginTop: widthtoDP(number = "5%"),
                        alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Text style={{ marginBottom: heighttoDP(number = '1%'), fontWeight: 'bold' }}>Last Name</Text>
                        <TextInput
                            onChangeText={Last_Name =>
                                this.setState({ Last_Name })
                            }
                            style={{
                                paddingLeft: widthtoDP(number = '4%'),
                                fontSize: heighttoDP(number = '2.7%'),
                                height: heighttoDP(number = '6%'),
                                width: widthtoDP(number = "83%"),
                                borderRadius: heighttoDP(number = '10%'),
                                borderWidth: heighttoDP(number = '.25%'),
                                borderColor: GLOBAL.eva_midpink
                            }} />
                    </View>
                    {/* </View> */}

                    <View style={{
                        marginTop: widthtoDP(number = "5%"),
                        alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Text style={{
                            marginBottom: heighttoDP(number = '1%')
                            , fontWeight: 'bold'
                        }}>Mobile Number</Text>
                        <TextInput
                            onChangeText={Mobile_Number =>
                                this.setState({ Mobile_Number })
                            }
                            maxLength={10}
                            style={{
                                paddingLeft: widthtoDP(number = '4%'),
                                fontSize: heighttoDP(number = '2.7%'),
                                height: heighttoDP(number = '6%'),
                                width: widthtoDP(number = "83%"),
                                borderRadius: heighttoDP(number = '10%'),
                                borderWidth: heighttoDP(number = '.25%'),
                                borderColor: GLOBAL.eva_midpink
                            }} />
                        {/* <TouchableOpacity >
                            <Image style={{
                                height: heighttoDP(number = '3.5%'),
                                width: heighttoDP(number = '3.5%'),
                                marginTop: -heighttoDP(number = '4.8%'),
                                marginLeft: widthtoDP(number = "65%")
                            }}
                                source={require('../../assets/icons/phone.png')} />
                        </TouchableOpacity> */}
                    </View>
                    <View style={{
                        marginTop: widthtoDP(number = "5%"),
                        alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Text style={{
                            marginBottom: heighttoDP(number = '1%')
                            , fontWeight: 'bold'
                        }}>E-Mail</Text>
                        <TextInput
                            onChangeText={EMail =>
                                this.setState({ EMail })
                            }
                            // maxLength={20}
                            style={{
                                paddingLeft: widthtoDP(number = '4%'),
                                fontSize: heighttoDP(number = '2.7%'),
                                height: heighttoDP(number = '6%'),
                                width: widthtoDP(number = "83%"),
                                borderRadius: heighttoDP(number = '10%'),
                                borderWidth: heighttoDP(number = '.25%'),
                                borderColor: GLOBAL.eva_midpink
                            }} />
                        {/* <TouchableOpacity >
                            <Image style={{
                                height: heighttoDP(number = '3.5%'),
                                width: heighttoDP(number = '3.5%'),
                                marginTop: -heighttoDP(number = '4.8%'),
                                marginLeft: widthtoDP(number = "65%")
                            }}
                                source={require('../../assets/icons/email.png')} />
                        </TouchableOpacity> */}
                    </View>
                    <TouchableOpacity
                        onPress={() => this.onPressButton()}
                        style={{
                            backgroundColor: GLOBAL.eva_darkpink,
                            height: heighttoDP(number = '6%'),
                            width: widthtoDP(number = "50%"),
                            alignSelf: 'center',
                            alignItems: 'center', justifyContent: 'center',
                            marginTop: heighttoDP(number = '10%'),
                            borderRadius: heighttoDP(number = '5%')
                        }}>
                        <Text style={{
                            fontSize: heighttoDP(number = '2.5%'),
                            fontWeight: 'bold',
                            color: 'white'
                        }}>PAY NOW</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        )
    }
}
