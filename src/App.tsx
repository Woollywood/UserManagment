import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { router } from './router';

import { AppDispatch } from '@/store';
import { supabase } from '@/supabase';
import { resetSession, getUserProfileFromSession } from '@/stores/session';

function App() {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		supabase.auth.onAuthStateChange((_event, session) => {
			if (session) {
				dispatch(getUserProfileFromSession(session));
			} else {
				dispatch(resetSession());
			}
		});
	}, []);

	return <RouterProvider router={router} />;
}

export default App;
