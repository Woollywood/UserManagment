import { useContext } from 'react';
import { Input } from '@nextui-org/input';
import { useSelector } from 'react-redux';

import { Context } from './Provider';

import { RootState } from '@/store';

export default function AccountTab() {
	const { profile } = useSelector((state: RootState) => state.session);
	const { form, isUpdating } = useContext(Context);
	const {
		formState: { errors },
		register,
	} = form!;

	return (
		<div className='grid grid-cols-2 gap-6'>
			<div className='space-y-6'>
				<Input
					className='!grid grid-cols-[4fr_12fr]'
					defaultValue={profile?.website!}
					disabled={isUpdating}
					label='Website'
					labelPlacement='outside-left'
					placeholder='https://'
					type='text'
					{...register('website')}
				/>
				<Input
					disabled
					className='!grid grid-cols-[4fr_12fr]'
					defaultValue={profile?.updated_at!}
					label='Updated'
					labelPlacement='outside-left'
					placeholder='never'
					type='text'
				/>
			</div>
			<div className='space-y-6'>
				<Input
					disabled
					className='!grid grid-cols-[4fr_12fr]'
					defaultValue={profile?.id!}
					label='Account ID'
					labelPlacement='outside-left'
					type='text'
				/>
				<Input
					className='!grid grid-cols-[4fr_12fr]'
					defaultValue={profile?.full_name!}
					disabled={isUpdating}
					errorMessage='The field must contain at least 3 characters'
					isInvalid={!!errors.full_name}
					label='Name'
					labelPlacement='outside-left'
					placeholder='Type your name'
					type='text'
					{...register('full_name', { required: true, minLength: 3 })}
				/>
			</div>
		</div>
	);
}
