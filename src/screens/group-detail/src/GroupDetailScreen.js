import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupExpenses, getGroupBalances } from '../../../stores/slices/groupsSlice';
import { Text, FlatList, View, StyleSheet, ScrollView } from 'react-native';
import ExpenseCard from '../../../components/expense-card';
import ActionButton from '../../../components/action-button/';


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

  const renderUserPayments = (user) => {
    const payments = balances[user];

    return (
      <>
      { payments && Object.keys(payments).map(payment => <Text>{payment}: monto {payments[payment]}</Text>)}
      </>
    )
  }

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
    <ScrollView>
      <ActionButton action={{text:'Participantes'}} onPress={ () => navigation.navigate('GroupParticipants', { group })}/>
      <Text>Resumen</Text>
      { balances && Object.keys(balances).map(user => renderUserBalance(user)) }
      <Text>Gastos</Text>
      { expenses && expenses.map(exp => <ExpenseCard title={exp.title} totalAmount={exp.total_amount}/>) }
    </ScrollView>
    
  )

}

export default GroupDetailScreen;
