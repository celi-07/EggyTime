import React, { useState } from 'react';
import { View, Text, TextInput, Modal, Pressable, StyleSheet, Keyboard } from 'react-native';

const TimeInputModal = ({ visible, onClose, navigationToTimer }) => {
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  // Handle Keyboard Visibility
  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleSubmit = () => {
    const min = parseInt(minutes, 10) || 0;
    const sec = parseInt(seconds, 10) || 0;
    const totalTime = min * 60 + sec; // Convert to total seconds

    if (totalTime > 0) {
      onClose(); // Close the modal
      setMinutes(''); // Clear the input
      setSeconds(''); // Clear the input
      navigationToTimer(totalTime);
    }
  };

  const handleCancel = () => {
    setMinutes('');
    setSeconds('');
    onClose();
  };

  const handleBackdropPress = () => {
    if (isKeyboardVisible) {
      Keyboard.dismiss(); // Close the keyboard only
    } else {
      onClose(); // Close the modal if keyboard is not open
    }
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <Pressable style={styles.modalOverlay} onPress={handleBackdropPress}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Time</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Min"
              value={minutes}
              onChangeText={setMinutes}
              maxLength={2}
            />
            <Text style={styles.separator}>:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Sec"
              value={seconds}
              onChangeText={setSeconds}
              maxLength={2}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    width: 280,
    padding: 20,
    backgroundColor: '#FAFAFA', // Very light gray
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 15,
    fontFamily: 'Fredoka-Bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  input: {
    width: 60,
    height: 50,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: 'white',
    fontFamily: 'Fredoka-Regular',
  },
  separator: {
    fontSize: 24,
    marginHorizontal: 10,
    fontFamily: 'Fredoka-SemiBold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 10,
  },
  submitButton: {
    flex: 1,
    padding: 12,
    backgroundColor: '#FFB800',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Fredoka-SemiBold',
  },
});

export default TimeInputModal;
