import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addTodo } from '../slice/todoSlice';

const AddTodoScreen = ({ navigation }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (text.trim() === '') {
      setError('Please enter something to add!');
    } else {
      dispatch(addTodo(text));
      navigation.goBack();
    }
  };

  const handleChangeText = (value) => {
    setText(value);
    if (error) {
      setError('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Todo</Text>
      <TextInput
        placeholder="What do you want to do?"
        value={text}
        onChangeText={handleChangeText}
        style={[styles.input, error ? styles.inputError : null]}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleAddTodo}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f0f8ff' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#333' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 5,
  },
  button: { backgroundColor: '#4caf50', padding: 15, borderRadius: 8 },
  buttonText: { textAlign: 'center', color: 'white', fontWeight: 'bold' },
});

export default AddTodoScreen;