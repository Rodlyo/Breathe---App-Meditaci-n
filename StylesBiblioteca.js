import { StyleSheet, Platform, Dimensions } from 'react-native';
import { styles as baseStyles } from './Styles';

// Definir paleta aquí si no está disponible desde Styles
const PALETTE = {
    COLOR_BLUE: '#B0C4DE',
    COLOR_GREEN: '#A3B18A',
    COLOR_ROSE: '#E9CFCF',
    COLOR_CREAM: '#FAF3E3',
    COLOR_GRAY: '#E5E5E5',
    BACKGROUND_MAIN: '#FAF3E3',
    INPUT_BACKGROUND: '#E5E5E5',
    BUTTON_PRIMARY: '#B0C4DE',
    BUTTON_SECONDARY: '#A3B18A',
    LINK_TEXT: '#555',
    TEXT_DARK: '#444',
};

const { width, height } = Dimensions.get('window');

const FONT_HEADING = Platform.select({
    ios: 'Poppins-SemiBold',
    default: 'System',
});
const FONT_DEFAULT = Platform.select({
    ios: 'Roboto-Regular',
    android: 'Roboto-Regular',
    default: 'System',
});

export const meditationStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: PALETTE.BACKGROUND_MAIN,
        paddingTop: 50,
        paddingHorizontal: 15,
        paddingBottom: 10,
    },

    // ---- Botón Volver ----
    backButton: {
        marginBottom: 15,
        marginTop: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignSelf: 'flex-start',
        borderRadius: 20,
        backgroundColor: PALETTE.BUTTON_SECONDARY,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 2,
    },
    backButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 13,
        fontFamily: FONT_DEFAULT,
    },

    // ---- Título general ----
    mainTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: PALETTE.COLOR_BLUE,
        marginBottom: 15,
        fontFamily: FONT_HEADING,
        textAlign: 'center',
    },

    // ---- Subtítulo de cada sección ----
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginVertical: 12,
        marginTop: 15,
        paddingHorizontal: 5,
        color: PALETTE.COLOR_GREEN,
        fontFamily: FONT_HEADING,
    },

    // ---- Carrusel Horizontal ----
    horizontalScroll: {
        flexDirection: 'row',
        gap: 12,
        paddingVertical: 10,
        paddingHorizontal: 5,
    },

    // ---- Card ----
    card: {
        width: width < 400 ? 140 : 160,
        height: 180,
        backgroundColor: '#fff',
        borderRadius: 18,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.18,
        shadowRadius: 3,
        elevation: 4,
    },

    cardImage: {
        width: '100%',
        height: 90,
        backgroundColor: PALETTE.COLOR_ROSE,
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },

    cardIcon: {
        fontSize: 40,
    },

    cardContent: {
        padding: 10,
        flex: 1,
        justifyContent: 'space-between',
    },

    cardTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: PALETTE.TEXT_DARK,
        marginBottom: 4,
        fontFamily: FONT_HEADING,
    },

    cardSubtitle: {
        fontSize: 12,
        color: '#888',
        fontFamily: FONT_DEFAULT,
        lineHeight: 16,
    },

    // ---- Detalle Modal ----
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },

    detailSheet: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingHorizontal: 20,
        paddingBottom: 30,
        paddingTop: 15,
        minHeight: '70%',
    },

    detailHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },

    detailIcon: {
        fontSize: 50,
        textAlign: 'center',
    },

    closeButton: {
        fontSize: 28,
        color: '#999',
        padding: 5,
    },

    detailTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: PALETTE.COLOR_BLUE,
        marginBottom: 10,
        fontFamily: FONT_HEADING,
    },

    detailDuration: {
        fontSize: 13,
        color: PALETTE.COLOR_GREEN,
        fontWeight: '600',
        marginBottom: 15,
    },

    detailDescription: {
        fontSize: 14,
        color: '#555',
        lineHeight: 22,
        marginBottom: 15,
        fontFamily: FONT_DEFAULT,
    },

    detailBenefits: {
        backgroundColor: '#f8f8f8',
        borderRadius: 15,
        padding: 12,
        marginBottom: 15,
    },

    benefitTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: PALETTE.TEXT_DARK,
        marginBottom: 8,
    },

    benefitItem: {
        fontSize: 12,
        color: '#666',
        marginBottom: 5,
        lineHeight: 16,
    },

    playButton: {
        backgroundColor: PALETTE.BUTTON_PRIMARY,
        paddingVertical: 13,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 10,
    },

    playButtonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
        fontFamily: FONT_DEFAULT,
    },

    // ---- Temporizador ----
    timerModalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    timerContent: {
        backgroundColor: '#fff',
        borderRadius: 30,
        paddingHorizontal: 30,
        paddingVertical: 40,
        alignItems: 'center',
        width: '85%',
        maxWidth: 350,
    },

    timerIcon: {
        fontSize: 80,
        marginBottom: 20,
    },

    timerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: PALETTE.COLOR_BLUE,
        marginBottom: 10,
        fontFamily: FONT_HEADING,
    },

    timerGuide: {
        fontSize: 14,
        color: '#888',
        marginBottom: 25,
        fontStyle: 'italic',
        textAlign: 'center',
        fontFamily: FONT_DEFAULT,
    },

    timerDisplay: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: PALETTE.BUTTON_PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 35,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },

    timerText: {
        fontSize: 60,
        fontWeight: '700',
        color: '#fff',
        fontFamily: 'monospace',
    },

    timerControls: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 15,
        marginBottom: 20,
        width: '100%',
    },

    timerButton: {
        backgroundColor: PALETTE.BUTTON_PRIMARY,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        flex: 1,
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 2,
    },

    timerButtonSecondary: {
        backgroundColor: PALETTE.BUTTON_SECONDARY,
    },

    timerButtonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 14,
        fontFamily: FONT_DEFAULT,
    },

    timerExitButton: {
        width: '100%',
        paddingVertical: 12,
        borderRadius: 20,
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ddd',
    },

    timerExitText: {
        color: '#999',
        fontWeight: '600',
        fontSize: 13,
        fontFamily: FONT_DEFAULT,
    },

    progressBar: {
        width: '100%',
        height: 6,
        backgroundColor: '#e0e0e0',
        borderRadius: 3,
        overflow: 'hidden',
        marginTop: 10,
    },

    progressFill: {
        height: '100%',
        backgroundColor: PALETTE.BUTTON_PRIMARY,
        borderRadius: 3,
    },
});
