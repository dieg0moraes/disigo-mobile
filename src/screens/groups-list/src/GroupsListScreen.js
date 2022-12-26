import React from 'react';
import { Text, SafeAreaView, ScrollAreaView, TouchableHighlight } from 'react-native';
import { List } from 'react-native-paper';
import Center from '../../../components/center';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroups, selectGroupById } from '../../../stores/slices/groupsSlice';
import { Card } from 'react-native-paper';

const GroupsListScreen = ({ navigation }) => {

  const groups = useSelector(state => state.groups?.groups)

  const dispatcher = useDispatch();

  React.useEffect(() => {
    dispatcher(fetchGroups())
  }, []);

  const redirectToGroupView = (group) => {
    dispatcher(selectGroupById({id: group.expenses_group_id}))
    navigation.navigate('GroupDetail', { group })
  }

  const renderGroup = (group) => {
    return (
      <TouchableHighlight
        key={group.name + "touch"}
        onPress={() => redirectToGroupView(group)}
        activeOpacity={0.8}
        underlayColor='grey'
        style={{
          backgroundColor: 'white',
          borderRadius: 50,
          marginBottom: 2,
          marginHorizontal: 5,
          width: 150
        }}
      >
        <List.Item title={group.name}/>
      </TouchableHighlight>
    )

  }

  return(
    <Center>
      <List.Section>
        <List.Subheader>Groups</List.Subheader>
      { groups && groups.map(g => renderGroup(g))}
      </List.Section>
    </Center>
  );
}

export default GroupsListScreen;
