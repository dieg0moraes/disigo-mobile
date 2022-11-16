import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import FriendsService from '../../../services/FriendsService';
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';
import { useDispatch } from 'react-redux';
import { showModal } from '../../../stores/slices/errorsSlice';


const ReadQRCodeScreen = ({ navigation }) => {
  const devices = useCameraDevices()
  const device = devices.back
  const dispatcher = useDispatch()

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  const sanitizeNumber = (number) => {
    let onlyNumbers = number.replace('/\D/g', '');
    if(number) {
      onlyNumbers = onlyNumbers.replace(' ', '');
      onlyNumbers = onlyNumbers.replace(' ', '');
      onlyNumbers = onlyNumbers.replace('-', '');
      onlyNumbers = onlyNumbers.replace('(', '');
      onlyNumbers = onlyNumbers.replace(')', '');
      onlyNumbers = onlyNumbers.replace('+', '');
      onlyNumbers = onlyNumbers.replace('tel:');
    }

    return onlyNumbers;
  }

  const navigate = async (number) => {
    try {
      const resp = await FriendsService.findFriendByPhone(number);
      const data = resp.data;
      if (data['accounts'].length == 0) {
        dispatcher(showModal({message: 'El usuario seleccionado no tiene una cuenta destino'}))
        return;
      }

      if (data['message'] !== 'not found') {
        navigation.navigate('SendMoneyScreen', {accounts: resp.data['accounts'] } );
      } else {
        dispatcher(showModal({message: 'El usuario seleccionado no tiene una cuenta de disigo'}))
      }

    } catch (e) {
      dispatcher(showModal({message: 'Ups, paso algo inesperado'}))
    }
  }

  React.useEffect(() => {
    if(barcodes.length > 0) {
      navigate(barcodes[0].displayValue)
    }

  }, [ barcodes ]);

  React.useEffect(() => {
    const permissions = async () => {
      const cameraPermission = await Camera.getCameraPermissionStatus()
      if(cameraPermission === 'denied') {
        const newCameraPermission = await Camera.requestCameraPermission()
      }
    }
    permissions()

  }, []);

  if(!device) return <Text>loading</Text>

  return (
    <>
     <Camera
      style={StyleSheet.absoluteFill}
      frameProcessor={frameProcessor}
      device={device}
      isActive={true}
    />
    {
      barcodes.map((barcode, idx) => (
        <Text key={idx}>
          {barcode.displayValue}
        </Text>
      ))
    }
    </>
  )
}

const styles = StyleSheet.create({
  barcodeTextURL: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ReadQRCodeScreen;
