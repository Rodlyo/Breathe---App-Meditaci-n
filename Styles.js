// screens/styles.js
import { StyleSheet, Platform } from 'react-native';

const PALETTE = {
    COLOR_BLUE: '#B0C4DE', // Azul Claro
    COLOR_GREEN: '#A3B18A', // Verde Oliva
    COLOR_ROSE: '#E9CFCF', // Rosa Claro
    COLOR_CREAM: '#FAF3E3', // Crema (ideal para fondo principal)
    COLOR_GRAY: '#E5E5E5', // Gris Muy Claro (ideal para inputs/separadores)


    BACKGROUND_MAIN: '#FAF3E3', // Fondo de pantalla (COLOR_CREAM)
    INPUT_BACKGROUND: '#E5E5E5', // Fondo de inputs y pestañas inactivas (COLOR_GRAY)
    BUTTON_PRIMARY: '#B0C4DE', // Botón 'Ingresar' y 'Comenzar'/'Registrar' (COLOR_BLUE)
    BUTTON_SECONDARY: '#A3B18A', // Botón/Barra 'Recupera tu contraseña' y pestaña 'Registrarse' (COLOR_GREEN)
    LINK_TEXT: '#555', // Color de los enlaces y texto general oscuro
    TEXT_DARK: '#444',
};

const FONT_HEADING = Platform.select({
    ios: 'Poppins-SemiBold',
    default: 'System',
});
const FONT_DEFAULT = Platform.select({
    ios: 'Roboto-Regular',
    android: 'Roboto-Regular',
    default: 'System',
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: PALETTE.BACKGROUND_MAIN,
        alignItems: 'center',
        paddingTop: 80,
    },
    // --- Logo y Título ---
    logoContainer: {
        alignItems: 'center',
        padding: 70,
    },
    logo: {
        width: 240,
        height: 170,
        resizeMode: 'contain',
    },
    // --- Pestañas (Iniciar Sesión / Registrarse) ---
    tabContainer: {
        flexDirection: 'row',
        width: '100%',
        maxWidth: 300,
        marginBottom: 40,
        backgroundColor: PALETTE.INPUT_BACKGROUND,
        borderRadius: 30,
        padding: 2,
    },
    tabBase: {
        flex: 1,
        paddingVertical: 20,
        borderRadius: 30,
    },
    tabActive: {
        backgroundColor: '#A3B18A', // Blanco para pestaña activa
    },
    tabActiveText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: PALETTE.TEXT_DARK,
        fontFamily: FONT_DEFAULT,
    },
    tabInactiveText: {
        textAlign: 'center',
        color: PALETTE.TEXT_DARK,
        fontWeight: 'normal',
        fontFamily: FONT_DEFAULT,
    },
    // --- Inputs y Botones ---
    input: {
        width: '100%',
        maxWidth: 300,
        padding: 15,
        marginBottom: 15,
        borderRadius: 30,
        backgroundColor: PALETTE.INPUT_BACKGROUND,
        fontSize: 16,
        fontFamily: FONT_DEFAULT,
    },
    buttonBase: {
        width: '100%',
        maxWidth: 300,
        padding: 15,
        borderRadius: 30,
        marginTop: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    buttonPrimary: {
        backgroundColor: PALETTE.BUTTON_PRIMARY, // Azul claro para los botones principales
    },
    buttonSecondary: {
        backgroundColor: PALETTE.BUTTON_SECONDARY, // Verde para 'Recupera tu contraseña'
    },
    buttonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: FONT_HEADING,
    },
    buttonSecondaryText: {
        color: PALETTE.TEXT_DARK, // El texto en el botón/barra verde es oscuro
    },
    // --- Links y Texto Adicional ---
    linkText: {
        color: PALETTE.LINK_TEXT,
        fontSize: 14,
        marginTop: 10,
        fontFamily: FONT_DEFAULT,
    },
    subtitleText: {
        fontSize: 18,
        color: PALETTE.TEXT_DARK,
        fontWeight: 'normal',
        marginBottom: 50,
        fontFamily: FONT_DEFAULT,
    },
});

export { styles, PALETTE };