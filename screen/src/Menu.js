import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, TouchableHighlight,AsyncStorage } from "react-native";
import profileIcon from '../media/appIcon/iconProfile.png'
import backgroundIcon from '../media/appIcon/backgroundlogin.png'
import backgroundProfile from '../media/appIcon/backgroundlogin.png'
import logoPC from '../media/appIcon/PCwhite1.png'
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
import {connect} from 'react-redux'
import { fetchLoginFailedAction } from '../../actions'

class Menu extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: this.props.loginData.userName,
            ID: this.props.loginData.userId,
            point: this.props.loginData.userPoint
        }
    }

    save() {
        this.props.logOut()
        this.props.navigation.state.routeName = 'Login'
        this.props.navigation2.goBack()
    }
    
    componentDidMount ()
    {
        this.props;
    }
    render() {
        const {
            container, profile, btnText, backDetail, userStyle, Pointname,
            btnSignInStyle, btnTextSignIn, loginContainer, pointStyle,
            username, btnTextLogOut, btnLogOutStyle, btnBorrowStyle, btnRequestStyle, btnContactStyle
        } = styles;
        
        return (
            
            <View style={container}>
                <View style={{ flex: 1, alignItems: 'center', paddingBottom: 30 }}>
                    <View style={{ flex: 3 }}>
                        <Image source={backgroundProfile} style={profile} />
                        <Image source={logoPC} style={{position:'absolute',width: width * 2 / 3,height:height/4-5, marginTop:10}}/>
                    </View>
                    <View style={{ flex: 1.3, backgroundColor: '#dadada', 
                    width: width * 2 / 3 + 10, height: height,
                    marginTop:25 }}>
                        <View style={loginContainer}>
                            <Text style={username}>User</Text>
                            <Text style={userStyle}>{this.state.user}</Text>
                        </View>
                        <View style={loginContainer}>   
                            <Text style={Pointname}>Point</Text>
                            <Text style={pointStyle}>{this.state.point}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 0.7,marginTop:20 }}>

                    <TouchableOpacity style={btnBorrowStyle} onPress={() => {
                        this.props.drawer()
                        this.props.navigation2.navigate('Borrow',{ID: this.state.ID})}}>
                        <Text style={btnTextSignIn}>LIST BORROW</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={btnContactStyle} onPress={() => { 
                        this.props.drawer()
                        this.props.navigation.navigate('ListReserve', { ID: this.state.ID })
                        }} >
                        <Text style={btnTextSignIn}>LIST RESERVE</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={btnRequestStyle} onPress={() => {
                      this.props.drawer()
                        this.props.navigation2.navigate('RequestPoint',{ID: this.state.ID})}} >
                        <Text style={btnTextSignIn}>REQUEST POINT</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 0.7 }}>
                    <View style={{ height: 2, width: width / 9, backgroundColor: 'gray' }}>
                    </View>
                    <TouchableOpacity onPress={() => {
                        // this.props.saveCart([])
                        this.save()
                    }} 
                        style={btnLogOutStyle} >
                        <Text style={btnTextLogOut}>LOG OUT</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3',
        alignItems: 'center',
    
    },
    profile: {
        width: width * 2 / 3 + 10,
        height: width /2,
        // borderRadius: 60
    },
    backDetail: {

    },
    btnText: {
        color: '#34B089',
        fontFamily: 'Avenir',
        fontSize: 20
    },
    btnSignInStyle: {
        height: 40,
        backgroundColor: '#f3f3f3',
        width: 200,
        justifyContent: 'center',
    },
    btnBorrowStyle: {
        height: 40,
        backgroundColor: '#f3f3f3',
        width: 200,
        justifyContent: 'center',
        paddingBottom: 20
    },
    btnRequestStyle: {
        height: 40,
        backgroundColor: '#f3f3f3',
        width: 200,
        justifyContent: 'center',
        
        paddingTop: 20
    },
    btnContactStyle: {
        height: 40,
        backgroundColor: '#f3f3f3',
        width: 200,
        justifyContent: 'center',
        paddingBottom: 20,
        paddingTop: 20
    },
    btnLogOutStyle: {
        height: 40,
        backgroundColor: '#f3f3f3',
        width: 200,
        justifyContent: 'center',

        paddingTop: 20
    },
    btnTextSignIn: {
        color: '#235261',
        fontSize: 15,
        //fontWeight: 'bold',
        fontFamily: 'Roboto-Bold',
        marginBottom: 10

    },
    btnTextLogOut: {
        color: 'red',
        fontSize: 15,
        fontFamily: 'Roboto-Bold',
    },
    loginContainer: {
        flex: 1,
        alignItems: 'center',
        width: width / 2 + 22,
        height: height,
        flexDirection: 'row'
    },
    username: {
        color: '#235261',
        fontSize: 15,
        fontWeight: 'bold',
        paddingLeft: 31,
        paddingTop: 10
    },
    Pointname: {
        color: '#235261',
        fontSize: 15,
        fontWeight: 'bold',
        paddingLeft: 31,
        paddingBottom: 10
    },
    pointStyle: {
        fontSize: 15,
        paddingLeft: 10,
        paddingBottom: 10
    },
    userStyle: {
        fontSize: 15,
        paddingLeft: 15,
        paddingTop: 10
    },
});
const mapStateToProps =(state)=> {
    return{
        loginData: state.loginReducer,
        numberCart: state.numberCart,
        bienManHinh:state.stack,
        savePointData: state.savePointData

    }
  };
  const mapDispatchToProps = (dispatch) => {
    return {
        saveCart: (data) => dispatch(saveCart(data)),
        saveDataSearch: (data) => dispatch(saveDataSearch(data)),
        savePoint: (point) => dispatch(savePoint(point)),
        logOut: () => dispatch(fetchLoginFailedAction())
    }
};
  export default connect (mapStateToProps,mapDispatchToProps) (Menu)