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
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import * as actionCheckIn from '../redux/_actions/checkin';

// class RoomBooked extends Component {
//   render() {
//     return (
//       <View style={styles.room}>
//         <Text style={styles.roomtxt}> {item.room} </Text>
//       </View>
//     );
//   }
// }

class CheckIn extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
    };
  }

  async componentDidMount() {
    await this.getIdentity();
    await this.getCheckIn();
  }

  getIdentity = async () => {
    await AsyncStorage.getItem('token').then(key => {
      this.setState({
        token: key,
      });
    });
  };

  getCheckIn = () => {
    this.props.handleGetCheckIn((token = this.state.token));
  };

  // renderCheckin = (item) => {
  //   if (item.customer.length >) {
  //     return (
  //       <View style={styles.room}>
  //         <Text style={styles.roomtxt}> {item.room} </Text>
  //       </View>
  //     );
  //   } else {
  //     return (
  //       <View style={styles.roomDisable}>
  //         <Text style={styles.roomtxtDisable}> {item.room} </Text>
  //       </View>
  //     );
  //   }
  // };

  RoomActive = room => {
    return (
      <View style={styles.room}>
        <Text style={styles.roomtxt}> {room} </Text>
      </View>
    );
  };

  RoomDisable = room => {
    return (
      <View style={styles.roomDisable}>
        <Text style={styles.roomtxtDisable}> {room} </Text>
      </View>
    );
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
            data={this.props.checkin.data}
            numColumns={3}
            renderItem={({item}) => (
              <View key={item.id}>
                {console.log(item)}
                <TouchableOpacity>
                  {item.order && item.order.is_booked
                    ? this.RoomActive(item.room)
                    : this.RoomDisable(item.room)}
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

const mapStateToProps = state => {
  return {
    checkin: state.checkin,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleGetCheckIn: token => dispatch(actionCheckIn.handleGetCheckIn(token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckIn);

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
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 110,
    height: 70,
    backgroundColor: '#45aaf2',
  },
  roomtxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
  },
  roomDisable: {
    margin: 13,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 110,
    height: 70,
    backgroundColor: '#d1d8e0',
  },
  roomtxtDisable: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 22,
  },
  icon: {
    color: 'white',
  },
});
