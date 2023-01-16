import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Modal,TouchableOpacity,AppState,Alert,Dimensions} from 'react-native';
import {Icon} from 'react-native-elements';

const dwidth = Dimensions.get('window').width;
const dheight = Dimensions.get('window').height;

export default function AcercaDe(props){
    const {active, setActive, token, setIsLogin, nombre} = props;
    const [appState, setAppState] = useState(AppState.currentState);
    const authorization = "Token" + " " + token;


    const NoCerro=()=>{
        Alert.alert(
            "Cierre de sesión",
            "La sesión no pudo cerrarse de manera correcta. Contacte al administrador del sitio para mayor información",
            [{text:'OK',style:'ok',}]
        )
    };

    const FalloPeticion=()=>{
        Alert.alert(
            "Cierre de sesión",
            "Recurso no disponible. Por favor intente mas tarde. ",
            [{text:'OK',style:'ok',}]
        )
    };
    
    const handleAppStateChange = (state) => {
        setAppState(state);
        if(state === 'background'){
            CerrarSesion();

        }
      };

      useEffect(() => {
        AppState.addEventListener('change', handleAppStateChange);
        return (() => {
          AppState.removeEventListener('change', handleAppStateChange);
        })
       
      }, []);



      
    const CerrarSesion=()=>{
        const url = 'https://reservapp.ucm.edu.co/api/1.0/logout/';
        // console.log(url);
         fetch(url, {
             method: 'GET',
             headers: {
                 'Content-Type': 'application/json',
                 'Authorization': authorization
             }
             })
             .then(function(response) {
                 if(response.ok) {
                     //MensajeOk();
                     //console.log('bien');
                     setIsLogin(null);
                 }else {
                    NoCerro();
                    console.log('Respuesta de red OK pero respuesta HTTP no OK');
                 }
               })
               .catch(function(error) {
                 FalloPeticion();
                 console.log('Hubo un problema con la petición Fetch:' + error.message);   
               });  
        setActive(false)
    };


    return(
        <View style={styles.contenedor}>
            
            
            <Modal
                transparent={true}
                visible={active}
            >
                <View style={styles.containerModal}>
               
                    <View style={styles.Moldal}>
                    <TouchableOpacity style={{marginTop:0, marginLeft:0.5*dwidth}} onPress={()=>setActive(false)}>
                            <Icon
                                name='close'
                                type='ionicon'
                                color='#FFFF'
                                size={0.1*dwidth}    
                            />
                        </TouchableOpacity>
                        <Text style={{fontFamily:'FiraSans-Light',
                                        color:"#FFFF",
                                        fontWeight:'bold',
                                        fontSize:0.06*dwidth,
                                        textAlign:'left',
                                        marginLeft:0.04*dwidth,
                                        marginTop:0.02*dwidth,
                                        marginBottom:0.07*dheight}}>{nombre}</Text>

                        <TouchableOpacity style={styles.touchable} onPress={()=>console.log('informacion de cuenta ')}>
                            <Icon
                                name='information'
                                type='ionicon'
                                color='#fff'
                                size={0.08*dwidth}    
                            />
                            <Text style={styles.gtext}>Información de cuenta</Text>
                        </TouchableOpacity>
                    

                        <TouchableOpacity style={styles.touchable} onPress={()=>CerrarSesion()}>
                            <Icon
                                name='exit'
                                type='ionicon'
                                color='#e4e8e9'
                                size={0.08*dwidth}    
                            />
                            <Text style={styles.Cerrar}>Cerrar Sesion</Text>
                        </TouchableOpacity>
                        <View style={[styles.touchable, styles.adicional]}>
                            <Icon
                                    name='call'
                                    type='ionicon'
                                    color='#fff'
                                    size={0.08*dwidth}    
                                />
                            <Text style={styles.gtext}>Contacto</Text>
                         </View>
                         <View style={{marginTop:0, marginLeft:0.01*dwidth}}>
                            <Text style={{color:'#FFFF',fontFamily:'FiraSans-Light',fontSize:0.04*dwidth }}>Universidad Católica de Manizales </Text>
                            <Text style={{color:'#FFFF',fontFamily:'FiraSans-Light',fontSize:0.04*dwidth }}>Carrera 23 No. 60 – 63. Manizales</Text>
                            <Text style={{color:'#FFFF',fontFamily:'FiraSans-Light',fontSize:0.04*dwidth}}>PBX (57)(6) 8933050 </Text>
                        </View>
                        <Text style={{color:'#FFFF',fontFamily:'FiraSans-Light',fontSize:0.035*dwidth, marginTop:0.02*dwidth, marginLeft:0.2*dwidth}}> Version 1.0</Text>
                        
                    </View>
                </View>

            </Modal>
        </View>
    );
}

const styles= StyleSheet.create({
    adicional:{
        marginTop:0.4*dheight,
        marginLeft:0.1*dwidth,
    },
    gtext:{
        fontFamily:'FiraSans-Light',
        color:"#FFFF",
        fontWeight:'normal',
        fontSize:0.05*dwidth,
        textAlign:'left',
        marginLeft:0.02*dwidth,
    },
    Cerrar:{
        fontFamily:'FiraSans-Light',
        color:"#e4e8e9",
        fontWeight:'bold',
        fontSize:0.06*dwidth,
        marginLeft:0.02*dwidth,

    },
    contenedor:{
        width:dwidth,
        height:dheight,
        flex:1,
    },

    containerModal:{
        backgroundColor:'#000000aa', 
        flex:1,
    },
    Moldal:{
        backgroundColor:'#032A3F', 
        marginTop:0,
        marginBottom:0,
        marginLeft:0.25*dwidth,
        marginRight:0,
        padding:0.05*dwidth, 
        flex:1, 
        alignItems:'baseline',
    },

    touchable:{
        justifyContent:'space-between',
        flexDirection:'row',
        marginTop:0.02*dwidth,
        marginLeft:0.02*dwidth,
        marginBottom:0.02*dwidth,

    },
});