'use strict';

import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import colors from 'assets/colors';
import theme from 'assets/theme';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

export default class InputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secureInput: props.inputType === 'password',
      inputValue: props.value,
    };
    this.toggleShowPassword = this.toggleShowPassword.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
  }

  toggleShowPassword() {
    this.setState({ secureInput: !this.state.secureInput });
  }

  onChangeText = text => {
    this.props.onChangeText(text);
    this.setState({ inputValue: text });
  };

  render() {
    const {
      labelText,
      labelTextSize,
      labelTextWeight,
      labelColor,
      textColor,
      borderBottomColor,
      borderBottomWidth,
      borderWidth,
      borderColor,
      borderRadius,
      borderTopRightRadius,
      borderTopLeftRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
      paddingLeft,
      inputType,
      customStyle,
      formStyle,
      inputStyle,
      autoCapitalize,
      placeholder,
      placeholderTextColor,
      maxLength,
      height,
      width,
      defaultValue,
      editable,
      selectTextOnFocus,
      onFocus,
      onBlur,
      returnKeyType,
      refs,
      autoFocus,
      blurOnSubmit,
      onSubmitEditing,
      numberOfLines,
      ellipsizeMode,
    } = this.props;

    const { secureInput, inputValue } = this.state;
    const fontSize = labelTextSize || 16;
    const fontWeight = labelTextWeight || '700';
    const color = labelColor || colors.white;
    const inputColor = textColor || colors.white;
    const placeholderColor = placeholderTextColor || colors.text;
    const style = formStyle || styles.forms;
    const customInputStyle = inputStyle || {};
    if (!inputStyle || (inputStyle && !inputStyle.paddingBottom)) {
      customInputStyle.paddingBottom = 5;
    }

    let keyboardType;

    if (inputType === 'phone') {
      keyboardType = 'phone-pad';
    } else if (inputType === 'number') {
      keyboardType = 'numeric';
    } else if (inputType === 'name') {
      keyboardType = 'default';
    } else if (inputType === 'email') {
      keyboardType = 'email-address';
    }

    return (
      <View style={[customStyle, styles.wrapper]}>
        {/* <Text style={[{ fontWeight, color, fontSize }, styles.label]}>
          {labelText}
        </Text> */}

        <TextInput
          style={[{ color: inputColor }, style, inputStyle, styles.inputField]}
          {...this.props}
          // borderWidth={borderWidth}
          // borderColor={borderColor}
          // borderRadius={borderRadius}
          // secureTextEntry={secureInput}
          // onChangeText={this.onChangeText}
          // keyboardType={keyboardType}
          // autoFocus={autoFocus}
          // autoCapitalize={autoCapitalize}
          // autoCorrect={false}
          // paddingLeft={paddingLeft}
          // underlineColorAndroid='transparent'
          // placeholder={placeholder}
          // placeholderTextColor={placeholderColor}
          // defaultValue={defaultValue}
          // value={inputValue}
          // inputType={inputType}
          // maxLength={maxLength}
          // height={height}
          // width={width}
          // onBlur={onBlur}
          // onFocus={onFocus}
          // borderBottomColor={borderBottomColor}
          // borderBottomWidth={borderBottomWidth}
          // editable={editable}
          // ref={refs}
          // onSubmitEditing={onSubmitEditing}
          // returnKeyType={returnKeyType}
          // blurOnSubmit={blurOnSubmit}
          // numberOfLines={numberOfLines}
          // ellipsizeMode={ellipsizeMode}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginBottom: 1,
    fontFamily: 'Poppins-Regular',
  },

  inputField: {
    borderBottomWidth: 2,
    paddingTop: 1,
    fontFamily: theme.secondaryFont,
    fontSize: theme.smallFont,
    height: 40,
  },
});
