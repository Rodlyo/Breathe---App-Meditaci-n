import { StyleSheet, Platform } from 'react-native';
import { PALETTE } from './Styles';

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
        paddingTop: 20,
        paddingHorizontal: 20,
    },

    // ---- Botón Volver ----
    backButton: {
        marginBottom: 15,
        padding: 8,
        alignSelf: 'flex-start',
        borderRadius: 10,
        backgroundColor: PALETTE.BUTTON_SECONDARY,
    },
    backButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },

    // ---- Título general ----
    mainTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: PALETTE.COLOR_BLUE,
        marginBottom: 20,
        fontFamily: FONT_HEADING,
    },

    // ---- Subtítulo de cada sección ----
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 10,
        color: PALETTE.COLOR_GREEN,
        fontFamily: FONT_HEADING,
    },

    // ---- Carrusel Horizontal ----
    horizontalScroll: {
        flexDirection: 'row',
        gap: 15,
        paddingVertical: 10,
    },

    // ---- Card ----
    card: {
        width: 160,
        height: 180,
        backgroundColor: '#fff',
        borderRadius: 15,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },

    cardImage: {
        width: '100%',
        height: 100,
        backgroundColor: PALETTE.COLOR_ROSE,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },

    cardContent: {
        padding: 10,
    },

    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: PALETTE.TEXT_DARK,
        marginBottom: 4,
        fontFamily: FONT_HEADING,
    },

    cardSubtitle: {
        fontSize: 13,
        color: '#666',
        fontFamily: FONT_DEFAULT,
    },
});
