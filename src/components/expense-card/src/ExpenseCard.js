import React from 'react';
import { Button, Card, Title, Paragraph, Text } from 'react-native-paper';
import { Account } from '../../../models/AccountModel';

const ExpenseCard = ({title, totalAmount, styles}) => {
    return(
        <Card style={styles}>
            <Card.Content>
                <Title>{title}</Title>
                <Paragraph>{totalAmount}</Paragraph>
            </Card.Content>
        </Card>
    );
}

export default ExpenseCard;

