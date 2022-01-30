import React, { useState, useEffect } from 'react';
import { Text, View, Image, StatusBar, TouchableOpacity, Pressable, Modal, Keyboard, KeyboardAvoidingView, ScrollView, TextInput, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import CheckBox from 'react-native-check-box'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Tooltip, SocialIcon, LinearGradient, ListItem, Avatar, Badge, Input } from 'react-native-elements';
import { COLORS, SIZES, FONTS } from './theme'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
// import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { widthtoDP, heighttoDP } from './Responsive'
GLOBAL = require('./globals');
import { h, w } from '../utils/Dimensions'
//const apikey = '58b0000b-d2da-11eb-8089-0200cd936042'
const apikey = 'fa24b744-d3e1-11eb-8089-0200cd936042'

export default class EnterGeneratedOTP extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userotp: '',
            userotp1: '',
            userotp2: '',
            userotp3: '',
            userotp4: '',
            details: '',
            userotp5: '',
            userotp6: '',
            authtokenfromgenerateotpscreen: '',
            otpfromfromgenerateotpscreen: '',
            phonenumberfromgenerateotpscreen: '',
            authtokenfrom_EnterGeneratedOTP: '',
            phonenumberfrom_GeneratedOTP: '',
            confirmationdata_fromgenerateotp: '',
            phonenum: '',
            confirm: '',
            status: '',
            matchstatus: '',
            modalVisible: false,
            isChecked: true
        }
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
        if (visible) {
            this.setState({ isChecked: true })
        } else {
            this.setState({ isChecked: true })
        }
    }

    dataget() {
        const { is_name, is_email, userName, userEmail, authtokenfromgenerateotpscreen, confirmationdata, phonenumberfromgenerateotpscreen } = this.props.route.params;
        // console.log(phonenumberfromgenerateotpscreen)
        this.signInWithPhoneNumber(phonenumberfromgenerateotpscreen)
        this.setState({
            is_name: is_name,
            is_email: is_email,
            userName: userName,
            userEmail: userEmail,
            confirmationdata_fromgenerateotp: confirmationdata,
            authtokenfrom_EnterGeneratedOTP: authtokenfromgenerateotpscreen,
            phonenumberfrom_GeneratedOTP: phonenumberfromgenerateotpscreen
        })
    }

    UNSAFE_componentWillMount() {
        this.dataget()
    }

    async signInWithPhoneNumber(phone) {
        // console.log('https://2factor.in/API/V1/' + apikey + '/SMS/' + phone + '/AUTOGEN/OTP1')
        try {
            axios.post('https://2factor.in/API/V1/' + apikey + '/SMS/' + phone + '/AUTOGEN').then(response => {
                this.setState({
                    details: response.data.Details,
                    status: response.data.Status
                })
                // console.log(this.state.details)
                // console.log(this.state.status)
            })
        } catch (error) {
            //console.log(error)
            alert(error);
        }
    }

    async generateotp() {
        // console.log('this.state.signInWithPhoneNumber from  generateotp == ', this.state.phonenumberfrom_GeneratedOTP)
        try {
            //const confirmation = await auth().signInWithPhoneNumber(this.state.phonenumberfrom_GeneratedOTP);
            this.setState({ confirm: confirmation });
        } catch (error) {
            // console.log(error)
            alert(error);
        }
    }

    handleKeyPress(event) {
        alert(event.key);
        if (event.key === 'Enter') {
            // console.log('enter press here! ')
        }
    }

    async confirmCode() {
        if (!this.state.isChecked) {
            alert('Please accept the Terms and Conditions to proceed..')
        } else {
            // console.log('https://2factor.in/API/V1/' + apikey + '/SMS/VERIFY/' + this.state.details + '/' + this.state.userotp1 + this.state.userotp2 + this.state.userotp3 + this.state.userotp4 + this.state.userotp5 + this.state.userotp6)
            if ((this.state.userotp1 + this.state.userotp2 + this.state.userotp3 + this.state.userotp4 + this.state.userotp5 + this.state.userotp6).length == 6) {
                try {
                    axios.post('https://2factor.in/API/V1/' + apikey + '/SMS/VERIFY/' + this.state.details + '/' + this.state.userotp1 + this.state.userotp2 + this.state.userotp3 + this.state.userotp4 + this.state.userotp5 + this.state.userotp6).then(response => {
                        // console.log(response.data.Status)
                        // console.log(response.data.Details)
                        console.log('Login successfull');
                        AsyncStorage.setItem('LoggedIn', 'Yes');
                        AsyncStorage.setItem('auth_token', this.state.authtokenfrom_EnterGeneratedOTP)
                        AsyncStorage.setItem('userName', this.state.userName)
                        AsyncStorage.setItem('userEmail', this.state.userEmail)
                        AsyncStorage.setItem('is_name', Boolean(this.state.is_name)?'true':'false')
                        AsyncStorage.setItem('is_email', Boolean(this.state.is_email)?'true':'false')
                        // console.log('Auth toke value is = ', this.state.authtokenfrom_EnterGeneratedOTP);
                        //response.data.Details == "OTP Matched" && 
                        // console.log('this.state.confirmationdata_fromgenerateotp', response.data.Details)
                        // console.log('this.state.confirmationdata_fromgenerateotp', this.state.confirmationdata_fromgenerateotp)
                        // if (this.state.confirmationdata_fromgenerateotp.toString() == "false") {
                        if (!this.state.is_name) {
                            // console.log('this.state.confirmationdata_fromgenerateotp', this.state.confirmationdata_fromgenerateotp)
                            // this.props.navigation.navigate('EnterNameDetails', {
                            //     authtokenfromEnterGeneratedOTP: this.state.authtokenfrom_EnterGeneratedOTP
                            // })
                            this.props.navigation.navigate('EnterNameDetails')
                        } else {
                            // console.log(this.state.confirmationdata_fromgenerateotp)
                            this.props.navigation.navigate('HospitalSearch')

                        }
                        return response
                    }).catch((error) => {
                        // console.log('error is ----', error)
                        //alert(error);
                        alert('OTP not correct. Please enter a valid OTP')
                    }).finally((response) => {
                        // console.log(response)
                        //console.log('inside try inside finally')
                    });
                } catch (error) {
                    //console.log('error is ----', error)
                    alert(error);
                    //alert('inside main catch')
                }
            }
            else {
                alert('OTP not correct. Please enter 6 digit OTP')
            }
        }
    }

    _focusNextField(nextField) {
        this.refs[nextField].focus()
    }

    render() {
        const { modalVisible } = this.state;
        return (
            
            // <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView  style={{ flex: 1 }}>
                <StatusBar barStyle="light-content" hidden={false}
                    backgroundColor='#3CB3C3'
                    translucent={true}>
                </StatusBar>
                <View style={{ flex: 1, backgroundColor: COLORS.blue, paddingLeft: h(4), paddingTop: h(7) }}>
                    <Text style={{
                        fontSize: h(5),
                    }}>Register</Text>
                    <Text style={{
                        fontSize: h(2.7), marginTop: h(4),
                        color: 'white'
                    }}>Hello, Thank you for signing up.</Text>
                </View>
                <Modal

                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been .");
                        this.setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>

                            <Text allowFontScaling={false} style={{ fontSize: h(3), color: 'black', alignSelf: 'center' }}>
                                Terms and Conditions
                            </Text>
                            <ScrollView style={{ marginTop: h(1) }}>
                                <Text allowFontScaling={false} style={{ fontSize: h(2), color: 'black', marginTop: h(1) }}>
                                    Disclaimer of liability:
                                </Text>
                                <Text allowFontScaling={false} style={{ fontSize: h(1.5), marginTop: h(0.5),color:'#3CB3C3' }}>
                                    1- With this app, we are not liable for suggesting any doctor, hospital, clinic and any health services on the basis of symptoms ,disease, queries entered by you. This is just for a reference and this app is not forcing you (in any ways) to visit/consult any of the listed or non listed doctors, hospital ,clinic and any other health services
                                </Text>
                                <Text allowFontScaling={false} style={{ fontSize: h(1.5),color:'#3CB3C3' }}>
                                    2- Any type of medical/non medical, physical, mental treatments such as investigation, diagnosis, test, exercises, advises are strictly neither a part of this app nor of any doctor or user, who is using this app.
                                </Text>
                                <Text allowFontScaling={false} style={{ fontSize: h(1.5) ,color:'#3CB3C3'}}>
                                    3- Any kind of medicines (pills, capsules, syrups, ointments, drugs, injections and medical or non medical products) for external/internal use on your body is strictly neither a part of this app nor of any doctor or user, who is using this app.
                                </Text>
                                <Text allowFontScaling={false} style={{ fontSize: h(2), color: 'black', marginTop: h(1) }}>
                                    Disclaimer of content:
                                </Text>
                                <Text allowFontScaling={false} style={{ fontSize: h(1.5), marginTop: h(0.5),color:'#3CB3C3' }}>
                                    1- All information in the app like doctors, their specialization, clinic/hospital address, contact number and any kind of personal/non personal information is gathered from publically accessible sources. Any kind of issues related to these are not negotiable at any point .All information, listed in app could be differ ,not updated, incomplete. therefore users are always requested to take their own decision
                                </Text>
                                <Text allowFontScaling={false} style={{ fontSize: h(1.5) ,color:'#3CB3C3'}}>
                                    2 Any change in the information such as doctors, their specialization, clinic/hospital address, contact number and any kind of personal/non personal information can only be done by the app owner.
                                </Text>
                                <Text allowFontScaling={false} style={{ fontSize: h(1.5),color:'#3CB3C3' }}>
                                    3 App design and content related information such as images, symptoms and related details are gathered from publically accessible sources. Any kind of issues related to these are not negotiable at any point.
                                </Text>
                                <Text allowFontScaling={false} style={{ fontSize: h(2), color: 'black', marginTop: h(1) }}>
                                    Ownership and members:
                                </Text>
                                <Text allowFontScaling={false} style={{ fontSize: h(1.5), marginTop: h(0.5),color:'#3CB3C3' }}>
                                    1-This app is solely owned by INCLUZN LIFESCIENCES PVT.LTD. The app is neither associated with any other members, partners, stakeholders, individual nor any kind of organization.
                                </Text>
                                <Text allowFontScaling={false} style={{ fontSize: h(1.5),color:'#3CB3C3' }}>
                                    2- Appointments booked through this app can be deleted/ modified/cancelled by Doctors, hospital and any other services without any prior notification. Also, due to technical/internet issues, appointments can be deleted/modified/ cancelled without any prior notification. Any issues related to these causes are not negotiable at any point.
                                </Text>
                                <Text allowFontScaling={false} style={{ fontSize: h(2), color: 'black', marginTop: h(1) }}>
                                    Terms and conditions for usage :
                                </Text>
                                <Text allowFontScaling={false} style={{ fontSize: h(1.5), marginTop: h(0.5),color:'#3CB3C3' }}>
                                    1- Any person who has successfully downloaded this app from sources like Google Play Store, AppleiTunes Store or from any kind of legal sources, will be considered as User.
                                </Text>
                                <Text allowFontScaling={false} style={{ fontSize: h(1.5),color:'#3CB3C3' }}>
                                    2- If any type of written/oral, electronic/graphical, any kind of advises/suggestions communicated between one and other will not be treated as app users.
                                </Text>
                                <Text allowFontScaling={false} style={{ fontSize: h(1.5),color:'#3CB3C3' }}>
                                    3-This app is just for a reference and it is not making any kind of restrictions to visit/consult any doctor ,hospital and any health services, INCLUZN LIFE SCIENCES PVT LTD. will not be responsible for any kind of loss, by any of the way, related to and by this app.
                                </Text>
                                <Text allowFontScaling={false} style={{ fontSize: h(1.5) }}>
                                    I shall be solely responsible for any kind of loss. I hereby accept that mentioned above terms and conditions is properly read/understood by me. I accept the terms and conditions.
                                </Text>
                            </ScrollView>
                            <Pressable
                                style={[styles.button, styles.buttonClose, styles.popup]}
                                onPress={() => this.setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Got It</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                <View style={{
                    flex: 3,
                    //backgroundColor: 'green' 
                }}>
                    <View style={{
                        flex: 0.5,
                        //backgroundColor: 'blue' 
                    }}>
                        <Text style={{
                            fontSize: h(3.5),
                            marginTop: h(3),
                            alignSelf: 'center',
                        }}>Enter verification code</Text>
                    </View>
                    <View style={{
                        flex: 0.5, flexDirection: 'row', alignSelf: 'center',
                        marginTop: h(2),
                        //backgroundColor:'yellow' 
                    }}
                    >
                        <TextInput
                            ref='1'
                            //ref={input => {this.input_1 = input; }}
                            maxLength={1}
                            keyboardType='number-pad'
                            // onChangeText={userotp1 =>
                            //     this.setState({ userotp1 })
                            // }
                            onChangeText={userotp1 => {
                                this.setState({ userotp1 })
                                if (userotp1) this._focusNextField('2'); else;
                            }}
                            style={{
                                padding: 3,
                                backgroundColor: 'white',
                                alignSelf: 'center',
                                borderWidth: 0.3,
                                borderRadius: 10,
                                height: h(6.7),
                                width: h(6.7),
                                alignContent: 'center',
                                textAlign: 'center',
                                fontSize: h(2.5),
                                justifyContent: 'center',
                                marginHorizontal: h(0.5),
                            }}
                        ></TextInput>
                        <TextInput
                            ref='2'
                            maxLength={1}
                            keyboardType='number-pad'
                            onKeyPress={({ nativeEvent }) => {
                                //alert(nativeEvent.key);
                                //alert(this.state.userotp2);
                                if (nativeEvent.key === 'Backspace' && this.state.userotp2 == '') {
                                    this._focusNextField('1')
                                }
                            }}
                            // onChangeText={userotp2 =>
                            //     this.setState({ userotp2 })
                            // }
                            onChangeText={userotp2 => {
                                this.setState({ userotp2 })
                                if (userotp2) this._focusNextField('3');
                            }}
                            style={{
                                padding: 3,
                                backgroundColor: 'white',
                                alignSelf: 'center',
                                borderWidth: 0.3,
                                borderRadius: 10,
                                height: h(6.7),
                                width: h(6.7),
                                alignContent: 'center',
                                textAlign: 'center',
                                fontSize: h(2.5),
                                justifyContent: 'center',
                                marginHorizontal: h(0.5),
                            }}
                        ></TextInput>
                        <TextInput
                            ref='3'
                            //ref={input => {this.input_3 = input; }}
                            maxLength={1}
                            onKeyPress={({ nativeEvent }) => {
                                //alert(nativeEvent.key);
                                //alert(this.state.userotp2);
                                if (nativeEvent.key === 'Backspace' && this.state.userotp3 == '') {
                                    this._focusNextField('2')
                                }
                            }}
                            keyboardType='number-pad'
                            // onChangeText={userotp3 =>
                            //     this.setState({ userotp3 })
                            // }
                            onChangeText={userotp3 => {
                                this.setState({ userotp3 })
                                if (userotp3) this._focusNextField('4');
                            }}
                            style={{
                                padding: 3,
                                backgroundColor: 'white',
                                alignSelf: 'center',
                                borderWidth: 0.3,
                                borderRadius: 10,
                                height: h(6.7),
                                width: h(6.7),
                                alignContent: 'center',
                                textAlign: 'center',
                                fontSize: h(2.5),
                                justifyContent: 'center',
                                marginHorizontal: h(0.5),
                            }}
                        ></TextInput>
                        <TextInput
                            ref='4'
                            onKeyPress={({ nativeEvent }) => {
                                //alert(nativeEvent.key);
                                //alert(this.state.userotp2);
                                if (nativeEvent.key === 'Backspace' && this.state.userotp4 == '') {
                                    this._focusNextField('3')
                                }
                            }}
                            maxLength={1}
                            keyboardType='number-pad'
                            // onChangeText={userotp4 =>
                            //     this.setState({ userotp4 })
                            // }
                            onChangeText={userotp4 => {
                                this.setState({ userotp4 })
                                if (userotp4) this._focusNextField('5');
                            }}
                            style={{
                                padding: 3,
                                backgroundColor: 'white',
                                alignSelf: 'center',
                                borderWidth: 0.3,
                                borderRadius: 10,
                                height: h(6.7),
                                width: h(6.7),
                                alignContent: 'center',
                                textAlign: 'center',
                                fontSize: h(2.5),
                                justifyContent: 'center',
                                marginHorizontal: h(0.5),
                            }}
                        ></TextInput>
                        <TextInput
                            ref='5'
                            maxLength={1}
                            onKeyPress={({ nativeEvent }) => {
                                //alert(nativeEvent.key);
                                //alert(this.state.userotp2);
                                if (nativeEvent.key === 'Backspace' && this.state.userotp5 == '') {
                                    this._focusNextField('4')
                                }
                            }}
                            keyboardType='number-pad'
                            // onChangeText={userotp5 =>
                            //     this.setState({ userotp5 })
                            // }
                            onChangeText={userotp5 => {
                                this.setState({ userotp5 })
                                if (userotp5) this._focusNextField('6');
                            }}
                            style={{
                                padding: 3,
                                backgroundColor: 'white',
                                alignSelf: 'center',
                                borderWidth: 0.3,
                                borderRadius: 10,
                                height: h(6.7),
                                width: h(6.7),
                                alignContent: 'center',
                                textAlign: 'center',
                                fontSize: h(2.5),
                                justifyContent: 'center',
                                marginHorizontal: h(0.5),
                            }}
                        ></TextInput>
                        <TextInput
                            ref='6'
                            maxLength={1}
                            onKeyPress={({ nativeEvent }) => {
                                //alert(nativeEvent.key);
                                //alert(this.state.userotp2);
                                if (nativeEvent.key === 'Backspace' && this.state.userotp6 == '') {
                                    this._focusNextField('5')
                                }
                            }}
                            keyboardType='number-pad'
                            // onChangeText={userotp6 =>
                            //     this.setState({ userotp6 })
                            // }
                            onChangeText={userotp6 => {
                                this.setState({ userotp6 })
                                //}}
                                // if (userotp6) ; else this._focusNextField('5') ;
                            }}
                            style={{
                                padding: 3,
                                backgroundColor: 'white',
                                alignSelf: 'center',
                                borderWidth: 0.3,
                                borderRadius: 10,
                                height: h(6.7),
                                width: h(6.7),
                                alignContent: 'center',
                                textAlign: 'center',
                                fontSize: h(2.5),
                                justifyContent: 'center',
                                marginHorizontal: h(0.5),
                            }}
                        ></TextInput>
                    </View>

                    <View
                        style={{
                            //backgroundColor: 'red',
                            flex: 2.5
                        }}
                    >
                        <TouchableOpacity style={{ marginTop: h(3) }} onPress={() => this.signInWithPhoneNumber(this.state.phonenumberfrom_GeneratedOTP)}
                        >
                            <Text style={{ alignSelf: 'center', fontSize: h(2) }}>Didn't get the code? Resend..</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.confirmCode()}
                            style={{
                                borderWidth: 0,
                                marginTop: h(4),
                                height: h(6),
                                width: h(20),
                                borderRadius: 20,
                                textAlign: 'center',
                                backgroundColor: COLORS.blue,
                                alignContent: 'center',
                                justifyContent: 'center',
                                alignSelf: 'center',
                            }}>
                            <Text style={{ alignSelf: 'center', fontSize: h(3.5), color: 'white' }}>Verify</Text>
                        </TouchableOpacity>
                        <View style={{
                            marginTop: h(20),flexDirection: 'row',justifyContent: 'center'
                        }}>
                            <CheckBox
                                style={{}}
                                onClick={() => {
                                    this.setState({
                                        isChecked: !this.state.isChecked
                                    })
                                }}
                                isChecked={this.state.isChecked}
                            />
                            <TouchableOpacity style={{ marginLeft: h(2) }}
                                onPress={() => this.setModalVisible(true)}>
                                <Text allowFontScaling={false} style={{ fontSize: h(1.8),color:'#3CB3C3' }}>I understand and accept the Terms and Conditions</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                </KeyboardAvoidingView>
            // </SafeAreaView >
            
        )
    }
}

const styles = StyleSheet.create({
    textbox:
    {
        borderColor: COLORS.black,
        borderWidth: 1,
        borderRadius: 25,
        marginTop: 120,
        width: 350,
        alignSelf: 'center',
        color: COLORS.gray,
        fontSize: SIZES.body2,
    },
    heading:
    {
        alignContent: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        height: h(50),
        backgroundColor: "white",
        borderRadius: 25,
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 5, marginTop: h(2),
        elevation: 2,
        width: h(13), height: h(5), alignItems: 'center', justifyContent: 'center'
    },
    buttonOpen: {
        backgroundColor: "#3CB3C3",
    },
    buttonClose: {
        backgroundColor: "#3CB3C3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center", fontSize: h(2.5)
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})