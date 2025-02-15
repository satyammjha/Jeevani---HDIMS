import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { GoogleGenerativeAI } from '@google/generative-ai';


const ChatBot = () => {
    const [isChatVisible, setIsChatVisible] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Add API key and initialize model
    const apiKey = 'AIzaSyAx4bapGjEdXuwlAgRwpK2jda5Cmklf5rw'; // Replace with your actual API key
    const genAI = new GoogleGenerativeAI(apiKey);

    const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: 'text/plain',
    };

    // Initialize model
    const model = genAI.getGenerativeModel({
        model: 'gemini-pro',
        generationConfig,
    });

    // Move chat history configuration inside handleSend
    const getChatSession = () => model.startChat({
        history: [
            {
                role: 'user',
                parts: [{ text: 'You are Jeevani AI. Respond briefly (under 20 words) to health queries.If any query is not releated to health or health Data reply that you cant answer to that, Suppose you are managing data of Indian hospitals like diseases data and equipments, doctors etc so think of a dummy data before replying and if you dont have access to real time data then just imagine any answer which matches with correc and then reply.. First message: "Hello! I\'m Jeevani AI. How can I assist with your health needs?"' }],
            },
            {
                role: 'model',
                parts: [{ text: "Hello! I'm Jeevani AI. How can I assist with your health needs?" }],
            }
        ],
    });

    useEffect(() => {
        if (isChatVisible && messages.length === 0) {
            setMessages([{ role: 'model', text: "Hello! I'm Jeevani AI. How can I assist with your health needs?" }]);
        }
    }, [isChatVisible]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const chatSession = getChatSession();
            const result = await chatSession.sendMessage(input);
            const response = await result.response.text();

            setMessages(prev => [...prev, {
                role: 'model',
                text: response.split('\n')[0].substring(0, 100) // Limit response length
            }]);
        } catch (error) {
            setMessages(prev => [...prev, {
                role: 'model',
                text: 'Sorry, I encountered an error. Please try again.'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <TouchableOpacity
                style={styles.chatButton}
                onPress={() => setIsChatVisible(true)}
            >
                <Icon name="robot-happy" size={28} color="#fff" />
            </TouchableOpacity>

            <Modal
                visible={isChatVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setIsChatVisible(false)}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.flex}
                >
                    <View style={styles.chatModalContainer}>
                        <View style={styles.chatWindow}>
                            <View style={styles.chatHeader}>
                                <Text style={styles.chatTitle}>Jeevani Assistant</Text>
                                <TouchableOpacity onPress={() => setIsChatVisible(false)}>
                                    <Icon name="close" size={24} color="#00796B" />
                                </TouchableOpacity>
                            </View>

                            <ScrollView style={styles.messagesContainer}>
                                {messages.map((message, index) => (
                                    <View
                                        key={index}
                                        style={[
                                            styles.messageBubble,
                                            message.role === 'user' ? styles.userMessage : styles.botMessage
                                        ]}
                                    >
                                        <Text style={styles.messageText}>{message.text}</Text>
                                    </View>
                                ))}
                                {isLoading && (
                                    <View style={styles.botMessage}>
                                        <Text style={styles.messageText}>Thinking...</Text>
                                    </View>
                                )}
                            </ScrollView>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    value={input}
                                    onChangeText={setInput}
                                    placeholder="Type your health query..."
                                    placeholderTextColor="#90A4AE"
                                    onSubmitEditing={handleSend}
                                />
                                <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
                                    <Icon name="send" size={24} color="#00796B" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    chatButton: {
        position: 'absolute',
        bottom: 80,
        right: 20,
        backgroundColor: '#00796B',
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        zIndex: 999,
    },
    chatModalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    chatWindow: {
        backgroundColor: '#fff',
        height: '70%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 16,
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    messagesContainer: {
        flex: 1,
        marginVertical: 16,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: 12,
        borderRadius: 16,
        marginVertical: 8,
    },
    userMessage: {
        backgroundColor: '#E0F2F1',
        alignSelf: 'flex-end',
    },
    botMessage: {
        backgroundColor: '#B2DFDB',
        alignSelf: 'flex-start',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 16,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#B0BEC5',
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 8,
    },
    sendButton: {
        padding: 8,
    },
    flex: {
        flex: 1,
    },
});

export default ChatBot;