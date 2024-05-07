import React, { useState } from 'react';
import Header from './User/Header';
import { StyleSheet, Text, TouchableHighlight, View, Modal, Alert, TextInput, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome6 } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import Constants from 'expo-constants';

// Hardcoded user
const user = {
    uid: '1234-098u-98jb-bhj1',
    name: 'Juan Estrada Rectángulo',
    role: 'Agente',
    area: 'Fauna y control animal',
    park: 'Colomos',
}

const token = 'oi98-09pa-bhj1-oq10';

const UserSettings = ({ navigation }) => {
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

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('user');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error al cerrar sesion', error);
        }
    }

    const changePassword = () => {
        if (newPassword.trim() !== '' && confirmPassword.trim() !== '') {
            if (newPassword === confirmPassword) {
                Alert.alert('Cambio de Contraseña exitoso');
                setNewPassword('');
                setConfirmPassword('');
                setModalVisiblePassword(false);
            } else {
                Alert.alert('Las contraseñas no coinciden', 'Vuelva a intentarlo');
            }
        } else if (newPassword.trim() === '') {
            Alert.alert('Ingresa la nueva contraseña');
        } else if (confirmPassword.trim() === '') {
            Alert.alert('Ingresar la confirmación de la contraseña');
        } else {
            Alert.alert('Debes llenar los campos anteriores');
        }
    };

    const cameraPermission = async () => {
        if (!cameraEnabled) {
            const { status } = await Camera.requestCameraPermissionsAsync();
            if (status === 'granted') {
                setCameraEnabled(true);
            }
        } else {
            setCameraEnabled(false);
            await Camera.requestCameraPermissionsAsync({ access: 'denied' });
        }
    };

    const locationPermission = async () => {
        if (!locationEnabled) {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                setLocationEnabled(true);
            }
        } else {
            setLocationEnabled(false);
            await Location.requestForegroundPermissionsAsync({ status: 'denied' });
        }
    }

    return (
        <View style={styles.view}>
            <Header {...user} />
            <View style={styles.container}>

                {/* Change Password */}
                <TouchableHighlight onPress={() => setModalVisiblePassword(true)} style={styles.actionBtn} activeOpacity={1} underlayColor={'rgba(0, 0, 0, 0.1)'}>
                    <View style={styles.flexCenter}>
                        <FontAwesome6 name="lock" size={16} color="#333" />
                        <Text style={styles.btnText}>
                            Cambiar contraseña
                        </Text>
                    </View>
                </TouchableHighlight>

                <Modal animationType='slide' transparent={true} visible={modalVisiblePassword} onRequestClose={() => setModalVisiblePassword(false)}>
                    <View style={styles.containerModal}>
                        <TouchableHighlight activeOpacity={1} underlayColor={'rgba(0,0,0,0)'} onPress={() => [setNewPassword(''), setConfirmPassword(''), setModalVisiblePassword(false)]}>
                            <FontAwesome6 name="times-circle" style={styles.closeBtn} />
                        </TouchableHighlight>

                        <Text style={styles.title}>
                            Cambiar Contraseña
                        </Text>

                        <Text style={styles.subTitle}>
                            Nueva Contraseña
                        </Text>
                        <View style={[styles.flexCenter, { marginBottom: 24 }]}>
                            <FontAwesome6 name="lock" size={16} color="#333" />
                            <TextInput style={styles.modalInputText} value={newPassword} onChangeText={text => setNewPassword(text)} secureTextEntry={true} />
                        </View>

                        <Text style={styles.subTitle}>
                            Confirmar Contraseña
                        </Text>
                        <View style={[styles.flexCenter, { marginBottom: 24 }]}>
                            <FontAwesome6 name="lock" size={16} color="#333" />
                            <TextInput style={styles.modalInputText} value={confirmPassword} onChangeText={text => setConfirmPassword(text)} secureTextEntry={true} />
                        </View>

                        <TouchableHighlight style={[styles.modalBtn, styles.modalBtnComfirm]} onPress={changePassword}>
                            <Text style={styles.modalBtnText}>
                                Cambiar contraseña
                            </Text>
                        </TouchableHighlight>
                    </View>
                </Modal>

                {/* Permissions */}
                <TouchableHighlight onPress={() => setModalVisiblePermissions(true)} style={styles.actionBtn} activeOpacity={1} underlayColor={'rgba(0, 0, 0, 0.1)'}>
                    <View style={styles.flexCenter}>
                        <FontAwesome6 name="key" size={16} color="#333" />
                        <Text style={styles.btnText}>
                            Gestionar permisos
                        </Text>
                    </View>
                </TouchableHighlight>

                <Modal animationType='slide' transparent={true} visible={modalVisiblePermissions} onRequestClose={() => setModalVisiblePermissions(false)}>
                    <View style={styles.containerModal}>
                        <TouchableHighlight activeOpacity={1} underlayColor={'rgba(0,0,0,0)'} onPress={() => setModalVisiblePermissions(false)}>
                            <FontAwesome6 name="times-circle" style={styles.closeBtn} />
                        </TouchableHighlight>

                        <Text style={styles.title}>Permisos*</Text>

                        <View style={styles.flexCenter}>
                            <Switch
                                trackColor={{ false: "#333333", true: "#3DA891" }}
                                thumbColor={"#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={cameraPermission}
                                value={cameraEnabled}
                            />
                            <Text style={styles.subTitle}>Solicitar Acceso a la Cámara</Text>
                        </View>

                        <View style={[styles.flexCenter, { marginTop: 24, marginBottom: 48 }]}>
                            <Switch
                                trackColor={{ false: "#333333", true: "#3DA891" }}
                                thumbColor={"#f4f3f4"}
                                ios_backgroundColor="#333333"
                                onValueChange={locationPermission}
                                value={locationEnabled}
                            />
                            <Text style={styles.subTitle}>Solicitar Acceso a la Ubicación</Text>
                        </View>

                        <Text style={styles.subTitle}>
                            *Los permisos solicitados por la aplicación son para asegurar el correcto funcionamiento de las diferentes características que permiten adjuntar evidencia e información adicional al reporte de una incidencia.
                        </Text>
                    </View>
                </Modal>

                {/* Logout */}
                <TouchableHighlight onPress={logout} style={[styles.actionBtn, styles.logoutBtn]} activeOpacity={1} underlayColor={'rgba(234, 134, 143, 0.5)'}>
                    <View style={styles.flexCenter}>
                        <FontAwesome6 name="power-off" size={16} color="#D00000" />
                        <Text style={styles.btnText}>
                            Cerrar sesión
                        </Text>
                    </View>
                </TouchableHighlight>
            </View >

            <Text style={styles.version}>
                AMBU Track - v 0.0.1
            </Text>
        </View >
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
        flexGrow: 1,
        marginTop: Constants.statusBarHeight + 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
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
    title: {
        fontSize: 18,
        fontFamily: 'Montserrat_600SemiBold',
        color: '#333333',
        marginBottom: 32,
    },
    subTitle: {
        fontSize: 16,
        fontFamily: 'Montserrat_400Regular',
        color: '#333333',
        marginBottom: 4,
    },
    modalBtn: {
        borderRadius: 8,
        padding: 15,
        marginBottom: 50,
    },
    modalBtnText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Montserrat_600SemiBold',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    modalBtnComfirm: {
        backgroundColor: '#3DA891',
    },
    flexCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    modalInputText: {
        flexGrow: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        fontFamily: 'Montserrat_400Regular',
        padding: 10,
    },
    version: {
        fontFamily: 'Montserrat_600SemiBold',
        color: 'rgba(0,0,0, 0.25)',
        textAlign: 'center',
        marginTop: 24,
    }
});

export default UserSettings;
