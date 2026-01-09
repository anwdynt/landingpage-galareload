import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface PostSettingsState {
    status: 'DRAFT' | 'PUBLISHED' | 'PENDING' | 'PRIVATE' | 'TRASH';
    authorId: number | null;
    categoryIds: number[];
    meta: {
        title: string;
        description: string;
    };
    featuredImage: string | null;
    excerpt: string;
}

const initialState: PostSettingsState = {
    status: 'DRAFT',
    authorId: null,
    categoryIds: [],
    meta: {
        title: '',
        description: '',
    },
    featuredImage: null,
    excerpt: '',
};

const postSettingsSlice = createSlice({
    name: 'postSettings',
    initialState,
    reducers: {
        setPostSettings: (state, action: PayloadAction<Partial<PostSettingsState>>) => {
            return { ...state, ...action.payload };
        },
        setStatus: (state, action: PayloadAction<PostSettingsState['status']>) => {
            state.status = action.payload;
        },
        toggleCategory: (state, action: PayloadAction<number>) => {
            if (state.categoryIds.includes(action.payload)) {
                state.categoryIds = state.categoryIds.filter(id => id !== action.payload);
            } else {
                state.categoryIds.push(action.payload);
            }
        },
        setMeta: (state, action: PayloadAction<Partial<PostSettingsState['meta']>>) => {
            state.meta = { ...state.meta, ...action.payload };
        },
        setFeaturedImage: (state, action: PayloadAction<string | null>) => {
            state.featuredImage = action.payload;
        },
        resetPostSettings: () => initialState
    },
});

export const { setPostSettings, setStatus, toggleCategory, setMeta, setFeaturedImage, resetPostSettings } = postSettingsSlice.actions;
export default postSettingsSlice.reducer;
