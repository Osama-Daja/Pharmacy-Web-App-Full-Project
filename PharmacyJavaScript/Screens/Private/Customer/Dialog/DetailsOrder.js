import React from "react";
import { View,TouchableOpacity,Image,Text,StyleSheet,ScrollView, ToastAndroid } from "react-native";

import APIRoutes from "../../../../API/APIRoutes";
import {Post,Get} from '../../../../API/APICalls'
import AuthenticateContext from "../../../../Context/AuthenticateContext";
import ItemOrderBag from "../Components/ItemOrderBag";
import MainDialog from "../../../Dialog/MainDialog";
import ConfirmDialog from "../../../Dialog/ConfirmDialog";


const DetailsOrder = ({SetVisibilityBag}) =>{
  console.log('[DetailsOrder] Rerender');
        const Context = React.useContext(AuthenticateContext);

    var [VisibleCancel,SetVisibleCancel] = React.useState(false);
    var [VisibleConfirm,SetVisibleConfirm] = React.useState(false);

    const CancelOrder = async () =>{
        ToastAndroid.show("Please Wait.", 
        ToastAndroid.SHORT,ToastAndroid.CENTER);
        var Result = await Post(APIRoutes['CancelOrderCustomer'],{});
        if(Result.status == 208){
        ToastAndroid.show("You do't have bag in way.", 
        ToastAndroid.SHORT,ToastAndroid.CENTER);
        }else{
        ToastAndroid.show("We are sorry.", 
        ToastAndroid.SHORT,ToastAndroid.CENTER);
          var Result = await Get(APIRoutes['GetMyLastBagByCustomer']);
          Context.SetOrderBag(Result.data);
        }
        CancelCancelOrder();
        SetVisibilityBag(false);
    }

    const ConfirmOrder = async () =>{
        ToastAndroid.show("Please Wait.", 
        ToastAndroid.SHORT,ToastAndroid.CENTER);
        var Result = await Post(APIRoutes['DoneOrderCustomer'],{});
        if(Result.status == 208){
        ToastAndroid.show("You do't have bag in way.", 
        ToastAndroid.SHORT,ToastAndroid.CENTER);
        }else{
        ToastAndroid.show("Thanks.", 
        ToastAndroid.SHORT,ToastAndroid.CENTER);
          var Result = await Get(APIRoutes['GetMyLastBagByCustomer']);
          Context.SetOrderBag(Result.data);
        }
        CancelConfirmOrder();
        SetVisibilityBag(false);
    }

        const CancelCancelOrder = async () =>{
            SetVisibleCancel(false);
    }
            const CancelConfirmOrder = async () =>{
            SetVisibleConfirm(false);
    }


    return (
        <View>

      <MainDialog visible={VisibleCancel}>
      <ConfirmDialog SetVisible = {SetVisibleCancel} Ok = {CancelOrder} Cancel = {CancelCancelOrder} />
      </MainDialog>

      <MainDialog visible={VisibleConfirm}>
      <ConfirmDialog SetVisible = {SetVisibleConfirm} Ok = {ConfirmOrder} Cancel = {CancelConfirmOrder} />
      </MainDialog>

      <View style={{ alignItems: 'center'}}>
          <View style={{
                  width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
          }}>
            <TouchableOpacity onPress={() => SetVisibilityBag(false)}>
              <Image
                source={require('../../../../src/assets/Dialog/cancel.png')}
                style={{height: 30, width: 30}}
              />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView >
      <View style={{margin:20,flexDirection:'row',backgroundColor:'#fff'
      ,borderRadius:50}}>
      <View>
      {Context.OrderBag.delivery.image == '' ?
       <Image style={[Style.imageDelivery]} source = {require('../../../../src/assets/Users/user.png')}/>
       :
        <Image style={[Style.imageDelivery]} source = {{uri: APIRoutes['Server_URL'] + Context.OrderBag.delivery.image}}/>
       } 
      </View>
      <View style={{flexDirection:'column',margin:15}}>
        <Text style={{flex:1}}>Name : {Context.OrderBag.delivery.nickName}</Text>
        <Text style={{flex:1}}>Phone Number : {Context.OrderBag.delivery.phoneNumber}</Text>
      </View>
      </View>

      <View style={{margin:20,flexDirection:'row',backgroundColor:'#f13140'
      ,borderRadius:50,height:80,alignItems:'center'}}>
      <View>
        <Image style={[Style.imageDelivery]} source = {require('../../../../src/assets/DeliveryImages/tag.png')}/>
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
          <ItemOrderBag
          key = {Index}
          item = {item}
           />
        ))
      }
</View>

<View>
{
  Context.OrderBag.bag.status == 1 ? 
        <TouchableOpacity style={[Style.signIn]}
        onPress={()=>{
            SetVisibleCancel(true);
        }}>
            <Text style={{fontSize:25,fontWeight:'bold',color:'#f13140'}}>
            Cancel </Text>
        </TouchableOpacity>
        :
                <TouchableOpacity style={[Style.signIn]}
        onPress={()=>{
            SetVisibleConfirm(true);
        }}>
            <Text style={{fontSize:25,fontWeight:'bold',color:'#f13140'}}>
            Confirm Order </Text>
        </TouchableOpacity>
}
</View>
    </ScrollView>

        </View>
    )
}



var Style = StyleSheet.create({
  imageDelivery:{
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


export default DetailsOrder;







// const styles = StyleSheet.create({
//   header: {
//     width: '100%',
//     height: 40,
//     alignItems: 'flex-end',
//     justifyContent: 'center',
//   },
// });



