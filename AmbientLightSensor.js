import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LightSensor } from 'expo-sensors';
import { PALETTE } from './Styles';

// Hook personalizado para el sensor de luz ambiental
export const useAmbientLight = () => {
    const [lightData, setLightData] = useState({
        illuminance: 0,
        level: 'Desconocido',
        recommendation: ''
    });
    const [isAvailable, setIsAvailable] = useState(false);
    const [subscription, setSubscription] = useState(null);

    useEffect(() => {
        // Verificar si el sensor está disponible
        const checkSensorAvailability = async () => {
            try {
                const available = await LightSensor.isAvailableAsync();
                setIsAvailable(available);

                if (available) {
                    // Configurar la frecuencia de actualización (cada 1000ms)
                    LightSensor.setUpdateInterval(1000);

                    // Suscribirse a las actualizaciones del sensor
                    const sub = LightSensor.addListener((data) => {
                        const illuminance = data.illuminance;
                        const levelInfo = getLightLevel(illuminance);

                        setLightData({
                            illuminance: illuminance,
                            level: levelInfo.level,
                            recommendation: levelInfo.recommendation
                        });
                    });

                    setSubscription(sub);
                } else {
                    console.log('[AmbientLight] Sensor de luz no disponible en este dispositivo');
                }
            } catch (error) {
                console.log('[AmbientLight] Error al acceder al sensor:', error);
                setIsAvailable(false);
            }
        };

        checkSensorAvailability();

        // Cleanup al desmontar el componente
        return () => {
            if (subscription) {
                subscription.remove();
            }
        };
    }, []);

    // Función para determinar el nivel de luz y recomendaciones
    const getLightLevel = (illuminance) => {
        if (illuminance < 10) {
            return {
                level: 'Muy Oscuro',
                recommendation: 'Considera encender una luz suave para meditar con seguridad'
            };
        } else if (illuminance < 50) {
            return {
                level: 'Oscuro',
                recommendation: 'Perfecto para meditación nocturna o relajación profunda'
            };
        } else if (illuminance < 200) {
            return {
                level: 'Tenue',
                recommendation: 'Ideal para meditación y mindfulness'
            };
        } else if (illuminance < 1000) {
            return {
                level: 'Moderado',
                recommendation: 'Buena iluminación para meditación diurna'
            };
        } else if (illuminance < 10000) {
            return {
                level: 'Brillante',
                recommendation: 'Considera atenuar la luz para una mejor relajación'
            };
        } else {
            return {
                level: 'Muy Brillante',
                recommendation: 'Demasiada luz - busca un lugar más tenue para meditar'
            };
        }
    };

    return { lightData, isAvailable };
};

// Componente visual para mostrar información del sensor de luz
export const AmbientLightDisplay = ({ lightData, isAvailable, compact = false }) => {
    if (!isAvailable) {
        return (
            <View style={[styles.container, compact && styles.compactContainer]}>
                <Text style={styles.unavailableText}>
                    📱 Sensor de luz no disponible
                </Text>
            </View>
        );
    }

    const getLightIcon = (level) => {
        switch (level) {
            case 'Muy Oscuro': return '🌑';
            case 'Oscuro': return '🌘';
            case 'Tenue': return '🌗';
            case 'Moderado': return '🌖';
            case 'Brillante': return '🌕';
            case 'Muy Brillante': return '☀️';
            default: return '💡';
        }
    };

    const getLevelColor = (level) => {
        switch (level) {
            case 'Muy Oscuro': return '#2c2c54';
            case 'Oscuro': return '#40407a';
            case 'Tenue': return '#706fd3';
            case 'Moderado': return '#f7b731';
            case 'Brillante': return '#fa8231';
            case 'Muy Brillante': return '#ff3838';
            default: return PALETTE.TEXT_DARK;
        }
    };

    if (compact) {
        return (
            <View style={styles.compactContainer}>
                <View style={styles.compactRow}>
                    <Text style={styles.compactIcon}>
                        {getLightIcon(lightData.level)}
                    </Text>
                    <Text style={[styles.compactLevel, { color: getLevelColor(lightData.level) }]}>
                        {lightData.level}
                    </Text>
                </View>
                <Text style={styles.compactLux}>
                    {Math.round(lightData.illuminance)} lux
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.icon}>{getLightIcon(lightData.level)}</Text>
                <Text style={styles.title}>Luz Ambiental</Text>
            </View>

            <View style={styles.dataRow}>
                <Text style={styles.label}>Nivel:</Text>
                <Text style={[styles.level, { color: getLevelColor(lightData.level) }]}>
                    {lightData.level}
                </Text>
            </View>

            <View style={styles.dataRow}>
                <Text style={styles.label}>Intensidad:</Text>
                <Text style={styles.value}>
                    {Math.round(lightData.illuminance)} lux
                </Text>
            </View>

            <Text style={styles.recommendation}>
                💡 {lightData.recommendation}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 15,
        borderRadius: 12,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    compactContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 8,
        borderRadius: 8,
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    icon: {
        fontSize: 24,
        marginRight: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: PALETTE.TEXT_DARK,
    },
    dataRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    label: {
        fontSize: 14,
        color: PALETTE.TEXT_DARK,
        fontWeight: '500',
    },
    level: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 14,
        color: PALETTE.TEXT_DARK,
        fontWeight: '600',
    },
    recommendation: {
        fontSize: 12,
        color: '#666',
        fontStyle: 'italic',
        marginTop: 8,
        lineHeight: 16,
    },
    unavailableText: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
        fontStyle: 'italic',
    },
    compactRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    compactIcon: {
        fontSize: 16,
        marginRight: 6,
    },
    compactLevel: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    compactLux: {
        fontSize: 11,
        color: '#666',
    },
});

export default AmbientLightDisplay;