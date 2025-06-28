import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { words } from '../data/word';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={words}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Details', { word: item })}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View>
              <Text style={styles.word}>{item.word}</Text>
              {item.category && <Text style={styles.category}>{item.category}</Text>}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: {
    padding: 16,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 16,
  },
  word: { fontSize: 18, fontWeight: 'bold' },
  category: { fontSize: 14, color: '#777' },
});
