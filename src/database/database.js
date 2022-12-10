import * as SQLite from 'expo-sqlite';

// Conexão com o Banco de dados sqlite
export const Database = {
    getConnection: () => SQLite.openDatabase("database.db"),
};
