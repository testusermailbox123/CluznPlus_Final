import React, { Component } from 'react'
import RazorpayCheckout from 'react-native-razorpay';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {
    Text, View, SafeAreaView, StatusBar, Image,
    TouchableOpacity, ScrollView, FlatList, VirtualizedList,
    StyleSheet
} from 'react-native'
import { widthtoDP, heighttoDP } from '../Responsive';
GLOBAL = require('../globals');

export default class PackageDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            amount: '',
            name: '',
            expire_in_month: '',
            plan_id: '',
            authtoken: '',
            plan_image:''
        }
    }
    UNSAFE_componentWillMount() {
        const { amount, name, expire_in_month, plan_id,plan_image } = this.props.route.params;
        this.setState({
            amount: amount,
            name: name,
            expire_in_month: expire_in_month,
            plan_id: plan_id,
            plan_image:plan_image
        })
    }



    // componentDidMount() {
    //     setTimeout(async () => {
    //         const authtoken1 = await AsyncStorage.getItem('auth_token');
    //         this.setState({
    //             authtoken: authtoken1
    //         });
    //         alert("authtoken"+this.state.authtoken);
    //     }, 1000);
    // }


    // purchasePlanList () {

    //     setTimeout(async () => {
    //         const authtoken1 = await AsyncStorage.getItem('auth_token');
    //         this.setState({
    //             authtoken: authtoken1
    //         });
    //         const formData = new FormData();
    //         formData.append('plan_id', this.state.plan_id);
    //         axios.post('http://cluznplus.com/cluzn_backend/api/doSubscribe', {
    //             headers: {
    //                 token: this.state.authtoken,
    //                 Accept: 'application/json',
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //             data   : formData
    //         })
    //         .then(response => {
    //             console.log("response", response);
    //         })
    //         .catch((error) => {

    //         });
    //     }, 1000);


    // }

    onPressButton() {

        this.props.navigation.navigate('PurchaseForm', {
            plan_id: this.state.plan_id,
            amount: this.state.amount,
        });

        // var options = {
        //     description: 'Online Fee',
        //     image: 'https://i.imgur.com/3g7nmJC.png',
        //     currency: 'INR',
        //     amount: '100',
        //     key: 'rzp_live_Y163BMpztraADc',//'rzp_live_Y163BMpztraADc',
        //     name: 'Test',
        //     prefill: {
        //         email: 'test@email.com',
        //         contact: '9176104934',
        //         name: 'ReactNativeForYou',
        //     },
        //     theme: { color: '#528FF0' },
        // };

        // RazorpayCheckout.open(options)
        //     .then((data) => {
        //         console.log("data" + data);
        //         // alert(`Success: ${data.razorpay_payment_id}`);
        //         // this.purchasePlanList();
        //     })
        //     .catch((error) => {
        //         console.log("error - " + error.description);
        //         // handle failure
        //         // Alert.alert(`Error: ${error.code} | ${error.description}`);
        //     });
    };


    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <StatusBar barStyle="light-content" hidden={false}
                    backgroundColor='#FEE1DC'
                    translucent={true}>
                </StatusBar>
                <View style={{ flex: 1 }}>
                    <View style={{ height: heighttoDP(number = '70%') }}>
                        <Image
                            style={{ height: heighttoDP(number = '70%') }}
                            source={{
                                uri: "https://cluznplus.com/cluzn_backend/images/"+this.state.plan_image,
                            }}
                        />
                    </View>
                    <View
                        style={{
                            height: heighttoDP(number = '15%'),
                            alignItems: 'center', justifyContent: 'center',
                        }}
                    >

                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: heighttoDP(number = '3%')
                        }}
                        >Rs. {this.state.amount}</Text>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: heighttoDP(number = '3%')
                        }}
                        >Valid for {this.state.expire_in_month} Months</Text>
                        
                    </View>
                    <View style={{

                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>

                        <TouchableOpacity
                            onPress={() => this.onPressButton()}
                            style={{
                                backgroundColor: GLOBAL.eva_darkpink,
                                width: widthtoDP(number = '90%'),
                                height: heighttoDP(number = '6%'),
                                borderRadius: heighttoDP(number = '5%'),
                                alignSelf: 'center',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >

                            <Text style={{
                                color: 'white', fontWeight: 'bold',
                                fontSize: heighttoDP(number = '3%')
                            }}
                            >Purchase Now</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </SafeAreaView>
        )
    }
}
