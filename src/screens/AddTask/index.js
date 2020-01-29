import React, {Component} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment/locale/pt-br';

import commonStyles from '../../commonStyles';

const initialState = {desc: '', date: new Date(), showDatePicker: false};

export default class AddTask extends Component {
  state = {
    ...initialState,
  };

  save = () => {
    const newTask = {
      desc: this.state.desc,
      date: this.state.date,
    };

    // if first condition not exists, not execute a second
    this.props.onSave && this.props.onSave(newTask);
    this.setState({...initialState});
  };

  getDatePicker = () => {
    let datePicker = (
      <DateTimePicker
        onChange={(_, date) => this.setState({date, showDatePicker: false})}
        value={this.state.date}
        mode="date"
      />
    );

    const dateString = moment(this.state.date)
      .locale('pt-br')
      .format('ddd, D [de] MMMM [de] YYYY');

    if (Platform.OS === 'android') {
      datePicker = (
        <View>
          <TouchableOpacity
            onPress={() => this.setState({showDatePicker: true})}>
            <View style={styles.containerDate}>
              <Text style={styles.dateTextString}>Select Date task: </Text>
              <Text style={styles.dateTextStringBold}>{dateString}</Text>
            </View>
          </TouchableOpacity>
          {this.state.showDatePicker && datePicker}
        </View>
      );
    }

    return datePicker;
  };

  render() {
    return (
      <Modal
        transparent={true}
        visible={this.props.isVisible}
        onRequestClose={this.props.onCancel}
        animateType="slide">
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>

        <View style={styles.container}>
          <Text style={styles.header}>New Task</Text>
          <TextInput
            style={styles.input}
            placeholder="Insert new task here..."
            autoCapitalize="none"
            value={this.state.desc}
            onChangeText={desc => this.setState({desc})}
          />
          {this.getDatePicker()}
          <View style={styles.containerButtons}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={this.props.onCancel}
              style={styles.buttons}>
              <Text style={styles.textButton}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.save}
              style={styles.buttons}
              activeOpacity={0.7}>
              <Text style={styles.textButton}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  container: {
    backgroundColor: '#fff',
  },
  header: {
    fontFamily: commonStyles.fontFamily,
    backgroundColor: commonStyles.colors.today,
    color: commonStyles.colors.secondary,
    textAlign: 'center',
    padding: 5,
    fontSize: 15,
  },
  containerButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 30,
    marginBottom: 10,
    marginRight: 10,
  },
  buttons: {
    padding: 2,
    borderWidth: 1,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: commonStyles.colors.today,
    marginLeft: 20,
  },
  textButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#fff',
  },
  input: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.mainTitle,
    height: 40,
    margin: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingLeft: 10,
  },
  containerDate: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateTextString: {
    fontFamily: commonStyles.fontFamily,
  },
  dateTextStringBold: {
    fontFamily: commonStyles.fontFamily,
    marginLeft: 10,
    fontWeight: 'bold',
  },
});
