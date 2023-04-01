import React,{setState, useEffect} from 'react';

import {View,StyleSheet,Text,Button} from 'react-native';
import {Avatar,Title,Caption,TouchableRipple,Switch} from 'react-native-paper';

import { createDrawerNavigator,DrawerItem,DrawerContentScrollView,DrawerItemList } from '@react-navigation/drawer';
const PrivateDrawer = createDrawerNavigator();

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import AuthenticateContext from '../../Context/AuthenticateContext';
import AsyncStorage from '@react-native-community/async-storage';
import jwtDecode from 'jwt-decode';

import Profile from './Profile';
import HomeCustomer from './Customer/HomeCustomer';
import HomeDelivery from './Delivery/HomeDelivery';

import APIRoutes from '../../API/APIRoutes';
import {Get,Post} from '../../API/APICalls';

import Geolocation from '@react-native-community/geolocation';
import { Platform, PermissionsAndroid } from 'react-native';
import Market from './Customer/Market';


import {HubConnectionBuilder, LogLevel} from "@aspnet/signalr";
import UserMessage from './Messages/UserMessage';
import { useTheme } from '@react-navigation/native';

import I18n from 'i18n-js';
import { ar,en } from '../../Languages/Languages';
import LocalizedStrings from "react-localization";

var Private = () =>{
  console.log('[Private] Rerender');

  const PaperTheme = useTheme();
  const {colors} = useTheme();

  const Context = React.useContext(AuthenticateContext);

    var ConnectionSignalR = new HubConnectionBuilder()
                .withUrl(APIRoutes['Hub_URL'])
                .configureLogging(LogLevel.Debug)
                .build();

                    const  ConnectionToSignalR = async () =>{
                    var token =  String(await AsyncStorage.getItem('token'));

                    var UserId = jwtDecode( String(token)).UserId;

                  ConnectionSignalR.on('sendMessageToUser',(data)=>{
        var Check = Context.Messages.find(a=>a.userId == data.fromId)
    console.log(data);

        if(Check == null){
          var NewUser = {
            email : data.email,
            image : data.image,
            nickName : data.nickName,
            phoneNumber : data.phoneNumber,
            userId : data.userId,
            messages : [{text : data.text,currentDate : data.currentDate}],
          }
        Context.Messages.push(NewUser);
        }else
        {
        var Body = {text : data.text,currentDate : data.currentDate}
        let Messages = Context.Messages;
        let Index = Context.Messages
        .findIndex(a=>a.userId == data.fromId)
        Messages[Index].messages.push(Body);
        Context.SetMessage(Messages);
        }

        Context.SetMessage(Items =>{ return [...Items]});
      });


      ConnectionSignalR.on('SendLocationToCustomer',async (data)=>{
        Context.SetOrderBag(data);
      });

      await ConnectionSignalR.start().then(async () => {
      await ConnectionSignalR.invoke('getConnectionId',UserId).then((data)=>{
        console.log('ConnectionSignalR');
        Context.Messages = data;
        Context.SetMessage(data)
      });
      });
    }

  const GetUserData = async () =>{
    var Result = await Get(APIRoutes['GetMyAccountData']);
    Context.SetUserData(Result.data);
  }

  useEffect(()=>{
GetUserData();
  },[]);

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
  requestPermissions();

    const Location = async () =>{
        requestPermissions();
           Geolocation.getCurrentPosition(
      async (position) => {
        var lat = JSON.stringify(position.coords.latitude);
        var long = JSON.stringify(position.coords.longitude);
      var R = await Post(APIRoutes['AddDeliveryLocation'],{Latitude : Number(lat),Longitude :Number(long)});
      },
    );
    }

useEffect(()=>{
  ConnectionToSignalR();

  if(Context.Role == 'Delivery'){
  console.log('Delivery');
  setTimeout(() => {
    Location();
  }, 10000);
}
},[])

const LogOut = async () =>{
                      var token =  String(await AsyncStorage.getItem('token'));

                    var UserId = jwtDecode( String(token)).UserId;
                                     Context.LogOut();

      await ConnectionSignalR.start().then(async () => {
                     await ConnectionSignalR.invoke('RemoveConnectionId',UserId)
               .then((data)=>{
                 ConnectionSignalR.stop();
            });
      });
}
    return (
      // <APPClass LogOut ={LogOut} Context = {Context} PaperTheme = {PaperTheme} colors ={colors} />
        <PrivateDrawer.Navigator 
initialRouteName="HomeCustomer"
        drawerContent={props => {
    return (
      <DrawerContentScrollView {...props}>
      <View  style={Style.drawerContent}>
                          <View style={Style.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15,borderBottomWidth:1}}>
                        {Context.UserData.image == '' ?
                            <Avatar.Image
                                source={require('../../src/assets/Users/user.png')}
                                size={50}
                            />
                         :
                              <Avatar.Image 
                                source={{
                                    uri: APIRoutes['Server_URL'] + Context.UserData.image
                                }}
                                size={50}
                            />
                         }
                            <View style={{marginLeft:15}}>
                                <Title style={Style.title}>{Context.UserData.nickName}</Title>
                                <Caption style={Style.caption}>{Context.UserData.phoneNumber}</Caption>
                            </View>
                        </View>
                    </View>
        <DrawerItemList {...props} />
        <DrawerItem style={Style.bottomDrawerSection}
        icon={() => (
                                 <FontAwesome 
                                 name="sign-out" 
                                 color='#fff'
                                 size={30}
                                 />
                             )}
         label= {I18n.t('Logout')} onPress={async () => {LogOut();
                 }} />

                        <TouchableRipple onPress={() => {
                          Context.SetMyTheme(!Context.MyTheme);
                          }}>
                            <View style={Style.preference}>
                                <Text style={{color:colors.text}}>{I18n.t('DarkTheme')}</Text>
                                <View pointerEvents="none">
                                <Switch value={PaperTheme.dark}/>
                                </View>
                            </View>
                        </TouchableRipple>
                          <TouchableRipple onPress={() => {
                          Context.ChangeLanguage()
                          }}>
                            <View style={Style.preference}>
                                <Text style={{color:colors.text}}>{I18n.t('Language')}</Text>
                                <View pointerEvents="none">
                                <Switch value={Context.Language == 'ar' ? true : false}/>
                                </View>
                            </View>
                        </TouchableRipple>
      </View>
      </DrawerContentScrollView>
    )
  }}
        >

        {Context.Role == 'Customer' ?
        <PrivateDrawer.Group> 
        <PrivateDrawer.Screen name="HomeCustomer" component={HomeCustomer}
          options={{
           title: I18n.t('Home'),
           drawerIcon: () => (
              <FontAwesome
                 name="home"
                 size = {25}
                 color= '#f13140'
              />
           ),
        }}
        />
          <PrivateDrawer.Screen name="Profile" component={Profile} 
options={{
           title: I18n.t('Profile'),
           drawerIcon: () => (
              <FontAwesome
                 name="user-circle"
                 size = {25}
                 color= '#f13140'
              />
           ),
        }}
          />
        <PrivateDrawer.Screen name="Market" component={Market}
                    options={{
           title: I18n.t('Market'),
           drawerIcon: () => (
              <FontAwesome
                 name="shopping-basket"
                 size = {25}
                 color= '#f13140'
              />
           ),
        }}
        />
        </PrivateDrawer.Group>
         :
            <PrivateDrawer.Group> 
<PrivateDrawer.Screen name="HomeDelivery" component={HomeDelivery}
          options={{
           title: I18n.t('Home'),
           drawerIcon: () => (
              <FontAwesome
                 name="home"
                 size = {25}
                 color= '#f13140'
              />
           ),
        }} />
                  <PrivateDrawer.Screen name="Profile" component={Profile} 
options={{
           title: I18n.t('Profile'),
           drawerIcon: () => (
              <FontAwesome
                 name="user-circle"
                 size = {25}
                 color= '#f13140'
              />
           ),
        }}
          />
            </PrivateDrawer.Group>
        }
          <PrivateDrawer.Screen name="MessageMainScreen" component={UserMessage} 
                            options={{
           title: I18n.t('Messages'),
           drawerIcon: () => (
              <FontAwesome
                 name="send-o"
                 size = {25}
                 color= '#f13140'
              />
           ),
        }}
        />

        </PrivateDrawer.Navigator>
        
    )
}

