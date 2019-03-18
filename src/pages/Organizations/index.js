import React, { Component } from 'react';
import {
  View, Text, AsyncStorage, ActivityIndicator, FlatList,
} from 'react-native';

import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome';

import Header from '../../components/Header';
import Api from '../../services/api';

import styles from './styles';

import OrganizationItem from './OrganizationItem';

const tabIcon = ({ tintColor }) => <Icon name="building" size={20} color={tintColor} />;

tabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

export default class Organizations extends Component {
  static navigationOptions = {
    tabBarIcon: tabIcon,
  };

  state = {
    data: [],
    loading: true,
    refresh: false,
  };

  componentDidMount() {
    this.refreshOrgList();
  }

  refreshOrgList = async () => {
    this.setState({ refresh: true });

    const user = await AsyncStorage.getItem('@GitHub:Users');
    const { data } = await Api.get(`/users/${user}/orgs`);

    this.setState({ data, loading: false, refresh: false });
  };

  renderOrgList = ({ item }) => <OrganizationItem organization={item} />;

  loadOrgs = () => {
    const { data, refresh } = this.state;

    return (
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderOrgList}
        onRefresh={this.refreshOrgList}
        refreshing={refresh}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />
    );
  };

  render() {
    const { loading } = this.state;
    return (
      <View style={styles.container}>
        <Header title="Organization" />
        {loading ? <ActivityIndicator style={styles.loading} /> : this.loadOrgs()}
      </View>
    );
  }
}
