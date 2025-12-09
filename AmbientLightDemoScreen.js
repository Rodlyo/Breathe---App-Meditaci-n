import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Alert
} from 'react-native';
import { useAmbientLight, AmbientLightDisplay } from './AmbientLightSensor';
import { SmartMeditationRecommendations, LightStatistics } from './SmartRecommendations';
import { PALETTE } from './Styles';

export default function AmbientLightDemoScreen({ onBack }) {
    const { lightData, isAvailable } = useAmbientLight();
    const [showRecommendations, setShowRecommendations] = useState(true);

    // Datos simulados de ejemplo para estadísticas
    const sampleLightReadings = [45, 120, 80, 200, 150, 95, 60, 180];

    const handleApplySettings = (settings) => {
        Alert.alert(
            "Configuración Aplicada",
            `Configuración inteligente aplicada:\n\n• Duración: ${settings.duration} minutos\n• Sonido: ${settings.sound}\n• Técnica: ${settings.technique}`,
            [
                { text: "OK", style: "default" },
                { text: "Comenzar Sesión", onPress: () => console.log("Iniciando sesión...") }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <Text style={styles.backButtonText}>← Volver</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Sensor de Luz Ambiental</Text>
            </View>

            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {/* Estado del sensor */}
                <View style={styles.statusContainer}>
                    <Text style={styles.sectionTitle}>Estado del Sensor</Text>
                    <Text style={styles.statusText}>
                        {isAvailable
                            ? "✅ Sensor de luz ambiental disponible"
                            : "❌ Sensor no disponible en este dispositivo"
                        }
                    </Text>
                </View>

                {/* Display principal del sensor */}
                <Text style={styles.sectionTitle}>Lectura Actual</Text>
                <AmbientLightDisplay
                    lightData={lightData}
                    isAvailable={isAvailable}
                    compact={false}
                />

                {/* Display compacto */}
                <Text style={styles.sectionTitle}>Vista Compacta</Text>
                <AmbientLightDisplay
                    lightData={lightData}
                    isAvailable={isAvailable}
                    compact={true}
                />

                {/* Recomendaciones inteligentes */}
                <View style={styles.recommendationSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Recomendaciones Inteligentes</Text>
                        <TouchableOpacity
                            style={styles.toggleButton}
                            onPress={() => setShowRecommendations(!showRecommendations)}
                        >
                            <Text style={styles.toggleButtonText}>
                                {showRecommendations ? 'Ocultar' : 'Mostrar'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {showRecommendations && (
                        <SmartMeditationRecommendations
                            lightLevel={lightData.level}
                            illuminance={lightData.illuminance}
                            onApplySettings={handleApplySettings}
                        />
                    )}
                </View>

                {/* Estadísticas de ejemplo */}
                <Text style={styles.sectionTitle}>Estadísticas de Luz</Text>
                <LightStatistics dailyReadings={sampleLightReadings} />

                {/* Información sobre el sensor */}
                <View style={styles.infoContainer}>
                    <Text style={styles.sectionTitle}>Información del Sensor ( •̀ ω •́ )✧</Text>
                    <Text style={styles.infoText}>
                        📱 <Text style={styles.bold}>Sensor de Luz Ambiental:</Text> Mide la cantidad de luz que rodea al dispositivo en unidades lux.
                    </Text>
                    <Text style={styles.infoText}>
                        🌟 <Text style={styles.bold}>Rangos de medición:</Text>
                    </Text>
                    <Text style={styles.rangeText}>• 0-10 lux: Muy oscuro (luz de luna)</Text>
                    <Text style={styles.rangeText}>• 10-50 lux: Oscuro (interior con luces tenues)</Text>
                    <Text style={styles.rangeText}>• 50-200 lux: Tenue (sala bien iluminada)</Text>
                    <Text style={styles.rangeText}>• 200-1000 lux: Moderado (oficina típica)</Text>
                    <Text style={styles.rangeText}>• 1000-10000 lux: Brillante (luz natural indirecta)</Text>
                    <Text style={styles.rangeText}>• +10000 lux: Muy brillante (luz solar directa)</Text>

                    <Text style={[styles.infoText, { marginTop: 15 }]}>
                        🧘 <Text style={styles.bold}>Beneficios para la meditación:</Text>
                    </Text>
                    <Text style={styles.rangeText}>• Ajuste automático de duración según ambiente</Text>
                    <Text style={styles.rangeText}>• Recomendaciones de sonidos apropiados</Text>
                    <Text style={styles.rangeText}>• Sugerencias de técnicas de meditación</Text>
                    <Text style={styles.rangeText}>• Análisis de patrones de uso</Text>
                </View>

                {/* Espaciado adicional al final */}
                <View style={{ height: 30 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f3e8',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 15,
        paddingTop: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    backButton: {
        paddingRight: 15,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: PALETTE.BUTTON_SECONDARY,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 2,
    },
    backButtonText: {
        fontSize: 13,
        color: '#fff',
        fontWeight: '600',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: PALETTE.TEXT_DARK,
        flex: 1,
        textAlign: 'center',
        marginRight: 50, // Para centrar considerando el botón de volver
    },
    scrollContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    statusContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: PALETTE.TEXT_DARK,
        marginVertical: 15,
        marginTop: 20,
    },
    statusText: {
        fontSize: 16,
        color: PALETTE.TEXT_DARK,
    },
    recommendationSection: {
        marginVertical: 10,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    toggleButton: {
        backgroundColor: PALETTE.BUTTON_PRIMARY,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 25,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 2,
    },
    toggleButtonText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '600',
    },
    infoContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        padding: 20,
        borderRadius: 12,
        marginVertical: 15,
    },
    infoText: {
        fontSize: 14,
        color: PALETTE.TEXT_DARK,
        lineHeight: 20,
        marginBottom: 8,
    },
    bold: {
        fontWeight: 'bold',
    },
    rangeText: {
        fontSize: 13,
        color: '#666',
        marginLeft: 10,
        marginBottom: 3,
    },
});