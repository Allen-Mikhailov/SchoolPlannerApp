import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, StyleSheet, Text, View, SectionList, SafeAreaView, StatusBar, Dimensions, TextInput } from 'react-native';
import DateInput from './DateInput';

import { getJsonData, storeData } from '../modules/storage';

const remindersKey = "Reminders-0.0"

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

const fontSize = "25%"

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
      justifyContent: 'center',
      alignItems: 'center',
    },

    text: {
      fontSize: fontSize
    },

    AddTaskButton: {
      color: "red",
      backgroundColor: "#0f0",
      fontSize: 50
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
    <Text style={styles.header}>{title}</Text>
    <View style={styles.line}/>
  </View>
)

function AddItemMenu(props)
{
  const [date, setDate] = useState({day: 1, month: 1, year: 1})
  const [open, setOpen] = useState(true)
  const [ task, setTask ] = useState("")

  function AddTask()
  {
    const objDate = new Date(2022, 1, 1)//new Date(date.year, date.month, date.day)
    const dateString = objDate.toISOString()
    const data = JSON.parse(JSON.stringify(props.data));
    if (data[dateString])
      data[dateString].data.push("PleaesWork")
    else
      data[dateString] = {
        title: dateString,
        data: ["PleaesWork"]
      }
    
      // data["Test"] = [5]
    props.setData(data)

    // props.setData()
  }

  return <View style={styles.addItemContainer}>
    
    <Text style={styles.text}>Task Name:</Text>
    <TextInput
      value={task}
      onChangeText={setTask}
      placeholder={"Task?"}
      style={styles.text}
    />

    <DateInput setDate={setDate}/>
    <Button title='Add' style={styles.AddTaskButton} onPress={AddTask}><View></View></Button>
  </View>
}

export default function Calendar()
{
    const [ rawdata, setRawData ] = useState({})
    const [ listData, setlistData ] = useState([])
    const [ menuOpen, setMenuOpen ] = useState("None")
    const [ readData, setReadData ] = useState(false)


    const [ debug, setDebug ]= useState("")

    useEffect(() => {
      const newData = []
      for (const date in rawdata) {
        newData.push({title: date, data: rawdata[date].data})
      }
      console.log("ListData:", newData)
      setlistData(newData)
    }, [rawdata])

    useEffect(() => {
      getJsonData(remindersKey).then((d) => {
        console.log("CurrentData:", d)
        setRawData(d || {})
        setReadData(true)
      })
    }, [])

    useEffect(() => {
      console.log("Stored", rawdata)
      if (readData)
        storeData(remindersKey, JSON.stringify(rawdata)).then(() => {})
    }, [rawdata])

    const addToData = () => {
      setMenuOpen(menuOpen == "AddItem"? "None":"AddItem")
    }

    return (
        <SafeAreaView style={styles.transfer}>
          <View style={styles.container}>
            <SectionList style={{width: "100%"}}
                  sections={listData}
                  keyExtractor={(item, index) => item + index}
                  renderItem={({ item }) => <Item title={item} />}
                  renderSectionHeader={({ section: { title } }) => <Header title={title} />}
              />
          </View>
          {menuOpen == "AddItem" && <AddItemMenu setData={setRawData} data={rawdata}/>}
          <Button title={"Add Item"} onPress={addToData}/>
          <Text>{debug}</Text>
        </SafeAreaView>
    );
}