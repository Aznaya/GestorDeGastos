import React, { useState } from 'react';
import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    Alert,
    SafeAreaView,
} from 'react-native';
import Mytextinput from './componentes/Mytextinput';
import Mybutton from './componentes/Mybutton';
import Mydateinput from './componentes/Mydateinput';
import { Database } from '../database/database';

const db = Database.getConnection();

function insereDespesa(titulo, valor, data) {
    db.transaction(function (tx) {
        tx.executeSql(
            'INSERT INTO tabela_despesas (despesa_titulo, despesa_valor, despesa_data) VALUES (?,?,?)',
            [titulo, valor, data],
            (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                    Alert.alert(
                        'Sucesso',
                        'Despesa Registrada com Sucesso !!!',
                        [{ text: 'Ok' }],
                        { cancelable: false }
                    );
                } else alert('Erro ao tentar Registrar o Usuário !!!');
            }
        );
    });
}

function validaTitulo(titulo) {
    console.log('titulo:', titulo, !titulo);
    if (!titulo) {
        alert('O Título da Despesa deve ser preenxido.');
        return 1;
    } else if (titulo.length >= 50) {
        alert('O Título da Despesa não deve ter mais que 50 caracteres.');
        return 1;
    }
}

function validaValor(valor) {
    console.log('valor:', valor);
    if (!valor) {
        alert('O Valor da Despesa deve ser preenxido.');
        return 1;
    } else if (typeof valor === 'string') {
        alert('O Valor da Despesa deve ser um número.');
        return 1;
    }
}

function validaData(data) {
    console.log('data:', data);
    if (!data) {
        alert('A Data da Despesa deve ser preenxida.');
        return 1;
    } else if (data.length >= 50) {
        alert('O Título da Despesa não deve ter mais que 50 caracteres.');
        return 1;
    }
}

function corrigeValor(valor) {
    return valor ? +valor.replace(',', '.') : undefined
}
const RegistroDespesa = ({ navigation }) => {
    let [despesaTitulo, setdespesaTitulo] = useState('');
    let [despesaValor, setdespesaValor] = useState('');
    let [despesaData, setdespesaData] = useState('');

    let select = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM tabela_despesas',
                [],
                (tx, results) => {
                    console.log('====================================');
                    console.log('RESULT.rows', results.rows);
                    console.log('====================================');
                }
            );
        });
    }

    let registro_despesa = () => {
        console.log(despesaTitulo, despesaValor, despesaData);

        despesaValor = corrigeValor(despesaValor)

        let erroValidacao = 0;
        erroValidacao = validaTitulo(despesaTitulo);
        erroValidacao = validaValor(despesaValor);
        erroValidacao = validaData(despesaData);

        if (erroValidacao === 0) {
            insereDespesa(despesaTitulo, despesaValor, despesaData);
            navigation.navigate('TelaInicial');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flex: 1 }}>
                    <ScrollView keyboardShouldPersistTaps="handled">
                        <KeyboardAvoidingView
                            behavior="padding"
                            style={{ flex: 1, justifyContent: 'space-between' }}>
                            <Mytextinput
                                placeholder="Entre com o Titulo:"
                                onChangeText={
                                    (despesaTitulo) => setdespesaTitulo(despesaTitulo)
                                }
                                style={{ padding: 10 }}
                            />
                            <Mydateinput
                                placeholder="Entre com a Data:"
                                onChangeText={
                                    (despesaData) => setdespesaData(despesaData)
                                }
                                style={{ padding: 10 }}
                            />
                            <Mytextinput
                                placeholder="Entre com o Valor:"
                                onChangeText={
                                    (despesaValor) => setdespesaValor(despesaValor)
                                }
                                maxLength={10}
                                keyboardType="numeric"
                                style={{ padding: 10 }}
                            />
                            <Mybutton title="Salvar" customClick={registro_despesa} />
                            <Mybutton title="Lista Tudo" customClick={select} />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default RegistroDespesa;