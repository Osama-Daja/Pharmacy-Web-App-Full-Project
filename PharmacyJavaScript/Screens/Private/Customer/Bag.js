
import React from 'react';
import {Image,Text,View,ScrollView,TouchableOpacity,StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// import AuthenticateContext from '../../../Context/AuthenticateContext';
import ItemBagProduct from './Components/ItemBagProduct';

import APIRoutes from '../../../API/APIRoutes';
import {Post} from '../../../API/APICalls';

const Bag = ({setBagVisible,MyBag,SetMyBag}) =>{
  console.log('[Bag] Rerender');
    const [PaymentType,SetPaymentType] = React.useState(false);


  // const Context = React.useContext(AuthenticateContext);

  const ChangePaymentType = () =>{
      SetPaymentType(!PaymentType);
  }

  const Submit = async () =>{

       if(MyBag.length == 0){
           alert('You do not have products');
       }else
       {
           if(MyBag.find(a=>a.Quantity == 0) != null){
               alert('You have product with 0 Quantity.')
           }else
           {
                 var Body = {
          PaymentType : PaymentType,
          OrderList : MyBag.map((item)=>{
              return {Quantity : item.Quantity, ProductId : item.id}
          })
          };
          var Result = await Post(APIRoutes['CreateBagByCustomerId'],Body);
          switch (Result.status){
              case 405 :{alert('You Already Have Bag In Way.');break;}
              case 404 :{alert('Your Time Is Out Of Work Hours.');break;}
              case 406 :{alert('One Of Product Is Empty In Branch.');break;}
              default :{
                  alert('Success');
                      SetMyBag(prevItems=>{
                        return [];
                      });
              }
          }
           }
       }
  }
  
  return (
    <ScrollView >

            <View style={{ alignItems: 'center'}}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setBagVisible(false)}>
              <Image
                source={require('../../../src/assets/Dialog/cancel.png')}
                style={{height: 30, width: 30}}
              />
            </TouchableOpacity>
          </View>
        </View>

        
    <View style={{marginTop:30}}>
          {
          MyBag.map((item, index) => (
            <ItemBagProduct
            key = {index}
            item = {item}
            SetMyBag = {SetMyBag}
             />
          ))
        }
</View>

<View>
                <TouchableOpacity style={{
        backgroundColor:'blue',
        padding:10,
        width: '100%',
        height:40, flex:1,justifyContent:'center',alignItems:'center',
        borderRadius: 10,
      }} onPress={()=>{ChangePaymentType()}}>
      {PaymentType ? 
            <Text style={{fontSize:15}}>Cash</Text>
      :       <Text style={{fontSize:15}}>Payment Card</Text>}
      </TouchableOpacity>
</View>

<View>
                <TouchableOpacity style={{
        backgroundColor:'#11FF00',
        padding:10,
        width: '100%',
        height:60, flex:1,justifyContent:'center',
        borderRadius: 10,
      }} onPress={()=>{Submit()}}>
                <FontAwesome 
        name="send"
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

    </ScrollView>
  )
}

export default Bag;



const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
