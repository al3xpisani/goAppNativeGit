import { StyleSheet } from 'react-native';
import { colors, metrics } from '../../styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    flex: 1,
  },

  loading: {
    marginTop: metrics.baseMargin * 2,
  },
});

export default styles;
