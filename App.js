import 'react-native-gesture-handler';

import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TelaInicial from './src/pages/TelaInicial';
import RegistroDespesa from './src/pages/RegistroDespesa';
import PesquisaDespesa from './src/pages/PesquisaDespesa';
import ConsultaHistoricoDespesa from './src/pages/ConsultaHistoricoDespesa';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaInicial">
        <Stack.Screen
          name="TelaInicial"
          component={TelaInicial}
          options={{
            title: 'Gestor de Gastos',
            headerStyle: {
              backgroundColor: '#17223B',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Registro"
          component={RegistroDespesa}
          options={{
            title: 'Registro de Despesas',
            headerStyle: {
              backgroundColor: '#17223B',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Pesquisa"
          component={PesquisaDespesa}
          options={{
            title: 'Pesquisar por Despesa',
            headerStyle: {
              backgroundColor: '#17223B',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Historico"
          component={ConsultaHistoricoDespesa}
          options={{
            title: 'Visualizar Histórico',
            headerStyle: {
              backgroundColor: '#17223B',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
