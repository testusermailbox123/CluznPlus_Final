import React, { useState, useEffect } from 'react';
import { Text, View, StatusBar, Image, Dimensions, TouchableOpacity, ScrollView, Modal,
    TextInput,Pressable, SafeAreaView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { widthtoDP, heighttoDP } from './Responsive'
import { COLORS } from './theme'
import axios from 'axios';
import CheckBox from 'react-native-check-box'
import { h, w } from '../utils/Dimensions'
const width = Dimensions.get("window").width;
GLOBAL = require('./globals');

export default class EnterNameDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            E_Mail: '',
            Full_Name: '',
            email: '',
            name: '',
            authtoken: '',
            isChecked: true
        }
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    async getLocalData () {
        try {
            const loggedInSTatus = await AsyncStorage.getItem('LoggedIn');
            if (loggedInSTatus === 'Yes') {
                try {
                    const authtoken = await AsyncStorage.getItem('auth_token');
                    console.log("authtoken", authtoken)
                    if(authtoken == "" || authtoken == null) {
                        this.redirectToLogin()
                    } else {
                        this.setState({
                            authtoken: authtoken
                        })
                    }
                } catch (error) {
                    console.log("Error resetting data" + error);
                }
            } else {
                this.redirectToLogin()
            }
        } catch (error) {
            console.log("Error resetting data" + error);
        }
    }

    async redirectToLogin() {
        try {
            await AsyncStorage.clear();
            navigation.navigate('GenerateOtpforLoginScreen')
        } catch (error) {
            console.log("Error resetting data" + error);
        }
    }

    componentDidMount () {
        this.getLocalData();
    }

    enterdetails() {
        console.log("toke"+this.state.authtoken)
        if (this.state.Full_Name == '') {
            alert('Please enter Full name')
            // } else if (this.state.E_Mail.includes('com') == false || this.state.E_Mail.includes('@') == false) {
            //     alert('Please enter valid email address')
            // } else {
        } else {
            const data = {
                name: this.state.Full_Name,
                email: this.state.E_Mail
            };
            console.log(data)
            axios.post('https://cluznplus.com/cluzn_backend/api/firstNameAndEmailSave', data, {
                headers: {
                    token: this.state.authtoken
                }
            }
            ).then(response => {
                
                if(response.data.status == 'fail' && ( response.data.message == 'token blanked' || response.data.message == 'token mis matched' )) {
                    this.redirectToLogin()
                } else if(response.data.status == 'success') {
                    this.setState({
                        users: response.data.data
                    })
                    this.updateLocalData(response.data.data[0].is_name, response.data.data[0].is_email)
                } else {
                    alert(response.data.message)
                }
            })
                .catch((error) => {
                    console.log('error ' + error);
                    
                });
        }
    }

    async updateLocalData (is_name, ) {
        try {
            await AsyncStorage.setItem('userName', this.state.Full_Name)
            await AsyncStorage.setItem('userEmail', this.state.E_Mail)
            await AsyncStorage.setItem('is_name', is_name)
            await AsyncStorage.setItem('is_email', is_email);
            this.props.navigation.navigate('HospitalSearch');
        } catch (error) {
            this.redirectToLogin()
        }
    }

    render() {
        const { modalVisible } = this.state;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor:'white' }}>
                <StatusBar barStyle="light-content" hidden={false}
                    backgroundColor='#3CB3C3'
                    translucent={true}>
                </StatusBar>
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
                </Modal>                                                 */}
                <View style={{ flex: 0.6, backgroundColor: COLORS.blue, paddingLeft: h(2) }}>
                    <Text style={styles.flex1_text1}>Register</Text>
                    <Text style={styles.flex1_text3}>Hello. Thank you for signing up.</Text>
                </View>

                <View style={{
                    flex: 2, backgroundColor: COLORS.white,
                    paddingHorizontal: h(4)
                }}>

                    <Text style={styles.flex2_text1}>Please enter your details here</Text>

                    <View style={{
                        width: width - 60, height: h(7.2), marginTop: h(9),
                        backgroundColor: '#3CB3C3', borderRadius: 20, alignSelf: 'center', flexDirection: 'row'
                    }}>
                        <TextInput
                            allowFontScaling={false}
                            style={{ width: '80%', paddingLeft: h(6), color: 'black', fontSize: h(2.8) }}
                            placeholder="Enter Full Name..."
                            onChangeText={Full_Name =>
                                this.setState({ Full_Name })
                            }
                        />
                        <TouchableOpacity style={{ width: '20%', alignItems: 'center', justifyContent: 'center', }}>
                            <Image source={require('../assets/icons/person.png')} style={{ height: h(3), width: h(3), resizeMode: 'contain' }} />
                        </TouchableOpacity>
                    </View>
                    <Text style={{
                        //marginLeft: h(number = '10%'),
                        marginTop: h(1.5), alignSelf: 'center'

                    }}>Please enter your full name</Text>

                    <View style={{
                        width: width - 60, height: h(7.2), marginTop: h(5),
                        backgroundColor: '#3CB3C3', borderRadius: 20, alignSelf: 'center', flexDirection: 'row'
                    }}>
                        <TextInput
                            allowFontScaling={false}
                            style={{ width: '80%', paddingLeft: h(6), color: 'black', fontSize: h(2.8) }}
                            placeholder="Enter Email ID..."
                            keyboardType='email-address'
                            onChangeText={E_Mail =>
                                this.setState({ E_Mail })
                            }
                        />
                        <TouchableOpacity style={{ width: '20%', alignItems: 'center', justifyContent: 'center', }}>
                            <Image source={require('../assets/icons/mail.png')} style={{ height: h(3), width: h(3), resizeMode: 'contain' }} />
                        </TouchableOpacity>
                    </View>

                    <Text style={{
                        marginTop: h(1.5), alignSelf: 'center'
                    }}>Please enter your email ID (optional)*</Text>

                    <TouchableOpacity style={styles.flex2_button} onPress={() => this.enterdetails()}>
                        <Text style={{ alignSelf: 'center', fontSize: heighttoDP(number = '2.5%'), color: COLORS.white }}>Continue</Text>
                    </TouchableOpacity>
                    {/* <CheckBox
                        style={{ marginTop: h(10) }}
                        onClick={() => {
                            this.setState({
                                isChecked: !this.state.isChecked
                            })
                            this.state.isChecked ? alert('false') : alert('true')
                        }}
                        isChecked={this.state.isChecked}
                    />
                    <TouchableOpacity style={{ marginTop: -h(3.5), marginLeft: h(3) }}
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
    flex1_righticon:
    {
        marginLeft: widthtoDP(number = '12%'),
        marginTop: heighttoDP(number = '4%'),
    },
    flex1_text2:
    {
        fontSize: 18,
        color: COLORS.white,
    },
    flex1_text1:
    {
        fontSize: h(3.7),
        color: COLORS.white,
        marginTop: h(7),
    },
    flex1_text3:
    {
        fontSize: h(2),
        color: COLORS.white,
        marginTop: h(2),
    },
    flex1_image:
    {
        width: widthtoDP(number = '7%'),
        height: widthtoDP(number = '7%'),
    },
    flex2_text1:
    {
        fontSize: h(2.1),
        fontWeight: 'bold',
        color: COLORS.black,
        marginTop: heighttoDP(number = '4%'),
    },
    flex2_textinput1:
    {
        //marginLeft: widthtoDP(number = '7%'),
        marginTop: h(7),
        backgroundColor: '#3CB3C3',
        borderRadius: 20,
        fontWeight: 'bold',
        height: h(7),
        width: h(45),
        justifyContent: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: h(2.5),
    },
    flex2_textinput2:
    {
        marginTop: h(7),
        backgroundColor: '#3CB3C3',
        borderRadius: 20,
        fontWeight: 'bold',
        height: h(7),
        width: h(45),
        justifyContent: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: h(2.5),
    },
    flex2_image1:
    {
        marginLeft: h(40),
        marginTop: -(h(5.5)),
        height: h(4),
        width: h(4),
    },
    flex2_image2:
    {
        marginLeft: h(40),
        marginTop: -(h(5.5)),
        height: h(4),
        width: h(4),
    },
    flex2_button:
    {
        marginTop: h(5),
        height: h(6),
        width: h(20),
        backgroundColor: COLORS.blue,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 30
    }
})