import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet,ScrollView, Modal,TouchableOpacity,ImageBackground,Alert,Dimensions} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import 'moment/locale/es';
import ListAuditorios from '../components/ListAuditorios';
import Footer from '../components/Footer';
import {Icon} from 'react-native-elements';
import Calendario from '../components/Calendario';
import ProgramasYMaterias from '../components/ProgramasYMaterias';
import ResumenReserva from '../components/ResumenReserva';
import ViewAgenda from '../components/ViewAgenda';
import NoDisponible from '../components/NoDisponible';

// se toman las dimensiones de la pantalla en donde se instalara la app para que las vistas sean proporcionales a las medidas
const dwidth = Dimensions.get('window').width;
const dheight = Dimensions.get('window').height;
const imagewidth = 0.7*dwidth;
const imageHeight = Math.round(imagewidth * (61/228));


export default function Auditorios(props){
   // se definen los estados y variables a utilizar
    const {token,documento,rol}=props;
    const authorization = "Token" + " " + token;

    const [totales, setTotales] = useState([])
    const [nombreaudi, setNombreaudi] = useState(null);
    const [bloque, setBloque] = useState(null);
    const [piso, setPiso] = useState(null);
    const [lugar, setLugar] = useState(null);
    const [capacidad, setCapacidad] = useState(null);
    const [codsiga, setCodsiga] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [agendaVisible, setAgendaVisible] = useState(false);
    const [dia,setDia]= useState(undefined);
    const [HoraIni, setHoraIni] = useState(null);
    const [HoraFin, setHoraFin] = useState(null);
    const [programa, setprograma] = useState(null); 
    const [lleno, setlleno] = useState(false); 
    const [horasAgenda, setHorasAgenda] = useState([]);
    var horainicio =null;
    var  horafinal = null;
  

   const ErrorRed=()=>{
        Alert.alert(
            "Consulta fallida",
            "No es posible obtener la lista de auditorios. Por favor intente mas tarde",
            [{text:'OK',style:'ok',}]
        )
    };
// llamada al api rest para traer la lista de laboratorios 
    useEffect(()=>{
        setTotales([]);
        const url = 'https://reservapp.ucm.edu.co/api/1.0/list_auditorio/'+rol+'/'
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorization
            }
            })
            .then(response => response.json())
            //.then(json => console.log(json)) 
            .then(json =>setTotales(json))
            .catch(err => {
                ErrorRed();
                console.log(err);
            }); 
    },[]);


    const Cancelar=()=>{
        setAgendaVisible(false);

    };

    const ReiniciarVariables=()=>{
        setHoraIni(null);
        setHoraFin(null);

    };
/////// mensajes de alerta /// 
    const ErrorCampos=(error)=>{
        const algo = error;
        Alert.alert(
          "Generar Reserva",
          "ERROR: Debe ingresar el campo "+ algo + " para reservar",
          [{text:'OK',style:'ok',}]
          )
  
      };

    const MensajeError=(error)=>{
        const algo = error;
        Alert.alert(
          "Generar Reserva",
          "ERROR: "+ algo,
          [{text:'OK',style:'ok',}]
          )
  
      };

    const MensajeOk=()=>{
        Alert.alert(
            "Generar Reserva",
            "Reserva creada satisfactoriamente",
            [{text:'OK',style:'ok',}]
        )
    };

    const MensajekO=()=>{
        Alert.alert(
            "Generar Reserva",
            "No se pudo crear la reserva. Intente nuevamente o contacte al administrador",
            [{text:'OK',style:'ok',}]
        )

    };
    
    // funcion para separar el string de horas
    const convertirHoras=(temp)=>{
        let tiempo = temp + '';
        tiempo = tiempo.split(':');
        let horas = tiempo[0];
        let minutos=tiempo[1];
        let segundos = '00';
        let dato = horas+':'+minutos+':'+segundos
        return dato;
    };
