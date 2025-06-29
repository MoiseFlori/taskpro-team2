import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import styles from "./RedirectCardModal.module.css";
import Icon from "../../Icon";


const RedirectCardModal = ({ open, onClose, onRedirect, columns }) => {

    const [selectedId, setSelectedId] = useState(null);
    const [hoveredId, setHoveredId] = useState(null);

    useEffect(() => {
        if (columns.length > 0) {
            setSelectedId(columns[0]._id);
        }
    }, [columns]);

    const handleSelect = (colId) => {
        setSelectedId(colId);
        onRedirect(colId);
    };

    if (!open) return null;

    const firstId = columns[0]?._id;
    const isFirstHovered = hoveredId && hoveredId !== firstId;
    const isFirstSelected = selectedId && selectedId !== firstId;

    return (
      <div className={styles.backdropPopUp} onClick={onClose}>
        <div className={styles.modalPopUp} onClick={(e) => e.stopPropagation()}>
          <div className={styles.columnsList}>
            {columns.map((col) => {
              const isActive = selectedId === col._id;
              const isNear =
                    col._id === firstId && (isFirstHovered || isFirstSelected);
                
                return (
                    <button
                        key={col._id}
                        className={`${styles.redirectButton} 
                          ${isActive ? styles.active : ""} 
                          ${isNear ? styles.near : ""}`}
                        onClick={() => handleSelect(col._id)}
                        onMouseEnter={() => setHoveredId(col._id)}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        <span>{col.title}</span>
                        <Box sx={{ alignSelf: "flex-end", cursor: "pointer" }}>
                            <Icon name="icon-redirect" width={16} height={16} />
                        </Box>
                    </button>
                );
            })}
          </div>
        </div>
      </div>
    );
};

export default RedirectCardModal;