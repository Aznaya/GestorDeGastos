import * as SQLite from 'expo-sqlite';

// Conexão com o Banco de dados sqlite
export const Db = {
    getConnection: () => SQLite.openDatabase("database.db"),
};
