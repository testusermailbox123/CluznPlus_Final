import React, { Component } from 'react'
import {
    Text, View, SafeAreaView, StatusBar, Image,
    TouchableOpacity, ScrollView, FlatList, VirtualizedList,
    StyleSheet
} from 'react-native'
import { widthtoDP, heighttoDP } from '../Responsive';
GLOBAL = require('../globals');
import { WebView } from 'react-native-webview';
export default class WebinarDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            image: '',
            wookshopid: '',
            amount: '',
            descript: '',
            webname: '',
            bookstatus: ''
        }
    }

    UNSAFE_componentWillMount() {
        const { image, wookshopid, amount, descript, webname, bookstatus } = this.props.route.params;
        this.setState({
            image: image,
            wookshopid: wookshopid,
            amount: amount,
            descript: descript,
            webname: webname,
            bookstatus: bookstatus
        });
    }

    onPressButton() {

        this.props.navigation.navigate('WebinarPurchaseForm', {
            wookshopid: this.state.wookshopid,
            amount: this.state.amount,
            webname: this.state.webname
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
                        <Text
                            numberOfLines={6}
                            style={{
                                height: heighttoDP(number = '35%'),
                                width: widthtoDP(number = '90%'),
                                marginTop: heighttoDP(number = '2%'),
                                fontSize: heighttoDP(number = '2%')
                            }}
                        >{this.state.descript}</Text>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: heighttoDP(number = '3%')
                        }}
                        >Amount : INR {this.state.amount}</Text>
                        <TouchableOpacity
                            onPress={() => this.onPressButton()}
                            style={{
                                marginTop: heighttoDP(number = '2%'),
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
                            >Book Seat</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}
