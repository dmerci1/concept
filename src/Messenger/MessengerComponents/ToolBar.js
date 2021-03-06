import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
const ToolbarButton = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.button}>{title}</Text>
  </TouchableOpacity>
);



export default class Toolbar extends React.Component {

  static defaultProps = {
    onChangeFocus: () => {},
    onSubmit: () => {},
    onPressCamera: () => {},
    onPressLocation: () => {},
  };

  state = {
    text: '',
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.isFocused !== this.props.isFocused) {
      if (nextProps.isFocused) {
        this.input.focus();
      } else {
        this.input.blur();
      }
    }
  }

  setInputRef = ref => {
    this.input = ref;
  };

  handleFocus = () => {
    const { onChangeFocus } = this.props;

    onChangeFocus(true);
  };

  handleBlur = () => {
    const { onChangeFocus } = this.props;

    onChangeFocus(false);
  };

  handleChangeText = text => {
    this.setState({ text });
  };

  handleSubmitEditing = () => {
    const { onSubmit } = this.props;
    const { text } = this.state;

    if (!text) return; // Don't submit if empty

    onSubmit(text);
    this.setState({ text: '' });
  };

  render() {
    const { onPressCamera, onPressLocation } = this.props;
    const { text } = this.state;

    return (
      <View style={styles.toolbar}>
        <MaterialIcons
          name="camera-alt"
          size={30}
           onPress={onPressCamera}
           style={{ marginRight: 5 }}
        />
        <MaterialIcons
          name="add-location"
          size={30}
          onPress={onPressLocation}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            underlineColorAndroid={'transparent'}
            placeholder={'TYPE SOMETHING YOU FUCK!'}
            blurOnSubmit={false}
            value={text}
            onChangeText={this.handleChangeText}
            onSubmitEditing={this.handleSubmitEditing}
            ref={this.setInputRef}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingLeft: 16,
    backgroundColor: 'white',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
  input: {
    flex: 1,
    fontSize: 18,
  },
  button: {
    top: -2,
    marginRight: 12,
    fontSize: 20,
    color: 'grey',
  },
});
