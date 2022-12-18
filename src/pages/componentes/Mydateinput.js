import React from 'react';
import { View } from 'react-native';
import { MaskedTextInput } from "react-native-mask-text";

const Mytextinput = (props) => {
    const mask = '99/99/9999'
    return (
        <View
            style={{
                marginLeft: 35,
                marginRight: 35,
                marginTop: 10,
                borderColor: '#00AD98',
                borderWidth: 1,
            }}>
            <MaskedTextInput
                mask={mask}
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
                keyboardType="numeric"
                style={props.style}
                placeholderTextColor="#00AD98"
            />
        </View>
    );
};


export default Mytextinput;