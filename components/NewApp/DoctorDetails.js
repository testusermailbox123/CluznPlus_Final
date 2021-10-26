
import React from 'react';
import {
    Text, View, StatusBar, Image, FlatList, Dimensions,
    TouchableOpacity, ScrollView, TextInput, SafeAreaView, StyleSheet
} from 'react-native';
import { widthtoDP, heighttoDP } from './Responsive'
import { COLORS } from './theme'
import { WebView } from 'react-native-webview';
import { h, w } from '../utils/Dimensions'
GLOBAL = require('./globals');

export default class DoctorDetails extends React.Component {

    render() {
        const { firstname, lastname, doctorimage, doctordescription, doctorspecial } = this.props.route.params;
        console.log(doctordescription);
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor:'white' }}>
                <StatusBar barStyle="light-content" hidden={false}
                    backgroundColor='#3CB3C3'
                    translucent={true}>
                </StatusBar>
                <View style={{ flex: 0.8, backgroundColor: GLOBAL.primaryBackGroundColorforBlue }}>
                    {/* <TouchableOpacity style={styles.flex1_lefticon}
                        onPress={() => this.props.navigation.navigate('DoctorFaclitiesList')}>
                        <Image source={require('../assets/icons/back.png')} style={styles.flex1_image} />
                    </TouchableOpacity> */}
                    <Text style={styles.flex1_text1}>{firstname} {lastname}</Text>
                    <Text style={styles.flex1_text3}>{doctorspecial}</Text>
                </View>
                

                <View style={{ flex: 2, backgroundColor: GLOBAL.primaryBackGroundColor }}>
                    <Image source={{ uri: doctorimage }} style={styles.flex1_image2} />
                    
                    <View
                        style={{
                            flex: 1, 
                            padding:h(3)
                        }}>
                        {
                            (doctordescription != null && doctordescription != "null" && doctordescription != "" && doctordescription != undefined && doctordescription != "undefined") ? <WebView
                            style={{ resizeMode: 'cover', flex: 1 ,backgroundColor:GLOBAL.primaryBackGroundColor}}
                            injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
                            scalesPageToFit={false}
                            source={{ html: '<div style="color:'+GLOBAL.primarylighttext2+';">'+(doctordescription.replace(/background: rgb(238, 238, 238);/g, '')).replace(/border: 1px solid rgb(204, 204, 204);/g, '')+'</div>'}}
                            // source={{ html: '<div style="color:'+GLOBAL.primarylighttext2+';">'+(doctordescription.replaceAll('background: rgb(238, 238, 238);', '')).replaceAll('border: 1px solid rgb(204, 204, 204);', '')+'</div>' }}
                        /> : <Text></Text>
                        }
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    flex1_lefticon:
    {
        color: COLORS.white,
        marginLeft: widthtoDP(number = '4.5%'),
        marginTop: heighttoDP(number = '4%'),
        width: widthtoDP(number = '5%'),
        height: widthtoDP(number = '5%'),

    },
    flex1_image:
    {
        width: widthtoDP(number = '7%'),
        height: widthtoDP(number = '7%'),
    },
    flex1_text3:
    {
        color: GLOBAL.primarylighttext1,
        fontSize: h(2.5),
        justifyContent: 'center',
        alignSelf: 'center',
        //marginTop:h(6)
    },
    flex1_text1:
    {
        color: GLOBAL.primarylighttext1,
        fontSize: h(3),
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop:h(6)
    },
    flex1_text2:
    {
        color: GLOBAL.primarylighttext1,
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: heighttoDP(number = '2.5%'),
        marginTop: heighttoDP(number = '1%'),
    },
    flex1_image2:
    {
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: -(h(8)),
        width: h(15),
        height: h(15),
        borderRadius: 70
    },
    scroll:
    {
        // borderWidth: 1,
        marginHorizontal: widthtoDP(number = '5%'),
        marginTop: heighttoDP(number = '1')
    },
    // scrollcontainer:
    // {
    //     justifyContent: 'center',
    //     alignSelf: 'center',
    // },
    flex2_text1:
    {
        color: COLORS.black,
        fontWeight: 'bold',
        fontSize: heighttoDP(number = '2.5%'),
        marginTop: heighttoDP(number = '3%'),
        marginLeft: widthtoDP(number = '5%'),
    },
    flex2_text2:
    {
        color: COLORS.black,
        fontSize: heighttoDP(number = '2%'),
        marginTop: heighttoDP(number = '0.5%'),
        marginLeft: widthtoDP(number = '5%'),
    }
})