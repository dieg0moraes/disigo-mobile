import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, Button } from 'react-native';
import Center from '../../../components/center';
import BankingService from '../../../services/BankingService';



const AccountsList = ({navigation}) => {
  const [ accounts, setAccounts ] = useState();

  useEffect(() => {
    const loadAccounts = async () =>{
      const response = await BankingService.getUserAccounts();
      const data = response.data;
      console.log(data)
      setAccounts(data.accounts);
    };
    loadAccounts();
    console.log(accounts)
  }, []);

  const navigateToDetail = (numberVal, provider) => {
    navigation.navigate('AccountDetail', { numberVal: numberVal, provider: provider })
  }

  return (
    <Center>
     {accounts ? accounts.map(a => <Text>{a.provider} </Text>) : <Text>adas</Text>}
    </Center>
  );
}

export default AccountsList;
