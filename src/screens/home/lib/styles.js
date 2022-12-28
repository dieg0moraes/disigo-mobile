import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
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
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom:40,
        marginTop: 25,
        backgroundColor: 'white',
        borderRadius: 30
    },
    btnNormal: {
        alignItems: 'center',
        activeOpacity: 0.85,
        underlayColor: 'red',
    }
});

export {
    styles
}
