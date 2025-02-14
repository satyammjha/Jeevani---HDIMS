import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');
const slides = [
    {
        title: "Patient Care",
        subtitle: "24/7 Emergency Services Available",
        colors: ['#00796B', '#004D40']
    },
    {
        title: "Health Checkups",
        subtitle: "Regular Health Monitoring",
        colors: ['#4CAF50', '#388E3C']
    },
    {
        title: "Expert Doctors",
        subtitle: "Experienced Medical Professionals",
        colors: ['#2196F3', '#1976D2']
    },
];

const CustomSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const translateX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % slides.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        Animated.spring(translateX, {
            toValue: -currentIndex * width,
            friction: 20,
            useNativeDriver: true,
        }).start();
    }, [currentIndex]);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.slider, { transform: [{ translateX }] }]}>
                {slides.map((slide, index) => (
                    <View key={index} style={styles.slide}>
                        <LinearGradient
                            colors={slide.colors}
                            style={styles.gradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            <Text style={styles.title}>{slide.title}</Text>
                            <Text style={styles.subtitle}>{slide.subtitle}</Text>
                        </LinearGradient>
                    </View>
                ))}
            </Animated.View>

            {/* Pagination Dots */}
            <View style={styles.pagination}>
                {slides.map((_, i) => (
                    <View
                        key={i}
                        style={[
                            styles.dot,
                            {
                                backgroundColor: currentIndex === i ? '#FFF' : '#888',
                                transform: [{ scale: currentIndex === i ? 1.2 : 1 }]
                            }
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

// Keep the same styles as previous example
const styles = StyleSheet.create({
    container: {
        height: height * 0.25,
        marginVertical: 20,
    },
    slider: {
        flexDirection: 'row',
        height: '100%',
    },
    slide: {
        width: width - 40,
        marginHorizontal: 5,
        borderRadius: 15,
        overflow: 'hidden',
        elevation: 0,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
        textShadowColor: 'rgba(0,0,0,0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
        backgroundColor: '#FFF',
    },
});

export default CustomSlider;