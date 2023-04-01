
import React from "react";
import { View,Text,Image } from "react-native-animatable";
import { TouchableOpacity } from "react-native-gesture-handler";

import APIRoutes from '../../../../API/APIRoutes';
import MainDialog from "../../../Dialog/MainDialog";
import DetailsTrendingProduct from "../Dialog/DetailsTrendingProduct";

const ItemTrendingProduct = ({item}) =>{
console.log('[ItemTrendingProduct] Rerender');
      const [DetailsVisible, setDetailsVisible] = React.useState(false);


    return (
        <View style={{backgroundColor:'#f13140'
        ,width:'50%' , marginTop:50}}>

        <MainDialog visible={DetailsVisible}>
      <DetailsTrendingProduct setDetailsVisible = {setDetailsVisible} item ={item}/>
      </MainDialog>

        <TouchableOpacity onPress={()=>{setDetailsVisible(true)}}>
        <Image
        source = {{uri : APIRoutes['Server_URL'] + item.image}}
        style = {{height:250,width:'100%',backgroundColor:'#000'}}
         />
        </TouchableOpacity>
        <View style ={{justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:20,fontWeight:'bold',
            color:'#000'}}>
            {item.name}
            </Text>
        </View>
        </View>
    )
}


export default ItemTrendingProduct;
