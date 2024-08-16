import { useContext, lazy, Suspense, ComponentType } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs, Tab } from '@nextui-org/tabs';
import { Button } from '@nextui-org/button';
import { clsx } from 'clsx';

import { Context } from './Provider';
import Preloader from './Preloader';

import { getUserProfileFromSession } from '@/stores/session';
import { RootState, AppDispatch } from '@/store';
import { title } from '@/components/primitives';
import { supabase } from '@/supabase';
import { Database } from '@/types/supabase';

const AccountTab = lazy(() => loadComponentWithDelay('./AccountTab.tsx'));
const ProfileTab = lazy(() => loadComponentWithDelay('./ProfileTab/index.tsx'));
const GeneralTab = lazy(() => loadComponentWithDelay('./GeneralTab.tsx'));

function loadComponentWithDelay(src: string): Promise<{ default: ComponentType<any> }> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(import(src));
		}, 600);
	});
}

export default function ProfileTabsWrapper() {
	const { form, isUpdating, setUpdating } = useContext(Context);
	const {
		handleSubmit,
		formState: { errors },
		register,
	} = form!;
	const dispatch = useDispatch<AppDispatch>();
	const { profile, isComplete, session } = useSelector((state: RootState) => state.session);

	const onSubmit = handleSubmit(async (formData) => {
		const { newPassword, oldPassword, confirmPassword } = formData;

		if (oldPassword || newPassword || confirmPassword) {
			if (newPassword !== confirmPassword) {
				return;
			}

			await supabase.auth.updateUser({ password: newPassword });
		}

		const { avatar_url, avatarFile } = formData;

		if (avatar_url) {
			await supabase.storage.from('avatars').upload(avatar_url, avatarFile);
		}

		const profileFormData: Database['public']['Tables']['profiles']['Row'] = {
			id: formData.id,
			updated_at: new Date().toDateString(),
			avatar_url: formData.avatar_url,
			full_name: formData.full_name,
			username: formData.username,
			website: formData.website,
		};

		setUpdating!(true);
		await supabase
			.from('profiles')
			.update({ ...profileFormData })
			.eq('id', profile?.id!)
			.select()
			.single();

		await dispatch(getUserProfileFromSession(session!));
		setUpdating!(false);
	});

	return (
		<>
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
							<Suspense fallback={<Preloader />}>
								<AccountTab
									errors={errors}
									isUpdating={isUpdating}
									profile={profile!}
									register={register}
								/>
							</Suspense>
						</Tab>
						<Tab key='profile' title='Your profile'>
							<Suspense fallback={<Preloader />}>
								<ProfileTab />
							</Suspense>
						</Tab>
						<Tab key='general' title='General settings'>
							<Suspense fallback={<Preloader />}>
								<GeneralTab />
							</Suspense>
						</Tab>
					</Tabs>
				) : (
					<Preloader />
				)}
			</div>
		</>
	);
}
