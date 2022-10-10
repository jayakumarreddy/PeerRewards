import React from 'react';
import {FlatList, View, Text, StyleSheet} from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import {getTimeStampInHumanReadableFormat} from '../helpers';

import CustomText from './Text';

const RewardsList = ({data}) => {
  const renderItem = ({item}) => {
    const {to, from, message, timeStamp, toProfilePic} = item;
    return (
      <View style={styles.listItem}>
        <UserAvatar
          size={45}
          name="John Doe"
          src={toProfilePic}
          bgColors={['#ccc', '#fafafa', '#ccaabb']}
        />
        <View style={styles.listItemText}>
          <CustomText style={styles.listItemMessageText}>{message}</CustomText>
          <View style={styles.listItemExtraInfo}>
            <Text style={styles.listItemExtraInfoText}>{`${
              to || ''
            } Rewarded by ${from || ''}`}</Text>
            <Text style={styles.listItemExtraInfoText}>
              {getTimeStampInHumanReadableFormat(timeStamp)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.rewardsList}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rewardsList: {marginTop: 20, marginBottom: 50},
  listItem: {
    paddingLeft: 20,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  listItemText: {
    marginLeft: 15,
    flex: 1,
  },
  listItemMessageText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  listItemExtraInfo: {
    marginTop: 10,
  },
  listItemExtraInfoText: {
    fontSize: 12,
    color: '#949494',
  },
});

export default RewardsList;
