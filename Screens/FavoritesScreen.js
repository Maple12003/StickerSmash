import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FavoritesScreen({ navigation, route }) {
  const { words, favorites, toggleFavorite } = route.params;

  const favoriteWords = words.filter(word => favorites.includes(word.id));

  return (
    <View style={styles.container}>
      {favoriteWords.length === 0 ? (
        <Text style={styles.empty}>No favorites yet ❤️</Text>
      ) : (
        <FlatList
          data={favoriteWords}
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
                  name={'heart'}
                  size={24}
                  color={'red'}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  empty: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
    color: '#666',
  },
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
