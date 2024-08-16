import { Tabs, Tab } from '@nextui-org/tabs';

import ChangeTab from './components/ChangeTab';
import EditTab from './components/EditTab';

export default function ProfileTab() {
	return (
		<div>
			<Tabs aria-label='Tabs' className='pb-12'>
				<Tab key='edit' title='Edit profile'>
					<EditTab />
				</Tab>
				<Tab key='change' title='Change password'>
					<ChangeTab />
				</Tab>
			</Tabs>
		</div>
	);
}
