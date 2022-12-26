import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from '../../../stacks/home-stack';
import AccountsStack from '../../../stacks/accounts-stack';
import GroupsStack from '../../../stacks/groups-stack';
import HomeOutlined from 'react-native-vector-icons/dist/AntDesign'

import Ionicons from 'react-native-vector-icons/Ionicons';


const Tabs = createBottomTabNavigator();

const AppTabs = ({}) => {


  return(
    <Tabs.Navigator
      sceneContainerStyle={{ backgroundColor: 'black' }}
      tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
       }}
    >
      <Tabs.Screen name='HomeStack'
        options={{ headerShown: false}}
        component={HomeStack}
      />
      <Tabs.Screen name='GroupsStack'
        options={{ headerShown: false}}
        component={GroupsStack}
      />
     <Tabs.Screen
        name='Payments'
        options={{ headerShown: false }}
        component={AccountsStack}
      />
    </Tabs.Navigator>
  );

}

export default AppTabs;
