// export const selectTheme = (state) => state.theme.theme;
export const selectTheme = (state) => state.theme?.theme ?? "light";
export const selectIsLoading = (state) => state.theme.isLoading;
