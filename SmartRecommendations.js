import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { PALETTE } from './Styles';

// Componente para mostrar recomendaciones inteligentes basadas en la luz ambiental
export const SmartMeditationRecommendations = ({ lightLevel, illuminance, onApplySettings }) => {

    // Función para obtener recomendaciones específicas según el nivel de luz
    const getSmartRecommendations = (level, lux) => {
        switch (level) {
            case 'Muy Oscuro':
                return {
                    duration: 5, // minutos
                    soundType: 'Campanas Tibetanas',
                    technique: 'Meditación de Respiración Profunda',
                    warning: 'Asegúrate de estar en un lugar seguro',
                    benefits: 'Ideal para relajación nocturna y liberación del estrés del día',
                    color: '#2c2c54'
                };

            case 'Oscuro':
                return {
                    duration: 10,
                    soundType: 'Lluvia',
                    technique: 'Meditación de Mindfulness Nocturno',
                    warning: null,
                    benefits: 'Perfect para meditar antes de dormir y calmar la mente',
                    color: '#40407a'
                };

            case 'Tenue':
                return {
                    duration: 15,
                    soundType: 'Olas del Mar',
                    technique: 'Meditación de Atención Plena',
                    warning: null,
                    benefits: 'Condiciones óptimas para meditación profunda y contemplativa',
                    color: '#706fd3'
                };

            case 'Moderado':
                return {
                    duration: 20,
                    soundType: 'Ninguno',
                    technique: 'Meditación Vipassana',
                    warning: null,
                    benefits: 'Excelente para sesiones de meditación diurna y concentración',
                    color: '#f7b731'
                };

            case 'Brillante':
                return {
                    duration: 10,
                    soundType: 'Campanas Tibetanas',
                    technique: 'Meditación de Atención Respiratoria',
                    warning: 'Considera atenuar la luz para mejor concentración',
                    benefits: 'Bueno para meditaciones energizantes matutinas',
                    color: '#fa8231'
                };

            case 'Muy Brillante':
                return {
                    duration: 5,
                    soundType: 'Lluvia',
                    technique: 'Meditación Corta de Centramiento',
                    warning: 'Demasiada luz puede distraer - busca un lugar más tenue',
                    benefits: 'Sesiones breves para encontrar calma en ambientes luminosos',
                    color: '#ff3838'
                };

            default:
                return {
                    duration: 10,
                    soundType: 'Olas del Mar',
                    technique: 'Meditación Básica',
                    warning: null,
                    benefits: 'Recomendación general para cualquier momento del día',
                    color: PALETTE.TEXT_DARK
                };
        }
    };

    const recommendation = getSmartRecommendations(lightLevel, illuminance);

    const handleApplyRecommendation = () => {
        if (onApplySettings) {
            onApplySettings({
                duration: recommendation.duration,
                sound: recommendation.soundType,
                technique: recommendation.technique
            });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>🧠 Recomendación Inteligente</Text>
                <View style={[styles.levelIndicator, { backgroundColor: recommendation.color }]} />
            </View>

            <View style={styles.recommendationCard}>
                <View style={styles.recommendationRow}>
                    <Text style={styles.label}>⏱️ Duración sugerida:</Text>
                    <Text style={styles.value}>{recommendation.duration} minutos</Text>
                </View>

                <View style={styles.recommendationRow}>
                    <Text style={styles.label}>🎵 Sonido recomendado:</Text>
                    <Text style={styles.value}>{recommendation.soundType}</Text>
                </View>

                <View style={styles.recommendationRow}>
                    <Text style={styles.label}>🧘 Técnica sugerida:</Text>
                    <Text style={styles.valueMultiline}>{recommendation.technique}</Text>
                </View>

                <Text style={styles.benefits}>
                    💡 {recommendation.benefits}
                </Text>

                {recommendation.warning && (
                    <View style={styles.warningContainer}>
                        <Text style={styles.warning}>
                            ⚠️ {recommendation.warning}
                        </Text>
                    </View>
                )}

                <TouchableOpacity
                    style={[styles.applyButton, { backgroundColor: recommendation.color }]}
                    onPress={handleApplyRecommendation}
                >
                    <Text style={styles.applyButtonText}>
                        Aplicar Configuración Recomendada
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Componente para mostrar estadísticas históricas de luz (opcional)
export const LightStatistics = ({ dailyReadings = [] }) => {
    if (dailyReadings.length === 0) {
        return (
            <View style={styles.statsContainer}>
                <Text style={styles.statsTitle}>📊 Estadísticas de Luz</Text>
                <Text style={styles.noDataText}>
                    No hay datos suficientes aún. Medita más para ver tus patrones de luz.
                </Text>
            </View>
        );
    }

    // Calcular estadísticas básicas
    const avgLight = dailyReadings.reduce((sum, reading) => sum + reading, 0) / dailyReadings.length;
    const maxLight = Math.max(...dailyReadings);
    const minLight = Math.min(...dailyReadings);

    const getPreferredTime = (avg) => {
        if (avg < 100) return 'Prefieres meditar en ambientes tenues 🌙';
        if (avg < 1000) return 'Prefieres meditar con luz moderada ☁️';
        return 'Prefieres meditar con luz natural ☀️';
    };

    return (
        <View style={styles.statsContainer}>
            <Text style={styles.statsTitle}>📊 Tu Patrón de Meditación</Text>

            <View style={styles.statRow}>
                <Text style={styles.statLabel}>Luz promedio:</Text>
                <Text style={styles.statValue}>{Math.round(avgLight)} lux</Text>
            </View>

            <View style={styles.statRow}>
                <Text style={styles.statLabel}>Rango de luz:</Text>
                <Text style={styles.statValue}>{Math.round(minLight)} - {Math.round(maxLight)} lux</Text>
            </View>

            <Text style={styles.preference}>
                {getPreferredTime(avgLight)}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        padding: 16,
        borderRadius: 12,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 4,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: PALETTE.TEXT_DARK,
        flex: 1,
    },
    levelIndicator: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    recommendationCard: {
        backgroundColor: 'rgba(240, 243, 232, 0.8)',
        padding: 12,
        borderRadius: 8,
    },
    recommendationRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        alignItems: 'flex-start',
    },
    label: {
        fontSize: 14,
        color: PALETTE.TEXT_DARK,
        fontWeight: '500',
        flex: 1,
    },
    value: {
        fontSize: 14,
        color: PALETTE.TEXT_DARK,
        fontWeight: '600',
        flex: 1,
        textAlign: 'right',
    },
    valueMultiline: {
        fontSize: 14,
        color: PALETTE.TEXT_DARK,
        fontWeight: '600',
        flex: 1.5,
        textAlign: 'right',
    },
    benefits: {
        fontSize: 13,
        color: '#666',
        fontStyle: 'italic',
        marginTop: 10,
        lineHeight: 18,
    },
    warningContainer: {
        backgroundColor: '#fff3cd',
        padding: 8,
        borderRadius: 6,
        marginTop: 10,
        borderLeftWidth: 3,
        borderLeftColor: '#ffc107',
    },
    warning: {
        fontSize: 12,
        color: '#856404',
        fontWeight: '500',
    },
    applyButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 15,
        alignItems: 'center',
    },
    applyButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },

    // Estilos para estadísticas
    statsContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 15,
        borderRadius: 12,
        marginVertical: 10,
    },
    statsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: PALETTE.TEXT_DARK,
        marginBottom: 12,
    },
    statRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    statLabel: {
        fontSize: 14,
        color: PALETTE.TEXT_DARK,
    },
    statValue: {
        fontSize: 14,
        fontWeight: '600',
        color: PALETTE.TEXT_DARK,
    },
    preference: {
        fontSize: 13,
        color: '#666',
        fontStyle: 'italic',
        marginTop: 8,
    },
    noDataText: {
        fontSize: 13,
        color: '#999',
        fontStyle: 'italic',
        textAlign: 'center',
    },
});

export default SmartMeditationRecommendations;