import { View, Text, StyleSheet, Pressable } from "react-native"

const PrimaryButton = ({ children, style, press }) => {
    return (
        <View style={style}>
            <Pressable style={styles.buttonInner} onPress={press} android_ripple={{color: "white"}}>
                <Text style={styles.text}>
                    {children}
                </Text>
            </Pressable>

        </View>
    );
}

const styles = StyleSheet.create(
    {
        buttonInner: {
            backgroundColor: "black",
            height: "100%",
        },
        text: {
            textAlign: "center",
            marginTop: 20,
            fontWeight: "bold",
            color: "white",
        }
    }
)

export default PrimaryButton;