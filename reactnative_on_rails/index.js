import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, } from 'react-native';
import React, { useEffect, useState } from 'react'
import { Fontisto, AntDesign } from '@expo/vector-icons';
import axios from 'axios';

function Index() {
  const [notes, setNotes] = useState({})
  // const [notes, setNotes] = useState([])
  const [text, setText] = useState("")
  const [mode, setMode] = useState("post")
  const [itemNumber, setItemNumber] = useState(null)


  useEffect( ()=> {
      axios.get("http://localhost:3000/notes")
      // 안드로이드가 http는 막아놔서 웹에서는 정상 출력되는데 앱에서는 출력이 안될거임. https로 바꿔서 넣으면 출력 됨.
      // axios.get("https://jsonplaceholder.typicode.com/posts/1")
      .then(res => {
        // setNotes(JSON.stringify((res.data.data[0].attributes.text)))
        setNotes((res.data.data))
      })
      .catch(res => {
        console.log(JSON.stringify(res))
      })
    }, [notes.length]
  )

  //axios말고 fetch함수로 api 받아보기
  // fetch("https://jsonplaceholder.typicode.com/posts/1")
  //   .then((response) => response.json())
  //   .then((apple) => console.log(apple.title))
  //   .catch((response)=> console.log(response))

  //notes를 배열로 설정한 경우(Map으로 이터레이팅해야함)
  // const grid = notes.map(item => {
  //   console.log(item)
  //   return(
  //     <View style={styles.output}>
  //       <Text> {item.attributes.text}</Text>
  //       {/* <Text> {JSON.stringify(item)}</Text> */}
  //     </View>
  //   )
  // })

  let content = () => {
    if (mode === 'post'){
      return (
        <View style={styles.input}>
          <TextInput 
            style={styles.textInput}
            value = {text}
            // placeholder= "type here"
            onChangeText = {setText}
            onSubmitEditing = {addNote}
          />
        </View>
      )
    }else if (mode === 'update'){
      return (
        <View style={styles.input}>
          <TextInput 
            style={styles.textInput}
            value = {text}
            // placeholder= "type here"
            onChangeText = {setText}
            onSubmitEditing = {changeNote}
          />
        </View>
      )
    }
  };
  
  const addNote = () => {
    axios.post('http://localhost:3000/notes',{text: text})
    .then(res => {
      // console.log(res.data.data.attributes.text)
      setNotes(notes.push({attributes: {text: text}}))
      setText("")
    })
    .catch(res=> {console.log(res)})
  }

  const changeNote =() =>{
    // console.log(text)
    axios.put(`http://localhost:3000/notes/${notes[itemNumber].id}`, {text: text})
    const newNotes = {...notes}
    setNotes(newNotes)
    setText("")
    setMode("post")
  }  

  const updateNote = (item) =>{
    // console.log(notes[item].attributes.text)
    setText(notes[item].attributes.text)
    setMode('update')
    setItemNumber(item)
  }

  const deleteNote = (item) =>{
    const ok = confirm("Do you want to delete?")
    if (ok) {
      axios.delete(`http://localhost:3000/notes/${notes[item].id}`)
      const newNotes = {...notes}
      setNotes(newNotes)
      setText("")
    }
  }
  
  //notes를 객체로 설정한 경우(object.keys로 객체의 key값을 알아내서 Map으로 이터레이팅해야함
  const grid = Object.keys(notes).map(item => {
    return(
      <View style={styles.output}>
        <Text> {notes[item].attributes.text}</Text>
        <TouchableOpacity style={styles.editButton} onPress={()=>updateNote(item)}>
          <AntDesign name="edit" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style = {styles.trashButton} onPress={()=>deleteNote(item)}>
          <Fontisto name="trash" size={20} color="white" />
        </TouchableOpacity>
      </View>
    )
  })
 
  return (
    <View style={styles.container}>
      <StatusBar style="auto"/>  
      <View style={styles.header}>
        <TouchableOpacity>
          <Text>work</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>travel</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        {content()}
        <ScrollView>
          {grid}
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 50,
    backgroundColor: 'green',
    justifyContent: 'space-around',
  },
  body: {
    backgroundColor: 'tomato',

  },
  input: {
    backgroundColor: 'pink',
    alignItems: 'center',
  },
  textInput:{
    backgroundColor: 'red',
  },
  output: {
    flexDirection: 'row',
    backgroundColor: 'blue',
    height: 25,
  },
  trashButton:{
    position: 'absolute',
    right: 0
  },
  editButton: {
    position: 'absolute',
    right: 25
  },
});
export default Index