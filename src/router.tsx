import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import { Provider } from '@/provider';
import DefaultLayout from '@/layouts/default';

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			element={
				<Provider>
					<DefaultLayout />
				</Provider>
			}>
			<Route index lazy={() => import('@/pages/index')} />
			<Route lazy={() => import('@/pages/docs')} path='docs' />
			<Route lazy={() => import('@/pages/pricing')} path='pricing' />
			<Route lazy={() => import('@/pages/blog')} path='blog' />
			<Route lazy={() => import('@/pages/about')} path='about' />
			<Route lazy={() => import('@/pages/signin')} path='sign-in' />
			<Route lazy={() => import('@/pages/signup')} path='sign-up' />
			<Route lazy={() => import('@/pages/dashboard')} path='dashboard' />
			<Route lazy={() => import('@/pages/settings')} path='settings' />
			<Route lazy={() => import('@/pages/newProject')} path='new-project' />
			<Route lazy={() => import('@/pages/help')} path='help' />
		</Route>,
	),
);
