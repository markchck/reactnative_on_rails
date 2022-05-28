import React, { useEffect, useState } from 'react'
import Index from './index'
import { NativeRouter, Route, Link } from "react-router-native";


export default function App() {
  return (
    <NativeRouter>
      <Route exact path="/" component={Index}/>
      {/* <Index></Index> */}
    </NativeRouter>
  );
}

