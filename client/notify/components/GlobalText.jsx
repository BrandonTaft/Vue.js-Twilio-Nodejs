import { StyleSheet, Text } from "react-native";

export function MyText({newStyle, children}) {
    return (
        <Text style={[styles.text, newStyle]}>{children}</Text>
    );
}

export function MyHeader({newStyle, children}) {
    return (
        <Text style={[styles.header, newStyle]}>{children}</Text>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        color: '#fff'
    },
    header: {
        fontSize: 40,
        color: '#fff'
    }
})