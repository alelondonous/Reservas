import React, {useState, useEffect,useRef} from 'react';
import {View, Text, StyleSheet,ScrollView, Modal,TouchableOpacity,ImageBackground,Alert, Dimensions} from 'react-native';
import _ from 'lodash';
import ListSalas from '../components/ListSalas';
import Footer from '../components/Footer';
import {Icon} from 'react-native-elements';
import Calendario from '../components/Calendario';
import moment from 'moment';
import 'moment/locale/es';
import ProgramasYMaterias from '../components/ProgramasYMaterias';
import ResumenReserva from '../components/ResumenReserva';
import ViewAgenda from '../components/ViewAgenda';
import ViewEquipos from '../components/ViewEquipos';
import CalendarioVSalas from '../components/CalendarioVsalas';
import NoDisponible from '../components/NoDisponible';
//import { ContextComputer } from '../components/ContextComputer';

// se toman las dimensiones de la pantalla en donde se instalara la app para que las vistas sean proporcionales a las medidas
const dwidth = Dimensions.get('window').width;
const dheight = Dimensions.get('window').height;
const imagewidth = 0.7*dwidth;
const imageHeight = Math.round(imagewidth * (61/228));


export default function SaComputo(props){
    // definicion de variables 
    const {token,documento,rol}=props;
    const authorization = "Token" + " " + token;

    //const [reload, setReload] = useState(false);
    const [totales, setTotales] = useState([]);
    const [viewlistPC, setViewListPC] = useState(false); // verifica si la sala tiene pc para prestamo individual
    const [listpc, setlistpc] = useState([]);
    //const [desdelistpc, setDesdelistpc] =useState([]);
    ////
    //const [compu,setCompu] =useState([]);
    const [nombresala, setNombresala] = useState(null);
    const [bloque, setBloque] = useState(null);
    const [piso, setPiso] = useState(null);
    const [lugar, setLugar] = useState(null);
    const [capacidad, setCapacidad] = useState(null);
    const [codsiga, setCodsiga] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [agendaVisible, setAgendaVisible] = useState(false);
    const [equiposVisible, setEquiposVisible] = useState(false);
    const [dia,setDia]= useState(undefined);
    const [HoraIni, setHoraIni] = useState(null);
    const [HoraFin, setHoraFin] = useState(null);
    const [idequipo, setIdequipo] = useState(null);
    const [proveedor, setProveedor]=useState(null);
    const [marca, setMarca]=useState(null);
    const [equprovmar, setEquprovmar ]=useState(null);
    const [programa, setprograma] = useState(null); 
    const [horasAgenda, setHorasAgenda] = useState([]);
    const [lleno, setlleno] = useState(false); 
    const [result, setResult] = useState([]);
    const [inicialpc, setinicialpc] = useState([]);

    //const desdelistpc = useRef(listpc);
    var iniciales=listpc;
    //
    console.log('listpc',listpc);
   // console.log(' compu',compu);
    
    //const computadores = listpc;
    //setReloadcompu(true);

    var horainicio =null;
    var horafinal = null;
    //var resulttemp=listpc;


    const ErrorRed=()=>{
        Alert.alert(
            "Consulta fallida",
            "No es posible obtener la lista de salas de computo. Por favor intente mas tarde",
            [{text:'OK',style:'ok',}]
        )
    };

    // lista de salas de computo 
    useEffect(()=>{
        setTotales([]);
        const url = 'https://reservapp.ucm.edu.co/api/1.0/list_salas/'+rol+'/'
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorization
            }
            })
            .then(response => response.json())
            //.then(json => console.log(json)) 
            .then((json) =>setTotales(json))
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
        setResult([]);
        
        //console.log('al reiniciar variables',listpc);
        //listpcinicial=null;

    };
    // mensjaes de alerta 
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
    const convertirHoras=(temp)=>{
        let tiempo = temp + '';
        tiempo = tiempo.split(':');
        let horas = tiempo[0];
        let minutos=tiempo[1];
        //let segundos = '00';
        let dato = horas+':'+minutos;
        return dato;
    };
    // funcion cuando se reserva la sala completa
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

    // funcion para reservar los pc de salas 
    const EnviarReservaSalas=()=>{
        let temp1 = moment(HoraIni).format('HH:mm:ss');
        let temp2 = moment(HoraFin).format('HH:mm:ss');
        horainicio =convertirHoras(temp1);
        horafinal = convertirHoras(temp2);
        const bloque1 =  bloque;
        const piso1 = piso;
        const  lugar1 = lugar;
        const pc1=idequipo;
        const fechainicio = dia;
        const proma = programa;
        const docente = documento;
        const fuente = rol;
        const url = 'https://reservapp.ucm.edu.co/api/1.0/reservarpc/'
        if( proma == null){
            ErrorCampos("Programa");
        }else{
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authorization
                },
                body: JSON.stringify({
                    lugar:lugar1,
                    bloque:bloque1,
                    piso:piso1,
                    idequipo:pc1,
                    proveedor: proveedor,
                    marca:marca,
                    equprovmar:equprovmar,
                    fechainicio:fechainicio,
                    horainicio:horainicio,
                    fechafinal:fechainicio,
                    horafinal:horafinal,
                    programa:proma,
                    docente:docente,
                })
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
                    //console.log('Hubo un problema con la petición Fetch:' + error.message);
                  });  
    
            setAgendaVisible(false);
            setEquiposVisible(false);
            ReiniciarVariables();
        }
    };
  
    // si la sala tiene pc ejecutar reserva de pc si no ejecutar reserva de sala 
    const Reservar=()=>{
        if (viewlistPC === true){
            EnviarReservaSalas();
        }else{
            EnviarReserva();  
        }
    };

    // ################## funciones para las salas que tienen equipos #####################
    const ModJsonResult=(jsonresult)=>{

    };

    const ConvertirJson=(reservado)=>{
        //var iniciales = listpcinicial;
        // si reservado es vacio osea no hay reservas entonces se dejan los equipos completos 
        //console.log('pc cuando llegamos a convertir ',listpc);
        if(reservado.length == 0){
            console.log('se envian todos ');
            console.log('los iniciales computadores',inicialpc);
          setResult(inicialpc);
        }else{
          let data=reservado; // dejamos totales en una variable temporal 
            let key=[];
            let i =0;
            data.forEach(function(element){
                key[i]=element.equlugmov_equipo;
                iniciales.forEach(function(temp, index) {
                    if(temp.equlug_equipo === key[i]){
                        iniciales.splice(index, 1);
                    }
                });
                i++;
            });  
            setResult(iniciales);  ;
        }
          
    };

    const BuscarPCOcupado=()=>{
        setinicialpc(listpc)
        console.log('computadores usestate inicial ',inicialpc)
        
        var reservado=[];
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
        //console.log(selected);
        console.log('buscando pc ocupadp ...')
        const url = 'https://reservapp.ucm.edu.co/api/1.0/pcdisponible/'+dia+'/'+horainicio+'/'+horafinal+'/'+lugar+'/'+bloque+'/'+piso+'/'
        if(!horainicio || !horafinal ){
          if(horainicio == null) ErrorCampos("Hora Inicial");
          if(horafinal == null) ErrorCampos("Hora Final");
        }else{
          fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorization
            }
            })
            .then(response => response.json())
            //.then(json => console.log(json)) 
            .then((json) =>{
                reservado=json;
                console.log('los equipos reservados',reservado)
                ConvertirJson(reservado);
                
            })
            .catch(err => {
                console.log(err);
            }); 
        }
        //setReload(true);
        setEquiposVisible(true);
    };

    const OcultarYReiniciar=()=>{
        //setHoraIni(null);
        //setHoraFin(null);
       // setResult([]);
        //setlistpc([]);
        //listpcinicial=null;
        setEquiposVisible(false);
    }

    // ################## #####################

    return(
        <View  style={styles.container}>

            <Text style={styles.textHeader}>Inicio/Salas de Computo</Text>
            <ScrollView style={styles.scrollview}>
                
                {
                    (totales == 0)?<NoDisponible espacio={'salas'}/>:
                    <>
                        {totales.map((item,index)=>(
                            <ListSalas sala={item.lug_nombre} codigo={item.lug_codigo_siga} piso={item.lug_piso} bloque={item.lug_bloque} lugar={item.lug_id} key={index} contador ={index+1} sillas={item.lug_numero_sillas} setNombresala={setNombresala} setBloque={setBloque} setPiso={setPiso} setLugar={setLugar} setCapacidad={setCapacidad} setCodsiga={setCodsiga} setModalVisible={setModalVisible} authorization={authorization} setViewListPC={setViewListPC} setlistpc={setlistpc}  />
                        ))}
                    </>
                }
                
            </ScrollView>
           <Modal
                transparent={true}
                visible={modalVisible}
                
            >
                <View style={styles.containerModal}>
                    <View style={[styles.Moldal,styles.margenmodal0]}>
                            
                        <View style={styles.header}>
                            <ImageBackground  style={styles.escudo} source={require('../imagen/logo_universidad_light_large.png')} />
                            <Text style={styles.text}>{nombresala} </Text> 
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
                            <Calendario setAgendaVisible={setAgendaVisible} setDia={setDia} setHorasAgenda={setHorasAgenda}  codsiga={codsiga} authorization={authorization} />
                        </View>  
                    </View> 
                </View>     
            </Modal>
            <Modal 
                transparent={true}
                visible={agendaVisible}
            >
                <View style={styles.containerModal}>
                    <View style={[styles.Moldal,styles.margenmodal0]}>
                        
                        <View style={styles.header}>
                            <ImageBackground  style={styles.escudo} source={require('../imagen/logo_universidad_light_large.png')} />
                            <Text style={styles.text}>{nombresala} </Text> 
                            <Text style={styles.subtext}>Capacidad: {capacidad} personas</Text> 
                        </View>
                        <View style={styles.resumen}>
                            <Text style={{fontSize: 0.05*dwidth, fontWeight:'bold', color:'#032A3F', textAlign:'center', fontFamily:'FiraSans-Light',marginBottom:0.01*dwidth, }}>{moment(dia).format('LL')}</Text>
                            <ViewAgenda dia={dia} horarios={horasAgenda} setlleno={setlleno}/> 
                            <ResumenReserva setHoraIni={setHoraIni} setHoraFin={setHoraFin}  auditorio={nombresala}/>
                            <View>
                                <ProgramasYMaterias setprograma={setprograma} authorization={authorization} documento={documento} rol={rol}/> 
                            </View>
                            <View style={styles.cancelar}>
                            
                                <TouchableOpacity style={styles.boton} onPress={()=>Cancelar()}>
                                        <Text style={styles.textboton}>Cancelar</Text>
                                </TouchableOpacity>  
                                {(viewlistPC && !lleno)?
                                    <>
                                        <TouchableOpacity style={styles.boton} onPress={()=>BuscarPCOcupado()}>
                                            <Text style={styles.textboton}>Buscar</Text>
                                        </TouchableOpacity> 
                                    </>:
                                    <>
                                        <TouchableOpacity style={styles.boton} onPress={()=>Reservar()}>
                                            <Text style={styles.textboton}>Guardar</Text>
                                        </TouchableOpacity>
                                    </>
                                }  
                            </View> 
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal 
                transparent={true}
                visible={equiposVisible}
            >
                <View style={styles.containerModal}>
                    <View style={[styles.Moldal,styles.margenmodal0]}>
                        
                        <View style={styles.header}>
                            <ImageBackground  style={styles.escudo} source={require('../imagen/logo_universidad_light_large.png')} />
                            <Text style={styles.text}>{nombresala} </Text> 
                            <Text style={styles.subtext}>Capacidad: {capacidad} personas</Text> 
                            <TouchableOpacity style={styles.cerrar} onPress={()=>OcultarYReiniciar()}>
                                <Icon
                                    name='close-sharp'
                                    type='ionicon'
                                    color='#fff'
                                    size={0.1*dwidth}    
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.resumen}>
                            <Text style={{fontSize: 0.05*dwidth, fontWeight:'bold', color:'#032A3F', textAlign:'center', fontFamily:'FiraSans-Light',marginBottom:0.01*dwidth, }}>{moment(dia).format('LL')}</Text>
                            <ViewEquipos  setIdequipo={setIdequipo}  result={result} setProveedor={setProveedor} setMarca={setMarca} setEquprovmar={setEquprovmar} />
                            <View style={styles.cancelar2}>
                                <TouchableOpacity style={styles.boton2} onPress={()=>Reservar()}>
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
    cancelar2:{
        flexDirection:'column',
        alignItems:'center',
        marginTop:0.05*dwidth,
        marginHorizontal:0.05*dwidth,
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
        marginLeft:0.03*dwidth,
        marginRight:0.03*dwidth,
        padding:0.01*dwidth, 
        flex:1, 
    },
    margenmodal1:{
        marginTop:0.015*dheight,
        marginBottom:0.001*dheight,

    },
    margenmodal0:{
        marginTop:0.04*dheight,
        marginBottom:0.04*dheight,

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

    
    boton:{
        backgroundColor:'#00B5BE',
        width:0.4*dwidth,
        height:0.1*dwidth,
        alignItems:'center',
    },

    boton2:{
        backgroundColor:'#00B5BE',
        width:0.4*dwidth,
        height:0.1*dwidth,
        alignItems:'center',
    },
    textboton:{
        fontSize:0.06*dwidth,
        color:'#ffff',
        fontWeight:'bold',
        fontFamily:'Fira Sans',
        padding:0.003*dwidth,
      },
     

});


