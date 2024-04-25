import React from "react";
import { Image, Text, View, StyleSheet, TouchableHighlight } from "react-native";
import { Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_800ExtraBold, useFonts } from '@expo-google-fonts/montserrat';

const TicketItem = ({ uid, area, categorie, comments, evidence, handlePress }) => {
    const [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Montserrat_600SemiBold,
        Montserrat_800ExtraBold,
    });

    if (!fontsLoaded)
        return null;

    return (
        <TouchableHighlight activeOpacity={0.9} underlayColor={'#000'} onPress={() => handlePress(uid)}>
            <View key={uid} style={[styles.container]}>
                <Image source={{ uri: evidence[0] }} style={styles.icon} />

                <View>
                    <Text style={styles.subTitle}>
                        {uid}
                    </Text>
                    <Text style={styles.title}>
                        {`${area} - ${categorie}`}
                    </Text>
                    <Text style={styles.comments}>
                        {comments}
                    </Text>
                </View>
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 25,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontFamily: 'Montserrat_400Regular'
    },
    active: {
        borderBottomColor: '#3DA891',
    },
    icon: {
        width: 80,
        height: 80,
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
        fontFamily: 'Montserrat_600SemiBold'
    },
    comments: {
        fontSize: 12,
    }
});

export default TicketItem;