// funcion para insertar la reserva 
    const EnviarReserva=()=>{
        if(HoraIni != null){
            let temp1 = moment(HoraIni).format('HH:mm:ss');
            horainicio =convertirHoras(temp1);
        }else{
            horainicio = null;

        }

        if(HoraFin != null){
            let temp2 = moment(HoraFin).format('HH:mm:ss');
            horafinal = convertirHoras(temp2);

        }else{
            horafinal =null;
        }
        const bloque1 =  bloque;
        const piso1 = piso;
        const  lugar1 = lugar;
        const fechainicio = dia;
        const fechafinal = dia;
        const proma = programa;
        const docente = documento;
        const fuente = rol;
        const url = 'https://reservapp.ucm.edu.co/api/1.0/reservar/'+bloque1+'/'+piso1+'/'+lugar1+'/'+fechainicio+'/'+horainicio+'/'+fechafinal+'/'+horafinal+'/'+proma+'/'+docente+'/'+fuente+'/';
        if(!horainicio || !horafinal || proma == null){
            if(horainicio == null) ErrorCampos("Hora Inicial");
            if(horafinal == null) ErrorCampos("Hora Final");
            if( proma == null) ErrorCampos("Programa");

        }else{
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authorization
                }
                })
                .then(function(response) {
                    if(response.ok) {
                        MensajeOk();
                        //console.log('bien');
                    } else {
                        MensajekO();
                        //console.log('Respuesta de red OK pero respuesta HTTP no OK');
                    }
                  })
                  .catch(function(error) {
                    setStatus(false);
                    MensajeError(error.message);
                  });  

            setAgendaVisible(false);
            ReiniciarVariables();
        }
        
    };
    
    
    return(
        <View style={styles.container}>
            <Text style={styles.textHeader}>Inicio/Auditorios</Text>
           
            <ScrollView style={styles.scrollview}>
                {
                    (totales ==0)?<NoDisponible  espacio={'auditorios'}/>:
                        <>
                            {totales.map((item,index)=>(
                                <ListAuditorios auditorio={item.lug_nombre}  codigo={item.lug_codigo_siga} piso={item.lug_piso} bloque={item.lug_bloque} lugar={item.lug_id} key={index} contador ={index+1} sillas={item.lug_numero_sillas} setNombreaudi={setNombreaudi} setBloque={setBloque} setPiso={setPiso} setLugar={setLugar} setCapacidad={setCapacidad} setCodsiga={setCodsiga} setModalVisible={setModalVisible}  />
                                ))}
                        </>
                }
            </ScrollView>
            <Modal
                transparent={true}
                visible={modalVisible}
                
            >
                <View style={styles.containerModal}>
                    <View style={styles.Moldal}>
                            
                        <View style={styles.header}>
                            <ImageBackground  style={styles.escudo} source={require('../imagen/logo_universidad_light_large.png')} />
                            <Text style={styles.text}>{nombreaudi} </Text> 
                            <Text style={styles.subtext}>Capacidad: {capacidad} personas</Text> 
                            <TouchableOpacity style={styles.cerrar} onPress={()=>setModalVisible(false)}>
                                <Icon
                                    name='close-sharp'
                                    type='ionicon'
                                    color='#fff'
                                    size={0.1*dwidth}    
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.calendario}>
                            <Calendario setAgendaVisible={setAgendaVisible} setDia={setDia} setHorasAgenda={setHorasAgenda} codsiga={codsiga} authorization={authorization}  />
                        </View>
                         
                    </View> 

                </View>     
                
            </Modal>
            <Modal 
                transparent={true}
                visible={agendaVisible}
            >
                <View style={styles.containerModal}>
                    <View style={styles.Moldal}>
                        
                        <View style={styles.header}>
                            <ImageBackground  style={styles.escudo} source={require('../imagen/logo_universidad_light_large.png')} />
                            <Text style={styles.text}>{nombreaudi} </Text> 
                            <Text style={styles.subtext}>Capacidad: {capacidad} personas</Text> 
                        </View>
                        <View style={styles.resumen}>
                            <Text style={styles.agenda}>{moment(dia).format('LL')}</Text>
                            <ViewAgenda dia={dia} horarios={horasAgenda} setlleno={setlleno}/>
                            <ResumenReserva setHoraIni={setHoraIni} setHoraFin={setHoraFin}  auditorio={nombreaudi}/>
                            <View >
                                <ProgramasYMaterias setprograma={setprograma} authorization={authorization} documento={documento} rol={rol}/> 
                            </View>
                            <View style={styles.cancelar}>
                                <TouchableOpacity style={styles.boton} onPress={()=>Cancelar()}>
                                        <Text style={styles.textboton}>Cancelar</Text>
                                </TouchableOpacity>  
                                <TouchableOpacity style={styles.boton} onPress={()=>EnviarReserva()}>
                                        <Text style={styles.textboton}>Guardar</Text>
                                </TouchableOpacity> 

                            </View> 
                        </View>
                    </View>
                </View>
            </Modal>       

            <Footer/>
        </View>

    );
}

