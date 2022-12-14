import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupExpenses, getGroupBalances } from '../../../stores/slices/groupsSlice';
import {Text, View, StyleSheet, ScrollView, RefreshControl, TouchableOpacity} from 'react-native';
import ExpenseCard from '../../../components/expense-card';
import ActionButton from '../../../components/action-button/';
import Icon from 'react-native-vector-icons/MaterialIcons';


const GroupDetailScreen = ({ route, navigation }) => {

  const dispatcher = useDispatch();

  const expenses = useSelector(state => state.groups.expenses)
  const balances = useSelector(state => state.groups.balances)

  const group = useSelector(state => state.groups.groups
    .find(g => g.expenses_group_id == state.groups.selectedGroup));

  React.useEffect(() => {
    dispatcher(getGroupExpenses(group?.expenses_group_id))
    dispatcher(getGroupBalances(group?.expenses_group_id))
  },[])

  const refreshing = useSelector(
    state => state.groups.isFetchingBalances ||state.groups.isFetchingExpenses)

  const onRefresh = () => {
    dispatcher(getGroupExpenses(group?.expenses_group_id))
    dispatcher(getGroupBalances(group?.expenses_group_id))
  }

  const renderUserPayments = (user) => {
    const payments = balances[user];

    return (
      <>
      { payments && Object.keys(payments).map(payment => <Text>{payment}: monto {payments[payment]}</Text>)}
      </>
    )
  }

  // the group balances comes in this format
  // translated means
  // users who owns to
  // argentina will receive payments of diegomoraes and edgar98
  /*
     "balances": {
        "argentina": {
            "diegomoraes": 2900.0,
            "edgar98": 410.3333333333333
        },
        "pruebita": {
            "diegomoraes": 900.0,
            "argentina": 1000.0
        },
        "diegomoraes": {
            "argentina": 1000.0
        },
        "prueba": {
            "diegomoraes": 500.0
        },
        "denisechang": {
            "edgar98": 410.3333333333333
        }
    }
    *
  */

  const renderUserBalance = (user) => {
    return (
      <View style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
      }}>
        <Text>{user} le debe a:</Text>
        { renderUserPayments (user) }
      </View>
    )
  }

  return (
    <ScrollView
      refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
      }
    >
      <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
      >

      <View style={{
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom:40,
        marginTop: 25,
        backgroundColor: 'white',
        borderRadius: 30
      }}>
        <TouchableOpacity
            onPress={() => {
              navigation.navigate('GroupParticipants')
            }}>
          <Icon name="person-add" size={50}/>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => {
              navigation.navigate('AddExpense')
            }}>
          <Icon name="attach-money" size={50}/>
        </TouchableOpacity>
      </View>
      
      </View>
      <Text>Resumen</Text>
      { balances && Object.keys(balances).map(user => renderUserBalance(user)) }
      <Text>Gastos</Text>
      { expenses && expenses.map(exp => <ExpenseCard title={exp.title} totalAmount={exp.total_amount}/>) }
    </ScrollView>
    
  )

}

export default GroupDetailScreen;
