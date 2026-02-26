import { createSlice } from "@reduxjs/toolkit";
import { getDomains } from "./services/ontologyService";

const initialState = {
    domains: getDomains(),
    selectedDomainId: "general",
};

const ontologySlice = createSlice({
    name: "ontology",
    initialState,
    reducers: {
        setSelectedDomainId: (state, action) => {
            state.selectedDomainId = action.payload;
        },
        loadDomains: (state) => {
            state.domains = getDomains();
        },
    },
});

export const { setSelectedDomainId, loadDomains } = ontologySlice.actions;
export default ontologySlice.reducer;
