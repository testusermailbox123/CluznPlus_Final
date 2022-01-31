import React, { Component } from 'react';
import { Text, View, SafeAreaView, StatusBar, Image, TouchableOpacity, ScrollView, FlatList, VirtualizedList, ActivityIndicator, StyleSheet } from 'react-native'
import Video from 'react-native-video';
import { widthtoDP, heighttoDP } from '../Responsive';
import { WebView } from 'react-native-webview';
import { h, w } from '../../utils/Dimensions'
GLOBAL = require('../globals');

export default class BlogDetail extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isloading: true,
            link: '',
            title: '',
            content: ''
        }
    }

    UNSAFE_componentWillMount() {
        const { link, title, content } = this.props.route.params;
        // console.log(link)
        this.setState({
            link: link,
            title: title,
            content: content
        })
    }

    render() {
        const runFirst = `
        let selector = document.querySelectorAll("#dc-header, .dc-innerbanner-holder, #dc-footer, .dc-card-review, .dc-card1, .dc-catgories-wrap, a, ul, p>strong")
        
        for (i in selector) {
            selector[i].style.display = "none"
          }
        

           
              true; // note: this is required, or you'll sometimes get silent failures
            `;




        return (
            <View style={{ height: widthtoDP(number = '200%'), width: widthtoDP(number = '100%'), overflow: 'hidden' }}>
                <ActivityIndicator animating={this.state.isloading} size="large" color="red" />
                <WebView
                    style={this.state.isloading ? { flex: 0 } : { flex: 1 }}
                    source={{ uri: this.state.link }}
                    androidHardwareAccelerationDisabled={true}
                    injectedJavaScript={runFirst}
                    scalesPageToFit={true}
                    onLoadEnd={() => {
                        this.setState({ isloading: false })
                    }}
                />
            </View>
        );
    }
}
