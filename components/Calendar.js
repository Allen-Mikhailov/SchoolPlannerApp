import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, StyleSheet, Text, View, SectionList, SafeAreaView, StatusBar, Dimensions, TextInput } from 'react-native';

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
      },

    transfer: {
      width: "100%",
      height: "100%"
    },

    addItemContainer: {
      flex: 1,
      backgroundColor: "#eee",
      width: "75%",
      height: "75%",
      position: "absolute",
      top: "12.5%",
      left: "12.5%",
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dataInput: {
      fontSize: "25%",
      textAlign: "center",
    },

    dateSlashes: {
      fontSize: "25%",
      textAlign: "center",
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

function AddItemMenu(props)
{
  const [year, setYear ] = useState("2022")
  const [day, setDay ] = useState()
  const [month, setMonth ] = useState()
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(true)

  function dayCheck(value)
  {
    setDay(parseInt(value)? (Math.min(parseInt(value), 31)).toString(): "")
    // setDay(toString(15))
    // setDay("15")
  }

  function monthCheck(value)
  {
    setMonth(parseInt(value)? (Math.min(parseInt(value), 12)).toString(): "")
  }

  return <View style={styles.addItemContainer}>
    <TextInput
    style={styles.dataInput}
      value={month}
      onChangeText={monthCheck}
      placeholder="Month"
      keyboardType="numeric"
    />
    <Text style={styles.dataInput} >/</Text>
    <TextInput
    style={styles.dataInput}
    value={day}
    onChangeText={dayCheck}
    placeholder="Day"
    keyboardType="numeric"
  />
  </View>
}

export default function Calendar()
{
    const [ data, setData ] = useState([])
    const [ menuOpen, setMenuOpen ] = useState("None")

    useEffect(() => {
        const rawData = [
            {
                title: "Test",
                data: ["Hello", "!"]
            },
        ]//getJsonData(remindersKey) || []
        setData(rawData)
    }, [])

    const addToData = () => {
      setMenuOpen(menuOpen == "AddItem"? "None":"AddItem")
    }

    return (
        <SafeAreaView style={styles.transfer}>
          <View style={styles.container}>
            <SectionList style={{width: "100%"}}
                  sections={data}
                  keyExtractor={(item, index) => item + index}
                  renderItem={({ item }) => <Item title={item} />}
                  renderSectionHeader={({ section: { title } }) => <Header title={title} />}
              />
          </View>
          {menuOpen == "AddItem" && <AddItemMenu/>}
          <Button title={"Add Item"} onPress={addToData}/>
        </SafeAreaView>
    );
}