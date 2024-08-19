import Provider from './components/Provider';
import ProfileTabsWrapper from './components/ProfileTabsWrapper';
import UsersTable from './components/UsersTable';

export function Component() {
	return (
		<section className='md:py-10'>
			<Provider>
				<ProfileTabsWrapper />
			</Provider>
			<UsersTable />
		</section>
	);
}
