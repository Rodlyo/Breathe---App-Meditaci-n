import React, { useState } from 'react';
import HomeScreen from './HomeScreen';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import MenuScreen from './MenuScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';

export default function App() {
  const [pantalla, setPantalla] = useState('home');

  if (pantalla === 'home') {
    return <HomeScreen onStart={() => setPantalla('login')} />;
  }

  // Register → Login
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
    return <MenuScreen onLogout={() => setPantalla('home')} />;
  }

}
