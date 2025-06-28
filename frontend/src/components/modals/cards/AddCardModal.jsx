import React, { useEffect, useMemo } from "react";
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
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createCard } from "../../../redux/cards/cardsSlice";
import { toast } from "react-toastify";
import Icon from "../../Icon";
import dayjs from "dayjs";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import CustomDateSelector from "./CustomDateSelector";
import styles from "./AddCardModal.module.css";
import style from "../Modal.module.css";
import "../../../index.css";

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Please add a title")
    .min(3, "Minimum 3 characters"),
  description: Yup.string()
    .required("Please add a description")
    .min(3, "Minimum 3 characters"),
  deadline: Yup.date()
    .required("Please select a deadline")
    .typeError("Invalid date"),
});

const AddCardModal = ({ open, onClose, columnId }) => {
  const dispatch = useDispatch();

  const initialValues = useMemo(
    () => ({
      // created once not at every render
      title: "",
      description: "",
      priority: "gray",
      deadline: dayjs(),
    }),
    []
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const cardData = {
        title: values.title,
        description: values.description,
        priority: values.priority,
        deadline: values.deadline.toISOString(),
        column: columnId,
        // status: "todo",
      };

      console.log("cardData sent: ", cardData);

      if (!values.title.trim()) {
        return alert("Titlul este obligatoriu");
      }
      console.log("🕒 deadline =", values.deadline, typeof values.deadline);

      if (!values.deadline || !values.deadline.isValid()) {
        return alert("Deadline invalid");
      }

      try {
        await dispatch(createCard(cardData)).unwrap(); // unwrap - catches errors directly from thunk
        formik.resetForm();
        onClose();
        toast.success("✅ Card added successfully!");
      } catch (err) {
        console.error("Error at adding:", err);
        toast.error("❌ Card adding failed. Check the token or the fields.");
      }

      // try {
      //   await dispatch(createCard(cardData)).unwrap(); // unwrap - catches errors directly from thunk
      //   formik.resetForm();
      //   onClose();
      // } catch (err) {
      //   console.error("Crearea cardului a eșuat:", err);
      //   alert("Nu am putut salva cardul. Verifică datele sau autentificarea.");
      // }

      // try {
      //   const token = localStorage.getItem("token");
      //   const response = await fetch("/api/cards", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${token}`,
      //     },
      //     body: JSON.stringify(cardData),
      //   });

      // if (response.ok) {
      //   formik.resetForm(); // after submit
      //   onClose();
      // }
      // } catch (err) {
      //   console.error("Error sending the card: ", err);
      // }
    },
  });

  useEffect(() => {
    if (open) {
      formik.resetForm(); // after reopening the modal
    }
  }, [open]);

  const todayText = `Today, ${dayjs(formik.values.deadline).format("MMMM D")}`;

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
        <form onSubmit={formik.handleSubmit} className={styles.addCardForm}>
          <TextField
            label="Title"
            fullWidth
            required
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            sx={{ marginBottom: "16px" }}
          />
          <TextField
            label="Description"
            multiline
            rows={3}
            fullWidth
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
            sx={{ marginBottom: "24px" }}
          />
          <FormControl sx={{ marginBottom: "14px" }}>
            <FormLabel sx={{ marginBottom: "4px" }}>Label color</FormLabel>
            <RadioGroup
              row
              name="priority"
              value={formik.values.priority}
              onChange={formik.handleChange}
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
            onChange={(newDate) => formik.setFieldValue("deadline", newDate)}
            onBlur={() => formik.setFieldTouched("deadline", true)}
            disablePast
          >
            <Typography
              sx={{ color: "var(--priority-green)", fontWeight: 500 }}
            >
              {todayText} <ExpandMoreIcon fontSize="small" />
            </Typography>
          </CustomDateSelector>

          <button type="submit" className={style.submitBtn}>
            <span className={style.plusBtn}>+</span> Add
          </button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddCardModal;
