import React, { Component, createRef } from 'react'
import {
    Text, View, SafeAreaView, StatusBar, Image, Dimensions,
    TouchableOpacity, ScrollView, FlatList, VirtualizedList,
    StyleSheet
} from 'react-native'
import Video from 'react-native-video';
import { widthtoDP, heighttoDP } from '../Responsive';
GLOBAL = require('../globals');
let CurrentSlide = 0;
let IntervalTime = 4000;

const data = [
    {
        "image": "https://png.pngtree.com/png-clipart/20190611/original/pngtree-foreign-female-doctor-png-image_2983361.jpg"
    },
    {
        "image": "https://png.pngtree.com/png-clipart/20190520/original/pngtree-flat-green-doctor-image-of-male-nurses-png-image_4170593.jpg"
    }
]

export default class DoctorDescription extends Component {

    constructor(props) {
        super(props)

        this.state = {
            doctor_image:'',
            docfname: '',
            doclname: '',
            docfullimage: '',
            docspecialization: '',
            docdescription: '',
            docvideo: '',
            docimage: '',
            isloading: true,
            docid:'',amount:''
        }
    }

    _onPressVideo(item) {
        this.props.navigation.navigate('Video1', {
            video_url: this.state.docvideo
        });
    }

    _onPress() {

        this.props.navigation.navigate('AppointmentDetails', {
            docid: this.state.docid,
            amount:this.state.amount,
        });
    };

    flatList = createRef();

    // TODO _goToNextPage()
    _goToNextPage = () => {
        // console.log("this.state.link ===>>>> ", this.state.link)
        if (CurrentSlide >= this.state.doctor_image.length - 1) CurrentSlide = 0;

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

    UNSAFE_componentWillMount() {
        const { docfname, doclname, docfullimage, docspecialization, docdescription,
            docvideo, docimage,docid,amount ,doctor_image} = this.props.route.params;
        this.setState({
            docfname: docfname,
            doclname: doclname,
            docfullimage: docfullimage,
            docspecialization: docspecialization,
            docdescription: docdescription,
            docvideo: docvideo,
            docimage: docimage,
            docid:docid,
            amount:amount,
            doctor_image:doctor_image
        })
        console.log('this.state.doctor_image - '+this.state.doctor_image)
        
        
        this._stopAutoPlay();
        // console.log('after _stopAutoPlay')
        this._startAutoPlay();
        // console.log('after _startAutoPlay')
    }

    componentWillUnmount() {
        this._stopAutoPlay();
    }

    // TODO _renderItem()
    _renderItem({ item, index }) {
        return <Image source={{ uri: item.image }}
            // "https://www.pngkit.com/png/full/267-2678423_bacteria-video-thumbnail-default.png" }} 
            style={styles.sliderItems} />;
    }

    // TODO _keyExtractor()
    _keyExtractor(item, index) {
        // console.log(item);
        return index.toString();
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: GLOBAL.eva_lightpink }}>
                <StatusBar barStyle="light-content" hidden={false}
                    backgroundColor='#FEE1DC'
                    translucent={true}>
                </StatusBar>
                <ScrollView style={{ backgroundColor: GLOBAL.eva_lightpink }}>
                    <View style={{
                        height: heighttoDP(number = '50%'),

                    }}>
                        <Image
                            style={{
                                backgroundColor: 'red',
                                height: heighttoDP(number = '50%'),
                            }}
                            source={{
                                uri: "https://cluznplus.com/cluzn_backend/images/" + this.state.docfullimage,
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
                                color: 'black', 
                                alignSelf: 'center',fontWeight: 'bold',
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
                            width: widthtoDP(number = '90%'),
                            // marginTop:heighttoDP(number = '2%'),
                        }}>
                            <TouchableOpacity
                                onPress={() => this._onPressVideo()}
                                style={{
                                    height: heighttoDP(number = '25%'),
                                    width: widthtoDP(number = '90%')
                                }}>
                                <Image
                                    style={{
                                        marginTop: heighttoDP(number = '2%'),
                                        height: heighttoDP(number = '25%'),
                                        width: widthtoDP(number = '90%')
                                    }}
                                    source={{
                                        uri: "https://cluznplus.com/cluzn_backend/images/" + this.state.docimage
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                        <Text style={{
                            fontWeight: 'bold', marginTop: heighttoDP(number = '%'),
                            fontSize: heighttoDP(number = '2.5%')
                        }}>Image</Text>
                        <View style={{
                            backgroundColor: GLOBAL.eva_lightpink,
                            width: widthtoDP(number = '90%'),
                            height: heighttoDP(number = '25%'),
                            marginBottom: heighttoDP(number = '3%'),
                            marginTop: heighttoDP(number = '2%'),
                        }}>
                            <FlatList
                                style={{
                                    flex: 1,
                                }}
                                data={this.state.doctor_image.length > 0 ? this.state.doctor_image : data}
                                keyExtractor={this._keyExtractor.bind(this)}
                                renderItem={this._renderItem.bind(this)}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                flatListRef={React.createRef()}
                                ref={this.flatList}
                            />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    sliderItems: {
        height: "100%",
        width: Dimensions.get('window').width,
    },
});