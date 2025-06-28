import styles from "./ThemeSwitcher.module.css";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { updateTheme } from '@reduxStore/theme/themeOperation';
import { useTheme } from '../../hooks/useTheme';
import { SelectWrap } from './ThemeSwitcher.styled';

function ThemeSelect() {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const dispatch = useDispatch();
  useTheme(); // aplică tema curentă

  const THEME_OPTIONS = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'violet', label: 'Violet' },
  ];

  const onChangeTheme = (selectedOption) => {
    if (!selectedOption) return;
    console.log('[ThemeSelect] selected:', selectedOption.value);
    dispatch(updateTheme(selectedOption.value));
  };

  return (
    <SelectWrap $isMenuOpen={isSelectOpen}>
      <Select
        classNamePrefix="custom-select"
        onChange={onChangeTheme}
        options={THEME_OPTIONS}
        placeholder="Choose theme"
        isSearchable={false}
        onMenuOpen={() => setIsSelectOpen(true)}
        onMenuClose={() => setIsSelectOpen(false)}
      />
    </SelectWrap>
  );
}

export default ThemeSelect;
