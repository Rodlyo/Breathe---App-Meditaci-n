import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Switch } from 'react-native';
import { PALETTE } from './Styles';

const FONT_HEADING = 'System';
const FONT_DEFAULT = 'System';

export default function PersonalizationScreen({
    onBack,
    defaultDuration,
    setDefaultDuration,
    useDefaultDuration,
    setUseDefaultDuration,
    preferredSound,
    setPreferredSound,
    temaOscuro
}) {
    const backgroundColor = temaOscuro ? '#1a1a1a' : PALETTE.BACKGROUND_MAIN;
    const textColor = temaOscuro ? '#fff' : PALETTE.TEXT_DARK;
    const cardBackground = temaOscuro ? '#2a2a2a' : '#fff';
    const borderColor = temaOscuro ? '#444' : '#e0e0e0';
    const descriptionColor = temaOscuro ? '#ccc' : '#999';

    return (
        <View style={[styles.container, { backgroundColor }]}>
            {/* Header */}
            <View style={[styles.header, { borderBottomColor: borderColor }]}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <Text style={styles.backButtonText}>Volver</Text>
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: textColor }]}>Personalización</Text>
                <View style={{ width: 80 }} />
            </View>

            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {/* Sección de Duración */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: textColor }]}>Duración de Meditación</Text>

                    <View style={[styles.settingCard, { backgroundColor: cardBackground }]}>
                        <View style={styles.settingContent}>
                            <Text style={[styles.settingLabel, { color: textColor }]}>Usar duración por defecto</Text>
                            <Text style={[styles.settingDescription, { color: descriptionColor }]}>Si está activo, las meditaciones usarán la duración por defecto</Text>
                        </View>
                        <Switch
                            value={useDefaultDuration}
                            onValueChange={setUseDefaultDuration}
                            trackColor={{ false: '#ccc', true: PALETTE.BUTTON_SECONDARY }}
                            thumbColor={useDefaultDuration ? PALETTE.BUTTON_PRIMARY : '#f4f3f4'}
                        />
                    </View>

                    <View style={[styles.settingCard, { backgroundColor: cardBackground }]}>
                        <View style={styles.settingContent}>
                            <Text style={[styles.settingLabel, { color: textColor }]}>Duración por defecto</Text>
                            <Text style={[styles.settingDescription, { color: descriptionColor }]}>{defaultDuration} minutos</Text>
                        </View>
                        <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
                            {[5, 8, 10, 15].map(d => (
                                <TouchableOpacity
                                    key={d}
                                    onPress={() => setDefaultDuration(d)}
                                    style={[
                                        styles.smallButton,
                                        {
                                            backgroundColor: defaultDuration === d ? PALETTE.BUTTON_PRIMARY : (temaOscuro ? '#333' : '#ddd')
                                        }
                                    ]}
                                >
                                    <Text style={{ color: defaultDuration === d ? '#fff' : (temaOscuro ? '#fff' : '#333'), fontWeight: '700' }}>
                                        {d}m
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>

                {/* Sección de Sonido */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: textColor }]}>Sonido Preferido</Text>

                    <View style={[styles.settingCard, { backgroundColor: cardBackground }]}>
                        <View style={styles.settingContent}>
                            <Text style={[styles.settingLabel, { color: textColor }]}>Selecciona un sonido</Text>
                            <Text style={[styles.settingDescription, { color: descriptionColor }]}>Se usará durante tus meditaciones</Text>
                        </View>
                    </View>

                    <View style={{ gap: 8, paddingHorizontal: 16 }}>
                        {['Ninguno', 'Campana', 'Agua', 'Pájaros', 'Viento'].map(snd => (
                            <TouchableOpacity
                                key={snd}
                                onPress={() => setPreferredSound(snd)}
                                style={[
                                    styles.soundOption,
                                    {
                                        backgroundColor: preferredSound === snd ? PALETTE.BUTTON_PRIMARY : (temaOscuro ? '#2a2a2a' : '#f5f5f5'),
                                        borderColor: preferredSound === snd ? PALETTE.BUTTON_PRIMARY : borderColor,
                                        borderWidth: 2
                                    }
                                ]}
                            >
                                <Text style={{
                                    color: preferredSound === snd ? '#fff' : textColor,
                                    fontWeight: '700',
                                    fontSize: 16
                                }}>
                                    {snd}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
    },
    backButton: {
        padding: 8,
    },
    backButtonText: {
        fontSize: 16,
        color: PALETTE.BUTTON_PRIMARY,
        fontWeight: '600',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        fontFamily: FONT_HEADING,
    },
    scrollContainer: {
        flex: 1,
        paddingVertical: 16,
    },
    section: {
        marginBottom: 24,
        paddingHorizontal: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 12,
        fontFamily: FONT_HEADING,
    },
    settingCard: {
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    settingContent: {
        flex: 1,
        marginRight: 12,
    },
    settingLabel: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 4,
        fontFamily: FONT_DEFAULT,
    },
    settingDescription: {
        fontSize: 13,
        fontFamily: FONT_DEFAULT,
    },
    smallButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    soundOption: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
