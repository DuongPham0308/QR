import React, { Component } from 'react';
import { View, Text, TouchableOpacity,BackHandler,Alert,AsyncStorage,Dimensions,Image } from "react-native";
import Header from './Header/Header'
import ListProduct from './ListProduct/ListProduct'
import { StackNavigator } from 'react-navigation'
import { connect } from 'react-redux'
import smartlab from '../media/appIcon/smartlab.jpg'
class SplashScreen extends Component {
    constructor(props) {
        super(props);

        setTimeout(()=>{
            this.get()
        },3000)
    }
    get = async()=>{
        try{
          var userCheck = await AsyncStorage.getItem("username")
         
          var passwordCheck = await AsyncStorage.getItem("password")
          
          var id = await AsyncStorage.getItem("id")
          
          var point = await AsyncStorage.getItem("point")
          
          this.props.savePoint(point)
          if (userCheck!= "" && passwordCheck!= "" && userCheck!= null) {
            this.props.navigation.navigate('Main', { user: userCheck, ID: id, point: point })
          }
          else 
          {
            this.props.navigation.navigate('Login')
          }
        }
        catch(e){
          console.log(e)
        }
      }
    render() {
      const { width, height } = Dimensions.get('window')
        const { user, ID, point } = this.props
        return (
            <View style={{ flex: 1 }}>
              <Image source={smartlab}  style={{  width, height, }}/>
            </View>
        );
    }
    componentDidMount() {
        this.props.saveBien(this.props.navigation)
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
export default connect(mapStateToProps,mapDispatchToProps)(SplashScreen)