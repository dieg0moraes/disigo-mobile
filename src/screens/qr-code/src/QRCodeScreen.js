import React from 'react';
import { Text } from 'react-native';
import Center from '../../../components/center'
import { AuthContext } from '../../../providers/AuthProvider';
import QRCode from 'react-native-qrcode-svg';
import { BASE_API_URL } from '../../../services/BaseService';

import {
  GET_FIND_FRIEND_BY_PHONE
} from '../../../services/endpoints/FriendsEndpoints';


const QRCodeScreen = () => {
  const { user, doRefresh } = React.useContext(AuthContext);
  const phone = user['contact_phone'];

  return (
    <Center>
      <QRCode
        value={phone}
      />
    </Center>
  );

}

export default QRCodeScreen;
