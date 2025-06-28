import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { words } from '../data/word';

export default function HomeScreen() {
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const isFavorite = (id) => favorites.includes(id);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ marginBottom: 10, alignSelf: 'flex-end' }}
        onPress={() =>
          navigation.navigate('Favorites', {
            words,
            favorites,
            toggleFavorite,
          })
        }
      >
        <Text style={{ fontSize: 16, color: '#007AFF' }}>❤️ View Favorites</Text>
      </TouchableOpacity>

      <FlatList
        data={words}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.left}
              onPress={() => navigation.navigate('Details', { word: item })}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <View>
                <Text style={styles.word}>{item.word}</Text>
                {item.category && (
                  <Text style={styles.category}>{item.category}</Text>
                )}
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
              <Ionicons
                name={isFavorite(item.id) ? 'heart' : 'heart-outline'}
                size={24}
                color={isFavorite(item.id) ? 'red' : 'gray'}
              />
            </TouchableOpacity>
          </View>
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
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 16,
  },
  word: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
});
