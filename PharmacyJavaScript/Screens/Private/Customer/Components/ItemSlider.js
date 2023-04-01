 
 import React from "react";
import { View,Image,Text,ImageBackground } from "react-native-animatable";
import { TouchableOpacity } from "react-native-gesture-handler";
import APIRoutes from "../../../../API/APIRoutes";
import MainDialog from "../../../Dialog/MainDialog";
import ItemSliderDetails from "../Dialog/ItemSliderDetails";
 

 const ItemSlider = ({data}) => {
console.log('[ItemSlider] Rerender');
  const [DetailsVisible, setDetailsVisible] = React.useState(false);

  return (
      <TouchableOpacity onPress={()=>{setDetailsVisible(true)}}>  
        
        <MainDialog visible={DetailsVisible}>
      <ItemSliderDetails setDetailsVisible = {setDetailsVisible} item ={data}/>
      </MainDialog>

      <Image
        source={{uri : APIRoutes['Server_URL'] + data.image}}
        style={{height: 150, width: 300, borderRadius: 10}}
      />
      </TouchableOpacity>
  );
}


export default ItemSlider;
