import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from '../../../stacks/home-stack';
import AccountsStack from '../../../stacks/accounts-stack';


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
      <Tabs.Screen name='HomeStack' options={{ headerShown: false }} component={HomeStack} />
     <Tabs.Screen name='Payments' options={{ headerShown: false }} component={AccountsStack} />
    </Tabs.Navigator>
  );

}

export default AppTabs;
