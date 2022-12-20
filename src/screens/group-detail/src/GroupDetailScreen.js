import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupExpenses } from '../../../stores/slices/groupsSlice';
import { Text, FlatList } from 'react-native';


const GroupDetailScreen = ({ route, navigation }) => {

  const expenses = useSelector(state => state.groups.expenses)

  const group = route.params['group'];
  const dispatcher = useDispatch();

  React.useEffect(() => {
    dispatcher(getGroupExpenses(group.expenses_group_id))
  },[])



  return <Text>Hole</Text>

}

export default GroupDetailScreen;
