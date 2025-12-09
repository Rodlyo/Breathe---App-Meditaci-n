import React, { useState, useEffect, useRef } from 'react';

import HomeScreen from './HomeScreen';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import MenuScreen from './MenuScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import BibliotecaScreen from './BibliotecaScreen';
import AmbientLightDemoScreen from './AmbientLightDemoScreen';
import ConfigScreen from './ConfigScreen';

export default function App() {
    const [pantalla, setPantalla] = useState('home');
    const [mostrarBienvenida, setMostrarBienvenida] = useState(false);
    const [usuarioActual, setUsuarioActual] = useState('');
    const [notificacionesActivas, setNotificacionesActivas] = useState(true);
    const [sonidoActivo, setSonidoActivo] = useState(true);
    const [temaOscuro, setTemaOscuro] = useState(false);
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
        return <BibliotecaScreen onBack={() => setPantalla('menu')} temaOscuro={temaOscuro} />;
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

    return null;
}