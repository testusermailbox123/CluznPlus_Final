import { Text, View, ActivityIndicator } from 'react-native';
import React, { Component } from 'react';
import Video from 'react-native-video';
import { widthtoDP, heighttoDP } from '../Responsive';
import { WebView } from 'react-native-webview';
import { h, w } from '../../utils/Dimensions'
GLOBAL = require('../globals');

export default class Video1 extends Component {
    constructor(props) {
        super(props)

        this.state = {

            video_url: ''
        }
    }

    UNSAFE_componentWillMount() {
        const { video_url } = this.props.route.params;
        this.setState({
            video_url: video_url,

        })
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: GLOBAL.eva_lightpink,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <View
                    style={{

                        height: h(25),
                        width: w(100),
                    }}>
                    {
                        <WebView
                            source={{ uri: this.state.video_url }}
                            javaScriptEnabled={true}
                            allowsFullscreenVideo={true}
                            injectedJavaScript=
                            {`document.getElementsByTagName("video")[0].pause();document.getElementsByTagName("video")[0].controlsList="nodownload";`}
                        />
                    }
                </View>
            </View>
        );
    }
}
