import React, { Component } from 'react';
import {
  View, AsyncStorage, Text, ActivityIndicator, FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../services/api';
import styles from './styles';

import Header from '../../components/Header';
import RepoItem from './RepositoryItem';

const tabIcon = ({ tintColor }) => <Icon name="list-alt" size={20} color={tintColor} />;
tabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

export default class Repositories extends Component {
  static navigationOptions = {
    tabBarIcon: tabIcon,
  };

  state = {
    data: [],
    loading: true,
    refreshing: false,
  };

  componentDidMount() {
    this.refreshListItem();
  }

  refreshListItem = async () => {
    this.setState({ refreshing: true });

    const user = await AsyncStorage.getItem('@GitHub:Users');
    const { data } = await api.get(`/users/${user}/repos`);

    this.setState({ loading: false, data, refreshing: false });
  };

  listItem = ({ item }) => <RepoItem repository={item} />;

  renderList = () => {
    const { data, refreshing } = this.state;

    return (
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={this.listItem}
        onRefresh={this.refreshListItem}
        refreshing={refreshing}
      />
    );
  };

  render() {
    const { loading } = this.state;
    return (
      <View style={styles.container}>
        <Header title="Repositories" />
        {loading ? <ActivityIndicator style={styles.loading} /> : this.renderList()}
      </View>
    );
  }
}
