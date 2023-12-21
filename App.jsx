import { View } from "react-native";
import Button from "./src/components/Button";
import styles from "./styles/styles";
import { Component } from "react";
import Display from "./src/components/Display";

const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

export default class App extends Component {
  state = {
    ...initialState,
  };

  addDigit(digit) {
    const clearDisplay =
      this.state.displayValue === "0" || this.state.clearDisplay;

    if (
      digit === "." &&
      !clearDisplay &&
      this.state.displayValue.includes(".")
    ) {
      return;
    }
    const currentValue = clearDisplay ? "" : this.state.displayValue;
    const displayValue = currentValue + digit;
    this.setState({ displayValue, clearDisplay: false });

    if (digit !== ".") {
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];
      values[this.state.current] = newValue;
      this.setState({ values });
    }
  }

  clearMemory() {
    this.setState({ displayValue: "0" });
  }

  setOpertion(operation) {
    if (this.state.current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true });
    } else {
      const equals = operation === "=";
      const values = [...this.state.values];

      try {
        values[0] = eval(`${values[0]}  ${this.state.operation} ${values[1]} `);
      } catch (error) {
        values[0] = this.state.values[0];
      }

      values[1] = 0;
      this.setState({
        displayValue: `${values[0]}`,
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values,
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Display value={this.state.displayValue} />
        <View style={styles.buttons}>
          <Button onclick={() => this.clearMemory()} triple label={"AC"} />
          <Button onclick={() => this.setOpertion("/")} operation label={"/"} />
          <Button onclick={() => this.addDigit(7)} label={"7"} />
          <Button onclick={() => this.addDigit(8)} label={"8"} />
          <Button onclick={() => this.addDigit(9)} label={"9"} />
          <Button onclick={() => this.setOpertion("*")} operation label={"*"} />
          <Button onclick={() => this.addDigit(4)} label={"4"} />
          <Button onclick={() => this.addDigit(5)} label={"5"} />
          <Button onclick={() => this.addDigit(6)} label={"6"} />
          <Button onclick={() => this.setOpertion("-")} operation label={"-"} />
          <Button onclick={() => this.addDigit(1)} label={"1"} />
          <Button onclick={() => this.addDigit(2)} label={"2"} />
          <Button onclick={() => this.addDigit(3)} label={"3"} />
          <Button onclick={() => this.setOpertion("+")} operation label={"+"} />
          <Button onclick={() => this.addDigit(0)} duble label={"0"} />
          <Button onclick={() => this.addDigit(".")} label={"."} />
          <Button onclick={() => this.setOpertion("=")} operation label={"="} />
        </View>
      </View>
    );
  }
}
