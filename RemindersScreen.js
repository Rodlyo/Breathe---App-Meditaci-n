import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, ScrollView, Alert, TextInput } from 'react-native';
import { PALETTE } from './Styles';

const SOUNDS = ['Ninguno', 'Campana', 'Agua', 'Pájaros', 'Viento'];

export default function RemindersScreen({ onBack, notificacionesActivas, setNotificacionesActivas, temaOscuro }) {
    const [alarms, setAlarms] = useState([]);
    const [inputHours, setInputHours] = useState('08');
    const [inputMinutes, setInputMinutes] = useState('00');
    const [selectedSound, setSelectedSound] = useState('Campana');
    const [expandedAlarmId, setExpandedAlarmId] = useState(null);

    const backgroundColor = temaOscuro ? '#111' : '#fff';
    const textColor = temaOscuro ? '#fff' : '#222';
    const cardBg = temaOscuro ? '#1f1f1f' : '#f8f8f8';
    const borderColor = temaOscuro ? '#333' : '#e0e0e0';
    const inputBg = temaOscuro ? '#2a2a2a' : '#f5f5f5';
    const descriptionColor = temaOscuro ? '#ccc' : '#999';

    const addAlarm = () => {
        const hours = Math.min(23, Math.max(0, parseInt(inputHours) || 0));
        const minutes = Math.min(59, Math.max(0, parseInt(inputMinutes) || 0));
        
        const newAlarm = {
            id: Date.now(),
            hours,
            minutes,
            sound: selectedSound,
            enabled: true,
        };

        setAlarms([...alarms, newAlarm]);
        // Reset inputs
        setInputHours('08');
        setInputMinutes('00');
        
        Alert.alert('Alarma creada', `Alarma configurada para las ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`);
    };

    const deleteAlarm = (id) => {
        setAlarms(alarms.filter(a => a.id !== id));
    };

    const toggleAlarm = (id) => {
        setAlarms(alarms.map(a => 
            a.id === id ? { ...a, enabled: !a.enabled } : a
        ));
    };

    const handlePreviewSound = () => {
        Alert.alert('Sonido', `Escuchando: ${selectedSound}`, [{ text: 'Aceptar' }]);
    };

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <View style={[styles.header, { borderBottomColor: borderColor }]}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <Text style={styles.backText}>Volver</Text>
                </TouchableOpacity>
                <Text style={[styles.title, { color: textColor }]}>Recordatorios</Text>
                <View style={{ width: 60 }} />
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Enable/Disable Notifications */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: textColor }]}>Notificaciones Generales</Text>

                    <View style={[styles.settingCard, { backgroundColor: cardBg, borderColor }]}>
                        <View style={styles.settingContent}>
                            <Text style={[styles.settingLabel, { color: textColor }]}>Activar Recordatorios</Text>
                            <Text style={[styles.settingDesc, { color: descriptionColor }]}>Recibe notificaciones para meditar</Text>
                        </View>
                        <Switch
                            value={notificacionesActivas}
                            onValueChange={setNotificacionesActivas}
                            trackColor={{ false: '#ccc', true: PALETTE.BUTTON_SECONDARY }}
                            thumbColor={notificacionesActivas ? PALETTE.BUTTON_PRIMARY : '#f4f3f4'}
                        />
                    </View>
                </View>

                {notificacionesActivas && (
                    <>
                        {/* Create Alarm Section */}
                        <View style={styles.section}>
                            <Text style={[styles.sectionTitle, { color: textColor }]}>⏰ Nueva Alarma</Text>

                            <View style={[styles.alarmCreatorCard, { backgroundColor: cardBg, borderColor }]}>
                                {/* Clock Display */}
                                <View style={[styles.clockDisplay, { backgroundColor: PALETTE.BUTTON_PRIMARY }]}>
                                    <Text style={styles.clockText}>
                                        {String(inputHours).padStart(2, '0')}:{String(inputMinutes).padStart(2, '0')}
                                    </Text>
                                </View>

                                {/* Time Input */}
                                <View style={styles.timeInputSection}>
                                    <View style={styles.inputGroup}>
                                        <Text style={[styles.inputLabel, { color: textColor }]}>Hora (0-23)</Text>
                                        <TextInput
                                            style={[styles.timeInput, { backgroundColor: inputBg, color: textColor, borderColor }]}
                                            placeholder="08"
                                            placeholderTextColor={descriptionColor}
                                            value={inputHours}
                                            onChangeText={(text) => {
                                                const num = Math.min(23, Math.max(0, parseInt(text) || 0));
                                                setInputHours(String(num));
                                            }}
                                            keyboardType="number-pad"
                                            maxLength={2}
                                        />
                                    </View>

                                    <Text style={[styles.separator, { color: textColor }]}>:</Text>

                                    <View style={styles.inputGroup}>
                                        <Text style={[styles.inputLabel, { color: textColor }]}>Minuto (0-59)</Text>
                                        <TextInput
                                            style={[styles.timeInput, { backgroundColor: inputBg, color: textColor, borderColor }]}
                                            placeholder="00"
                                            placeholderTextColor={descriptionColor}
                                            value={inputMinutes}
                                            onChangeText={(text) => {
                                                const num = Math.min(59, Math.max(0, parseInt(text) || 0));
                                                setInputMinutes(String(num));
                                            }}
                                            keyboardType="number-pad"
                                            maxLength={2}
                                        />
                                    </View>
                                </View>

                                {/* Sound Selection */}
                                <View style={styles.soundSection}>
                                    <Text style={[styles.controlLabel, { color: textColor }]}>Sonido</Text>
                                    <View style={styles.soundGrid}>
                                        {SOUNDS.map(sound => (
                                            <TouchableOpacity
                                                key={sound}
                                                onPress={() => setSelectedSound(sound)}
                                                style={[
                                                    styles.soundOption,
                                                    {
                                                        backgroundColor: selectedSound === sound ? PALETTE.BUTTON_PRIMARY : borderColor,
                                                    }
                                                ]}
                                            >
                                                <Text
                                                    style={{
                                                        color: selectedSound === sound ? '#fff' : textColor,
                                                        fontWeight: selectedSound === sound ? '700' : '500',
                                                        fontSize: 12,
                                                    }}
                                                >
                                                    {sound}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                    <TouchableOpacity
                                        onPress={handlePreviewSound}
                                        style={[styles.previewBtn, { borderColor }]}
                                    >
                                        <Text style={{ color: PALETTE.BUTTON_PRIMARY, fontWeight: '600' }}>
                                            🔊 Previsualizar
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                {/* Add Button */}
                                <TouchableOpacity
                                    onPress={addAlarm}
                                    style={[styles.addButton, { backgroundColor: PALETTE.BUTTON_PRIMARY }]}
                                >
                                    <Text style={styles.addButtonText}>+ Añadir Alarma</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Alarms List */}
                        <View style={styles.section}>
                            <Text style={[styles.sectionTitle, { color: textColor }]}>
                                Mis Alarmas ({alarms.length})
                            </Text>

                            {alarms.length === 0 ? (
                                <View style={[styles.emptyCard, { backgroundColor: cardBg, borderColor }]}>
                                    <Text style={[styles.emptyText, { color: descriptionColor }]}>
                                        No hay alarmas configuradas. ¡Crea una para empezar!
                                    </Text>
                                </View>
                            ) : (
                                alarms.map((alarm) => (
                                    <View 
                                        key={alarm.id} 
                                        style={[styles.alarmItem, { backgroundColor: cardBg, borderColor }]}
                                    >
                                        <TouchableOpacity
                                            onPress={() => setExpandedAlarmId(expandedAlarmId === alarm.id ? null : alarm.id)}
                                            style={styles.alarmItemHeader}
                                        >
                                            <View style={styles.alarmItemLeft}>
                                                <Text style={[styles.alarmTime, { color: PALETTE.BUTTON_PRIMARY }]}>
                                                    {String(alarm.hours).padStart(2, '0')}:{String(alarm.minutes).padStart(2, '0')}
                                                </Text>
                                                <Text style={[styles.alarmSound, { color: descriptionColor }]}>
                                                    🔊 {alarm.sound}
                                                </Text>
                                            </View>
                                            <View style={styles.alarmItemRight}>
                                                <Switch
                                                    value={alarm.enabled}
                                                    onValueChange={() => toggleAlarm(alarm.id)}
                                                    trackColor={{ false: '#ccc', true: PALETTE.BUTTON_SECONDARY }}
                                                    thumbColor={alarm.enabled ? PALETTE.BUTTON_PRIMARY : '#f4f3f4'}
                                                />
                                                <Text style={[styles.expandIcon, { color: textColor }]}>
                                                    {expandedAlarmId === alarm.id ? '▲' : '▼'}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>

                                        {expandedAlarmId === alarm.id && (
                                            <View style={[styles.alarmDetails, { borderTopColor: borderColor }]}>
                                                <View style={styles.detailRow}>
                                                    <Text style={[styles.detailLabel, { color: descriptionColor }]}>Estado</Text>
                                                    <Text style={[styles.detailValue, { color: alarm.enabled ? PALETTE.BUTTON_SECONDARY : '#999' }]}>
                                                        {alarm.enabled ? '✓ Activa' : '✗ Desactiva'}
                                                    </Text>
                                                </View>
                                                <TouchableOpacity
                                                    onPress={() => deleteAlarm(alarm.id)}
                                                    style={[styles.deleteBtn, { borderColor: '#ff4757' }]}
                                                >
                                                    <Text style={{ color: '#ff4757', fontWeight: '600' }}>
                                                        🗑️ Eliminar
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                    </View>
                                ))
                            )}
                        </View>

                        {/* Info Box */}
                        <View style={[styles.infoBox, { backgroundColor: PALETTE.BUTTON_PRIMARY + '15' }]}>
                            <Text style={[styles.infoText, { color: textColor }]}>
                                💡 Las alarmas activas te notificarán a la hora configurada todos los días.
                            </Text>
                        </View>
                    </>
                )}

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
        borderBottomWidth: 1
    },
    backButton: { 
        padding: 8, 
        borderRadius: 10, 
        backgroundColor: PALETTE.BUTTON_SECONDARY 
    },
    backText: { 
        color: '#fff', 
        fontWeight: '700' 
    },
    title: { 
        fontSize: 20, 
        fontWeight: '700' 
    },
    content: { 
        flex: 1, 
        paddingHorizontal: 20, 
        paddingVertical: 16 
    },

    section: { 
        marginBottom: 20 
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 12
    },

    settingCard: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    settingContent: {
        flex: 1,
        marginRight: 12
    },
    settingLabel: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 4
    },
    settingDesc: { 
        fontSize: 13 
    },

    alarmCreatorCard: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 16,
        gap: 16,
    },

    clockDisplay: {
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    clockText: {
        fontSize: 56,
        fontWeight: '900',
        color: '#fff',
        fontFamily: 'Courier New',
    },

    timeInputSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        gap: 8,
    },
    inputGroup: {
        alignItems: 'center',
        flex: 1,
    },
    inputLabel: {
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 6,
    },
    timeInput: {
        width: '80%',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 10,
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
    },
    separator: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 8,
    },

    soundSection: {
        gap: 10,
    },
    controlLabel: {
        fontSize: 13,
        fontWeight: '600',
    },
    soundGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    soundOption: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
    },
    previewBtn: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        alignItems: 'center',
    },

    addButton: {
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 8,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    },

    emptyCard: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        fontSize: 14,
        textAlign: 'center',
    },

    alarmItem: {
        borderWidth: 1,
        borderRadius: 12,
        marginBottom: 10,
        overflow: 'hidden',
    },
    alarmItemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    alarmItemLeft: {
        flex: 1,
    },
    alarmTime: {
        fontSize: 24,
        fontWeight: '900',
        marginBottom: 4,
    },
    alarmSound: {
        fontSize: 12,
    },
    alarmItemRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    expandIcon: {
        fontSize: 12,
        fontWeight: '700',
    },

    alarmDetails: {
        borderTopWidth: 1,
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 10,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    detailLabel: {
        fontSize: 12,
        fontWeight: '600',
    },
    detailValue: {
        fontSize: 12,
        fontWeight: '700',
    },
    deleteBtn: {
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: 'center',
    },

    infoBox: {
        marginHorizontal: 0,
        marginBottom: 20,
        padding: 12,
        borderRadius: 8,
    },
    infoText: {
        fontSize: 13,
        lineHeight: 18,
        fontWeight: '500',
    }
});
