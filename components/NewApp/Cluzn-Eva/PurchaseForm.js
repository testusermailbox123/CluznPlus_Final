import React, { Component, useState } from 'react'
import {
    Text, View, SafeAreaView, StatusBar, Alert, Button, KeyboardAvoidingView,
    TextInput, Image, TouchableOpacity, ScrollView, FlatList, VirtualizedList, StyleSheet
} from 'react-native'
import { widthtoDP, heighttoDP } from '../Responsive';
GLOBAL = require('../globals');
import { h, w } from '../../utils/Dimensions'
import DatePicker from 'react-native-date-picker'
import RazorpayCheckout from 'react-native-razorpay';

export default class PurchaseForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            EMail: '',
            First_Name: '',
            Last_Name: '',
            Mobile_Number: '',
            plan_id: '',
            amount: ''
        }
    }

    UNSAFE_componentWillMount() {
        const { plan_id, amount } = this.props.route.params;
        this.setState({
            plan_id: plan_id,
            amount: amount
        })
    }

    render() {
        console.log(this.state.Mobile_Number)
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <StatusBar barStyle="light-content" hidden={false}
                    backgroundColor='#FEE1DC'
                    translucent={true}>
                </StatusBar>
                <KeyboardAvoidingView style={{
                    flex: 1,
                    backgroundColor: 'white',
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
                    }}>Appointment Details</Text>
                    <View style={{
                        flexDirection: 'row', justifyContent: 'center',
                        marginTop: heighttoDP(number = '2.5%')
                    }}>
                        <View style={{ marginRight: heighttoDP(number = '5%') }}>
                            <Text style={{
                                marginBottom: heighttoDP(number = '1%'), fontWeight: 'bold',
                            }}>First Name</Text>
                            <TextInput

                                onChangeText={First_Name =>
                                    this.setState({ First_Name })
                                }
                                maxLength={9}
                                style={{
                                    paddingLeft: widthtoDP(number = '4%'),
                                    fontSize: heighttoDP(number = '2.7%'),
                                    height: heighttoDP(number = '6%'),
                                    width: widthtoDP(number = "37%"),
                                    borderRadius: heighttoDP(number = '10%'),
                                    borderWidth: heighttoDP(number = '.25%'),
                                    borderColor: GLOBAL.eva_midpink
                                }} />
                        </View>
                        <View>
                            <Text style={{ marginBottom: heighttoDP(number = '1%'), fontWeight: 'bold' }}>Last Name</Text>
                            <TextInput
                                onChangeText={Last_Name =>
                                    this.setState({ Last_Name })
                                }
                                style={{
                                    paddingLeft: widthtoDP(number = '4%'),
                                    fontSize: heighttoDP(number = '2.7%'),
                                    height: heighttoDP(number = '6%'),
                                    width: widthtoDP(number = "37%"),
                                    borderRadius: heighttoDP(number = '10%'),
                                    borderWidth: heighttoDP(number = '.25%'),
                                    borderColor: GLOBAL.eva_midpink
                                }} />
                        </View>
                    </View>

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
                        <TouchableOpacity >
                            <Image style={{
                                height: heighttoDP(number = '3.5%'),
                                width: heighttoDP(number = '3.5%'),
                                marginTop: -heighttoDP(number = '4.8%'),
                                marginLeft: widthtoDP(number = "65%")
                            }}
                                source={require('../../assets/icons/phone.png')} />
                        </TouchableOpacity>
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
                            maxLength={20}
                            style={{
                                paddingLeft: widthtoDP(number = '4%'),
                                fontSize: heighttoDP(number = '2.7%'),
                                height: heighttoDP(number = '6%'),
                                width: widthtoDP(number = "83%"),
                                borderRadius: heighttoDP(number = '10%'),
                                borderWidth: heighttoDP(number = '.25%'),
                                borderColor: GLOBAL.eva_midpink
                            }} />
                        <TouchableOpacity >
                            <Image style={{
                                height: heighttoDP(number = '3.5%'),
                                width: heighttoDP(number = '3.5%'),
                                marginTop: -heighttoDP(number = '4.8%'),
                                marginLeft: widthtoDP(number = "65%")
                            }}
                                source={require('../../assets/icons/email.png')} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{
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
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }
}
