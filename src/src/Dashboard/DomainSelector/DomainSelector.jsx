import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedDomainId } from "../../ontologySlice";
import "./domainSelector.css";

const DomainSelector = () => {
    const dispatch = useDispatch();
    const { domains, selectedDomainId } = useSelector((state) => state.ontology);

    const selectedDomain = domains.find((d) => d.id === selectedDomainId);

    const handleDomainChange = (e) => {
        dispatch(setSelectedDomainId(e.target.value));
    };

    return (
        <div className="domain_selector_container">
            <span className="domain_selector_label">Knowledge Domain:</span>
            <select
                className="domain_selector_dropdown"
                value={selectedDomainId}
                onChange={handleDomainChange}
            >
                {domains.map((domain) => (
                    <option key={domain.id} value={domain.id}>
                        {domain.name}
                    </option>
                ))}
            </select>
            <span className="domain_description">
                {selectedDomain?.description}
            </span>
        </div>
    );
};

export default DomainSelector;
