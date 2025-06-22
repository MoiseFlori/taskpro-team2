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
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          background: "var(--bg-modal-color)",
          p: 4,
          maxWidth: 400,
          margin: "100px auto",
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

        Add card
        
        <form onSubmit={handleSubmit} className="add-card-form">
          <TextField
            label="Title"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.addCardTitle}
          />
          <TextField
            label="Description"
            multiline
            rows={3}
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <FormControl>
            <FormLabel>Label color</FormLabel>
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
            <Typography sx={{ color: "#BEDBB0", fontWeight: 500 }}>
              {todayText} <ExpandMoreIcon fontSize="small" />
            </Typography>
          </CustomDateSelector>

          <Button
            variant="contained"
            type="submit"
            sx={{ mt: 2 }}
            startIcon={<span style={{ fontWeight: "bold" }}>＋</span>}
          >
            Add
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddCardModal;
