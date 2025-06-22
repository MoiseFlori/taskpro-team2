import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Button, Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

const CustomDateSelector = ({ onChange }) => {
  const [date, setDate] = useState(dayjs());
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <DatePicker
        open={open}
        onClose={() => setOpen(false)}
        value={date}
        onChange={(newValue) => {
          setDate(newValue);
          onChange?.(newValue);
        }}
        slotProps={{
          textField: {
            style: { display: "none" },
          },
        }}
        disablePast
      />

      <Button
        variant="text"
        onClick={() => setOpen(true)}
        endIcon={<ExpandMoreIcon />}
            sx={{
                fontFamily: "var(--font-family)",
                textTransform: "none",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "100%",
                letterSpacing: "-2%",
                color: "#BEDBB0",
            }}
      >
        Today, {dayjs(date).format("MMMM D")}
      </Button>
    </Box>
  );
};

export default CustomDateSelector;