
import React, { useEffect } from 'react';
import {Dimensions,Text,View,ScrollView,Button} from 'react-native';
import Carousel from 'react-native-snap-carousel';

import APIRoutes from '../../../API/APIRoutes';
import {Get} from '../../../API/APICalls';

import ItemSlider from './Components/ItemSlider';
import ScrollCategory from './Components/ScrollCategory';
import ItemTrendingProduct from './Components/ItemTrendingProduct';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MainDialog from '../../Dialog/MainDialog';
import DetailsOrder from './Dialog/DetailsOrder';
import AuthenticateContext from '../../../Context/AuthenticateContext';
import { useTheme } from '@react-navigation/native';
import I18n from 'i18n-js';

const HomeCustomer = () =>{
  console.log('[HomeCustomer] Rerender');
  
  const Context = React.useContext(AuthenticateContext);
  const {colors} = useTheme();

  var [ListCategory,SetListCategory] = React.useState([]);
  var [TrendingProductTop3,SetTrendingProductTop3] = React.useState([]);
  var [ListTrendingProduct,SetListTrendingProduct] = React.useState([]);

  var [VisibilityBag,SetVisibilityBag] = React.useState(false);

  const GetListCategory = async () =>{
    var Result = await Get(APIRoutes['GetAllCategory']);
    SetListCategory(Result.data);
  }
  const GetTrendingProductTop3 = async () =>{
    var Result = await Get(APIRoutes['TrendingProductTop3']);
    SetTrendingProductTop3(Result.data);
  }
  const GetAllTrendingProduct = async () =>{
    var Result = await Get(APIRoutes['GetAllTrendingProduct']);
    SetListTrendingProduct(Result.data);
  }

  const GetLastBag = async () =>{
    var Result = await Get(APIRoutes['GetMyLastBagByCustomer']);
    Context.SetOrderBag(Result.data);
  }

  useEffect( ()=>{
     GetListCategory();
     GetTrendingProductTop3();
     GetAllTrendingProduct();
     GetLastBag();
  },[]);

  const RenderSlider = ({item, index}) => {
    return <ItemSlider data={item} />;
  };
  
  return (
    <View style = {{flex:1}}>

      <MainDialog visible={VisibilityBag}>
      <DetailsOrder SetVisibilityBag = {SetVisibilityBag} />
      </MainDialog>

       <ScrollView style={{backgroundColor:colors.background,flex:1}}>
    <View style ={{marginTop:50,backgroundColor:'#f13140'}}>
        <Carousel 
          data={TrendingProductTop3}
          renderItem={RenderSlider}
          sliderWidth={Dimensions.get('window').width - 40}
          itemWidth={300}
          loop={true}
        />
    </View>

    <View style={{justifyContent:'center',alignItems:'center'
    ,backgroundColor:'#0035FF',height:70,marginTop:20}}>
      <Text style={{fontSize:30,fontWeight:'bold',color:'#fff'}}>
        {I18n.t('Categories')}
      </Text>
    </View>

          <View style={{backgroundColor:'#fff' ,height:100,
      borderBottomRightRadius:100,margin:10}}>
           <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
           >
          {
          ListCategory.map((item, index) => (
            <ScrollCategory 
            key = {index}
            item = {item}
            />
          ))
        }
           </ScrollView>
      </View>


      
    <View style={{justifyContent:'center',alignItems:'center'
    ,backgroundColor:'#0035FF',height:70,marginTop:20}}>
      <Text style={{fontSize:30,fontWeight:'bold',color:'#fff'}}>
        {I18n.t('TrendingProducts')}
      </Text>
    </View>

          <View style={{width:'100%',flexDirection:'row',flexWrap:'wrap'
          ,}}
           >
          {
                        ListTrendingProduct.map((item, index) => (
            <ItemTrendingProduct 
            key = {index}
            item = {item}
            />
          ))
        }
        </View>
    </ScrollView>

{
  Context.OrderBag.bag.status == 1 || Context.OrderBag.bag.status == 3 
  ? 
                        <View style=
                    {{ borderWidth:1,position:'absolute'
                    ,bottom:0,alignSelf:'flex-end',
                    borderRadius:10,backgroundColor:'#fff' }}>
                    <TouchableOpacity
                    style ={{height:60,width:60,justifyContent:'center'
                    ,alignItems:'center'}}
                    onPress = {()=>{SetVisibilityBag(true)}}>
                          <FontAwesome
      name="truck"
      size={35}
      color="#f13140"
    />
                    </TouchableOpacity>
        </View>  : null
}

    </View>

  )
}

export default HomeCustomer;
