import React from 'react';
import {Text,View,StyleSheet,TouchableOpacity,ImageBackground
} from 'react-native';

import {Avatar} from 'react-native-paper';

import AuthenticateContext from '../../Context/AuthenticateContext';
import APIRoutes from '../../API/APIRoutes';

import MainDialog from '../Dialog/MainDialog';

import EditImage from './EditAccount/EditImage';
import EditUserName from './EditAccount/EditUserName';
import EditEmail from './EditAccount/EditEmail';
import ChangePassword from './EditAccount/ChangePassword';
import ChangeOther from './EditAccount/ChnageOther';
import { useTheme } from '@react-navigation/native';
import I18n from 'i18n-js';

const Profile = () =>{
    console.log('[Profile] Rerender');

      const {colors} = useTheme();

          const Context = React.useContext(AuthenticateContext);

    const [ImageVisible, setImageVisible] = React.useState(false);
    const [EditUserNameVisible, setEditUserNameVisible] = React.useState(false);
    const [EditEmailVisible, setEditEmailVisible] = React.useState(false);
    const [EditPasswordVisible, setEditPasswordVisible] = React.useState(false);
    const [EditOtherVisible, setEditOtherVisible] = React.useState(false);
    const [EditPage,setPage] = React.useState(true);


  return (
    <View style={{flex:1}}>
      <MainDialog visible={ImageVisible}>
        <EditImage setImageVisible = {setImageVisible}/>
      </MainDialog>

      <MainDialog visible={EditUserNameVisible}>
        <EditUserName setEditUserNameVisible = {setEditUserNameVisible}/>
      </MainDialog>

      <MainDialog visible={EditEmailVisible}>
        <EditEmail setEditEmailVisible = {setEditEmailVisible}/>
      </MainDialog>

      <MainDialog visible={EditPasswordVisible}>
        <ChangePassword setEditPasswordVisible = {setEditPasswordVisible}/>
      </MainDialog>

      <MainDialog visible={EditOtherVisible}>
        <ChangeOther setEditOtherVisible = {setEditOtherVisible} 
          // PhoneNumber = {Context.UserData.phoneNumber}
          // NickName = {Context.UserData.nickName}
          // Gender = {Context.UserData.gender}
        />
      </MainDialog>
      
        <ImageBackground source={require('../../src/assets/Background/national-cancer-institute-fTQHPb6r4wQ-unsplash.jpg')} resizeMode="cover" style={style.image}>
            <View style={[style.Section1]}>
                          {Context.UserData.image == '' ?
                          <TouchableOpacity onPress={()=>{setImageVisible(true)}}>
                            <Avatar.Image
                                source={require('../../src/assets/Users/user.png')}
                                size={150}
                            />
                          </TouchableOpacity>
                         :
                          <TouchableOpacity onPress={()=>{setImageVisible(true)}} >
                                <Avatar.Image 
                                source={{
                                    uri: APIRoutes['Server_URL'] + Context.UserData.image
                                }}
                                size={150}
                            />
                          </TouchableOpacity>
                         }
      <Text style={[style.title]}>{Context.UserData.nickName}</Text>
      <Text style={[style.title1]}>{Context.UserData.userName}</Text>
      <Text style={[style.title1]}>{Context.UserData.email}</Text>
    </View>
        </ImageBackground>

{
  EditPage ?
      <View  style={[style.Section2,{backgroundColor: colors.MainColor}]}>
        <View style={[style.MainSection2]}>
        <View style={{alignItems:'center'}}>
          <Text style={[style.title]}>{I18n.t('UserName')} : <Text style={[style.title1]}>{Context.UserData.userName}</Text></Text>
          <Text style={style.title}>{I18n.t('Email')} : <Text style={style.title1}>{Context.UserData.email}</Text></Text>
          <Text style={style.title}>{I18n.t('PhoneNumber')} : <Text style={style.title1}>{Context.UserData.phoneNumber}</Text></Text>
          <Text style={style.title}>{I18n.t('NickName')} : <Text style={style.title1}>{Context.UserData.nickName}</Text></Text>
          <Text style={style.title}>{I18n.t('Birthday')} : <Text style={style.title1}>{Context.UserData.birthDay}</Text></Text>
              {Context.UserData.gender ? 
    <Text style={style.title}>{I18n.t('Gender')} : <Text style={style.title1}>Male</Text></Text>
    :
    <Text style={style.title}>{I18n.t('Gender')} : <Text style={style.title1}>Female</Text></Text> 
    }
    <TouchableOpacity style={style.ChangePageButton}
    onPress={()=>{setPage(false)}}>
      <Text style={{fontSize:20,fontWeight:'bold'}}>{I18n.t('Edit')}</Text>
    </TouchableOpacity>
        </View>
  </View>
    </View>
   :

           <View  style={[style.Section2,{backgroundColor: colors.MainColor}]}>
        <View style={[style.MainSection2]}>
    <View style={{alignItems:'center'}}>

    <TouchableOpacity style={style.EditButton}
    onPress={()=>{setEditUserNameVisible(true)}}>
      <Text style={{fontSize:20,fontWeight:'bold'}}>{I18n.t('Edit')} {I18n.t('UserName')}</Text>
    </TouchableOpacity>

        <TouchableOpacity style={style.EditButton}
    onPress={()=>{setEditEmailVisible(true)}}>
      <Text style={{fontSize:20,fontWeight:'bold'}}>{I18n.t('Edit')} {I18n.t('Email')}</Text>
    </TouchableOpacity>

        <TouchableOpacity style={style.EditButton}
    onPress={()=>{setEditPasswordVisible(true)}}>
      <Text style={{fontSize:20,fontWeight:'bold'}}>{I18n.t('Edit')} {I18n.t('Password')}</Text>
    </TouchableOpacity>

    <TouchableOpacity style={style.EditButton}
    onPress={()=>{setEditOtherVisible(true)}}>
      <Text style={{fontSize:20,fontWeight:'bold'}}>{I18n.t('Edit')} {I18n.t('Other')}</Text>
    </TouchableOpacity>

    <TouchableOpacity style={style.ChangePageButton}
    onPress={()=>{setPage(true)}}>
      <Text style={{fontSize:20,fontWeight:'bold'}}>{I18n.t('Back')}</Text>
    </TouchableOpacity>
        </View>
  </View>
    </View>
}

   
      
    </View>
  )
}

export default Profile;



const style = StyleSheet.create({
            title: {
      fontSize: 26,
      marginTop: 3,
      fontWeight: 'bold',
      color:'#fff'
    },
    title1:{
            fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
      color:'#fff'
    },

  Section1:{
    alignItems:'center',
    //backgroundColor:'#fff',
    flex:1,
    
  },
    Section2:{
    alignItems:'center',flex:1
    
  },
  MainSection2 : {
    flex:1,justifyContent:'center',alignItems:'center',
    flexDirection:'row'
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  ChangePageButton : {
    width:300,backgroundColor:'#fff'
    ,alignItems:'center',justifyContent:'center',height:40
    ,borderRadius:30
  },
    EditButton : {
    width:300,backgroundColor:'#fff',margin:10
    ,alignItems:'center',justifyContent:'center',height:40
    ,borderRadius:30
  }
})