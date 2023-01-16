import React,{useState,useEffect,useRef, useContext} from 'react';
import {StyleSheet, View,  Text, TouchableOpacity, Dimensions} from 'react-native';
import {Icon} from 'react-native-elements';
import _ from 'lodash';
import { ContextComputer } from './ContextComputer';

const dwidth = Dimensions.get('window').width;
const dheight = Dimensions.get('window').height;

export default function ListSalas(props){
    var pc = [];
    const {sala, codigo, piso, bloque, lugar, contador, sillas, setNombresala, setBloque, setPiso, setLugar,  setCapacidad,  setCodsiga, setModalVisible,authorization, setViewListPC,setlistpc}=props;
    const num =contador;
    //const desdelistpc = useRef(null);
    //const {compu,setCompu}=useContext(ContextComputer);
      //const [computador, setComputador] = useState([]);

    
  
    const EnviarEstados=()=>{
        ObtenerPC();
        //setDesdelistpc(desdelistpc.current);
        //setDesdelistpc(compu);
       // console.log(bloque, piso, lugar);
        //setCompu(computador);
        setNombresala(sala);
        setBloque(bloque);
        setPiso(piso); 
        setLugar(lugar) 
        setCapacidad(sillas);
        setCodsiga(codigo);
        
        //console.log("desde listsalas",listcompu);
        
        setModalVisible(true);
     };
     
        const ObtenerPC=()=>{
            //console.log('obteniendo pcs ....');
            const url = 'https://reservapp.ucm.edu.co/api/1.0/pcxsala/'+lugar+'/'+bloque+'/'+piso+'/'
            console.log('buscando pc ...', url);
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
                    //setComputador(json);
                    setlistpc(json);
                    //setListcompu(json);
                    //setListcompu(json);
                    // desdelistpc.current= json;
                    
                    //setDesdelistpc(json);
                    //setlistpc(json);
                    pc=json;
                    if(pc.length !=0){
                        //setlistpc(pc);
                        //setListcompu(pc);
                        //setDesdelistpc(desdelistpc.current);
                        //setDesdelistpc(compu);
                        //setComputador(pc);
                        //setlistpc(pc);
                        //setDesdelistpc(desdelistpc.current);
                        setViewListPC(true);
                        
                    }else{
                        setViewListPC(false);
                        //console.log('falso');
                    }    
                })
                .catch(err => {
                    console.log(err);
                }); 
               // setDesdelistpc(compu);

        };
     
         return(
             <TouchableOpacity style={[ styles.lista, (num%2)?styles.otro:styles.otro2]} onPress={()=>EnviarEstados() }>
                 <Text style={[styles.text,(num%2)?styles.text1:styles.text2 ]}>{sala} </Text>
                 <View>
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
        fontSize:0.042*dwidth,
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