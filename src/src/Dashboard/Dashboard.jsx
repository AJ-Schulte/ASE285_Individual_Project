import React, { useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar/Sidebar.jsx";
import Chat from "./Chat/Chat.jsx";
import KnowledgePanel from "./KnowledgePanel/KnowledgePanel.jsx";
import DomainBuilder from "./DomainBuilder/DomainBuilder.jsx";

import "./dashboard.css";

const Dashboard = () => {
  const [domainBuilderOpen, setDomainBuilderOpen] = useState(false);

  return (
    <div className="dashboard_container">
      <Sidebar onOpenDomainBuilder={() => setDomainBuilderOpen(true)} />
      <Chat />
      <KnowledgePanel />
      <DomainBuilder
        isOpen={domainBuilderOpen}
        onClose={() => setDomainBuilderOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
