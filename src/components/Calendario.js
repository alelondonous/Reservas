import _ from 'lodash';
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Alert, Dimensions} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import moment from 'moment';
//import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import 'moment/locale/es';

const dwidth = Dimensions.get('window').width;
const dheight = Dimensions.get('window').height;

export default function Calendario(props){
  var buscarDias = [];
  const [disabledays, setDisabledays] = useState(null);
  const {setAgendaVisible,setDia,setHorasAgenda, setTieneReserva,codsiga,authorization} = props
  var año =moment().format('YYYY');
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
    
    useEffect(() => {
      const mesini=moment().format('MM');
      const diasini = new Date(año, mesini, 0).getDate();
      const actual =moment().format('DD');
      console.log(actual);
      gethoras(año,mesini,actual);

     }, []);
 
    
    const onDayPress = day => {
        setSelected(day.dateString);
        setDia(day.dateString);
        console.log(day.dateString);
        setAgendaVisible(true);
      
    };

    const onMonthChange = month=>{
      var mes=month.month;
      var diasMes = new Date(año, mes, 0).getDate();
      gethoras(año,mes,diasMes);

      //console.log('dias mes = ',diasMes);
     // console.log('dato mes completo',month.dateString);
      //console.log('dato mes',month.month);

    };
    const getDisabledDates = (startDate) => {
     // console.log( 'disabledais en calendario',startDate);
      const disabledDates = {};
      if(startDate != null){
          disabledDates[moment(startDate).format('YYYY-MM-DD')] = {disabled:true,disableTouchEvent: true, selected:false},
          console.log('');
        return disabledDates;
       }else{
        return '0000-00-00';
      }
     // console.log(startDate);
      
    };
    
    const MensajeError=(error)=>{
      Alert.alert(
        "Generar Reserva",
        {error},
        [{text:'OK',style:'ok',}]
        )

    };
  
    // funciones para obtener los horarios de reservas
    const gethoras = (año, mes,diasMes)=>{
      const inicial = año+'-'+mes+'-'+diasMes;
      const final = año+'-'+mes+'-'+diasMes; 
      const url = 'https://reservapp.ucm.edu.co/api/1.0/consultar_horarios/'+codsiga+'/'+inicial+'/';   
      //console.log(url);
      //console.log(url);

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
              buscarDias = json;
              setHorasAgenda(buscarDias);
              obtenerDatos(buscarDias);
          })
          .catch(err => {
            MensajeError(err);
          }); 

      //console.log(buscarDias);

  };

  const convertirhoras=(stringhoras)=>{
        
    let tiempo = stringhoras + '';
    tiempo = tiempo.split(':');
    let horas = parseInt(tiempo[0]);
    let minutos=parseInt(tiempo[1]);
    if(minutos === 30){
        let resp = horas+','+'5';
        resp = parseInt(resp);
        //stringhoras = parseFloat(stringhoras);
        return resp;
        
    }else{
    let resp = horas+','+minutos;
        //stringhoras = parseFloat(stringhoras);
        resp = parseInt(resp);
        return resp;

    }
  };


  const obtenerDatos =(buscarDias)=>{
    let disable = null;
    setDisabledays(null);
    //console.log('lo que llega a buscar datos ',buscarDias);
    let objfecha = buscarDias;
    {objfecha.map((item)=>(
        item.lugres_hora_inicio= convertirhoras(item.lugres_hora_inicio),
        item.lugres_hora_final = convertirhoras(item.lugres_hora_final)
    ))}
    const result = _.chain(objfecha)
        .groupBy('lugres_fecha_inicio')
        .map((lugres_fecha_inicio, key) => ({
            lugres_fecha_inicio:key,
            total: _.sumBy(lugres_fecha_inicio, 'lugres_hora_final') - _.sumBy(lugres_fecha_inicio, 'lugres_hora_inicio') 
        
        }))
        .value();
    //console.log(result);
    result.forEach(x => {
        if (x.total >=14) {
            disable= x.lugres_fecha_inicio; 
            console.log('disabledays= x.lugres_fecha_inicio',disable);  
            setDisabledays(disable);  
        }
    });
    };

  return (
    <View style ={styles.contenedor}>
        <Calendar
            
            current={INITIAL_DATE}
            style = { { 
              //marginBottom:0.01*dheight,
              //height:0.7*dheight,
            } } 
            onDayPress={onDayPress}
            onMonthChange={onMonthChange}
            markedDates={{
              [selected]: {
                selected: true,
                //disableTouchEvent: true,
                selectedColor: '#00B5BE',
                selectedTextColor: '#ffff'
              },
              ...getDisabledDates(disabledays),
              //'2021-07-18': {disabled:true,disableTouchEvent: true, selected:false},
             
            }}
            theme={{
              todayTextColor: '#00B5BE',
              textDayHeaderFontSize: 0.04*dwidth,
              textSectionTitleColor: '#F1573D',
              monthTextColor: '#032A3F',
              textMonthFontWeight: 'bold',
              textMonthFontSize: 0.06*dwidth,
              
            }} 
        />
        
    </View>
        
     
        
        
    
    
  );


}

const styles = StyleSheet.create({
  contenedor:{
    marginTop:0.01*dheight,
    backgroundColor:'#ffff',
    height:0.6*dheight,
    width:0.9*dwidth,
  },
 
});