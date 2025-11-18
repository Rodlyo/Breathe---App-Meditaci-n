import React, { useState, useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

import HomeScreen from './HomeScreen';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import MenuScreen from './MenuScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import BibliotecaScreen from './BibliotecaScreen';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [pantalla, setPantalla] = useState('home');
  const pantallaAnterior = useRef('home');
  const intervaloRespira = useRef(null);

  // 🚀 Enviar notificación cada 60 segundos (sin repeats)
  function iniciarRecordatorioRespira() {
    if (intervaloRespira.current) return; // evitar duplicados

    intervaloRespira.current = setInterval(async () => {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Respira un momento 🌿",
          body: "Tómate 1 minuto para relajarte.",
          vibrate: [0, 150, 150, 150]
        },
        trigger: null,
      });
      console.log("Notificación enviada: Respira");
    }, 60000); // 60 segundos
  }

  // 🧹 Detener recordatorio cuando no estás en el menú
  function detenerRecordatorioRespira() {
    if (intervaloRespira.current) {
      clearInterval(intervaloRespira.current);
      intervaloRespira.current = null;
      console.log("Recordatorio detenido");
    }
  }

  useEffect(() => {
    async function initNotifications() {
      if (!Device.isDevice) return;

      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Permiso de notificaciones no concedido");
        return;
      }

      // 🔹 Notificación de bienvenida al abrir la app
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

  // 🚀 Notificación cuando inicia sesión (pantalla login -> menu)
  useEffect(() => {
    if (pantallaAnterior.current === "login" && pantalla === "menu") {
      Notifications.scheduleNotificationAsync({
        content: {
          title: "¡Sesión iniciada!",
          body: "Tu espacio de meditación está listo.",
          vibrate: [0, 150, 150, 150],
        },
        trigger: null,
      });

      iniciarRecordatorioRespira();  // activar recordatorios solo en el menú
    }

    // Si sale del menú → detener recordatorio
    if (pantallaAnterior.current === "menu" && pantalla !== "menu") {
      detenerRecordatorioRespira();
    }

    pantallaAnterior.current = pantalla;
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
    return <MenuScreen onLogout={() => setPantalla('home')} setPantalla={setPantalla} />;
  }


  if (pantalla === 'biblioteca') {
    return <BibliotecaScreen onBack={() => setPantalla('menu')} />;
  }

  return null;
}
