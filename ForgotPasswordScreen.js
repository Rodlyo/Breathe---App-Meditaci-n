import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { styles } from './Styles.js';

const logoImage = require('./assets/breathe.png'); // ✅ corregido

export default function ForgotPasswordScreen({ onGoLogin, onGoRegister }) {
    const [email, setEmail] = useState('');

    const handleSend = () => {
        console.log('📩 Enviando correo de recuperación a:', email);
        // Aquí puedes implementar tu lógica real de recuperación de contraseña
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Logo */}
            <View style={styles.logoContainer}>
                <Image source={logoImage} style={styles.logo} />
            </View>

            {/* Título */}
            <View style={[styles.buttonBase, styles.buttonSecondary]}>
                <Text style={[styles.buttonText, { color: 'white' }]}>
                    Recupera tu contraseña
                </Text>
            </View>

            {/* Input de correo */}
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />

            {/* Botón de enviar */}
            <TouchableOpacity
                style={[styles.buttonBase, styles.buttonPrimary]}
                onPress={handleSend}
            >
                <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>

            {/* Links para regresar */}
            <TouchableOpacity onPress={onGoLogin}>
                <Text style={styles.linkText}>¿Ya tiene cuenta?</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onGoRegister}>
                <Text style={[styles.linkText, { marginTop: 15 }]}>¿Aún no tiene cuenta?</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
