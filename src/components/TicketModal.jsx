import React from 'react';
import Constants from 'expo-constants';
import { Modal, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

const TicketModal = ({ isVisible, handleModal }) => {
    return (
        <Modal animationType='slide' transparent={true} visible={isVisible}>
            <View style={styles.modal}>
                <TouchableHighlight activeOpacity={0.9} underlayColor={'#000'} onPress={() => handleModal(false)}>
                    <Text>
                        Cerrar
                    </Text>
                </TouchableHighlight>

                <Text>
                    Modal Ticket
                </Text>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {
        width: '100%',
        flexGrow: 1,
        marginTop: Constants.statusBarHeight + 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOpacity: 0.5,
        elevation: 5,
    },
});

export default TicketModal;