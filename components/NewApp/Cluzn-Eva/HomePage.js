import React, { Component } from 'react'
import { Text, View, SafeAreaView, StatusBar, Image, TouchableOpacity, ScrollView, FlatList, VirtualizedList, StyleSheet } from 'react-native'
import { widthtoDP, heighttoDP } from '../Responsive';
GLOBAL = require('../globals');
import { h, w } from '../../utils/Dimensions'



const DATA = [];

const getItem = (data, index) => ({
    id: Math.random().toString(12).substring(0),
    title: `Item box ${index + 1}`
});

const getItemCount = (data) => 5;

const Item = ({ title }) => (

    <View style={styles.item}>
        <Image
            style={{
                height: heighttoDP(number = '13%'), width: heighttoDP(number = '13%'),
                borderRadius: heighttoDP(number = '2%'),
                marginLeft: heighttoDP(number = '9%'),
                marginTop: -heighttoDP(number = '5%')
            }}
            source={{ uri: "https://pe-images.s3.amazonaws.com/basics/cc/image-size-resolution/resize-images-for-print/original-image.jpg" }} />
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity style={{
            alignSelf: 'center', justifyContent: 'center',
            backgroundColor: GLOBAL.eva_midpink,
            width: heighttoDP(number = '12%'),
            borderRadius: heighttoDP(number = '10%'),
            height: heighttoDP(number = '4%')
        }}>
            <Text style={{
                alignSelf: 'center', justifyContent: 'center', color: 'white'
            }}
            >Enquire Now</Text>
        </TouchableOpacity>
    </View>

);



export default class HomePage extends Component {

    _onPress(item) 
    {
        this.props.navigation.navigate('Categories', {
            
        });
    }

