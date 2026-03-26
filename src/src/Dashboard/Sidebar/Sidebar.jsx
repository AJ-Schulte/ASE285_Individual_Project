import React from "react";
import NewChatButton from "./NewChatButton.jsx";
import ListItem from "./ListItem";
import DeleteConversationsButton from "./DeleteConversationsButton";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedConversationId } from "../dashboardSlice";

const Sidebar = ({ onOpenDomainBuilder }) => {
  const dispatch = useDispatch();

  const conversations = useSelector((state) => state.dashboard.conversations);

  const handleSetSelectedChat = (id) => {
    dispatch(setSelectedConversationId(id));
  };

  return (
    <div className="sidebar_container">
      <NewChatButton handleSetSelectedChat={handleSetSelectedChat} />
      {conversations.map((c) => (
        <ListItem
          key={c.id}
          title={c.messages[0].content}
          conversationId={c.id}
          handleSetSelectedChat={handleSetSelectedChat}
        />
      ))}

      {/* Domain Builder button */}
      <div
        className="list_item sidebar_builder_btn"
        onClick={onOpenDomainBuilder}
      >
        <div className="list_item_icon">
          <span style={{ fontSize: "14px" }}>🧩</span>
        </div>
        <p className="list_item_text">Domain Builder</p>
      </div>

      <DeleteConversationsButton />
    </div>
  );
};

export default Sidebar;
