import React, { useState, useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

import HomeScreen from './HomeScreen';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import MenuScreen from './MenuScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import BibliotecaScreen from './BibliotecaScreen';
import AmbientLightDemoScreen from './AmbientLightDemoScreen';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

// ID de la notificación para poder cancelarla
const NOTIFICATION_ID_RESPIRA = 'respira-recordatorio';

export default function App() {
    const [pantalla, setPantalla] = useState('home');
    const [mostrarBienvenida, setMostrarBienvenida] = useState(false);
    const pantallaAnterior = useRef('home');

    // Función para programar la notificación recurrente
    async function programarRecordatorioRespira() {

        await Notifications.cancelScheduledNotificationAsync(NOTIFICATION_ID_RESPIRA);

        await Notifications.scheduleNotificationAsync({
            identifier: NOTIFICATION_ID_RESPIRA,
            content: {
                title: "Respira un momento 🌿",
                body: "Tómate 1 minuto para relajarte.",
                vibrate: [0, 150, 150, 150]
            },
            trigger: {
                seconds: 60, // Se activa por primera vez después de 60 segundos
                repeats: true, // Se repite indefinidamente
            },
        });
        console.log("Recordatorio recurrente programado: Respira cada 60s");
    }

    // 🧹 Función para cancelar la notificación recurrente
    async function detenerRecordatorioRespira() {
        await Notifications.cancelScheduledNotificationAsync(NOTIFICATION_ID_RESPIRA);
        console.log("Recordatorio recurrente detenido");
    }

    useEffect(() => {
        async function initNotifications() {
            if (!Device.isDevice) return;

            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== "granted") {
                console.log("Permiso de notificaciones no concedido");
                return;
            }

            // Notificación de bienvenida al abrir la app (única)
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "Bienvenido a Breathe 💙",
                    body: "Gracias por volver. Tu momento de paz te espera."
                },
                trigger: null
            });
        }

        initNotifications();
    }, []);

    // Lógica de navegación y activación/desactivación de recordatorios
    useEffect(() => {
        let timer;

        // Si inicia sesión (login -> menu)
        if (pantallaAnterior.current === "login" && pantalla === "menu") {
            //  Notificación Push de inicio de sesión 
            Notifications.scheduleNotificationAsync({
                content: {
                    title: "¡Sesión iniciada!",
                    body: "Tu espacio de meditación está listo.",
                    vibrate: [0, 150, 150, 150],
                },
                trigger: null,
            });

            // Notificación In-App Temporal 
            setMostrarBienvenida(true);

            // Desactivarla después de 5 segundos
            timer = setTimeout(() => {
                setMostrarBienvenida(false);
            }, 5000);

            programarRecordatorioRespira(); // 4. Activar recordatorios recurrentes

        }
        // Si sale del menú → detener recordatorio
        else if (pantallaAnterior.current === "menu" && pantalla !== "menu") {
            detenerRecordatorioRespira();
            setMostrarBienvenida(false); // Asegurar que se oculte
        }

        pantallaAnterior.current = pantalla;

        return () => {
            if (timer) clearTimeout(timer); // Limpiar timer si el componente se desmonta
        };
    }, [pantalla]);

    // 🚀 CONTROL DE PANTALLAS
    if (pantalla === 'home') {
        return <HomeScreen onStart={() => setPantalla('login')} />;
    }

    if (pantalla === 'registro') {
        return (
            <RegisterScreen
                onRegistered={() => setPantalla('login')}
                onForgotPassword={() => setPantalla('forgot')}
            />
        );
    }

    if (pantalla === 'login') {
        return (
            <LoginScreen
                onLoginSuccess={() => setPantalla('menu')}
                onGoRegister={() => setPantalla('registro')}
                onForgotPassword={() => setPantalla('forgot')}
            />
        );
    }

    if (pantalla === 'forgot') {
        return (
            <ForgotPasswordScreen
                onGoLogin={() => setPantalla('login')}
                onGoRegister={() => setPantalla('registro')}
            />
        );
    }

    if (pantalla === 'menu') {
        return (
            <MenuScreen
                onLogout={() => setPantalla('home')}
                setPantalla={setPantalla}
                mostrarBienvenida={mostrarBienvenida}
            />
        );
    }


    if (pantalla === 'biblioteca') {
        return <BibliotecaScreen onBack={() => setPantalla('menu')} />;
    }

    if (pantalla === 'ambient-light-demo') {
        return <AmbientLightDemoScreen onBack={() => setPantalla('menu')} />;
    }

    return null;
}