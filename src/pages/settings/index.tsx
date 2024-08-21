import { useSelector } from 'react-redux';

import Provider from './components/Provider';
import ProfileTabsWrapper from './components/ProfileTabsWrapper';
import UsersTable from './components/UsersTable';

import { RootState } from '@/store';

export function Component() {
	const { role } = useSelector((state: RootState) => state.session);

	return (
		<section className='md:py-10'>
			<Provider>
				<ProfileTabsWrapper />
			</Provider>
			{(role?.role === 'admin' || role?.role === 'moderator') && <UsersTable />}
		</section>
	);
}
