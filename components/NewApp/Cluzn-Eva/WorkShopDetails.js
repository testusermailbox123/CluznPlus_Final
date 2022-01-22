import React, { Component } from 'react'
import {
    Text, View, SafeAreaView, StatusBar, Image,
    TouchableOpacity, ScrollView, FlatList, VirtualizedList,
    StyleSheet
} from 'react-native'
import { widthtoDP, heighttoDP } from '../Responsive';
GLOBAL = require('../globals');

export default class WorkShopDetails extends Component {

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <StatusBar barStyle="light-content" hidden={false}
                    backgroundColor='#FEE1DC'
                    translucent={true}>
                </StatusBar>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 2 }}>
                        <Image
                            style={{ flex: 2 }}
                            source={{
                                uri: 'https://reactnative.dev/img/tiny_logo.png',
                            }}
                        />
                    </View>
                    <View style={{
                        flex: 1,
                        alignItems: 'center', justifyContent: 'center',
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
                            >Book WorkShops</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}
