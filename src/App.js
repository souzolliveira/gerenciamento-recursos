import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch();
  }, []);

  return (
    <Router basename="/app">
      <div>Teste</div>
    </Router>
  );
}

export default App;
