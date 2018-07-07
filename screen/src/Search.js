import React, { Component } from 'react';
import { View, Text, TouchableOpacity,BackHandler,Alert,AsyncStorage } from "react-native";
import Header from './Header/Header'
import ListProduct from './ListProduct/ListProduct'
import { StackNavigator } from 'react-navigation'
import { connect } from 'react-redux'

class Search extends Component {
    constructor(props) {
        super(props);

    }
    save = async(point) => {
        try{ 
          await AsyncStorage.setItem("point",point);
        }
        catch(e){
          console.log(e)
        }
      } 
      get = async()=>{
        try{
          if (this.userCheck == null) {
            this.userCheck = await AsyncStorage.getItem("tendangnhap");
            this.passwordCheck = await AsyncStorage.getItem("password")
          }
          if (this.userCheck!= "" && this.passwordCheck!= "" && this.userCheck!= null) {
            let formData = new FormData();
            formData.append("goiham", 'KiemTraDangNhap');
            formData.append("userId", this.userCheck);
            formData.append("userPassword", this.passwordCheck);
            fetch("http://125.253.123.20/managedevice/group.php", {
              method: "POST",
              headers: {
                'Content-Type': 'multipart/form-data',
              },
              body: formData,
            }).then((response) => {  console.log(response); return response._bodyText })
              .then((response) => {
              
                var arrStr1 = response.split(/[:,]/);
                var arrStr2 = response.split(/[:}]/);
                if (arrStr1[1].trim() == "true") {
                  var a = arrStr1[3].trim().slice(1, arrStr1[3].length - 2);
                  var b = arrStr1[7].trim().slice(1, arrStr1[7].length - 3);
                  var c = arrStr1[5].trim().slice(1, arrStr1[5].length - 2);
                  this.props.savePoint(b)
                  this.save(b)
                }
                else { 
               }
              }
              )
          }
        }
        catch(e){
          console.log(e)
        }
      }
    openMenu() {
        const { open } = this.props;
        open();
        this.get();
    }
    render() {
        const { user, ID, point } = this.props

        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ backgroundColor: 'white' }}>
                    <Header ID={ID} onOpen={this.openMenu.bind(this)} navigation={this.props.bienManHinh} />
                </View>
                <View style={{ flex: 1, backgroundColor: '#DBDBD8' }}>
                    <ListProduct point={point} ID={ID} navigation={this.props.bienManHinh} />
                </View>
            </View>
        );
    }
   
}


const mapStateToProps = (state) => {
    return {
      bienManHinh: state.stack,
      savePointData: state.savePointData
    }
  };
  const mapDispatchToProps = (dispatch) => {
    return {
      saveBien: (data) => dispatch(saveNavigation(data)),
      savePoint: (point) => dispatch(savePoint(point))
    }
  };
  
  export default connect(mapStateToProps,mapDispatchToProps)(Search)