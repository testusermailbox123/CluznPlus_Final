import React, { Component } from 'react'
import {
    Text, View, SafeAreaView, StatusBar, Image,
    TouchableOpacity, ScrollView, FlatList, VirtualizedList,
    StyleSheet
} from 'react-native'
import { widthtoDP, heighttoDP } from '../Responsive';
GLOBAL = require('../globals');

export default class WorkShopDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            image: '',
            wookshopid: '',
            amount: '',
            descript: ''
        }
    }

    UNSAFE_componentWillMount() {
        const { image, wookshopid, amount, descript } = this.props.route.params;
        this.setState({
            image: image,
            wookshopid: wookshopid,
            amount: amount,
            descript: descript
        });
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <StatusBar barStyle="light-content" hidden={false}
                    backgroundColor='#FEE1DC'
                    translucent={true}>
                </StatusBar>
                <View>
                    <View style={{

                        height: heighttoDP(number = '40%'),
                        alignSelf: 'center', justifyContent: 'center',
                        width: widthtoDP(number = '97%'),

                    }}>
                        <Image
                            style={{
                                height: heighttoDP(number = '40%'),
                                width: widthtoDP(number = '97%'),
                            }}
                            source={{
                                uri: this.state.image
                            }}
                        />
                    </View>
                    <View style={{
                        marginLeft: widthtoDP(number = '4%'),
                        marginTop: heighttoDP(number = '2%'),
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Text style={{
                            // color: 'white', 
                            fontWeight: 'bold',
                            fontSize: heighttoDP(number = '3%')
                        }}
                        >Description</Text>
                        <Text style={{
                            marginTop: heighttoDP(number = '2%'),
                            fontWeight: 'bold',
                            fontSize: heighttoDP(number = '2%')
                        }}
                        >{this.state.descript}</Text>
                        <Text style={{
                            marginTop: heighttoDP(number = '10%'),
                            fontWeight: 'bold',
                            fontSize: heighttoDP(number = '3%')
                        }}
                        >Amount : INR {this.state.amount}</Text>
                        <TouchableOpacity
                            style={{
                                marginTop: heighttoDP(number = '3%'),
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
                            >Book WorkShops</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}
