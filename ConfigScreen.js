import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, Switch, Modal } from 'react-native';
import { PALETTE } from './Styles';

const FONT_HEADING = 'System';
const FONT_DEFAULT = 'System';

export default function ConfigScreen({
    onBack,
    usuarioActual,
    notificacionesActivas,
    setNotificacionesActivas,
    sonidoActivo,
    setSonidoActivo,
    temaOscuro,
    setTemaOscuro,
    onLogout
}) {
    const [modalTerminos, setModalTerminos] = useState(false);
    const [modalPolitica, setModalPolitica] = useState(false);

    const handleLogout = () => {
        Alert.alert(
            'Cerrar sesión',
            '¿Estás seguro de que deseas cerrar sesión?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Cerrar sesión',
                    onPress: onLogout,
                    style: 'destructive',
                }
            ]
        );
    };

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
                <Text style={[styles.headerTitle, { color: textColor }]}>Configuración</Text>
                <View style={{ width: 80 }} />
            </View>

            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {/* Sección de Perfil */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: textColor }]}>Perfil</Text>

                    <View style={[styles.settingCard, { backgroundColor: cardBackground }]}>
                        <View style={styles.settingContent}>
                            <Text style={[styles.settingLabel, { color: textColor }]}>Usuario</Text>
                            <Text style={styles.settingValue}>{usuarioActual || 'No disponible'}</Text>
                        </View>
                    </View>

                    <View style={[styles.settingCard, { backgroundColor: cardBackground }]}>
                        <View style={styles.settingContent}>
                            <Text style={[styles.settingLabel, { color: textColor }]}>Email</Text>
                            <Text style={styles.settingValue}>{usuarioActual}@breathe.app</Text>
                        </View>
                    </View>
                </View>

                {/* Sección de Notificaciones */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: textColor }]}>Notificaciones</Text>

                    <View style={[styles.settingCard, { backgroundColor: cardBackground }]}>
                        <View style={styles.settingContent}>
                            <Text style={[styles.settingLabel, { color: textColor }]}>Notificaciones Diarias</Text>
                            <Text style={[styles.settingDescription, { color: descriptionColor }]}>Recibe recordatorios para meditar</Text>
                        </View>
                        <Switch
                            value={notificacionesActivas}
                            onValueChange={setNotificacionesActivas}
                            trackColor={{ false: '#ccc', true: PALETTE.BUTTON_SECONDARY }}
                            thumbColor={notificacionesActivas ? PALETTE.BUTTON_PRIMARY : '#f4f3f4'}
                        />
                    </View>

                    <View style={[styles.settingCard, { backgroundColor: cardBackground }]}>
                        <View style={styles.settingContent}>
                            <Text style={[styles.settingLabel, { color: textColor }]}>Sonido</Text>
                            <Text style={[styles.settingDescription, { color: descriptionColor }]}>Sonidos de notificación y meditación</Text>
                        </View>
                        <Switch
                            value={sonidoActivo}
                            onValueChange={setSonidoActivo}
                            trackColor={{ false: '#ccc', true: PALETTE.BUTTON_SECONDARY }}
                            thumbColor={sonidoActivo ? PALETTE.BUTTON_PRIMARY : '#f4f3f4'}
                        />
                    </View>
                </View>

                {/* Sección de Apariencia */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: textColor }]}>Apariencia</Text>

                    <View style={[styles.settingCard, { backgroundColor: cardBackground }]}>
                        <View style={styles.settingContent}>
                            <Text style={[styles.settingLabel, { color: textColor }]}>Tema Oscuro</Text>
                            <Text style={[styles.settingDescription, { color: descriptionColor }]}>Protege tu vista en la noche</Text>
                        </View>
                        <Switch
                            value={temaOscuro}
                            onValueChange={setTemaOscuro}
                            trackColor={{ false: '#ccc', true: PALETTE.BUTTON_SECONDARY }}
                            thumbColor={temaOscuro ? PALETTE.BUTTON_PRIMARY : '#f4f3f4'}
                        />
                    </View>
                </View>

                {/* Sección de Información */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: textColor }]}>Información</Text>

                    <View style={[styles.infoCard, { backgroundColor: cardBackground }]}>
                        <Text style={[styles.infoLabel, { color: textColor }]}>Versión de la App</Text>
                        <Text style={[styles.infoValue, { color: descriptionColor }]}>1.0.0</Text>
                    </View>

                    <TouchableOpacity
                        style={[styles.infoCard, { backgroundColor: cardBackground }]}
                        onPress={() => setModalTerminos(true)}
                    >
                        <Text style={[styles.infoLabel, { color: textColor }]}>Términos y Condiciones</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.infoCard, { backgroundColor: cardBackground }]}
                        onPress={() => setModalPolitica(true)}
                    >
                        <Text style={[styles.infoLabel, { color: textColor }]}>Política de Privacidad</Text>
                    </TouchableOpacity>
                </View>

                {/* Botón de Cerrar Sesión */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
                </TouchableOpacity>

                <View style={{ height: 40 }} />
            </ScrollView>

            {/* Modal Términos y Condiciones */}
            <Modal
                visible={modalTerminos}
                animationType="slide"
                presentationStyle="pageSheet"
                onRequestClose={() => setModalTerminos(false)}
            >
                <View style={[styles.modalContainer, { backgroundColor }]}>
                    <View style={[styles.modalHeader, { borderBottomColor: borderColor }]}>
                        <TouchableOpacity onPress={() => setModalTerminos(false)}>
                            <Text style={styles.closeButton}>Cerrar</Text>
                        </TouchableOpacity>
                        <Text style={[styles.modalTitle, { color: textColor }]}>Términos y Condiciones</Text>
                        <View style={{ width: 60 }} />
                    </View>
                    <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
                        <Text style={[styles.modalText, { color: textColor }]}>
                            <Text style={styles.modalSubtitle}>1. Aceptación de Términos</Text>{'\n\n'}
                            Al utilizar la aplicación Breathe, aceptas estos términos y condiciones. Si no estás de acuerdo con alguna parte, por favor, no utilices la aplicación.{'\n\n'}

                            <Text style={styles.modalSubtitle}>2. Uso de la Aplicación</Text>{'\n\n'}
                            La aplicación Breathe está diseñada para proporcionar herramientas de meditación y bienestar. No debe utilizarse como sustituto de atención médica profesional.{'\n\n'}

                            <Text style={styles.modalSubtitle}>3. Responsabilidades del Usuario</Text>{'\n\n'}
                            Eres responsable de mantener la confidencialidad de tu cuenta y contraseña. Todas las actividades realizadas bajo tu cuenta son tu responsabilidad.{'\n\n'}

                            <Text style={styles.modalSubtitle}>4. Limitación de Responsabilidad</Text>{'\n\n'}
                            Breathe no será responsable por daños indirectos, incidentales, especiales o consecuentes derivados del uso de la aplicación.{'\n\n'}

                            <Text style={styles.modalSubtitle}>5. Modificaciones</Text>{'\n\n'}
                            Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán efectivos cuando se publiquen en la aplicación.{'\n\n'}

                            <Text style={styles.modalSubtitle}>6. Ley Aplicable</Text>{'\n\n'}
                            Estos términos se rigen por las leyes locales aplicables en tu jurisdicción.{'\n\n'}
                        </Text>
                    </ScrollView>
                </View>
            </Modal>

            {/* Modal Política de Privacidad */}
            <Modal
                visible={modalPolitica}
                animationType="slide"
                presentationStyle="pageSheet"
                onRequestClose={() => setModalPolitica(false)}
            >
                <View style={[styles.modalContainer, { backgroundColor }]}>
                    <View style={[styles.modalHeader, { borderBottomColor: borderColor }]}>
                        <TouchableOpacity onPress={() => setModalPolitica(false)}>
                            <Text style={styles.closeButton}>Cerrar</Text>
                        </TouchableOpacity>
                        <Text style={[styles.modalTitle, { color: textColor }]}>Política de Privacidad</Text>
                        <View style={{ width: 60 }} />
                    </View>
                    <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
                        <Text style={[styles.modalText, { color: textColor }]}>
                            <Text style={styles.modalSubtitle}>1. Información que Recopilamos</Text>{'\n\n'}
                            Recopilamos información personal como tu nombre de usuario y dirección de correo electrónico cuando te registras en Breathe.{'\n\n'}

                            <Text style={styles.modalSubtitle}>2. Cómo Usamos tu Información</Text>{'\n\n'}
                            Utilizamos tu información para proporcionar, mantener y mejorar nuestros servicios. También usamos datos para personalizar tu experiencia y enviar notificaciones de recordatorio.{'\n\n'}

                            <Text style={styles.modalSubtitle}>3. Seguridad de Datos</Text>{'\n\n'}
                            Implementamos medidas de seguridad para proteger tu información personal. Sin embargo, ningún método de transmisión por Internet es 100% seguro.{'\n\n'}

                            <Text style={styles.modalSubtitle}>4. Compartir Información</Text>{'\n\n'}
                            No vendemos, intercambiamos ni alquilamos tus datos personales a terceros. Solo compartimos información cuando es requerido por ley.{'\n\n'}

                            <Text style={styles.modalSubtitle}>5. Cookies y Rastreo</Text>{'\n\n'}
                            Breathe utiliza tecnología de almacenamiento local para mejorar la experiencia del usuario. Puedes controlar estas preferencias en la configuración.{'\n\n'}

                            <Text style={styles.modalSubtitle}>6. Tus Derechos</Text>{'\n\n'}
                            Tienes derecho a acceder, modificar o eliminar tu información personal. Contacta con nosotros para ejercer estos derechos.{'\n\n'}

                            <Text style={styles.modalSubtitle}>7. Cambios en esta Política</Text>{'\n\n'}
                            Podemos actualizar esta política de privacidad en cualquier momento. Te notificaremos de cambios significativos.{'\n\n'}

                            <Text style={styles.modalSubtitle}>8. Contacto</Text>{'\n\n'}
                            Si tienes preguntas sobre tu privacidad, puedes contactarnos a través de la aplicación.{'\n\n'}
                        </Text>
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: PALETTE.BACKGROUND_MAIN,
        paddingTop: 50,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },

    backButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 15,
        backgroundColor: PALETTE.BUTTON_SECONDARY,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        width: 80,
        alignItems: 'center',
    },

    backButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 12,
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: PALETTE.COLOR_BLUE,
    },

    scrollContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },

    // ---- Secciones ----
    section: {
        marginBottom: 30,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: PALETTE.TEXT_DARK,
        marginBottom: 12,
    },

    // ---- Tarjetas de Configuración ----
    settingCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        borderLeftWidth: 4,
        borderLeftColor: PALETTE.BUTTON_PRIMARY,
    },

    settingContent: {
        flex: 1,
    },

    settingLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: PALETTE.TEXT_DARK,
        marginBottom: 4,
    },

    settingValue: {
        fontSize: 13,
        color: PALETTE.COLOR_GREEN,
        fontWeight: '500',
    },

    settingDescription: {
        fontSize: 12,
        color: '#999',
        marginTop: 2,
    },

    // ---- Tarjetas de Información ----
    infoCard: {
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        padding: 14,
        marginBottom: 10,
        borderLeftWidth: 4,
        borderLeftColor: PALETTE.COLOR_GREEN,
    },

    infoLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: PALETTE.TEXT_DARK,
    },

    infoValue: {
        fontSize: 12,
        color: '#999',
        marginTop: 4,
    },

    // ---- Botón de Cerrar Sesión ----
    logoutButton: {
        backgroundColor: '#E8BEBF',
        paddingVertical: 14,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 3,
    },

    logoutButtonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 15,
    },

    smallButton: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 6,
    },

    // ---- Estilos del Modal ----
    modalContainer: {
        flex: 1,
        backgroundColor: PALETTE.BACKGROUND_MAIN,
        paddingTop: 50,
    },

    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },

    modalTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: PALETTE.COLOR_BLUE,
    },

    closeButton: {
        color: PALETTE.BUTTON_SECONDARY,
        fontWeight: '600',
        fontSize: 14,
    },

    modalContent: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },

    modalText: {
        fontSize: 13,
        lineHeight: 22,
        color: PALETTE.TEXT_DARK,
    },

    modalSubtitle: {
        fontSize: 14,
        fontWeight: '700',
        color: PALETTE.COLOR_BLUE,
    },
});
