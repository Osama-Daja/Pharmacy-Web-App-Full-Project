import React, { useEffect } from "react";
import { View,Text,TouchableOpacity,Image ,StyleSheet
,TextInput,ToastAndroid} from "react-native";
import * as Animatable from 'react-native-animatable';
import APIRoutes from "../../../API/APIRoutes";
import {Put,Get} from "../../../API/APICalls";
import AuthenticateContext from "../../../Context/AuthenticateContext";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import jwtDecode from 'jwt-decode';
import { useTheme } from "@react-navigation/native";

const ChangeOther = ({setEditOtherVisible
//    ,PhoneNumber,NickName,Gender
}) =>{
    console.log('[ChangeOther] Rerender');

    var [NewPhoneNumber,SetNewPhoneNumber] = React.useState('');
    var [NewNickName,SetNewNickName] = React.useState('');
    var [NewGender,SetNewGender] = React.useState(false);

    var [Role,SetRole] = React.useState('');

    const Context = React.useContext(AuthenticateContext);
    const {colors} = useTheme();

      const GetToken = async()=>{
    var token =  String(await AsyncStorage.getItem('token'));
    SetRole(jwtDecode( String(token)).role);
  }

    useEffect(()=>{
    SetNewPhoneNumber(Context.UserData.phoneNumber);
    SetNewNickName(Context.UserData.nickName);
    SetNewGender(Context.UserData.gender);
    GetToken();
    },[]);

    const Submit = async () =>{
        switch(Role) {
            case 'Customer' :{
                        var Result = await Put(APIRoutes['UpdateCustomer']
        ,{
            PhoneNumber : NewPhoneNumber,
            NickName : NewNickName,
            Gender : NewGender,
            BirthDay : Context.UserData.birthDay
        });

        if(Result.status == 200){
            ToastAndroid.show("Success", 
            ToastAndroid.SHORT,ToastAndroid.CENTER);
            var Result = await Get(APIRoutes['GetMyAccountData']);
            Context.SetUserData(Result.data);
            setEditOtherVisible(false);
        }else{
            ToastAndroid.show("Error", 
            ToastAndroid.SHORT,ToastAndroid.CENTER);
        };break;
            }
        case 'SuperUser' :{
                        var Result = await Put(APIRoutes['UpdateSuperUser']
        ,{
            PhoneNumber : NewPhoneNumber,
            NickName : NewNickName,
            Gender : NewGender,
        });


        if(Result.status == 200){
            ToastAndroid.show("Success", 
            ToastAndroid.SHORT,ToastAndroid.CENTER);
            var Result = await Get(APIRoutes['GetMyAccountData']);
            Context.SetUserData(Result.data);
            setEditOtherVisible(false);
        }else{
            ToastAndroid.show("Error", 
            ToastAndroid.SHORT,ToastAndroid.CENTER);
        };break;
            }
        case 'Admin' :{
                        var Result = await Put(APIRoutes['UpdateAdmin']
        ,{
            PhoneNumber : NewPhoneNumber,
            NickName : NewNickName,
            Gender : NewGender
        });


        if(Result.status == 200){
            ToastAndroid.show("Success", 
            ToastAndroid.SHORT,ToastAndroid.CENTER);
            var Result = await Get(APIRoutes['GetMyAccountData']);
            Context.SetUserData(Result.data);
            setEditOtherVisible(false);
        }else{
            ToastAndroid.show("Error", 
            ToastAndroid.SHORT,ToastAndroid.CENTER);
        };break;
            }
        case 'Delivery' :{
                        var Result = await Put(APIRoutes['UpdateDelivery']
        ,{
            PhoneNumber : NewPhoneNumber,
            NickName : NewNickName,
            Gender : NewGender
        });


        if(Result.status == 200){
            ToastAndroid.show("Success", 
            ToastAndroid.SHORT,ToastAndroid.CENTER);
            var Result = await Get(APIRoutes['GetMyAccountData']);
            Context.SetUserData(Result.data);
            setEditOtherVisible(false);
        }else{
            ToastAndroid.show("Error", 
            ToastAndroid.SHORT,ToastAndroid.CENTER);
        };break;
            }
        }
    };

    return (
        <View>
        <View >
          <View style={style.header}>
            <TouchableOpacity onPress = 
            {()=>{setEditOtherVisible(false)}}>
            <Image
                source={require('../../../src/assets/Dialog/cancel.png')}
                style={{height: 30, width: 30}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View >
            <TextInput 
            value = {NewPhoneNumber}
                placeholder = 'New PhoneNumber'
                style ={{borderWidth:1,borderRadius:10,borderColor:'#000'}}
                onChangeText = {(val)=>{SetNewPhoneNumber(val)}}
            />
                            { NewPhoneNumber.length >= 10 ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={style.errorMsg}>PhoneNumber must be 10 characters long.</Text>
            </Animatable.View>
            }
        </View>

        <View >
            <TextInput 
            value = {NewNickName}
                placeholder = 'New Nickname'
                style ={{borderWidth:1,borderRadius:10,borderColor:'#000'}}
                onChangeText = {(val)=>{SetNewNickName(val)}}
            />
                            { NewNickName.length >= 4 ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={style.errorMsg}>NickName must be 4 characters long.</Text>
            </Animatable.View>
            }
        </View>


        <View style={{justifyContent:'center',alignItems:'center'}}>
        {NewGender ? 
                <FontAwesome 
        name="male"
        color='#f13140'
        size={50}
        onPress={()=>{SetNewGender(false)}}
    />
    :             <FontAwesome 
        name="female"
        color='#f13140'
        size={50}
        onPress={()=>{SetNewGender(true)}}
    />}
    </View>

            {
                NewPhoneNumber.length < 10 ? 
            <TouchableOpacity style={[style.SubmitInactive]}
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


export default ChangeOther;

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

