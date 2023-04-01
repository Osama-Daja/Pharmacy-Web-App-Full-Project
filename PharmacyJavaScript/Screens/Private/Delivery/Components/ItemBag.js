
import React from 'react';
import {Text,View,Image} from 'react-native';

import APIRoutes from '../../../../API/APIRoutes';

const ItemBag = ({item}) =>{
console.log('[ItemBag] Rerender');

  return (
    <View style={{flexDirection: 'row', alignItems: 'center', flex: 1,
    margin:10}}>
    <View style={{flex:1}}>
                <Image style={{height:30,width:30}}
         source = {{uri: APIRoutes['Server_URL'] + item.productImage}}/>
    </View>
    <View style={{flex:1}}><Text>{item.productName}</Text></View>
    <View style={{flex:1}}><Text>{item.productPrice} $</Text></View>
    <View style={{flex:1}}><Text>{item.quantity}</Text></View>
    </View>
  )
}

export default ItemBag;
