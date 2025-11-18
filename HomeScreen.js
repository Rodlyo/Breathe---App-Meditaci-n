import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { styles } from './Styles.js';

const logoImage = require('./assets/breathe.png');

export default function HomeScreen({ onStart }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={logoImage} style={styles.logo} />
            </View>

            <Text style={styles.subtitleText}>
                Meditación y mindfulness
            </Text>

            <TouchableOpacity
                style={[styles.buttonBase, styles.buttonPrimary]}
                onPress={onStart}
            >
                <Text style={styles.buttonText}>Comenzar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
