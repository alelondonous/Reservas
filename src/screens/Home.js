import React,{useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions} from 'react-native';
//import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Divider } from 'react-native-elements';

const dwidth = Dimensions.get('window').width;
const dheight = Dimensions.get('window').height;




export default function Home(props){
    // variables de uso 
    const {navigation, token} =props;

     //Esta pagina renderiza la navegacion a las diferentes vistas de la aplicacion 

    //console.log( 'lo que llega a home',token);
    return(

        <View style={styles.content}>
            
            <Text style={styles.textHeader}>Inicio</Text>
            <View style={styles.contenedor1}>
                <TouchableOpacity styles ={styles.touchable} onPress={()=>navigation.navigate('laboratorios',{token:token})}>
                    <ImageBackground  style={styles.boton1} source={require('../imagen/lab.png')} />
                    <Divider orientation="horizontal"style={styles.line} />
                    <Text style={styles.text}>Laboratorios</Text>  
                </TouchableOpacity>
                
            </View>
            

            <View style={styles.contenedor}>
                <TouchableOpacity styles ={styles.touchable} onPress={()=>navigation.navigate('auditorios')}>
                    <ImageBackground  style={styles.boton} source={require('../imagen/auditorio.png')}/>
                    <Divider orientation="horizontal"style={styles.line} />
                    <Text style={styles.text}>Auditorios</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.contenedor}>
                <TouchableOpacity styles ={styles.touchable}  onPress={()=>navigation.navigate('aulas')}>
                    <ImageBackground  style={styles.boton} source={require('../imagen/aulas.png')}/>
                    <Divider orientation="horizontal"style={styles.line} />
                    <Text style={styles.text}>Aulas</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.contenedor}>
                <TouchableOpacity styles ={styles.touchable}  onPress={()=>navigation.navigate('sacomputo')}>
                    <ImageBackground  style={styles.boton} source={require('../imagen/computo.png')}/>
                    <Divider orientation="horizontal"style={styles.line} />
                    <Text style={styles.text}>Sala de Computo</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.contenedor}>
                <TouchableOpacity styles ={styles.touchable}  onPress={()=>navigation.navigate('historial')}>
                    <ImageBackground  style={styles.boton} source={require('../imagen/historial.png')}/>
                    <Divider orientation="horizontal"style={styles.line} />
                    <Text style={styles.text}>Historial de Reservas</Text>
                </TouchableOpacity>
            </View>
            
            
                
                
            
        </View>

    );
}

const styles = StyleSheet.create({
    
    line:{
        marginEnd:0.1*dwidth,
        borderBottomWidth:0.003*dwidth,
        borderBottomColor: '#92A3AD',
        marginTop:0.008*dwidth,
    },
  
    content:{
        width:dwidth,
        height:dheight,
        backgroundColor:'white',    
    },
    touchable:{
        flexDirection:'row',
        justifyContent:'space-between',
       
    },
    contenedor1:{
        marginTop:0.035*dwidth,
        marginLeft:0.05*dwidth,
    },
    contenedor:{
        marginTop:0.14*dwidth,
        marginLeft:0.05*dwidth,
    },

    boton:{
        width:0.23*dwidth,
        height:0.22*dwidth,
             
    },
    boton1:{
        width:0.23*dwidth,
        height:0.26*dwidth,
        marginTop:-0.01*dheight,

             
    },
    textHeader:{
       marginTop:0.05*dwidth,
        fontSize:0.07*dwidth,
        fontWeight:'normal',
        textAlign:'left',
        fontFamily:'FiraSans-Light',
        color:"#92A3AD",
        marginLeft:0.08*dwidth,
    },

    text:{
        marginTop:-0.15*dwidth,
        marginLeft: 0.3*dwidth,
        textAlign:'left',
        fontSize:0.05*dwidth,
        fontWeight:'bold',
        fontFamily:'FiraSans-Light',
        color:'#032A3F',


    },
    

   
});