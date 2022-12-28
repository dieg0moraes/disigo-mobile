import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Center from '../../../components/center';
import InputText from '../../../wrappers/text-input';
import {addExpenseToGroup} from '../../../stores/slices/groupsSlice';
import Button from '../../../wrappers/button';
import {Text, FlatList, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import {Card, RadioButton} from 'react-native-paper';
import {Dropdown} from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";

// TODO: Refactor because is using flatlist in a scrollview
const GroupAddExpenseScreen = () => {
  const [title, setTitle] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [payedBy, setPayedBy] = useState('');

  const [isFocus, setIsFocus] = useState(false)
  const groupId = useSelector(state => state.groups.selectedGroup)

  const dispatcher = useDispatch();

  const group = useSelector(state => state.groups.groups
    .find(g => g.expenses_group_id === groupId));

  const [participantsSelectList, setParticipantsSelectList] = useState(
    [...group?.participants.map(p => ({...p, selected: false}))]
  );

  const [whoPaysList, setWhoPaysList] = useState(
    [...group?.participants.map(p => ({...p, selected: false}))]
  );

  const onPressParticipantsListHandler = (username) => {
    const renderData = [...participantsSelectList];
    for (let data of renderData) {
      if (data.username === username) {
        data.selected = data?.selected == undefined ? true : !data.selected;
        break;
      }
    }
    setParticipantsSelectList(renderData)
  }

  const onPressWhoPaysListHandler = (username) => {
    const renderData = [...whoPaysList];

    for (let data of renderData) {
      if (data.username === username) {
        data.selected = data?.selected == undefined ? true : !data.selected;
      } else {
        data.selected = false;
      }
      ;
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
        payedBy: payedBy.value.username
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
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue', width: '50%', marginBottom: 20}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={whoPaysList.map( p => ({ label:p.username, value: p }))}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Pagado por' : '...'}
          searchPlaceholder="Search..."
          value={payedBy}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setPayedBy(item);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />


        <Text>Participants</Text>
        <FlatList
          horizontal={true}
          data={participantsSelectList}
          keyExtractor={item => item.username}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => onPressParticipantsListHandler(item.username)}>
              <Card
                style={
                  item.selected == true
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

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '50%',
    marginBottom: 10
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    width: '50%'
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default GroupAddExpenseScreen;
