import { Text, View, Image, StyleSheet } from 'react-native';
import React from 'react';
import Status from './Status';

const Header = ({ uid, area, categorie, evidence, status }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: evidence[0] }} style={styles.icon} />

            <View style={{ maxWidth: '67%' }}>
                <Text style={styles.subTitle}>
                    {uid}
                </Text>
                <Text style={styles.title} numberOfLines={2}>
                    {`${area} - ${categorie}`}
                </Text>

                <Status status={status} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        marginBottom: 30,
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
        marginBottom: 10,
    },
});

export default Header;