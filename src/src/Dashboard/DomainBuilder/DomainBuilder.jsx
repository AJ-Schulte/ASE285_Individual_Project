import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addDomain,
  updateDomain,
  deleteDomain,
} from "../../ontologySlice";
import { BsDownload } from "react-icons/bs";
import "./domainBuilder.css";

const EMPTY_DOMAIN = {
  name: "",
  description: "",
  systemPromptExtra: "",
  concepts: [],
  relationships: [],
};

const DomainBuilder = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { domains } = useSelector((state) => state.ontology);

  const [mode, setMode] = useState("list"); // "list" | "create" | "edit" | "view"
  const [editingDomain, setEditingDomain] = useState(null);
  const [form, setForm] = useState({ ...EMPTY_DOMAIN });

  // Concept form fields
  const [conceptName, setConceptName] = useState("");
  const [conceptDesc, setConceptDesc] = useState("");

  // Relationship form fields
  const [relSubject, setRelSubject] = useState("");
  const [relPredicate, setRelPredicate] = useState("");
  const [relObject, setRelObject] = useState("");

  const builtInIds = ["general", "software-engineering", "medical"];

  if (!isOpen) return null;

  const resetForm = () => {
    setForm({ ...EMPTY_DOMAIN });
    setConceptName("");
    setConceptDesc("");
    setRelSubject("");
    setRelPredicate("");
    setRelObject("");
    setEditingDomain(null);
  };

  const handleCreate = () => {
    setMode("create");
    resetForm();
  };

  const handleEdit = (domain) => {
    setMode("edit");
    setEditingDomain(domain.id);
    setForm({
      name: domain.name,
      description: domain.description,
      systemPromptExtra: domain.systemPromptExtra || "",
      concepts: [...domain.concepts],
      relationships: [...domain.relationships],
    });
  };

  const handleView = (domain) => {
    setMode("view");
    setForm({
      name: domain.name,
      description: domain.description,
      systemPromptExtra: domain.systemPromptExtra || "",
      concepts: [...domain.concepts],
      relationships: [...domain.relationships],
    });
  };

  const handleDelete = (domainId) => {
    dispatch(deleteDomain(domainId));
  };

  const handleExport = async (domain) => {
    const content = JSON.stringify(domain, null, 2);
    const fileName = `${domain.name.toLowerCase().replace(/\s+/g, "_")}_ontology.json`;
    
    try {
      const result = await window.electron.saveFile(content, fileName);
      if (result.success) {
        console.log("File saved successfully:", result.filePath);
      }
    } catch (err) {
      alert("Failed to export domain: " + err.message);
    }
  };

  const handleSave = () => {
    if (!form.name.trim()) return;

    if (mode === "create") {
      const id = form.name.toLowerCase().replace(/\s+/g, "-");
      dispatch(
        addDomain({
          id,
          name: form.name.trim(),
          description: form.description.trim(),
          systemPromptExtra: form.systemPromptExtra.trim(),
          concepts: form.concepts,
          relationships: form.relationships,
        })
      );
    } else if (mode === "edit") {
      dispatch(
        updateDomain({
          id: editingDomain,
          changes: {
            name: form.name.trim(),
            description: form.description.trim(),
            systemPromptExtra: form.systemPromptExtra.trim(),
            concepts: form.concepts,
            relationships: form.relationships,
          },
        })
      );
    }
    setMode("list");
    resetForm();
  };

  const handleAddConcept = () => {
    if (!conceptName.trim()) return;
    setForm({
      ...form,
      concepts: [
        ...form.concepts,
        { name: conceptName.trim(), description: conceptDesc.trim() },
      ],
    });
    setConceptName("");
    setConceptDesc("");
  };

  const handleRemoveConcept = (index) => {
    const updated = form.concepts.filter((_, i) => i !== index);
    setForm({ ...form, concepts: updated });
  };

  const handleAddRelationship = () => {
    if (!relSubject.trim() || !relPredicate.trim() || !relObject.trim()) return;
    setForm({
      ...form,
      relationships: [
        ...form.relationships,
        {
          subject: relSubject.trim(),
          predicate: relPredicate.trim(),
          object: relObject.trim(),
        },
      ],
    });
    setRelSubject("");
    setRelPredicate("");
    setRelObject("");
  };

  const handleRemoveRelationship = (index) => {
    const updated = form.relationships.filter((_, i) => i !== index);
    setForm({ ...form, relationships: updated });
  };

  const handleBack = () => {
    setMode("list");
    resetForm();
  };

  return (
    <div className="db-backdrop" onClick={onClose}>
      <div className="db-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="db-header">
          <div className="db-header-left">
            {mode !== "list" && (
              <button className="db-back-btn" onClick={handleBack}>
                ←
              </button>
            )}
            <h2 className="db-title">
              {mode === "list"
                ? "Domain Builder"
                : mode === "create"
                ? "New Domain"
                : mode === "view"
                ? "View Domain"
                : "Edit Domain"}
            </h2>
          </div>
          <button className="db-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* List View */}
        {mode === "list" && (
          <div className="db-body">
            <p className="db-subtitle">
              Manage knowledge domains for your AI assistant.
            </p>
            <div className="db-domain-list">
              {domains.map((d) => (
                <div key={d.id} className="db-domain-card">
                  <div className="db-domain-info">
                    <span className="db-domain-name">{d.name}</span>
                    <span className="db-domain-desc">{d.description}</span>
                    <span className="db-domain-meta">
                      {d.concepts.length} concepts • {d.relationships.length}{" "}
                      relationships
                    </span>
                  </div>
                  <div className="db-domain-actions">
                    {builtInIds.includes(d.id) ? (
                      <>
                        <span className="db-builtin-badge">Built-in</span>
                        <button
                          className="db-action-btn db-view-btn"
                          onClick={() => handleView(d)}
                        >
                          View
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="db-action-btn db-edit-btn"
                          onClick={() => handleEdit(d)}
                        >
                          Edit
                        </button>
                        <button
                          className="db-action-btn db-delete-btn"
                          onClick={() => handleDelete(d.id)}
                        >
                          Delete
                        </button>
                        <button
                          className="db-action-btn db-export-btn"
                          onClick={() => handleExport(d)}
                          title="Export to JSON"
                        >
                          <BsDownload />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button className="db-create-btn" onClick={handleCreate}>
              + Create New Domain
            </button>
          </div>
        )}

        {/* Create / Edit / View View */}
        {(mode === "create" || mode === "edit" || mode === "view") && (
          <div className="db-body db-form-body">
            {/* Basic Info */}
            <div className="db-section">
              <label className="db-label">Domain Name</label>
              <input
                id="domain-name-input"
                className={`db-input ${mode === "view" ? "db-input-readonly" : ""}`}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g., Cybersecurity"
                readOnly={mode === "view"}
              />
            </div>

            <div className="db-section">
              <label className="db-label">Description</label>
              <input
                id="domain-desc-input"
                className={`db-input ${mode === "view" ? "db-input-readonly" : ""}`}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Short description of this domain"
                readOnly={mode === "view"}
              />
            </div>

            <div className="db-section">
              <label className="db-label">System Prompt Addition</label>
              <textarea
                id="domain-prompt-input"
                className={`db-textarea ${mode === "view" ? "db-textarea-readonly" : ""}`}
                value={form.systemPromptExtra}
                onChange={(e) =>
                  setForm({ ...form, systemPromptExtra: e.target.value })
                }
                placeholder="Extra instructions for the AI when this domain is active..."
                rows={3}
                readOnly={mode === "view"}
              />
            </div>

            {/* Concepts */}
            <div className="db-section">
              <label className="db-label">
                Concepts ({form.concepts.length})
              </label>
              <div className="db-chip-list">
                {form.concepts.map((c, i) => (
                  <div key={i} className={`db-chip ${mode === "view" ? "db-chip-readonly" : ""}`}>
                    <span className="db-chip-name">{c.name}</span>
                    {mode !== "view" && (
                      <button
                        className="db-chip-remove"
                        onClick={() => handleRemoveConcept(i)}
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {mode !== "view" && (
                <div className="db-inline-form">
                  <input
                    id="concept-name-input"
                    className="db-input db-input-sm"
                    value={conceptName}
                    onChange={(e) => setConceptName(e.target.value)}
                    placeholder="Concept name"
                  />
                  <input
                    id="concept-desc-input"
                    className="db-input db-input-sm"
                    value={conceptDesc}
                    onChange={(e) => setConceptDesc(e.target.value)}
                    placeholder="Description"
                  />
                  <button className="db-add-btn" onClick={handleAddConcept}>
                    Add
                  </button>
                </div>
              )}
            </div>

            {/* Relationships */}
            <div className="db-section">
              <label className="db-label">
                Relationships ({form.relationships.length})
              </label>
              <div className="db-rel-list">
                {form.relationships.map((r, i) => (
                  <div key={i} className={`db-rel-item ${mode === "view" ? "db-rel-item-readonly" : ""}`}>
                    <span>
                      {r.subject}{" "}
                      <em className="db-rel-pred">{r.predicate}</em>{" "}
                      {r.object}
                    </span>
                    {mode !== "view" && (
                      <button
                        className="db-chip-remove"
                        onClick={() => handleRemoveRelationship(i)}
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {mode !== "view" && (
                <div className="db-inline-form db-rel-form">
                  <input
                    id="rel-subject-input"
                    className="db-input db-input-sm"
                    value={relSubject}
                    onChange={(e) => setRelSubject(e.target.value)}
                    placeholder="Subject"
                  />
                  <input
                    id="rel-predicate-input"
                    className="db-input db-input-sm"
                    value={relPredicate}
                    onChange={(e) => setRelPredicate(e.target.value)}
                    placeholder="Predicate"
                  />
                  <input
                    id="rel-object-input"
                    className="db-input db-input-sm"
                    value={relObject}
                    onChange={(e) => setRelObject(e.target.value)}
                    placeholder="Object"
                  />
                  <button className="db-add-btn" onClick={handleAddRelationship}>
                    Add
                  </button>
                </div>
              )}
            </div>

            {/* Save */}
            {mode !== "view" && (
              <button className="db-save-btn" onClick={handleSave}>
                {mode === "create" ? "Create Domain" : "Save Changes"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DomainBuilder;
