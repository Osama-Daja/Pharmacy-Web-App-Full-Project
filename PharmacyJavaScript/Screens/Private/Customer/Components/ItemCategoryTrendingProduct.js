import React from 'react';
import {StyleSheet,Modal,View, Text, Image, TouchableOpacity,Animated} from 'react-native';
import { windowWidth } from '../../../../src/utils/Dimensions';
import APIRoutes from '../../../../API/APIRoutes';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DetailsProduct from '../Dialog/DetailsProduct';
import MainDialog from '../../../Dialog/MainDialog';

export default function ItemCategoryTrendingProduct({item}) {

  console.log('[ItemCategoryTrendingProduct] Rerender');

  const [DetailsVisible, setDetailsVisible] = React.useState(false);

    
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
          <Text
            style={{
              color: '#333',
              fontFamily: 'Roboto-Medium',
              fontSize: 14,
            }}>
            {item.name}
          </Text>
          <Text style={{marginLeft:20}}>
              {item.price} $
          </Text>
        </View>
        </View>
      </View>

    </View>
  );
}



const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});


