import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, } from 'react-native';
import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Index() {
  const [notes, setNotes] = useState([])
  useEffect( ()=> {
      axios.get("http://localhost:3000/notes")
      // 안드로이드가 http는 막아놔서 웹에서는 정상 출력되는데 앱에서는 출력이 안될거임. https로 바꿔서 넣으면 출력 됨.
      // axios.get("https://jsonplaceholder.typicode.com/posts/1")
      .then(res => {
        // setNotes(JSON.stringify((res.data.data[0].attributes.text)))
        // console.log(res.data.data)
        setNotes((res.data.data))
        console.log("hi")
      })
      .catch(res => {
        console.log("what?")
        setNotes(res)
        // console.log(JSON.stringify(res))
        alert(res)
      })
    }, [notes.length]
  )

  //axios말고 fetch함수로 api 받아보기
  // fetch("https://jsonplaceholder.typicode.com/posts/1")
  //   .then((response) => response.json())
  //   .then((apple) => console.log(apple.title))
  //   .catch((response)=> console.log(response))

  const grid = notes.map(item => {
    return(
      <View style={styles.output}>
        <Text> {item.id}</Text>
        <Text> {JSON.stringify(item)}</Text>
      </View>
    )
  })

  // const grid = ()=>{
  //   return(
  //     <Text>
  //       {notes}
  //     </Text>
  //   )
  // }

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
          <View style={styles.input}>
            <TextInput 
              placeholder='hi'
              style={styles.textInput}
            />
          </View>
          <ScrollView>
            {grid}
            {/* {notes} */}
          </ScrollView>
        </View>
      </View>
  );
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
    backgroundColor: 'black'
  },
  output: {
    backgroundColor: 'blue'
  }
});
export default Index