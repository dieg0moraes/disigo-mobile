import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GroupsListScreen from '../../../screens/groups-list';
import GroupDetailScreen from '../../../screens/group-detail';
import AddGroupScreen from '../../../screens/add-group';
import GroupParticipantsScreen from '../../../screens/group-participants';
import GroupAddParticipantScreen from '../../../screens/group-add-participant/';
import GroupAddExpenseScreen from '../../../screens/group-add-expense/';


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
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: 'Grupo'
        }}
        name='GroupDetail'
        component={GroupDetailScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: 'Add new group'
        }}
        name='AddGroup'
        component={AddGroupScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: 'Add Participant'
        }}
        name='AddParticipant'
        component={GroupAddParticipantScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: 'Add Expense'
        }}
        name='AddExpense'
        component={GroupAddExpenseScreen}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: 'Group participants',
          headerRight: () => {
              return (
                <TouchableOpacity
                  onPress={() => {
                      navigation.navigate('AddParticipant')
                  }}
                >
                  <Text>Agregar Participante</Text>
                </TouchableOpacity>
              )
        },
        })}
        name='GroupParticipants'
        component={GroupParticipantsScreen}
      />
    </Stack.Navigator>)
}


export default GroupsStack;
