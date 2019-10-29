import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Image, View} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Left,
  Right,
  Body,
  Text,
  Button,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
    };
  }

  async componentDidMount() {
    await this.getIdentity();
  }

  getIdentity = async () => {
    await AsyncStorage.getItem('token').then(key => {
      this.setState({
        token: key,
      });
    });
  };

  async logout() {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('id');
    this.props.navigation.navigate('loginTabs');
  }

  getCustomers = () => {
    this.props.handleGetCustomers((token = this.state.token));
  };

  render() {
    return (
      <Container>
        <Header style={styles.header}>
          <Left />
          <Body>
            <Title> Settings </Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <Image
            source={{
              uri:
                'http://www.ahm.org.py/awk/wp-content/uploads/2017/01/user.jpg',
            }}
            style={styles.profImg}
          />
          <Text style={styles.proftxt}> rebahan@admin.com </Text>
          <Text style={styles.profnote}> ADMIN </Text>

          <Button danger onPress={() => this.logout()} style={styles.btnlog}>
            <Text> Log Out </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#2e7eff',
  },
  footer: {
    backgroundColor: '#2e7eff',
  },
  container: {
    marginVertical: 50,
  },
  profImg: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginVertical: 25,
  },
  proftxt: {
    alignSelf: 'center',
    fontSize: 20,
    letterSpacing: 2,
    fontWeight: '600',
  },
  profnote: {
    marginTop: 5,
    alignSelf: 'center',
    fontSize: 14,
    letterSpacing: 4,
    color: '#00204f',
  },
  btnlog: {
    marginTop: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    width: 230,
  },
});
