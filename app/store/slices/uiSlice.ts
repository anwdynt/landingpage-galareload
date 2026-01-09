import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface UIState {
    isLoading: boolean;
    isSaving: boolean;
    lastAutosave: string | null;
    error: string | null;
}

const initialState: UIState = {
    isLoading: false,
    isSaving: false,
    lastAutosave: null,
    error: null,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setSaving: (state, action: PayloadAction<boolean>) => {
            state.isSaving = action.payload;
        },
        setLastAutosave: (state, action: PayloadAction<string>) => {
            state.lastAutosave = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        }
    },
});

export const { setLoading, setSaving, setLastAutosave, setError } = uiSlice.actions;
export default uiSlice.reducer;
