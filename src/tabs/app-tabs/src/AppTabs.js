import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from '../../../stacks/home-stack';
import AccountsStack from '../../../stacks/accounts-stack';
import GroupsStack from '../../../stacks/groups-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';


const Tabs = createBottomTabNavigator();

const AppTabs = ({}) => {

  return(
    <Tabs.Navigator
      sceneContainerStyle={{ backgroundColor: 'black' }}
    >
      <Tabs.Screen
        name='HomeStack'
        options={({route}) => ({
            headerShown: false,
            tabBarIcon: () => {
                const color = route.name === 'HomeStack' ? "#0D5DBC" : "grey"
                return <Icon name="home" size={30} color={color} />
            }
        })}
        component={HomeStack}
      />
      <Tabs.Screen
        name='Grupos'
        options={ ({route}) => ({
            headerShown: false,
            tabBarIcon: () => {
                const color = route.name === 'Grupos' ? "#0D5DBC" : "grey"
                return <Icon name="groups" size={30} color={color} />
            }
      })}
        component={GroupsStack}
      />
     <Tabs.Screen
        name='Payments'
        options={ ({route}) => ({
            headerShown: false,
            tabBarIcon: () => {
                const color = route.name === 'Payments' ? "#0D5DBC" : "grey"
                return <Icon name="payment" size={30} color={color} />
            }
        })}
        component={AccountsStack}
      />
    </Tabs.Navigator>
  );
}

export default AppTabs;
