import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '@/store';
import { supabase } from '@/supabase';
import { resetSession, getUserProfileFromSession } from '@/stores/session';
import DefaultLayout from '@/layouts/default';
import IndexPage from '@/pages/index';
import DocsPage from '@/pages/docs';
import PricingPage from '@/pages/pricing';
import BlogPage from '@/pages/blog';
import AboutPage from '@/pages/about';
import SignIn from '@/pages/signin';
import SignUp from '@/pages/signup';
import Dashboard from '@/pages/dashboard';
import Settings from '@/pages/settings';
import NewProject from '@/pages/newProject';
import Help from '@/pages/help';

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

	return (
		<Routes>
			<Route element={<DefaultLayout />}>
				<Route index element={<IndexPage />} />
				<Route element={<DocsPage />} path='docs' />
				<Route element={<PricingPage />} path='pricing' />
				<Route element={<BlogPage />} path='blog' />
				<Route element={<AboutPage />} path='about' />
				<Route element={<SignIn />} path='sign-in' />
				<Route element={<SignUp />} path='sign-up' />
				<Route element={<Dashboard />} path='dashboard' />
				<Route element={<Settings />} path='settings' />
				<Route element={<NewProject />} path='new-project' />
				<Route element={<Help />} path='help' />
			</Route>
		</Routes>
	);
}

export default App;
