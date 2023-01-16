import _ from 'lodash';
import React, {useState, useEffect} from 'react';
import {StyleSheet, View,Text, TouchableOpacity,Alert, Dimensions} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import moment from 'moment';
import 'moment/locale/es';
import {Icon} from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';

const dwidth = Dimensions.get('window').width;
const dheight = Dimensions.get('window').height;

export default function CalendarioVSalas(props){
  
    const {setAgendaVisible,setDia, setHoraIni, setHoraFin, listpc, bloque, piso,lugar, authorization,setResult} = props
    var horainicio =null;
    var horafinal = null;
    var result=listpc;
    //console.log('en calendario',disabledays);
    require('moment/locale/es');
    moment.updateLocale('es', {
      months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
      monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
      weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
      weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
    })
    
  
    LocaleConfig.locales['es']={
      monthNames: ['Enero','Febrero','Marzo','Abríl','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
      monthNamesShort: ['Ene.','Feb.','Mar','Abr','May','Jun','Jul.','Agost','Sept.','Oct.','Nov.','Dic.'],
      dayNames: ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','sabado'],
      dayNamesShort: ['Dom.','Lun.','Mar.','Mie.','Jue.','Vie.','Sab.'],
      today: 'Aujourd\'hui'
    };
    LocaleConfig.defaultLocale='es';
  
      const INITIAL_DATE = moment().format('YYYY-MM-DD');
      const [selected, setSelected] = useState(INITIAL_DATE);
      const [PickerA, setPickerA] = useState(false);
      const [PickerB, setPickerB] = useState(false);
      const [hinicial, setHinicial] = useState(null);
      const [hfinal, setHfinal] = useState(null);
  
  
      const showDatePickerA = () => {
          setPickerA(true);
        };
      
        const hideDatePickerA = () => {
          setPickerA(false);
        };
        const showDatePickerB = () => {
          setPickerB(true);
        };
      
        const hideDatePickerB = () => {
          setPickerB(false);
        };
      
        const confirmHoraIni = (date) => {
          setHinicial(date);
          setHoraIni(date);
          hideDatePickerA();
        };
  
        const confirmHoraFin = (date) => {
          setHfinal(date);
          setHoraFin(date);
          hideDatePickerB();
        };
  
   
      
      const onDayPress = day => {
          setSelected(day.dateString);
          setDia(day.dateString);
          //BuscarPCOcupado();
          console.log(day.dateString);
      };
  
      const Buscar=()=>{
        BuscarPCOcupado();
      };
      
      const ErrorCampos=(error)=>{
        const algo = error;
        Alert.alert(
          "Generar Reserva",
          "ERROR: Debe ingresar el campo "+ algo + " para realizar la busqueda",
          [{text:'OK',style:'ok',}]
          )
      };

      //// funciones para obetener los pc y enviarlos al view equipos 
      const BuscarPCOcupado=()=>{
          var totales=[];
          if(hinicial != null){
            let temp1 = moment(hinicial).format('HH:mm:ss');
            horainicio =convertirHoras(temp1);
          }else{
            horainicio = null;
          }

          if(hfinal != null){
              let temp2 = moment(hfinal).format('HH:mm:ss');
              horafinal = convertirHoras(temp2);

          }else{
              horafinal =null;
          }
          console.log(selected);
          console.log('buscando pc ocupadp ...')
          const url = 'https://reservapp.ucm.edu.co/api/1.0/pcdisponible/'+selected+'/'+horainicio+'/'+horafinal+'/'+lugar+'/'+bloque+'/'+piso+'/'
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
                  totales=json;
                  ConvertirJson(totales);
              })
              .catch(err => {
                  console.log(err);
              }); 
              setAgendaVisible(true);
          }
        };


      const EliminardeJson=(key)=>{
        result.forEach(function(temp, index) {
            if(temp.equlug_equipo === key){
              result.splice(index, 1);
            }
        });
        setResult(result);
      //console.log('resultado1', result);
      //console.log('asi debe quedar',temporal);
        
    };
      
    const ConvertirJson=(totales)=>{
      // si totales es vacio osea no hay reservas entonces se dejan los equipos completos 
      if(totales.length ==0){
        setResult(listpc);
      }else{
        let data=totales; // dejamos totales en una variable temporal 
          let key=[];
          let i =0;
          data.forEach(function(element){
            key[i]=element.equlugmov_equipo;
            //console.log('elemento',key[i]);
            EliminardeJson(key[i]);
            i++;
          });  

      }
        
    };



      const convertirHoras=(temp)=>{
          let tiempo = temp + '';
          tiempo = tiempo.split(':');
          //let horas = parseInt(tiempo[0]);
          //let minutos=parseInt(tiempo[1]);
          let horas = tiempo[0];
          let minutos=tiempo[1];
          //let segundos = '00';
          let dato = horas+':'+minutos;
          return dato;
      };
    //////////////////////////////////////////////////
  
    return (
      <View style ={styles.contenedor}>
        <View style={styles.horas}>
          <TouchableOpacity style={styles.touchable} onPress={()=>showDatePickerA()}>
              <Icon
                name='alarm-outline'
                type='ionicon'
                color='#00B5BE'
                size={0.1*dwidth}    
              />
              {hinicial? <Text style={styles.fecha}>{moment(hinicial).format('LT')}</Text>:<Text style={styles.fecha} >Hora Inicial</Text>}
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchable} onPress={()=>showDatePickerB()}>
                <Icon
                  name='alarm-outline'
                  type='ionicon'
                  color='#00B5BE'
                  size={0.1*dwidth}    
                />
                
                {hfinal? <Text style={styles.fecha}>{moment(hfinal).format('LT')}</Text>:<Text style={styles.fecha} >Hora Final</Text>}
          </TouchableOpacity>
            <DateTimePicker
                    isVisible={PickerA}
                    mode="time"
                    onConfirm={confirmHoraIni}
                    onCancel={hideDatePickerA}
                />
            <DateTimePicker
                isVisible={PickerB}
                mode="time"
                onConfirm={confirmHoraFin}
                onCancel={hideDatePickerB}
            />
        </View>
        <View style = {styles.calendar}>
          <Calendar
                
                current={INITIAL_DATE}
                style={{
                 
                
                }}
                onDayPress={onDayPress}
                //onMonthChange={onMonthChange}
                markedDates={{
                  [selected]: {
                    selected: true,
                    //disableTouchEvent: true,
                    selectedColor: '#F1573D',
                    selectedTextColor: '#ffff'
                  },
                  
                  //'2021-07-18': {disabled:true,disableTouchEvent: true, selected:false},
                
                }}
                theme={{
                  todayTextColor: '#F1573D',
                  textDayHeaderFontSize: 16,
                  textSectionTitleColor: '#F1573D',
                  monthTextColor: '#032A3F',
                  textMonthFontWeight: 'bold',
                  textMonthFontSize: 18,
                  textDayFontSize: 16,
                  
                }} 
            />
        </View>
        
          <TouchableOpacity style={styles.boton} onPress={()=>Buscar()}>
            <Text style={styles.textboton}>Buscar </Text>
          </TouchableOpacity>  

      </View>
          
       
          
          
      
      
    );
  
  
  }
  
  const styles = StyleSheet.create({
    touchable:{
      alignItems:'center',
      height:0.09*dheight,
      width:0.3*dwidth,
      marginTop:0.01*dwidth,
      marginBottom:0.01*dwidth,
      
  },
    contenedor:{
      height:0.7*dheight,
      width:0.9*dwidth,
      backgroundColor:'#ffff',
      
    },
    fecha:{
      fontFamily:'FiraSans-Light',
      fontSize:0.045*dwidth,
      textAlign:'center',
      
    },
    boton:{
      backgroundColor:'#F1573D',
      width:0.5*dwidth,
      height:0.1*dwidth,
      alignItems:'center',
      marginLeft:0.2*dwidth,
      marginTop:0.09*dwidth,
      
      
  },
  textboton:{
      fontSize:0.06*dwidth,
      color:'#ffff',
      fontWeight:'bold',
      fontFamily:'FiraSans-Light',
      padding:0.003*dwidth,
    },
    horas:{
      justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center', 
        marginLeft:0.15*dwidth,
        marginRight:0.15*dwidth,
        marginTop:-0.02*dheight,
        
        
    },
    
    calendar:{
      width:0.9*dwidth,
      height:0.5*dheight,
    },
    
  });