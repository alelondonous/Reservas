import React, {useState} from 'react';
import {Image, Alert,StyleSheet, View, TouchableOpacity,Dimensions} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {Icon} from 'react-native-elements';
import AcercaDe from '../components/AcercaDe';
import LoginForm from '../screens/LoginForm';
import Home from '../screens/Home';
import Laboratorios from '../screens/Laboratorios';
import SaComputo from '../screens/SaComputo';
import Auditorios from '../screens/Auditorios';
import Aulas from '../screens/Aulas';
import HistorialReservas from '../screens/HistorialReservas';
const dwidth = Dimensions.get('window').width;
const dheight = Dimensions.get('window').height;
const imagewidth = 0.6*dwidth;
const imageHeight = Math.round(imagewidth * (116 / 561));



const Stack = createStackNavigator();

export default function Navigation(){
    const [islogin,setIsLogin] = useState(null);
    
    // añadir estado para identificacion de usuario 
    const [identificacion, setIdentificacion] = useState(null);
    const [rol, setRol] = useState(null);
    const [nombre, setnombre] = useState(null);
    const [apellido, setapellido] = useState(null);
    const [active, setActive] = useState(false);
    const login= islogin;
    const documento = identificacion;
    var user=[];
   //console.log("lo que llega a navigatio:",islogin);


    function LogoTitle() {
        return (
            
            <Image
                style={{ width: 1.05*imagewidth, height: 1.2*imageHeight }}
                source={require('../imagen/logo_horizontal.png')}
            /> 
        );
    };

    const DatosUsuario=(user)=>{
        user.forEach(function(element){
            setnombre(element.nombre);
            
          }); 

    };

    const DataUsuario=()=>{
        const url = 'https://reservapp.ucm.edu.co/api/1.0/nombreusuario/'+documento+'/'
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
            })
            .then(response => response.json())
            //.then(json => console.log(json)) 
            .then((json) =>{
                user=json;
                //console.log(user);
                DatosUsuario(user);
            })
            .catch(err => {
                console.log(err);
            }); 
        setActive(true)
    };

    function ModalInfo(){
        
        return(
            <>  
                <View style={styles.csesion}>
                    <TouchableOpacity   onPress={()=>DataUsuario()}>
                        <Icon
                            name='person-circle-outline'
                            type='ionicon'
                            color='#fff'
                            size={0.1*dwidth}    
                        />
                    </TouchableOpacity>
                </View>
                
                <AcercaDe active={active} setActive={setActive} token={login} setIsLogin={setIsLogin} nombre={nombre}/>
            </>
        );
    };

    
    
  
    return(
        <>
            
            <Stack.Navigator>
                {!islogin ? 
                    <>
                        <Stack.Screen name="loginform" options={{ title: ''}}>
                            {props => <LoginForm {...props} setIsLogin={setIsLogin} setIdentificacion={setIdentificacion} setRol={setRol}/>}
                        </Stack.Screen>
                    
                    </>
                    
                :
                    <>
                        
                        <Stack.Screen name="Home" options={{headerBackImage:()=>(<Icon name='arrow-back-outline' type='ionicon' color='#FFFF' size={0.08*dwidth}/>), headerStyle: {backgroundColor: '#032A3F',height:0.1*dheight},headerTitle: props => <LogoTitle {...props} />,headerRight:props => <ModalInfo {...props} />}}>{props => <Home {...props} token={login} documento={documento} rol={rol} />}</Stack.Screen>
                        <Stack.Screen name="laboratorios" options={{headerBackImage:()=>(<Icon name='arrow-back-outline' type='ionicon' color='#FFFF' size={0.08*dwidth}/>), headerStyle: {backgroundColor: '#032A3F',height:0.1*dheight},headerTitle: props => <LogoTitle {...props} />,headerRight:props => <ModalInfo {...props} />}}>{props => <Laboratorios {...props} token={login} documento={documento} rol={rol} />}</Stack.Screen>
                        <Stack.Screen name="auditorios" options={{headerBackImage:()=>(<Icon name='arrow-back-outline' type='ionicon' color='#FFFF' size={0.08*dwidth}/>), headerStyle: {backgroundColor: '#032A3F',height:0.1*dheight},headerTitle: props => <LogoTitle {...props} />,headerRight:props => <ModalInfo {...props} />}}>{props => <Auditorios {...props} token={login} documento={documento} rol={rol} />}</Stack.Screen>
                        <Stack.Screen name="sacomputo" options={{headerBackImage:()=>(<Icon name='arrow-back-outline' type='ionicon' color='#FFFF' size={0.08*dwidth}/>), headerStyle: {backgroundColor: '#032A3F',height:0.1*dheight},headerTitle: props => <LogoTitle {...props} />,headerRight:props => <ModalInfo {...props} />}}>{props => <SaComputo {...props} token={login} documento={documento} rol={rol} />}</Stack.Screen>
                        <Stack.Screen name="aulas" options={{headerBackImage:()=>(<Icon name='arrow-back-outline' type='ionicon' color='#FFFF' size={0.08*dwidth}/>), headerStyle: {backgroundColor: '#032A3F',height:0.1*dheight},headerTitle: props => <LogoTitle {...props} />,headerRight:props => <ModalInfo {...props} />}}>{props => <Aulas {...props} token={login} documento={documento} rol={rol} />}</Stack.Screen>
                        <Stack.Screen name="historial" options={{headerBackImage:()=>(<Icon name='arrow-back-outline' type='ionicon' color='#FFFF' size={0.08*dwidth}/>), headerStyle: {backgroundColor: '#032A3F',height:0.1*dheight},headerTitle: props => <LogoTitle {...props}/>,headerRight:props => <ModalInfo {...props} />}}>{props => <HistorialReservas {...props} token={login} documento={documento} rol={rol} />}</Stack.Screen>
                        
                    </>
                }
                    
            </Stack.Navigator>  
             
        </>
    );
}

const styles=StyleSheet.create({
    csesion:{
        width:0.1*dwidth,
        height:0.1*dwidth,
        marginTop:0.04*dwidth,
        marginRight:0.04*dwidth,

    },

});
