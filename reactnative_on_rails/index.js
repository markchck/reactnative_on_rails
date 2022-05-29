import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react'
import axios from 'axios';


function Index() {
  const [notes, setNotes] = useState([])
  useEffect( ()=> {
        axios.get("http://localhost:3000/notes/")
        // 안드로이드가 http는 막아놔서 웹에서는 정상 출력되는데 앱에서는 출력이 안될거임. https로 바꿔서 넣으면 출력 됨.
        // axios.get("https://jsonplaceholder.typicode.com/posts/1")
        .then(res => {
          // alert(JSON.stringify(res))
          setNotes(JSON.stringify(res.data))
        })
        .catch(res => {
          alert(JSON.stringify(res.data))
        })
      }, [notes.length]
  )

  //axios말고 fetch함수로 api 받아보기
  // fetch("https://jsonplaceholder.typicode.com/posts/1")
  //   .then((response) => response.json())
  //   .then((apple) => console.log(apple.title))
  //   .catch((response)=> console.log(response))

  return (
      <View style={styles.container}>
        <Text>{notes}</Text>
        <StatusBar style="auto"/>  
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default Index