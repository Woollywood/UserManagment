import { ChangeEvent, useContext, useState } from 'react';
import { Input } from '@nextui-org/input';
import { useSelector } from 'react-redux';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';

import { Context } from '../../Provider';

import AvatarSupabase from '@/components/avatar';
import { RootState } from '@/store';

export default function EditTab() {
	const { profile, session } = useSelector((state: RootState) => state.session);
	const [avatarUrlTmpUrl, setAvatarUrlTmpUrl] = useState<string | null>(null);
	const { form, isUpdating } = useContext(Context);
	const {
		formState: { errors },
		register,
		setValue,
	} = form!;

	function uploadAvatar(event: ChangeEvent<HTMLInputElement>) {
		const file = event.target.files![0];
		const fileExt = file.name.split('.').pop();
		const fileName = `${Math.random()}.${fileExt}`;
		const tempUrl = URL.createObjectURL(file);

		setValue('avatar_url', fileName);
		setValue('avatarFile', file);
		setAvatarUrlTmpUrl(tempUrl);
	}

	return (
		<div className='grid grid-cols-2 gap-6'>
			<div className='space-y-6'>
				<Input
					disabled
					className='!grid grid-cols-[4fr_12fr]'
					defaultValue={profile?.avatar_url!}
					endContent={
						<Button className='-mr-3'>
							<span>Browse...</span>
							<input
								className='absolute left-0 top-0 z-10 h-full w-full opacity-0'
								type='file'
								onChange={uploadAvatar}
							/>
						</Button>
					}
					label='Profile picture'
					labelPlacement='outside-left'
					startContent={
						<>
							{avatarUrlTmpUrl ? (
								<Avatar className='-ml-3 flex-shrink-0' radius='lg' src={avatarUrlTmpUrl} />
							) : (
								profile?.avatar_url && (
									<AvatarSupabase
										className='-ml-3 flex-shrink-0'
										radius='lg'
										src={profile.avatar_url}
									/>
								)
							)}
						</>
					}
					type='text'
				/>
				<Input
					disabled
					className='!grid grid-cols-[4fr_12fr]'
					defaultValue={session?.user.email}
					errorMessage='The field must contain at least 3 characters'
					label='E-mail address'
					labelPlacement='outside-left'
					type='text'
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
				<Input
					disabled
					className='!grid grid-cols-[4fr_12fr]'
					defaultValue={profile?.id!}
					label='Account ID'
					labelPlacement='outside-left'
					type='text'
				/>
			</div>
		</div>
	);
}
