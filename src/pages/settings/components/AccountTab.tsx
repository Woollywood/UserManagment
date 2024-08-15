import { Input } from '@nextui-org/input';
import { UseFormRegister } from 'react-hook-form';

import { FormData } from '../index';

import { Database } from '@/types/supabase';

interface Props {
	profile: Database['public']['Tables']['profiles']['Row'];
	isUpdating: boolean;
	register: UseFormRegister<FormData>;
}

export default function AccountTab({ profile, register, isUpdating }: Props) {
	return (
		<div className='grid grid-cols-2 gap-6'>
			<div className='space-y-6'>
				<Input
					disabled
					className='!grid grid-cols-[4fr_12fr]'
					defaultValue={profile.website!}
					label='Website'
					labelPlacement='outside-left'
					placeholder='https://'
					type='text'
				/>
				<Input
					disabled
					className='!grid grid-cols-[4fr_12fr]'
					defaultValue={profile.updated_at!}
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
					defaultValue={profile.id!}
					label='Account ID'
					labelPlacement='outside-left'
					type='text'
				/>
				<Input
					className='!grid grid-cols-[4fr_12fr]'
					defaultValue={profile.full_name!}
					disabled={isUpdating}
					label='Name'
					labelPlacement='outside-left'
					placeholder='Type your name'
					type='text'
					{...register('full_name')}
				/>
			</div>
		</div>
	);
}
