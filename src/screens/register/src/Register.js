import React, { useState} from 'react';
import { Text, SafeAreaView } from 'react-native';
import Center from '../../../components/center';
import RegisterForm from './RegisterForm';
import InputText from '../../../wrappers/text-input';
import Modal from '../../../components/modal';
import Button from '../../../wrappers/button';


const Register = ({ navigation, route }) => {
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ error, setError ] = useState('');

  const close = (e) => {
    setModalVisible(false);
  }

  const onErrorCallback = (error) => {
    setModalVisible(true)
    setError('Revisa los datos ingresados')
  }

  return(
    <>
      <Modal/>
      <RegisterForm navigation={navigation} onErrorCallback={onErrorCallback}/>
    </>
  );
}

export default Register;

