import React from "react";
import { View,Image,TouchableOpacity,Text } from "react-native";

const ConfirmDialog = ({Ok,Cancel,SetVisible}) =>{
    return (
        <View>

        <View>
            <Text style={{fontSize:25,fontWeight:'bold',margin:20}}>
            Are You Sure : </Text>
        </View>

        <View style={{flexDirection:'row',
        width:'100%',padding:20,height:70}}>
        <TouchableOpacity onPress={()=>{Ok()}}
        style ={{width:'50%',alignItems:'center',justifyContent:'center'
        ,borderWidth:2,borderRadius:20,borderColor:'#f13140'}}>
            <Text style={{fontWeight:'bold',fontSize:20,color:'#000'}}>Ok</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{Cancel()}}
        style ={{width:'50%',alignItems:'center',justifyContent:'center'
        ,borderWidth:2,borderRadius:20,borderColor:'#f13140'}}>
            <Text style={{fontWeight:'bold',fontSize:20,color:'#000'}}>
            Cancel</Text>
        </TouchableOpacity>
        </View>
        </View>
    )
}


export default ConfirmDialog;
