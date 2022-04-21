import React, { useRef } from 'react';
import './App.css';
import Filters from './components/Filters';
import Header from './components/Header';
import SortingForm from './components/SortingForm';
import Table from './components/Table';
import Welcome from './components/Welcome';
import AppProvider from './context/AppProvider';

function App() {
  const pageRefs = useRef({});

  return (
    <AppProvider>
      <Header pageRefs={ pageRefs } />
      <Welcome />
      <main>
        <Filters pageRefs={ pageRefs } />
        <SortingForm />
        <Table />
      </main>
    </AppProvider>
  );
}

export default App;
