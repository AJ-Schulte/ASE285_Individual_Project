import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./Dashboard/dashboardSlice";
import ontologyReducer from "./ontologySlice";

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    ontology: ontologyReducer,
  },
});
