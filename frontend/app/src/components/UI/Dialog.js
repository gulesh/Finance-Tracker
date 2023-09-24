import React from "react";

const Dialog = ({title, content, onClose, onSubmit}) => {
    return (
        <div className="dialog">
            <h2>{title}</h2>
            <div className="dialog-content">{content}</div>
            <div className="dialog-buttons">
                <button onClick={onClose}> Cancel </button>
                <button onClick={onSubmit}> Submit </button>
            </div>
        </div>
    );
}

export default Dialog;