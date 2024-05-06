import React, { useState } from 'react';
import Header from './User/Header';
import { StyleSheet, Text, TouchableHighlight, View, Modal, Alert, TextInput, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Camera} from 'expo-camera'
import * as Location from 'expo-location'

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
//Changes password
const [newPassword, setNewPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [modalVisiblePassword, setModalVisiblePassword] = useState(false);
//Camera and Location Permissions
const [modalVisiblePermissions, setModalVisiblePermissions] = useState(false);
const [cameraEnabled, setCameraEnabled] = useState(false);
const [locationEnabled, setLocationEnabled] = useState(false);

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
        try {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('user');
        } catch (error) {
            console.error('Error al cerrar sesion', error);
        }
    }

    const changePassword = () => {
        if (newPassword.trim() !== '' &&  confirmPassword.trim() !== ''){
            if(newPassword === confirmPassword){
                Alert.alert('Cambio de Contraseña exitoso');
                setNewPassword('');
                setConfirmPassword('');
                setModalVisiblePassword(false);
            }else{
                Alert.alert('Las contraseñas no coinciden', 'Vuelva a intentarlo');
            }
        }else if(newPassword.trim() === ''){
            Alert.alert('Ingresa la nueva contraseña');
        }else if(confirmPassword.trim() === ''){
            Alert.alert('Ingresar la confirmación de la contraseña');
        }else{
            Alert.alert('Debes llenar los campos anteriores');
        }
    };

    const cameraPermission = async () => {
        if(!cameraEnabled){
            const {status} = await Camera.requestCameraPermissionsAsync();
            if(status === 'granted'){
                setCameraEnabled(true);
            }
        }else{
            setCameraEnabled(false);
            await Camera.requestCameraPermissionsAsync({access: 'denied'});
        }
    };

    const locationPermission = async () => {
        if(!locationEnabled){
            const {status} = await Location.requestForegroundPermissionsAsync();
            if(status === 'granted'){
                setLocationEnabled(true);
            }
        }else{
            setLocationEnabled(false);
            await Location.requestForegroundPermissionsAsync({status: 'denied'});
        }
    } 

    return (
        <View style={styles.view}>
            <Header {...user} />
            <View style={styles.container}>
                {/* Change Password */}
                <TouchableHighlight onPress={() => setModalVisiblePassword(true)} style={styles.actionBtn} activeOpacity={1} underlayColor={'rgba(0, 0, 0, 0.1)'}>
                    <Text style={styles.btnText}>
                        Cambiar contraseña
                    </Text>
                </TouchableHighlight>
                <Modal animationType='slide' transparent={true} visible={modalVisiblePassword} onRequestClose={() => setModalVisiblePassword(false)}>
                   <View style={styles.containerModal}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Cambiar Contraseña</Text>
                            <TextInput style={styles.modalInputText} placeholder="Nueva Contraseña" value={newPassword} onChangeText={text => setNewPassword(text)} secureTextEntry={true} />
                            <TextInput style={styles.modalInputText} placeholder="Confirmar Contraseña" value={confirmPassword} onChangeText={text => setConfirmPassword(text)} secureTextEntry={true} />
                            <TouchableHighlight style={[styles.modalBtn, styles.modalBtnComfirm]} onPress={changePassword}>
                                <Text style={styles.modalBtnText}>
                                    Cambiar contraseña
                                </Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={[styles.modalBtn, styles.modalBtnCancel]} onPress={() => [setNewPassword(''), setConfirmPassword(''), setModalVisiblePassword(false)]}>
                                <Text style={styles.modalBtnText}>
                                    Cancelar
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </View> 
                </Modal>
                {/* Permissions */}
                <TouchableHighlight onPress={() => setModalVisiblePermissions(true)} style={styles.actionBtn} activeOpacity={1} underlayColor={'rgba(0, 0, 0, 0.1)'}>
                    <Text style={styles.btnText}>
                        Gestionar permisos
                    </Text>
                </TouchableHighlight>
                <Modal animationType='slide' transparent={true} visible={modalVisiblePermissions} onRequestClose={() => setModalVisiblePermissions(false)}>
                   <View style={styles.containerModal}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Permisos</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={cameraEnabled ? "#f5dd4b" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={cameraPermission}
                                value={cameraEnabled}
                                />
                                <Text>Solicitar Acceso a la Cámara</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                                <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={locationEnabled ? "#f5dd4b" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={locationPermission}
                                value={locationEnabled}
                                />
                                <Text>Solicitar Acceso a la Ubicación</Text>
                            </View>
                            <TouchableHighlight style={[styles.modalBtn, styles.modalBtnCancel]} onPress={() => setModalVisiblePermissions(false)}>
                                <Text style={styles.modalBtnText}>
                                    Cancelar
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </View> 
                </Modal>
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
    },
    containerModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalBtn:{
        width: 180,
        marginTop: 5,
        paddingVertical: 10,
        borderRadius: 15,
        elevation: 2,
    },
    modalBtnComfirm:{
        backgroundColor: 'blue',
    },
    modalBtnCancel:{
        backgroundColor: 'red',
    },
    modalBtnText:{
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    modalInputText:{
        width: 180,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 15,
        marginBottom: 10,
        padding: 10,
    },
    modalText:{
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,

    }
});

export default UserSettings;
