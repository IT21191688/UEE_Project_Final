import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatInterfaceAdminSide = () => {
    const [messages, setMessages] = useState([]);
    const [conversationId, setConversationId] = useState('653175493353b53b29c2711d');
    const [userRole, setUserRole] = useState("user")

    const createConversation = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.error('Token is missing in AsyncStorage');
                return;
            }
            const headers = {
                'Authorization': `Bearer ${token}`,
            };

            const data = {
                organization: '64f0ac2b958ea9baa678eca0', // Replace with the actual organization ID
            };

            axios
                .post('https://uee123.onrender.com/api/v1/conversation/create', data, { headers })
                .then((response) => {
                    console.log('Response:', response.data);
                    if (response.data.conversationId) {
                        setConversationId(response.data.conversationId);
                        AsyncStorage.setItem('conversationId', response.data.conversationId);
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } catch (error) {
            console.error('Error creating conversation:', error);
        }
    };

    const sendMessage = async (text) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.error('Token is missing in AsyncStorage');
                return;
            }
            const headers = {
                'Authorization': `Bearer ${token}`,
            };

            const data = {
                message: text,
            };

            await axios.post(`https://uee123.onrender.com/api/v1/message/send/${conversationId}`, data, { headers });
            getMessages();
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const getMessages = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.error('Token is missing in AsyncStorage');
                return;
            }
            const headers = {
                'Authorization': `Bearer ${token}`,
            };

            setUserRole(await AsyncStorage.getItem("role"));

            console.log(userRole)

            const response = await axios.get(`https://uee123.onrender.com/api/v1/message/all-messages/${conversationId}`, { headers });

            console.log(response.data.message)
            if (response.data && response.data.data && Array.isArray(response.data.data)) {
                const formattedMessages = response.data.data.map((msg) => ({
                    _id: msg._id,
                    text: msg.message,
                    createdAt: new Date(msg.createdAt),
                    user: {
                        _id: msg.sender._id,
                    },
                }));
                setMessages(formattedMessages.reverse());
            } else {
                console.error('Invalid message data in the API response');
            }
        } catch (error) {
            console.error('Error getting messages:', error);
        }
    };


    useEffect(() => {
        getTokenAndConversationId();
    }, []);

    useEffect(() => {
        if (conversationId) {
            getMessages();
        }
    }, [conversationId]);

    const getTokenAndConversationId = async () => {
        try {
            const savedToken = await AsyncStorage.getItem('token');
            const savedConversationId = await AsyncStorage.getItem('conversationId');

            if (!savedToken || !savedConversationId) {
                console.error('Token or Conversation ID is missing in AsyncStorage');
                return;
            }

            setConversationId(savedConversationId);
        } catch (error) {
            console.error('Error retrieving data from AsyncStorage:', error);
        }
    };

    const onSend = (newMessages = []) => {
        setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
        const text = newMessages[0].text;
        sendMessage(text);
    };

    const renderBubble = (props) => (
        <Bubble
            {...props}
            wrapperStyle={{
                right: {
                    backgroundColor: userRole === 'admin' ? 'blue' : 'green', // Color for sender's message bubble
                },
                left: {
                    backgroundColor: userRole === 'admin' ? 'green' : 'blue', // Color for receiver's message bubble
                },
            }}
        />
    );

    return (
        <View style={styles.container}>
            <GiftedChat
                messages={messages}
                onSend={(newMessages) => onSend(newMessages)}
                user={{
                    _id: "6523bbea83ff18e7dfe8ca26",
                }}
                renderBubble={renderBubble}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default ChatInterfaceAdminSide;