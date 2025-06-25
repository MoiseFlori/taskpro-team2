import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import Icon from "../../Icon";
import dayjs from "dayjs";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import CustomDateSelector from "./CustomDateSelector";
import styles from "./AddCardModal.module.css";
import style from "../Modal.module.css";
import "../../../index.css";
import { editCard } from "../../api/cardAPI";


const EditCardModal = ({ open, onClose, cardData }) => {
  const [title, setTitle] = useState(cardData?.title ?? "");
  const [description, setDescription] = useState(cardData?.description ?? "");
  const [priority, setPriority] = useState(cardData?.priority ?? "gray");
  const [deadline, setDeadline] = useState(dayjs(cardData?.deadline) ?? dayjs());

  const todayText = `Today, ${dayjs().format("MMMM D")}`;

  useEffect(() => {
    if (cardData) {
      setTitle(cardData.title);
      setDescription(cardData.description);
      setPriority(cardData.priority);
      setDeadline(dayjs(cardData.deadline));
    }
  }, [cardData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedCard = {
      title,
      description,
      priority,
      deadline: deadline.toISOString(),
    };

    if (!title.trim()) {
      return alert("Titlul este obligatoriu");
    }

    if (!deadline || !deadline.isValid()) {
      return alert("Deadline invalid");
    }
    
    const cardId = cardData._id || cardData.id;
    if (!cardId) return alert("No ID for update");

    const updated = await editCard(cardId, updatedCard);

    console.log("✅ Server response:", updated);
    onClose();
    window.location.reload();
  };
 

  return (
    <Modal open={open} onClose={onClose} className={style.backdrop}>
      <Box
        className={styles.modal}
        sx={{
          background: "var(--bg-modal-color)",
          p: 4,
          maxWidth: 350,
          borderRadius: 8,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box
          sx={{ alignSelf: "flex-end", cursor: "pointer" }}
          onClick={onClose}
        >
          <Icon name="x-close" size={18} />
        </Box>
        <span className={styles.addCardSpan}>Edit card</span>
        <form onSubmit={handleSubmit} className={styles.addCardForm}>
          <TextField
            label="Title"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ marginBottom: "16px" }}
          />
          <TextField
            label="Description"
            multiline
            rows={3}
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ marginBottom: "24px" }}
          />
          <FormControl sx={{ marginBottom: "14px" }}>
            <FormLabel sx={{ marginBottom: "4px" }}>Label color</FormLabel>
            <RadioGroup
              row
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              sx={{ marginLeft: "8px" }}
            >
              <FormControlLabel
                value="blue"
                control={
                  <Radio
                    sx={{
                      "&.MuiRadio-root": {
                        color: "#8FA1D0",
                        backgroundColor: "#8FA1D0",
                        borderRadius: "50%",
                        padding: "0.5px",
                      },
                      "&.Mui-checked": {
                        color: "#8FA1D0",
                        backgroundColor: "#fff",
                      },
                      "&:hover": {
                        backgroundColor: "#sameColor",
                      },
                      "&.Mui-focusVisible": {
                        outline: "none",
                      },
                    }}
                  />
                }
                label=""
              />
              <FormControlLabel
                value="pink"
                control={
                  <Radio
                    sx={{
                      "&.MuiRadio-root": {
                        color: "#E09CB5",
                        backgroundColor: "#E09CB5",
                        borderRadius: "50%",
                        padding: "0.5px",
                      },
                      "&.Mui-checked": {
                        color: "#E09CB5",
                        backgroundColor: "#fff",
                      },
                      "&:hover": {
                        backgroundColor: "#sameColor",
                      },
                      "&.Mui-focusVisible": {
                        outline: "none",
                      },
                    }}
                  />
                }
                label=""
              />
              <FormControlLabel
                value="green"
                control={
                  <Radio
                    sx={{
                      "&.MuiRadio-root": {
                        color: "#BEDBB0",
                        backgroundColor: "#BEDBB0",
                        borderRadius: "50%",
                        padding: "0.5px",
                      },
                      "&.Mui-checked": {
                        color: "#BEDBB0",
                        backgroundColor: "#fff",
                      },
                      "&:hover": {
                        backgroundColor: "#sameColor",
                      },
                      "&.Mui-focusVisible": {
                        outline: "none",
                      },
                    }}
                  />
                }
                label=""
              />
              <FormControlLabel
                value="gray"
                control={
                  <Radio
                    icon={
                      <span
                        style={{
                          display: "inline-block",
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          backgroundColor: "#1616164D",
                        }}
                      />
                    }
                    sx={{
                      "&.MuiRadio-root": {
                        color: "#1616164D",
                        backgroundColor: "#1616164D",
                        borderRadius: "50%",
                        padding: "0.5px",
                      },
                      "&.Mui-checked": {
                        color: "#1616164D",
                        backgroundColor: "#fff",
                      },
                      "&:hover": {
                        backgroundColor: "#sameColor",
                      },
                      "&.Mui-focusVisible": {
                        outline: "none",
                      },
                    }}
                  />
                }
                label=""
              />
            </RadioGroup>
          </FormControl>

          <CustomDateSelector
            onChange={(newDate) => setDeadline(newDate)}
            disablePast
          >
          {/* <CustomDateSelector
                value={deadline}
                onChange={(newDate) => setDeadline(newDate)}
                disablePast
         > */}
            <Typography sx={{ color: "#BEDBB0", fontWeight: 500 }}>
              {todayText} <ExpandMoreIcon fontSize="small" />
            </Typography>
          </CustomDateSelector>

          <button type="submit" className={style.submitBtn}>
            <span className={style.plusBtn}>+</span> Edit
          </button>
        </form>
      </Box>
    </Modal>
  );
};

export default EditCardModal;
