import React, { useState } from 'react';

import { Text, StyleSheet, ActivityIndicator, Alert, BackHandler } from 'react-native';
import Center from '../../../components/center';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

import InputText from '../../../wrappers/text-input';
import Button from '../../../wrappers/button';

import CacheService from '../../../services/CacheService';
import BankingService from '../../../services/BankingService';

const SendMoney = ({route, navigation}) => {
  const [ amount, setAmount ] = React.useState(0);

  const [ concept, setConcept ] = React.useState(0);

  const [ isFocusOrigin, setIsFocusOrigin ] = useState(false);

  const [ originAccountSelected, setOriginAccountSelected ] = useState('');

  const [ isFocusDestino, setIsFocusDestino ] = useState(false);

  const [ destinationAccount, setDestinationAccount ] = useState('santander');

  const [ originAccounts, setOriginAccounts ] = useState([]);

  const [ loading, setLoading ] = useState(false);

  const destinationAccounts = route.params['accounts'];

  React.useEffect(() =>{
    getOriginAccountsAvailable()
  }, []);

  const onPressMakeTransfer = async () => {
    try {
      setLoading(true)
      const data = {
        'destination_internal_id': destinationAccount,
        'amount': amount,
        'token': '',
        'origin_internal_id': originAccountSelected,
        'concept': concept,
        'currency': 'UYU',
        'owner': 'Benjamin'
      }
     const response = await BankingService.postMakeTransfer(data);
    } catch (error) {
      console.log(error)
    }
    setLoading(false)

  }

  const getOriginAccountsAvailable = async () => {
    try {
      const data = await CacheService.getSecureItem('accounts');

      const accounts = data.map(
        (acc) => {
          return {
            label: `${acc.name} - ${acc.number}`,
            value: `${acc.internalId}`
          }
        }
      );

      setOriginAccounts(accounts)

    } catch(e) {
      console.log(e)
    }
  }

  const getDestinationAccountsAvailable = () => {
      return destinationAccounts.map(
        (acc) => {
          return {
            label: `${acc.name} - ${acc.number}`,
            value: `${acc.internal_id}`
          }
        }
      );
  }

  return (
    <Center>
      <Text>Transferencia</Text>
    { loading ? <ActivityIndicator/> : null}
     <Dropdown
          style={[styles.dropdown, isFocusOrigin && { borderColor: 'blue', width:'50%', marginBottom: 20 }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={originAccounts}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocusOrigin ? 'Cuenta origen' : '...'}
          searchPlaceholder="Search..."
          value={originAccountSelected}
          onFocus={() => setIsFocusOrigin(true)}
          onBlur={() => setIsFocusOrigin(false)}
          onChange={item => {
            setOriginAccountSelected(item.value);
            setIsFocusOrigin(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocusOrigin ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />
      <InputText
        keyboardType='numeric'
        placeholder='Monto'
        style={{width: 200, marginBottom: 15}}
        autoCapitalize='none'
        value={amount}
        onChangeText={setAmount}
      />
     <Dropdown
          style={[styles.dropdown, isFocusDestino && { borderColor: 'blue', width:'50%', marginBottom: 20 }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={getDestinationAccountsAvailable()}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocusDestino ? 'Cuenta destino' : '...'}
          searchPlaceholder="Search..."
          value={destinationAccount}
          onFocus={() => setIsFocusDestino(true)}
          onBlur={() => setIsFocusDestino(false)}
          onChange={item => {
            setDestinationAccount(item.value);
            setIsFocusDestino(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocusDestino ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />
      <InputText
        placeholder='Concepto'
        style={{width: 200}}
        autoCapitalize='none'
        value={concept}
        onChangeText={setConcept}
      />
      <Button onPress={onPressMakeTransfer} text={'Transferir'}/>
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


export default SendMoney;

