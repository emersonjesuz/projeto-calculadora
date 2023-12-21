import { Text, View } from "react-native";
import styles from "./styles.jsx";

export default function Display({ value }) {
  return (
    <View style={styles.display}>
      <Text numberOfLines={1} style={styles.displayValue}>
        {value}
      </Text>
    </View>
  );
}
