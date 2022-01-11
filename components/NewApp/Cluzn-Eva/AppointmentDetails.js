import React, { Component, useState } from 'react'
import { Text, View, SafeAreaView, StatusBar, Alert, Button,KeyboardAvoidingView,
     TextInput, Image, TouchableOpacity, ScrollView, FlatList, VirtualizedList, StyleSheet } from 'react-native'
import { widthtoDP, heighttoDP } from '../Responsive';
GLOBAL = require('../globals');
import { h, w } from '../../utils/Dimensions'
import DatePicker from 'react-native-date-picker'



export default class AppointmentDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectdate: '',
            opendate: false
        }

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
    render() {

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
                            <Text style={{ marginBottom: heighttoDP(number = '1%'), fontWeight: 'bold' }}>First Name</Text>
                            <TextInput style={{
                                height: heighttoDP(number = '6%'),
                                width: widthtoDP(number = "37%"),
                                borderRadius: heighttoDP(number = '10%'),
                                borderWidth: heighttoDP(number = '.25%'),
                                borderColor: GLOBAL.eva_midpink
                            }} />
                        </View>
                        <View>
                            <Text style={{ marginBottom: heighttoDP(number = '1%'), fontWeight: 'bold' }}>Last Name</Text>
                            <TextInput style={{
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
                        }}>Appointment Date</Text>
                        <TextInput style={{
                            height: heighttoDP(number = '6%'),
                            width: widthtoDP(number = "83%"),
                            borderRadius: heighttoDP(number = '10%'),
                            borderWidth: heighttoDP(number = '.25%'),
                            borderColor: GLOBAL.eva_midpink
                        }} />
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    
                                })
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
                            date={new Date()}
                            minimumDate={new Date()}
                            title='Select Appointment Date'
                            textColor={GLOBAL.eva_darkpink}
                            onDateChange={(e) => {
                                console.log(e)
                            }}
                            onConfirm={(e) => {
                                console.log(e)
                                this.setState({
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
                        <TextInput style={{
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
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        marginTop: widthtoDP(number = "5%"),
                        alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Text style={{
                            marginBottom: heighttoDP(number = '1%')
                            , fontWeight: 'bold'
                        }}>Mobile Number</Text>
                        <TextInput style={{
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
                        <Text style={{
                            marginBottom: heighttoDP(number = '1%')
                            , fontWeight: 'bold'
                        }}>E-Mail</Text>
                        <TextInput 
                        maxLength={20}
                        style={{paddingHorizontal:heighttoDP(number = '10%'),
                            height: heighttoDP(number = '6%'),
                            width: widthtoDP(number = "83%"),
                            borderRadius: heighttoDP(number = '10%'),
                            borderWidth: heighttoDP(number = '.25%'),
                            borderColor: GLOBAL.eva_midpink
                        }} />
                    </View>
                    <TouchableOpacity style={{
                        backgroundColor: GLOBAL.eva_midpink,
                        height: heighttoDP(number = '6%'),
                        width: widthtoDP(number = "83%"),
                        alignSelf: 'center',
                        alignItems: 'center', justifyContent: 'center',
                        marginTop: heighttoDP(number = '5%'),
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
