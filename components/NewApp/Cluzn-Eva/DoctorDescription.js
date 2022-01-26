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

    _onPress(item) {
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
                <ScrollView >
                    <View style={{
                        height: heighttoDP(number = '35%'),

                    }}>
                        <Image
                            style={{
                                height: heighttoDP(number = '35%'),
                            }}
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
                        <Text style={{ marginTop: heighttoDP(number = '3%'), }}>{this.state.docdescription}</Text>
                        <Text style={{
                            fontWeight: 'bold', marginTop: heighttoDP(number = '3%'),
                            fontSize: heighttoDP(number = '2.5%')
                        }}>Video</Text>
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: heighttoDP(number = '20%'),
                            width: widthtoDP(number = '90%')
                        }}>

                            <Video
                                source={{
                                    uri: 'http://techslides.com/demos/sample-videos/small.mp4'
                                    // item.video 
                                }}   // Can be a URL or a local file.
                                ref={(ref) => { this.player = ref }}
                                // paused={true}
                                // controls={true}
                                onBuffer={() => {
                                    this.setState({ isloading: false })
                                }}
                                bufferConfig={{
                                    minBufferMs: 15000,
                                    maxBufferMs: 50000,
                                    bufferForPlaybackMs: 2500,
                                    bufferForPlaybackAfterRebufferMs: 5000
                                }}
                                style={{
                                    backgroundColor: 'red',
                                    position: 'relative',
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    
                                }}
                            />
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
                                    width: widthtoDP(number = '88%'),
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
