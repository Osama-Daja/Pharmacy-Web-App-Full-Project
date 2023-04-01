
import React, { useEffect } from 'react';
import {FlatList,StyleSheet, Text,View,Image,ScrollView,TouchableOpacity} from 'react-native';
import APIRoutes from '../../../API/APIRoutes';
import {Get,Post} from '../../../API/APICalls';
import ItemBag from './Components/ItemBag';
import AuthenticateContext from '../../../Context/AuthenticateContext';
import MainDialog from '../../Dialog/MainDialog';
import ConfirmDialog from '../../Dialog/ConfirmDialog';

const HomeDelivery = () =>{

  console.log('[HomeDelivery] Rerender');

    const Context = React.useContext(AuthenticateContext);

    var [Visible,SetVisible] = React.useState(false)

      const GetOrderBag = async () =>{
var Result = await Get(APIRoutes['GetMyLastBagByDelivery'])
var Bag = Result.data;
if(Bag.bag.status == 1){
Context.SetOrderBag({bag : Bag.bag,delivery:Bag.delivery});
}
    }

    useEffect(()=>{
    GetOrderBag();}
    ,[])



    const Ok = async () =>{
      var Result = await Post(APIRoutes['DoneOrderDelivery'],{});

      console.log(Result);

      switch(Result.status){
        case 208 :{ alert('You Do Not Have Order');break;}
        case 200 :{
          Context.SetOrderBag(
            {
                  bag : {
      id : 0,
      currentDate : '',
      totalPrice : 0,
      paymentType : false,
      status : 0,
      deliveryId : 0,
      customerId : 0,
      nickName : '',
      phoneNumber : '',
      image : '',
      latitude : 0,
      longitude : 0,
      product : []
    },
    delivery :{
      image : '',
      nickName : '',
      phoneNumber : ''
    }
            }
          )
          break;
        }
      }
    };

    const Cancel = async () =>{
            SetVisible(false);
    }

    if(Context.OrderBag.bag.id == 0){
      return ( 
      <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
       <Text>Empty</Text>
       </View>)
    }else
    {
      return (
        <ScrollView >

      <MainDialog visible={Visible}>
      <ConfirmDialog SetVisible = {SetVisible} Ok = {Ok} Cancel = {Cancel} />
      </MainDialog>

      <View style={{margin:20,flexDirection:'row',backgroundColor:'#fff'
      ,borderRadius:50}}>
      <View>
      {Context.OrderBag.bag.image == '' ?
       <Image style={[Style.imageCustomer]} source = {require('../../../src/assets/Users/user.png')}/>
       :
        <Image style={[Style.imageCustomer]} source = {{uri: APIRoutes['Server_URL'] + Context.OrderBag.bag.image}}/>
       } 
      </View>
      <View style={{flexDirection:'column',margin:15}}>
        <Text style={{flex:1}}>Name : {Context.OrderBag.bag.nickName}</Text>
        <Text style={{flex:1}}>Phone Number : {Context.OrderBag.bag.phoneNumber}</Text>
      </View>
      </View>

      <View style={{margin:20,flexDirection:'row',backgroundColor:'#f13140'
      ,borderRadius:50,height:80,alignItems:'center'}}>
      <View>
        <Image style={[Style.imageCustomer]} source = {require('../../../src/assets/DeliveryImages/tag.png')}/>
      </View>
      <View style={{margin:15}}>
      <Text style={{fontSize:13}}>Total Price : 
      <Text style ={{fontWeight:'bold'}}>{Context.OrderBag.bag.totalPrice} $</Text>
      </Text>
      </View>
            <View>
        {Context.OrderBag.bag.paymentType ? <Text style={{fontWeight:'bold'}}>Payment Card</Text>
        :
                <Text style={{fontWeight:'bold'}}>Cash</Text>}

                      <View style={{alignItems:'center'}}>
        <Text style={{alignItems:'center'}}>{Context.OrderBag.bag.currentDate}</Text>
      </View>
      </View>
      </View>

<View style={{margin:20,
shadowOpacity: 0.58,
shadowRadius: 16.00,backgroundColor:'#fff',borderRadius:20}}>
      {
        Context.OrderBag.bag.product.map((item,Index) =>(
          <ItemBag
          key = {Index}
          item = {item}
           />
        ))
      }
</View>

        <TouchableOpacity style={[Style.signIn]}
        onPress={()=>{SetVisible(true)}}>
            <Text style={{fontSize:25,fontWeight:'bold',color:'#f13140'}}>
            Done</Text>
        </TouchableOpacity>
    </ScrollView>
      )
    }

}

export default HomeDelivery;


var Style = StyleSheet.create({
  imageCustomer:{
    height:80,
    width:80
  },
      signIn: {
        marginTop:20,
        backgroundColor:'white',
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor:'#f13140',
        borderWidth:2
    },
})
