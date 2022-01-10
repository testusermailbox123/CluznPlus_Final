import React, { Component, createRef } from 'react';
import { View, Text, ScrollView, StyleSheet, ImageBackground, Image, Dimensions, FlatList, } from 'react-native';
import { h, w } from '../utils/Dimensions'
import { SliderBox } from "react-native-image-slider-box";
import { WebView } from 'react-native-webview';
GLOBAL = require('./globals');
let CurrentSlide = 0;
let IntervalTime = 4000;

export default class HospitalDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            link: this.props.route.params.hospitalmultimg1,
        }
    }

    flatList = createRef();

    // TODO _goToNextPage()
    _goToNextPage = () => {
        console.log("this.state.link ===>>>> ", this.state.link)
        if (CurrentSlide >= this.state.link.length - 1) CurrentSlide = 0;

        this.flatList.current.scrollToIndex({
            index: ++CurrentSlide,
            animated: true,
        });
    };

    _startAutoPlay = () => {
        this._timerId = setInterval(this._goToNextPage, IntervalTime);
    };

    _stopAutoPlay = () => {
        if (this._timerId) {
            clearInterval(this._timerId);
            this._timerId = null;
        }
    };


    componentDidMount() {
        if (this.state.link.length > 0 && this.state.link != null) {
            this._stopAutoPlay();
            this._startAutoPlay();
        }
    }

    componentWillUnmount() {
        this._stopAutoPlay();
    }

    // TODO _renderItem()
    _renderItem({ item, index }) {
        return <Image source={{ uri: item }} style={styles.sliderItems} />;
    }

    // TODO _keyExtractor()
    _keyExtractor(item, index) {
        // console.log(item);
        return index.toString();
    }

    render() {
        // console.log("checking", this.props.route.params);
        const { hospitalname2, hospitallocation2, hospitaldesc2, hospitalmultimg1, hospitalvideo1 } = this.props.route.params;

        return (
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <View style={{ height: h(2.5), alignItems: 'center', justifyContent: 'center', backgroundColor: GLOBAL.primaryBackGroundColorforBlue }}>
                    {/* <Text style={{ fontSize: h(3), color: 'white' }}>{hospitalname2}</Text> */}
                </View>
                <View style={{ height: h(17), alignItems: 'center', justifyContent: 'center', backgroundColor: GLOBAL.primaryBackGroundColorforBlue }}>
                    <Text style={{ fontSize: h(3), color: GLOBAL.primarylighttext2 }}>{hospitalname2}</Text>
                    {/* <Text style={{ fontSize: h(3), color: 'white' }}>Shri Aurobindo</Text> */}
                </View>
                <View style={{ height: h(1), backgroundColor: GLOBAL.primaryBackGroundColor }}></View>
                {
                    (hospitalmultimg1.length > 0 && hospitalmultimg1 != null && hospitalmultimg1 != "null" && hospitalmultimg1 != "" && hospitalmultimg1 != undefined && hospitalmultimg1 != "undefined") ? <View style={hospitalmultimg1.length == 0 ? { height: h(0) } : { height: h(20) }}>
                        {/* <SliderBox
                            images={(hospitalmultimg1 != undefined && hospitalmultimg1.length != 0) ? hospitalmultimg1 : ["https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2000px-No_image_available.svg.png"]}
                            sliderBoxHeight={h(20)}
                            autoplay
                            circleLoop
                            dotStyle={{
                                width: 0,
                                height: 0,
                                borderRadius: 0,
                            }}
                        /> */}
                        <FlatList
                            style={{
                                flex: 1,
                            }}
                            data={hospitalmultimg1}
                            keyExtractor={this._keyExtractor.bind(this)}
                            renderItem={this._renderItem.bind(this)}
                            horizontal={true}
                            flatListRef={React.createRef()}
                            ref={this.flatList}
                        />
                    </View> : <View></View>
                }

                <View style={{ height: h(1), backgroundColor: GLOBAL.primaryBackGroundColor }}></View>
                <View
                    style={hospitalvideo1 == null ? {
                        height: h(0),
                        width: w(100),
                    } : {
                        height: h(25),
                        width: w(100),
                    }}>
                    {
                        (hospitalvideo1 != undefined && hospitalvideo1 != "undefined" && hospitalvideo1 != null && hospitalvideo1 != "null" && hospitalvideo1 != '') ? <WebView
                            source={{ uri: hospitalvideo1 }}
                            javaScriptEnabled={true}
                            allowsFullscreenVideo={true}
                            injectedJavaScript=
                            {`document.getElementsByTagName("video")[0].pause();document.getElementsByTagName("video")[0].controlsList="nodownload";`}
                        /> : <Text>No Video Available</Text>
                    }
                </View>
                <View style={{ height: h(1), backgroundColor: GLOBAL.primaryBackGroundColor }}></View>
                <View
                    style={{
                        flex: 1
                    }}>
                    {(hospitaldesc2 != null && hospitaldesc2 != "null" && hospitaldesc2 != "" && hospitaldesc2 != undefined && hospitaldesc2 != "undefined") ?
                        <WebView
                            style={{ resizeMode: 'cover', flex: 1, backgroundColor: GLOBAL.primaryBackGroundColor }}
                            injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
                            scalesPageToFit={false}
                            // source={{ html: hospitaldesc2 }}
                            source={{ html: '<div style="color:' + GLOBAL.primarylighttext2 + ';">' + (hospitaldesc2.replace(/background: rgb(238, 238, 238);/g, '')).replace(/border: 1px solid rgb(204, 204, 204);/g, '') + '</div>' }}
                        // source={{ html: '<div style="color:'+GLOBAL.primarylighttext2+';">'+(hospitaldesc2.replaceAll('background: rgb(238, 238, 238);', '')).replaceAll('border: 1px solid rgb(204, 204, 204);', '')+'</div>' }}
                        /> : <Text></Text>}
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    sliderItems: {
        height: "100%",
        width: Dimensions.get('window').width,
    },
});