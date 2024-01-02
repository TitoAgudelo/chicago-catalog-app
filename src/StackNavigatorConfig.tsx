// StackNavigationConfig.ts

import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';

import ArtworkListScreen from './screens/ArtworkListScreen';
import ArtworkDetailScreen from './screens/ArtworkDetailScreen';

export type RootStackParamList = {
  ArtworkList: undefined;
  ArtworkDetail: {artworkId: number};
};

export type ArtworkDetailScreenProps = StackScreenProps<
  RootStackParamList,
  'ArtworkDetail'
>;

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigationConfig = () => {
  return (
    <Stack.Navigator initialRouteName="ArtworkList">
      <Stack.Screen name="ArtworkList" component={ArtworkListScreen} />
      <Stack.Screen
        name="ArtworkDetail"
        component={ArtworkDetailScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigationConfig;
