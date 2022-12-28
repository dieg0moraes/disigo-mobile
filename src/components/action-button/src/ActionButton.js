import React from 'react';
import { Text, TouchableHighlight } from 'react-native';
import { styles } from '../lib/styles'
import Icon from 'react-native-vector-icons/MaterialIcons';

const ActionText = ({ text }) => {
  return (
    <React.Fragment>
      <Text style={styles.text}>{text}</Text>
    </React.Fragment>
  );
}
const ActionButton = ({ action, ...props }) => {

    const [ isPress, setIsPress ] = React.useState(false);

    const touchProps = {
        activeOpacity: 0,
        onHideUnderlay: () => setIsPress(false),
        onShowUnderlay: () => setIsPress(true),
        onPress: () => { return; }, // <-- "onPress" is apparently required
        ...props
      };

    const contStyles = isPress ? styles.btnPress : styles.btnNormal;
    return (
        <TouchableHighlight style={contStyles} {...touchProps}>
            <ActionText text={action.text}/>
        </TouchableHighlight>
    );
}

export {
    ActionButton
}

