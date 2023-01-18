/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

function App() {
  const [deck, setDeck] = useState({});
  const [deckId, setDeckId] = useState("");
  const [cards, setCards] = useState("");
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    const fetchDeck = async () => {
      const res = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
      const data = await res.json();
      setDeck(data);
    }; fetchDeck();
  }, [deck]);

  useEffect(() => {
    const fetchCards = async () => {
      const res = await fetch(`https://deckofcardsapi.com/api/deck/${deckId ? deckId : deck.deck_id}/draw/?count=4`);
      const data = await res.json();
      setCards(data);
    }; fetchCards();
  }, [deckId]);

  console.log(deck, "data");

  const shufle = () => {
    setDeckId(deck.deck_id);
    setShowCards(false);
  };

  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity onPress={() => shufle()}>
        <Text>Shufle</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { setShowCards(true); }}>
        <Text>Draw</Text>
      </TouchableOpacity>
      {
        showCards &&
        <View style={styles.cardsBlock}>
          {cards.cards?.map(item => {
            return (
              <View>
                <Text>{item.code}</Text>
                <Image style={{ width: 60, objectFit: "fill", height: 90 }} source={{ uri: item.image }} />
              </View>
            );
          })}
        </View>
      }

    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
  },
  cardsBlock: {
    flexDirection: "row",
    gap: 25,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
