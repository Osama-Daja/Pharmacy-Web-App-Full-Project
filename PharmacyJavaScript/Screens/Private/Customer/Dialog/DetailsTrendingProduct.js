import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import APIRoutes from '../../../../API/APIRoutes';

const DetailsTrendingProduct = ({setDetailsVisible,item}) => {
   console.log('[DetailsTrendingProduct] Rerender');
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
            <Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}}>
            {item.price} $
            </Text>
        </View>

        <View style={{alignItems:'center',backgroundColor:'#f13140'
        ,borderRadius:30,marginTop:30,flexDirection:'row',
        padding:30}}>
                  <Image
           source={{uri: APIRoutes['Server_URL'] + item.categoryImage}}
            style={{height: 25, width: 30, marginVertical: 10}}
          />
            <Text style={{fontSize:25,fontWeight:'bold',color:'#fff'
            ,marginLeft:20}}>
            {item.categoryName}
            </Text>
        </View>

        <View style={{alignItems:'center',backgroundColor:'#D5D8DC'
        ,borderRadius:30,marginTop:30,}}>
            <Text style={{fontSize:18,padding:15}}>
            {item.categoryDescription}
            </Text>
        </View>



                <View style={{alignItems:'center',backgroundColor:'#f13140'
        ,borderRadius:30,marginTop:30,
        padding:30}}>
            <Text style={{fontSize:15,fontWeight:'bold',color:'#fff'
            ,marginLeft:20}}>
            {item.quantity} Sales
            </Text>
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

export default DetailsTrendingProduct;
