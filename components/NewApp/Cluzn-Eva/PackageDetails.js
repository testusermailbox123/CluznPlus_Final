import React, { Component } from 'react'
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
            plan_image: '',
            status: 0
        }
    }
    UNSAFE_componentWillMount() {
        const { amount, name, expire_in_month, plan_id, plan_image, status } = this.props.route.params;
        this.setState({
            amount: amount,
            name: name,
            expire_in_month: expire_in_month,
            plan_id: plan_id,
            plan_image: plan_image,
            status: status
        })
    }

    onPressButton() {

        this.props.navigation.navigate('PurchaseForm', {
            plan_id: this.state.plan_id,
            amount: this.state.amount,
            plan_image: this.state.plan_image,
            status: this.state.status,
            name: this.state.name,
            expire_in_month: this.state.expire_in_month,

        });
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: GLOBAL.eva_lightpink, }}>
                <StatusBar barStyle="light-content" hidden={false}
                    backgroundColor='#FEE1DC'
                    translucent={true}>
                </StatusBar>
                <View style={{ flex: 1 }}>
                    <View style={{ height: heighttoDP(number = '70%') }}>
                        <Image
                            style={{ height: heighttoDP(number = '70%') }}
                            source={{
                                uri: "https://cluznplus.com/cluzn_backend/images/" + this.state.plan_image,
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
                        backgroundColor: GLOBAL.eva_lightpink,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>

                        <TouchableOpacity
                            onPress={() => this.onPressButton()}
                            style={{
                                backgroundColor: GLOBAL.eva_darkpink ,
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
