import React, { useState, useEffect } from 'react';
import Center from '../../../components/center';
import { TextInput as Input, Text, Button } from 'react-native';
import BankingService from '../../../services/BankingService';
import { Dropdown } from 'react-native-element-dropdown';

const AddBankAccount = ({ navigation }) => {

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ provider, setProvider ] = useState('santander');
  const [ showDropDown, setShowDropDown ] = useState('santander');
  const [ providersList, setProvidersList ] = useState([]);

  useEffect(() => {
    const getProviders = async () => {
      const response = await BankingService.getProviders();
      setProvidersList(response.data.providers);
    }
    getProviders();
  }, []);

  const handleOnSubmit = async () =>{
    try {
      const accountData = {
        username: username,
        provider: provider,
        password: password
      }
      const response = await BankingService.addAccount(accountData);
      console.log(response);
    } catch(error) {
      console.log(error.response)
    }
  }

  const getProvidersItems = () => {
    return (
      providersList.map((provider, i) => {
        return <Picker.Item key={i} value={provider.code} label={provider.name} />
      })
    );
  }


  return (
    <Center>
      <Text>Select financial institution</Text>
      <Text>Add new account</Text>

      <Input
        value={username}
        onChangeText={setUsername}
        placeholder='Username'
      />
      <Input
        value={password}
        onChangeText={setPassword}
        placeholder='Password'
      />
      <Input
        value={provider}
        onChangeText={setProvider}
        placeholder='Provider'
      />
      <Button
        onPress={handleOnSubmit}
        title="Agregar"
      />
    </Center>
  );

}

export default AddBankAccount;
