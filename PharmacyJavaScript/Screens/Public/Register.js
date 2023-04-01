import React from 'react';
import {Text,View,TouchableOpacity,StyleSheet,Image,TextInput
,ScrollView,SafeAreaView,Button} from 'react-native';

import DatePicker from 'react-native-date-picker'

import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Geolocation from '@react-native-community/geolocation';
import { Platform, PermissionsAndroid } from 'react-native';

import APIRoutes from '../../API/APIRoutes';
import {Post} from '../../API/APICalls';

import AuthenticateContext from '../../Context/AuthenticateContext';

const Register = ({navigation}) =>{

        console.log('[Register] Rerender');

            const { LogIn } = React.useContext(AuthenticateContext);


//      const [date, setDate] = React.useState(new Date())
//   const [open, setOpen] = React.useState(false)
        const [RegisterForm,setRegisterForm] = React.useState({
        UserName : '',
        Password : '',
        Email : '',
        PhoneNumber : '',
        NickName : '',
        Gender : false,
        BirthDay : new Date(),
        Latitude : 0,
        Longitude : 0,
        ShowPassword : true,
        ShowCalender: false,
        ValidationUserName : false,
        ValidationPassword : false,
        ValidationEmail : false,
        ValidationPhoneNumber : false,
        ValidationNickName : false,
    })

    const ChangeShowPassword = () =>{
        setRegisterForm({
            ...RegisterForm,
            ShowPassword : !RegisterForm.ShowPassword
        })
    }

        const ChangeShowCalender = () =>{
        setRegisterForm({
            ...RegisterForm,
            ShowCalender : !RegisterForm.ShowCalender
        })
    }

        const ChangeUserName = (val) =>{
            if(val.length <= 4){
        setRegisterForm({
            ...RegisterForm,
            UserName : val,
            ValidationUserName : false
        })
            }else{
        setRegisterForm({
            ...RegisterForm,
            UserName : val,
            ValidationUserName : true
        })
            }
    }

    const ChangeEmail = (val) =>{
        if(val.split('@').length > 1){
        setRegisterForm({
            ...RegisterForm,
            Email : val,
            ValidationEmail : true
        })
        }else{
                   setRegisterForm({
            ...RegisterForm,
            Email : val,
            ValidationEmail : false
        }) 
        }
    }    
    const ChangePhoneNumber = (val) =>{
                    if(val.length <= 10){
        setRegisterForm({
            ...RegisterForm,
            PhoneNumber:val,
            ValidationPhoneNumber : false
        })
            }else{
        setRegisterForm({
            ...RegisterForm,
            PhoneNumber:val,
            ValidationPhoneNumber : true
        })
            }
    }
    const ChangeNickName = (val)=>{
                            if(val.length <= 4){
        setRegisterForm({
            ...RegisterForm,
            NickName:val,
            ValidationNickName : false
        })
            }else{
        setRegisterForm({
            ...RegisterForm,
            NickName:val,
            ValidationNickName : true
        })
            }
    }
        const ChangeGender = () =>{
        setRegisterForm({
            ...RegisterForm,
            Gender : !RegisterForm.Gender
        })
    }

        const ChangePassword = (val) =>{
            if(val.length <= 4){
        setRegisterForm({
            ...RegisterForm,
            Password : val,
            ValidationPassword : false
        })
            }else{
                       setRegisterForm({
            ...RegisterForm,
            Password : val,
            ValidationPassword : true
        }) 
            }
    }

    const ChangeBirthDay = (val) =>{
        setRegisterForm({
            ...RegisterForm,
            BirthDay : val,
            ShowCalender : false,
        })
    }

 const requestPermissions = async () => {
  if (Platform.OS === 'ios') {
    Geolocation.requestAuthorization();
    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
     authorizationLevel: 'whenInUse',
   });
  }

  if (Platform.OS === 'android') {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
  }
}
    const Location = () =>{
        requestPermissions();
           Geolocation.getCurrentPosition(
      (position) => {
          console.log(position);
          setRegisterForm({
              ...RegisterForm,
              Latitude : JSON.stringify(position.coords.latitude),
              Longitude : JSON.stringify(position.coords.longitude)
          })
      },
    );
    }





    //API Functions
        const Submit = async () =>{
            var date =
            RegisterForm.BirthDay.getFullYear()+'-'
            +(Number(RegisterForm.BirthDay.getMonth()) + 1) + '-'
            + RegisterForm.BirthDay.getDate();

        var Result = await Post(APIRoutes['RegisterCustomer'],{
            UserName : RegisterForm.UserName,
            Password : RegisterForm.Password,
            Email : RegisterForm.Email,
            PhoneNumber : RegisterForm.PhoneNumber,
            NickName : RegisterForm.NickName,
            Gender : RegisterForm.Gender,
            Latitude : 35.93559265136719,
            Longitude : 31.950705696441695,
            // Latitude : Number(RegisterForm.Latitude),
            // Longitude : Number(RegisterForm.Longitude),
            BirthDay : date,
        })
        console.log(Result);
        switch(Result.status){
            case 406:{
                alert('Sorry ... Your Area Is Not Serviced'); break;
            }
            case 409:{ alert('UserName Or Email Is Used'); break;}
            default:{
                LogIn(RegisterForm.UserName,RegisterForm.Password)
            }
        }
    }

  return (
    <ScrollView style={[Style.Page]}>
    <View style={[Style.MainView]}>
    <Animatable.View animation="slideInDown">
      <Image   style={[Style.MainImage]} source={require('../../src/assets/PublicImages/logo1.png')} />
    </Animatable.View>
    </View>
    <Animatable.View 
            animation="fadeInUpBig" style={[Style.MainView1]}>

                        <View style={{justifyContent:'space-between'
                        ,}}>
            </View>

<View style={{marginTop:50}}>
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
                { RegisterForm.ValidationUserName ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={Style.errorMsg}>Username must be 4 characters long.</Text>
            </Animatable.View>
            }
</View>
<View>
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
        secureTextEntry={RegisterForm.ShowPassword}
        onChangeText={(val)=>{ChangePassword(val)}}
    />
    {RegisterForm.ShowPassword ? 
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
                                { RegisterForm.ValidationPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={Style.errorMsg}>Password must be 4 characters long.</Text>
            </Animatable.View>
            }
</View>

<View>
    <View style={[Style.TextBox]}>
    <FontAwesome 
        name="mail-reply"
        color='#f13140'
        size={20}  
    />
    <TextInput placeholder='Email'
                style={{        flex: 0.9,
        paddingLeft: 30,
        color: '#05375a'}}
        onChangeText={(val)=>{ChangeEmail(val)}}
    />
    </View>
                { RegisterForm.ValidationEmail ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={Style.errorMsg}>Make Sure Enter Email.</Text>
            </Animatable.View>
            }
</View>

<View>
    <View style={[Style.TextBox]}>
    <FontAwesome 
        name="phone"
        color='#f13140'
        size={20}  
    />
    <TextInput placeholder='Phone Number'
                style={{        flex: 0.9,
        paddingLeft: 30,
        color: '#05375a'}}
        onChangeText={(val)=>{ChangePhoneNumber(val)}}
    />
    </View>
                { RegisterForm.ValidationPhoneNumber ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={Style.errorMsg}>Phone Number must be 10 characters long.</Text>
            </Animatable.View>
            }
</View>

<View>
    <View style={[Style.TextBox]}>
    <FontAwesome 
        name="user-circle-o"
        color='#f13140'
        size={20}  
    />
    <TextInput placeholder='NickName'
                style={{        flex: 0.9,
        paddingLeft: 30,
        color: '#05375a'}}
        onChangeText={(val)=>{ChangeNickName(val)}}
    />

        <View style={{justifyContent:'center',alignItems:'center'}}>
        {RegisterForm.Gender ? 
                <FontAwesome 
        name="male"
        color='#f13140'
        size={50}
        onPress={()=>{ChangeGender()}}
    />
    :             <FontAwesome 
        name="female"
        color='#f13140'
        size={50}
        onPress={()=>{ChangeGender()}}
    />}
    </View>
    </View>
                { RegisterForm.ValidationNickName ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={Style.errorMsg}>NickName must be 4 characters long.</Text>
            </Animatable.View>
            }
</View>

<View>
<View style={{justifyContent:'space-between',
flexDirection:'row',alignItems:'center'}}>
<View style={{width:'50%'}}>
        <Button title="BirthDay" onPress={() => ChangeShowCalender()} />
</View>
<View style={{width:'50%',backgroundColor:'green'}}>
        <Button color='green' title="Position" onPress={() => Location()} />
</View>
</View>
      <DatePicker
        modal
        open={RegisterForm.ShowCalender}
        date={RegisterForm.BirthDay}
        onConfirm={(date) => {
          ChangeBirthDay(date)
        }}
        onCancel={() => {
          ChangeShowCalender()
        }}
        placeholder="select date"
        format="YYYY-MM-DD"
        mode="date"
      />
</View>

    <View style={[Style.ButtonView]}>
    {RegisterForm.ValidationPassword && RegisterForm.UserName && RegisterForm.ValidationEmail
    && RegisterForm.ValidationNickName && RegisterForm.ValidationPhoneNumber 
    && RegisterForm.latitude != 0 && RegisterForm.longitude != 0 && RegisterForm.BirthDay != new Date() ?
          <TouchableOpacity style={[Style.signUp]} onPress={()=>{Submit()}}>
            <Text style={{fontSize:25,fontWeight:'bold',color:'white'}}>SingUp</Text>
        </TouchableOpacity>
     :
        <TouchableOpacity style={[Style.signUpInactive]}
        onPress={()=>{alert('Enter All Values')}}>
            <Text style={{fontSize:25,fontWeight:'bold',color:'#f13140'}}>SingUp</Text>
        </TouchableOpacity>
     }
        <TouchableOpacity style={[Style.signIn]}
        onPress={()=>{navigation.goBack()}}>
            <Text style={{fontSize:25,fontWeight:'bold',color:'white'}}>LogIn</Text>
        </TouchableOpacity>
    </View>
    </Animatable.View>
    </ScrollView>
  )
}

export default Register;



const Style = StyleSheet.create({
    Page :{
flex:1,backgroundColor: '#f13140'
    },
    MainView : {
       justifyContent:'center',alignItems:'center',flex:1
    },
    MainView1:{
        flex : 3,backgroundColor:'white',
        borderTopLeftRadius:50, borderTopRightRadius:50,
        justifyContent:'center'
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
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    ButtonView :{
        justifyContent:'center',
        alignItems:'center'
    },
        signIn: {
            backgroundColor:'#f13140',
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom:30
    },
    signUp: {
        backgroundColor:'#f13140',
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    signUpInactive: {
        marginTop:40,
        backgroundColor:'white',
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