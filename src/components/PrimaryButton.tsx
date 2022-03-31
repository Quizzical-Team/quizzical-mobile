import {View, Text, StyleSheet} from "react-native"

const PrimaryButton = ({children, style}) => {
    return (
        <View style={style}>
            <Text style={styles.text}>
                {children}
            </Text>
        </View>);
}

const styles = StyleSheet.create(
    {
        text: {
            textAlign: "center",
            marginTop: 20,
            fontWeight: "bold",
            color: "white",
        }
    }
)

export default PrimaryButton;