import React, { useState, useEffect } from 'react';
import Center from '../../../components/center';
import { Text, StyleSheet, ActivityIndicator, Alert, BackHandler } from 'react-native';
import BankingService from '../../../services/BankingService';
import InputText from '../../../wrappers/text-input';
import Button from '../../../wrappers/button';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';


const AddBankAccount = ({ navigation, backCallback }) => {

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ provider, setProvider ] = useState('santander');
  const [ showDropDown, setShowDropDown ] = useState('santander');
  const [ providersList, setProvidersList ] = useState([]);
  const [ isFocus, setIsFocus ] = useState(false);
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress', backCallback
    );

    return backHandler.remove();
  }, []);

  useEffect(() => {
    const getProviders = async () => {
      const response = await BankingService.getProviders();
      setProvidersList(response.data.providers);
    }
    getProviders();
  }, []);

  const errorMessage = () =>
    Alert.alert(
      "Error",
      "Revisa tus credenciales",
      [
        { text: "OK" }
      ]
    );

  const okMessage = () =>
    Alert.alert(
      "Ok",
      "Cuenta agregada",
      [
        { text: "OK" }
      ]
    );

  const handleOnSubmit = async () =>{
    try {
      const accountData = {
        username: username,
        provider: provider,
        password: password
      }
      setLoading(true);

      await BankingService.addAccount(accountData);

      setLoading(false);

      okMessage()

    } catch(error) {
      setLoading(false)
      errorMessage()
    }
  }

  const getProvidersItems = () => {
    return (
      providersList.map((provider, i) => {
        return {
          label: provider.name,
          value: provider.code
        }
      })
    );
  }


  return (
    <Center>
      { loading ? <ActivityIndicator/> : null}
      <Text style={{ fontSize: 20, marginBottom: 25}}>Agregar nueva cuenta bancaria</Text>
      <InputText
        style={{width: '50%'}}
        value={username}
        onChangeText={setUsername}
        placeholder='Username'
      />
      <InputText
        style={{width: '50%',marginBottom: 20}}
        value={password}
        onChangeText={setPassword}
        placeholder='Password'
        secureTextEntry
        autoCapitalize='none'
      />
     <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue', width:'50%', marginBottom: 20 }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={getProvidersItems()}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Selecionar banco' : '...'}
          searchPlaceholder="Search..."
          value={provider}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setProvider(item.value);
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
      <Button
        onPress={handleOnSubmit}
        text="Agregar"
      />
    </Center>
  );

}
const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
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

export default AddBankAccount;
