import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import api from './api';

export default function App() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    carregaDados();
  });

  const carregaDados = async () => {
    const produto = await api.get("/listar");
    console.log(produto.data);
    setDados(JSON.stringify(produto.data));
  }

  return (
    <View style={styles.container}>
      <Text>{dados}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
