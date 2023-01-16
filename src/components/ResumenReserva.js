
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet,TouchableOpacity, Dimensions} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import 'moment/locale/es';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Icon} from 'react-native-elements';

const dwidth = Dimensions.get('window').width;
const dheight = Dimensions.get('window').height;

export default function ResumenReserva(props){
    const {setHoraIni,setHoraFin, dia, auditorio} = props;

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
        //console.log(moment(date).format('LT'));
        setHinicial(date)
        setHoraIni(date);
        // setHoraIni(hinicial);
        hideDatePickerA();
      };

      const confirmHoraFin = (date) => {
        //console.log(moment(date).format('LT'));
        setHfinal(date);
        setHoraFin(date);
        //setHoraFin(hfinal);
        hideDatePickerB();
      };


    return(
        <>
             <Text style={styles.text}>Resumen de la Reserva</Text>
            <View style={styles.container3}>
                <TouchableOpacity style={styles.touchable} onPress={showDatePickerA}>
                    <Icon
                        name='alarm-outline'
                        type='ionicon'
                        color='#00B5BE'
                        size={0.08*dwidth}    
                    />
                    {hinicial? <Text style={styles.fecha}>{moment(hinicial).format('LT')}</Text>:<Text style={styles.fecha} >Hora Inicial</Text>}
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchable} onPress={showDatePickerB}>
                    <Icon
                            name='alarm-outline'
                            type='ionicon'
                            color='#00B5BE'
                            size={0.08*dwidth}    
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
        
        
        
        </>





    );

}

const styles = StyleSheet.create({
    touchable:{
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'baseline',

    },
    fecha:{
        textAlign:'left',
        color:'#032A3F',
        fontFamily:'FiraSans-Light',
        fontSize: 0.04*dwidth,
        fontWeight:'bold',
        marginLeft:0.01*dwidth,
       
        
       

    },
    text:{
        fontSize: 0.05*dwidth,
        fontWeight:'bold',
        color:'#032A3F',
        fontFamily:'FiraSans-Light',
        marginLeft:0.2*dwidth,
        marginTop:-0.04*dwidth,
        marginBottom:0.02*dwidth,
        

    },
   
    container3: {
        width:dwidth,
        marginTop:-0.03*dwidth,
        marginLeft:0.04*dwidth,
        marginRight:0.04*dwidth,
        alignItems:'baseline',
       
      },
    
      picker:{
        flexDirection:'row', 
        alignContent:'space-between',

      }

});

