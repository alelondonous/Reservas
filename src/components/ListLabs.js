import React,{useState,useEffect} from 'react';
import {StyleSheet, View,  Text, TouchableOpacity,Dimensions} from 'react-native';
import {Icon} from 'react-native-elements';

const dwidth = Dimensions.get('window').width;
const dheight = Dimensions.get('window').height;

export default function ListLab(props){
    const {lab, codigo, piso, bloque,lugar, contador, setModalVisible, setLabListLab, setCodListLab,setbloqueListLab,setpisoListLab, setlugarListLab}=props;
    const num =contador;
   //console.log(num);
   
   
    

    const EnviarEstados=()=>{
        setLabListLab(lab);
        setCodListLab(codigo);
        setbloqueListLab(bloque);
        setpisoListLab(piso);
        setlugarListLab(lugar);
        setModalVisible(true);

    };
    

    return(
            
        <TouchableOpacity  keyboardShouldPersistTaps = "always" style={[ styles.lista, (num%2)?styles.otro:styles.otro2]} onPress={()=>EnviarEstados() }>
            <Text style={[styles.text,(num%2)?styles.text1:styles.text2 ]}>{lab}</Text>
            <View style={styles.icono}>
                <Icon
                    name='chevron-forward'
                    type='ionicon'
                    color={num%2?'#FFFF':'#032A3F'}
                    size={0.1*dwidth} 
                    
                />
            </View>
            
        </TouchableOpacity>
    
        
    );

}

const styles = StyleSheet.create({
    container:{
        
    },
   
    lista:{
        height:0.12*dwidth,
        paddingHorizontal:0.03*dwidth,
        marginTop:0.02*dwidth,
        marginLeft:0.03*dwidth,
        marginRight:0.03*dwidth,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',  

    },
    otro:{
        backgroundColor:'#00B5BE',
        
    },
    otro2:{
        backgroundColor:'#E4E8E9', 
    },
    text:{
        fontSize:0.04*dwidth,
        fontWeight:'bold',
        fontFamily:'Fira Sans',
        paddingRight:0.1*dwidth,

    },
    text1:{
        color:'#FFFF',

    },
    text2:{
        color:'#032A3F',
    },

    icono:{
        width:0.1*dwidth,
        height:0.12*dwidth,
        position:'absolute',
        marginLeft:0.8*dwidth,

    }
});