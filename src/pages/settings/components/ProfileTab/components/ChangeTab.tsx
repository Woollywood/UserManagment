import { useState, useContext } from 'react';
import { Checkbox } from '@nextui-org/checkbox';

import { Context } from '../../Provider';

import Password from '@/components/inputs/password';

export default function ChangeTab() {
	const [isVisible, setVisible] = useState(false);
	const { form } = useContext(Context);
	const { register, watch, getValues } = form!;

	watch('newPassword');

	const newPasswordVal = getValues('newPassword') || '';
	const passwordRequirements = {
		minLength: newPasswordVal.length >= 8,
		containsCharacters: /^[\s\da-zA-ZåäöÅÄÖ&()+%/*$€é,.'"-]+$/.test(newPasswordVal),
		containsNumbers: /\d/.test(newPasswordVal),
	};

	return (
		<div className='grid grid-cols-2 items-center gap-24'>
			<div>
				<form className='space-y-6' onSubmit={(e) => e.preventDefault()}>
					<Password
						className='!grid grid-cols-[4fr_12fr]'
						isVisible={isVisible}
						label='Old password'
						labelPlacement='outside-left'
						onToggleVisible={() => setVisible((prev) => !prev)}
						{...register('oldPassword', { required: true })}
					/>
					<Password
						className='!grid grid-cols-[4fr_12fr]'
						isVisible={isVisible}
						label='New password'
						labelPlacement='outside-left'
						onToggleVisible={() => setVisible((prev) => !prev)}
						{...register('newPassword', { required: true })}
					/>
					<Password
						className='!grid grid-cols-[4fr_12fr]'
						isVisible={isVisible}
						label='Repeat new password'
						labelPlacement='outside-left'
						onToggleVisible={() => setVisible((prev) => !prev)}
						{...register('confirmPassword', { required: true })}
					/>
				</form>
			</div>
			<div>
				<h2 className='mb-2 text-3xl font-medium'>Password requirements</h2>
				<p className='mb-2 text-lg'>Your password needs to have:</p>
				<div className='space-y-2'>
					<div className='flex items-center gap-2'>
						<Checkbox isDisabled color='primary' isSelected={passwordRequirements.minLength} size='md' />
						<span>At least 8 characters</span>
					</div>
					<div className='flex items-center gap-2'>
						<Checkbox
							isDisabled
							color='primary'
							isSelected={passwordRequirements.containsNumbers}
							size='md'
						/>
						<span>At least one number</span>
					</div>
					<div className='flex items-center gap-2'>
						<Checkbox
							isDisabled
							color='primary'
							isSelected={passwordRequirements.containsCharacters}
							size='md'
						/>
						<span>At least one symbol</span>
					</div>
				</div>
			</div>
		</div>
	);
}
