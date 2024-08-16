import { useState } from 'react';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { useSelector } from 'react-redux';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/modal';
import { useForm } from 'react-hook-form';

import { supabase } from '@/supabase';
import { RootState } from '@/store';

type FormData = {
	email: string;
};

export default function EmailField() {
	const [isUpdated, setUpdated] = useState(false);
	const [isUpdating, setUpdating] = useState(false);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const { session } = useSelector((state: RootState) => state.session);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormData>();
	const onSubmit = handleSubmit(async ({ email }) => {
		setUpdating(true);
		await supabase.auth.updateUser({
			email,
		});
		setUpdating(false);
		setUpdated(true);
	});

	const onCloseHandler = ({ onClose }: { onClose: () => void }) => {
		setUpdated(false);
		reset();
		onClose();
	};

	return (
		<>
			<Input
				disabled
				className='!grid grid-cols-[4fr_12fr]'
				defaultValue={session?.user.email}
				endContent={
					<Button className='-mr-3' onClick={onOpen}>
						Change
					</Button>
				}
				errorMessage='The field must contain at least 3 characters'
				label='E-mail address'
				labelPlacement='outside-left'
				type='text'
			/>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className='flex flex-col gap-1'>Email change</ModalHeader>
							{isUpdated ? (
								<>
									<ModalBody>
										<p className='text-2xl font-medium'>
											A confirmation email has been sent to your email
										</p>
									</ModalBody>
									<ModalFooter>
										<Button
											color='danger'
											variant='light'
											onPress={() => onCloseHandler({ onClose })}>
											close
										</Button>
									</ModalFooter>
								</>
							) : (
								<>
									<ModalBody>
										<Input
											errorMessage='Please enter a valid email'
											isInvalid={!!errors.email}
											label='E-mail address'
											placeholder='Enter your new email address'
											type='email'
											{...register('email', {
												required: true,
												pattern:
													/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
											})}
										/>
									</ModalBody>
									<ModalFooter>
										<Button
											color='danger'
											variant='light'
											onPress={() => onCloseHandler({ onClose })}>
											Close
										</Button>
										<Button color='primary' onPress={() => onSubmit()}>
											{isUpdating ? 'Updating' : 'Submit'}
										</Button>
									</ModalFooter>
								</>
							)}
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
