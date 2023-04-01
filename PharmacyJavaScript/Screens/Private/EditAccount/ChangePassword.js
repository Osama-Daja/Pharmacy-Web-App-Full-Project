import React from "react";
import { View,Text,TouchableOpacity,Image ,StyleSheet
,TextInput,ToastAndroid} from "react-native";
import * as Animatable from 'react-native-animatable';
import APIRoutes from "../../../API/APIRoutes";
import {Put,Get} from "../../../API/APICalls";
import AuthenticateContext from "../../../Context/AuthenticateContext";
import MainDialog from "../../Dialog/MainDialog";
import ConfirmCode from "./ConfirmCode";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from "@react-navigation/native";

const ChangePassword = ({setEditPasswordVisible}) =>{

    console.log('[ChangePassword] Rerender');

    var [NewPassword,SetNewPassword] = React.useState('');
    var [ShowNewPassword,SetShowNewPassword] = React.useState(true);
    var [ConfirmPassword,SetConfirmPassword] = React.useState('');
    var [ShowConfirmPassword,SetShowConfirmPassword] = React.useState(true);

    var [ConfirmCodePage,SetConfirmCodePage] = React.useState(false);
    var [Code,SetCode] = React.useState('');
    
    const {colors} = useTheme();

    const Submit = async () =>{
                    ToastAndroid.show("Please Wait", 
            ToastAndroid.SHORT,ToastAndroid.CENTER);
        var Result = await Get(APIRoutes['GetConfirmCodePassword']);
        console.log(Result);
        if(Result.status == 200){
            ToastAndroid.show("Check Your Email Please.", 
            ToastAndroid.SHORT,ToastAndroid.CENTER);
            SetCode(Result.data)
            SetConfirmCodePage(true);
        }else{
            ToastAndroid.show("Error", 
            ToastAndroid.SHORT,ToastAndroid.CENTER);
        }
    };

    var CheckPassword = async (MyCode) =>{
        if(MyCode == Code){
             var Result = await Put(APIRoutes['UpdatePasswordUser'],{Password : NewPassword});
            console.log(Result);
             if(Result.status == 200){
                ToastAndroid.show("Success", 
                ToastAndroid.SHORT,ToastAndroid.CENTER);
                SetConfirmCodePage(false);
                setEditPasswordVisible(false);
            }
        }else{
                ToastAndroid.show("Code Is Mistake.", 
                ToastAndroid.SHORT,ToastAndroid.CENTER);
                
        }
    }

    return (
        <View >

      <MainDialog visible={ConfirmCodePage}>
        <ConfirmCode CheckPassword = {CheckPassword} SetConfirmCodePage = {SetConfirmCodePage}/>
      </MainDialog>

        <View style={{ alignItems: 'center'}}>
          <View style={style.header}>
            <TouchableOpacity 
            onPress = 
            {()=>{setEditPasswordVisible(false)}}
            >
            <Image
                source={require('../../../src/assets/Dialog/cancel.png')}
                style={{height: 30, width: 30}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flexDirection:'row',alignItems:'center'}}>
                        <TextInput 
                placeholder = 'New Password'
                style ={{width:'90%',borderWidth:1,borderRadius:10,borderColor:'#000'}}
                onChangeText = {(val)=>{SetNewPassword(val)}}
                secureTextEntry = {ShowNewPassword}
            />
                {ShowNewPassword ? 
                <FontAwesome 
        name="eye"
        color='#f13140'
        size={20}
        onPress={()=>{SetShowNewPassword(false)}}
    />
    :             <FontAwesome 
        name="eye-slash"
        color='#f13140'
        size={20}
        onPress={()=>{SetShowNewPassword(true)}}
    />}
        </View>

            { NewPassword.length >= 4 ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={style.errorMsg}>New Password must be 4 characters long.</Text>
            </Animatable.View>
            }

                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <TextInput 
                placeholder = 'Confirm Password'
                style ={{width:'90%', borderWidth:1,borderRadius:10,borderColor:'#000'}}
                onChangeText = {(val)=>{SetConfirmPassword(val)}}
                secureTextEntry = {ShowConfirmPassword}
            />
                {ShowConfirmPassword ? 
                <FontAwesome 
        name="eye"
        color='#f13140'
        size={20}
        onPress={()=>{SetShowConfirmPassword(false)}}
    />
    :             <FontAwesome 
        name="eye-slash"
        color='#f13140'
        size={20}
        onPress={()=>{SetShowConfirmPassword(true)}}
    />}
        </View>
            { ConfirmPassword.length >= 4 ? 
            ConfirmPassword == NewPassword ? null :
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={style.errorMsg}>Confirm Password does not match.</Text>
            </Animatable.View>
            : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={style.errorMsg}>Confirm Password must be 4 characters long.</Text>
            </Animatable.View>
            }
            {
                NewPassword.length >= 4 && ConfirmPassword.length >= 4 
                && NewPassword == ConfirmPassword ? 
                            <TouchableOpacity style={[style.SubmitActive,{backgroundColor:colors.MainColor}]}
            onPress={()=>{Submit();}}>
                <Text style={{fontSize:20,fontWeight:'bold'}}>Submit</Text>
            </TouchableOpacity>
                :
            <TouchableOpacity style={style.SubmitInactive}>
                <Text style={{fontSize:20,fontWeight:'bold'}}>Submit</Text>
            </TouchableOpacity>
            }

        </View>
    )
}


export default ChangePassword;

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



























