import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, StyleSheet, Text, View, SectionList, SafeAreaView, StatusBar, Dimensions   } from 'react-native';

import { getJsonData, storeData } from '../modules/storage';

const remindersKey = "Reminders-0.0"

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

// const data = [
//     {
//         title: "Test",
//         data: ["Hello", "!"]
//     },
// ]

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: "left",
        marginVertical: 16,
      },
    line: {
        paddingTop: 1,
        width: "100%",
        backgroundColor: "#aaa",
    },
    item: {
        marginVertical: 3,
        width: "100%",
        color: "#2a5996",
        width: "100%"
      },
      header: {
        width: "100%",
        fontSize: 20,
        color: "#000",
        backgroundColor: "#fff",
        fontWeight: 'bold'
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

const Header = ({ title }) => (
  <View style={styles.item}>
    <View style={styles.line}/>
    <Text style={styles.header}>Test</Text>
    <View style={styles.line}/>
  </View>
)

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
             <SectionList style={{width: "100%"}}
                sections={data}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Item title={item} />}
                renderSectionHeader={({ section: { title } }) => <Header title={title} />}
            />
        </SafeAreaView>
    );
}