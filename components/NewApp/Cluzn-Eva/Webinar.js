import React, { Component } from 'react'
import { Text, View, SafeAreaView, StatusBar, Image, TouchableOpacity, ScrollView, FlatList, VirtualizedList, StyleSheet } from 'react-native'
import { widthtoDP, heighttoDP } from '../Responsive';
GLOBAL = require('../globals');
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export default class Webinar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            workshoplist: [],
            image: '',
            wookshopid: '',
            webname:''
        }
    }

    _onPress(item) {
        this.props.navigation.navigate('WebinarDetails', {
            image: item.image,
            wookshopid: item.id,
            amount:item.amount,
            descript: item.description,
            webname:this.state.webname
        });
    }

    UNSAFE_componentWillMount() {
        const { navigation } = this.props;
        this.generateworkshoplist();
    }

    generateworkshoplist() {
        // const authtoken = AsyncStorage.getItem('auth_token')

        axios.get('http://cluznplus.com/cluzn_backend/api/getWebbinar', {
            headers: {
                token: ''
            }
        })
            .then(response => {

                console.log("workshoplist - ", response.data.data);
                this.setState({
                    workshoplist: [...this.state.workshoplist, ...response.data.data],
                });
                console.log(this.state.workshoplist)
            })
            .catch((error) => {
                this.setState({ workshoplist: [] })
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

                    <View style={{
                        backgroundColor: '#EF716B',
                        // flexDirection: 'row',
                        width: widthtoDP(number = '100%'),
                        marginTop: widthtoDP(number = '5%'),
                        // justifyContent: 'center',
                        height: heighttoDP(number = '20%'),
                        // borderRadius: heighttoDP(number = '3%'),
                        borderBottomLeftRadius: heighttoDP(number = '3%'),
                        borderBottomRightRadius: heighttoDP(number = '3%'),
                        // borderTopLeftRadius: heighttoDP(number = '3%'),
                        // borderTopRightRadius: heighttoDP(number = '3%'),
                    }}>
                        <Text style={{
                            color: GLOBAL.eva_black,
                            marginTop: heighttoDP(number = '5%'),
                            fontWeight: 'bold', fontSize: heighttoDP(number = '3%'),
                            marginLeft: widthtoDP(number = "5%")
                        }}>Hello Varun,</Text>
                        <Text style={{
                            alignSelf: 'center',
                            marginTop: heighttoDP(number = '2%'),
                            color: 'white',
                            marginLeft: widthtoDP(number = "3%"),
                            fontWeight: 'bold',
                            fontSize: heighttoDP(number = '2.3%')
                        }}
                        >Upcoming Webinar and Classes for you</Text>
                    </View>
                    <View style={{
                        height: heighttoDP(number = '80%'),
                        width: widthtoDP(number = '100%')
                    }}>

                        <FlatList
                            style={{
                                height: heighttoDP(number = '1%'),
                                marginBottom: heighttoDP(number = '7%'),
                            }}
                            data={this.state.workshoplist}

                            keyExtractor={(item, index) => item + index}
                            // horizontal={true}
                            showsVerticalScrollIndicator={false}
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
                                            color: GLOBAL.eva_blue, 
                                            fontWeight: 'bold',
                                            fontSize: heighttoDP(number = '2.5%')
                                        }}
                                        >{item.name}</Text>
                                        <Image
                                            style={{
                                                height: heighttoDP(number = '20%'),
                                                width: widthtoDP(number = '90%'),
                                                borderRadius: heighttoDP(number = '4%'),
                                                marginTop: heighttoDP(number = '2%'),
                                            }}
                                            source={{ uri: item.image }}
                                        // source={{ uri: "https://switchindia.org/images/medical-innovation/medical-innovation-workshop-0102.jpg" }}
                                        />

                                    </View>
                                </TouchableOpacity>
                            }
                        />
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}