//Class Component 
class APPClass extends React.Component{

  constructor(props){
    super(props);
    
    I18n.translations = { en, ar };
I18n.locale = LocalizedStrings.locale;
I18n.locale = 'en';
    this.state = {
      Language : 'en',
    }
     
  }

    ChangeLanguage() {
      this.props.Context.SetMessage([]);
      console.log(this.state.Language);
      if(this.state.Language == 'ar'){
      I18n.locale = 'ar';
    this.setState({
      Language : 'en',
    })
      }else{
              I18n.locale = 'en';
        this.setState({
      Language : 'ar',
    });
      }
  }

  render(){



  return(

            <PrivateDrawer.Navigator 
initialRouteName="HomeCustomer"
        drawerContent={props => {
    return (
      <DrawerContentScrollView {...props}>
      <View  style={Style.drawerContent}>
                          <View style={Style.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15,borderBottomWidth:1}}>
                        {this.props.Context.UserData.image == '' ?
                                                    <Avatar.Image
                                source={require('../../src/assets/Users/user.png')}
                                size={50}
                            />
                         :
                                                                             <Avatar.Image 
                                source={{
                                    uri: APIRoutes['Server_URL'] + this.props.Context.UserData.image
                                }}
                                size={50}
                            />
                         }
                            <View style={{marginLeft:15}}>
                                <Title style={Style.title}>{this.props.Context.UserData.nickName}</Title>
                                <Caption style={Style.caption}>{this.props.Context.UserData.phoneNumber}</Caption>
                            </View>
                        </View>
                    </View>
        <DrawerItemList {...props} />
        <DrawerItem style={Style.bottomDrawerSection}
        icon={() => (
                                 <FontAwesome 
                                 name="sign-out" 
                                 color='#fff'
                                 size={30}
                                 />
                             )}
         label="Logout" onPress={async () => {this.props.LogOut();
                 }} />

                        <TouchableRipple onPress={() => {
                          this.props.Context.SetMyTheme(!this.props.Context.MyTheme);
                          }}>
                            <View style={Style.preference}>
                                <Text style={{color:this.props.colors.text}}>Dark Theme</Text>
                                <View pointerEvents="none">
                                <Switch value={this.props.PaperTheme.dark}/>
                                </View>
                            </View>
                        </TouchableRipple>

                          <TouchableRipple onPress={() => {
                          this.ChangeLanguage()
                          }}>
                            <View style={Style.preference}>
                                <Text style={{color:this.props.colors.text}}>{I18n.t('Language')}</Text>
                                <View pointerEvents="none">
                                <Switch value={this.state.Language == 'ar' ? false : true}/>
                                </View>
                            </View>
                        </TouchableRipple>
      </View>
      </DrawerContentScrollView>
    )
  }}
        >

        {this.props.Context.Role == 'Customer' ?
        <PrivateDrawer.Group> 
        <PrivateDrawer.Screen name="HomeCustomer" component={HomeCustomer}
        //initialParams={{ I18n: I18n }} I18n = {{I18n}}
          options={{
           title: 'Home',
           color:'#000',
           drawerIcon: () => (
              <FontAwesome
                 name="home"
                 size = {25}
                 color= '#f13140'
              />
           ),
        }}
        />
          <PrivateDrawer.Screen name="Profile" component={Profile}  
options={{
           title: 'Profile',
           drawerIcon: () => (
              <FontAwesome
                 name="user-circle"
                 size = {25}
                 color= '#f13140'
              />
           ),
        }}
          />
        <PrivateDrawer.Screen name="Market" component={Market}
                    options={{
           title: 'Market',
           drawerIcon: () => (
              <FontAwesome
                 name="shopping-basket"
                 size = {25}
                 color= '#f13140'
              />
           ),
        }}
        />
        </PrivateDrawer.Group>
         :
            <PrivateDrawer.Group> 
<PrivateDrawer.Screen name="HomeDelivery" component={HomeDelivery}
          options={{
           title: 'Home',
           drawerIcon: () => (
              <FontAwesome
                 name="home"
                 size = {25}
                 color= '#f13140'
              />
           ),
        }} />
                  <PrivateDrawer.Screen name="Profile" component={Profile} 
options={{
           title: 'Profile',
           drawerIcon: () => (
              <FontAwesome
                 name="user-circle"
                 size = {25}
                 color= '#f13140'
              />
           ),
        }}
          />
            </PrivateDrawer.Group>
        }
          <PrivateDrawer.Screen name="MessageMainScreen" component={UserMessage} 
                            options={{
           title: 'Messages',
           drawerIcon: () => (
              <FontAwesome
                 name="send-o"
                 size = {25}
                 color= '#f13140'
              />
           ),
        }}
        />

        </PrivateDrawer.Navigator>




//     <View style = {{justifyContent:'center',alignItems:'center',flex:1}}>
//     <Text>Language : {this.state.Language}</Text>
//       <Text>Welcome : {this.state.Welcome}</Text>
//       <Button 
//         title = 'English'
//         onPress={()=>{

// I18n.locale = 'en';
// console.log(I18n.t('Welcome'));
// this.state.Welcome = 'English';
// this.Edit('English');

//         }}
//       />
//             <Button 
//         title = 'Arabic'
//         onPress={()=>{
          
// I18n.locale = 'ar';
// console.log(I18n.t('Welcome'));
// this.state.Welcome = 'Arabic';
// this.Edit('Arabic');

//         }}
//       />
//     </View>
  )
  }
}

//export default () => <APPClass />;


export default Private;

const Style =  StyleSheet.create({
      drawerContent: {
      flex: 1
    },
        userInfoSection: {
      padding:10,
      backgroundColor:'#f13140',
      //borderRadius:15
    },
        title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
      color:'#fff'
    },
    caption :{
      fontSize: 12,
      color:'#fff' 
    },
        row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
      
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
bottomDrawerSection :{
  backgroundColor : '#FF0000',
          marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
},
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
});






