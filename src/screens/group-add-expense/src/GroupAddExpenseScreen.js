import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Center from '../../../components/center';
import InputText from '../../../wrappers/text-input';
import { addExpenseToGroup } from '../../../stores/slices/groupsSlice';
import Button from '../../../wrappers/button';
import { Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

// TODO: Refactor because is using flatlist in a scrollview
const GroupAddExpenseScreen = () => { 

  const [title, setTitle] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [payedBy, setPayedBy] = useState('');

  const groupId = useSelector(state => state.groups.selectedGroup)

  const dispatcher = useDispatch();

  const group = useSelector(state => state.groups.groups
    .find(g => g.expenses_group_id == groupId));

  const [participantsSelectList, setParticipantsSelectList] = useState(
    [...group?.participants.map(p => ({...p, selected: false}))]
  );

  const [whoPaysList, setWhoPaysList] = useState(
    [...group?.participants.map(p => ({...p, selected: false}))]
  );

  const onPressParticipantsListHandler = (username) => {
    const renderData = [...participantsSelectList];
    for(let data of renderData){
      if(data.username == username){
        data.selected = data?.selected == undefined ? true : !data.selected;
        break;
      }
    }
    setParticipantsSelectList(renderData)
  }

  const onPressWhoPaysListHandler = (username) => {
    const renderData = [...whoPaysList];

    for(let data of renderData){
      if(data.username == username){
        data.selected = data?.selected == undefined ? true : !data.selected;
      } else {
        data.selected = false;
      };
    }
    setWhoPaysList(renderData)
  }

  const handleAddNewExpense = () => {
    dispatcher(addExpenseToGroup(
      {
        groupId: groupId,
        participants: participantsSelectList.filter(p => p.selected).map(p => p.username),
        title: title,
        totalAmount: totalAmount,
        payedBy: payedBy
      }
    ))
  }

  return (
    <ScrollView>
      <Center>
        <InputText
          placeholder='Titulo'
          style={{width: 200, marginTop: 40}}
          autoCapitalize='none'
          value={title}
          onChangeText={setTitle}
        />
        <InputText
          placeholder='Monto total'
          style={{width: 200}}
          autoCapitalize='none'
          value={totalAmount}
          onChangeText={setTotalAmount}
        />

        <Text>Pagado por</Text>

        <FlatList
          horizontal={false}
          data={whoPaysList}
          keyExtractor={item => item.username}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => {
              onPressWhoPaysListHandler(item.username)
              setPayedBy(item.username)
            }
            }>
              <Card
                style={
                  item.selected == true
                    ? {
                        padding: 10,
                        backgroundColor: '#182653',
                        borderRadius: 5,
                        width: 120,
                        margin:2
                      }
                    : {
                        padding: 10,
                        borderRadius: 5,
                        backgroundColor: '#0D5DBC',
                        margin:2,
                        width: 120
                      }
                }>
                <Text style={{color: 'white'}}>{item.username}</Text>
              </Card>
            </TouchableOpacity>
            )}
          />

        <Text>Participants</Text>
        <FlatList
          horizontal={true}
          data={participantsSelectList}
          keyExtractor={item => item.username}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onPressParticipantsListHandler(item.username)}>
              <Card
                style={
                  item.selected==true
                    ? {
                        padding: 10,
                        backgroundColor: '#182653',
                        borderRadius: 5,
                        width: 120,
                      }
                    : {
                        padding: 10,
                        borderRadius: 5,
                        backgroundColor: '#0D5DBC',
                        width: 120
                      }
                }>
                <Text style={{color: 'white'}}>{item.username}</Text>
              </Card>
            </TouchableOpacity>
            )}
          />
        <Button onPress={() => handleAddNewExpense()} text={'Agregar'}/>
      </Center>
    </ScrollView>
  )
}

export default GroupAddExpenseScreen;
