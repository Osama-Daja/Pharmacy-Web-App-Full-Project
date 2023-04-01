import React from 'react';
import {StyleSheet,Modal,View, Text, Image, TouchableOpacity,Animated} from 'react-native';
import { windowWidth } from '../../../../src/utils/Dimensions';
import APIRoutes from '../../../../API/APIRoutes';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AuthenticateContext from '../../../../Context/AuthenticateContext';
import DetailsProduct from '../Dialog/DetailsProduct';
import MainDialog from '../../../Dialog/MainDialog';

export default function ItemProduct({item,AddToBag,colors}) {
console.log('[ItemProduct] Rerender');
  const [DetailsVisible, setDetailsVisible] = React.useState(false);
  
  return (

    <View style={{
      flexDirection:'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
      width: '50%',
    }}>


      <MainDialog visible={DetailsVisible}>
      <DetailsProduct setDetailsVisible = {setDetailsVisible} item ={item}/>
      </MainDialog>


      <View style={{alignItems: 'center',width:'100%'}}>
      

        <Image
        
          source= {{uri : APIRoutes['Server_URL'] + item.image}}
          style={{width: '100%', height: 250, borderRadius: 10, marginRight: 8
          }}
        />

        <View style={{position:'absolute',width:'100%',top:'20%'
                ,alignItems:'center',justifyContent:'center',flex:1}}>
                <View style={{
                  backgroundColor:'#ffffff78',
                  //colors.MainColor,
                  width:'100%'
                ,alignItems:'center'}}>
                                           <Text
            style={{
              color: '#000',
              fontFamily: 'Roboto-Medium',
              fontSize: 14,fontWeight:'900'
            }}>
            {item.name}
          </Text>
          <Text style={{color: '#000',marginLeft:20,fontWeight:'700'}}>
              {item.price} $
          </Text>
                    <Image 
          source= {{uri : APIRoutes['Server_URL'] + item.categoryImage}}
          style={{width: 20, height: 20, borderRadius: 10, marginRight: 8}} />
          <Text
            numberOfLines={1}
            style={{
              color: '#000',
              fontFamily: 'Roboto-Medium',
              fontSize: 14,fontWeight:'700',
              textTransform: 'uppercase',
            }}>
            {item.categoryName}
          </Text>
          </View>
          </View>

                <View style={{position:'absolute',width:'100%',top:'70%'
                ,alignItems:'center',justifyContent:'center',flex:1}}>

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
        backgroundColor:'#11FF00',
        padding:10,
        width: 50,
        borderRadius: 10,
      }} onPress={()=>{
        AddToBag({item:item});
        }}>
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
</View>
        </View>



        </View>

        {/* <View 
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

          <View style={{flexDirection:'row'}}>
          <Image 
          source= {{uri : APIRoutes['Server_URL'] + item.categoryImage}}
          style={{width: 20, height: 20, borderRadius: 10, marginRight: 8}} />
          <Text
            numberOfLines={1}
            style={{
              color: '#333',
              fontFamily: 'Roboto-Medium',
              fontSize: 14,
              textTransform: 'uppercase',
            }}>
            {item.categoryName}
          </Text>
          </View>
        </View> 
      </View>*/}

{/* <View style={{flexDirection:'row'}}>
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
        backgroundColor:'#11FF00',
        padding:10,
        width: 50,
        borderRadius: 10,
      }} onPress={()=>{
        AddToBag({item:item});
        //AddProductToBag({item})
  // var check = Context.Bag.filter(a=>a.id == item.id).length;
  //     if(check == 0){
  //       item.Quantity = 0;
  //   Context.SetBag(prevItems=>{
  //     return [item, ...prevItems];
  //   });
      
  //     }else{
  //       alert('You Have Already That Product.');
  //     }
        }}>
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
</View> */}
    </View>

//     <View style={{
//       flexDirection:'row',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: 20,
//     }}>


//       <MainDialog visible={DetailsVisible}>
//       <DetailsProduct setDetailsVisible = {setDetailsVisible} item ={item}/>
//       </MainDialog>


//       <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
//         <Image
//           source= {{uri : APIRoutes['Server_URL'] + item.image}}
//           style={{width: 55, height: 55, borderRadius: 10, marginRight: 8}}
//         />
//         <View 
//         style={{width: windowWidth - 220}}
//         >
//         <View style={{flexDirection:'row'}}>
//           <Text
//             style={{
//               color: '#333',
//               fontFamily: 'Roboto-Medium',
//               fontSize: 14,
//             }}>
//             {item.name}
//           </Text>
//           <Text style={{marginLeft:20}}>
//               {item.price} $
//           </Text>
//         </View>

//           <View style={{flexDirection:'row'}}>
//           <Image 
//           source= {{uri : APIRoutes['Server_URL'] + item.categoryImage}}
//           style={{width: 20, height: 20, borderRadius: 10, marginRight: 8}} />
//           <Text
//             numberOfLines={1}
//             style={{
//               color: '#333',
//               fontFamily: 'Roboto-Medium',
//               fontSize: 14,
//               textTransform: 'uppercase',
//             }}>
//             {item.categoryName}
//           </Text>
//           </View>
//         </View>
//       </View>

// <View style={{flexDirection:'row'}}>
//       <TouchableOpacity style={{
//         backgroundColor:'#0025FF',
//         padding:10,
//         width: 50,
//         borderRadius: 10,
//       }} onPress={()=>{
//         setDetailsVisible(true)
//       }}>
//           <FontAwesome 
//         name="info"
//         color='#fff'
//         size={20}  
//         style={{
//           color: '#fff',
//           textAlign: 'center',
//           fontSize: 20,
//         }}
//     />
//       </TouchableOpacity>
//             <TouchableOpacity style={{
//         backgroundColor:'#11FF00',
//         padding:10,
//         width: 50,
//         borderRadius: 10,
//       }} onPress={()=>{
//         AddToBag({item:item});
//         //AddProductToBag({item})
//   // var check = Context.Bag.filter(a=>a.id == item.id).length;
//   //     if(check == 0){
//   //       item.Quantity = 0;
//   //   Context.SetBag(prevItems=>{
//   //     return [item, ...prevItems];
//   //   });
      
//   //     }else{
//   //       alert('You Have Already That Product.');
//   //     }
//         }}>
//                 <FontAwesome 
//         name="plus"
//         color='#fff'
//         size={20}  
//         style={{
//           color: '#fff',
//           textAlign: 'center',
//           fontSize: 20,
//         }}
//     />
//       </TouchableOpacity>
// </View>
//     </View>
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