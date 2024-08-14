import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Session } from '@supabase/supabase-js';

import { supabase } from '@/supabase';
import DefaultLayout from '@/layouts/default';
import IndexPage from '@/pages/index';
import DocsPage from '@/pages/docs';
import PricingPage from '@/pages/pricing';
import BlogPage from '@/pages/blog';
import AboutPage from '@/pages/about';

function App() {
	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
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
