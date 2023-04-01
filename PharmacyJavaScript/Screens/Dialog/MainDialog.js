
import { useTheme } from '@react-navigation/native';
import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Animated,
} from 'react-native';

const MainDialog = ({visible, children}) => {
        const {colors} = useTheme();
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={[styles.modalBackGround]}>
        <Animated.View
          style={[styles.modalContainer, {transform: [{scale: scaleValue}],backgroundColor: colors.background}]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
});


export default MainDialog;
