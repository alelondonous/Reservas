import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity,Alert, TextInput, Dimensions} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Rolesusuario from '../components/RolesUsuario';

// se toman las dimensiones de la pantalla en donde se instalara la app para que las vistas sean proporcionales a las medidas
const dwidth = Dimensions.get('window').width;
const dheight = Dimensions.get('window').height;
const imagewidth = 0.5*dwidth;
const imageHeight = Math.round(imagewidth * (359 / 420));
const imageHeight2 = Math.round(imagewidth * (51 / 191));




export default function LoginForm(props){
    // definir variables 
    //console.log(setIsLogin);
    const {navigation, setIsLogin,setIdentificacion,setRol} = props;
    
    const [formData, setFormData] = useState(defaultValue());
    const [formError, setFormError] = useState({});
    const [ngrupo, setNgrupo] = useState(null);
    const [grupos, setGrupos] = useState([]);

    var token = null; 
   
  // detecta el cambio al escribir texto en los input
    const onChange=(e,type) =>{
        //console.log("data: ", e.nativeEvent.text)
        //console.log("type: ", type)
        setFormData({...formData, [type]: e.nativeEvent.text});
        

    };
// mensajes de alerta 

const Faltancampos=(data)=>{
    Alert.alert(
        "Error de Ingreso",
        "Por favor ingrese su " + data,
        [{text:'OK',style:'ok',}]
    )
};
    const MensajekO=()=>{
        Alert.alert(
            "Error de Ingreso",
            "Por favor verifique su identificación y contraseña",
            [{text:'OK',style:'ok',}]
        )
    };

    const ErrorRol=()=>{
        Alert.alert(
            "Error de Ingreso",
            "Debe seleccionar un rol para iniciar sesión",
            [{text:'OK',style:'ok',}]
        )
    };

    const ErrorRed=()=>{
        Alert.alert(
            "Error de Red",
            "Existen problemas de conexion. Por favor intente mas tarde",
            [{text:'OK',style:'ok',}]
        )
    };

    const ErrorObUsuario=()=>{
        Alert.alert(
            "Error de Ingreso",
            "Usuario no autorizado para usar la aplicación",
            [{text:'OK',style:'ok',}]
        )
    };

// funcion para obtener el token de autenticacion 
    const  fetchApiCall = ()=>{
        let mounted = true;
        let errors = {};
         
        if(!formData.identificacion || !formData.password || ngrupo == null){
            if(!formData.identificacion) errors.identificacion = true;
            if(!formData.password) errors.password = true;
                Faltancampos('contraseña');
            if (ngrupo == null ){
                ErrorRol();
           }
        }else{
            fetch('https://reservapp.ucm.edu.co/api/1.0/generate_token/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username:formData.identificacion,
                    password:formData.password,
                })
                })
                .then(response => 
                    response.json()
                    )
                .then((json) =>{
                    token=json.token;
                    if(token == null){
                        MensajekO();
                        setIsLogin(null);
                         
                     }else{
                        //setIsLogin(null);
                        setIsLogin(token);
                        setIdentificacion(formData.identificacion);
                        setRol(ngrupo);
                     }
                 })
                .catch(err => {
                    setIsLogin(null);
                    console.log(err);
                });    
              //  console.log('json actualizado',token)
        }
        setFormError(errors); 
        //console.log(token);
        return () => mounted = false;
        
    };
    
    // funcion para obtener rol usuario 
    const obtenerGrupo=()=>{
        console.log('ejecutado');
        var dato = formData.identificacion;
        if(!dato){
            Faltancampos('identificación');
        }else{
            const url = 'https://reservapp.ucm.edu.co/api/1.0/roles/'+dato+'/'
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
                })
                .then(response => response.json())
                //.then(json => console.log(json)) 
                .then((json)=>{
                    if(json == 'vacio'){
                        ErrorObUsuario();
                    }else{
                        setGrupos(json);
                    }
                })
                .catch(err => {
                    ErrorRed();
                }); 
        } 
    };
    
  
    return(
        < >
            <KeyboardAwareScrollView>
                <View style={styles.view}>
                    <Image style={styles.logo} source={require('../imagen/logo.png')}/>
                
                    <TextInput
                        style = {[styles.input, formError.identificacion && styles.error]}
                        multiline={false}
                        placeholder="Identificación"
                        placeholderTextColor="#92A3AD"
                        placeholderStyle={styles.textinput}
                        keyboardShouldPersistTaps="always"
                        onChange={(e)=> onChange(e,'identificacion')}
                        onSubmitEditing={()=>obtenerGrupo()}
                        />
                    <Rolesusuario grupos={grupos} setNgrupo={setNgrupo}/>
                    <TextInput
                        style = {[styles.input, formError.password && styles.error]}
                        placeholder="Contraseña"
                        placeholderTextColor="#92A3AD"
                        secureTextEntry={true}
                        onChange={(e)=> onChange(e,'password')}
                        />
                    <TouchableOpacity  style={styles.button} onPress={()=>fetchApiCall()}>
                        <Text style= {styles.btnText}>Iniciar Sesión</Text>
                    </TouchableOpacity>
                    
                    <View style={styles.footer}>
                        <Image style={styles.escudoucm} source={require('../imagen/logo_ucatolica.png')}/>
                    </View>
                </View>   
            </KeyboardAwareScrollView>
        </>
    );
}

function defaultValue(){
    return{
        identificacion:"",
        password:"",
    };  
};


const styles = StyleSheet.create({
   
    textinput:{
        fontFamily:"FiraSans-Light",
    },
    
    btnText:{
        fontSize:0.06*dwidth,
        color:'#fff',
        fontFamily:'FiraSans-Light',
        justifyContent:'center',
        textAlign:'center',
        fontWeight:'bold',
        padding:0.02*dwidth,
    },
    button:{
        backgroundColor:'#00B5BE',
        marginLeft:0.01*dwidth,
        marginTop:0.05*dwidth,
        fontWeight:'bold',
        width:0.45*dwidth,
        height:0.07*dheight,
    },

    input:{
        height:0.07*dheight,
        width:0.8*dwidth,
        marginBottom:0.01*dwidth,
        backgroundColor:'#E4E8E9',
        paddingHorizontal:0.03*dwidth,
        fontSize:0.06*dwidth,
        textAlign:'left',   
        fontFamily:'FiraSans-Light',
        fontWeight:'normal',
    },
    
    error:{
        borderColor:'#940c0c',
    },
    view:{
        flex:1,
        alignItems:'center',
        backgroundColor:'white',

    },
    logo:{
        width:imagewidth,
        height:imageHeight,
        marginTop:0.07*dheight,
        marginBottom:0.05*dheight,   
    },
    footer:{
        //marginTop:*dheight,
       marginLeft:0.01*dheight,
        //height:1.65*imageHeight2,
        height:0.3*dheight,
        width:0.6*dwidth,
        backgroundColor:'white',
    },
     
    escudoucm:{
        marginTop:0.09*dheight,
    }

});

