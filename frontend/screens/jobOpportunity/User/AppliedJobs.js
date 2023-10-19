import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const data = [
    { id: '1', jobTitle: 'Software Engineer', organizationName: 'Google', price: '$100,000' },
    { id: '2', jobTitle: 'Frontend Developer', organizationName: 'Facebook', price: '$90,000' },
    { id: '3', jobTitle: 'Backend Developer', organizationName: 'Amazon', price: '$95,000' },
    { id: '4', jobTitle: 'Mobile Developer', organizationName: 'Apple', price: '$110,000' },
    { id: '5', jobTitle: 'Data Scientist', organizationName: 'Microsoft', price: '$120,000' },
];

const AppliedJobs = () => {
    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{item.jobTitle}</Text>
            <Text style={styles.subtitle}>{item.organizationName}</Text>
            <Text style={styles.price}>{item.price}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 24,
    },
    subtitle: {
        fontSize: 18,
        color: '#888',
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default AppliedJobs;
