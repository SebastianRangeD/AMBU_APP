import React, { useState } from 'react';
import { TextInput, View, Text, Button, Alert, StyleSheet} from 'react-native';

/*
ACTIVIDAD A COMPLETAR:

Parte 1: Con los componentes de react native crear un pequeño form de dos
inputs de texto (Usuario y contraseña) y un botón (Iniciar sesión) para tener la estructura base del login.

Parte 2: Utilizando los hooks correspondientes (Lo más probable es que sean useState o useRef).
Hacer que esos hooks almacenen el valor del usuario y la contraseña cada que se modifique el
contenido de los inputs.

Parte 3: Al dar click en el botón de iniciar sesión, que compare las credenciales ingresadas por el usuario
con las que te dejo hardcodeadas, en caso de coincidencia manda un alert con el mensaje ('Inicio de sesión 
exitoso'), caso contrario, un alert con el mensaje (`Inicio de sesión fallido: ${Campo que no coincidió}`).
 */


const credentials = {
    user: 'admin@ambu.mx',
    password: 'Admin.2024!',
};

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const alertLogin = () => {
        if (username === credentials.user && password === credentials.password){
            Alert.alert('Inicio de sesion exitoso');
        }else if(username !== credentials.user && password !== credentials.password){
            Alert.alert('Inicio de sesion fallido: usuario y contraseña incorrectos');
        }else if(username !== credentials.user){
            Alert.alert('Inicio de sesion fallido: usuario incorrecto');
        }else{
            Alert.alert('Inicio de sesion fallido: contraseña incorrecta');
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Park Traiking</Text>
            <TextInput 
                placeholder='Usuario' 
                style={styles.textInput} 
                onChangeText={text => setUsername(text)}/>
            <TextInput 
                placeholder='Contraseña' 
                style={styles.textInput} 
                onChangeText={text => setPassword(text)} 
                secureTextEntry={true}/>
            <Button style={styles.button} title='Iniciar Sesion' onPress={alertLogin}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        fontSize: 65,
        color: 'black',
        fontWeight: 'bold',
    },
    textInput:{
        padding:10,
        paddingStart:30,
        width:'80%',
        height:50,
        marginTop:20,
        borderRadius:30
    },
    button:{
        width:'80%',
        height:50,
        borderRadius:25,
        padding:10,
        alignItems:'center',
        justifyContent:'center'
    }
});

export default LoginForm;
