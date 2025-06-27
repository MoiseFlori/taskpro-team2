import React, { useMemo } from "react";
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
import { updateCard } from "../../../redux/cards/cardsSlice";
import { toast } from "react-toastify";
import Icon from "../../Icon";
import dayjs from "dayjs";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import CustomDateSelector from "./CustomDateSelector";
import styles from "./AddCardModal.module.css";
import style from "../Modal.module.css";
import "../../../index.css";
// import { editCard } from "../../api/cardAPI";



const validationSchema = Yup.object({
  title: Yup.string()
    .required("Insert the title")
    .min(3, "Minim 3 characters"),
  deadline: Yup.date()
    .required("Insert the deadline")
    .typeError("Invalid date"),
});

const EditCardModal = ({ open, onClose, cardData, onUpdate }) => {

  const dispatch = useDispatch();
  
  const initialValues = useMemo(
    () => ({
      title: cardData?.title ?? "",
      description: cardData?.description ?? "",
      priority: cardData?.priority || "gray",
      deadline: dayjs(cardData?.deadline) ?? dayjs(),
    }),
    [cardData]
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      if (!values.title.trim()) return alert("Insert the title");
      if (!values.deadline || !values.deadline.isValid())
        return alert("Invalid deadline");

      const updatedCard = {
        title: values.title,
        description: values.description,
        priority: values.priority,
        deadline: values.deadline.toISOString(),
      };

      // const cardId = cardData._id || cardData.id;
      const cardId = cardData?._id;
      if (!cardId) return toast.error("No ID for update");

      try {
        await dispatch(updateCard({ id: cardId, updatedCard })).unwrap();
        onUpdate?.();
        formik.resetForm();
        onClose();
        toast.success("✅ Card updated successfully!");
      } catch (err) {
        console.error("Error at update:", err);
        toast.error(
          "❌ Card update failed. Check the token or the fields."
        );
      }
      

      // try {
      //   const updated = await editCard(cardId, updatedCard);
      //   console.log("✅ Server response:", updated);
      //   onUpdate?.();
      //   onClose();
      // } catch (error) {
      //   console.error("Error updating:", error);
      // }
    },
  });

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
        <span className={styles.addCardSpan}>Edit card</span>
        <form onSubmit={formik.handleSubmit} className={styles.addCardForm}>
          <TextField
            label="Title"
            fullWidth
            required
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            onBlur={formik.handleBlur}
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
                    // value="blue"
                    disableRipple
                    disableFocusRipple
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
                        color: "var(--priority-gray)",
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
            <span className={style.plusBtn}>+</span> Edit
          </button>
        </form>
      </Box>
    </Modal>
  );
};

export default EditCardModal;
