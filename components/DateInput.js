import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, SectionList, SafeAreaView, StatusBar, Dimensions, TextInput } from 'react-native';

const styles = StyleSheet.create({
    transfer: {
        width: "100%",
        height: "100%"
    },
    dataContainer: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateInput: {
        // width: "25%",
        fontSize: "25%",
        textAlign: "center",
    },

    dateSlashes: {
        fontSize: "25%",
        textAlign: "center",
    }
})

export default function(props)
{
    const [year, setYear ] = useState("2022")
    const [day, setDay ] = useState()
    const [month, setMonth ] = useState()

    function dataUpdate()
    {
        props.setDate({day: day, year: year, month: month})
    }

    function dayCheck(value) {
        setDay(parseInt(value) ? (Math.min(parseInt(value), 31)).toString() : "")
        dataUpdate()
    }

    function monthCheck(value) {
        setMonth(parseInt(value) ? (Math.min(parseInt(value), 12)).toString() : "")
        dataUpdate()
    }

    function yearCheck(value) {
        setYear(parseInt(value) ? (Math.max(parseInt(value), 0)).toString() : "")
        dataUpdate()
    }

    return <View style={styles.dataContainer}>
        <TextInput
            style={styles.dateInput}
            value={month}
            onChangeText={monthCheck}
            placeholder="Month"
            keyboardType="numeric"
        />
        <Text style={styles.dateSlashes} > / </Text>
        <TextInput
            style={styles.dateInput}
            value={day}
            onChangeText={dayCheck}
            placeholder="Day"
            keyboardType="numeric"
        />
        <Text style={styles.dateSlashes} > / </Text>
        <TextInput
            style={styles.dateInput}
            value={year}
            onChangeText={yearCheck}
            placeholder="Year"
            keyboardType="numeric"
        />
    </View>
}