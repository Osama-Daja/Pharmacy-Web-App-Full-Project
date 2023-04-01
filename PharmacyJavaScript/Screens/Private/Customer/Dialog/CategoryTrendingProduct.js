import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import APIRoutes from '../../../../API/APIRoutes';
import {Get} from '../../../../API/APICalls'
import ItemCategoryTrendingProduct from '../Components/ItemCategoryTrendingProduct';

const CategoryTrendingProduct = ({setDetailsVisible,item}) => {
console.log('[CategoryTrendingProduct] Rerender');
  var [ListProduct,SetListProduct] = React.useState([]);

  const GetByCategoryIdTrendingProduct = async () =>{
    var Result = await Get(APIRoutes['GetByCategoryIdTrendingProduct'] + '/' + item.id)
    SetListProduct(Result.data)
  }

  useEffect(()=>{
GetByCategoryIdTrendingProduct();
  },[])

  return (
    <ScrollView >
        <View style={{ alignItems: 'center'}}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setDetailsVisible(false)}>
              <Image
                source={require('../../../../src/assets/Dialog/cancel.png')}
                style={{height: 30, width: 30}}
              />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={{alignItems: 'center'}}>
          <Image
           source={{uri: APIRoutes['Server_URL'] + item.image}}
            style={{height: 150, width: 150, marginVertical: 10}}
          />
        </View>
        <View style={{alignItems:'center',backgroundColor:'#f13140'
        ,borderRadius:30,padding:30}}>
            <Text style={{fontSize:25,fontWeight:'bold',color:'#fff'}}>
            {item.name}
            </Text>
        </View>
        

        <View style={{alignItems:'center',backgroundColor:'#D5D8DC'
        ,borderRadius:30,marginTop:30,borderWidth:1,
        borderColor:'#f13140'}}>
            <Text style={{fontSize:18,padding:15}}>
            {item.description}
            </Text>
        </View>

        <View style={{marginTop:30}}>
          {
          ListProduct.map((item, index) => (
            <ItemCategoryTrendingProduct
            key = {index}
            item = {item}
             />
          ))
        }
        </View>



    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

export default CategoryTrendingProduct;
