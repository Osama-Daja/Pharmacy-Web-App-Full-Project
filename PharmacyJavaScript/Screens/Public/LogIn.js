import React from 'react';
import {Text,View,TouchableOpacity,StyleSheet,Image,TextInput
    ,ScrollView, SafeAreaView,ImageBackground} from 'react-native';

import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AuthenticateContext from '../../Context/AuthenticateContext';

import { Dimensions } from 'react-native';

const LogIn = ({navigation}) =>{
    console.log('[LogIn] Rerender');

        const Context = React.useContext(AuthenticateContext);


    const [LogInForm,setLogInForm] = React.useState({
        UserName : '',
        Password : '',
        ShowPassword : true,
        ValidationUserName : false,
        ValidationPassword : false,
    })

    const ChangeShowPassword = () =>{
        setLogInForm({
            ...LogInForm,
            ShowPassword : !LogInForm.ShowPassword
        })
    }

        const ChangeUserName = (val) =>{
            if(val.length <= 4){
        setLogInForm({
            ...LogInForm,
            UserName : val,
            ValidationUserName : false
        })
            }else{
        setLogInForm({
            ...LogInForm,
            UserName : val,
            ValidationUserName : true
        })
            }
    }

        const ChangePassword = (val) =>{
            if(val.length <= 4){
        setLogInForm({
            ...LogInForm,
            Password : val,
            ValidationPassword : false
        })
            }else{
                       setLogInForm({
            ...LogInForm,
            Password : val,
            ValidationPassword : true
        }) 
            }
    }


    const Submit = () =>{
        // Context.AllMessages.push({Name:'New'})
        Context.LogIn(LogInForm.UserName,LogInForm.Password)
    }

  return (
      <SafeAreaView style={[Style.Page]}>
        <ImageBackground source={require('../../src/assets/Background/istockphoto-1138197108-612x612.jpg')} resizeMode="cover">
              <ScrollView >
            
    <View style={[Style.MainView]}>
    <Animatable.View animation="slideInDown">
      <Image style={[Style.MainImage]} source={require('../../src/assets/PublicImages/logo1.png')} />
    </Animatable.View>
            <Text style={[Style.MainText]}>Tahaluf Pharmacy</Text>
    </View>
   


    <Animatable.View 
            animation="fadeInUpBig" style={[Style.MainView1]}>
    <View style={[Style.TextBox]}>
    <FontAwesome 
        name="user-o"
        color='#f13140'
        size={20}  
    />
    <TextInput placeholder='UserName'
                style={{        flex: 0.9,
        paddingLeft: 30,
        color: '#05375a'}}
        onChangeText={(val)=>{ChangeUserName(val)}}
    />
    </View>
                { LogInForm.ValidationUserName ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={Style.errorMsg}>Username must be 4 characters long.</Text>
            </Animatable.View>
            }
        <View style={[Style.TextBox]}>
    <FontAwesome 
        name="lock"
        color='#f13140'
        size={20}
    />
    <TextInput placeholder='Password'
                        style={{        flex: 0.9,
        paddingLeft: 30,
        color: '#05375a'}}
        secureTextEntry={LogInForm.ShowPassword}
        onChangeText={(val)=>{ChangePassword(val)}}
    />
    {LogInForm.ShowPassword ? 
                <FontAwesome 
        name="eye"
        color='#f13140'
        size={20}
        onPress={()=>{ChangeShowPassword()}}
    />
    :             <FontAwesome 
        name="eye-slash"
        color='#f13140'
        size={20}
        onPress={()=>{ChangeShowPassword()}}
    />}
    </View>
                                { LogInForm.ValidationPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={Style.errorMsg}>Password must be 4 characters long.</Text>
            </Animatable.View>
            }
    <View style={[Style.ButtonView]}>
    {LogInForm.ValidationUserName && LogInForm.ValidationPassword ? 
        <TouchableOpacity style={[Style.signIn]}
        onPress={()=>{Submit()}}>
            <Text style={{fontSize:25,fontWeight:'bold',color:'#f13140'}}>LogIn</Text>
        </TouchableOpacity>
    :
        <TouchableOpacity style={[Style.signInInactive]}>
            <Text style={{fontSize:25,fontWeight:'bold',color:'#f13140'}}>LogIn</Text>
        </TouchableOpacity>
    }
        <TouchableOpacity style={[Style.signUp]}
        onPress={()=>{navigation.navigate('Register')}}>
            <Text style={{fontSize:25,fontWeight:'bold',color:'white'}}>SingUp</Text>
        </TouchableOpacity>
    </View>
    </Animatable.View>
    </ScrollView>
     </ImageBackground>
      </SafeAreaView>
  )
}

export default LogIn;


const Style = StyleSheet.create({
    Page :{
flex:1,
    },
    MainView : {
        justifyContent:'center',alignItems:'center',flex:1,height:Dimensions.get('window').height / 2,
    },
    MainView1:{
        flex : 1,backgroundColor:'#fff',height:'100%',
        borderTopLeftRadius:50, borderTopRightRadius:50,
        justifyContent:'center',height: Dimensions.get('window').height / 2,
    },
    MainText : {
        fontSize:40,
        color:'white'
    },
    MainImage : {
        height:100,
        width:100,
        borderRadius:50,
    },
    TextBox : {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f13140',
        paddingBottom: 5
    },
    ButtonView :{
        justifyContent:'center',
        alignItems:'center'
    },
    signIn: {
        marginTop:40,
        backgroundColor:'white',
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor:'#f13140',
        borderWidth:2
    },
        signInInactive: {
        marginTop:40,
        backgroundColor:'white',
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    signUp: {
        backgroundColor:'#f13140',
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
        errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
})

