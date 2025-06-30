import styles from "./ThemeSelect.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { updateTheme } from "@reduxStore/theme/themeOperation";

import { SelectWrap } from "./ThemeSelect.styled";
import { selectTheme } from "@reduxStore/theme/themeSelector";

function ThemeSelect() {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const dispatch = useDispatch();
  const themeBack = useSelector(selectTheme);

  const THEME_OPTIONS = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "violet", label: "Violet" },
  ];

  const onChangeTheme = async (selectedOption) => {
    if (!selectedOption) return;

    const selectedTheme = selectedOption.value;
    console.log("Selected option value:", selectedTheme);

    try {
      const result = await dispatch(updateTheme(selectedTheme)).unwrap();

      document.documentElement.setAttribute("data-theme", result.theme);
    } catch (error) {
      console.error("Eroare la actualizarea temei:", error);
    }
  };

  return (
    <SelectWrap $isMenuOpen={isSelectOpen} className={styles.selectContainer}>
      <Select
        classNamePrefix="custom-select"
        menuPortalTarget={document.body}
        menuPosition="absolute"
        styles={{
          control: (base, state) => ({
            ...base,
            backgroundColor: "transparent",
            border: "none",
            boxShadow: "none",
            padding: 0,
            minHeight: "auto",
            height: "auto",
            cursor: "pointer",
          }),
          singleValue: (base) => ({
            ...base,
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: "16px",
            letterSpacing: "-0.02em",
            color: "var(--text-color)",
            paddingRight: "8px",
          }),
          placeholder: (base) => ({
            ...base,
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
            fontSize: "14px",
            color: "var(--text-color)",
          }),
          indicatorsContainer: (base) => ({
            ...base,
            padding: 0,
            cursor: "pointer",
          }),
          dropdownIndicator: (base) => ({
            ...base,
            padding: 0,
            color: "var(--text-color)",
          }),
          indicatorSeparator: () => ({
            display: "none",
          }),
          valueContainer: (base) => ({
            ...base,
            padding: 0,
          }),
          input: (base) => ({
            ...base,
            margin: 0,
            padding: 0,
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: "var(--bg-modal-color)",
            color: "var(--text-color)",
            borderRadius: "16px",
            border: "2px solid var(--card-bg-accent)",
            padding: "14px 0",
            width: "140px",
            boxShadow: "none",
            transform: "translateX(-50%)",
            zIndex: 1000,
          }),

          option: (base, state) => ({
            ...base,
            padding: "10px 20px",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: "18px",
            lineHeight: 1.5,
            color: state.isSelected
              ? "var(--card-bg-accent)"
              : "var(--theme-color-text)",
            backgroundColor: "transparent",
            cursor: "pointer",
            textAlign: "center",
            "&:hover": {
              color: "var(--card-bg-accent)",
            },
          }),
        }}
        onChange={onChangeTheme}
        options={THEME_OPTIONS}
        placeholder="Theme"
        isSearchable={false}
        onMenuOpen={() => setIsSelectOpen(true)}
        onMenuClose={() => setIsSelectOpen(false)}
      />
    </SelectWrap>
  );
}

export default ThemeSelect;
