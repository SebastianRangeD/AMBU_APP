import React from 'react';
import Header from './User/Header';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

// Hardcoded user
const user = {
    uid: '1234-098u-98jb-bhj1',
    name: 'Juan Estrada Rectángulo',
    role: 'Agente',
    area: 'Fauna y control animal',
    park: 'Colomos',
}

const UserSettings = () => {
    return (
        <View style={styles.view}>
            <Header {...user} />

            <View style={styles.container}>
                {/* Change Password */}
                <TouchableHighlight onPress={() => console.log('1')} style={styles.actionBtn} activeOpacity={1} underlayColor={'rgba(0, 0, 0, 0.1)'}>
                    <Text style={styles.btnText}>
                        Cambiar contraseña
                    </Text>
                </TouchableHighlight>
                {/* Permissions */}
                <TouchableHighlight onPress={() => console.log('1')} style={styles.actionBtn} activeOpacity={1} underlayColor={'rgba(0, 0, 0, 0.1)'}>
                    <Text style={styles.btnText}>
                        Gestionar permisos
                    </Text>
                </TouchableHighlight>
                {/* Logout */}
                <TouchableHighlight onPress={() => console.log('1')} style={[styles.actionBtn, styles.logoutBtn]} activeOpacity={1} underlayColor={'rgba(234, 134, 143, 0.5)'}>
                    <Text style={styles.btnText}>
                        Cerrar sesión
                    </Text>
                </TouchableHighlight>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    view: {
        height: '100%',
        padding: 20,
    },
    container: {
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
    actionBtn: {
        paddingVertical: 15,
        paddingHorizontal: 18,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    },
    logoutBtn: {
        backgroundColor: 'rgba(234, 134, 143, 0.3)',
    },
    btnText: {
        color: '#333',
        fontSize: 16,
        fontFamily: 'Montserrat_600SemiBold',
    }
});

export default UserSettings;
