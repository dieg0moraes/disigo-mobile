import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 25,
    },
    image: {
        backgroundColor: 'gray',
        height: 140,
        borderRadius: 15,
        flexBasis: '50%',
    },
    data: {
        flexBasis: '50%',
        alignSelf: 'center'
    },
    actions: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 40,
    }

});

export {
    styles
}
