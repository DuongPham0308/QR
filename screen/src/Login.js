/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text, TouchableOpacity,
  View,Keyboard,
  TouchableWithoutFeedback ,
  Image, Dimensions,TextInput,StatusBar,AsyncStorage,KeyboardAvoidingView,BackHandler,Alert
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import PC from '../media/appIcon/PC.png'
import background from '../media/appIcon/backgrounddetail.png'
import logo from '../media/appIcon/logoPCwhite.png'
import { saveNavigation ,savePoint, fetchLoginAction } from '../../actions'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

const { width, height } = Dimensions.get('window')
StatusBar.setHidden(true);

class Login extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
    this.id = "";
    this.point = "";
    this.name = "";
    this.password = "";
    this.tendangnhap = "";
    this.logic=true;
    this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
      BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
  }
  // componentWillMount() {
  //   this.get()
  // }
  save = async()=>{
    try{
      await AsyncStorage.setItem("tendangnhap",this.tendangnhap);
      await AsyncStorage.setItem("username",this.name);
      await AsyncStorage.setItem("password",this.password);   
      await AsyncStorage.setItem("point",this.point);
      await AsyncStorage.setItem("id",this.id);  
    }
    catch(e){
      console.log(e)
    }
  }
  // get = async()=>{
  //   try{
  //     var userCheck = await AsyncStorage.getItem("username")
  //     var passwordCheck = await AsyncStorage.getItem("password")
  //     var id = await AsyncStorage.getItem("id")
  //     var point = await AsyncStorage.getItem("point")
  //     this.props.savePoint(point)
  //     if (userCheck!= "" && passwordCheck!= "" && userCheck!= null) {
  //       this.props.navigation.navigate('Main', { user: userCheck, ID: id, point: point })
  //     }
  //     // else 
  //     // {
  //     //   this.props.navigation.navigate('Login')
  //     // }
  //   }
  //   catch(e){
  //     console.log(e)
  //   }
  // }

  _onLogin(params) {
    this.props.onLogin(params)
    this.setState({username: '', password: ''})
  }

  render() {
    //thư viện Dimemsions hỗ trợ việc chia hình ảnh theo tỉ lệ màn hình với 2 biến width,height
    return (
      <View style={{ flex: 1, backgroundColor: 'rgb(255,255,255)' }} >
        <TouchableWithoutFeedback style = {{ flex: 1 }} onPress = { Keyboard.dismiss }>
          <View style = {{ flex: 1 }}>
            <Image resizeMode={'stretch'} source={background} style={{ backgroundColor: '#fff', width, height, position: 'absolute' }} />
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Image style={{ width: width - 160, height: height / 5, marginTop: 100 }} resizeMode={'stretch'} source={logo} />
            </View>
            <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'space-between', marginBottom: 35 }}>
              <KeyboardAvoidingView behavior="padding" style={{ backgroundColor: 'rgba(255,255,255,0.4)', width: width - 80, height: height / 5, borderRadius: 10 }}>
                <View style={{ flexDirection: 'row', width: width - 80, height: height / 5 / 2 - 1, alignItems: 'center' }}>
                  <Image style={{ padding: 5, width: 40, height: 40 }} resizeMode='stretch' source={require('../../images/user72.png')} />
                  <TextInput
                    placeholder='Username'
                    placeholderTextColor={'#fff'}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    keyboardType={'phone-pad'}
                    style={{ height: 40, flex: 1 }}
                    onChangeText={(text) => this.setState({ username: text })}
                    value={this.state.username}
                  />
                </View>
                <View style={{ backgroundColor: 'black', width: width - 120 - height / 5 / 2 / 2, height: 2, left: 40 }} />
                <View style={{ flexDirection: 'row', width: width - 80, height: height / 5 / 2 - 1, alignItems: 'center' }}>
                  <Image style={{ padding: 5, width: 40, height: 40 }} resizeMode='stretch' source={require('../../images/lock72.png')} />
                  <TextInput
                    secureTextEntry={true}
                    placeholder='Password'
                    placeholderTextColor={'#fff'}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    style={{ height: 40, flex: 1 }}
                    onChangeText={(text) => this.setState({ password: text })}
                    value={this.state.password}
                  />
                </View>
              </KeyboardAvoidingView>
              <View style={{ position: 'absolute', left: width - 40 - height / 5 / 2 / 2, top: height / 5 / 2 / 2, backgroundColor: 'transparent', borderRadius: height / 5 / 2 }}>
                <TouchableOpacity onPress={() => {
                  this._onLogin({
                    goiham: 'KiemTraDangNhap',
                    userId: this.state.username,
                    userPassword: this.state.password
                  })
                  // let formData = new FormData();
                  // formData.append("goiham", 'KiemTraDangNhap');
                  // formData.append("userId", username);
                  // formData.append("userPassword", password);
                  // const self = this
                  // fetch("http://125.253.123.20/managedevice/group.php", {
                  //   method: "POST",
                  //   headers: {
                  //     'Content-Type': 'multipart/form-data',
                  //   },
                  //   body: formData,
                  // }).then((response) => {  console.log(response); return response._bodyText })
                  //   .then((response) => {
                  //     var arrStr1 = response.split(/[:,]/);
                  //     var arrStr2 = response.split(/[:}]/); 
                  //     if (arrStr1[1].trim() == "true") {
                  //       var a = arrStr1[3].trim().slice(1, arrStr1[3].length - 2);
                  //       var b = arrStr1[7].trim().slice(1, arrStr1[7].length - 3);
                  //       var c = arrStr1[5].trim().slice(1, arrStr1[5].length - 2);
                  //       this.name = a;
                  //       this.point = b;
                  //       this.id = c;
                  //       this.password = password
                  //       this.tendangnhap = this.state.username
                  //       this.save()
                  //       this.props.savePoint(this.point)
                  //       this.props.navigation.navigate('Main', { user: a, ID: c, point: b })
                  //       Keyboard.dismiss();
                  //       this.setState({username:""})
                  //       this.setState({password:""})
                  //     }
                  //     else { alert("Wrong username or password") }
                  //   }
                  //   )
                }
                }>
                  <Image style={{ width: height / 5 / 2, height: height / 5 / 2 }} resizeMode='stretch' source={require('../../images/loginbutton.png')} />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 50 }}>
                
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
  componentDidMount() {
    // this.props.saveBien(this.props.navigation)
    this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
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
              onPress: () =>      { this.logic = true;}
              ,
              style: 'cancel'
            }, {
              text: 'OK',
              onPress: () => BackHandler.exitApp()
            },], {
              cancelable: false
            }
          )
      return true;
    } else {
      return false;
    }
  };
}

const mapStateToProps = (state) => {
  return {
    loginData: state.loginReducer,
    bienManHinh: state.stack,
    // savePointData: state.savePointData
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    saveBien: (data) => dispatch(saveNavigation(data)),
    // savePoint: (point) => dispatch(savePoint(point)),
    onLogin: (params) => dispatch(fetchLoginAction(params))
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Login)


