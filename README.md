Proyecto "Breathe" con React Native - SQLite:

Este proyecto es una **aplicación móvil desarrollada en React Native** que incluye funcionalidades de **Login, Registro, Menú principal y manejo de base de datos SQLite**.  
Está diseñado para funcionar sin usar React Navigation.

---

Tecnologías:

- **React Native**  
- **SQLite** para almacenamiento local  
- **JavaScript** y React Hooks  
- **Expogo** (Para visualizarlo desde la app de expogo en el celular)  
- **Bootstrap o estilos propios** para UI (según `Styles.js`)  

---

Estructura del proyecto:

/assets # Imágenes y recursos
/HomeScreen.js
/LoginScreen.js
/RegisterScreen.js
/MenuScreen.js
/ForgotPasswordScreen.js
/Styles.js # Paleta de colores y estilos
/App.js
/package.json
/package-lock.json


---

Funcionalidades:

1. **HomeScreen**  
   - Pantalla inicial con botón para ir al login.  

2. **LoginScreen**  
   - Login de usuario con validación básica.  
   - Opciones para registrarse o recuperar contraseña.  

3. **RegisterScreen**  
   - Registro de nuevos usuarios.  
   - Redirige automáticamente al login tras registrarse.  

4. **ForgotPasswordScreen**  
   - Recuperación de contraseña (simulada).  

5. **MenuScreen**  
   - Pantalla principal después del login.  
   - Icono de usuario interactivo que permite **cerrar sesión y volver a HomeScreen**.  
   - Temporizador central y botones tipo tarjeta (Biblioteca, Personalización, Progreso).  

6. **SQLite**  
   - Base de datos local para guardar usuarios y otra información relevante.  


Cómo usarlo:

1. Clonar el repositorio:

```bash
git clone https://github.com/tuUsuario/mi-proyecto.git
cd mi-proyecto
