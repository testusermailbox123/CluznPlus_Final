import React, { useEffect } from 'react';
import { Text, View, Image, Dimensions, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
//import HomeStackScreen from './components/NewApp/Navigation'
import { widthtoDP, heighttoDP } from './Responsive'
import { h } from '../utils/Dimensions';
const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const SplashScreen = ({ navigation }) => {

  useEffect(() => {

    setTimeout(async () => {
      //await AsyncStorage.setItem('LoggedIn','No')
      const loggedInSTatus = await AsyncStorage.getItem('LoggedIn');
      //console.log('loggedInSTatus', loggedInSTatus)
      if (loggedInSTatus === 'Yes') {
        const authtoken = await AsyncStorage.getItem('auth_token');
        // console.log('token key ', authtoken)
        navigation.navigate('HospitalSearch', {
          authtokenfromEnterNameDetails: authtoken
        })
      } else {

        //console.log('inside else')
        navigation.navigate('GenerateOtpforLoginScreen')
      }
    }
      , 2000);
  }, [])

  const checkUserLoggedIn = async () => {
    // console.log('check user login')
    const loggedInSTatus = await AsyncStorage.getItem('LoggedIn');
    // console.log('loggedInSTatus', loggedInSTatus)
    if (loggedInSTatus === 'Yes') {
      navigation.navigate('HospitalSearch')
    } else {
      navigation.navigate('GenerateOtpforLoginScreen')
    }
    // console.log('loggedInSTatus', loggedInSTatus)
  }

  return (
    <View style={{
      flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#3CB3C3'
    }}>
      <Image style={{ height: '25%', width: '50%' }} source={require('../assets/icons/mysplash.png')} />
      <View style={{ flexDirection: 'row' }}>
        <Text allowFontScaling={false} style={{ fontSize: h(2.8), color: 'white', paddingLeft: h(2), fontWeight: "bold" }}>Cluzn </Text>
        <Text allowFontScaling={false} style={{ fontSize: h(2.8), color: 'red', fontWeight: "bold" }}>Plus</Text>
      </View>
      <Text style={{ color: 'white', fontSize: h(3), fontWeight: 'bold' }}>Your caring partner</Text>
    </View>
  );
}

export default SplashScreen;