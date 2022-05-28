import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react'
import axios from 'axios';


function Index() {
  const [notes, setNotes] = useState([])
  useEffect( ()=> {
        axios.get("http://localhost:3000/notes/")
        // http는 reactnative에서 안받아지나봄.. 아래 https는 받아지는데 http는 계속 axioserror: network error 뜸. 이건 아예 axios가 서버에 접근도 못했다는 에러임.
        // axios.get("https://jsonplaceholder.typicode.com/posts/1")
        // .then(res => setNotes(JSON.stringify(res)))
        .then(res => {
          // alert(JSON.stringify(res))
          setNotes(JSON.stringify(res.data))
        })
        .catch(res => {
          alert(JSON.stringify(res))
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