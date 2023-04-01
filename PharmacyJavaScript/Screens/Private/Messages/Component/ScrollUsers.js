
import React from 'react';
import {Text,View,Image,TouchableOpacity} from 'react-native';

import AuthenticateContext from '../../../../Context/AuthenticateContext';
import APIRoutes from '../../../../API/APIRoutes';

const ScrollUsers = ({item,SetSelectedUser}) =>{

  console.log('[ScrollUsers] Rerender');
  
  const Context = React.useContext(AuthenticateContext);

  const SelectUser = ()=>{
    if(item.id == undefined || item.id == 0){item.id = item.userId;}
            var Check = Context.Messages.find(a=>a.userId == item.id)

                      var NewUser = {
            email : '',
            image : item.image,
            nickName : item.nickName,
            phoneNumber : '',
            userId : item.id,
            messages : [],
          }

        if(Check == null){
        Context.Messages.push(NewUser);
        }

        Context.SetMessage(Items =>{ return [...Items]});
        // navigation.navigate('Message',{item : NewUser})
        console.log(item);
        SetSelectedUser(item.id);
        console.log(item.id);

      }

  return (
           <TouchableOpacity style={{margin:10,
             flex:1,justifyContent:'center',alignItems:'center'}}
             onPress={()=>{
               SelectUser()
               }}>
             {
               item.image == '' ? 
          item.role == 'Admin' ? 
                    <Image
          source= {require('../../../../src/assets/Users/admin.png')}
          style={{width: 55, height: 55, borderRadius: 25}}
        />
          :
                    <Image
          source= {require('../../../../src/assets/Users/track.png')}
          style={{width: 55, height: 55, borderRadius: 25}}
        />
               :
                                                   <Image
          source= {{uri : APIRoutes['Server_URL'] + item.image}}
          style={{width: 55, height: 55, borderRadius: 25}}
        />
             }
        <Text>{item.nickName}</Text>
        {
          Context.Role != 'Customer' ? null :
          item.role == 'Admin' ? 
                    <Image
          source= {require('../../../../src/assets/Users/admin.png')}
          style={{width: 25, height: 25, borderRadius: 25}}
        />
          :
                    <Image
          source= {require('../../../../src/assets/Users/track.png')}
          style={{width: 25, height: 25, borderRadius: 25}}
        />
        }
           </TouchableOpacity>
  )
}

export default ScrollUsers;
