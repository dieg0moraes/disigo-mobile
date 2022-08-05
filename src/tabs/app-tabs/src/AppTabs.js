import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from '../../../stacks/home-stack';
/*
import { HomeStack } from '../stacks/HomeStack';
import { ProfileStack } from '../stacks/ProfileStack';
import AccountsStack from '../stacks/AccountsStack';
*/

const Tabs = createBottomTabNavigator();
/*
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'Profile') {
            iconName = 'ios-list';
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
       })}
      <Tabs.Screen name='Accounts' component={AccountsStack} />
      <Tabs.Screen name='Profile' component={ProfileStack} />
       */

const AppTabs = ({}) => {

  return(
    <Tabs.Navigator
       tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
       }}
    >
      <Tabs.Screen name='HomeStack' options={{ headerShown: false }} component={HomeStack} />
    </Tabs.Navigator>
  );

}

export default AppTabs;
