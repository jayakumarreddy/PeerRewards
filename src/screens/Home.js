import React, {useState} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import UserAvatar from 'react-native-user-avatar';

import Text from '../components/Text';
import AddNewCloseButton from '../components/AddNewCloseButton';
import RewardModel from '../components/RewardModel';
import rewardsJSON from '../rewardsData';

import RewardsList from '../components/RewardsList';

const currentUser = {
  name: 'Jaya Kumar',
  profilePic:
    'https://img.freepik.com/free-photo/portrait-good-looking-smiling-arabic-man-suit-attractive-young-businessman-with-beard-moustache-looking-camera-portrait-international-beauty-concept_74855-21597.jpg?w=1380&t=st=1665226111~exp=1665226711~hmac=bd0560e104def546decac105e0a76724e680cb7b8344365b9ab75052c85ea70f',
};

const tabs = [
  {name: 'feed', label: 'Feed'},
  {name: 'myRewards', label: 'My Rewards'},
];

const Home = () => {
  const [rewardsData, setRewardsData] = useState(rewardsJSON);
  const [activeMenuItem, setActiveMenuItem] = useState('feed');
  const [showRewardModel, setShowRewardModel] = useState(false);
  const [modalHeight, setModalHeight] = useState(null);

  console.log('rewards daa', rewardsData);

  const onLayoutChange = event => {
    const {height} = event.nativeEvent.layout;
    console.log('onLayout change executed', height);
    setModalHeight(height);
  };

  const sortedRewardsData = rewardsData.sort(
    (a, b) => new Date(b.timeStamp) - new Date(a.timeStamp),
  );
  const myRewards = sortedRewardsData.filter(
    reward => reward.to === currentUser.name,
  );
  const givenRewards = sortedRewardsData.filter(
    reward => reward.from === currentUser.name,
  );
  const givenRewardAmountTotal = givenRewards.reduce(
    (acc, currentEle) => acc + currentEle.amount,
    0,
  );
  const myRewardsTotalAmount = myRewards.reduce(
    (acc, currentEle) => acc + currentEle.amount,
    0,
  );

  const addNewReward = reward => {
    setRewardsData([...rewardsData, reward]);
  };

  return (
    <View style={styles.homeScreenContainer}>
      <View style={styles.profileContainer}>
        <UserAvatar
          size={80}
          name={currentUser.name}
          src={currentUser.profilePic}
          bgColors={['#ccc', '#fafafa', '#ccaabb']}
        />
        <View style={styles.profileDetails}>
          <Text style={[styles.profileName, styles.boldText]}>
            {currentUser.name}
          </Text>
          <Text>
            Given{' '}
            <Text style={styles.boldText}>{`$${givenRewardAmountTotal}`}</Text>{' '}
            / Received{' '}
            <Text style={styles.boldText}>{`$${myRewardsTotalAmount}`}</Text>
          </Text>
        </View>
      </View>
      <View style={styles.menuAndModelContainer} onLayout={onLayoutChange}>
        {!showRewardModel ? (
          <>
            <View style={styles.tabMenu}>
              {(tabs || []).map(tab => (
                <TouchableWithoutFeedback
                  key={tab.name}
                  onPress={() => setActiveMenuItem(tab.name)}>
                  <View
                    style={[
                      styles.tabMenuItem,
                      tab.name === activeMenuItem
                        ? styles.tabActiveMenuItem
                        : {},
                    ]}>
                    <Text style={styles.tabMenuItemText}>{tab.label}</Text>
                  </View>
                </TouchableWithoutFeedback>
              ))}
            </View>
            <View style={styles.tabMenuData}>
              <RewardsList
                data={activeMenuItem === tabs[0].name ? rewardsData : myRewards}
              />
            </View>
          </>
        ) : (
          <View>
            {modalHeight ? (
              <RewardModel
                modalHeight={modalHeight}
                showRewardModel={showRewardModel}
                setShowRewardModel={setShowRewardModel}
                addNewReward={addNewReward}
                currentUser={currentUser}
              />
            ) : (
              ''
            )}
          </View>
        )}
      </View>
      <View style={styles.addNewButton}>
        <AddNewCloseButton
          onPress={() => {
            setShowRewardModel(true);
          }}
          content={'+'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  homeScreenContainer: {
    height: '100%',
    backgroundColor: 'white',
  },
  profileContainer: {
    backgroundColor: 'rgb(245, 240, 237)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 20,
    paddingRight: 20,
  },
  profileDetails: {
    marginLeft: 20,
  },
  profileName: {
    marginBottom: 3,
    fontSize: 18,
  },
  menuAndModelContainer: {
    flex: 1,
  },
  boldText: {
    fontWeight: 'bold',
  },
  tabMenu: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  tabMenuItem: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(228, 226, 223)',
  },

  tabActiveMenuItem: {
    backgroundColor: 'white',
  },
  tabMenuItemText: {
    fontWeight: 'bold',
  },
  tabMenuData: {
    backgroundColor: 'white',
  },
  addNewButton: {
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
});

export default Home;
