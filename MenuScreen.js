import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Image, Alert, Platform, ScrollView } from 'react-native';
import { PALETTE } from './Styles';
import { useAmbientLight, AmbientLightDisplay } from './AmbientLightSensor';
import { SmartMeditationRecommendations } from './SmartRecommendations';

const iconUser = require('./assets/user.png');
const libraryImage = require('./assets/fondo.jpg');
const customizationImage = require('./assets/fondo.jpg');
const progressImage = require('./assets/fondo.jpg');

// Constantes para el temporizador: 10 minutos * 60 segundos
const INITIAL_TIME = 600;

export default function MenuScreen({ onLogout, setPantalla, mostrarBienvenida }) {
    //ESTADO DEL TEMPORIZADOR
    const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
    const [isRunning, setIsRunning] = useState(false);
    const [selectedSound, setSelectedSound] = useState('Ninguno'); // 🎵 NUEVO: Estado para el sonido
    const timerRef = useRef(null); // Para almacenar la referencia del setInterval

    // SENSOR DE LUZ AMBIENTAL
    const { lightData, isAvailable } = useAmbientLight();
    const [showSmartRecommendations, setShowSmartRecommendations] = useState(false);

    //LÓGICA DEL TEMPORIZADOR Usandoo -> (useEffect)
    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            // Iniciar el intervalo para el conteo regresivo
            timerRef.current = setInterval(() => {
                setTimeLeft((prevTime) => {
                    // Detener al llegar a 0
                    if (prevTime <= 1) {
                        clearInterval(timerRef.current);
                        setIsRunning(false);
                        Alert.alert("Meditación Terminada", "¡Has completado tu sesión!");
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000); // 1000ms = 1 segundo
        } else {
            // Limpiar el intervalo si se pausa o se detiene
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }

        // Función de limpieza que se ejecuta al desmontar el componente o al cambiar dependencies
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isRunning, timeLeft]);


    // FUNCIÓN PARA FORMATEAR EL TIEMPO (MM:SS)
    const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // FUNCIÓN PARA SELECCIONAR SONIDO
    const handleSoundSelection = () => {
        Alert.alert(
            "Seleccionar Sonido",
            "Elige un sonido relajante para tu sesión de meditación:",
            [
                { text: "Lluvia 🌧️", onPress: () => setSelectedSound('Lluvia') },
                { text: "Olas del Mar 🌊", onPress: () => setSelectedSound('Olas del Mar') },
                { text: "Campanas Tibetanas 🔔", onPress: () => setSelectedSound('Campanas Tibetanas') },
                { text: "Ninguno", onPress: () => setSelectedSound('Ninguno'), style: 'cancel' },
            ]
        );
    };

    // FUNCIÓN PARA INICIAR/PAUSAR/REANUDAR
    const toggleTimer = () => {
        const newState = !isRunning;
        setIsRunning(newState);

        // Simulamos la lógica de iniciar/pausar el sonido
        if (newState) {
            console.log(`[Sound] Iniciando sonido: ${selectedSound}`);
            // Aquí iría la lógica real para reproducir el audio seleccionado
        } else {
            console.log(`[Sound] Pausando sonido: ${selectedSound}`);
            // Aquí iría la lógica real para pausar el audio
        }
    };

    // FUNCIÓN PARA REINICIAR
    const resetTimer = () => {
        clearInterval(timerRef.current);
        setIsRunning(false);
        setTimeLeft(INITIAL_TIME);
        // Simulamos la lógica de detener el sonido
        console.log(`[Sound] Deteniendo y Reiniciando sonido.`);
    };

    // FUNCIÓN PARA APLICAR CONFIGURACIONES INTELIGENTES BASADAS EN LUZ
    const applySmartSettings = (settings) => {
        // Aplicar duración recomendada (convertir minutos a segundos)
        const newTime = settings.duration * 60;
        setTimeLeft(newTime);

        // Aplicar sonido recomendado
        setSelectedSound(settings.sound);

        // Mostrar confirmación
        Alert.alert(
            "Configuración Aplicada",
            `Se ha configurado tu sesión con:\n• Duración: ${settings.duration} minutos\n• Sonido: ${settings.sound}\n• Técnica: ${settings.technique}`,
            [{ text: "Comenzar Meditación", onPress: () => toggleTimer() }]
        );

        console.log(`[SmartSettings] Aplicadas: ${settings.duration}min, ${settings.sound}, ${settings.technique}`);
    };


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

    // Componente discreto de notificación (Toast in-app)
    const NotificationBar = () => {
        if (!mostrarBienvenida) return null;

        return (
            <View style={styles.notificationBar}>
                <Text style={styles.notificationText}>¡Bienvenido de vuelta! Tu paz comienza ahora. 🧘</Text>
            </View>
        );
    };

    // Altura aproximada de la barra de notificación para empujar el contenido
    const notificationHeight = 60;

    // El margen se aplica al header solo si la notificación está visible
    const headerConditionalMargin = mostrarBienvenida ? notificationHeight : 0;


    return (
        <View style={styles.container}>
            {/*BARRA DE NOTIFICACIÓN FLOTANTE */}
            <NotificationBar />

            {/*Header (con margen condicional) */}
            <View style={[styles.header, { marginTop: headerConditionalMargin }]}>
                <Text style={styles.userText}>Usuario</Text>
                <TouchableOpacity
                    style={styles.smartButton}
                    onPress={() => setShowSmartRecommendations(!showSmartRecommendations)}
                >
                    <Text style={styles.smartButtonText}>💡</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogout}>
                    <Image source={iconUser} style={styles.userIcon} />
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                {/*SENSOR DE LUZ AMBIENTAL - Siempre visible en formato compacto */}
                <AmbientLightDisplay
                    lightData={lightData}
                    isAvailable={isAvailable}
                    compact={true}
                />

                {/* RECOMENDACIONES INTELIGENTES - Mostrar/Ocultar */}
                {showSmartRecommendations && (
                    <SmartMeditationRecommendations
                        lightLevel={lightData.level}
                        illuminance={lightData.illuminance}
                        onApplySettings={applySmartSettings}
                    />
                )}

                {/* Temporizador central y CONTROLES AÑADIDOS */}
                <View style={styles.timerContainer}>
                    <View style={styles.timerCircle}>
                        <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
                    </View>

                    {/* 🎶 Indicador de Sonido Seleccionado */}
                    <Text style={styles.soundSelectionText}>Sonido: {selectedSound}</Text>

                    <TouchableOpacity
                        style={[styles.timerButton, { marginBottom: 20 }]}
                        onPress={handleSoundSelection} //  Nuevo handler de selección
                    >
                        <Text style={styles.timerButtonText}>Seleccionar sonido</Text>
                    </TouchableOpacity>

                    {/*  Botón INICIAR/PAUSAR/REANUDAR */}
                    <TouchableOpacity
                        style={[
                            styles.controlButton,
                            { backgroundColor: isRunning ? PALETTE.COLOR_RED || '#D9534F' : PALETTE.COLOR_GREEN }
                        ]}
                        onPress={toggleTimer}
                    >
                        <Text style={styles.controlButtonText}>
                            {isRunning ? 'PAUSAR' : (timeLeft === INITIAL_TIME ? 'INICIAR' : 'REANUDAR')}
                        </Text>
                    </TouchableOpacity>

                    {/* Botón de REINICIAR (solo visible cuando se ha iniciado o pausado y no está en el tiempo inicial) */}
                    {timeLeft !== INITIAL_TIME && (
                        <TouchableOpacity
                            style={[styles.controlButton, styles.resetButton]}
                            onPress={resetTimer}
                        >
                            <Text style={styles.controlButtonText}>REINICIAR</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {/* Botones tipo tarjeta */}
                <View style={styles.cardsContainer}>
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => setPantalla('biblioteca')}
                    >
                        <ImageBackground source={libraryImage} style={styles.cardBackground} imageStyle={{ borderRadius: 15 }}>
                            <Text style={styles.cardText}>BIBLIOTECA</Text>
                        </ImageBackground>
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => setPantalla('ambient-light-demo')}
                    >
                        <ImageBackground source={customizationImage} style={styles.cardBackground} imageStyle={{ borderRadius: 15 }}>
                            <Text style={styles.cardText}>💡 SENSOR LUZ</Text>
                        </ImageBackground>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card}>
                        <ImageBackground source={progressImage} style={styles.cardBackground} imageStyle={{ borderRadius: 15 }}>
                            <Text style={styles.cardText}>PROGRESO</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
            </ScrollView>

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
    container: {
        flex: 1,
        backgroundColor: '#f0f3e8',
        paddingTop: 50
    },

    // ESTILOS DE NOTIFICACIÓN IN-APP
    notificationBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: PALETTE.COLOR_GREEN, // Verde Oliva
        paddingBottom: 10,
        paddingTop: 30,
        zIndex: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notificationText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 15,
    },

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

    // 🎶 NUEVO ESTILO: Para mostrar el sonido seleccionado
    soundSelectionText: {
        fontSize: 16,
        color: PALETTE.TEXT_DARK,
        marginBottom: 10,
        fontWeight: '500',
    },

    // Se modificó el margen inferior para dar espacio a los nuevos botones
    timerButton: {
        backgroundColor: PALETTE.BUTTON_SECONDARY,
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
    },
    timerButtonText: { color: 'white', fontWeight: 'bold' },

    // ESTILOS PARA LOS BOTONES DE CONTROL (INICIAR/PAUSAR/REINICIAR)
    controlButton: {
        width: 150,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        marginBottom: 10,
    },
    controlButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    resetButton: {
        backgroundColor: PALETTE.TEXT_DARK || '#808080', // Gris oscuro para Reiniciar
        marginTop: 10,
    },

    // 💡 NUEVOS ESTILOS PARA SENSOR DE LUZ
    scrollContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    smartButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: PALETTE.COLOR_GREEN,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    smartButtonText: {
        fontSize: 18,
        color: 'white',
    },

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