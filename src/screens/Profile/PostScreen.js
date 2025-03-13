import { useState, useEffect, useCallback } from 'react'
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '@env';
import PostItem from '../community/components/PostItem';

const PostScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { userId } = route.params || {}; // Get userId from navigation params
    const [sharedPosts, setSharedPosts] = useState([]); // Store only shared posts
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true); // Added loading state
    useEffect(() => {
        fetchSharedPosts(); // Fetch shared posts when screen loads
    }, []);

    const fetchSharedPosts = async () => {
        try {
            setRefreshing(true);

            // Fetch only shared posts (including those created by others)
            const response = await axios.get(`${BASE_URL}/post/getSharedPosts?userId=${userId}`);
            const sharedPostsData = response.data.map(post => ({ ...post, type: 'Shared' }));

            setSharedPosts(sharedPostsData); // Update state with only shared posts
        } catch (error) {
            console.error('Error fetching shared posts:', error);
        } finally {
            setRefreshing(false);
        }
    };

    const onRefresh = useCallback(() => {
        fetchSharedPosts();
    }, []);


    return (
        <View style={{ flex: 1, backgroundColor: '#fff', padding: 10 }}>
            {/* Back Button */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 10 }}>
                <Text style={{ fontSize: 18, color: 'blue' }}>← Back</Text>
            </TouchableOpacity>

            {/* Title */}
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>
                My Shared Posts
            </Text>

            {/* Loading Indicator */}
            {loading ? (
                <ActivityIndicator size="large" color="blue" style={{ marginTop: 20 }} />
            ) : (
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    {sharedPosts.length > 0 ? (
                        sharedPosts.map((post, index) => (
                            <PostItem
                                key={index}
                                post={post}
                                userId={userId}
                                displayCommunityName={!!post.community_id}
                            />
                        ))
                    ) : (
                        <Text style={{ fontSize: 16, textAlign: 'center', marginTop: 20 }}>
                            No shared posts available.
                        </Text>
                    )}
                </ScrollView>
            )}
        </View>
    );
};

export default PostScreen;
