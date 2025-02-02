import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TimeInputModal from './TimeInputModal';

const { width } = Dimensions.get('window')

const EggSelection = () => {
  const navigation = useNavigation()

  const [modalVisible, setModalVisible] = React.useState(false);

  const navigateToTimer = (time) => {
    navigation.navigate('EggTimer', { time });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Egg Timer &lt;3</Text>
      <Text style={styles.subHeader}>What are you making today?</Text>
      <View style={styles.grid}>
        <TouchableOpacity style={styles.eggOption} onPress={() => navigateToTimer(180)}>
          <Text style={styles.eggLabel}>Soft Boiled</Text>
          <View style={styles.eggImageContainer}>
            <Image source={require('./assets/softBoiled.jpg')} style={styles.eggImage} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.eggOption} onPress={() => navigateToTimer(300)}>
          <Text style={styles.eggLabel}>Medium Boiled</Text>
          <View style={styles.eggImageContainer}>
            <Image source={require('./assets/mediumBoiled.jpg')} style={styles.eggImage} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.eggOption} onPress={() => navigateToTimer(420)}>
          <Text style={styles.eggLabel}>Hard Boiled</Text>
          <View style={styles.eggImageContainer}>
            <Image source={require('./assets/hardBoiled.jpg')} style={styles.eggImage} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.eggOption} onPress={() => setModalVisible(true)}>
          <Text style={styles.eggLabel}>Custom Boiled</Text>
          <View style={styles.eggImageContainer}>
            <Image source={require('./assets/customBoiled.png')} style={styles.eggImage} />
          </View>
        </TouchableOpacity>
      </View>

      <TimeInputModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        navigationToTimer={navigateToTimer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff' 
  },
  header: { 
    fontSize: 24, 
    color: '#FFB800',
    fontFamily: 'Fredoka-Bold', 
  },
  subHeader: { 
    fontSize: 16, 
    marginTop: 10,
    marginBottom: 20,
    fontFamily: 'Fredoka-Regular', 
  },
  grid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'center'
  },
  eggOption: { 
    alignItems: 'center', 
    margin: 10,
    borderWidth: 2,
    borderRadius: 6,
    width: width / 2 - 30,
  },
  eggImage: { 
    width: 60, 
    height: 60,
  },
  eggImageContainer: {
    padding: 10,
  },
  eggLabel: { 
    fontSize: 14, 
    backgroundColor: '#FFEB99',
    width: '100%',
    textAlign: 'center',
    paddingVertical: 5,
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
    borderBottomWidth: 2,
    fontFamily: 'Fredoka-SemiBold',
  },
});

export default EggSelection;
