
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import SongList from './components/SongList';
import './App.css'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
          <Route path="/" exact element={<SongList />} />
    </Route>
  )
)

const App = () => {
  return (
    <RouterProvider router={router}/>
  );
};

export default App;
