import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Image, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { styles } from './Styles';
import { crearTabla, insertarUsuario } from './database';

const logoImage = require('./assets/breathe.png');

export default function RegisterScreen({ onRegistered, onForgotPassword }) {
    const [nombre, setNombre] = useState('');
    const [contrasena, setContrasena] = useState('');

    useEffect(() => {
        const initDB = async () => {
            await crearTabla();
        };
        initDB();
    }, []);

    const handleRegister = async () => {
        const n = nombre.trim();
        const p = contrasena.trim();
        if (!n || !p) {
            Alert.alert('Error', 'Completa todos los campos');
            return;
        }

        try {
            await insertarUsuario(n, p);
            Alert.alert('Éxito', 'Usuario registrado correctamente');
            setNombre('');
            setContrasena('');
            if (onRegistered) onRegistered();
        } catch (error) {
            console.log('Error al registrar:', error);
            Alert.alert('Error', 'No se pudo registrar el usuario');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Logo */}
            <View style={styles.logoContainer}>
                <Image source={logoImage} style={styles.logo} />
            </View>

            {/* Tabs */}
            <View style={styles.tabContainer}>
                <TouchableOpacity style={styles.tabBase} onPress={onRegistered}>
                    <Text style={styles.tabInactiveText}>Iniciar sesión</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tabBase, styles.tabActive]}>
                    <Text style={styles.tabActiveText}>Registrarse</Text>
                </TouchableOpacity>
            </View>

            {/* Inputs */}
            <TextInput
                style={styles.input}
                placeholder="Nombre de usuario"
                value={nombre}
                onChangeText={setNombre}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={contrasena}
                onChangeText={setContrasena}
            />

            {/* Botón Registrar */}
            <TouchableOpacity style={[styles.buttonBase, styles.buttonPrimary]} onPress={handleRegister}>
                <Text style={styles.buttonText}>Registrar</Text>
            </TouchableOpacity>

            {/* Link Recuperar contraseña */}
            <TouchableOpacity onPress={onForgotPassword}>
                <Text style={styles.linkText}>¿Ha olvidado su contraseña?</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
