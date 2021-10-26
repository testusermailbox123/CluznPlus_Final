import {Dimensions,PixelRatio } from 'react-native'

const {width,height} = Dimensions.get('window');

const widthtoDP = number => {
    let givenwidth = typeof number === 'number' ? number : parseFloat(number );
        return PixelRatio.roundToNearestPixel ((width * givenwidth ) / 100);
};

const heighttoDP = number =>{
    let givenheight = typeof number === 'number' ? number : parseFloat(number );
    return PixelRatio.roundToNearestPixel((height*givenheight)/100);
}

export {widthtoDP,heighttoDP}