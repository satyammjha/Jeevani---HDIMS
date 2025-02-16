import React, { useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { ViewStyle } from 'react-native';

function SimpleCarousel({ data }) {
    const screenWidth = useRef(Dimensions.get('window').width).current;

    const renderItem = ({ item }) => (
        <View style={styles.slide}>
            <Image source={{ uri: item?.image }} style={styles.image} />
            <Text style={styles.title}>{item?.title}</Text>
            <Text style={styles.description}>{item?.description}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {data?.length > 0 ? (
                <Carousel
                    data={data}
                    renderItem={renderItem}
                    sliderWidth={screenWidth}
                    itemWidth={screenWidth - 80}
                    layout="default"
                    loop={true}
                    autoplay={true}
                    autoplayInterval={3000}
                />
            ) : (
                <Text>No data available</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    slide: {
        width: '100%',
        height: 200,
        backgroundColor: '#fff',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 120,
        borderRadius: 8,
        marginBottom: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginTop: 8,
    },
});

export default SimpleCarousel;