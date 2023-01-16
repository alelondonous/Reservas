import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet,ScrollView, Modal,TouchableOpacity,ImageBackground,Alert,Dimensions} from 'react-native';
import _ from 'lodash';
import {Icon} from 'react-native-elements';
import Footer from '../components/Footer';
import ListHistorial from '../components/ListHistorial';
import ListHistorialPC from '../components/ListHistorialPc';
import HistoReserva from '../components/HistoReserva';
import HistoReservaPC from '../components/HistoReservaPC';
import NoDisponible from '../components/NoDisponible';

// se toman las dimensiones de la pantalla en donde se instalara la app para que las vistas sean proporcionales a las medidas
const dwidth = Dimensions.get('window').width;
const dheight = Dimensions.get('window').height;
const imagewidth = 0.7*dwidth;
const imageHeight = Math.round(imagewidth * (61/228));

export default function HistorialReservas(props){
    // definicion de variables 
    const {token,documento,rol}=props;
    const authorization = "Token" + " " + token;
    const [totales, setTotales] = useState([]);
    const [bloque, setBloque] = useState(null);
    const [piso, setPiso] = useState(null);
    const [lugar, setLugar] = useState(null);
    const [idreserva, setIdreserva] = useState(null);
    const [nombrelugar, setNombrelugar] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [HoraIni, setHoraIni] = useState(null);
    const [HoraFin, setHoraFin] = useState(null);
    const [fecha, setfecha] = useState(null);
    const [programa, setprograma] = useState(null);
    const [nombrePrograma, setnombrePrograma] = useState(null);
    const [reloadData, setReloadData] = useState(false);
    const [pacademico,setPacademico] = useState([]);
    const [realoadPrograma, setrealoadPrograma] = useState(false);
    // se añade para los usuarios que reservan pc en las salsas de computo 
    const [totalespc, setTotalespc] = useState([]);
    const [nompc, setNompc] = useState(null);
    const [seleccionopc, setSeleccionopc] = useState(false);
    const [cabecera, setCabecera]=useState(null);
    console.log(programa);
    
// traer  programas academicos
    useEffect(()=>{
        setPacademico([]);
        const url = 'https://reservapp.ucm.edu.co/api/1.0/programa/'+documento+'/'+rol+'/'
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorization
            }
            })
            .then(response => response.json())
            //.then(json => console.log(json)) 
            .then(json =>setPacademico(json))
            .catch(err => {
                console.log(err);
            }); 
        TraerNombrePrograma();  
        setrealoadPrograma(false);
    },[realoadPrograma]);


    // traer el nombre dl programa seleccionado 
const TraerNombrePrograma=()=>{
    
    pacademico.map((item)=>{
        if(item.upf_programa == programa){
            setnombrePrograma(item.pro_nombre);
           // console.log(item.pra_nombre);
        }else{
            setnombrePrograma(programa);
        }
    })
                
};
// consultar el historial de reservas de usuario
    useEffect(()=>{
        setTotales([]);
        const url = 'https://reservapp.ucm.edu.co/api/1.0/listreserva_usuario/'+documento+'/'+rol+'/';
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
                console.log(err);
            }); 
        setReloadData(false);
    },[reloadData]);

    //consultar historial de reservas pc por usuario 

    useEffect(()=>{
        setTotalespc([]);
        var usuario = documento;
        const url = 'https://reservapp.ucm.edu.co/api/1.0/reservapcusuario/'+usuario+'/';
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorization
            }
            })
            .then(response => response.json())
            //.then(json => console.log(json)) 
            .then(json =>setTotalespc(json))
            .catch(err => {
                console.log(err);
            }); 
        setReloadData(false);
    },[reloadData]);


 
    

    return(
        <View style={styles.container}>
            <Text style={styles.textHeader}>Inicio/Historial de Reservas</Text>
            <ScrollView style={styles.scrollview}>
                {(totales == 0 && totalespc == 0)?<NoDisponible espacio={'Reservas'}/>:
                    <>
                        {totales.map((item,index)=>(
                            <ListHistorial  idreserva={item.lugres_id} nombreespacio={item.lug_nombre}   piso={item.lugres_piso} bloque={item.lugres_bloque} lugar={item.lugres_lugar}  horaini={item.lugres_hora_inicio} horafin={item.lugres_hora_final} fecha={item.lugres_fecha_inicio} key={index} programa={item.lugres_programa} setIdreserva ={setIdreserva} setNombrelugar={setNombrelugar} setBloque={setBloque} setPiso={setPiso} setLugar={setLugar} setHoraIni={setHoraIni} setHoraFin={setHoraFin} setfecha={setfecha} setprograma={setprograma} setModalVisible={setModalVisible} setrealoadPrograma={setrealoadPrograma} setSeleccionopc={setSeleccionopc}  />
                        ))}

                        {totalespc.length != 0 && totalespc.map((item,index)=>(
                            <ListHistorialPC   nombreespacio={item.lug_nombre}  nomequipo={item.equ_nombre} horaini={item.equlugmov_hora_inicio} horafin={item.equlugmov_hora_final} fecha={item.equlugmov_fecha_inicio} key={index} programa={item.cabmov_programa_ucm}  cabemov={item.equlugmov_cabecera} setNombrelugar={setNombrelugar}  setNompc={setNompc}  setHoraIni={setHoraIni} setHoraFin={setHoraFin} setfecha={setfecha} setprograma={setprograma} setModalVisible={setModalVisible} setrealoadPrograma={setrealoadPrograma} setSeleccionopc={setSeleccionopc} setCabecera={setCabecera}/>
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
                            <Text style={styles.text}>{nombrelugar} </Text> 
                            <TouchableOpacity style={styles.cerrar} onPress={()=>setModalVisible(false)}>
                                <Icon
                                    name='close-sharp'
                                    type='ionicon'
                                    color='#fff'
                                    size={30}    
                                />
                            </TouchableOpacity>
                        </View>
                        { (totalespc.length != 0 && seleccionopc) ? <HistoReservaPC nombrelugar={nombrelugar} cabecera={cabecera} nompc={nompc} fecha={fecha} HoraIni ={HoraIni} HoraFin={HoraFin} nombrePrograma={nombrePrograma} setReloadData={setReloadData} documento={documento}  authorization={authorization} setModalVisible={setModalVisible}/>: 
                            <HistoReserva nombrelugar={nombrelugar} fecha={fecha} HoraIni ={HoraIni} HoraFin={HoraFin} nombrePrograma={nombrePrograma} setReloadData={setReloadData} documento={documento} rol={rol} authorization={authorization} bloque={bloque} piso={piso} lugar={lugar} programa={programa} idreserva={idreserva} setModalVisible={setModalVisible}/>}
                       
                        
                         
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
        marginTop:0.01*dheight,
    },
    cerrar:{
        marginLeft:0.8*dwidth,
        marginTop:-0.32*dwidth,
        flex:1,
    },

     text:{
        marginTop:0.04*dwidth,
        fontFamily:'FiraSans-Light',
        color:"#FFFF",
        fontWeight:'bold',
        fontSize:0.055*dwidth,
     },
    containerModal:{
        backgroundColor:'#000000aa', 
        flex:1,
    },
    Moldal:{
        backgroundColor:'#FFFf', 
        marginTop:0.08*dwidth,
        marginBottom:0.06*dheight,
        marginLeft:0.03*dwidth,
        marginRight:0.03*dwidth,
        padding:0.01*dwidth, 
        flex:1, 
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

});


