import React, { Component, useState } from 'react'
import {
    Text, View, SafeAreaView, StatusBar, Alert, Button, KeyboardAvoidingView, BackHandler, Platform, Keyboard,
    TextInput, Image, TouchableOpacity, ScrollView, FlatList, VirtualizedList, StyleSheet, TouchableWithoutFeedback
} from 'react-native'
import { widthtoDP, heighttoDP } from '../Responsive';
GLOBAL = require('../globals');
import { h, w } from '../../utils/Dimensions'
import DatePicker from 'react-native-date-picker'
import RazorpayCheckout from 'react-native-razorpay';
import AsyncStorage from '@react-native-community/async-storage';
import SelectDropdown from 'react-native-select-dropdown'

const timeList =
    [
        "10:00 - 10:15 AM",
        "10:15 - 10:30 AM",
        "10:30 - 10:45 AM",
        "10:45 - 11:00 AM",
        "11:00 - 11:15 AM",
        "11:15 - 11:30 AM",
        "11:30 - 11:45 AM",
        "11:45 - 12:00 PM",
        "12:00 - 12:15 PM",
        "12:15 - 12:30 PM",
        "12:30 - 12:45 PM",
        "12:45 - 01:00 PM",
    ]

export default class AppointmentDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            authtoken: '',
            selectdate: '',
            opendate: false,
            selecttime: '',
            opentime: false,
            dd: new Date(),
            format: '',
            docid: '',
            amount: '',
            EMail: '',
            First_Name: '',
            Last_Name: '',
            Mobile_Number: '',
        }

    }

    async getLocalData() {

        try {
            const loggedInSTatus = await AsyncStorage.getItem('LoggedIn');
            // console.log('getLocalData token ' + loggedInSTatus)
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
        const { docid, amount } = this.props.route.params;
        this.getLocalData();
        this.setState({
            docid: docid,
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

    backAction = () => {
        this.props.navigation.navigate('DoctorDescription', {

        });
        return true;
    };

    onPressButton() {

        if (this.state.Mobile_Number == '' ||
            this.state.Mobile_Number.length < 10
            || this.state.First_Name == '' ||
            this.state.Last_Name == '' ||
            this.state.Email == '' ||
            this.state.selectdate == '',
            this.state.selecttime == ''
        ) {
            alert('Please enter all the details correctly')
        } else {
            alert('Appointment Booked successfully')
            this.props.navigation.navigate('DoctorDescription', {
                plan_id: this.state.plan_id,
                amount: this.state.amount,
            });
            // var options = {
            //     description: this.state.webname + ' Price',
            //     image: 'https://i.imgur.com/3g7nmJC.png',
            //     currency: 'INR',
            //     amount: this.state.amount + '00',
            //     key: 'rzp_test_F2J5RlYk54xkfe',//'rzp_live_Y163BMpztraADc',
            //     name: this.state.First_Name + " " + this.state.Last_Name,
            //     prefill: {
            //         email: this.state.EMail,
            //         contact: this.state.Mobile_Number,
            //         name: 'ReactNativeForYou',
            //     },
            //     theme: { color: '#528FF0' },
            // };

            // RazorpayCheckout.open(options)
            //     .then((data) => {
            //         // this.doSubscribe(data.razorpay_payment_id)
            //     })
            //     .catch((error) => {
            //         console.log(`Error : ${error} | ${error.description}`);
            //         this.props.navigation.navigate('PurchaseForm', {
            //             plan_id: this.state.plan_id,
            //             amount: this.state.amount,
            //         });
            //     });
        }
    };

    tConvert(time) {
        // Check correct time format and split into components
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) { // If time format correct
            time = time.slice(1);  // Remove full string match value
            time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join(''); // return adjusted time or original string
    }


    checkSwitch = (param) => {

        switch (param) {

            case '0':
                return "Jan";

            case '1':
                return "Feb";
                break;

            case '2':
                return "Mar";
                break;

            case '3':
                return "Apr";

            case '4':
                return "May";
                break;

            case '5':
                return "Jun";
                break;

            case '6':
                return "Jul";

            case '7':
                return "Aug";
                break;

            case '8':
                return "Sep";
                break;

            case '9':
                return "Oct";

            case '10':
                return "Nov";
                break;

            case '11':
                return "Dec";
                break;


            default:
            // Alert.alert("NUMBER NOT FOUND");
        }
    }

    doAppointment() {
        let api = "https://cluznplus.com/cluzn_backend/api/doAppointment"

        axios.post(api, {
            headers: {
                token: this.state.authtoken,
            },
            data: {
                doctor_id: this.state.docid,
                first_name: this.state.First_Name,
                last_name: this.state.Last_Name,
                date: this.state.selectdate + " " + this.state.selecttime,
                mobile: this.state.Mobile_Number,
                email: this.state.EMail,
            }
        })
            .then(response => {
                if (response.data.status == 'success') {
                    alert("Appointment Booked")
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

    async redirectToLogin() {
        try {
            await AsyncStorage.clear();
            this.props.navigation.navigate('GenerateOtpforLoginScreen')
        } catch (error) {
            console.log("Error resetting data" + error);
        }
    }

    render() {

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: GLOBAL.eva_lightpink }}>
                <StatusBar barStyle="light-content" hidden={false}
                    backgroundColor='#FEE1DC'
                    translucent={true}>
                </StatusBar>
                <ScrollView 
                behavior="padding"
                    // behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{
                        flex: 1,
                        backgroundColor: GLOBAL.eva_lightpink,
                        // height: heighttoDP(number = '100%'), width: widthtoDP(number = '100%')
                    }}>
                    {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
                    <Text style={{
                        color: GLOBAL.eva_black, marginTop: heighttoDP(number = '5%'),
                        fontWeight: 'bold', fontSize: heighttoDP(number = '3%'),
                        marginLeft: widthtoDP(number = "5%")
                    }}>Hello Varun,</Text>
                    <Text style={{
                        color: GLOBAL.eva_black,
                        marginTop: heighttoDP(number = '2%'),
                        fontWeight: 'bold',
                        fontSize: heighttoDP(number = '4%'),
                        marginLeft: widthtoDP(number = "5%"),
                        alignSelf: 'center'
                    }}>Appointment Details</Text>
                    {/* <View style={{
                        flexDirection: 'row', justifyContent: 'center',
                        marginTop: heighttoDP(number = '2.5%')
                    }}> */}
                    <View style={{
                        marginTop: widthtoDP(number = "5%"),
                        // backgroundColor: 'red',
                        alignItems: 'center', justifyContent: 'center',
                        marginTop: -heighttoDP(number = '0.5%'),
                    }}>
                        <Text style={{
                            marginBottom: heighttoDP(number = '1%'),
                            fontWeight: 'bold',
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
                                borderColor: GLOBAL.eva_midpink,

                            }} />
                    </View>
                    <View style={{
                        marginTop: widthtoDP(number = "5%"),
                        // backgroundColor: 'red',
                        alignItems: 'center', justifyContent: 'center',
                        // marginTop: -heighttoDP(number = '0%'),
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
                            , fontWeight: 'bold',
                        }}>Appointment Date</Text>
                        <TextInput
                            value={this.state.selectdate}
                            onFocus={() => {
                                // console.log('is focused')
                                this.setState({
                                    opendate: true,
                                    opentime: false
                                })
                            }}
                            maxLength={11}
                            style={{
                                paddingRight: widthtoDP(number = '20%'),
                                paddingLeft: widthtoDP(number = '4%'),
                                fontSize: heighttoDP(number = '2.7%'),
                                height: heighttoDP(number = '6%'),
                                width: widthtoDP(number = "83%"),
                                borderRadius: heighttoDP(number = '10%'),
                                borderWidth: heighttoDP(number = '.25%'),
                                borderColor: GLOBAL.eva_midpink
                            }} />
                        <TouchableOpacity
                            onPress={() => {


                            }}
                        >
                            <Image style={{
                                height: heighttoDP(number = '3.5%'),
                                width: heighttoDP(number = '3.5%'),
                                marginTop: -heighttoDP(number = '4.8%'),
                                marginLeft: widthtoDP(number = "65%")
                            }}
                                source={require('../../assets/icons/calender.png')} />
                        </TouchableOpacity>
                        <DatePicker
                            mode='date'
                            modal
                            open={this.state.opendate}
                            date={new Date(new Date().getTime() + 86400000)}
                            minimumDate={new Date(new Date().getTime() + 86400000)}
                            title='Select Appointment Date'
                            textColor={GLOBAL.eva_darkpink}
                            onDateChange={(e) => {
                                console.log(e)
                            }}
                            onConfirm={(e) => {
                                console.log(e)
                                this.setState({
                                    dd: e,
                                    opendate: false,
                                    selectdate: (e.getDate()) + '-' + this.checkSwitch(e.getMonth().toString()) + '-' + (e.getFullYear())
                                })
                                console.log(this.state.selectdate)
                            }}
                            onCancel={() => {
                                // setOpen(false)
                            }}
                        />

                    </View>
                    <View style={{
                        marginTop: widthtoDP(number = "5%"),
                        alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Text style={{
                            marginBottom: heighttoDP(number = '1%')
                            , fontWeight: 'bold'
                        }}>Appointment Time</Text>
                        <SelectDropdown
                            defaultValue="Select Slot"
                            dropdownStyle={{
                                width: h(4), backgroundColor: GLOBAL.eva_darkpink,
                                fontSize: h(5), height: h(25)
                            }}
                            rowStyle={{ height: h(5) }}
                            defaultButtonText="Select Slot"
                            buttonStyle={{
                                backgroundColor: GLOBAL.eva_midpink,
                                height: heighttoDP(number = '6%'),
                                width: widthtoDP(number = "83%"),
                                borderRadius: heighttoDP(number = '5%'),
                                // borderWidth: heighttoDP(number = '0.25%'),
                                // borderColor: GLOBAL.eva_midpink
                            }}
                            data={timeList}
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index)
                                this.setState({
                                    selecttime: selectedItem
                                })
                                // this.citynameset(selectedItem)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                // text represented after item is selected
                                // if data array is an array 
                                // console.log('selectedItem  ', selectedItem)
                                // this.setState({ myCity1: selectedItem })
                                // console.log('myCity1 in drop down  ', this.state.myCity1)
                                return selectedItem

                            }}
                            //buttonTextAfterSelection={this.state.cityname}
                            rowTextForSelection={(item, index) => {
                                // text represented for each item in dropdown
                                // if data array is an array of objects then return item.property to represent item in dropdown
                                return item
                            }}
                        />
                        {/* <TextInput
                            value={this.state.selecttime}
                            onFocus={() => {
                                console.log('is focused')
                                this.setState({
                                    opentime: true
                                })
                            }}
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
                                source={require('../../assets/icons/time.png')} />
                        </TouchableOpacity> */}
                        <DatePicker
                            mode='time'
                            modal
                            open={this.state.opentime}
                            date={this.state.dd}
                            is24hourSource='locale'
                            minuteInterval={15}
                            minimumDate={new Date()}
                            title='Select Appointment Time'
                            textColor={GLOBAL.eva_darkpink}
                            onDateChange={(e) => {
                                console.log(e)
                            }}
                            onConfirm={(e) => {
                                console.log('before' + this.state.opentime)
                                if ((e.toTimeString()).substring(0, 2) > 12) {
                                    this.setState({
                                        format: "PM",
                                        opentime: false,
                                    })
                                } else {
                                    this.setState({
                                        format: "AM",
                                        opentime: false,
                                    })
                                }
                                this.setState({
                                    selecttime: ((this.tConvert(e.toTimeString().substring(0, 8))).substring(0, (this.tConvert(e.toTimeString().substring(0, 8))).length - 5) + " " + this.state.format),
                                    opentime: false,
                                    // opendate: false,
                                })
                                console.log('after' + this.state.opentime)
                            }}
                            onCancel={() => {
                                // setOpen(false)
                            }}
                        />
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
                            // onFocus={this._scrollToInput.bind(this)}
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
                            width: widthtoDP(number = "65%"),
                            alignSelf: 'center',
                            alignItems: 'center', justifyContent: 'center',
                            marginTop: heighttoDP(number = '5%'),
                            borderRadius: heighttoDP(number = '5%')
                        }}>
                        <Text style={{
                            fontSize: heighttoDP(number = '2.5%'),
                            fontWeight: 'bold',
                            color: 'white'
                        }}>Book Now</Text>
                    </TouchableOpacity>
                    {/* </TouchableWithoutFeedback> */}
                </ScrollView>
            </SafeAreaView>
        )
    }
}
