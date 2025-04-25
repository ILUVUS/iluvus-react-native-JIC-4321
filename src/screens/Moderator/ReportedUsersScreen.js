import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Alert,
  RefreshControl,
} from 'react-native';
import axios from 'axios';
import { BASE_URL } from '@env';

const ReportedUsersScreen = ({ route }) => {
  const { communityId } = route.params;
  const [reportedUsers, setReportedUsers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchReportedUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/moderator/reportedUsers`, {
        params: { communityId },
      });
      setReportedUsers(res.data);
    } catch (err) {
      console.error('Error fetching reports:', err);
    }
  };

  useEffect(() => {
    fetchReportedUsers();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchReportedUsers().then(() => setRefreshing(false));
  }, []);

  const dismissReport = async (userId) => {
    try {
      await axios.post(`${BASE_URL}/user/moderator/dismissReport`, {
        reportedUserId: userId,
        communityId,
      });
      Alert.alert('Dismissed', 'Reports cleared');
      fetchReportedUsers();
    } catch (err) {
      console.error('Dismiss failed', err);
    }
  };

  const approveReport = async (userId) => {
    try {
      await axios.post(`${BASE_URL}/user/moderator/approveReport`, {
        reportedUserId: userId,
        communityId,
      });
      Alert.alert('Approved', 'User removed from community');
      fetchReportedUsers();
    } catch (err) {
      console.error('Approve failed', err);
    }
  };

  const renderReport = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.username}>{item.username}</Text>
      <Text style={styles.count}>Total Reports: {item.reports.length}</Text>
      {item.reports.map((r, i) => (
        <Text key={i} style={styles.reportText}>
          - {r.reason} ({new Date(r.timestamp).toLocaleString()})
        </Text>
      ))}
      <View style={styles.buttons}>
        <Button title="Dismiss" onPress={() => dismissReport(item.userId)} color="#4CAF50" />
        <Button title="Approve" onPress={() => approveReport(item.userId)} color="#F44336" />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reported Users</Text>
      <FlatList
        data={reportedUsers}
        keyExtractor={(item) => item.userId}
        renderItem={renderReport}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={<Text style={styles.empty}>No reports in this community.</Text>}
      />
    </View>
  );
};

export default ReportedUsersScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  card: { backgroundColor: '#f2f2f2', padding: 12, marginBottom: 12, borderRadius: 8 },
  username: { fontSize: 18, fontWeight: 'bold' },
  count: { marginVertical: 4 },
  reportText: { fontSize: 14, marginLeft: 8 },
  buttons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  empty: { textAlign: 'center', marginTop: 40, color: 'gray' },
});
