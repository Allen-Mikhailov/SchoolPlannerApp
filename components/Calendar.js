import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, SectionList, SafeAreaView, StatusBar, Dimensions, TextInput } from 'react-native';
import DateInput from './DateInput';
import CheckBox from './Checkbox';

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
    width: "100%",
    flexDirection: "row"
  },
  headerContainer: {
    marginVertical: 3,
    width: "100%",
    color: "#2a5996",
    width: "100%",
  },

  header: {
    width: "100%",
    fontSize: "35%",
    color: "#000",
    backgroundColor: "#fff",
    fontWeight: 'bold'
  },
  title: {
    fontSize: "30%",
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
  },
  AddTaskBackground: {
    backgroundColor: "#0f0",
    width: "100%",
    height: "100%",
  }
})

const Item = ({title}) => {
  const [ checked, setChecked ] = useState()

  return <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <CheckBox checked={checked} setChecked={setChecked}/>
  </View>
};

const Header = ({ title }) => (
  <View style={styles.headerContainer}>
    <View style={styles.line} />
    <Text style={styles.header}>{title}</Text>
    <View style={styles.line} />
  </View>
)

function defaultText(text, def)
{
  return text != ""? text : def
}

function AddItemMenu(props) {
  const [date, setDate] = useState({ day: 1, month: 0, year: 1 })
  const [open, setOpen] = useState(true)
  const [task, setTask] = useState("")

  function AddTask() {
    console.log(date.year)
    const objDate = new Date(defaultText(date.year, 2022), defaultText(date.month-1, 0), defaultText(date.day, 1))
    const dateString = (objDate.getMonth()+1) + "/" + objDate.getDate() + "/" + objDate.getFullYear()
    const data = JSON.parse(JSON.stringify(props.data));



    if (data[dateString])
      data[dateString].data.push(task)
    else
      data[dateString] = {
        title: dateString,
        data: [task]
      }


    props.setData(data)
    props.setMenuOpen(false)
  }

  return <View style={styles.addItemContainer}>

    <Text style={styles.text}>Task Name:</Text>
    <TextInput
      value={task}
      onChangeText={setTask}
      placeholder={"Task?"}
      style={styles.text}
    />

    <DateInput setDate={setDate} />
    <Button title='Add' style={styles.AddTaskButton} onPress={AddTask}>
      <View style={styles.AddTaskBackground}>
        <Text>Test</Text>
      </View>
    </Button>
  </View>
}

export default function Calendar() {
  const [rawdata, setRawData] = useState({})
  const [listData, setlistData] = useState([])
  const [menuOpen, setMenuOpen] = useState("None")
  const [readData, setReadData] = useState(false)


  const [debug, setDebug] = useState("")

  useEffect(() => {
    const newData = []
    for (const date in rawdata) {
      newData.push({ title: date, data: rawdata[date].data })
    }

    newData.sort((a, b) => {
      const aT = a.title.split("/")
      const bT = b.title.split("/")
      aT.map((value, index) => aT[index] = parseInt(value))
      bT.map((value, index) => bT[index] = parseInt(value))

      return (aT[0] + aT[1]*31 + aT[2]*366) - (bT[0] + bT[1]*31 + bT[2]*366)
    })
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
      storeData(remindersKey, JSON.stringify(rawdata)).then(() => { })
  }, [rawdata])

  const addToData = () => {
    setMenuOpen(menuOpen == "AddItem" ? "None" : "AddItem")
  }

  return (
    <SafeAreaView style={styles.transfer}>
      <View style={styles.container}>
        <SectionList style={{ width: "100%" }}
          sections={listData}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <Item title={item} />}
          renderSectionHeader={({ section: { title } }) => <Header title={title} />}
        />
      </View>
      {menuOpen == "AddItem" && <AddItemMenu setData={setRawData} data={rawdata} setMenuOpen={setMenuOpen} />}
      <Button title={"Add Item"} onPress={addToData} />
      <Button title={"wipe"} onPress={() => setRawData({})} />
      <Text>{debug}</Text>
    </SafeAreaView>
  );
}