
import React from 'react';
import {
    Text, View, Image, ImageBackground, StatusBar,
    FlatList, Dimensions, TouchableOpacity, ScrollView, TextInput, SafeAreaView, StyleSheet
} from 'react-native';
import { widthtoDP, heighttoDP } from './Responsive'
import { COLORS } from './theme'
import { WebView } from 'react-native-webview';
import { h, w } from '../utils/Dimensions'
GLOBAL = require('./globals');

export default class FacilityDetails extends React.Component {

    render() {
        const { facilitytitle, facilityimage, facilitydescription } = this.props.route.params;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle="light-content" hidden={false}
                    backgroundColor='#3CB3C3'
                    translucent={true}>
                </StatusBar>
                <View style={{ flex: 1, backgroundColor: COLORS.white }}>
                    <View style={{ flex: 0.7, backgroundColor: COLORS.white }}>
                        <ImageBackground source={{ uri: facilityimage }} style={styles.image}>
                            {/* <TouchableOpacity style={styles.flex1_lefticon}
                                onPress={() => this.props.navigation.navigate('DoctorFaclitiesList')}
                            >
                                <Image source={require('../assets/icons/back.png')} style={styles.flex1_image} />
                            </TouchableOpacity> */}
                            <Text style={styles.text}>{facilitytitle}</Text>
                        </ImageBackground>
                    </View>
                    {/* <View
                    style={{flex:1.5, height:100, 
                        backgroundColor: COLORS.white,
                    marginLeft:widthtoDP(number = '3.5%'), 
                    marginTop:widthtoDP(number = '10%'),}}>
                <WebView 
                    style={{  resizeMode: 'cover', flex: 1 }}
                    injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
                    scalesPageToFit={false}
                    source={{ html: facilitydescription }}
                />
                </View> */}
                    <View
                        style={{
                            flex: 1.5,
                            backgroundColor:  GLOBAL.primaryBackGroundColor,
                            padding:h(2)
                        }}>
                        {/* <WebView
                            style={{ resizeMode: 'cover', flex: 1 , backgroundColor:  GLOBAL.primaryBackGroundColor,}}
                            injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
                            scalesPageToFit={false}
                            //source={{ html: facilitydescription }}
                            source={{ html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>${facilitydescription}</body></html>` }}
                        /> */}

                        { (facilitydescription != null && facilitydescription != "null" && facilitydescription != "" && facilitydescription != undefined && facilitydescription != "undefined") ? <WebView
                            style={{ resizeMode: 'cover', flex: 1 ,backgroundColor:GLOBAL.primaryBackGroundColor}}
                            injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
                            scalesPageToFit={false}
                            source={{ html: '<div style="color:'+GLOBAL.primarylighttext2+';">'+(facilitydescription.replace(/background: rgb(238, 238, 238);/g, '')).replace(/border: 1px solid rgb(204, 204, 204);/g, '')+'</div>'}}
                            // source={{ html: '<div style="color:'+GLOBAL.primarylighttext2+';">'+(facilitydescription.replaceAll('background: rgb(238, 238, 238);', '')).replaceAll('border: 1px solid rgb(204, 204, 204);', '')+'</div>' }}
                        /> : <Text></Text>
                        }

                    </View>
                </View>
            </SafeAreaView >
        )
    }
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
    },
    text: {
        color: 'white',
        fontSize: h(4),
        fontWeight: "bold",
        marginTop:h(12),
        alignSelf: 'center',
    },
    flex1_lefticon:
    {
        color: COLORS.white,

    },
    flex1_image:
    {
        // width: widthtoDP(number = '7%'),
        // height: widthtoDP(number = '7%'),
    },
});