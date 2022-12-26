import React from 'react';
import { Text, ScrollView, RefreshControl} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGroups } from '../../../stores/slices/groupsSlice';

const GroupParticipantsScreen = ({ navigation }) => {

  const group = useSelector(state => state.groups.groups
    .find(g => g.expenses_group_id == state.groups.selectedGroup));

  const refreshing = useSelector(state => state.groups.isFetchingGroups);
  const dispatcher = useDispatch();

  const onRefresh = React.useCallback(() => {
    dispatcher(fetchGroups())
  }, []);


  return (
    <ScrollView
      refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
      }
    >

     { group && group.participants?.map(p => <Text>{p.username}</Text>)}
    </ScrollView>
  )
}

export default GroupParticipantsScreen;
