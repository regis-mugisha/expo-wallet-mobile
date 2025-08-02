import { useCallback, useState } from "react";
import { Alert } from "react-native";

const BASE_URL = "https://expo-wallet-api.onrender.com/api";

export const useTransactions = (userId) => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    income: 0,
    expenses: 0,
    balance: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/transactions/${userId}`);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }, [userId]);

  const fetchSummary = useCallback(async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/transactions/summary/${userId}`
      );
      const data = await response.json();
      setSummary(data);
    } catch (error) {
      console.log("Error fetching summary:", error);
    }
  }, [userId]);

  const loadData = useCallback(async () => {
    if (!userId) return;
    try {
      // Fetch both transactions and summary concurrently
      await Promise.all([fetchTransactions(), fetchSummary()]);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchTransactions, fetchSummary, userId]);

  const deleteTransaction = async (transactionId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/transactions/${transactionId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete transaction");
      }

      loadData(); // Refresh data after deletion
      Alert.alert("Success", "Transaction deleted successfully");
    } catch (error) {
      console.error("Error deleting transaction:", error);
      Alert.alert("Error", error.message);
    }
  };
  return {
    transactions,
    summary,
    isLoading,
    loadData,
    deleteTransaction,
  };
};
