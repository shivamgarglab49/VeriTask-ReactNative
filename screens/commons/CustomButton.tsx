import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  StyleProp,
  TextStyle,
} from "react-native";

type CustomButtonProps = {
  onPress: () => void;
  text: string;
  rippleColor: string;
  containerStyle?: StyleProp<TextStyle> | undefined;
  buttonStyle?: StyleProp<TextStyle> | undefined;
  textStyle?: StyleProp<TextStyle> | undefined;
};

const CustomButton: React.FC<CustomButtonProps> = (props) => {
  const handlePress = () => {
    props.onPress();
  };

  return (
    <View style={[styles.containerProps, props.containerStyle]}>
      <Pressable
        onPress={handlePress}
        android_ripple={{ color: props.rippleColor }}
        style={[styles.buttonProps, props.buttonStyle]}
      >
        <Text style={[styles.textProps, props.textStyle]}>{props.text}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  containerProps: {
    borderRadius: 4,
    overflow: "hidden",
  },
  buttonProps: {
    minWidth: 100,
    borderRadius: 4,
    paddingVertical: 8,
    backgroundColor: "red",
    paddingHorizontal: 16,
    alignItems: "center",
  },
  textProps: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
});

export default CustomButton;
