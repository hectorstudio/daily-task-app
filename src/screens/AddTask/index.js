import React, {Component} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import commonStyles from '../../commonStyles';

export default class AddTask extends Component {
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
          <Text style={styles.header}>New tasks</Text>
          <TextInput style={styles.input} />
          <View style={styles.buttons}>
            <TouchableOpacity>
              <Text style={styles.textButton}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity>
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
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  textButton: {
    margin: 20,
    marginRight: 30,
    color: commonStyles.colors.today,
  },
  input: {
    fontFamily: commonStyles.fontFamily,
    height: 40,
    margin: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
  },
});
