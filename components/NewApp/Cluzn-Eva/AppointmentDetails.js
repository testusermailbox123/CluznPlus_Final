import React, { Component, useState } from 'react'
import { Text, View, SafeAreaView, StatusBar, Alert, Button, TextInput, Image, TouchableOpacity, ScrollView, FlatList, VirtualizedList, StyleSheet } from 'react-native'
import { widthtoDP, heighttoDP } from '../Responsive';
GLOBAL = require('../globals');
import { h, w } from '../../utils/Dimensions'
import DatePicker from 'react-native-date-picker'



export default class AppointmentDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectdate: '',

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
                <View style={{
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
                    <DatePicker
                        mode='date'
                        modal
                        open={true}
                        date={new Date()}
                        onDateChange={(date) => {
                            console.log(date)
                        }}
                        onConfirm={(date1) => {
                            // this.setState({
                            //     selectdate: date1.getDate() + '-' + this.checkSwitch((date1.getMonth()).toString()) + '-' + date1.getFullYear()
                            // })
                            // console.log(this.state.selectdate)
                        }}

                    />
                </View>
            </SafeAreaView>
        )
    }
}
