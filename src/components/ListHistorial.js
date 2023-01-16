import React ,{} from 'react';
import {StyleSheet, View,  Text, TouchableOpacity, Dimensions} from 'react-native';
import {Icon} from 'react-native-elements';
import moment from 'moment';
import 'moment/locale/es';


const dwidth = Dimensions.get('window').width;
const dheight = Dimensions.get('window').height;

export default function ListHistorial(props){

    const {idreserva, nombreespacio, piso, bloque, lugar,  horaini, horafin, fecha, programa, setIdreserva, setNombrelugar, setBloque, setPiso, setLugar, setHoraIni, setHoraFin, setfecha,setprograma, setModalVisible,setrealoadPrograma,setSeleccionopc} = props;
   
    require('moment/locale/es');
    //const num =contador;
    moment.updateLocale('es', {
        months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
        monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
        weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
        weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
      })

// traer los programas academicos 

    


    const EnviarEstados=()=>{
        setIdreserva(idreserva);
        setNombrelugar(nombreespacio);
        setBloque(bloque);
        setPiso(piso); 
        setLugar(lugar);
        setHoraIni(horaini);
        setHoraFin(horafin);
        setfecha(fecha);
        setprograma(programa);
        setrealoadPrograma(true);
        setSeleccionopc(false);
        setModalVisible(true);
       
    };
    

    return(
       
            
            <TouchableOpacity  keyboardShouldPersistTaps = "always" style={[ styles.lista, styles.otro]} onPress={()=>EnviarEstados() }>
                <View style={styles.viewtext}>
                    <Text style={[styles.text,styles.text1]}>{moment(fecha).format('LL')}</Text>
                    <Text style={[styles.text,styles.text1]}>{nombreespacio}</Text>
                </View>
                <View style={styles.icono}>
                    <Icon
                        name='chevron-forward'
                        type='ionicon'
                        color='#ffff'
                        size={0.1*dwidth}    
                    />

                </View>
                
            </TouchableOpacity>
    
      
    );
}



const styles = StyleSheet.create({
    viewtext:{
        flexDirection:'column',

    },
   
    lista:{
        height:0.2*dwidth,
        paddingHorizontal:0.04*dwidth,
        marginTop:0.03*dheight,
        marginLeft:0.07*dwidth,
        marginRight:0.1*dwidth,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',   

    },
    otro:{
        backgroundColor:'#00B5BE',
        
    },
   
    text:{
        fontSize:0.044*dwidth,
        fontWeight:'bold',
        fontFamily:'Fira Sans',
        paddingRight:0.2*dwidth,
    },
    text1:{
        color:'#ffff',

    },

    icono:{
        width:0.1*dwidth,
        height:0.12*dwidth,
        position:'absolute',
        marginLeft:0.65*dwidth,

    }
    
});
  
  
  
  

  
  