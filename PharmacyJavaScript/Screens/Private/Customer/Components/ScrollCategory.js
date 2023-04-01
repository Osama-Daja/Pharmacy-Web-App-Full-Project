
import { useTheme } from '@react-navigation/native';
import React from 'react';
import {Text,View,Image,TouchableOpacity} from 'react-native';

import APIRoutes from '../../../../API/APIRoutes';
import MainDialog from '../../../Dialog/MainDialog';
import CategoryTrendingProduct from '../Dialog/CategoryTrendingProduct';

const ScrollCategory = ({item}) =>{
console.log('[ScrollCategory] Rerender');
  const {colors} = useTheme();
      const [DetailsVisible, setDetailsVisible] = React.useState(false);

  return (
      <View style={{backgroundColor:colors.background}}>
        <MainDialog visible={DetailsVisible}>
      <CategoryTrendingProduct setDetailsVisible = {setDetailsVisible} item ={item}/>
      </MainDialog>

                 <TouchableOpacity style={{margin:10,
             flex:1,justifyContent:'center',alignItems:'center'}}
             onPress={()=>{setDetailsVisible(true)}}>
        <Image
          source= {{uri : APIRoutes['Server_URL'] + item.image}}
          style={{width: 55, height: 55, borderRadius: 25}}
        />
        <Text style={{width:100,alignItems:'center',color:colors.text}}>{item.name}</Text>
           </TouchableOpacity>    
      </View>

  )
}

export default ScrollCategory;
