import React, { useState, useEffect, useRef } from 'react';

import HomeScreen from './HomeScreen';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import MenuScreen from './MenuScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import BibliotecaScreen from './BibliotecaScreen';
import AmbientLightDemoScreen from './AmbientLightDemoScreen';
import ConfigScreen from './ConfigScreen';
import PersonalizationScreen from './PersonalizationScreen';
import ProgressScreen from './ProgressScreen';
import RemindersScreen from './RemindersScreen';

export default function App() {
    const [pantalla, setPantalla] = useState('home');
    const [mostrarBienvenida, setMostrarBienvenida] = useState(false);
    const [usuarioActual, setUsuarioActual] = useState('');
    const [notificacionesActivas, setNotificacionesActivas] = useState(true);
    const [sonidoActivo, setSonidoActivo] = useState(true);
    const [temaOscuro, setTemaOscuro] = useState(false);
    const [defaultDuration, setDefaultDuration] = useState(10);
    const [useDefaultDuration, setUseDefaultDuration] = useState(false);
    const [preferredSound, setPreferredSound] = useState(null);

    const [progress, setProgress] = useState({
        totalMinutes: 0,
        totalSessions: 0,
        byMeditation: {},
    });

    const registerMeditationCompleted = (meditationId, minutes) => {
        setProgress(prev => {
            const byMed = { ...prev.byMeditation };
            const key = meditationId || 'unknown';
            const med = byMed[key] ? { ...byMed[key] } : { minutes: 0, sessions: 0, title: '' };
            med.minutes += minutes;
            med.sessions += 1;
            byMed[key] = med;

            return {
                totalMinutes: prev.totalMinutes + minutes,
                totalSessions: prev.totalSessions + 1,
                byMeditation: byMed,
            };
        });
    };
    const pantallaAnterior = useRef('home');

    // Lógica de navegación y bienvenida
    useEffect(() => {
        let timer;

        // Si inicia sesión (login -> menu)
        if (pantallaAnterior.current === "login" && pantalla === "menu") {
            // Mostrar notificación de bienvenida temporal
            setMostrarBienvenida(true);

            // Desactivarla después de 5 segundos
            timer = setTimeout(() => {
                setMostrarBienvenida(false);
            }, 5000);
        }
        // Si sale del menú → ocultar notificación
        else if (pantallaAnterior.current === "menu" && pantalla !== "menu") {
            setMostrarBienvenida(false);
        }

        pantallaAnterior.current = pantalla;

        return () => {
            if (timer) clearTimeout(timer);
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
                onLoginSuccess={(username) => {
                    setUsuarioActual(username);
                    setPantalla('menu');
                }}
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
                onLogout={() => {
                    setUsuarioActual('');
                    setPantalla('home');
                }}
                setPantalla={setPantalla}
                mostrarBienvenida={mostrarBienvenida}
                usuarioActual={usuarioActual}
                temaOscuro={temaOscuro}
            />
        );
    }

    if (pantalla === 'biblioteca') {
        return (
            <BibliotecaScreen
                onBack={() => setPantalla('menu')}
                temaOscuro={temaOscuro}
                defaultDuration={defaultDuration}
                useDefaultDuration={useDefaultDuration}
                preferredSound={preferredSound}
                onMeditationComplete={(id, minutes) => registerMeditationCompleted(id, minutes)}
            />
        );
    }

    if (pantalla === 'progreso') {
        return (
            <ProgressScreen
                onBack={() => setPantalla('menu')}
                progress={progress}
                temaOscuro={temaOscuro}
            />
        );
    }

    if (pantalla === 'recordatorios') {
        return (
            <RemindersScreen
                onBack={() => setPantalla('menu')}
                notificacionesActivas={notificacionesActivas}
                setNotificacionesActivas={setNotificacionesActivas}
                temaOscuro={temaOscuro}
            />
        );
    }

    if (pantalla === 'ambient-light-demo') {
        return <AmbientLightDemoScreen onBack={() => setPantalla('menu')} />;
    }

    if (pantalla === 'configuracion') {
        return (
            <ConfigScreen
                onBack={() => setPantalla('menu')}
                usuarioActual={usuarioActual}
                notificacionesActivas={notificacionesActivas}
                setNotificacionesActivas={setNotificacionesActivas}
                sonidoActivo={sonidoActivo}
                setSonidoActivo={setSonidoActivo}
                temaOscuro={temaOscuro}
                setTemaOscuro={setTemaOscuro}
                onLogout={() => {
                    setUsuarioActual('');
                    setPantalla('home');
                }}
            />
        );
    }

    if (pantalla === 'personalizacion') {
        return (
            <PersonalizationScreen
                onBack={() => setPantalla('menu')}
                defaultDuration={defaultDuration}
                setDefaultDuration={setDefaultDuration}
                useDefaultDuration={useDefaultDuration}
                setUseDefaultDuration={setUseDefaultDuration}
                preferredSound={preferredSound}
                setPreferredSound={setPreferredSound}
                temaOscuro={temaOscuro}
            />
        );
    }

    return null;
}