    render() {
        
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <StatusBar barStyle="light-content" hidden={false}
                    backgroundColor='#FEE1DC'
                    translucent={true}>
                </StatusBar>
                <ScrollView style={{
                    flex: 1,
                    backgroundColor: GLOBAL.eva_lightpink,
                    height: heighttoDP(number = '100%'), width: widthtoDP(number = '100%')
                }}>
                    <Text style={{
                        color: GLOBAL.eva_black, marginTop: heighttoDP(number = '5%'),
                        fontWeight: 'bold', fontSize: heighttoDP(number = '3%'),
                        marginLeft: widthtoDP(number = "5%")
                    }}>Hello Varun,</Text>
                    <Text style={{
                        color: GLOBAL.eva_midpink, marginTop: heighttoDP(number = '5%'),
                        fontWeight: 'bold', fontSize: heighttoDP(number = '4%'),
                        marginLeft: widthtoDP(number = "5%")
                    }}>Find Your Desired Health Solution</Text>
                    <TouchableOpacity
                        style={{
                            backgroundColor: GLOBAL.eva_midpink, marginTop: heighttoDP(number = '5%'),
                            borderRadius: heighttoDP(number = '2%'),
                            alignSelf: 'center', width: widthtoDP(number = '85%'), height: heighttoDP(number = '14%')
                        }}
                    >
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{
                                width: widthtoDP(number = '30%'),
                                alignItems: 'center', justifyContent: 'center'
                            }}>
                                <Text>Image here</Text>
                            </View>
                            <View style={{
                                width: widthtoDP(number = '55%'),
                                alignItems: 'center', justifyContent: 'space-evenly'
                            }}>
                                <Text>Varun</Text>
                                <Text>Sahu</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor: GLOBAL.eva_midpink, marginTop: heighttoDP(number = '5%'),
                            borderRadius: heighttoDP(number = '2%'), alignItems: 'center', justifyContent: 'center',
                            alignSelf: 'center', width: widthtoDP(number = '85%'), height: heighttoDP(number = '20%')
                        }}
                    >
                        <Text>Banner</Text>
                    </TouchableOpacity>
                    <View style={{
                        marginTop: widthtoDP(number = '4%'),
                        height: heighttoDP(number = '40%'), width: widthtoDP(number = '100%')
                    }}>
                        <Text style={{
                            color: '#1E1C61', fontSize: widthtoDP(number = '5%'),
                            fontWeight: 'bold', marginLeft: widthtoDP(number = "6%")
                        }}>Exclusive Packages</Text>

                        <VirtualizedList
                            style={{
                                marginTop: heighttoDP(number = '5%'),
                                marginBottom: heighttoDP(number = '1%'), height: heighttoDP(number = '1%')
                            }}
                            data={DATA}

                            renderItem={({ item }) => <Item title={item.title} />}
                            keyExtractor={(item, index) => item + index}
                            getItemCount={getItemCount}
                            getItem={getItem}
                            horizontal={true}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                    <View style={{
                        marginTop: widthtoDP(number = '4%'),
                        height: heighttoDP(number = '40%'), width: widthtoDP(number = '100%')
                    }}>
                        <Text style={{
                            color: '#1E1C61', fontSize: widthtoDP(number = '5%'),
                            fontWeight: 'bold', marginLeft: widthtoDP(number = "6%")
                        }}>Categories</Text>
                        <View style={{
                            // backgroundColor: 'red',
                            height: heighttoDP(number = '40%'), width: widthtoDP(number = '100%')
                        }}>
                            {/* <VirtualizedList
                                data={DATA}
                                ListHeaderComponent={getHeader}
                                ListFooterComponent={getFooter} /> */}
                            <VirtualizedList
                                style={{
                                    marginBottom: heighttoDP(number = '5%'),

                                    // marginTop: heighttoDP(number = '5%'),
                                    // marginBottom: heighttoDP(number = '1%'), height: heighttoDP(number = '1%')
                                }}
                                data={DATA}
                                nestedScrollEnabled={true}
                                renderItem={({ item }) =>

                                    <TouchableOpacity style={{
                                        height: heighttoDP(number = '25%'),
                                        width: widthtoDP(number = '90%'),

                                        marginVertical: heighttoDP(number = '3%'),
                                        alignSelf: 'center', justifyContent: 'center'
                                    }}
                                    onPress={() => this._onPress(item)}
                                    >
                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                            <View style={{
                                                width: widthtoDP(number = '30%'),
                                                alignItems: 'center', justifyContent: 'center'
                                            }}>
                                                <View style={{
                                                    marginLeft: widthtoDP(number = '7%'),
                                                    width: widthtoDP(number = '30%'),
                                                    height: heighttoDP(number = '20%'),
                                                    backgroundColor: 'white', borderRadius: widthtoDP(number = '4%')
                                                }}>
                                                    <Image
                                                        style={{
                                                            height: heighttoDP(number = '13%'), width: heighttoDP(number = '13%'),
                                                            borderRadius: heighttoDP(number = '2%'),
                                                            marginLeft: heighttoDP(number = '6%'),
                                                            marginTop: -heighttoDP(number = '2%')
                                                        }}
                                                        source={{ uri: "https://pe-images.s3.amazonaws.com/basics/cc/image-size-resolution/resize-images-for-print/original-image.jpg" }} />
                                                    <Text
                                                        style={{
                                                            color: GLOBAL.eva_blue, fontWeight: 'bold',
                                                            fontSize: heighttoDP(number = '3%'),
                                                            marginTop: heighttoDP(number = '3%'),
                                                            alignSelf: 'center'
                                                        }}
                                                    >Varun</Text>
                                                </View>
                                            </View>
                                            <View style={{
                                                width: widthtoDP(number = '55%'),
                                                alignItems: 'center', justifyContent: 'space-evenly'
                                            }}>
                                                <Image
                                                    style={{
                                                        height: heighttoDP(number = '13%'),
                                                        width: widthtoDP(number = '45%'),
                                                        borderRadius: heighttoDP(number = '2%'),
                                                        marginLeft: widthtoDP(number = '12%'),
                                                        marginTop: heighttoDP(number = '6%')
                                                    }}
                                                    source={{ uri: "https://pe-images.s3.amazonaws.com/basics/cc/image-size-resolution/resize-images-for-print/original-image.jpg" }} />

                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                }
                                keyExtractor={(item, index) => item + index}
                                getItemCount={getItemCount}
                                getItem={getItem}
                                horizontal={false}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                        <View style={{ height: 20, width: 50 }}>
                            <Text>Varun</Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({

    item: {
        backgroundColor: 'white',
        height: heighttoDP(number = '22%'),
        width: heighttoDP(number = '20%'),
        marginHorizontal: widthtoDP(number = '5%'),
        // padding: 20,
        borderRadius: 20,
        marginTop: heighttoDP(number = '5%')
    },
    title: {
        fontSize: 32,
    },
});