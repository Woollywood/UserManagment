import Provider from './components/Provider';
import ProfileTabsWrapper from './components/ProfileTabsWrapper';

export default function SettingsPage() {
	return (
		<section className='md:py-10'>
			<Provider>
				<ProfileTabsWrapper />
			</Provider>
			<div className='rounded-lg p-4 shadow-lg ring-1 ring-inset ring-content4'>Users table</div>
		</section>
	);
}
