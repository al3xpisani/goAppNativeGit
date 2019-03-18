import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  const tron = Reactotron.configure({ host: '10.0.3.2' }) // we can use plugins here -- more on this later
    .connect(); // let's connect!

  tron.clear();
  console.tron = tron;
}
