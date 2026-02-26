import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Dashboard from "./Dashboard/Dashboard";
import { initializeOpenAI } from "./services/openaiService";
import { loadConversations } from "./Dashboard/dashboardSlice";
import { loadDomains } from "./ontologySlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize OpenAI client
    initializeOpenAI();

    // Load conversations from localStorage
    dispatch(loadConversations());

    // Load ontology domains
    dispatch(loadDomains());
  }, [dispatch]);

  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
