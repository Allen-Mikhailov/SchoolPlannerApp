import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, StyleSheet, Text, View, SectionList, SafeAreaView, StatusBar  } from 'react-native';

import { getJsonData, storeData } from '../modules/storage';

const remindersKey = "Reminders-0.0"

// const data = [
//     {
//         title: "Test",
//         data: ["Hello", "!"]
//     },
// ]

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "left",
        paddingTop: StatusBar.currentHeight,
        marginHorizontal: 16
      },
    line: {
        
    },
    item: {
        backgroundColor: "#fff",
        marginVertical: 3,
        color: "#2a5996"
      },
      header: {
        fontSize: 20,
        textAlign: "center",
        backgroundColor: "#fff",
      },
      title: {
        fontSize: 15,
        color: "#2a5996"
      }
})

const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

export default function Calendar()
{
    const [ data, setData ] = useState([])

    useEffect(() => {
        const rawData = [
            {
                title: "Test",
                data: ["Hello", "!"]
            },
        ]//getJsonData(remindersKey) || []
        setData(rawData)
    }, [])

    return (
        <SafeAreaView style={styles.container}>
             <SectionList
                sections={data}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Item title={item} />}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.header}>{title}</Text>
                )}
            />
        </SafeAreaView>
    );
}