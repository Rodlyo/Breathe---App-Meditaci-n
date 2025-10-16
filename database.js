import { openDatabaseSync } from 'expo-sqlite';

const db = openDatabaseSync('usuarios.db');

// ⚠️ SOLO TEMPORAL: eliminar la tabla vieja con columnas antiguas
export const resetearBaseDeDatos = async () => {
    try {
        await db.execAsync('DROP TABLE IF EXISTS usuarios;');
        console.log('[DB] Tabla usuarios eliminada (reset)');
    } catch (e) {
        console.log('[DB] Error al resetear BD', e);
    }
};

export const crearTabla = async () => {
    try {
        await db.execAsync(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario TEXT,
        contrasena TEXT
      );
    `);
        console.log('[DB] Tabla creada');
    } catch (e) {
        console.log('[DB] Error crearTabla', e);
    }
};

export const insertarUsuario = async (usuario, contrasena) => {
    try {
        await db.runAsync(
            'INSERT INTO usuarios (usuario, contrasena) VALUES (?, ?)',
            [usuario, contrasena]
        );
        console.log('[DB] Insertado:', usuario, contrasena);
    } catch (e) {
        console.log('[DB] Error insertarUsuario', e);
    }
};

export const validarUsuario = async (usuario, contrasena) => {
    try {
        console.log('[DB] validarUsuario - parámetros recibidos:', `"${usuario}"`, `"${contrasena}"`);
        const rows = await db.getAllAsync(
            'SELECT * FROM usuarios WHERE usuario = ? AND contrasena = ?',
            [usuario, contrasena]
        );
        console.log('[DB] validarUsuario - rows:', rows);
        return rows.length > 0;
    } catch (e) {
        console.log('[DB] Error validarUsuario', e);
        return false;
    }
};

// Función para revisar todos los usuarios
export const obtenerTodos = async () => {
    try {
        const rows = await db.getAllAsync('SELECT * FROM usuarios;');
        console.log('[DB] obtenerTodos:', rows);
        return rows;
    } catch (e) {
        console.log('[DB] Error obtenerTodos', e);
        return [];
    }
};

export default db;
