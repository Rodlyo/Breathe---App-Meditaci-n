import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Image, Alert } from 'react-native';
import { styles } from './Styles';
import { validarUsuario } from './database';

const logoImage = require('./assets/breathe.png');

export default function LoginScreen({ onLoginSuccess, onGoRegister, onForgotPassword }) {
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');

    const handleLogin = async () => {
        const u = usuario.trim();
        const p = contrasena;
        const valido = await validarUsuario(u, p);

        if (valido) {
            onLoginSuccess();
        } else {
            Alert.alert('Error', 'Usuario o contraseña incorrectos');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Logo */}
            <View style={styles.logoContainer}>
                <Image source={logoImage} style={styles.logo} />
            </View>

            {/* Rectángulo de pestañas */}
            <View style={styles.tabContainer}>
                <TouchableOpacity style={[styles.tabBase, styles.tabActive]}>
                    <Text style={styles.tabActiveText}>Iniciar sesión</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.tabBase}
                    onPress={onGoRegister}
                >
                    <Text style={styles.tabInactiveText}>Registrarse</Text>
                </TouchableOpacity>
            </View>

            {/* Inputs */}
            <TextInput
                style={styles.input}
                placeholder="Usuario"
                value={usuario}
                onChangeText={setUsuario}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={contrasena}
                onChangeText={setContrasena}
            />

            {/* Botón Ingresar */}
            <TouchableOpacity
                style={[styles.buttonBase, styles.buttonPrimary]}
                onPress={handleLogin}
            >
                <Text style={styles.buttonText}>Ingresar</Text>
            </TouchableOpacity>

            {/* Link para recuperación */}
            <TouchableOpacity onPress={onForgotPassword}>
                <Text style={styles.linkText}>¿Ha olvidado su contraseña?</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
