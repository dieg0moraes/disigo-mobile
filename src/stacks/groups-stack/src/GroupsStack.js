import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import GroupsListScreen from '../../../screens/groups-list';
import GroupDetailScreen from '../../../screens/group-detail';
import AddGroupScreen from '../../../screens/add-group';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

const GroupsStack = () => {

  return (
    <Stack.Navigator
      initialRouteName='GroupsList'
      screenOptions={{
        contentStyle: {backgroundColor: '#F7F8FA'}
      }}
    >
      <Stack.Screen
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: 'Grupos',
          headerRight: () => {
              return (
                <TouchableOpacity
                  onPress={() => {
                      navigation.navigate('AddGroup')
                  }}
                >
                  <Text>Crear grupo</Text>
                </TouchableOpacity>
              )},
        })}
        name='GroupsList'
        component={GroupsListScreen}
      / >
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: 'Grupo'
        }}
        name='GroupDetail'
        component={GroupDetailScreen}
      / >
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: 'Add new group'
        }}
        name='AddGroup'
        component={AddGroupScreen}
      / >
    </Stack.Navigator>
  )
}


export default GroupsStack;
