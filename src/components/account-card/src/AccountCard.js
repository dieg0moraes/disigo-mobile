import React from 'react';
import { Button, Card, Title, Paragraph, Text } from 'react-native-paper';
import { Account } from '../../../models/AccountModel';

const AccountCard = ({account, styles, handleDelete, handleLogin}) => {
  console.log(account)
    return(
        <Card style={styles}>
            <Card.Content>
                <Title>{account.provider}</Title>
                <Paragraph>{account.name}</Paragraph>
                <Paragraph>{account.currency}</Paragraph>
                <Paragraph>{account.number}</Paragraph>
            </Card.Content>
            <Card.Actions style={{display: 'flex', justifyContent:'center' }}>
                <Button onPress={() => handleDelete(account)}>Delete account</Button>
            </Card.Actions>
        </Card>
    );
}

export default AccountCard;
