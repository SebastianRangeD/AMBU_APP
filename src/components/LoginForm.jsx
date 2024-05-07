import React, { useState } from 'react';
import Constants from 'expo-constants';
import { TextInput, View, Text, Button, Alert, StyleSheet, Image, ActivityIndicator } from 'react-native';
import Logo from '../../assets/img/logo.png';
import { FontAwesome6 } from '@expo/vector-icons';
import { TouchableHighlight } from '@gorhom/bottom-sheet';

const credentials = {
    user: 'admin',
    password: '123',
};

const Loading = ({ loading }) => {
    if (!loading) return;

    return (
        <ActivityIndicator size={'large'} color={'#3DA891'} style={styles.loader} />
    );
}

const LoginForm = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState('');

    const alertLogin = () => {
        setLoading(true);

        if (username === credentials.user && password === credentials.password) {
            Alert.alert('Inicio de sesion exitoso');
            navigation.navigate('Layout');
        } else if (username !== credentials.user && password !== credentials.password) {
            Alert.alert('Inicio de sesion fallido: usuario y contraseña incorrectos');
        } else if (username !== credentials.user) {
            Alert.alert('Inicio de sesion fallido: usuario incorrecto');
        } else {
            Alert.alert('Inicio de sesion fallido: contraseña incorrecta');
        }

        setTimeout(() => { // simulated timeout when consuming API
            setLoading(false);
        }, 1000);

        setUsername('');
        setPassword('');
    };

    return (
        <View style={styles.container}>
            <View style={styles.decorator}></View>

            <Loading loading={loading} />
            {/* <ActivityIndicator size={'large'} color={'#3DA891'} style={styles.loader} /> */}


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

                <TouchableHighlight onPress={alertLogin} style={styles.btnLogin} activeOpacity={1} underlayColor={'#DFE38B'}>
                    <Text style={styles.btnText}>
                        Iniciar Sesión
                    </Text>
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
    loader: {
        position: 'absolute',
        zIndex: 2,
        width: '100%',
        height: '100%',
        transform: [{ scale: 2 }]
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
