import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Session } from '@supabase/supabase-js';

import { supabase } from '@/supabase';
import { Database } from '@/types/supabase';

export interface InitialState {
	isComplete: boolean;
	profile: Database['public']['Tables']['profiles']['Row'] | null;
	session: Session | null;
}

const initialState: InitialState = {
	isComplete: false,
	profile: null,
	session: null,
};

export const getUserProfileFromSession = createAsyncThunk('@@session/getProfile', async (session: Session) => {
	const { data: profile } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();

	return {
		session,
		profile,
	};
});

export const slice = createSlice({
	name: 'session',
	initialState,
	reducers: {
		resetSession: () => ({
			...initialState,
			isComplete: true,
		}),
	},
	extraReducers: (builder) => {
		builder.addCase(getUserProfileFromSession.fulfilled, (state, { payload }) => {
			state.profile = payload.profile;
			state.session = payload.session;
			state.isComplete = true;
		});
	},
});

export const { resetSession } = slice.actions;
export const reducer = slice.reducer;
