import React from 'react';
import Constants from 'expo-constants';
import { Modal, StyleSheet, Text, TouchableHighlight, View, Image } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

const TicketModal = ({ isVisible, handleModal, uid = '', area = '', categorie = '', evidence = [] }) => {
    return (
        <Modal animationType='slide' transparent={true} visible={isVisible}>
            <View style={styles.modal}>
                <TouchableHighlight activeOpacity={0.9} underlayColor={'#000'} onPress={() => handleModal(false)}>
                    <FontAwesome6 name="bell" size={20} color="#000" />
                </TouchableHighlight>

                <View style={styles.container}>
                    <Image source={{ uri: evidence[0] }} style={styles.icon} />

                    <View style={{ maxWidth: '67%' }}>
                        <Text style={styles.subTitle}>
                            {uid}
                        </Text>
                        <Text style={styles.title} numberOfLines={2}>
                            {`${area} - ${categorie}`}
                        </Text>
                    </View>
                </View>
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
        alignItems: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOpacity: 0.5,
        elevation: 5,
    },
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    icon: {
        width: '100%',
        maxWidth: '30%',
        aspectRatio: 1,
        borderRadius: 500,
        borderColor: '#3DA891',
        borderWidth: 1,
    },
    subTitle: {
        fontSize: 12,
        color: '#3DA891',
        textTransform: "uppercase",
        fontFamily: 'Montserrat_800ExtraBold'
    },
    title: {
        fontSize: 16,
        fontFamily: 'Montserrat_600SemiBold',
    },
    closeBtn: {

    }
});

export default TicketModal;