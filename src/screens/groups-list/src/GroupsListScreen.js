import React from 'react';
import { RefreshControl, ScrollView, TouchableHighlight } from 'react-native';
import { List } from 'react-native-paper';
import Center from '../../../components/center';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroups, selectGroupById } from '../../../stores/slices/groupsSlice';

const GroupsListScreen = ({ navigation }) => {

  const groups = useSelector(state => state.groups?.groups)
  const refreshing = useSelector(state => state.groups?.isFetchingGroups)

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

  const onRefresh = () => {
    dispatcher(fetchGroups())
  }

  return(
    <ScrollView
      refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
      }
    >
      <Center>
        <List.Section>
          <List.Subheader>Groups</List.Subheader>
        { groups && groups.map(g => renderGroup(g))}
        </List.Section>
      </Center>
    </ScrollView>
  );
}

export default GroupsListScreen;
