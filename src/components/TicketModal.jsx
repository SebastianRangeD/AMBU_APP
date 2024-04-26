import React from 'react';
import Constants from 'expo-constants';
import { Modal, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import Header from './Ticket/Header';
import Description from './Ticket/Description';
import Gallery from './Ticket/Gallery';
import Location from './Ticket/Location';

const EndTicketBtn = ({ ticketStatus = 'Concluido', handlePress = () => { console.log('handler') } }) => {
    const statusStyles = {
        'Activo': {
            btn: {
                backgroundColor: '#dc3545',
            },
            hover: 'rgba(234, 134, 143, 1)',
            text: 'Atender',
        },
        'Seguimiento': {
            btn: {
                backgroundColor: '#198754',
            },
            hover: 'rgba(117, 183, 152, 1)',
            text: 'Concluir',
        },
    }
    if (ticketStatus === 'Concluido') return;

    return (
        <TouchableHighlight onPress={handlePress} style={[styles.actionBtn, statusStyles[ticketStatus].btn]} activeOpacity={1} underlayColor={statusStyles[ticketStatus].hover}>
            <Text style={styles.btnText}>
                {statusStyles[ticketStatus].text} incidencia
            </Text>
        </TouchableHighlight>
    );
}

const TicketModal = ({ isVisible, handleModal, uid = '', area = '', categorie = '', evidence = [], status = '', comments = '', coordinates = { lat: '0', lng: '0' } }) => {
    return (
        <Modal animationType='slide' transparent={true} visible={isVisible}>
            <View style={styles.modal}>
                <TouchableHighlight activeOpacity={1} underlayColor={'rgba(0,0,0,0)'} onPress={() => handleModal(false)}>
                    <FontAwesome6 name="times-circle" style={styles.closeBtn} />
                </TouchableHighlight>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <Header uid={uid} area={area} categorie={categorie} evidence={evidence} status={status} />

                    <Description comments={comments} />

                    <Gallery evidence={evidence} />

                    <Location coordinates={coordinates} />

                    <EndTicketBtn ticketStatus={status} />
                </ScrollView>
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
        paddingBottom: 60,
        paddingHorizontal: 20,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOpacity: 0.5,
        elevation: 5,
    },
    closeBtn: {
        fontSize: 30,
        marginStart: 'auto',
        color: '#dc3545',
        marginVertical: 15,
    },
    actionBtn: {
        borderRadius: 8,
        padding: 15,
        marginBottom: 50,
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Montserrat_600SemiBold',
        textAlign: 'center',
        textTransform: 'uppercase',
    }
});

export default TicketModal;