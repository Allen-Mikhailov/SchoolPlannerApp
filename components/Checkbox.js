import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, Pressable, Image } from 'react-native';

const styles = StyleSheet.create({
    markBackground: {
        width: 40,
        height: 40,
        backgroundColor: "#f00",
        marginHorizontal: "10%",
        borderRadius: "15%"
        // flex: 1
    },
    checkboxContainer: {
        width: "100%",
        flexDirection: "row-reverse",
        justifyContent: 'right',
        flex: 1
    },
    checkmark: {
        top: "15%",
        left: "15%",
        width: "70%",
        height: "70%",
    }
})

export default function CheckBox(props)
{


    return<Pressable style={styles.checkboxContainer} onPress={() => props.setChecked(!props.checked)}>
        <View style={styles.markBackground}>
        {/* <Image source={require("../images/checkmark.png")} style={styles.checkmark}></Image> */}
            {props.checked? <Image source={require("../images/checkmark.png")} style={styles.checkmark}></Image>: null}
            <View style={styles.checkmark}></View>
        </View>
    </Pressable>
}