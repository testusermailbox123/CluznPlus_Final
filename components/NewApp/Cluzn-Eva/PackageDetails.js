import React, { Component } from 'react'
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
        }
    }
    UNSAFE_componentWillMount() {
        const { amount,name,expire_in_month } = this.props.route.params;
        this.setState({
            amount:amount,
            name: name,
            expire_in_month: expire_in_month,
        })
    }

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
                                uri: 'https://reactnative.dev/img/tiny_logo.png',
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
                            style={{
                                backgroundColor: GLOBAL.eva_darkpink,
                                width: widthtoDP(number = '80%'),
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
