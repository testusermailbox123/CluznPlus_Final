import React, { Component } from 'react'
import { Text, View, SafeAreaView, StatusBar, Image, TouchableOpacity, ScrollView, FlatList, VirtualizedList, StyleSheet } from 'react-native'
import { widthtoDP, heighttoDP } from '../Responsive';
GLOBAL = require('../globals');

const DATA = [];
const getItemCount = (data) => 5;
const getItem = (data, index) => ({
    id: Math.random().toString(12).substring(0),
    title: `Item box ${index + 1}`
});

export default class WorkShop extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    _onPress(item) {
        this.props.navigation.navigate('WorkShopDetails', {
        });
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
                    backgroundColor: GLOBAL.eva_lightpink,
                    height: heighttoDP(number = '100%'), width: widthtoDP(number = '100%')
                }}>
                    <Text style={{
                        color: GLOBAL.eva_black, marginTop: heighttoDP(number = '5%'),
                        fontWeight: 'bold', fontSize: heighttoDP(number = '3%'),
                        marginLeft: widthtoDP(number = "5%")
                    }}>Hello Varun,</Text>
                    <View style={{
                        flexDirection: 'row',
                        width: widthtoDP(number = '100%'),
                        marginTop: widthtoDP(number = '5%'),
                        justifyContent: 'center', height: heighttoDP(number = '15%')
                    }}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: GLOBAL.eva_darkpink,
                                width: widthtoDP(number = '70%'),
                                height: heighttoDP(number = '7%'),
                                borderRadius: heighttoDP(number = '5%'),
                                alignItems: 'center', justifyContent: 'center',
                                marginRight: heighttoDP(number = '1%'),
                            }}
                        >
                            <Text style={{
                                color: 'white', fontWeight: 'bold',
                                fontSize: heighttoDP(number = '3%')
                            }}
                            >Upcoming WorkShops</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{
                        height: heighttoDP(number = '80%'),
                        width: widthtoDP(number = '100%')
                    }}>

                        <VirtualizedList
                            showsVerticalScrollIndicator={false}
                            style={{
                                marginBottom: heighttoDP(number = '5%'),
                            }}
                            data={DATA}
                            renderItem={({ item }) =>

                                <TouchableOpacity
                                    onPress={() => this._onPress(item)}
                                    style={{
                                        height: heighttoDP(number = '25%'),
                                        width: widthtoDP(number = '90%'),
                                        marginVertical: heighttoDP(number = '3%'),
                                        alignSelf: 'center', justifyContent: 'center',
                                        // backgroundColor:'red'
                                    }}
                                >
                                    <View>
                                        <Text style={{
                                            color: GLOBAL.eva_blue, fontWeight: 'bold',
                                            fontSize: heighttoDP(number = '1.8%')
                                        }}
                                        >Irregular periods -Causes and Treatment for Irregular Periods</Text>
                                        <Image
                                            style={{
                                                height: heighttoDP(number = '20%'),
                                                width: widthtoDP(number = '90%'),
                                                borderRadius: heighttoDP(number = '4%'),
                                                marginTop: heighttoDP(number = '2%'),
                                            }}
                                            source={{ uri: "https://switchindia.org/images/medical-innovation/medical-innovation-workshop-0102.jpg" }} />

                                    </View>
                                </TouchableOpacity>

                            }
                            keyExtractor={(item, index) => item + index}
                            getItemCount={getItemCount}
                            getItem={getItem}

                        />
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}