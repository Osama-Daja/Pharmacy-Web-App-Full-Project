
import React from 'react';
import {Text,View,TouchableOpacity,SafeAreaView,ScrollView} from 'react-native';
import { Button } from 'react-native-elements';
import { SearchBar } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import SelectDropdown from 'react-native-select-dropdown'

import APIRoutes from '../../../API/APIRoutes';
import {Get,Post} from '../../../API/APICalls';

//Components
import ItemProduct from './Components/ItemProduct';
import MainDialog from '../../Dialog/MainDialog';
import Bag from './Bag';
import { useTheme } from '@react-navigation/native';

const Market = () =>{
  console.log('[Market] Rerender');

  const {colors} = useTheme();

  const [BagVisible, setBagVisible] = React.useState(false);
  const [ListOfProducts,SetListOfProducts] = React.useState([]);

var Category = [];
var CompanyOfOrigin =[];

const [SelectedName,SetName] = React.useState('');
var SelectedCategory = 0;
var SelectedCompany = 0;

var [MyBag,SetMyBag] =React.useState([]);

const OnChangeName = (val) =>{
  SetName(val)
}

const OnChangeCategory = (val) =>{
  SelectedCategory = val;
}

const OnChangeCompany = (val) =>{
  SelectedCompany = val;
}
    const GetAllCategory = async () =>{
        var Result = await Get(APIRoutes['GetAllCategory'])
         var CategoryIn = Result.data
        Array.prototype.push.apply(Category, CategoryIn);
    }
    const GetAllCompanyOfOrigin = async () =>{
        var Result = await Get(APIRoutes['GetAllCompanyOfOrigin'])
         var CompanyOfOriginIn = Result.data;
        Array.prototype.push.apply(CompanyOfOrigin, CompanyOfOriginIn);

    }

    GetAllCategory();
    GetAllCompanyOfOrigin();

    var AddToBag = ({item}) =>{
        var check = MyBag.filter(a=>a.id == item.id).length;
      if(check == 0){
        item.Quantity = 0;
    SetMyBag(prevItems=>{
      return [item, ...prevItems];
    });
      
      }else{
        alert('You Have Already That Product.');
      }
    }

    const Submit = async ()=>{
      if(SelectedName == '' && SelectedCategory == 0 && SelectedCompany == 0){
        alert('Make Sure Enter Value.')
      }else{
      var Result = await Post(APIRoutes['SearchProductByCustomer'],
      {Name : SelectedName,CategoryId:Number(SelectedCategory)
        ,CompanyOfOriginId:Number(SelectedCompany)});
        var decode = Result.data;
        SetListOfProducts(decode);
      }
    }
  return (
    <SafeAreaView style={[{flex:1,backgroundColor:colors.background}]}>
    
          <MainDialog visible={BagVisible}>
      <Bag MyBag = {MyBag} SetMyBag = {SetMyBag} setBagVisible = {setBagVisible} />
      </MainDialog>

    <ScrollView>
      <SearchBar 
        placeholder="Name"
        style={{color:'#000',backgroundColor:'#fff'}}
        onChangeText = {(val)=>OnChangeName(val)} 
        value={SelectedName}
      />
      <View style={{flexDirection:'row'}}>
              <SelectDropdown
	data={Category}
	onSelect={(selectedItem, index) => {
		OnChangeCategory(selectedItem.id);
	}}
	buttonTextAfterSelection={(selectedItem, index) => {
		return selectedItem.name
	}}
	rowTextForSelection={(item, index) => {
		return item.name;
	}}
/>
      <SelectDropdown
      placeholder = 'Select Comapny'
	data={CompanyOfOrigin}
	onSelect={(selectedItem, index) => {
		OnChangeCompany(selectedItem.id);
	}}
	buttonTextAfterSelection={(selectedItem, index) => {
		return selectedItem.name
	}}
	rowTextForSelection={(item, index) => {
		return item.name
	}}
/>
      </View>

      <TouchableOpacity style={{width:'100%',height:50,justifyContent:'center'
      ,alignItems:'center',backgroundColor:colors.MainColor,borderRadius:5,}}
      onPress={()=>{Submit()}}> 
          <Text style={{fontSize:20}}>Search</Text>
      </TouchableOpacity>

<View style={{ marginTop:10,width:'100%',flexDirection:'row',flexWrap:'wrap'}}>
          {
          ListOfProducts.map((item, index) => (
            <ItemProduct
            key = {index}
            item = {item}
            AddToBag = {AddToBag}
            colors = {colors}
             />
          ))
        }
</View>
      </ScrollView>

                    <View style=
                    {{ borderWidth:1,position:'absolute'
                    ,bottom:0,alignSelf:'flex-end',
                    borderRadius:10}}>
<Button
  icon={
    <FontAwesome
      name="shopping-bag"
      size={35}
      color="white"
    />
  }
  onPress={()=>{
setBagVisible(true);
  }}
/>
        </View>

    </SafeAreaView>
  )
}

export default Market;
