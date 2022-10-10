/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AddNewCloseButton from './AddNewCloseButton';

const RewardModel = ({
  modalHeight,
  showRewardModel,
  setShowRewardModel,
  addNewReward,
  currentUser,
}) => {
  const insets = useSafeAreaInsets();

  const [to, setTo] = useState();
  const [amount, setAmount] = useState();
  const [message, setMessage] = useState();
  const [toError, setToError] = useState(false);
  const [amountError, setAmountError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const resetError = () => {
    setToError(false);
    setAmountError(false);
    setMessageError(false);
  };

  const submitReward = () => {
    resetError();
    if (!to) {
      setToError(true);
    }
    if (!amount) {
      setAmountError(true);
    }
    if (!message) {
      setMessageError(true);
    }
    if (to && amount && message) {
      addNewReward({
        to,
        amount: Number(amount),
        message,
        timeStamp: new Date().getTime(),
        from: currentUser.name,
        toProfilePic: currentUser.profilePic,
      });
      setShowRewardModel(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showRewardModel}
      onRequestClose={() => {
        setShowRewardModel(false);
      }}>
      <View
        style={[
          {
            height: modalHeight + insets.bottom,
          },
          styles.rewardModalContainer,
        ]}>
        <KeyboardAvoidingView keyboardShouldPersistTaps={'handled'}>
          <ScrollView>
            <View style={styles.formContainer}>
              <Text style={styles.headerText}>Give Reward</Text>
              <View style={styles.textInput}>
                <Text style={styles.textInputText}>To</Text>
                <TextInput
                  style={[
                    styles.textInputInput,
                    toError ? styles.textInputError : {},
                  ]}
                  onChangeText={setTo}
                  value={to}
                />
              </View>
              <View style={styles.textInput}>
                <Text style={styles.textInputText}>Amount</Text>
                <TextInput
                  style={[
                    styles.textInputInput,
                    amountError ? styles.textInputError : {},
                  ]}
                  keyboardType="number-pad"
                  onChangeText={setAmount}
                  value={amount}
                />
              </View>
              <View style={styles.textInput}>
                <Text style={styles.textInputText}>Message</Text>
                <TextInput
                  style={[
                    styles.textInputInput,
                    styles.textInputMessageInput,
                    messageError ? styles.textInputError : {},
                  ]}
                  onChangeText={setMessage}
                  value={message}
                  multiline
                />
              </View>
              <TouchableOpacity
                style={styles.giveRewardButton}
                onPress={submitReward}>
                <Text style={styles.giveRewardButtonText}>Give</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <View style={styles.closeButton}>
          <AddNewCloseButton
            onPress={() => {
              setShowRewardModel(false);
            }}
            content={<Text>&#x2715;</Text>}
          />
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  rewardModalContainer: {
    backgroundColor: 'black',
    marginTop: 'auto',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  formContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 30,
    fontWeight: '500',
  },
  textInput: {
    width: '100%',
    marginTop: 20,
  },
  textInputText: {
    color: 'rgb(160,144, 125)',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  textInputInput: {
    alignItems: 'stretch',
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderColor: 'rgb(160,144, 125)',
    color: 'white',
    marginTop: 10,
  },
  textInputError: {
    borderColor: 'red',
  },
  textInputMessageInput: {
    height: 100,
  },
  giveRewardButton: {
    backgroundColor: 'white',
    width: '90%',
    alignItems: 'center',
    padding: 12,
    marginTop: 30,
    borderRadius: 30,
  },
  giveRewardButtonText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  closeButton: {
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
});

export default RewardModel;
