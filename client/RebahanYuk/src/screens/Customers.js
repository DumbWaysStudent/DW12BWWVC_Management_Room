import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  View,
  Fab,
  Item,
  Input,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';

export default class Rooms extends Component {
  constructor() {
    super();
    this.state = {
      customers: [],
      token: null,
      id: null,
      identity: '',
      name: '',
      phone: '',
    };
  }

  async componentDidMount() {
    await this.getIdentity();
    await this.fetchCustomer();
  }

  getIdentity = async () => {
    await AsyncStorage.getItem('token').then(key => {
      this.setState({
        token: key,
      });
    });
  };

  fetchCustomer = () => {
    Axios({
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${this.state.token}`,
      },
      url: 'http://192.168.137.1:4000/api/v1/customers',
    }).then(res => {
      this.setState({
        customers: res.data,
      });
    });
  };

  postCustomer = () => {
    Axios({
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${this.state.token}`,
      },
      url: 'http://192.168.137.1:4000/api/v1/customer',
      data: {
        identity: this.state.identity,
        name: this.state.name,
        phone: this.state.phone,
      },
    })
      .then(res => {
        console.log(res);
        this.fetchCustomer();
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <Container>
        <Header style={styles.header}>
          <Left />
          <Body>
            <Title> Customer List </Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <FlatList
            data={this.state.customers}
            renderItem={({item}) => (
              <View key={item.id}>
                <TouchableOpacity>
                  <View
                    style={{borderWidth: 1, padding: 5, borderColor: 'black'}}>
                    <Text> {item.identity} </Text>
                    <Text> {item.name} </Text>
                    <Text> {item.phone} </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.id}
          />

          <Item>
            <Input
              placeholder="Identity"
              onChangeText={id => this.setState({identity: id})}
            />
            <Input
              placeholder="name"
              onChangeText={name => this.setState({name})}
            />
            <Input
              placeholder="phone"
              onChangeText={phone => this.setState({phone})}
            />
          </Item>
          <Button onPress={() => this.postCustomer()}>
            <Text> Add Customer </Text>
          </Button>
        </Content>

        <Footer>
          <FooterTab style={styles.footer}>
            <Button onPress={() => this.props.navigation.navigate('CheckIn')}>
              <Icon name="ios-book" />
            </Button>
            <Button onPress={() => this.props.navigation.navigate('Rooms')}>
              <Icon name="ios-bed" />
            </Button>
            <Button onPress={() => this.props.navigation.navigate('FavScreen')}>
              <Icon name="ios-person" style={styles.icon} />
            </Button>
            <Button onPress={() => this.props.navigation.navigate('Profile')}>
              <Icon name="ios-settings" />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#2e7eff',
  },
  footer: {
    backgroundColor: '#2e7eff',
  },
  room: {
    margin: 13,
    padding: 15,
    backgroundColor: '#25b309',
    alignItems: 'center',
    width: 110,
  },
  roomtxt: {
    color: 'white',
    fontWeight: 'bold',
  },
  icon: {
    color: 'white',
  },
});
