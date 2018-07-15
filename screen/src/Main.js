import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,AsyncStorage,
  BackHandler,
  Alert
} from 'react-native';
import Drawer from 'react-native-drawer';
import { StackNavigator } from 'react-navigation'
import Menu from './Menu';
import Search from './Search';
import Borrow from './Borrow'
import { connect } from 'react-redux'
import { fetchProductFailedAction } from '../../actions'
import BackgroundTimer from 'react-native-background-timer';

class Main extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
  componentWillUnmount() {
    BackgroundTimer.clearInterval(intervalId);

  }
  constructor(props) {
    super(props)

    this.state = {
        user: this.props.loginData.userName,
        ID: this.props.loginData.userId,
        point: this.props.loginData.userPoint
    }

    this.logic = true;
    this._interval = null;
    this.userCheck = null
    this.passwordCheck = null
    this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
      this.props.backPressed(),
      BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
  }
  
  // get = async()=>{
    
  //   try{
  //     if (this.userCheck == null) {
  //       this.userCheck = await AsyncStorage.getItem("tendangnhap");
  //       this.passwordCheck = await AsyncStorage.getItem("password")
  //     }
  //     if (this.userCheck!= "" && this.passwordCheck!= "" && this.userCheck!= null) {
  //       let formData = new FormData();
  //       formData.append("goiham", 'KiemTraDangNhap');
  //       formData.append("userId", this.userCheck);
  //       formData.append("userPassword", this.passwordCheck);
  //       fetch("http://125.253.123.20/managedevice/group.php", {
  //         method: "POST",
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //         body: formData,
  //       }).then((response) => {  console.log(response); return response._bodyText })
  //         .then((response) => {
          
  //           var arrStr1 = response.split(/[:,]/);
  //           var arrStr2 = response.split(/[:}]/);
  //           if (arrStr1[1].trim() == "true") {
  //             var a = arrStr1[3].trim().slice(1, arrStr1[3].length - 2);
  //             var b = arrStr1[7].trim().slice(1, arrStr1[7].length - 3);
  //             var c = arrStr1[5].trim().slice(1, arrStr1[5].length - 2);
  //             this.props.savePoint(b)
  //             this.save(b)
  //           }
  //           else { 
  //          }
  //         }
  //         )
  //     }
  //   }
  //   catch(e){
  //     console.log(e)
  //   }
  // }

  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
      this.props.backPressed(),
      BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
  }

  onBackButtonPressAndroid = () => {
    if (this.logic) {
      this.logic = false;
      Alert.alert(
            'Exit App',
            'Exiting the application?', [{
              text: 'Cancel',
              onPress: () =>      { 
                this.logic = true;
              }
              ,
              style: 'cancel'
            }, {
              text: 'OK',
              onPress: () => {
                this.props.backPressed(),
                BackHandler.exitApp()
              }
            },], {
              cancelable: false
            }
          )
      return true;
    } else {
      return false;
    }
  };

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }
  closeControlPanel = () => {
    this.drawer.close()
  };
  openControlPanel = () => {
    this.drawer.open()
  };
  render() {
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<Menu drawer={this.closeControlPanel} navigation2={this.props.navigation} navigation = {this.props.bienManHinh}/>}
        openDrawerOffset={0.3} // 20% gap on the right side of drawer
        panCloseMask={0.2}
        type="overlay"
        tapToClose={true}
        tweenHandler={(ratio) => ({
          main: { opacity: (2 - ratio) / 2 }
        })}
      >
        <Search user={this.state.user} ID={this.state.ID} point={this.state.point} navigation={this.props.navigation} bienManHinh={this.props.bienManHinh} open={this.openControlPanel.bind(this)} />

      </Drawer>

    );
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
    saveBien: (data) => dispatch(saveNavigation(data)),
    savePoint: (point) => dispatch(savePoint(point)),
    backPressed: () => dispatch(fetchProductFailedAction())
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(Main)


