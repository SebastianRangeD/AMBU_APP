import React from 'react';
import Constants from 'expo-constants';
import { Modal, StyleSheet, TouchableHighlight, View } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import Header from './Ticket/Header';
import Description from './Ticket/Description';

const TicketModal = ({ isVisible, handleModal, uid = '', area = '', categorie = '', evidence = [], status = '', comments = '' }) => {
    return (
        <Modal animationType='slide' transparent={true} visible={isVisible}>
            <View style={styles.modal}>
                <TouchableHighlight activeOpacity={1} underlayColor={'rgba(0,0,0,0)'} onPress={() => handleModal(false)}>
                    <FontAwesome6 name="times-circle" style={styles.closeBtn} />
                </TouchableHighlight>

                <Header uid={uid} area={area} categorie={categorie} evidence={evidence} status={status} />

                <Description comments={comments} />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {
        width: '100%',
        maxWidth: '100%',
        flexGrow: 1,
        marginTop: Constants.statusBarHeight + 20,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingVertical: 30,
        paddingHorizontal: 20,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOpacity: 0.5,
        elevation: 5,
    },
    closeBtn: {
        fontSize: 30,
        marginStart: 'auto',
        color: '#dc3545',
        marginBottom: 15,
    },
});

export default TicketModal;