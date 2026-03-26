import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedDomainId } from "../../ontologySlice";
import { toggleVerificationMode } from "../dashboardSlice";
import "./domainSelector.css";

const DomainSelector = () => {
    const dispatch = useDispatch();
    const { domains, selectedDomainId } = useSelector((state) => state.ontology);
    const verificationMode = useSelector((state) => state.dashboard.verificationMode);

    const selectedDomain = domains.find((d) => d.id === selectedDomainId);

    const handleDomainChange = (e) => {
        dispatch(setSelectedDomainId(e.target.value));
    };

    const handleToggleVerification = () => {
        dispatch(toggleVerificationMode());
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

            {/* Fact Verification Toggle */}
            <div className="vr-toggle-container">
                <label className="vr-toggle-label" htmlFor="verification-toggle">
                    <span className="vr-toggle-icon">{verificationMode ? "🛡️" : "🔓"}</span>
                    Fact Check
                </label>
                <button
                    id="verification-toggle"
                    className={`vr-toggle-btn ${verificationMode ? "vr-toggle-on" : ""}`}
                    onClick={handleToggleVerification}
                    role="switch"
                    aria-checked={verificationMode}
                >
                    <span className="vr-toggle-knob" />
                </button>
            </div>
        </div>
    );
};

export default DomainSelector;
