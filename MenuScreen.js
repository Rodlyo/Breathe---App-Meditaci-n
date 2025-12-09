import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { PALETTE } from './Styles';
import { useAmbientLight, AmbientLightDisplay } from './AmbientLightSensor';
import { SmartMeditationRecommendations } from './SmartRecommendations';

const iconUser = require('./assets/user.png');

export default function MenuScreen({ onLogout, setPantalla, mostrarBienvenida, usuarioActual, temaOscuro }) {
    const { lightData, isAvailable } = useAmbientLight();
    const [showSmartRecommendations, setShowSmartRecommendations] = useState(false);

    const backgroundColor = temaOscuro ? '#1a1a1a' : '#fff';
    const textColor = temaOscuro ? '#fff' : '#333';
    const cardBackground = temaOscuro ? '#2a2a2a' : '#f5f5f5';

    const applySmartSettings = (settings) => {
        Alert.alert(
            "Configuración Aplicada",
            `Se ha configurado tu sesión con:\n• Duración: ${settings.duration} minutos\n• Sonido: ${settings.sound}\n• Técnica: ${settings.technique}`,
            [{ text: "Ir a Biblioteca", onPress: () => setPantalla('biblioteca') }]
        );
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

    const NotificationBar = () => {
        if (!mostrarBienvenida) return null;
        return (
            <View style={styles.notificationBar}>
                <Text style={styles.notificationText}>Bienvenido de vuelta. Tu momento de paz te espera.</Text>
            </View>
        );
    };

    const notificationHeight = 60;
    const headerConditionalMargin = mostrarBienvenida ? notificationHeight : 0;

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <NotificationBar />

            <View style={[styles.header, { marginTop: headerConditionalMargin }]}>
                <Text style={[styles.userText, { color: textColor }]}>{usuarioActual || 'Usuario'}</Text>
                <TouchableOpacity
                    style={styles.smartButton}
                    onPress={() => setShowSmartRecommendations(!showSmartRecommendations)}
                >
                    <Text style={styles.smartButtonText}>Inteligencia</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPantalla('configuracion')}>
                    <Image source={iconUser} style={styles.userIcon} />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {/* Sensor de Luz Compacto */}
                <AmbientLightDisplay
                    lightData={lightData}
                    isAvailable={isAvailable}
                    compact={true}
                />

                {/* Recomendaciones Inteligentes */}
                {showSmartRecommendations && (
                    <SmartMeditationRecommendations
                        lightLevel={lightData.level}
                        illuminance={lightData.illuminance}
                        onApplySettings={applySmartSettings}
                    />
                )}

                {/* Sección de Introducción */}
                <View style={styles.introSection}>
                    <Text style={[styles.introTitle, { color: textColor }]}>Bienvenido a Breathe</Text>
                    <Text style={styles.introSubtitle}>Tu compañero de meditación y bienestar</Text>
                    <Text style={[styles.introDescription, { color: textColor }]}>
                        Explora nuestras meditaciones, usa nuestro sensor de luz para recomendaciones personalizadas y sigue tu progreso.
                    </Text>
                </View>

                {/* Sección de Acciones Principales */}
                <View style={styles.mainActionsSection}>
                    <Text style={[styles.sectionTitle, { color: textColor }]}>Explorar</Text>

                    <TouchableOpacity
                        style={[styles.mainCard, { backgroundColor: cardBackground }]}
                        onPress={() => setPantalla('biblioteca')}
                    >
                        <View style={styles.mainCardIcon}>
                            <Text style={styles.cardIconText}>📚</Text>
                        </View>
                        <View style={styles.mainCardContent}>
                            <Text style={[styles.mainCardTitle, { color: textColor }]}>Biblioteca de Meditaciones</Text>
                            <Text style={[styles.mainCardDescription, { color: textColor }]}>Accede a 9+ meditaciones guiadas</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.mainCard, { backgroundColor: cardBackground }]}
                        onPress={() => setPantalla('ambient-light-demo')}
                    >
                        <View style={styles.mainCardIcon}>
                            <Text style={styles.cardIconText}>💡</Text>
                        </View>
                        <View style={styles.mainCardContent}>
                            <Text style={[styles.mainCardTitle, { color: textColor }]}>Sensor de Luz Ambiental</Text>
                            <Text style={[styles.mainCardDescription, { color: textColor }]}>Meditaciones adaptadas a tu entorno</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Sección de Información */}
                <View style={styles.infoSection}>
                    <Text style={[styles.sectionTitle, { color: textColor }]}>Más Opciones</Text>

                    <TouchableOpacity style={[styles.infoCard, { backgroundColor: cardBackground }]} onPress={() => setPantalla('configuracion')}>
                        <Text style={[styles.infoCardTitle, { color: textColor }]}>Configuración</Text>
                        <Text style={[styles.infoCardSubtitle, { color: textColor }]}>Personaliza tu experiencia</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.infoCard, { backgroundColor: cardBackground }]} onPress={() => setPantalla('progreso')}>
                        <Text style={[styles.infoCardTitle, { color: textColor }]}>Mi Progreso</Text>
                        <Text style={[styles.infoCardSubtitle, { color: textColor }]}>Ve tus estadísticas de meditación</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.infoCard, { backgroundColor: cardBackground }]} onPress={() => setPantalla('recordatorios')}>
                        <Text style={[styles.infoCardTitle, { color: textColor }]}>Recordatorios</Text>
                        <Text style={[styles.infoCardSubtitle, { color: textColor }]}>Notificaciones personalizadas</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>

            {/* Barra inferior */}
            <View style={[styles.bottomBar, { backgroundColor: cardBackground, borderTopColor: temaOscuro ? '#444' : '#e0e0e0' }]}>
                <TouchableOpacity style={styles.bottomButton} onPress={() => setPantalla('configuracion')}>
                    <Text style={styles.bottomText}>Configuración</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomButton} onPress={() => setPantalla('menu')}>
                    <Text style={styles.bottomText}>Inicio</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomButton} onPress={() => setPantalla('recordatorios')}>
                    <Text style={styles.bottomText}>Recordatorio</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: PALETTE.BACKGROUND_MAIN,
        paddingTop: 50,
    },

    notificationBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: PALETTE.COLOR_GREEN,
        paddingBottom: 10,
        paddingTop: 30,
        zIndex: 100,
        alignItems: 'center',
    },

    notificationText: {
        color: '#fff',
        fontWeight: '500',
        fontSize: 14,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'center',
        marginBottom: 25,
    },

    userText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: PALETTE.TEXT_DARK,
    },

    smartButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: PALETTE.BUTTON_SECONDARY,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },

    smartButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 12,
    },

    userIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },

    scrollContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },

    // ---- Sección Introducción ----
    introSection: {
        marginBottom: 30,
        paddingVertical: 20,
    },

    introTitle: {
        fontSize: 26,
        fontWeight: '700',
        color: PALETTE.COLOR_BLUE,
        marginBottom: 5,
    },

    introSubtitle: {
        fontSize: 14,
        fontWeight: '600',
        color: PALETTE.COLOR_GREEN,
        marginBottom: 10,
    },

    introDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },

    // ---- Sección Acciones Principales ----
    mainActionsSection: {
        marginBottom: 30,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: PALETTE.TEXT_DARK,
        marginBottom: 15,
    },

    mainCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        alignItems: 'center',
    },

    mainCardIcon: {
        width: 60,
        height: 60,
        borderRadius: 15,
        backgroundColor: PALETTE.COLOR_ROSE,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },

    cardIconText: {
        fontSize: 32,
    },

    mainCardContent: {
        flex: 1,
    },

    mainCardTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: PALETTE.TEXT_DARK,
        marginBottom: 4,
    },

    mainCardDescription: {
        fontSize: 12,
        color: '#999',
    },

    // ---- Sección Información ----
    infoSection: {
        marginBottom: 20,
    },

    infoCard: {
        backgroundColor: '#f8f8f8',
        borderRadius: 12,
        paddingVertical: 15,
        paddingHorizontal: 15,
        marginBottom: 10,
        borderLeftWidth: 4,
        borderLeftColor: PALETTE.BUTTON_PRIMARY,
    },

    infoCardTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: PALETTE.TEXT_DARK,
        marginBottom: 4,
    },

    infoCardSubtitle: {
        fontSize: 12,
        color: '#999',
    },

    // ---- Barra Inferior ----
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

    bottomButton: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

    bottomText: {
        fontSize: 13,
        fontWeight: '600',
        color: PALETTE.TEXT_DARK,
    },
});