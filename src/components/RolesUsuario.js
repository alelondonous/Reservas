import React from 'react';
import {StyleSheet, View , Dimensions} from 'react-native';
import RNPickerSelect from 'react-native-picker-select'

const dwidth = Dimensions.get('window').width;
const dheight = Dimensions.get('window').height;

export default function Rolesusuario(props){
    
    const {grupos,setNgrupo} = props;
    
    return (
        <View style={styles.container} >
            <RNPickerSelect
                style={Pickerstyles}
                placeholder={{label: 'Seleccione un rol'}}
                onValueChange={(value) => setNgrupo(value)}
                items={
                    grupos.map((item)=>(
                    {
                        label: item.upf_fuente, 
                        value:item.upf_fuente
                    }))
                        
                }
            />
        </View>
          
    );


};


const styles= StyleSheet.create({
    container:{
        width:0.75*dwidth,
        height:0.05*dwidth,
        marginRight:0.02*dwidth,
        marginLeft:0.02*dwidth,
        marginTop:0.001*dwidth,
        marginBottom:0.05*dwidth,
    }
});


const Pickerstyles = StyleSheet.create({
    inputIOS:{
        fontSize:0.04*dwidth,
        color:'#032A3F',
        marginTop:-0.03*dwidth,
       
    },

    inputAndroid:{
        fontSize:0.04*dwidth,
        color:'#032A3F',
        marginTop:-0.03*dwidth,
       
        

    },
});