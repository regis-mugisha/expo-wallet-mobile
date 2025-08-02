import { View, Text } from "react-native";
import { styles } from "../styles/home.styles";
import { COLORS } from "../constants/colors";

const BalanceCard = ({ summary }) => {
  const { income, expenses, balance } = summary;

  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceTitle}>Total Balance</Text>
      <Text style={styles.balanceAmount}>
        ${parseFloat(balance).toFixed(2)}
      </Text>
      <View style={styles.balanceStats}>
        <View style={{ ...styles.balanceStatItem }}>
          <Text style={styles.balanceStatLabel}>Income</Text>
          <Text style={{ ...styles.balanceStatAmount, color: COLORS.income }}>
            +${parseFloat(income).toFixed(2)}
          </Text>
        </View>
        <View style={[styles.balanceStatItem, styles.statDivider]} />
        <View style={{ ...styles.balanceStatItem, marginLeft: 20 }}>
          <Text style={styles.balanceStatLabel}>Expenses</Text>
          <Text style={{ ...styles.balanceStatAmount, color: COLORS.expense }}>
            -${parseFloat(Math.abs(expenses)).toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default BalanceCard;
