import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Image, Alert } from 'react-native';
import { PALETTE } from './Styles';

const iconUser = require('./assets/user.png');
const libraryImage = require('./assets/fondo.jpg');
const customizationImage = require('./assets/fondo.jpg');
const progressImage = require('./assets/fondo.jpg');

export default function MenuScreen({ onLogout }) {

    const handleLogout = () => {
        Alert.alert(
            "Cerrar sesión",
            "¿Deseas cerrar sesión?",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Cerrar sesión", onPress: () => onLogout() }
            ]
        );
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.userText}>Usuario</Text>
                <TouchableOpacity onPress={handleLogout}>
                    <Image source={iconUser} style={styles.userIcon} />
                </TouchableOpacity>
            </View>

            {/* Temporizador central */}
            <View style={styles.timerContainer}>
                <View style={styles.timerCircle}>
                    <Text style={styles.timerText}>10:00</Text>
                </View>
                <TouchableOpacity style={styles.timerButton}>
                    <Text style={styles.timerButtonText}>Seleccionar sonido</Text>
                </TouchableOpacity>
            </View>

            {/* Botones tipo tarjeta */}
            <View style={styles.cardsContainer}>
                <TouchableOpacity style={styles.card}>
                    <ImageBackground source={libraryImage} style={styles.cardBackground} imageStyle={{ borderRadius: 15 }}>
                        <Text style={styles.cardText}>BIBLIOTECA</Text>
                    </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card}>
                    <ImageBackground source={customizationImage} style={styles.cardBackground} imageStyle={{ borderRadius: 15 }}>
                        <Text style={styles.cardText}>PERSONALIZACIÓN</Text>
                    </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card}>
                    <ImageBackground source={progressImage} style={styles.cardBackground} imageStyle={{ borderRadius: 15 }}>
                        <Text style={styles.cardText}>PROGRESO</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </View>

            {/* Barra inferior */}
            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.bottomButton}>
                    <Text style={styles.bottomText}>⚙️ Configuración</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomButton}>
                    <Text style={styles.bottomText}>🏠 Inicio</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomButton}>
                    <Text style={styles.bottomText}>⏰ Recordatorio</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f3e8', paddingTop: 50 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'center',
        marginBottom: 30,
    },
    userText: { fontSize: 20, fontWeight: 'bold' },
    userIcon: { width: 40, height: 40, borderRadius: 20 },

    timerContainer: { alignItems: 'center', marginBottom: 30 },
    timerCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: PALETTE.COLOR_GREEN,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    timerText: { fontSize: 24, fontWeight: 'bold', color: PALETTE.TEXT_DARK },
    timerButton: {
        backgroundColor: PALETTE.BUTTON_SECONDARY,
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
    },
    timerButtonText: { color: 'white', fontWeight: 'bold' },

    cardsContainer: { paddingHorizontal: 20 },
    card: { marginBottom: 20 },
    cardBackground: {
        width: '100%',
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardText: { color: 'white', fontSize: 20, fontWeight: 'bold' },

    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#e0e4d7',
    },
    bottomButton: { alignItems: 'center' },
    bottomText: { fontSize: 14, fontWeight: 'bold' },
});