const styles = StyleSheet.create({
    cancelar:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:0.06*dwidth,
        marginHorizontal:0.03*dwidth,
    },
    container:{
        alignItems:'baseline',
        width:dwidth,
        height:dheight,
        backgroundColor:'#FFFF',
    },
    textHeader:{
        marginTop:0.03*dwidth,
         fontSize:0.07*dwidth,
         fontWeight:'normal',
         textAlign:'left',
         fontFamily:'FiraSans-Light',
         color:"#92A3AD",
         marginLeft:0.03*dwidth,
     }, 
     scrollview:{
        marginBottom:0.32*dwidth,
        width:dwidth,
        marginTop:0.02*dwidth,
    },
    cerrar:{
        marginLeft:0.8*dwidth,
        marginTop:-0.39*dwidth,
        flex:1,
    },

     text:{
        marginTop:0.04*dwidth,
        fontFamily:'FiraSans-Light',
        color:"#FFFF",
        fontWeight:'bold',
        fontSize:0.055*dwidth,
     },
     subtext:{
        fontFamily:'FiraSans-Light',
        color:"#FFFF",
        fontWeight:'normal',
        fontSize:0.05*dwidth,

     },
  
    containerModal:{
        backgroundColor:'#000000aa', 
        flex:1,
    },
    Moldal:{
        backgroundColor:'#FFFf', 
        marginTop:0.08*dwidth,
        marginBottom:0.08*dwidth,
        marginLeft:0.03*dwidth,
        marginRight:0.03*dwidth,
        padding:0.01*dwidth, 
        flex:1, 
    },
    calendario:{
        marginTop:0.45*dwidth,
    },
    resumen:{
        marginTop:0.45*dwidth,
    },
    
    header:{
        position:'absolute',
        width:0.94*dwidth,
        height:0.22*dheight,
        alignItems:'center',
        backgroundColor:'#032A3F',
        flexDirection:'column'  
    },

    escudo:{
        height:imageHeight,
        width:imagewidth, 
        padding:0,
        marginTop:0.04*dwidth, 
        marginLeft:-0.04*dwidth,    
    },
 
     
    agenda:{
        fontSize: 0.05*dwidth,
        fontWeight:'bold',
        color:'#032A3F',
        textAlign:'center',
        fontFamily:'FiraSans-Light',
    },
    boton:{
        backgroundColor:'#00B5BE',
        width:0.4*dwidth,
        height:0.1*dwidth,
        alignItems:'center',
        
    },
    textboton:{
        fontSize:0.06*dwidth,
        color:'#ffff',
        fontWeight:'bold',
        fontFamily:'FiraSans-Light',
        padding:0.003*dwidth,
      },
     

});


