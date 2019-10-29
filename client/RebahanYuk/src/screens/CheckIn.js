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
  Item,
  Input,
  Button,
  Picker,
  Form,
  Label,
} from 'native-base';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import * as actionsCheckIn from '../redux/_actions/checkin';
import * as actionsCustomers from '../redux/_actions/customers';

class CheckIn extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      CheckInVisible: false,
      CheckOutVisible: false,
      selected2: undefined,
      room: '',
      customer: '',
      duration: '',
      orderId: '',
    };
  }

  async componentDidMount() {
    await this.getIdentity();
    await this.getCheckIn();
    await this.getCustomers();
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

  toggleCheckInModal() {
    this.setState({CheckInVisible: !this.state.CheckInVisible});
  }

  toggleCheckOutModal(room, customer, duration, orderId) {
    this.setState({
      room,
      customer,
      duration,
      orderId,
    });
    this.setState({CheckOutVisible: !this.state.CheckOutVisible});
  }

  getCustomers = () => {
    this.props.handleGetCustomers((token = this.state.token));
  };

  RoomActive = item => {
    return (
      <TouchableOpacity onPress={() => this.toggleCheckInModal()}>
        <View style={styles.room}>
          <Text style={styles.roomtxt}> {item.room} </Text>
        </View>
      </TouchableOpacity>
    );
  };

  RoomDisable = item => {
    const room = item.room;
    const customer = item.customer.name;
    const duration = item.order.time;
    const orderId = item.order.id;
    return (
      <TouchableOpacity
        onPress={() =>
          this.toggleCheckOutModal(room, customer, duration, orderId)
        }>
        <View style={styles.roomDisable}>
          <Text style={styles.roomtxtDisable}> {item.room} </Text>
        </View>
      </TouchableOpacity>
    );
  };

  onValueChange2(value) {
    this.setState({
      selected2: value,
    });
  }

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

        <FlatList
          data={this.props.checkin.data}
          numColumns={3}
          renderItem={({item}) => (
            <View key={item.id}>
              {item.order && item.order.is_booked
                ? this.RoomDisable(item)
                : this.RoomActive(item)}
            </View>
          )}
          keyExtractor={item => item.id}
        />

        <Modal
          isVisible={this.state.CheckInVisible}
          onBackdropPress={() => this.toggleCheckInModal()}>
          <View style={styles.modalcon}>
            <Text style={styles.modaltxt}> CheckIn Data </Text>
            <Form>
              <Label style={styles.modalformlabel}>Room Name</Label>
              <Item regular>
                <Input />
              </Item>
              <Label style={[styles.modalformlabel, {marginTop: 10}]}>
                Customer
              </Label>
              <Item picker>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  selectedValue={this.state.selected2}
                  onValueChange={this.onValueChange2.bind(this)}>
                  {this.props.customers.data.map(data => (
                    <Picker.Item label={data.name} value={data.name} />
                  ))}
                </Picker>
              </Item>
              <Label style={[styles.modalformlabel, {marginTop: 10}]}>
                Duration <Text note> (minutes) </Text>
              </Label>
              <Item regular>
                <Input />
              </Item>
            </Form>
            <Button
              info
              style={styles.btnmodal}
              onPress={() => this.postRooms()}>
              <Text> SAVE </Text>
            </Button>
            <Button
              warning
              style={styles.btnmodal}
              onPress={() => this.toggleCheckInModal()}>
              <Text> CANCEL </Text>
            </Button>
          </View>
        </Modal>

        <Modal
          isVisible={this.state.CheckOutVisible}
          onBackdropPress={() => this.toggleCheckOutModal()}>
          <View style={styles.modalcon}>
            <Text style={styles.modaltxt}>CheckOut</Text>
            <Form>
              <Label style={styles.modalformlabel}>Room Name</Label>
              <Item regular>
                <Input
                  disabled
                  value={this.state.room}
                  style={{backgroundColor: '#a5b1c2'}}
                />
              </Item>
              <Label style={[styles.modalformlabel, {marginTop: 10}]}>
                Customer
              </Label>
              <Item regular>
                <Input
                  disabled
                  value={this.state.customer}
                  style={{backgroundColor: '#a5b1c2'}}
                />
              </Item>
              <Label style={[styles.modalformlabel, {marginTop: 10}]}>
                Duration <Text note> (minutes) </Text>
              </Label>
              <Item regular>
                <Input
                  disabled
                  value={this.state.duration}
                  style={{backgroundColor: '#a5b1c2'}}
                />
              </Item>
            </Form>
            <Button
              info
              style={styles.btnmodal}
              onPress={() => this.postRooms()}>
              <Text> CHECKOUT </Text>
            </Button>
            <Button
              warning
              style={styles.btnmodal}
              onPress={() => this.toggleCheckOutModal()}>
              <Text> CANCEL </Text>
            </Button>
          </View>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    checkin: state.checkin,
    customers: state.customers,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleGetCheckIn: token => dispatch(actionsCheckIn.handleGetCheckIn(token)),
    handleGetCustomers: token =>
      dispatch(actionsCustomers.handleGetCustomers(token)),
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
  modalcon: {
    padding: 20,
    backgroundColor: 'white',
  },
  btnmodal: {
    marginTop: 15,
    justifyContent: 'center',
  },
  modaltxt: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 10,
  },
  modalformlabel: {
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 18,
  },
});
