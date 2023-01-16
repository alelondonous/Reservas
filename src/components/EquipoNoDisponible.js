import React from 'react';
import {View, Text, StyleSheet,ImageBackground,Dimensions} from 'react-native';

const dwidth = Dimensions.get('window').width;
const dheight = Dimensions.get('window').height;

export default function EquipoNoDisponible(){
    
    
    return(
        <View style={styles.nodispo}>
            <Text style={styles.mensaje}>No hay equipos disponibles en el horario seleccionado</Text>

        </View>
    );

}

const styles= StyleSheet.create({
    nodispo:{
       
        marginTop:0.2*dheight,
        marginLeft:0.03*dwidth,
        marginRight:0.03*dwidth,
        marginBottom:0.04*dwidth,
        borderColor:'#F1573D',
        borderWidth:0.003*dwidth,
        
    },
    mensaje:{
        color:'#032A3F',
        fontWeight:'normal',
        fontSize:0.05*dwidth,
        padding:0.02*dwidth,

    }

});
