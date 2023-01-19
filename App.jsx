import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

function App() {
  const [data, setData] = useState({});
  const [deckId, setDeckId] = useState("");
  const [stack, setStack] = useState("");
  const [visible, setVisible] = useState(false);

  const requestId = async () => {
    const request = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
    const response = await request.json();
    setData(response);
  };

  const requestCards = async () => {
    const request = await fetch(`https://deckofcardsapi.com/api/deck/${deckId ? deckId : deck.deck_id}/draw/?count=4`);
    const response = await request.json();
    setStack(response);
  };

  useEffect(() => {
    requestId();
  }, [data]);

  useEffect(() => {
    requestCards();
  }, [deckId]);

  const shufleDeck = () => {
    setDeckId(data.deck_id);
    setVisible(false);
  };

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.buttonsArea}>
        <TouchableOpacity style={styles.button} onPress={() => shufleDeck()}>
          <Text>Shufle</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { setVisible(true); }}>
          <Text>Show</Text>
        </TouchableOpacity>
      </View>
      {
        visible &&
        <View style={styles.cardsBlock}>
          {stack.cards?.map((item, index)=> {
            return (
              <View key={index}>
                <Image style={{ width: 70, objectFit: "contain", height: 90 }} source={{ uri: item.image }} />
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
    backgroundColor: "black",
  },
  buttonsArea: {
    flexDirection: "row",
    gap: 50,
    marginBottom: 25
  },
  button:{
    padding: 8,
    backgroundColor: 'orange',
    borderRadius: 12
  },
  cardsBlock: {
    flexDirection: "row",
    gap: 25,
  },
});

export default App;
