import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as d3 from "d3";
import { getDomainById } from "../../services/ontologyService";
import "./knowledgePanel.css";

const KnowledgePanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tooltip, setTooltip] = useState(null);
  const svgRef = useRef(null);
  const containerRef = useRef(null);

  const { selectedDomainId } = useSelector((state) => state.ontology);
  const domain = getDomainById(selectedDomainId);

  const hasConcepts = domain && domain.concepts && domain.concepts.length > 0;

  useEffect(() => {
    if (!isOpen || !svgRef.current || !hasConcepts) return;

    // Clear previous graph
    d3.select(svgRef.current).selectAll("*").remove();

    const width = containerRef.current?.clientWidth || 340;
    const height = containerRef.current?.clientHeight || 500;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Zoom container
    const g = svg.append("g").attr("class", "kp-graph-container");

    const zoom = d3.zoom()
      .scaleExtent([0.2, 5])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    // Build nodes from concepts
    const conceptNames = domain.concepts.map((c) => c.name);
    const nodeSet = new Set(conceptNames);

    // Also add any subjects/objects from relationships that aren't concepts
    domain.relationships.forEach((r) => {
      nodeSet.add(r.subject);
      nodeSet.add(r.object);
    });

    const nodes = Array.from(nodeSet).map((name) => {
      const concept = domain.concepts.find((c) => c.name === name);
      return {
        id: name,
        description: concept ? concept.description : "",
        isConcept: !!concept,
      };
    });

    // Build links from relationships
    const links = domain.relationships.map((r) => ({
      source: r.subject,
      target: r.object,
      predicate: r.predicate,
    }));

    // Color palette
    const colorScale = d3
      .scaleOrdinal()
      .domain(nodes.map((n) => n.id))
      .range([
        "#6366f1", "#8b5cf6", "#a855f7", "#d946ef",
        "#ec4899", "#f43f5e", "#0ea5e9", "#14b8a6",
      ]);

    // Arrow marker for directed edges
    svg
      .append("defs")
      .append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "-0 -5 10 10")
      .attr("refX", 28)
      .attr("refY", 0)
      .attr("orient", "auto")
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .append("path")
      .attr("d", "M 0,-5 L 10,0 L 0,5")
      .attr("fill", "#94a3b8");

    // Force simulation
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(120)
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(40));

    // Draw links (append to g)
    const link = g
      .append("g")
      .attr("class", "kp-links")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("class", "kp-link")
      .attr("marker-end", "url(#arrowhead)");

    // Draw link labels (append to g)
    const linkLabel = g
      .append("g")
      .attr("class", "kp-link-labels")
      .selectAll("text")
      .data(links)
      .enter()
      .append("text")
      .attr("class", "kp-link-label")
      .text((d) => d.predicate);

    // Draw nodes (circles) (append to g)
    const node = g
      .append("g")
      .attr("class", "kp-nodes")
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "kp-node-group")
      .call(
        d3
          .drag()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    node
      .append("circle")
      .attr("class", "kp-node")
      .attr("r", (d) => (d.isConcept ? 20 : 14))
      .attr("fill", (d) => colorScale(d.id))
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .on("click", (event, d) => {
        event.stopPropagation();
        setTooltip({
          name: d.id,
          description: d.description || "Relationship node (not a concept)",
          x: event.pageX,
          y: event.pageY,
        });
      });

    // Node labels
    node
      .append("text")
      .attr("class", "kp-node-label")
      .attr("dy", 35)
      .attr("text-anchor", "middle")
      .text((d) => d.id);

    // Tick function — update positions
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      linkLabel
        .attr("x", (d) => (d.source.x + d.target.x) / 2)
        .attr("y", (d) => (d.source.y + d.target.y) / 2);

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    // Click SVG background to dismiss tooltip
    svg.on("click", () => setTooltip(null));
    
    // Add instruction hint to the legend or help text
    // (Optional: can add UI for reset zoom)

    return () => simulation.stop();
  }, [isOpen, selectedDomainId, domain, hasConcepts]);

  return (
    <>
      {/* Toggle button — always visible */}
      <button
        id="knowledge-panel-toggle"
        className={`kp-toggle-btn ${isOpen ? "kp-toggle-active" : ""}`}
        onClick={() => {
          setIsOpen(!isOpen);
          setTooltip(null);
        }}
        title="Toggle Knowledge Panel"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="5" r="3" />
          <circle cx="5" cy="19" r="3" />
          <circle cx="19" cy="19" r="3" />
          <line x1="12" y1="8" x2="5" y2="16" />
          <line x1="12" y1="8" x2="19" y2="16" />
        </svg>
        <span className="kp-toggle-text">Knowledge Graph</span>
      </button>

      {/* Overlay panel */}
      <div className={`kp-overlay ${isOpen ? "kp-overlay-open" : ""}`}>
        <div className="kp-panel" ref={containerRef}>
          <div className="kp-header">
            <div className="kp-header-info">
              <h3 className="kp-title">Knowledge Graph</h3>
              <span className="kp-domain-badge">{domain?.name}</span>
            </div>
            <button
              className="kp-close-btn"
              onClick={() => {
                setIsOpen(false);
                setTooltip(null);
              }}
            >
              ✕
            </button>
          </div>

          {!hasConcepts ? (
            <div className="kp-empty">
              <p className="kp-empty-icon">🔍</p>
              <p className="kp-empty-text">
                No concepts defined for the <strong>{domain?.name}</strong> domain.
              </p>
              <p className="kp-empty-hint">
                Switch to a domain with concepts or use the Domain Builder to add some.
              </p>
            </div>
          ) : (
            <svg ref={svgRef} className="kp-svg" />
          )}

          {/* Legend */}
          {hasConcepts && (
            <div className="kp-legend">
              <span className="kp-legend-item">
                <span className="kp-legend-dot kp-legend-concept"></span>
                Concept
              </span>
              <span className="kp-legend-item">
                <span className="kp-legend-dot kp-legend-relation"></span>
                Relation node
              </span>
              <span className="kp-legend-hint">Click a node for details • Drag to rearrange • Scroll to zoom • Drag background to pan</span>
            </div>
          )}
        </div>

        {/* Tooltip */}
        {tooltip && (
          <div
            className="kp-tooltip"
            style={{ top: tooltip.y + 10, left: tooltip.x + 10 }}
          >
            <strong className="kp-tooltip-name">{tooltip.name}</strong>
            <p className="kp-tooltip-desc">{tooltip.description}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default KnowledgePanel;
