import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Session } from '@supabase/supabase-js';

export interface InitialState {
	isComplete: boolean;
	session: Session | null;
}

const initialState: InitialState = {
	isComplete: false,
	session: null,
};

export const slice = createSlice({
	name: 'session',
	initialState,
	reducers: {
		setSession: (state, { payload }: PayloadAction<Session>) => {
			state.session = payload;
			state.isComplete = true;
		},
		resetSession: (state) => {
			state.session = null;
			state.isComplete = true;
		},
	},
});

export const { setSession, resetSession } = slice.actions;
export const reducer = slice.reducer;
