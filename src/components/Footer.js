import React from 'react';
import {StyleSheet, View, Image, Dimensions} from 'react-native';


const dwidth = Dimensions.get('window').width;
const dheight = Dimensions.get('window').height;
const imagewidth = 0.5*dwidth;
const imageHeight2 = Math.round(imagewidth * (51 / 191));

export default function Footer(){
    return(
        <View style={styles.contenedor}>
            <Image style={styles.footer}source={require('../imagen/logo_ucatolica.png')}/>
        </View>

    );
}

const styles = StyleSheet.create({
    contenedor:{
        height:0.05*dheight,  
        width:dwidth,
        

    },
    footer:{
        marginTop:-0.3*dwidth,
        marginLeft:0.35*dwidth,
        height:imageHeight2,  
        width:0.6*imagewidth,  
        
    },


});