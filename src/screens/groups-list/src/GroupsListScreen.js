import React from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { List } from 'react-native-paper';
import Center from '../../../components/center';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
        <List.Item
            centered
            left={() => <Icon size={20} name="group"/>}
            title={group.name}
            onPress={() => redirectToGroupView(group)}
        />
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
      <Center styles={{alignItems: 'stretch'}}>
        <List.Section>
          <List.Subheader>Groups</List.Subheader>
        { groups && groups.map(g => renderGroup(g))}
        </List.Section>
      </Center>
    </ScrollView>
  );
}

export default GroupsListScreen;
