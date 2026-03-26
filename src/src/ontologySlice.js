import { createSlice } from "@reduxjs/toolkit";
import { domains as builtInDomains } from "./services/ontologyData";

/**
 * Merge built-in domains with any user-defined domains from localStorage.
 */
const loadAllDomains = () => {
    const userDomains = JSON.parse(localStorage.getItem("userDomains") || "[]");
    return [...builtInDomains, ...userDomains];
};

const initialState = {
    domains: loadAllDomains(),
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
            state.domains = loadAllDomains();
        },
        addDomain: (state, action) => {
            state.domains.push(action.payload);
            // Persist user-defined domains
            const builtInIds = builtInDomains.map((d) => d.id);
            const userDomains = state.domains.filter(
                (d) => !builtInIds.includes(d.id)
            );
            localStorage.setItem("userDomains", JSON.stringify(userDomains));
        },
        updateDomain: (state, action) => {
            const { id, changes } = action.payload;
            const index = state.domains.findIndex((d) => d.id === id);
            if (index !== -1) {
                state.domains[index] = { ...state.domains[index], ...changes };
            }
            // Persist
            const builtInIds = builtInDomains.map((d) => d.id);
            const userDomains = state.domains.filter(
                (d) => !builtInIds.includes(d.id)
            );
            localStorage.setItem("userDomains", JSON.stringify(userDomains));
        },
        deleteDomain: (state, action) => {
            const domainId = action.payload;
            state.domains = state.domains.filter((d) => d.id !== domainId);
            if (state.selectedDomainId === domainId) {
                state.selectedDomainId = "general";
            }
            // Persist
            const builtInIds = builtInDomains.map((d) => d.id);
            const userDomains = state.domains.filter(
                (d) => !builtInIds.includes(d.id)
            );
            localStorage.setItem("userDomains", JSON.stringify(userDomains));
        },
    },
});

export const {
    setSelectedDomainId,
    loadDomains,
    addDomain,
    updateDomain,
    deleteDomain,
} = ontologySlice.actions;

export default ontologySlice.reducer;
