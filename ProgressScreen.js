import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { PALETTE } from './Styles';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function ProgressScreen({ onBack, progress, temaOscuro }) {
    const backgroundColor = temaOscuro ? '#111' : '#fff';
    const textColor = temaOscuro ? '#fff' : '#222';
    const cardBg = temaOscuro ? '#1f1f1f' : '#f8f8f8';
    const borderColor = temaOscuro ? '#333' : '#e0e0e0';
    const chartBarColor = PALETTE.BUTTON_PRIMARY;

    const byMedArray = Object.entries(progress.byMeditation).map(([id, data]) => ({ id, ...data }));
    byMedArray.sort((a, b) => (b.minutes || 0) - (a.minutes || 0));

    // Calculate metrics
    const avgMinutesPerSession = progress.totalSessions > 0 ? Math.round(progress.totalMinutes / progress.totalSessions) : 0;
    const mostPracticedMed = byMedArray.length > 0 ? byMedArray[0] : null;
    const meditationTypes = byMedArray.length;

    // Chart data
    const chartData = byMedArray.slice(0, 5);
    const maxMinutes = chartData.length > 0 ? Math.max(...chartData.map(d => d.minutes || 0)) : 1;

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <View style={[styles.header, { borderBottomColor: borderColor }]}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <Text style={styles.backText}>Volver</Text>
                </TouchableOpacity>
                <Text style={[styles.title, { color: textColor }]}>Mi Progreso</Text>
                <View style={{ width: 60 }} />
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Main Metrics Cards */}
                <View style={styles.metricsRow}>
                    <View style={[styles.metricCard, { backgroundColor: cardBg, borderColor, flex: 1 }]}>
                        <Text style={[styles.metricValue, { color: PALETTE.BUTTON_PRIMARY }]}>{progress.totalMinutes}</Text>
                        <Text style={[styles.metricLabel, { color: textColor }]}>Minutos totales</Text>
                    </View>
                    <View style={[styles.metricCard, { backgroundColor: cardBg, borderColor, flex: 1, marginLeft: 12 }]}>
                        <Text style={[styles.metricValue, { color: PALETTE.BUTTON_SECONDARY }]}>{progress.totalSessions}</Text>
                        <Text style={[styles.metricLabel, { color: textColor }]}>Sesiones</Text>
                    </View>
                </View>

                <View style={styles.metricsRow}>
                    <View style={[styles.metricCard, { backgroundColor: cardBg, borderColor, flex: 1 }]}>
                        <Text style={[styles.metricValue, { color: PALETTE.ACCENT_GREEN }]}>{avgMinutesPerSession}</Text>
                        <Text style={[styles.metricLabel, { color: textColor }]}>Promedio/sesión</Text>
                    </View>
                    <View style={[styles.metricCard, { backgroundColor: cardBg, borderColor, flex: 1, marginLeft: 12 }]}>
                        <Text style={[styles.metricValue, { color: PALETTE.ACCENT_ROSE }]}>{meditationTypes}</Text>
                        <Text style={[styles.metricLabel, { color: textColor }]}>Tipos de meditación</Text>
                    </View>
                </View>

                {/* Bar Chart */}
                {chartData.length > 0 && (
                    <View style={[styles.chartContainer, { backgroundColor: cardBg, borderColor }]}>
                        <Text style={[styles.chartTitle, { color: textColor }]}>Top Meditaciones</Text>
                        <View style={styles.chartWrapper}>
                            {chartData.map((med, idx) => {
                                const barHeightPercent = (med.minutes / maxMinutes) * 100;
                                return (
                                    <View key={med.id} style={styles.chartBarGroup}>
                                        <View style={styles.barContainer}>
                                            <View
                                                style={[
                                                    styles.bar,
                                                    {
                                                        height: Math.max(20, (barHeightPercent / 100) * 120),
                                                        backgroundColor: chartBarColor,
                                                    }
                                                ]}
                                            />
                                            <Text style={[styles.barLabel, { color: textColor }]}>
                                                {med.minutes}m
                                            </Text>
                                        </View>
                                        <Text style={[styles.barName, { color: textColor }]}>
                                            {(med.title || `Med ${med.id}`).substring(0, 10)}
                                        </Text>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                )}

                {/* Most Practiced Card */}
                {mostPracticedMed && (
                    <View style={[styles.highlightCard, { backgroundColor: cardBg, borderColor }]}>
                        <Text style={[styles.highlightTitle, { color: textColor }]}>🏆 Tu favorita</Text>
                        <Text style={[styles.highlightValue, { color: PALETTE.BUTTON_PRIMARY }]}>
                            {mostPracticedMed.title || `Meditación ${mostPracticedMed.id}`}
                        </Text>
                        <Text style={[styles.highlightMeta, { color: textColor }]}>
                            {mostPracticedMed.sessions} sesiones • {mostPracticedMed.minutes} minutos
                        </Text>
                    </View>
                )}

                {/* Detailed List */}
                <View>
                    <Text style={[styles.sectionTitle, { color: textColor }]}>Todas tus meditaciones</Text>
                    {byMedArray.length === 0 && (
                        <Text style={[styles.emptyText, { color: textColor }]}>
                            Aún no has completado ninguna meditación. ¡Comienza tu viaje hoy!
                        </Text>
                    )}

                    {byMedArray.map((m, idx) => (
                        <View key={m.id} style={[styles.medCard, { backgroundColor: cardBg, borderColor }]}>
                            <View style={styles.medCardContent}>
                                <Text style={[styles.medTitle, { color: textColor }]}>
                                    {m.title || `Meditación ${m.id}`}
                                </Text>
                                <Text style={[styles.medMeta, { color: textColor }]}>
                                    {m.sessions} sesiones • {m.minutes} minutos
                                </Text>
                            </View>
                            <View style={styles.medBadge}>
                                <Text style={styles.medBadgeText}>#{idx + 1}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
    },
    backButton: { padding: 8, borderRadius: 10, backgroundColor: PALETTE.BUTTON_SECONDARY },
    backText: { color: '#fff', fontWeight: '700' },
    title: { fontSize: 20, fontWeight: '700' },
    content: { paddingHorizontal: 20, marginTop: 16 },

    metricsRow: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    metricCard: {
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    metricValue: {
        fontSize: 28,
        fontWeight: '900',
        marginBottom: 4
    },
    metricLabel: {
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center'
    },

    chartContainer: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    chartTitle: {
        fontSize: 14,
        fontWeight: '700',
        marginBottom: 12,
    },
    chartWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        height: 160,
        paddingHorizontal: 8,
    },
    chartBarGroup: {
        alignItems: 'center',
        flex: 1,
    },
    barContainer: {
        alignItems: 'center',
        height: 130,
        justifyContent: 'flex-end',
        marginBottom: 8,
    },
    bar: {
        width: 40,
        borderRadius: 6,
        minHeight: 20,
    },
    barLabel: {
        fontSize: 10,
        fontWeight: '600',
        marginTop: 4,
    },
    barName: {
        fontSize: 10,
        fontWeight: '500',
        textAlign: 'center',
    },

    highlightCard: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        backgroundColor: 'transparent',
    },
    highlightTitle: {
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 6,
    },
    highlightValue: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 4,
    },
    highlightMeta: {
        fontSize: 13,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 12,
        marginTop: 8,
        paddingHorizontal: 2
    },
    emptyText: {
        fontSize: 14,
        marginBottom: 16,
        fontStyle: 'italic'
    },
    medCard: {
        padding: 14,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    medCardContent: {
        flex: 1
    },
    medTitle: {
        fontSize: 14,
        fontWeight: '700'
    },
    medMeta: {
        fontSize: 12,
        marginTop: 6
    },
    medBadge: {
        backgroundColor: PALETTE.BUTTON_PRIMARY,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginLeft: 12
    },
    medBadgeText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 12
    }
});
