import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '@/store';
import { supabase } from '@/supabase';
import { setSession, resetSession } from '@/stores/session';
import DefaultLayout from '@/layouts/default';
import IndexPage from '@/pages/index';
import DocsPage from '@/pages/docs';
import PricingPage from '@/pages/pricing';
import BlogPage from '@/pages/blog';
import AboutPage from '@/pages/about';

function App() {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		supabase.auth.onAuthStateChange((_event, session) => {
			if (session) {
				dispatch(setSession(session));
			} else {
				dispatch(resetSession());
			}
		});
	}, []);

	return (
		<Routes>
			<Route element={<DefaultLayout />}>
				<Route element={<IndexPage />} path='/' />
				<Route element={<DocsPage />} path='/docs' />
				<Route element={<PricingPage />} path='/pricing' />
				<Route element={<BlogPage />} path='/blog' />
				<Route element={<AboutPage />} path='/about' />
			</Route>
		</Routes>
	);
}

export default App;
