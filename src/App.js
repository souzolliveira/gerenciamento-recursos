/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [fibonacci, setFibonacci] = useState("Carregando");
  const [factorial, setFactorial] = useState("Carregando");

  const api = axios.create({
    baseURL: process.env.API_URL || 'http://34.31.127.201:8080',
  });

  useEffect(() => {
    const number = new URLSearchParams(document.location.search).get('number');
    api.get(`api/fibonacci?number=${number}`, {}).then((res) => {
      setFibonacci(res.data.message);
    }).catch((res) => {
      setFibonacci(res.data.message)
    });
    api.get(`api/factorial?number=${number}`, {}).then((res) => {
      setFactorial(res.data.message);
    }).catch((res) => {
      setFactorial(res.data.message)
    });
  }, []);

  return (
    <Router basename="/app">
      <div>
        <div>Factorial: {factorial}</div>
        <div>Fibonacci: {fibonacci}</div>
      </div>
    </Router>
  );
}

export default App;
