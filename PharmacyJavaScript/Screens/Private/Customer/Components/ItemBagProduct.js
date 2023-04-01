import React, { useEffect } from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import { windowWidth } from '../../../../src/utils/Dimensions';
import APIRoutes from '../../../../API/APIRoutes';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AuthenticateContext from '../../../../Context/AuthenticateContext';

import DetailsProduct from '../Dialog/DetailsProduct';
import MainDialog from '../../../Dialog/MainDialog';

export default function ItemBagProduct({item,SetMyBag}) {

  console.log('[ItemBagProduct] Rerender');

  //  const [Quantity,SetQuantity] = React.useState(0);
   const [DetailsVisible, setDetailsVisible] = React.useState(false);
    //  const Context = React.useContext(AuthenticateContext);

    const Plus = () =>{
      if(item.Quantity == undefined){item.Quantity = 0;}
        item.Quantity++;
       // SetQuantity(item.Quantity);

      SetMyBag(items =>{
        return items.filter(a=>true)
      });
    }
        const Minus = () =>{
          if(item.Quantity == undefined){item.Quantity = 0;}
            if(item.Quantity > 0){
        item.Quantity--;
        //SetQuantity(item.Quantity);
            }
                  SetMyBag(items =>{
        return items.filter(a=>true)
      });
    }

    const RemoveProduct = () => {
      SetMyBag(items =>{
        return items.filter(a=>a.id != item.id)
      });
    }

  return (
    <View style={{
      flexDirection:'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    }}>

          <MainDialog visible={DetailsVisible}>
      <DetailsProduct setDetailsVisible = {setDetailsVisible} item ={item}/>
      </MainDialog>


      <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
        <Image
          source= {{uri : APIRoutes['Server_URL'] + item.image}}
          style={{width: 55, height: 55, borderRadius: 10, marginRight: 8}}
        />
        <View 
        style={{width: windowWidth - 220}}
        >
        <View style={{flexDirection:'row'}}>
          <Text >
              {item.price} $
          </Text>
        </View>

          <View style={{flexDirection:'row'}}>
          <Image 
          source= {{uri : APIRoutes['Server_URL'] + item.categoryImage}}
          style={{width: 20, height: 20, borderRadius: 10, marginRight: 8}} />
          </View>
        </View>
      </View>

<View style={{flexDirection:'row'}}>
      <TouchableOpacity style={{
        backgroundColor:'#0025FF',
        padding:10,
        width: 50,
        borderRadius: 10,
      }} onPress={()=>{
        setDetailsVisible(true)
      }}>
          <FontAwesome 
        name="info"
        color='#fff'
        size={20}  
        style={{
          color: '#fff',
          textAlign: 'center',
          fontSize: 20,
        }}
    />
      </TouchableOpacity>
      <TouchableOpacity style={{
        backgroundColor:'#FF0000',
        padding:10,
        width: 50,
        borderRadius: 10,
      }} onPress={()=>{Minus()}}>
          <FontAwesome 
        name="minus"
        color='#fff'
        size={20}  
        style={{
          color: '#fff',
          textAlign: 'center',
          fontSize: 20,
        }}
    />

      </TouchableOpacity>

          <Text style={{margin:10,fontSize:20}}>
    {item.Quantity == undefined ? 0 : item.Quantity}
    </Text>

            <TouchableOpacity style={{
        backgroundColor:'#11FF00',
        padding:10,
        width: 50,
        borderRadius: 10,
      }} onPress={()=>{Plus()}}>
                <FontAwesome 
        name="plus"
        color='#fff'
        size={20}  
        style={{
          color: '#fff',
          textAlign: 'center',
          fontSize: 20,
        }}
    />
      </TouchableOpacity>

                  <TouchableOpacity style={{
        backgroundColor:'#FF0000',
        padding:10,
        width: 50,
        borderRadius: 10,
      }} onPress={()=>{RemoveProduct(item)}}>
                <FontAwesome 
        name="trash-o"
        color='#fff'
        size={20}  
        style={{
          color: '#fff',
          textAlign: 'center',
          fontSize: 20,
        }}
    />
      </TouchableOpacity>
</View>
    </View>
  );
}
