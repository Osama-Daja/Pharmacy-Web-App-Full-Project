

import React from 'react';
import {Text,View,StyleSheet,TouchableOpacity, Button,Image, ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'react-native-axios';
import {Avatar} from 'react-native-paper';

import {launchImageLibrary} from 'react-native-image-picker';
import APIRoutes from '../../../API/APIRoutes';
import {Get} from '../../../API/APICalls'
import { ScrollView } from 'react-native-gesture-handler';
import AuthenticateContext from '../../../Context/AuthenticateContext';


const EditImage = ({setImageVisible}) =>{

  console.log('[EditImage] Rerender');

    const Context = React.useContext(AuthenticateContext);

    const [Prev,setPrev] = React.useState('');
    const [MyImage,setImage] = React.useState({});

  const ChoiceImage = () =>{
    let options ={
      mediaType : 'photo',
      quality:1,
      includeBase64 : true,
    }
    
    launchImageLibrary(options
      ,res=>{
      if(res.didCancel){
        return;
      }

      const image ={
        uri: res.assets[0].uri,
        name : res.assets[0].fileName,
        type:res.assets[0].type, 
        fileName : res.assets[0].fileName.split('.')[0]
      };
      setPrev(res.assets[0].base64);
      setImage(image);
    });
  }

  const UploadImage = async () =>{
                ToastAndroid.show("Please Wait.", 
            ToastAndroid.SHORT,ToastAndroid.CENTER);
        var token = await AsyncStorage.getItem('token');

            const formData = new FormData();
      formData.append('IMG', MyImage);
console.log(formData);
const config = { headers: { 
  Authorization: 'Bearer '+ token,
  'Content-Type': 'multipart/form-data' } };
    await axios.put(APIRoutes['UpdateImageUser'], formData, config)
    .then(async (response) => {
    var Result = await Get(APIRoutes['GetMyAccountData']);
    Context.SetUserData(Result.data);
    setImageVisible(false);
    })
    .catch(errors => console.log(errors));
  }


  return (

      
  <View style={[style.MainView]}>
          <View style={{ alignItems: 'center'}}>
          <View style={style.header}>
            <TouchableOpacity onPress = {()=>{setImageVisible(false)}}>
            <Image
                source={require('../../../src/assets/Dialog/cancel.png')}
                style={{height: 30, width: 30}}
              />
            </TouchableOpacity>
          </View>
        </View>

<View style={{alignItems: 'center'}}>
              {Prev == '' ?
                                        Context.UserData.image == '' ?
                          <TouchableOpacity onPress={()=>{setImageVisible(true)}}>
                                               <Avatar.Image
                                source={require('../../../src/assets/Users/user.png')}
                                size={250}
                            />
                          </TouchableOpacity>
                         :
                          <TouchableOpacity onPress={()=>{setImageVisible(true)}} >
                                <Avatar.Image 
                                source={{
                                    uri: APIRoutes['Server_URL'] + Context.UserData.image
                                }}
                                size={250}
                            />
                          </TouchableOpacity>
                         
               :
                    <Avatar.Image 
                    style={{margin:50}}
                    size ={250}
                    source = {{uri: 'data:image/png;base64,'+Prev}}
                    />
               }
  <View style={{margin:10}}>
    <Button
      title = 'Choice Image'
      onPress ={()=>ChoiceImage()}
    />
  </View>

  {
      Prev == '' ?
      <Text>Upload</Text>
       :
    <Button
      title = 'Upload'
      onPress ={()=>UploadImage()}
    />
  }
  </View>
</View>
  )
}


export default EditImage;


const style = StyleSheet.create({
      header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  MainView :{
    justifyContent:'center',
  }
})
