import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
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


const AddCardModal = ({ open, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("gray");
  const [deadline, setDeadline] = useState(dayjs());

  const todayText = `Today, ${dayjs().format("MMMM D")}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cardData = {
      title,
      description,
      priority,
      deadline: deadline.toISOString(),
    };

    console.log("🚀 cardData trimis:", cardData);

    if (!title.trim()) {
      return alert("Titlul este obligatoriu");
    }
    console.log("🕒 deadline =", deadline, typeof deadline);

    if (!deadline || !deadline.isValid()) {
      return alert("Deadline invalid");
    }
    

    try {
      const response = await fetch("/api/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cardData),
      });

      if (response.ok) {
        onClose();
      }
    } catch (err) {
      console.error("Eroare la trimiterea cardului:", err);
    }
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
        <span className={styles.addCardSpan}>Add card</span>
        <form onSubmit={handleSubmit} className={styles.addCardForm}>
          <TextField
            label="Title"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            // className={styles.addCardTitle}
            sx={{ marginBottom: "16px" }}
          />
          <TextField
            label="Description"
            multiline
            rows={3}
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            // className={styles.addCardDescription}
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
                        color: "var(--priority-blue)",
                        backgroundColor: "var(--priority-blue)",
                        borderRadius: "50%",
                        padding: "0.5px",
                      },
                      "&.Mui-checked": {
                        color: "var(--priority-blue)",
                        backgroundColor: "var(--white-color)",
                      },
                      "&:hover": {
                        backgroundColor: "var(--priority-blue)",
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
                        color: "var(--priority-pink)",
                        backgroundColor: "var(--priority-pink)",
                        borderRadius: "50%",
                        padding: "0.5px",
                      },
                      "&.Mui-checked": {
                        color: "var(--priority-pink)",
                        backgroundColor: "var(--white-color)",
                      },
                      "&:hover": {
                        backgroundColor: "var(--priority-pink)",
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
                        color: "var(--priority-green)",
                        backgroundColor: "var(--priority-green)",
                        borderRadius: "50%",
                        padding: "0.5px",
                      },
                      "&.Mui-checked": {
                        color: "var(--priority-green)",
                        backgroundColor: "var(--white-color)",
                      },
                      "&:hover": {
                        backgroundColor: "var(--priority-green)",
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
                          backgroundColor: "var(--priority-gray)",
                        }}
                      />
                    }
                    sx={{
                      "&.MuiRadio-root": {
                        color: "var(--priority-gray)",
                        backgroundColor: "var(--priority-gray)",
                        borderRadius: "50%",
                        padding: "0.5px",
                      },
                      "&.Mui-checked": {
                        color: "var(--priority-gray-dark)",
                        backgroundColor: "var(--white-color)",
                      },
                      "&:hover": {
                        backgroundColor: "var(--priority-gray)",
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
            <Typography
              sx={{ color: "var(--priority-green)", fontWeight: 500 }}
            >
              {todayText} <ExpandMoreIcon fontSize="small" />
            </Typography>
          </CustomDateSelector>

          {/* <Button
            variant="contained"
            type="submit"
            sx={{ mt: 2 }}
            startIcon={<span style={{ fontWeight: "bold" }}>＋</span>}
          >
            Add
          </Button> */}
          <button type="submit" className={style.submitBtn}>
            <span className={style.plusBtn}>+</span> Add
          </button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddCardModal;
