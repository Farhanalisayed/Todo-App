import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo, editTodo } from '../slice/todoSlice';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
        {todo.completed ? (
          <FontAwesome name="check-square" size={24} color="#4caf50" />
        ) : (
          <FontAwesome name="square-o" size={24} color="#999" />
        )}
      </TouchableOpacity>

      {/* Display TextInput only when editing */}
      {isEditing ? (
        <TextInput
          value={text}
          onChangeText={setText}
          style={styles.input}
          autoFocus
        />
      ) : (
        <Text
          style={[styles.title, { textDecorationLine: todo.completed ? 'line-through' : 'none', color: todo.completed ? '#aaa' : '#333' }]}
        >
          {text}
        </Text>
      )}

      <View style={styles.buttonsContainer}>
        {/* Edit Button */}
        {!isEditing && (
          <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.editButton}>
            <FontAwesome name="edit" size={22} color="blue" />
          </TouchableOpacity>
        )}

        {/* Save Button (only visible when editing) */}
        {isEditing && (
          <TouchableOpacity onPress={handleEdit} style={styles.saveButton}>
            <FontAwesome name="check" size={22} color="green" />
          </TouchableOpacity>
        )}

        {/* Delete Button */}
        <TouchableOpacity onPress={() => dispatch(deleteTodo(todo.id))} style={styles.deleteButton}>
          <FontAwesome name="trash" size={22} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
  },
  input: {
    borderBottomWidth: 1,
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    borderColor: '#ccc',
    marginRight: 10,  // to add some space between input and buttons
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    marginRight: 10,
  },
  saveButton: {
    marginRight: 10,
  },
  deleteButton: {
    marginLeft: 10,
  },
});

export default TodoItem;