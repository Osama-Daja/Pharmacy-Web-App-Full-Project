import React, { useEffect } from 'react';

import {View,ActivityIndicator,Text,Image,I18nManager} from 'react-native';

import { NavigationContainer,DefaultTheme,DarkTheme, } from '@react-navigation/native';

import { 
  Provider, 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme 
} from 'react-native-paper';

import Public from './Screens/Public/Public';
import Private from './Screens/Private/Private';
import LoadScreen from './Screens/LoadScreen';

import AuthenticateContext from './Context/AuthenticateContext';

import AsyncStorage from '@react-native-community/async-storage';

import jwtDecode from 'jwt-decode';
import APIRoutes from './API/APIRoutes';
import {Post} from './API/APICalls';

import I18n from 'i18n-js';
import { ar,en } from './Languages/Languages';
import LocalizedStrings from "react-localization";
import RNRestart from 'react-native-restart';

const App = () =>{
  console.log('[App] Rerender');

  const [MyTheme,SetMyTheme] = React.useState(false);
  var [UserData,SetUserData] = React.useState({
    nickName : '',
    userName : '',
    email : '',
    phoneNumber : '',
    gender : '',
    image : '',
    birthDay : '',
    salary : 0,
  });
   var [Messages,SetMessage] = React.useState([{}]);
    const [token,Settoken] = React.useState (null)
    var [Role,SetRole] = React.useState('');

     var [IsLoggedId,SetIsLoggedId] = React.useState(false);

  var [OrderBag,SetOrderBag] = React.useState({
    bag : {
      id : 0,
      currentDate : '',
      totalPrice : 0,
      paymentType : false,
      status : 0,
      deliveryId : 0,
      customerId : 0,
      nickName : '',
      phoneNumber : '',
      image : '',
      latitude : 0,
      longitude : 0,
      product : []
    },
    delivery :{
      image : '',
      nickName : '',
      phoneNumber : ''
    }
  });

  var [Language,SetLanguage] = React.useState('en');

    const CustomDefaultTheme = {
      ...DefaultTheme,
      ...PaperDefaultTheme,
      colors:{
        ...DefaultTheme.colors,
        ...PaperDefaultTheme.colors,
        background: '#ffffff',
        text: '#333333',
        MainColor : '#f13140',
        Button : '#56001A',
      }
    }

    const CustomDarkTheme = {
      ...DarkTheme,
      ...PaperDarkTheme,
      colors:{
        ...DarkTheme.colors,
        ...PaperDarkTheme.colors,
        background: '#333333',
        text: '#ffffff',
        MainColor : '#56001A',
        Button : '#f13140',
      }
    }

  const AppTheme = MyTheme ? CustomDarkTheme: CustomDefaultTheme;
  
  


  const LogIn = async (UserName,Password) =>{
    SetIsLoggedId(false);
      var Result = await Post(APIRoutes['LogIn'],{UserName:UserName,Password:Password});
      
      switch(Result.status){
        case 404 :
          {
            alert('UserName Or Password Is Incorrect.')
             break;
          }
          case 403: {
            alert ('Account IS Blocked.');
            break
          }
          default :{
            var Decode = Result.data;
            var token = String(Decode.token);
            var Role = jwtDecode( String(token)).role;
             SetRole(Role);

            if(Role == 'Customer' || Role == 'Delivery'){
              
              await AsyncStorage.setItem('token', token);
                              Settoken(token)
              
            }else{
              alert("Can't Login App");
            }
          }
      }

          SetIsLoggedId(true);
  }
  const LogOut = async () =>{
            await AsyncStorage.removeItem('token');
      Settoken(null);
      SetUserData({
    nickName : '',
    userName : '',
    email : '',
    phoneNumber : '',
    gender : '',
    image : '',
    birthDay : '',
    salary : 0,
  });
  SetOrderBag({
    bag : {
      id : 0,
      currentDate : '',
      totalPrice : 0,
      paymentType : false,
      status : 0,
      deliveryId : 0,
      customerId : 0,
      nickName : '',
      phoneNumber : '',
      image : '',
      latitude : 0,
      longitude : 0,
      product : []
    },
    delivery :{
      image : '',
      nickName : '',
      phoneNumber : ''
    }
  });
      Messages = [{}];
    SetMessage([{}]);
    SetRole('');
  }

    var  ChangeLanguage = async () => {
      if(Language == 'ar'){
        let NewLanguage = 'en';
      
      await AsyncStorage.setItem('Language',NewLanguage);
      I18n.locale = NewLanguage;
      SetLanguage(NewLanguage);
      
      RNRestart.Restart();
      }else{
        let NewLanguage = 'ar';
        await AsyncStorage.setItem('Language',NewLanguage);
        I18n.locale = NewLanguage;
        SetLanguage(NewLanguage)

        RNRestart.Restart();
      }
  }

  useEffect(()=>{


         setTimeout(async () => {
      let token = null;
      try{
        var Language = await AsyncStorage.getItem('Language');
        var MainToken = await AsyncStorage.getItem('token');
        console.log(Language);

        let SideLanguage = Language == 'ar';

        I18n.locale = Language;
        SetLanguage(Language)
        I18nManager.forceRTL(SideLanguage);
        I18nManager.allowRTL(SideLanguage);
        
if(MainToken != null){
        token = String(MainToken);
        SetRole(jwtDecode( String(MainToken)).role);
                Settoken(token);}
        }catch (e){
          console.log(e);
        }
       SetIsLoggedId(true);
    }, (2000));

  },[]);


    useEffect(()=>{
          console.log('Start**********************************************************************************************');
          I18n.translations = { en, ar };
I18n.locale = LocalizedStrings.locale;
// I18n.locale = 'en';
    },[])

  return (
          <Provider theme={AppTheme}>
    <AuthenticateContext.Provider value ={{ 
      LogIn : LogIn, LogOut: LogOut,
      Messages : Messages,SetMessage :SetMessage,
      UserData : UserData, SetUserData : SetUserData,Role : Role,
      OrderBag:OrderBag,SetOrderBag : SetOrderBag,
      MyTheme:MyTheme,SetMyTheme:SetMyTheme,
      Language : Language, ChangeLanguage : ChangeLanguage}}>
    <NavigationContainer theme={AppTheme}>
    {IsLoggedId ?
    token != null ? <Private /> : <Public />
     :
     <LoadScreen />
    }
    
    </NavigationContainer>
    </AuthenticateContext.Provider>
    </Provider>
  )
}


         {/* <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
     <Image style={{width:150,height:150,borderRadius:30}} 
     source={require('./src/assets/PublicImages/logo1.png')} />
     <ActivityIndicator size="large" color="#f13140" />
     <Text>Loading...</Text>
     </View> */}
export default App;
