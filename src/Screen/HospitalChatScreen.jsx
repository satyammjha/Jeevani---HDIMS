import React, { useState, useEffect } from 'react'; // Add useEffect
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HospitalChatScreen = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const apiKey = 'AIzaSyAx4bapGjEdXuwlAgRwpK2jda5Cmklf5rw'; // Replace with your actual API key
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
        model: 'gemini-2.0-flash',
    });

    const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: 'text/plain',
    };

    const chatSession = model.startChat({
        generationConfig,
        history: [
            {
                role: 'user',
                parts: [{ text: 'Consider yourself as Jeevani AI greet me by saying or writing Hello, I am Jeevani AI....dont say anytghing extra\n' }],
            },
            {
                role: 'model',
                parts: [{ text: 'Hello, I am Jeevani AI.\n' }],
            },
            {
                role: 'user',
                parts: [{ text: 'My income is below 5LPA suggest me some Indian govt medical schemes in just one line' }],
            },
            {
                role: 'model',
                parts: [{ text: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (AB-PMJAY) provides ₹5 lakh health cover per family per year.\n' }],
            },
        ],
    });

    // Automatically greet the user when the component mounts
    useEffect(() => {
        const greetUser = async () => {
            setIsLoading(true); // Show "Thinking..." indicator

            try {
                // Simulate a greeting message from the AI
                const greetingMessage = { role: 'model', text: 'Hello, I am Jeevani AI.' };
                setMessages((prev) => [...prev, greetingMessage]);
            } catch (error) {
                console.error('Error greeting user:', error);
            } finally {
                setIsLoading(false); // Hide "Thinking..." indicator
            }
        };

        greetUser();
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    const handleSend = async () => {
        if (!input.trim()) return;

        // Add user message to the chat
        setMessages((prev) => [...prev, { role: 'user', text: input }]);
        setInput('');
        setIsLoading(true); // Show "Thinking..." indicator

        try {
            // Send message to the AI
            const result = await chatSession.sendMessage(input);
            const response = result.response.text();

            // Add AI response to the chat
            setMessages((prev) => [...prev, { role: 'model', text: response }]);
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages((prev) => [...prev, { role: 'model', text: 'Sorry, something went wrong. Please try again.' }]);
        } finally {
            setIsLoading(false); // Hide "Thinking..." indicator
        }
    };

  
    return (
        <View style={styles.container}>
            {/* Chat Header */}
            <View style={styles.header}>
                <Icon name="robot-happy" size={24} color="#fff" />
                <Text style={styles.headerText}>Jeevani AI Assistant</Text>
            </View>

            {/* Chat History */}
            <ScrollView
                style={styles.chatContainer}
                contentContainerStyle={styles.chatContent}
                ref={(ref) => {
                    if (ref) {
                        setTimeout(() => ref.scrollToEnd({ animated: true }), 100);
                    }
                }}
            >
                {messages.map((msg, index) => (
                    <View
                        key={index}
                        style={[
                            styles.messageBubble,
                            msg.role === 'user' ? styles.userBubble : styles.modelBubble,
                        ]}
                    >
                        {msg.role === 'model' && (
                            <Icon name="robot" size={20} color="#4CAF50" style={styles.bubbleIcon} />
                        )}
                        <Text style={[
                            styles.messageText,
                            msg.role === 'user' && styles.userMessageText
                        ]}>{msg.text}</Text>
                        {msg.role === 'user' && (
                            <Icon name="account" size={20} color="#fff" style={styles.bubbleIcon} />
                        )}
                    </View>
                ))}

                {/* "Thinking..." Indicator */}
                {isLoading && (
                    <View style={[styles.messageBubble, styles.modelBubble]}>
                        <ActivityIndicator size="small" color="#4CAF50" />
                        <Text style={styles.thinkingText}>Analyzing your query...</Text>
                    </View>
                )}
            </ScrollView>

            {/* Input Area */}
            <View style={styles.inputContainer}>
                <Icon name="message-text" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Type your message..."
                    placeholderTextColor="#999"
                    value={input}
                    onChangeText={setInput}
                    onSubmitEditing={handleSend}
                />
                <TouchableOpacity 
                    style={styles.sendButton} 
                    onPress={handleSend} 
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Icon name="send" size={24} color="#fff" />
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FDF7',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#00796B',
        padding: 16,
        elevation: 3,
    },
    headerText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '600',
        marginLeft: 10,
    },
    chatContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    chatContent: {
        paddingVertical: 16,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: 14,
        borderRadius: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
    },
    userBubble: {
        alignSelf: 'flex-end',
        backgroundColor: '#00796B',
        borderBottomRightRadius: 4,
    },
    modelBubble: {
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderBottomLeftRadius: 4,
        elevation: 0,
    },
    bubbleIcon: {
        marginTop: 2,
    },
    messageText: {
        fontSize: 16,
        color: '#333',
        flex: 1,
    },
    userMessageText: {
        color: '#fff',
    },
    thinkingText: {
        color: '#666',
        fontSize: 14,
        marginLeft: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    inputIcon: {
        marginLeft: 8,
    },
    input: {
        flex: 1,
        height: 48,
        paddingHorizontal: 16,
        backgroundColor: '#F5F5F5',
        borderRadius: 24,
        marginHorizontal: 8,
        fontSize: 16,
        color: '#333',
    },
    sendButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#00796B',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 0,
    },
});

export default HospitalChatScreen;