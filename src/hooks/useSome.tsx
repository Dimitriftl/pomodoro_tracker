import { useEffect, useRef } from "react";
import { Animated, Keyboard } from "react-native";
import { DEVICE } from "../lib/constants";

/**
 * This is a hook used to animate the screen when the keyboard is triggered,
 * this hook work only on IOS as events `keyboardWillShow` & `keyboardWillHide`
 * are only accessible on IOS.
 *
 * USAGE:
 * const { ref1, ref2, ref3, keyboardOffset } = useAnimatedKeyboard();
 *
 * {...}
 *
 * return <>
 *  <Animated.View style={{ transform: [{ translateY: keyboardOffset }] }}>
 *    {... all `jsx` code that need to be moved when the keyboard is triggered}
 *
 *    <TextInput ref={ref1} />
 *    <TextInput ref={ref2} />
 *    <TextInput ref={ref3} />
 *  </Animated.View>
 * </>
 */

export const useKeyboardAnimation = () => {
  // define ref for each componant that open the keyboard (textInput)
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);
  const ref7 = useRef(null);
  const ref8 = useRef(null);

  // more refs can be define here if their is more than 5 textInput

  // Offset value to apply to the animation
  const keyboardOffset = useRef(new Animated.Value(0)).current;

  // Function triggered for the animation
  const startAnimation = (toValue) => {
    Animated.timing(keyboardOffset, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  // create listeners when the componant is mounted
  useEffect(() => {
    const refs = [ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8]; //additional refs here

    // create the listener "onKeyboardOpen"
    Keyboard.addListener("keyboardWillShow", (e) => {
      refs.forEach((ref) => {
        // check the which is focused
        if (ref?.current?.isFocused()) {
          ref.current.measure((x_, y_, width_, height, pageX_, pageY) => {
            // calculate the bottom position of the componant on the screen
            let bottom = DEVICE.height - pageY - height;

            // if the keyboard overlap the componant trigger the animation
            if (bottom < e.endCoordinates?.height) {
              // add 10 pixels on top of the keyboard
              startAnimation(-(e.endCoordinates?.height - bottom + 10));
            }
          });
        }
      });
    });

    // create the listener "onKeyboardClose"
    Keyboard.addListener("keyboardWillHide", () => {
      // reset the animation
      startAnimation(0);
    });
    return () => {
      // remove listeners to avoid memory leak
      // when the componant is unmounted
      Keyboard.removeAllListeners("keyboardWillShow");
      Keyboard.removeAllListeners("keyboardWillHide");
    };
  }, []);

  return { ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, keyboardOffset };
};