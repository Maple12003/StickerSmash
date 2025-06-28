import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, Feather } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

const { width } = Dimensions.get('window');

export default function DetailScreen({ route }) {
  const { word } = route.params;
  const flipAnim = useRef(new Animated.Value(0)).current;
  const [flipped, setFlipped] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const flipCard = () => {
    Animated.spring(flipAnim, {
      toValue: flipped ? 0 : 180,
      useNativeDriver: true,
    }).start();
    setFlipped(!flipped);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const speakWord = () => {
    Speech.speak(word.word, {
      language: 'en',
      rate: 0.8,
    });
  };

  return (
    <LinearGradient colors={['#89f7fe', '#66a6ff']} style={styles.container}>
      <TouchableWithoutFeedback onPress={flipCard}>
        <View>
          {/* Front Side */}
          <Animated.View
            style={[
              styles.card,
              styles.frontCard,
              { transform: [{ rotateY: frontInterpolate }] },
              flipped ? styles.hidden : {},
            ]}
          >
            <Image source={{ uri: word.image }} style={styles.image} />
            <Text style={styles.word}>{word.word}</Text>
            {word.category && <Text style={styles.category}>{word.category}</Text>}

            {/* Heart Icon */}
            <TouchableOpacity onPress={toggleFavorite} style={styles.heartButton}>
              <AntDesign
                name={isFavorite ? 'heart' : 'hearto'}
                size={28}
                color={isFavorite ? 'red' : '#aaa'}
              />
            </TouchableOpacity>

            {/* Speaker Icon */}
            <TouchableOpacity onPress={speakWord} style={styles.speakerButton}>
              <Feather name="volume-2" size={24} color="#333" />
            </TouchableOpacity>

            <Text style={styles.instruction}>Tap to see definition</Text>
          </Animated.View>

          {/* Back Side */}
          <Animated.View
            style={[
              styles.card,
              styles.backCard,
              { transform: [{ rotateY: backInterpolate }] },
              !flipped ? styles.hidden : {},
            ]}
          >
            <Text style={[styles.word, { color: '#fff' }]}>{word.word}</Text>
            {word.category && <Text style={styles.categoryBack}>{word.category}</Text>}
            <Text style={styles.definition}>{word.definition}</Text>
            <Text style={[styles.instruction, { color: '#eee' }]}>Tap to flip back</Text>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: width * 0.85,
    height: 400,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    padding: 20,
  },
  frontCard: {
    backgroundColor: '#fff',
  },
  backCard: {
    backgroundColor: '#333',
    position: 'absolute',
    top: 0,
  },
  hidden: {
    opacity: 0,
  },
  image: {
    width: 250,
    height: 150,
    borderRadius: 12,
    marginBottom: 20,
  },
  word: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  definition: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    paddingHorizontal: 10,
  },
  instruction: {
    marginTop: 20,
    fontSize: 14,
    color: '#666',
  },
  category: {
    marginTop: 8,
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
  },
  categoryBack: {
    marginTop: 8,
    fontSize: 14,
    color: '#ccc',
    fontStyle: 'italic',
  },
  heartButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  speakerButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
});
