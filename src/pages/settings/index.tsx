import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs, Tab } from '@nextui-org/tabs';
import { Button } from '@nextui-org/button';
import { clsx } from 'clsx';
import { useForm } from 'react-hook-form';

import AccountTab from './components/AccountTab';
import Preloader from './components/Preloader';

import { getUserProfileFromSession } from '@/stores/session';
import { Database } from '@/types/supabase';
import { RootState, AppDispatch } from '@/store';
import { title } from '@/components/primitives';
import { supabase } from '@/supabase';

export type FormData = Database['public']['Tables']['profiles']['Row'];

export default function SettingsPage() {
	const [isUpdating, setUpdating] = useState(false);
	const dispatch = useDispatch<AppDispatch>();
	const { profile, isComplete, session } = useSelector((state: RootState) => state.session);

	const { register, handleSubmit } = useForm<FormData>();
	const onSubmit = handleSubmit(async (formData) => {
		setUpdating(true);
		await supabase
			.from('profiles')
			.update({ ...formData })
			.eq('id', profile?.id!)
			.select()
			.single();

		await dispatch(getUserProfileFromSession(session!));
		setUpdating(false);
	});

	return (
		<section className='md:py-10'>
			<div className='flex items-start justify-between'>
				<h1 className={clsx(title(), 'mb-12 !block')}>Profile settings</h1>
				<Button disabled={isUpdating} onClick={onSubmit}>
					{isUpdating ? 'Updating' : 'Save Changes'}
				</Button>
			</div>
			<div className='mb-12 rounded-lg p-4 shadow-lg ring-1 ring-inset ring-content4'>
				{isComplete ? (
					<Tabs aria-label='Tabs' className='pb-12'>
						<Tab key='account' title='Account'>
							<AccountTab isUpdating={isUpdating} profile={profile!} register={register} />
						</Tab>
						<Tab key='profile' title='Your profile'>
							tab 2
						</Tab>
						<Tab key='general' title='General settings'>
							tab 3
						</Tab>
					</Tabs>
				) : (
					<Preloader />
				)}
			</div>
			<div className='rounded-lg p-4 shadow-lg ring-1 ring-inset ring-content4'>Users table</div>
		</section>
	);
}
