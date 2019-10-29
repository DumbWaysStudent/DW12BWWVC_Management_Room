import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Left,
  Right,
  Body,
  Icon,
  Text,
  View,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';

export default class Rooms extends Component {
  constructor() {
    super();
    this.state = {
      rooms: [],
      token: null,
      id: null,
      input: '',
    };
  }

  async componentDidMount() {
    await this.getIdentity();
    await this.fetchRooms();
  }

  getIdentity = async () => {
    await AsyncStorage.getItem('token').then(key => {
      this.setState({
        token: key,
      });
    });
  };

  fetchRooms = () => {
    Axios({
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${this.state.token}`,
      },
      url: 'http://192.168.137.1:4000/api/v1/rooms',
    }).then(res => {
      this.setState({
        rooms: res.data,
      });
    });
  };

  postRoom = () => {
    Axios({
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${this.state.token}`,
      },
      url: 'http://192.168.137.1:4000/api/v1/room',
      data: {
        room: this.state.input,
      },
    })
      .then(res => {
        console.log(res);
        this.fetchRooms();
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
            <Title>CheckIn List</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <FlatList
            data={this.state.rooms}
            numColumns={3}
            renderItem={({item}) => (
              <View key={item.id}>
                <TouchableOpacity>
                  <View style={styles.room}>
                    <Text style={styles.roomtxt}> {item.room} </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.id}
          />
        </Content>
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
    padding: 10,
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
