import React, { useState } from 'react';
import Constants from 'expo-constants';
import { TextInput, View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import Logo from '../../assets/img/logo.png';
import { FontAwesome6 } from '@expo/vector-icons';
import { TouchableHighlight } from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import axios from 'axios';

const API_URL = 'http://3.91.151.179:3000/api';

// const credentials = {
//     user: 'admin',
//     password: '123',
// };

// Hardcoded user
// const user = {
//     uid: '1234-098u-98jb-bhj1',
//     name: 'Juan Estrada Rectángulo',
//     role: 'Agente',
//     area: 'Fauna y control animal',
//     park: 'Colomos',
// }

// const token = 'oi98-09pa-bhj1-oq10';

const alert = (msg, type = 'success') => {
    const titleDict = {
        success: 'Éxito',
        error: 'Error',
        info: 'Notifición',

    }

    if (!msg) return;

    return Toast.show({
        type: type,
        text1: titleDict[type],
        text2: msg,
    });
}

const Loading = ({ loading }) => {
    if (!loading)
        return (
            <Text style={styles.btnText}>
                Iniciar Sesión
            </Text>
        );

    return (
        <ActivityIndicator size={'small'} color={'#333'} />
    );
}

const LoginForm = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState('');

    const authLogin = async () => {
        if (!password)
            return alert('Ingrese una contraseña', 'error');
        if (!username)
            return alert('Ingrese un nombre de usuario', 'error');
        // if (username.toLocaleLowerCase() !== credentials.user)
        //     return alert('Usuario incorrecto', 'error');

        // if (password !== credentials.password)
        //     return alert('Contraseña incorrecta', 'error');

        setLoading(true);

        const credentials = {
            username: username,
            password: password,
        }

        const { data } = await axios
            .post(`${API_URL}/session/login`, credentials)
            .catch(({ response }) => {
                const { data } = response;

                if (response.status !== '500')
                    alert(data.message, 'error');
            })
            .finally(() => {
                setLoading(false);
            });

        await AsyncStorage.setItem('user', data.user);
        await AsyncStorage.setItem('token', data._id);
        alert('Sesión iniciada correctamente');
        navigation.navigate('Layout');

        setUsername('');
        setPassword('');
    };

    return (
        <View style={styles.container}>
            <View style={styles.decorator}></View>

            <Image source={Logo} style={styles.logo} />

            <View style={styles.card}>
                <Text style={styles.title}>
                    Bienvenido(a)
                </Text>

                <View style={styles.flexCenter}>
                    <FontAwesome6 name="user-large" size={20} color="#333" />
                    <TextInput
                        placeholder='Usuario'
                        style={styles.textInput}
                        value={username}
                        onChangeText={text => setUsername(text)} />
                </View>

                <View style={styles.flexCenter}>
                    <FontAwesome6 name="lock" size={20} color="#333" />
                    <TextInput
                        placeholder='Contraseña'
                        style={styles.textInput}
                        value={password}
                        onChangeText={text => setPassword(text)}
                        secureTextEntry={true} />
                </View>

                <TouchableHighlight onPress={authLogin} style={styles.btnLogin} activeOpacity={1} underlayColor={'#DFE38B'}>
                    <Loading loading={loading} />
                </TouchableHighlight>
            </View>

            <Text style={styles.version}>
                AMBU Track - v 0.0.1
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: '#FFF6E9',
        padding: 20,
    },
    card: {
        width: '100%',
        borderRadius: 40,
        backgroundColor: 'white',
        paddingHorizontal: 23,
        paddingVertical: 32,
    },
    logo: {
        position: 'absolute',
        top: Constants.statusBarHeight + 100,
    },
    decorator: {
        width: '200%',
        aspectRatio: 1,
        borderRadius: 2000,
        position: 'absolute',
        top: '-30%',
        zIndex: -1,
        backgroundColor: '#3DA891',
    },
    title: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 24,
        color: '#333',
        textAlign: 'center',
        marginBottom: 60,
    },
    textInput: {
        flexGrow: 1,
        maxWidth: '90%',
        fontSize: 16,
        fontFamily: 'Montserrat_400Regular',
        borderBottomWidth: 2,
        borderBottomColor: '#333',
        padding: 10,
    },
    btnLogin: {
        marginTop: 35,
        padding: 20,
        borderRadius: '100%',
        backgroundColor: '#EFF396',
    },
    btnText: {
        fontSize: 18,
        fontFamily: 'Montserrat_600SemiBold',
        color: '#333',
        textAlign: 'center',
    },
    flexCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 35,
    },
    version: {
        fontFamily: 'Montserrat_600SemiBold',
        color: 'rgba(0,0,0, 0.25)',
        textAlign: 'center',
        marginTop: 24,
        marginBottom: '10%',
    },
});

export default LoginForm;
