import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setTodos, setFilter, setSort } from '../slice/todoSlice';
import TodoItem from '../components/TodoItem';
import axios from 'axios';

// Importing icons
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const MainScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { items, filter, sort } = useSelector(state => state.todos);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    const res = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=20');
    dispatch(setTodos(res.data));
    setLoading(false);
  };

  const filteredTodos = items.filter(todo => {
    if (filter === 'Active') return !todo.completed;
    if (filter === 'Done') return todo.completed;
    return true;
  });

  const sortedTodos = filteredTodos.sort((a, b) => {
    if (sort === 'Recent') {
      return new Date(b.created_at) - new Date(a.created_at);
    }
    return a.id - b.id;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="clipboard-list" size={28} color="#333" />
        <Text style={styles.headerText}>Todo List</Text>
      </View>

      <View style={styles.topBar}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddTodo')}>
          <Icon name="plus" size={16} color="#fff" />
          <Text style={styles.buttonText}> Add Todo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => dispatch(setSort('Recent'))}>
          <Icon name="clock" size={16} color="#fff" />
          <Text style={styles.buttonText}> Recent</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => dispatch(setSort('ID'))}>
          <MaterialIcons name="format-list-numbered" size={20} color="#fff" />
          <Text style={styles.buttonText}> Sort by ID</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filters}>
        {['All', 'Active', 'Done'].map(type => (
          <TouchableOpacity
            key={type}
            style={[styles.filterButton, filter === type && styles.activeFilter]}
            onPress={() => dispatch(setFilter(type))}
          >
            <Text style={styles.filterText}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.count}>
        Total: {items.length} | Completed: {items.filter(todo => todo.completed).length}
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#08bcc4" style={{ marginTop: 30 }} />
      ) : (
        <FlatList
          data={sortedTodos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <TodoItem todo={item} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f8ff', padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 15 },
  headerText: { fontSize: 26, fontWeight: 'bold', marginLeft: 8, color: '#333' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  button: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#4caf50', padding: 10, borderRadius: 8 },
  buttonText: { color: 'white', fontWeight: 'bold' },
  filters: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
  filterButton: { paddingVertical: 8, paddingHorizontal: 16, backgroundColor: '#eee', borderRadius: 20 },
  activeFilter: { backgroundColor: '#08bcc4' },
  filterText: { fontWeight: 'bold', color: '#333' },
  count: { textAlign: 'center', marginVertical: 10, fontSize: 16, color: '#666' },
});

export default MainScreen;
