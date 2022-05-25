import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function App() {
  const [notes, setNotes] = useState([])
  useEffect( ()=> {
        // axios.get("http://localhost:3000")
        // http는 reactnative에서 안받아지나봄.. 아래 https는 받아지는데 http는 계속 axioserror: network error 뜸. 이건 아예 axios가 서버에 접근도 못했다는 에러임.
        axios.get("https://jsonplaceholder.typicode.com/posts/1")
        .then(res => setNotes(JSON.stringify(res.data.title)))
        .catch(res => console.log(res))
      }, [notes.length]
  )

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
