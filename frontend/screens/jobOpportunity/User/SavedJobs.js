import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const savedJobsData = [
    {
        id: '1',
        jobTitle: 'Software Engineer',
        organizationName: 'Google',
        price: '$100,000 - $150,000',
    },
    {
        id: '2',
        jobTitle: 'Frontend Developer',
        organizationName: 'Facebook',
        price: '$80,000 - $120,000',
    },
    {
        id: '3',
        jobTitle: 'Backend Developer',
        organizationName: 'Amazon',
        price: '$90,000 - $130,000',
    },
];

const SavedJobs = () => {
    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.jobTitle}>{item.jobTitle}</Text>
            <Text style={styles.organizationName}>{item.organizationName}</Text>
            <Text style={styles.price}>{item.price}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={savedJobsData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    jobTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    organizationName: {
        fontSize: 18,
        marginBottom: 10,
    },
    price: {
        fontSize: 16,
        color: '#888',
    },
});

export default SavedJobs;
