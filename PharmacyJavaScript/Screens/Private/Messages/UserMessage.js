
import React, { useEffect } from 'react';
import {Text,View,ScrollView, Image,TextInput,Button} from 'react-native';

import AuthenticateContext from '../../../Context/AuthenticateContext';
import ScrollUsers from './Component/ScrollUsers'

import APIRoutes from '../../../API/APIRoutes';
import {Get,Post} from '../../../API/APICalls';
import ItemMessage from './Component/ItemMessage';
import { useTheme } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const UserMessage = ({navigation}) =>{

  console.log('[UserMessage] Rerender');
  
  const Context = React.useContext(AuthenticateContext);
  const {colors} = useTheme();

    var [SelectedUser,SetSelectedUser] = React.useState(0);
    var [EmployeeList,SetEmployeeList] = React.useState([]);
  var [Message,SetMessage] = React.useState('');

   const GetEmployeesInBranch = async () =>{
   console.log('GetEmployeesInBranchA');
   var Result = await Get(APIRoutes['GetEmployeesInBranch']);
   
   console.log(Result.data);
   SetEmployeeList(Result.data);
   console.log('GetEmployeesInBranchB');
   console.log(EmployeeList);
    if(Context.Messages == 'undefined'){
   Context.Messages = [{}];
   Context.SetMessage(Items =>{ return [...Items]});
 }
 
 }


 const Submit = async () =>{
  if(Message == ''){
    alert('Enter Message Please.')
  }else
  {
    if(SelectedUser == 0){
      alert('Select User Please.')
    }else{
    await Post(APIRoutes['InsertMyMessage']
    ,{Text:Message,ToId : SelectedUser})

    var Body = {Id : 0,text : Message}
    let Messages = Context.Messages;
    let Index = Context.Messages
    .findIndex(a=>a.userId == SelectedUser)
    Messages[Index].messages.push(Body);
    Context.SetMessage(Messages);
    Context.SetMessage(Items =>{ return [...Items]});
    }
  }
}


 useEffect(()=>{
   if(Context.Role == 'Customer'){
GetEmployeesInBranch();
   }
 },[])

  return (
      <View style={{flex:1}}>

      <View style={{flex:0.6,
      borderBottomRightRadius:100,margin:30}}>
           <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
           >
          {
            Context.Role == 'Customer' ? 
            EmployeeList.map((item, index) => (
            <ScrollUsers 
            key = {index}
            item = {item}
            SetSelectedUser = {SetSelectedUser}
            />
          ))
            :
          Context.Messages.map((item, index) => (
            <ScrollUsers 
            key = {index}
            item = {item}
            SetSelectedUser = {SetSelectedUser}
            />
          ))
        }
           </ScrollView>
      </View>



      
      <View style={{backgroundColor:colors.MainColor ,flex:3
      ,borderTopRightRadius:30,borderTopLeftRadius:30}}>
      
          <ScrollView >
          {
            SelectedUser != 0 ?
                <View style={{marginTop:10}}>
          {
            
          Context.Messages.find(a=>a.userId == SelectedUser).messages.map((Message, index) => (
            <ItemMessage 
            key = {index}
            item = {Message}
            User = {Context.Messages.find(a=>a.userId == SelectedUser)}
            />
          ))
        }
</View>
             : null
          }
    {/* <View style={{marginTop:10}}>
          {
          Context.Messages.map((item, index) => (
            <ItemUserMessage 
            key = {index}
            item = {item}
            navigation = {navigation}
            />
          ))
        }
</View> */}
    </ScrollView>  
      </View>

       <View 
   style={{position: 'absolute', left: 0, right: 0, bottom: 0
   ,flex:1,flexDirection:'row',justifyContent:'space-between',width:'100%'}}
   behavior="position"
 >
  <TextInput
  style ={{backgroundColor:'#fff',width:'80%'}}
    onChangeText={text => {SetMessage(text)}}
    placeholder='Message'
    placeholderTextColor='black'
  />
  <View style={{width:'20%'}}>
  <TouchableOpacity onPress={()=> Submit()}
  style = {{backgroundColor:colors.Button,height:'100%',
  justifyContent:'center',alignItems:'center'}}>
  <Text style={{color:'#fff',fontSize:20,fontWeight:'bold'}}>Send</Text>
  </TouchableOpacity>
  </View>
  {/* <Button style={{width:300}} onPress={()=> Submit()} title='SEND' /> */}
 </View>

      </View>
  )
}

export default UserMessage;




