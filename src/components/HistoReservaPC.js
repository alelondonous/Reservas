import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet,TouchableOpacity,Alert,Dimensions} from 'react-native';
import _ from 'lodash';

const dwidth = Dimensions.get('window').width;
const dheight = Dimensions.get('window').height;

export default function HistoReservaPC(props){
    const {nombrelugar, cabecera,nompc, fecha, HoraIni , HoraFin, nombrePrograma,setReloadData, documento, authorization, setModalVisible}=props;


    const MensajeCancelReserva=()=>{
        Alert.alert(
            'Cancelar Reserva',
            `¿Estas seguro de cancelar esta reserva?`,
            [
                {
                    text:'Salir',
                    style:'cancel',
                },
                {
                    text:'Cancelar Reserva',
                    onPress:()=>{
                        cancelarReservaPC();  
                    },
                }, 
            ],
            {cancelable:false},

        );
        

    };


    const MensajeOk=()=>{
        Alert.alert(
            "Cancelar Reserva",
            "Reserva cancelada satisfactoriamente",
            [{text:'OK',style:'ok',}]
        )
    };

    const MensajekO=()=>{
        Alert.alert(
            "Cencelar Reserva",
            "No se pudo cancelar la reserva. Intente nuevamente o contacte al administrador",
            [{text:'OK',style:'ok',}]
        )

    };

    // cambiar stado en cabecera y modificar tabla equipo lugar movimiento  
    const cancelarReservaPC =()=>{
        const id=cabecera;
        const usuario = documento;
        const url = 'https://reservapp.ucm.edu.co/api/1.0/cancelar_reservapc/'+id+'/'+usuario+'/';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorization
            }
            })
            .then(function(response) {
                if(response.ok) {
                    console.log('bien');
                } else {
                    console.log('Respuesta de red OK pero respuesta HTTP no OK');
                }
              })
              .catch(function(error) {
                console.log('Hubo un problema con la petición Fetch:' + error.message);
              });  
        setReloadData(true);
        setModalVisible(false);

    };

    return(
        <View style={styles.calendario}>        
            <Text style={styles.detalle}>Detalle de Reserva</Text>
            
            <View style={{marginTop:0.05*dwidth, alignItems:'baseline', marginBottom:0.05*dheight, marginLeft:0.05*dwidth}}>
                <Text style={styles.textdetalle}>Lugar: {nombrelugar}</Text>
                <Text style={styles.textdetalle}>Equipo: {nompc}</Text>
                <Text style={styles.textdetalle}>Fecha: {fecha} </Text>
                <Text style={styles.textdetalle}>Desde: {HoraIni}</Text>
                <Text style={styles.textdetalle}>Hasta: {HoraFin}</Text>
                <Text style={styles.textdetalle}>Programa Académico: {nombrePrograma}</Text>
                
            </View>
            
            <TouchableOpacity style={styles.boton} onPress={()=>MensajeCancelReserva()}>
                <Text style={styles.textboton}>Cancelar Reserva</Text>
            </TouchableOpacity> 
            

        </View>
    );
}

const styles = StyleSheet.create({
    detalle:{
        marginTop:0.02*dheight,
        fontSize:0.06*dwidth,
        fontWeight:'bold',
        textAlign:'center',
        fontFamily:'FiraSans-Light',
        color:"#032A3F",
        marginLeft:0.01*dwidth,
    }, 
    textdetalle:{
        fontSize:0.05*dwidth,
        fontWeight:'bold',
        textAlign:'center',
        fontFamily:'FiraSans-Light',
        color:"#92a3ad",
        textAlign:'left',

    },

    calendario:{
        marginTop:0.25*dheight,
        marginLeft:0.03*dwidth,
        marginRight:0.03*dwidth,
        marginBottom:0.04*dwidth,
        borderColor:'#92A3AD',
        borderWidth:0.014*dwidth,
        flex:1,
    },
    
    boton:{
        backgroundColor:'#00b5be',
        width:0.55*dwidth,
        height:0.12*dwidth,
        alignItems:'center',
        marginLeft:0.14*dwidth,
        
    },
    textboton:{
        fontSize:0.06*dwidth,
        color:'#ffff',
        fontWeight:'bold',
        fontFamily:'FiraSans-Light',
        marginTop:0.02*dwidth,
      },
     

});


