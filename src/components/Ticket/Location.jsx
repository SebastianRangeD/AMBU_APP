import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Location = ({ coordinates }) => {
    return (
        <View>
            <Text style={styles.title}>
                Localización de la incidencia
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontFamily: 'Montserrat_600SemiBold',
        color: '#333333',
        marginBottom: 8,
    },
});

export default Location;
