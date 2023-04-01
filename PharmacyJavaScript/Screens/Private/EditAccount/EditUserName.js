import React from "react";
import { View,Text,TouchableOpacity,Image ,StyleSheet
,TextInput,ToastAndroid} from "react-native";
import * as Animatable from 'react-native-animatable';
import APIRoutes from "../../../API/APIRoutes";
import {Put,Get} from "../../../API/APICalls";
import AuthenticateContext from "../../../Context/AuthenticateContext";
import { useTheme } from "@react-navigation/native";

const EditUserName = ({setEditUserNameVisible}) =>{

    console.log('[EditUserName] Rerender');

    var [NewUserName,SetNewUserName] = React.useState('');

    const Context = React.useContext(AuthenticateContext);
    const {colors} = useTheme();

    const Submit = async () =>{
        var Result = await Put(APIRoutes['UpdateUserNameUser']
        ,{UserName : NewUserName});
        if(Result.status == 200){
            ToastAndroid.show("Success", 
            ToastAndroid.SHORT,ToastAndroid.CENTER);
            var Result = await Get(APIRoutes['GetMyAccountData']);
            Context.SetUserData(Result.data);
        }else{
            ToastAndroid.show("Error", 
            ToastAndroid.SHORT,ToastAndroid.CENTER);
        }
    };

    return (
        <View>
        <View style={{ alignItems: 'center'}}>
          <View style={style.header}>
            <TouchableOpacity onPress = 
            {()=>{setEditUserNameVisible(false)}}>
            <Image
                source={require('../../../src/assets/Dialog/cancel.png')}
                style={{height: 30, width: 30}}
              />
            </TouchableOpacity>
          </View>
        </View>
            <TextInput 
                placeholder = 'New UserName'
                style ={{borderWidth:1,borderRadius:10,borderColor:'#000'}}
                onChangeText = {(val)=>{SetNewUserName(val)}}
            />
                            { NewUserName.length >= 4 ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={style.errorMsg}>Username must be 4 characters long.</Text>
            </Animatable.View>
            }
            {
                NewUserName.length < 4 ? 
            <TouchableOpacity style={style.SubmitInactive}
            >
                <Text style={{fontSize:20,fontWeight:'bold'}}>Submit</Text>
            </TouchableOpacity>
                :
            <TouchableOpacity style={[style.SubmitActive,{backgroundColor:colors.MainColor}]}
            onPress={()=>{Submit();}}>
                <Text style={{fontSize:20,fontWeight:'bold'}}>Submit</Text>
            </TouchableOpacity>
            }

        </View>
    )
}


export default EditUserName;

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
    ,        errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
})

