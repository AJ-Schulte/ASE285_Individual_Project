import React, { useState, useRef, useEffect } from "react";
import { GrUser } from "react-icons/gr";
import { FcMindMap } from "react-icons/fc";

const SlowText = (props) => {
  const { speed, text } = props;

  const [placeholder, setPlaceholder] = useState(text[0]);

  const index = useRef(0);

  useEffect(() => {
    function tick() {
      index.current++;
      setPlaceholder((prev) => prev + text[index.current]);
    }
    if (index.current < text.length - 1) {
      let addChar = setInterval(tick, speed);
      return () => clearInterval(addChar);
    }
  }, [placeholder, speed, text]);

  return <span>{placeholder}</span>;
};

/**
 * Renders a verification result sentence with color-coded indicator.
 */
const VerifiedSentence = ({ result }) => {
  const [showTip, setShowTip] = useState(false);

  return (
    <span
      className={`vr-sentence ${result.verified ? "vr-verified" : "vr-unverified"}`}
      onMouseEnter={() => setShowTip(true)}
      onMouseLeave={() => setShowTip(false)}
    >
      <span className="vr-icon">{result.verified ? "✅" : "⚠️"}</span>
      {result.sentence}{" "}
      {showTip && (
        <span className="vr-tip">
          {result.verified
            ? `Grounded in: ${result.matchedConcepts.join(", ")}`
            : "No ontology match found — unverified claim"}
        </span>
      )}
    </span>
  );
};

const Message = ({ content, aiMessage, animate, conceptTags, verificationResults }) => {
  const hasVerification = verificationResults && verificationResults.length > 0;

  return (
    <div
      className="message_container"
      style={{ background: aiMessage ? "rgb(247, 247, 248)" : "white" }}
    >
      <div className="message_avatar_container">
        {aiMessage ? <FcMindMap /> : <GrUser />}
      </div>
      <div className="message_text_container">
        {/* If verification results exist, render sentence-by-sentence */}
        {hasVerification ? (
          <div className="message_text vr-text">
            {verificationResults.map((result, i) => (
              <VerifiedSentence key={i} result={result} />
            ))}
          </div>
        ) : (
          <p className="message_text">
            {animate ? <SlowText speed={20} text={content} /> : content}
          </p>
        )}
        {conceptTags && conceptTags.length > 0 && (
          <div className="concept_tag_container">
            {conceptTags.map((tag) => (
              <span key={tag} className="concept_tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
