import React, { useEffect, useState } from 'react';
import { Text, ScrollView } from 'react-native';
import BankingService from '../../../services/BankingService';
import { useIsFocused } from '@react-navigation/native';
import AccountCard from '../../../components/account-card';
import Modal from '../../../components/modal';

import { deleteAccount } from '../../../stores/slices/accountsSlice';
import { useDispatch } from 'react-redux';

const AccountsList = ({navigation}) => {

  const [ accounts, setAccounts ] = useState();
  const dispatch = useDispatch();

  const isFocused = useIsFocused();
  const [ loading, setLoading ] = useState(false);

  const [ modalVisible, setModalVisible ] = useState(false);
  const [ error, setError ] = useState('');

  const close = (e) => {
    setModalVisible(false);
  }


  const loadAccounts = async () =>{
    const response = await BankingService.getUserAccounts();
    const data = response.data;
    setAccounts(data.accounts);
  };


  useEffect(() => {
    loadAccounts();
  }, []);

  const navigateToDetail = (numberVal, provider) => {
    navigation.navigate('AccountDetail', { numberVal: numberVal, provider: provider })
  }


  const handleDeleteAccount = ({ provider, number }) => {
    try {
      dispatch(deleteAccount({ provider, number }));
      setError('Cuenta eliminada')
      setModalVisible(true)
      loadAccounts()
    } catch (error) {

    }
  }
  return (
    <ScrollView>
      <Modal error={error} visible={modalVisible} closeModal={close} />
     {
       accounts && accounts.length > 0
        ? accounts.map(a => <AccountCard
            styles={{ borderRadius: 30, marginBottom: 5}}
            account={a}
            handleDelete={handleDeleteAccount}
          />)
        : <Text>No tienes ningun cuenta</Text>
     }
    </ScrollView>
  );
}

export default AccountsList;
