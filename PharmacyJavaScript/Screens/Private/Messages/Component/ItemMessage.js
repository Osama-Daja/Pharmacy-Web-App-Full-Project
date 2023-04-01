
import React from 'react';
import {Text,View,ScrollView,StyleSheet,Image} from 'react-native';

import APIRoutes from '../../../../API/APIRoutes';

import AuthenticateContext from '../../../../Context/AuthenticateContext';

const ItemMessage = ({item,User}) =>{

  console.log('[ItemMessage] Rerender');

    const Context = React.useContext(AuthenticateContext);
    var MainStyle = Style.defaultView;
    //ar [MainStyle,setMainStyle] = React.useState(Style.defaultView);

  if(item.Id == 0){
    //setMainStyle(Style.UserView);
    MainStyle = Style.UserView;
    item.image = Context.UserData.image
  }else{
    MainStyle = Style.ServerView;
    //setMainStyle(Style.ServerView);
    item.image = User.image;
  }
  return (
<View>
      {item.Id == 0 ? 
              <View style={MainStyle}>
        <View 
        style = {{flex:1}}
        >
        <View style={{
            borderBottomWidth:5,
            borderBottomColor:'#f13140'}}>
        <View>
                  <Text 
            style={[{
                fontWeight:'bold',
              color: '#333',
              fontFamily: 'Roboto-Medium',
              fontSize: 14,textAlign:'right'},]}>
            {item.text}
          </Text>
        </View>
        </View>
        </View>

              <View style={{
        alignItems: 'center',flex:1
        }}>
        {item.image == '' ?
                <Image
          source= {require('../../../../src/assets/Users/user.png')}
          style={{width: 55, height: 55, borderRadius: 10}}
        />
         :
                 <Image
          source= {{uri : APIRoutes['Server_URL'] + item.image}}
          style={{width: 55, height: 55, borderRadius: 10}}
        />}
      </View>  
    </View>   :
            <View style={MainStyle}>
      <View style={{
        alignItems: 'center',flex:1
        }}>
        {item.image == '' ?
                <Image
          source= {require('../../../../src/assets/Users/user.png')}
          style={{width: 55, height: 55, borderRadius: 10}}
        />
         :
                 <Image
          source= {{uri : APIRoutes['Server_URL'] + item.image}}
          style={{width: 55, height: 55, borderRadius: 10}}
        />}
      </View>  
        <View 
        style = {{flex:1}}
        >
        <View style={{
            borderBottomWidth:5,
            borderBottomColor:'#f13140'}}>
        <View>
                  <Text 
            style={[{
                fontWeight:'bold',
              color: '#333',
              fontFamily: 'Roboto-Medium',
              fontSize: 14,},]}>
            {item.text}
          </Text>
        </View>
        </View>
        </View>
    </View>   
    }
</View>


  )
}
        {/* <View style={Style.defaultView}>
      <View style={{
        alignItems: 'center',flex:1
        }}>
        {item.image == '' ?
                <Image
          source= {require('../../../../src/assets/Users/user.png')}
          style={{width: 55, height: 55, borderRadius: 10}}
        />
         :
                 <Image
          source= {{uri : APIRoutes['Server_URL'] + item.image}}
          style={{width: 55, height: 55, borderRadius: 10}}
        />}
      </View>  
        <View 
        style = {{flex:1}}
        >
        <View style={{
            borderBottomWidth:5,
            borderBottomColor:'#f13140'}}>
        <View>
                  <Text 
            style={[{
                fontWeight:'bold',
              color: '#333',
              fontFamily: 'Roboto-Medium',
              fontSize: 14,},]}>
            {item.text}
          </Text>
        </View>
        </View>
        </View>
    </View>    */}


export default ItemMessage;


const Style = StyleSheet.create({
  defaultView :{
            height:70,
        flexDirection:'row',
      alignItems: 'center',
      marginBottom: 20, 
      backgroundColor:'#fff',
      flex : 1,
      textAlign :'right',
  },
  UserView :{
            height:70,
        flexDirection:'row',
      alignItems: 'center',
      marginBottom: 20, 
      backgroundColor:'rgba(255, 255, 255, 0.86)',
      flex : 1,
      textAlign :'right',
  },
  ServerView:{
      height:70,
      flexDirection:'row',
      alignItems: 'center',
      marginBottom: 20, 
      backgroundColor:'#fff',
      flex : 1,
      textAlign :'right',
  }
})

