import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nomeSalvo: '',
      nomeDigitado: '',
    };
  }

  async componentDidMount() {
    const nome = await AsyncStorage.getItem('meuNome');
    if (nome) {
      this.setState({ nomeSalvo: nome });
    }
  }
  async componentDidUpdate(_, prevState) {
    if (prevState.nomeSalvo !== this.state.nomeSalvo) {
      await AsyncStorage.setItem('meuNome', this.state.nomeSalvo);
    }
  }
  salvarNome = () => {
    this.setState({ nomeSalvo: this.state.nomeDigitado });
    this.setState({ nomeDigitado: '' }); 
  };
  render() {
    return (
      <View style={estilos.area}>
        <Text style={estilos.texto}>Bem-vindo {this.state.nomeSalvo}</Text>

        <TextInput
          style={estilos.campo}
          placeholder="Digite seu nome"
          value={this.state.nomeDigitado}
          onChangeText={(txt) => this.setState({ nomeDigitado: txt })}
        />

        <TouchableOpacity style={estilos.botao} onPress={this.salvarNome}>
          <Text style={estilos.botaoTexto}>Salvar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const estilos = StyleSheet.create({
   area: {
  flex: 1,
  paddingTop: 60,
  paddingHorizontal: 20,
  },
   texto: {
  fontSize: 26,
  textAlign: 'center',
  marginBottom: 20,
  },
   campo: {
  borderWidth: 1,
  borderColor: '#555',
  fontSize: 18,
  padding: 10,
  marginBottom: 10,
  },
   botao: {
  backgroundColor: '#333',
  padding: 12,
  alignItems: 'center',
  },
   botaoTexto: {
  color: '#fff',
  fontSize: 18,
  },
});