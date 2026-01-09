import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface EditorState {
    title: string;
    slug: string;
    content: any; // EditorJS JSON
    isDirty: boolean;
    lastSaved: string | null;
}

const initialState: EditorState = {
    title: '',
    slug: '',
    content: null,
    isDirty: false,
    lastSaved: null,
};

const editorSlice = createSlice({
    name: 'editor',
    initialState,
    reducers: {
        setEditorData: (state, action: PayloadAction<Partial<EditorState>>) => {
            return { ...state, ...action.payload };
        },
        setTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload;
            state.isDirty = true;
        },
        setSlug: (state, action: PayloadAction<string>) => {
            state.slug = action.payload;
            state.isDirty = true;
        },
        setContent: (state, action: PayloadAction<any>) => {
            state.content = action.payload;
            state.isDirty = true;
        },
        setIsDirty: (state, action: PayloadAction<boolean>) => {
            state.isDirty = action.payload;
        },
        setLastSaved: (state, action: PayloadAction<string>) => {
            state.lastSaved = action.payload;
        }
    },
});

export const { setEditorData, setTitle, setSlug, setContent, setIsDirty, setLastSaved } = editorSlice.actions;
export default editorSlice.reducer;
