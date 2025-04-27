import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo, editTodo } from '../slice/todoSlice';

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.title);

  const handleEdit = () => {
    dispatch(editTodo({ id: todo.id, newTitle: text }));
    setIsEditing(false);
  };

  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => dispatch(toggleTodo(todo.id))}>
        <Text style={[styles.checkbox, { color: todo.completed ? '#4caf50' : '#999' }]}>
          {todo.completed ? '✔️' : '⬜'}
        </Text>
      </TouchableOpacity>

      {isEditing ? (
        <TextInput
          value={text}
          onChangeText={setText}
          onBlur={handleEdit}
          style={styles.input}
          autoFocus
        />
      ) : (
        <TouchableOpacity onLongPress={() => setIsEditing(true)} style={styles.titleContainer}>
          <Text style={[styles.title, { textDecorationLine: todo.completed ? 'line-through' : 'none', color: todo.completed ? '#aaa' : '#333' }]}>
            {todo.title}
          </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => dispatch(deleteTodo(todo.id))}>
        <Text style={styles.delete}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12, borderRadius: 10, marginVertical: 5, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  checkbox: { fontSize: 24 },
  titleContainer: { flex: 1, marginLeft: 10 },
  title: { fontSize: 16 },
  delete: { fontSize: 22, marginLeft: 10, color: 'red' },
  input: { borderBottomWidth: 1, flex: 1, marginLeft: 10, fontSize: 16, borderColor: '#ccc' },
});

export default TodoItem;