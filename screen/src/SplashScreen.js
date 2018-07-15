import React, { Component } from 'react';
import { View, Dimensions, Image } from "react-native";
import { connect } from 'react-redux'
import smartlab from '../media/appIcon/smartlab.jpg'
import { NavigationActions } from 'react-navigation'

class SplashScreen extends Component {
    constructor(props) {
        super(props);

        // setTimeout(()=>{
        //     this.get()
        // },3000)
    }

    componentWillMount() {
      setTimeout(() => {

        if (typeof this.props.loginData.ketqua !== 'undefined') {
          console.log('Main')
          this.props.changeMain()
        } else {
          console.log('Login')
          this.props.changeLogin()
        }
      }, 3000)
    }
    // get = async()=>{
    //     try{
    //       var userCheck = await AsyncStorage.getItem("username")
         
    //       var passwordCheck = await AsyncStorage.getItem("password")
          
    //       var id = await AsyncStorage.getItem("id")
          
    //       var point = await AsyncStorage.getItem("point")
          
    //       this.props.savePoint(point)
    //       if (userCheck!= "" && passwordCheck!= "" && userCheck!= null) {
    //         this.props.navigation.navigate('Main', { user: userCheck, ID: id, point: point })
    //       }
    //       else 
    //       {
    //         this.props.navigation.navigate('Login')
    //       }
    //     }
    //     catch(e){
    //       console.log(e)
    //     }
    //   }
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
      loginData: state.loginReducer,
      bienManHinh: state.stack,
      savePointData: state.savePointData
    }
  };
  const mapDispatchToProps = (dispatch) => {
    return {
      changeLogin: () => dispatch(NavigationActions.navigate({ routeName: 'Login' })),
      changeMain: () => dispatch(NavigationActions.navigate({ routeName: 'Main' })),
      saveBien: (data) => dispatch(saveNavigation(data)),
      savePoint: (point) => dispatch(savePoint(point))
    }
  };
export default connect(mapStateToProps,mapDispatchToProps)(SplashScreen)