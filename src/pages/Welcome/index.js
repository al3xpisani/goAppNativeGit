import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
  StatusBar,
} from 'react-native';

import Axios from '../../services/api';

import styles from './styles';

export default class Welcome extends Component {
  state = {
    gitUser: '',
    loading: false,
    error: '',
  };

  saveUser = async (gitUser) => {
    await AsyncStorage.setItem('@GitHub:Users', gitUser);
  };

  checkGitUserExists = async (gitUser) => {
    const user = await Axios.get(`/users/${gitUser}`);
    return user;
  };

  handleLogin = async () => {
    const { gitUser } = this.state;
    const { navigation } = this.props;
    this.setState({ loading: true });

    try {
      await this.checkGitUserExists(gitUser);
      await this.saveUser(gitUser);

      // Se tudo acima estiver correto, entao navega para repo
      navigation.navigate('User');
    } catch (error) {
      this.setState({ loading: false, error });
      console.tron.log('Usuario inexistente');
    }
  };

  render() {
    const { gitUser, loading, error } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Bem-vindo</Text>
        <Text style={styles.text}>Para continuar informe seu usuario do GitHub</Text>

        <Text style={styles.error}>{!!error && 'Usuario invalido'}</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite o usuario"
            underlineColorAndroid="transparent"
            value={gitUser}
            onChangeText={text => this.setState({ gitUser: text })}
          />
          <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
            {loading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>Prosseguir</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
