import React, { useState, useEffect } from 'react';
import {
    Text, View, Image, Dimensions, TouchableOpacity, BackHandler, Pressable,
    ScrollView, TextInput, SafeAreaView, StyleSheet, Alert, Modal,
} from 'react-native';
import { widthtoDP, heighttoDP } from './Responsive'
import { COLORS } from './theme'
import CheckBox from 'react-native-check-box'
import { StatusBar } from 'react-native'
GLOBAL = require('./globals');
import axios from 'axios';
import WebView from 'react-native-webview'
// import auth from '@react-native-firebase/auth';
import { h, w } from '../utils/Dimensions'
import { ForceTouchGestureHandler } from 'react-native-gesture-handler';
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default class GenerateOtpforLoginScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            phonenumber: '',
            setConfirm: null,
            modalVisible: false,
            isChecked: true
        }
    }

    // setModalVisible = (visible) => {
    //     this.setState({ modalVisible: visible });
    // }

    componentDidMount() {

        const { navigation } = this.props;

        BackHandler.addEventListener('hardwareBackPress', function () {
            console.log(navigation.isFocused());
            if (navigation.isFocused()) {
                Alert.alert(
                    'Exit App',
                    'Are you sure you want to exit?',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                        },
                        {
                            text: 'Yes',
                            onPress: () => {
                                return BackHandler.exitApp();
                            }
                        },
                    ],
                    { cancelable: false },
                );
                return true;
            }
            return false;
        });
    }

    handleSendCode() {
        //console.log(this.state.isChecked)
        if (!this.state.isChecked) {
            alert('Please accept the Terms and Conditions to proceed..')
        } else {

            const data = {
            };
            if (this.state.phonenumber == '' || this.state.phonenumber.length < 10) {
                alert('Please enter 10 digit phone number')
            } else {
                const data = {
                    phone_number: this.state.phonenumber
                };

                axios.post('http://cluznplus.com/api/sendOtp', data).then(response => {
                    //console.log('All data', response.data);
                    this.setState({
                        users: response.data.data
                    })
                    console.log('user  - ', this.state.users[0].is_name)
                    this.props.navigation.navigate('EnterGeneratedOTP', {
                        authtokenfromgenerateotpscreen: this.state.users[0].auth_token,
                        confirmationdata: this.state.users[0].is_name,
                        //otpfromfromgenerateotpscreen: this.state.users[0].otp,
                        phonenumberfromgenerateotpscreen: '+91' + this.state.phonenumber
                    })
                })
                    .catch((error) => {
                        console.log('error ' + error);

                        alert(error)

                    });
            }
        }
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    render() {
        const { modalVisible } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 , backgroundColor:'white'}}>
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    backgroundColor='#3CB3C3'
                    translucent={true}>
                </StatusBar>
                <View style={{
                    flex: 0.8, flexDirection: 'row',
                    backgroundColor: COLORS.blue
                }}>
                    <Text style={styles.flex1_text}>Welcome,</Text>
                </View>
                {/* <Modal
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
                            <Text style={{ fontSize: h(3), color: 'black' }}>
                                Terms and Conditions
                            </Text>
                            <Text style={{ fontSize: h(1.8), marginTop: h(1) }}>
                                By accessing this website we assume you accept these terms and conditions.
                                Do not continue to use Website Name if you do not agree to take all of the terms and conditions stated on this page.
                                The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and
                                all Agreements: “Client”, “You” and “Your” refers to you, the person log on this website and compliant to
                                the Company's terms and conditions. “The Company”, “Ourselves”, “We”, “Our” and “Us”, refers to our Company.
                                “Party”, “Parties”, or “Us”, refers to both the Client and ourselves.
                            </Text>
                            <Pressable
                                style={[styles.button, styles.buttonClose, styles.popup]}
                                onPress={() => this.setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Got It</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal> */}

                <View style={{ flex: 2, backgroundColor: COLORS.white, paddingHorizontal: h(5) }}>
                    <Text style={styles.flex2_text1}>Log In with Mobile No.</Text>
                    <Text style={styles.flex2_text2}>Please enter your Mobile Number</Text>
                    <View style={{
                        width: width - 110, height: h(7), marginTop: h(6),
                        backgroundColor: COLORS.blue, borderRadius: 20, alignSelf: 'center', flexDirection: 'row'
                    }}>
                        <TextInput
                            style={{ width: '80%', paddingLeft: 30, alignItems: 'center', fontSize: h(2.35), color: COLORS.black, paddingTop: h(1) }}
                            placeholder="Enter mobile number..."
                            //textAlign={'center'}
                            allowFontScaling={false}
                            maxLength={10}
                            keyboardType='number-pad'
                            onChangeText={(phonenumber) => this.setState({ phonenumber })}
                        />
                        <Image source={require('../assets/icons/phone.png')} style={{ height: h(3.5), width: h(3.5), resizeMode: 'contain', marginTop: h(1.7) }} />
                    </View>
                    {/* <TextInput onChangeText={(phonenumber) => this.setState({ phonenumber })}
                        textAlign={'center'}
                        maxLength={10}
                        keyboardType='number-pad'
                        placeholder="Enter mobile number" style={styles.flex2_textinput} />
                    <Image source={require('../assets/icons/phone.png')} style={styles.flex2_image} /> */}
                    <Text style={styles.flex2_text3}>An OTP will be sent to your Mobile.</Text>
                    <TouchableOpacity style={styles.flex2_button}
                        onPress={() => this.handleSendCode()} >
                        <Text style={{ alignSelf: 'center', fontSize: heighttoDP(number = '3%'), color: COLORS.white }}>Get OTP</Text>
                    </TouchableOpacity>
                    {/* <CheckBox
                        style={{ marginTop: h(13) }}
                        onClick={() => {
                            this.setState({
                                isChecked: !this.state.isChecked
                            })
                            // this.state.isChecked ? alert('false') : alert('true')
                        }}
                        isChecked={this.state.isChecked}
                    />
                    <TouchableOpacity style={{ marginLeft: h(3), marginTop: -h(4) }}
                        onPress={() => this.setModalVisible(true)}>
                        <Text style={{ alignSelf: 'center', fontSize: h(2) }}>I understand and accept the Terms and Conditions</Text>
                    </TouchableOpacity> */}
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    flex1_lefticon:
    {
        color: COLORS.white,
        marginLeft: widthtoDP(number = '3%'),
        marginTop: heighttoDP(number = '4%'),
        width: widthtoDP(number = '5%'),
        height: widthtoDP(number = '5%'),

    },
    flex1_image:
    {
        width: widthtoDP(number = '7%'),
        height: widthtoDP(number = '7%'),
    },
    flex1_text:
    {
        color: COLORS.white,
        fontSize: h(4.8),
        marginTop: h(10),
        marginLeft: h(5)
    },
    popup:
    {
        marginTop: h(2)
    },
    flex2_text1:
    {
        color: COLORS.black,
        fontWeight: 'bold',
        fontSize: h(3.5),
        marginTop: h(5),
    },
    flex2_text2:
    {
        color: COLORS.black,
        fontSize: h(2.2),
        //marginLeft:h(5),
        fontWeight: 'bold',
        marginTop: h(1)
    },
    flex2_textinput:
    {
        borderWidth: 0,
        marginTop: heighttoDP(number = '4%'),
        height: heighttoDP(number = '7%'),
        width: widthtoDP(number = '85%'),
        borderRadius: 12,
        fontWeight: 'bold',
        fontSize: widthtoDP(number = '5%'),
        paddingLeft: 10,
        //textAlign: 'center',
        backgroundColor: COLORS.blue,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    flex2_image:
    {
        width: widthtoDP(number = '5.5%'),
        height: heighttoDP(number = '3.5%'),
        marginLeft: (widthtoDP(number = '80%')),
        marginTop: -(heighttoDP(number = '5.2%')),
    },
    flex2_text3:
    {
        color: COLORS.black,
        fontSize: h(2.2),
        marginTop: h(5),
        justifyContent: 'center',
        alignSelf: 'center',
        fontWeight: "bold"
    },
    flex2_button:
    {
        borderWidth: 0,
        height: h(6),
        width: h(20),
        borderRadius: 35,
        textAlign: 'center',
        backgroundColor: '#3CB3C3',
        alignContent: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: h(7),
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
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
        padding: 5,
        elevation: 2,
        width: h(10)
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})