import { Pressable, StyleSheet } from "react-native";

export function RoundButton({ onPress, children, style }) {

    return (
        <Pressable
            style={[styles.roundButton, style]}
            android_ripple={
                RippleConfig = {
                    color: 'purple',
                    borderless: true,
                    radius: 30,
                    foreground: false
                }
            }
            onPress={onPress}
        >
            {children}
        </Pressable>
    )
}

export function SquareButton({ onPress, children, style }) {

    return (
        <Pressable
            style={[styles.squareButton, style]}
            android_ripple={
                RippleConfig = {
                    color: 'purple',
                    borderless: true,
                    radius: 30,
                    foreground: false
                }
            }
            onPress={onPress}
        >
            {children}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    roundButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b804d1',
        borderRadius: 50,
        color: '#fff',
        width: 80,
        height: 80,
        elevation: 2,
    },
    squareButton: {
        borderRadius: 20,
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b804d1',
        color: '#fff',
        padding: 10,
        minWidthidth: 80,
        minHeight: 80
    }
});