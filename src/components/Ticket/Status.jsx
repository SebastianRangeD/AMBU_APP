import React from 'react';
import { FontAwesome6 } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

const statusStyles = {
    'Activo': {
        icon: { color: '#198754' },
        container: {
            backgroundColor: 'rgba(117, 183, 152, 0.5)', maxWidth: '50%',
        }
    },
    'Seguimiento': {
        icon: { color: '#ffc107' },
        container: {
            backgroundColor: 'rgba(255, 218, 106, 0.5)', maxWidth: '85%',
        }
    },
    'Concluido': {
        icon: { color: '#dc3545' },
        container: { backgroundColor: 'rgba(234, 134, 143, 0.5)', maxWidth: '50%' }
    },
}

const Status = ({ status }) => {
    return (
        <View style={[styles.status, statusStyles[status].container]}>
            <FontAwesome6 name="dot-circle" style={[styles.statusIcon, statusStyles[status].icon]} />

            <Text style={[styles.statusText]} numberOfLines={1}>
                {status}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    status: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderRadius: 100,
    },
    statusText: {
        fontSize: 14,
        fontFamily: 'Montserrat_600SemiBold',
    },
    statusIcon: {
        fontSize: 20,
    },
});

export default Status;
