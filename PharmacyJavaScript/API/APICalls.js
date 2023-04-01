import AsyncStorage from '@react-native-community/async-storage';
import axios from 'react-native-axios';

        const Get = async (Route) => {
          console.log(Route);
        var token = await AsyncStorage.getItem('token');
if(token != null){
                        let Result = await axios.get(Route,{
            headers: {
    Authorization: 'Bearer '+ token,
    'Content-Type': 'application/json'
  },
            });
            return Result;
}else
{
              let Result = await axios.get(Route);
            return Result;
}

        }
    
    
    const Post = async (Route,body) => {
      console.log(Route);
              var token = await AsyncStorage.getItem('token');
if(token != null){
                var Result = await axios.post(Route,body,{
            headers: {
    Authorization: 'Bearer '+ token,
    'Content-Type': 'application/json'
  },
        }).then( (response) => {
            return response;
        },Error =>{
          switch(Error.message){
            case 'Request failed with status code 400' :{
              return {status: 400};
            }
            case 'Request failed with status code 404' :{
              return {status: 404};
            }case 'Request failed with status code 403' :{
              return {status: 403};
            }
            case 'Request failed with status code 405' :{
              return {status: 405};
            }
            case 'Request failed with status code 406' :{
              return {status: 406};
            }
          }
        });
        return Result;
      }else
      {
        
        var Result = await axios.post(Route,body)
        .then( (response) => {
            return response;
        },Error =>{
          switch(Error.message){
            case 'Request failed with status code 400' :{
              return {status: 400};
            }
            case 'Request failed with status code 404' :{
              return {status: 404};
            }case 'Request failed with status code 403' :{
              return {status: 403};
            }
            case 'Request failed with status code 405' :{
              return {status: 405};
            }
            case 'Request failed with status code 406' :{
              return {status: 406};
            }
          }
        })
        return Result;
      }
  };




      const Put = async (Route,body) => {
              var token = await AsyncStorage.getItem('token');
if(token != null){
                var Result = await axios.put(Route,body,{
            headers: {
    Authorization: 'Bearer '+ token,
    'Content-Type': 'application/json'
  },
        }).then( (response) => {
            return response;
        },Error =>{
          switch(Error.message){
            case 'Request failed with status code 404' :{
              return {status: 404};
            }case 'Request failed with status code 403' :{
              return {status: 403};
            }
            case 'Request failed with status code 405' :{
              return {status: 405};
            }
            case 'Request failed with status code 406' :{
              return {status: 406};
            }
            default: {
              return {status: 500};
            }
          }
        });
        return Result;
      }else
      {
        var Result = await axios.put(Route,body)
        .then( (response) => {
            return response;
        },Error =>{
          switch(Error.message){
            case 'Request failed with status code 404' :{
              return {status: 404};
            }case 'Request failed with status code 403' :{
              return {status: 403};
            }
            case 'Request failed with status code 405' :{
              return {status: 405};
            }
            case 'Request failed with status code 406' :{
              return {status: 406};
            }
            default: {
              return {status: 500};
            }
          }
        })
        return Result;
      }
  };



  module.exports = {
      Get : Get,
      Post : Post,
      Put : Put
  }


