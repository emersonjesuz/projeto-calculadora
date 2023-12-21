import { Text, TouchableHighlight } from "react-native";
import styles from "./styles";

export default function Button({ onclick, label, duble, triple, operation }) {
  function toggleStyles() {
    const stylesButton = [styles.button];
    if (duble) stylesButton.push(styles.buttonDuble);

    if (triple) stylesButton.push(styles.buttonTriple);

    if (operation) stylesButton.push(styles.operationButton);

    return stylesButton;
  }

  return (
    <TouchableHighlight onPress={onclick}>
      <Text style={toggleStyles()}>{label}</Text>
    </TouchableHighlight>
  );
}
