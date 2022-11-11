import * as React from 'react';
import {useState,useEffect} from 'react';
import {useIsFocused } from '@react-navigation/native';
import { StyleSheet, View, Button,ImageBackground } from 'react-native';
import MassWord from './massWord';

import { useSelector, useDispatch } from 'react-redux';
import { nameGame,numberLevelChangePlus,numberLevelChangeMinus } from '../../../../../../../../../../redux/counterSlice';

import AlertTextMission from '../../../../alertFail/alertTextMission/alertTextMission';
import TimerStart from '../../../../timerStart';
import Timer from '../../../../timer';

let massElementColor= ["red","blue","yellow","green","grey","black","white","brown"];
let massNull=[];
let massElementNew=[]; 
  

export default  function WordMission({navigation}) {
  
  const isFocused = useIsFocused();
  const [level, setLevel] = useState(3);
  const [elementState, setElementState] = useState();
  const [massColor, setMassColor] = useState();
  const numberLevel = useSelector(state => state.counter.numberLevel);

  const numberInMass = [0,1,2,3,4,5,6,7,8,9,10];

console.log(Math.floor(Math.random().toString()*numberInMass.length))
  useEffect(()=>{
   
    if(isFocused === true){
      setLevel(3);
      massNull=[];
      massElementNew=[];
      
    setMassColor(()=>{
      for (let it=0; it <= 35; it++) {
        
        if(it <= 30-numberLevel){
          massNull.push(
            <View key={Math.random(massElementColor.toString().length*1)}
              style={[styles.elem]}>
            </View> 
          )
        }
        if(it > 30-numberLevel){
          massNull.push(
            <View key={Math.random(massElementColor.toString().length*1)}style={styles.elem}> 
                <MassWord key={Math.random(massElementColor.toString().length*1)}
              style={massElementColor[Math.floor(Math.random().toString()*massElementColor.length)]}/> 
            </View> 
          );
        }
      }
      return massNull.sort(() => Math.random() - 0.4); 
    })
      setTimeout(()=>{setElementState("start")},5000)
      //setTimeout(()=>{navigation.navigate('BallsDecision')},21000)
    }
    else{
      setElementState("stop");
    }
    
  },[isFocused])
  
  useEffect(()=>{
    massElementNew=[];
    if(isFocused === false){
      
        massNull.forEach(element => {
          
      if(element.props.children){
        
        massElementNew.push(element.props.children.props.style) 
        
      }
    });
    
    setLevel(2)
  }
  },[isFocused])
 
  
    return (
      <ImageBackground source={require('../../../../../../../../../../assets/img/wordFoon.png')} resizeMode="cover" style={styles.containerImg}> 
        <Timer startTimer={elementState} level2={level} massElement={massElementNew} />
        
        
          <View  style={styles.MainPageMain}>
            {massColor}
         
         
          <Button title="назад" onPress={() => navigation.navigate('BallsDecision')}></Button>
          </View>
          <AlertTextMission hiden={"8"} text={'1'}/>
          <TimerStart />
      </ImageBackground>
    );
  }
  
  const styles = StyleSheet.create({
    containerImg:{
      width: '100%',
      height: '100%',
      display: "flex",
      backgroundColor: '#d058c4',
    },
    container: {    
      width: "25%",
      height: "30%",
      backgroundColor: 'transparent',
   
    },
    MainPageMain:{
      flexWrap: 'wrap',
      flexDirection: 'row',
      width: '100%',
      height: '100%',
      backgroundColor: 'transparent', 
    },
    elem:{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      margin: 10,
      width: 100,
      height: 60,
      borderRadius: 50,
      
    },
    elemItems:{
      width: 40,
      height: 40,
      borderRadius: 50,
      margin: 10,
    }
  });