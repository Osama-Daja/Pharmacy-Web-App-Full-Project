import React from "react";
import { View,Text,TouchableOpacity,Image ,StyleSheet
,TextInput,ToastAndroid} from "react-native";
import * as Animatable from 'react-native-animatable';
import APIRoutes from "../../../API/APIRoutes";
import {Put,Get} from "../../../API/APICalls";
import AuthenticateContext from "../../../Context/AuthenticateContext";
import { useTheme } from "@react-navigation/native";

const ConfirmCode = ({CheckPassword,SetConfirmCodePage}) =>{

  console.log('[ConfirmCode] Rerender');
  
    var [Code,SetCode] = React.useState('');

    const {colors} = useTheme();

    return (
        <View>
        <View style={{ alignItems: 'center'}}>
          <View style={style.header}>
            <TouchableOpacity onPress = 
            {()=>{SetConfirmCodePage(false)}}>
            <Image
                source={require('../../../src/assets/Dialog/cancel.png')}
                style={{height: 30, width: 30}}
              />
            </TouchableOpacity>
          </View>
        </View>
            <TextInput 
                placeholder = 'Code'
                style ={{borderWidth:1,borderRadius:10,borderColor:'#000'}}
                onChangeText = {(val)=>{SetCode(val)}}
            />

{
    Code != '' ?
                 <TouchableOpacity style={[style.SubmitActive,{backgroundColor:colors.MainColor}]}
            onPress={ async()=>{ CheckPassword(Code);}}>
                <Text style={{fontSize:20,fontWeight:'bold'}}>Submit</Text>
            </TouchableOpacity>
     :
                 <TouchableOpacity style={style.SubmitInactive}
            onPress={()=>{}}>
                <Text style={{fontSize:20,fontWeight:'bold'}}>Submit</Text>
            </TouchableOpacity>
}

        </View>
    )
}


export default ConfirmCode;

const style = StyleSheet.create({
      header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  SubmitActive : {justifyContent:'center',
            alignItems:'center',margin:20,
            height:70,borderRadius:70,
            borderWidth:1,borderColor:'#000'},
    SubmitInactive : {justifyContent:'center',
    alignItems:'center',margin:20,
    height:70,borderRadius:70,
    borderWidth:1,borderColor:'#f13140'}
}
)

