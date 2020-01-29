import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import moment from 'moment';
import 'moment/locale/pt-br';

import commonStyles from '../../commonStyles';

export default function Task(props) {
  const doneOrNotStyle =
    props.doneAt != null ? {textDecorationLine: 'line-through'} : {};

  const date = props.doneAt ? props.doneAt : props.estimateAt;
  const formattedDate = moment(date)
    .locale('pt-br')
    .format('ddd, D [de] MMMM [de] YYYY');

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => props.toggleTask(props.id)}>
        <View style={styles.taskContainer}>{getCheckView(props.doneAt)}</View>
      </TouchableWithoutFeedback>
      <View>
        <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>
    </View>
  );
}

function getCheckView(doneAt) {
  if (doneAt != null) {
    return (
      <View style={styles.done}>
        <Icon name="check" size={20} color="#fff" />
      </View>
    );
  } else {
    return <View style={styles.pending} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: '#aaa',
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  taskContainer: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pending: {
    height: 25,
    width: 25,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#555',
  },
  done: {
    height: 25,
    width: 25,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#555',
    backgroundColor: '#4d7031',
    alignItems: 'center',
    justifyContent: 'center',
  },
  desc: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.mainTitle,
    fontSize: 16,
  },
  date: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.subTitle,
    fontSize: 12,
  },
});
