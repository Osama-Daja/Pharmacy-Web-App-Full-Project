import React from 'react';
import {Text,View,Image,ActivityIndicator,ImageBackground} from 'react-native';

const LoadScreen = () =>{
  console.log('[LoadScreen] Rerender');

  return (
    <ImageBackground style={{flex:1,alignItems:'center',justifyContent:'center'}}
        source={require('../src/assets/Background/istockphoto-673276370-612x612.jpg')} resizeMode="cover">
     <Image style={{width:150,height:150,borderRadius:30}} 
     source={require('../src/assets/PublicImages/logo1.png')} />
     <ActivityIndicator size="large" color="#f13140" />
     <Text>Loading...</Text>
    </ImageBackground>
  )
}

export default LoadScreen;
