import React, { Component } from 'react'
import {
    Text, View, SafeAreaView, StatusBar, Image,
    TouchableOpacity, ScrollView, FlatList, VirtualizedList,
    StyleSheet
} from 'react-native'
import Video from 'react-native-video';
import { widthtoDP, heighttoDP } from '../Responsive';
GLOBAL = require('../globals');

export default class DoctorDescription extends Component {

    constructor(props) {
        super(props)

        this.state = {
            docfname: '',
            doclname: '',
            docfullimage: '',
            docspecialization: '',
            docdescription: '',
            docvideo: '',
            docimage: '',
            isloading: true
        }
    }

    _onPressVideo(item) {
        this.props.navigation.navigate('Video1', {
            video_url: this.state.docvideo
        });
    }

    UNSAFE_componentWillMount() {
        const { docfname, doclname, docfullimage, docspecialization, docdescription,
            docvideo, docimage } = this.props.route.params;
        this.setState({
            docfname: docfname,
            doclname: doclname,
            docfullimage: docfullimage,
            docspecialization: docspecialization,
            docdescription: docdescription,
            docvideo: docvideo,
            docimage: docimage
        })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <StatusBar barStyle="light-content" hidden={false}
                    backgroundColor='#FEE1DC'
                    translucent={true}>
                </StatusBar>
                <ScrollView >
                    <View style={{
                        height: heighttoDP(number = '35%'),

                    }}>
                        <Image
                            style={{
                                backgroundColor: 'red',
                                height: heighttoDP(number = '35%'),
                            }}
                            source={{
                                uri: "http://cluznplus.com/cluzn_backend/images/" + this.state.docfullimage,
                            }}
                        />
                    </View>
                    <View style={{
                        flex: 2,
                        marginLeft: heighttoDP(number = '3%'),
                        marginTop: heighttoDP(number = '3%')
                    }}>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: heighttoDP(number = '3%')
                        }}
                        >{this.state.docfname} {this.state.doclname}</Text>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: heighttoDP(number = '2%')
                        }}
                        >{this.state.docspecialization}</Text>
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
                        <Text style={{
                            marginTop: heighttoDP(number = '3%'),
                            width: widthtoDP(number = '90%'),
                            height: heighttoDP(number = '20%'),
                        }}>{this.state.docdescription}</Text>
                        <Text
                            numberOfLines={5}
                            style={{
                                fontWeight: 'bold', marginTop: heighttoDP(number = '3%'),
                                fontSize: heighttoDP(number = '2.5%')
                            }}>Video</Text>
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: heighttoDP(number = '20%'),
                            width: widthtoDP(number = '90%')
                        }}>
                            <TouchableOpacity
                                onPress={() => this._onPressVideo()}
                                style={{
                                    height: heighttoDP(number = '20%'),
                                    width: widthtoDP(number = '90%')
                                }}>
                                <Image
                                    style={{
                                        marginTop: heighttoDP(number = '2%'),
                                        height: heighttoDP(number = '20%'),
                                        width: widthtoDP(number = '90%')
                                    }}
                                    source={{
                                        uri: "http://cluznplus.com/cluzn_backend/images/" + this.state.docimage
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                        <Text style={{
                            fontWeight: 'bold', marginTop: heighttoDP(number = '3%'),
                            fontSize: heighttoDP(number = '2.5%')
                        }}>Image</Text>
                        <View style={{
                            backgroundColor: 'red',
                            width: widthtoDP(number = '88%'),
                            height: heighttoDP(number = '20%'),
                            marginBottom: heighttoDP(number = '3%'),
                            marginTop: heighttoDP(number = '2%'),
                        }}>
                            <Image
                                style={{
                                    width: widthtoDP(number = '90%'),
                                    height: heighttoDP(number = '20%')
                                }}
                                source={{
                                    uri: "http://cluznplus.com/cluzn_backend/images/" + this.state.docimage
                                }} />
                        </View>

                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}
