import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/home.styles";
import { COLORS } from "../constants/colors";

const NoTransactionsFound = () => {
  const router = useRouter();
  return (
    <View style={styles.emptyState}>
      <Ionicons name="search-outline" size={60} style={styles.emptyStateIcon} />
      <Text style={styles.emptyStateTitle}>No Transactions yet</Text>
      <Text style={styles.emptyStateText}>
        Start tracking your finance by creating your first transaction
      </Text>
      <TouchableOpacity
        style={styles.emptyStateButton}
        onPress={() => router.push("/create")}
      >
        <Ionicons name="add-circle" size={18} color={COLORS.white} />
        <Text style={styles.emptyStateButtonText}>Add Transaction</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoTransactionsFound;
