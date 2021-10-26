import React, { useEffect, useRef } from 'react';
import { Text, Button, TextInput, ImageBackground, View, SafeAreaView, ActivityIndicator, DeviceEventEmitter } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import HomeStackScreen from './components/NewApp/Navigation'
import { WebView } from 'react-native-webview';
import { SearchBar, Icon } from 'react-native-elements';
import EnterNameDetails from './components/NewApp/EnterNameDetails'
import HospitalDetails from './components/NewApp/HospitalDetails'
import { SliderBox } from "react-native-image-slider-box";

const sessionID = 'Varun'

export default class App extends React.Component {
  // constructor(props) {
  //   super(props)

  //   this.state = {
  //     images: [
  //       "https://source.unsplash.com/1024x768/?nature",
  //       "https://source.unsplash.com/1024x768/?water",
  //       "https://source.unsplash.com/1024x768/?girl",
  //       "https://source.unsplash.com/1024x768/?tree", // Network image
  //       // Local image
  //     ]
  //   };
  // };

  render() {
     return (
      <HomeStackScreen/>
    //   <View style={{ flex: 1 }}>
    //     <SliderBox
    //       images={this.state.images}
    //       sliderBoxHeight={100}
    //       autoplay
    //       circleLoop
    //       dotStyle={{
    //         width: 0,
    //         height: 0,
    //         borderRadius: 0,
    //       }}
    //     />
    //   </View>
     )
  }
}