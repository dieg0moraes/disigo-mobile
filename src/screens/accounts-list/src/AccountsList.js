import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, Button } from 'react-native';
import Center from '../../../components/center';
import BankingService from '../../../services/BankingService';
import AccountCard from '../../../components/account-card';


const AccountsList = ({navigation}) => {
  const [ accounts, setAccounts ] = useState();

  const loadAccounts = async () =>{
    const response = await BankingService.getUserAccounts();
    const data = response.data;
    console.log(data)
    setAccounts(data.accounts);
  };

  useEffect(() => {
    loadAccounts();
    console.log(accounts)
  }, []);

  const navigateToDetail = (numberVal, provider) => {
    navigation.navigate('AccountDetail', { numberVal: numberVal, provider: provider })
  }

  return (
    <Center>
     {
       accounts && accounts.length > 0
        ? accounts.map(a => <AccountCard account={a}/>)
        : <Text>No tienes ningun cuenta</Text>
     }
    </Center>
  );
}

export default AccountsList;
