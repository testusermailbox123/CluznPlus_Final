import React, { Component } from 'react'
import {
    Text, View, SafeAreaView, StatusBar, Image,
    TouchableOpacity, ScrollView, FlatList, VirtualizedList,
    StyleSheet
} from 'react-native'
import { widthtoDP, heighttoDP } from '../Responsive';
GLOBAL = require('../globals');

export default class DoctorDescription extends Component {

    _onPress(item) 
    {
        this.props.navigation.navigate('AppointmentDetails', {
            
        });
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <StatusBar barStyle="light-content" hidden={false}
                    backgroundColor='#FEE1DC'
                    translucent={true}>
                </StatusBar>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <Image
                            style={{ flex: 1 }}
                            source={{
                                uri: 'https://reactnative.dev/img/tiny_logo.png',
                            }}
                        />
                    </View>
                    <View style={{
                        flex: 2, marginLeft: heighttoDP(number = '3%'),
                        marginTop: heighttoDP(number = '3%')
                    }}>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: heighttoDP(number = '3%')
                        }}
                        >Dr. Stella Kane</Text>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: heighttoDP(number = '2%')
                        }}
                        >Heart Surgeon - Flower Hospitals</Text>
                        <TouchableOpacity 
                        onPress={() => this._onPress()}
                        style={{
                            backgroundColor: GLOBAL.eva_midpink,
                            width: widthtoDP(number = '90%'), alignSelf: 'center',
                            borderRadius: heighttoDP(number = '40%')
                            , justifyContent: 'center', height: heighttoDP(number = '6%'),
                            marginTop: heighttoDP(number = '3%')
                        }}>
                            <Text style={{
                                color: 'white', alignSelf: 'center',
                                fontSize: heighttoDP(number = '2%')
                            }}>Book Appointment</Text>
                        </TouchableOpacity>
                        <Text style={{
                            fontWeight: 'bold', marginTop: heighttoDP(number = '3%'),
                            fontSize: heighttoDP(number = '2.5%')
                        }}>About Doctor</Text>
                        <Text style={{ marginTop: heighttoDP(number = '3%'), }}>Dr. Stella is the top most heart surgeon in Flower Hospital.
                            She has done over 100 successful sugeries within past 3 years.
                            She has achieved severalawards for her wonderful contribution
                            in her own field. She’s available for private consultation for
                            given schedules.</Text>
                        <Text style={{
                            fontWeight: 'bold', marginTop: heighttoDP(number = '3%'),
                            fontSize: heighttoDP(number = '2.5%')
                        }}>Video</Text>
                       <Text style={{
                            fontWeight: 'bold', marginTop: heighttoDP(number = '3%'),
                            fontSize: heighttoDP(number = '2.5%')
                        }}>Image</Text>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}
