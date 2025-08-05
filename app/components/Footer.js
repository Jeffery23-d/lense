import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { Button, StyleSheet, Text, View } from 'react-native';

const Footer = () => {
  return (
         <View style={styles.bottomPanel}>
          <View style={styles.scanButtonWrapper}>
            <View style={styles.scanButton}>
            <MaterialIcons name="qr-code-scanner" size={30} color="white" />
            </View>
            <Text style={styles.zoomText}>1x</Text>
          </View>
        </View> 
  )
}

const styles = StyleSheet.create({
    bottomPanel: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#fff',
        paddingTop: 20,
        paddingBottom: 30,
        alignItems: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 8,
      },
    scanButtonWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      scanButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#0ACF83',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
      },
      scanIcon: {
        fontSize: 20,
        color: '#fff',
      },
      zoomText: {
        fontSize: 16,
        color: '#555',
      },
});


export default Footer