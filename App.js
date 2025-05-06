import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [tarefa, setTarefa] = useState('');
  const [lista, setLista] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

useEffect(() => {
    async function carregarDados() {
      const tarefasSalvas = await AsyncStorage.getItem('tarefas');
      if (tarefasSalvas) {
        setLista(JSON.parse(tarefasSalvas));
      }
    }
    carregarDados();
  }, []);

useEffect(() => {
    AsyncStorage.setItem('tarefas', JSON.stringify(lista));
  }, [lista]);

function adicionarOuEditarTarefa() {
    if (tarefa === '') return;

    if (editandoId) {
      const novaLista = lista.map((item) =>
        item.id === editandoId ? { ...item, nome: tarefa } : item
      );
      setLista(novaLista);
      setEditandoId(null);
    } else {
      const novaLista = [
        ...lista,
        { id: Date.now().toString(), nome: tarefa, concluida: false },
      ];
      setLista(novaLista);
    }

    setTarefa('');
  }

function concluirTarefa(id) {
    const novaLista = lista.map((item) =>
      item.id === id ? { ...item, concluida: !item.concluida } : item
    );
    setLista(novaLista);
  }

function excluirTarefa(id) {
    const novaLista = lista.filter((item) => item.id !== id);
    setLista(novaLista);
  }

function iniciarEdicao(id, nome) {
    setEditandoId(id);
    setTarefa(nome);
  }

  return (
    <ImageBackground
      source={{
        uri: 'https://akamai.sscdn.co/uploadfile/letras/albuns/e/e/2/e/2619901738330293.jpg',
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Lista de Tarefas Y2K</Text>

        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            placeholder="Digite uma tarefa"
            placeholderTextColor="#ccc"
            value={tarefa}
            onChangeText={(text) => setTarefa(text)}
          />
          <TouchableOpacity style={styles.button} onPress={adicionarOuEditarTarefa}>
            <Text style={styles.buttonText}>{editandoId ? '✔' : '+'}</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={lista}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <TouchableOpacity onPress={() => concluirTarefa(item.id)} style={{ flex: 1 }}>
                <Text style={[styles.taskText, item.concluida && styles.done]}>
                  {item.nome}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => iniciarEdicao(item.id, item.nome)}
                style={styles.editButton}
              >
                <Text style={styles.editText}>✎</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => excluirTarefa(item.id)}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteText}>X</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
   background: {
  flex: 1,
  justifyContent: 'center',
  },
   overlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.7)',
  paddingTop: 60,
  paddingHorizontal: 20,
  },
   title: {
  fontSize: 28,
  textAlign: 'center',
  marginBottom: 30,
  color: '#f0f8ff',
  fontWeight: 'bold',
  textShadowColor: '#ff00ff',
  textShadowOffset: { width: 2, height: 2 },
  textShadowRadius: 8,
  },
   inputArea: {
  flexDirection: 'row',
  marginBottom: 20,
  },
   input: {
  flex: 1,
  borderColor: 'purple',
  borderWidth: 2,
  padding: 10,
  color: '#fff',
  backgroundColor: '#000',
  fontSize: 16,
  },
   button: {
  backgroundColor: 'purple',
  padding: 12,
  marginLeft: 5,
  justifyContent: 'center',
  borderRadius: 4,
  },
   buttonText: {
  color: '#fff',
  fontSize: 22,
  fontWeight: 'bold',
  },
   taskItem: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 15,
  backgroundColor: '#0f0f1f',
  padding: 10,
  borderRadius: 4,
  borderLeftWidth: 4,
  borderLeftColor: '#00ffff',
  },
   taskText: {
  color: '#f0f8ff',
  fontSize: 16,
  },
   done: {
  textDecorationLine: 'line-through',
  color: '#808080',
  },
   deleteButton: {
  backgroundColor: 'purple',
  paddingHorizontal: 10,
  paddingVertical: 4,
  borderRadius: 4,
  marginLeft: 5,
  },
   deleteText: {
  color: 'white',
  fontWeight: 'bold',
  },
   editButton: {
  backgroundColor: 'purple',
  paddingHorizontal: 10,
  paddingVertical: 4,
  borderRadius: 4,
  marginLeft: 5,
  },
   editText: {
  color: 'white',
  fontWeight: 'bold',
  },
});
