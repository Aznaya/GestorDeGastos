import React, { useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Text } from 'react-native';
import MyImageButton from './componentes/MyImageButton';
import { Database } from '../database/database';

const db = Database.getConnection();

const TelaInicial = ({ navigation }) => {
    useEffect(() => {
        db.transaction(function (txn) {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='tabela_despesas'",
                [],
                function (tx, res) {
                    console.log('item:', res.rows.length);
                    if (res.rows.length === 0) {
                        txn.executeSql('DROP TABLE IF EXISTS tabela_despesas',
                            []
                        );
                        txn.executeSql('CREATE TABLE IF NOT EXISTS tabela_despesas(despesa_id INTEGER PRIMARY KEY AUTOINCREMENT, despesa_titulo VARCHAR(20), despesa_valor NUMERIC(10,5), despesa_data VARCHAR(10))',
                            []
                        );
                    }
                }
            );
        });
    }, []); // ? Consigo colocar essa parte dentro de um metodo e chamar ele aqui ?

    return (
        <SafeAreaView style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#17223B',
        }}>
            <View style={[styles.valor]}>
                <Text>
                    Gasto Mensal
                </Text>
            </View>
            <View style={[styles.tabela]}>
                <Text>
                    Tabela de Gastos Mensal
                </Text>
            </View>
            <View style={[styles.menu]}>
                <MyImageButton
                    title="Registrar Despesa"
                    btnColor='#263859'
                    btnIcon="shopping-cart"
                    customClick={() => navigation.navigate('Registro')}
                />

                <MyImageButton
                    title="Pesquisar Despesa"
                    btnColor='#263859'
                    btnIcon="search"
                    customClick={() => navigation.navigate('Pesquisa')}
                />

                <MyImageButton
                    title="Pesquisar Histórico"
                    btnColor='#263859'
                    btnIcon="calendar"
                    customClick={() => navigation.navigate('Historico')}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    valor: {},
    tabela: {},
    menu: {
        alignItems: 'center',
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#6B778D',
    }
});

export default TelaInicial;