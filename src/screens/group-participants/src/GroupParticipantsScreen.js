import React from 'react';
import { ScrollView, RefreshControl} from 'react-native';
import { List, Text } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGroups } from '../../../stores/slices/groupsSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';

const GroupParticipantsScreen = ({ navigation }) => {

  const group = useSelector(state => state.groups.groups
    .find(g => g.expenses_group_id == state.groups.selectedGroup));

  const refreshing = useSelector(state => state.groups.isFetchingGroups);
  const dispatcher = useDispatch();

  const onRefresh = React.useCallback(() => {
    dispatcher(fetchGroups())
  }, []);

  const deleteParticipant = (p) => {
      console.log(p)

  }

  const renderParticipant = (participant) => {
      return(
          <List.Item
              title={participant.username}
              left={p => (<Icon name="delete" size={30} onPress={(p) => deleteParticipant(participant)}/>)}
          />
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
     <Text variant="displaySmall">Participantes</Text>
        { group && group.participants?.map(p => renderParticipant(p))}
    </ScrollView>
  )
}

export default GroupParticipantsScreen;
