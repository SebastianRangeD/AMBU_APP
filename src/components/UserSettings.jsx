import React from 'react';
import Header from './User/Header';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

/*
ACTIVIDAD A COMPLETAR:

Parte 1: Crear el funcionamiento para que al presionar "Cambiar contraseña" se abra un modal
con dos inputs para ingresar la nueva contraseña y confirmar contraseña, y al final un botón para
realizar el cambio de contraseña. Si el cambio de contraseña es exitoso (coinciden ambas contraseñas)
se cierra el modal con alerta de éxito, si no, se notifica que las contraseñas no coinciden.

Parte 2: Investigar como puedes hacer que al presionar la opción "Gestionar permisos" en el teléfono se te
solicite acceso a la cámara y a la ubicación, es decir, el típico mensaje de "Permitir Acceso a la cámara, si, no"
y ese rollo.

Parte 3: Al dar click en el botón de cerrar sesión, que acceda al AsyncStorage y limpie el token de sesion y los datos
de usuario te dejo este link de referencia para leer un poco que es el AsyncStorage:
https://medium.com/@khriztianmoreno/dominando-el-almacenamiento-local-en-react-native-mejores-pr%C3%A1cticas-y-estrategias-de-611548cbb772
 */

// Hardcoded user
const user = {
    uid: '1234-098u-98jb-bhj1',
    name: 'Juan Estrada Rectángulo',
    role: 'Agente',
    area: 'Fauna y control animal',
    park: 'Colomos',
}

const token = 'oi98-09pa-bhj1-oq10';

const UserSettings = () => {
    /* 
        Esta funcion NO LA BORRES es solo para setear el token hardcodeado en cuanto se entra a la vista
        pero se seteara al iniciar sesion de forma automatica. 
    */
    (async () => {
        try {
            await AsyncStorage.setItem('token', token);
        } catch (e) {
            console.error(e);
        }
    })();

    // Funcion para cerrar sesión, es asincrona porque el asyncStorage lo es
    const logout = async () => {
    
    }

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
                <TouchableHighlight onPress={logout} style={[styles.actionBtn, styles.logoutBtn]} activeOpacity={1} underlayColor={'rgba(234, 134, 143, 0.5)'}>
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
