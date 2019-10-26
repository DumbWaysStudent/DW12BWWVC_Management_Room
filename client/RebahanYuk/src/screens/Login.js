import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {View, Button, Text, Item, Input, Form, Label, Icon} from 'native-base';
// import config from '../../config-env';

// import toonImg from '../Component/img/toon.jpg';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      icon: 'eye-off',
      username: '',
      password: null,
      pass: true,
      isDisable: true,
      token: '',
      id: '',
    };
  }

  userLogin = () => {
    axios({
      method: 'POST',
      url: `http://192.168.137.1:4000/api/v1/login`,
      data: {
        email: this.state.username,
        password: this.state.password,
      },
    }).then(response => {
      this.setState({
        id: response.data.id,
        token: response.data.token,
      });

      const login = response.data.login;

      if (login !== false) {
        AsyncStorage.setItem('token', this.state.token);
        AsyncStorage.setItem('id', JSON.stringify(this.state.id));
        alert(`Selamat Datang kembali, ${response.data.email}`);
        this.props.navigation.navigate('Rooms');
      } else {
        alert('Login Failed !!');
        console.log('Login Failed');
      }
    });
  };

  eyeIcon = () => {
    this.setState(before => ({
      icon: before.icon === 'eye' ? 'eye-off' : 'eye',
      pass: !before.pass,
    }));
  };

  userValidation = username => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (reg.test(username) == true && this.state.password != null) {
      this.setState({
        username: username,
        isDisable: false,
      });
    } else {
      this.setState({
        username: username,
        isDisable: true,
      });
    }
    this.setState({
      username,
    });
  };

  passValidation = password => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if ((password != null) == true && reg.test(this.state.username) == true) {
      this.setState({
        password: password,
        isDisable: false,
      });
    } else {
      this.setState({
        password: password,
        isDisable: true,
      });
    }
    this.setState({
      password,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Text style={styles.textLogo}> RebahanYuk Admin </Text>
          <Text style={styles.textLogo2}>
            Please verify your account here !
          </Text>
        </View>

        <Form style={styles.formlogin}>
          <Item floatingLabel>
            <Label style={styles.textLabel}> E-Mail </Label>
            <Input
              onChangeText={username => this.userValidation(username)}
              style={{color: 'white'}}
            />
          </Item>
          <Item floatingLabel last>
            <Label style={styles.textLabel}> Password </Label>
            <Input
              secureTextEntry={this.state.pass}
              onChangeText={password => this.passValidation(password)}
              style={{color: 'white'}}
            />
            <Icon name={this.state.icon} onPress={() => this.eyeIcon()} />
          </Item>

          <Button
            success
            disabled={this.state.isDisable}
            rounded
            block
            style={styles.btnsign}
            onPress={() => this.userLogin()}>
            <Text style={{justifyContent: 'center'}}> Login Here </Text>
          </Button>
        </Form>

        <Text style={styles.copyright}>
          RebahanYuk Ver. 0.1 Copyright By Yusril Izza
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e7eff',
  },
  logo: {
    marginTop: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLogo: {
    marginTop: 10,
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  textLogo2: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  textLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
  formlogin: {
    marginTop: 40,
    marginHorizontal: 25,
  },
  btnsign: {
    marginTop: 60,
    marginLeft: 8,
    width: 350,
  },
  btnregister: {
    marginTop: 0,
    marginLeft: 8,
    width: 350,
  },
  copyright: {
    color: 'white',
    fontSize: 12,
    marginTop: 200,
    marginHorizontal: 90,
  },
});
