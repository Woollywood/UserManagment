import { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';

import { Database } from '@/types/supabase';

export type FormData = {
	oldPassword: string;
	newPassword: string;
	confirmPassword: string;
	avatarFile: Blob;
} & Database['public']['Tables']['profiles']['Row'];

interface IContext {
	isUpdating: boolean;
	setUpdating: Dispatch<SetStateAction<boolean>> | null;
	form: UseFormReturn<FormData> | null;
}
export const Context = createContext<IContext>({
	isUpdating: false,
	setUpdating: null,
	form: null,
});

export default function Provider({ children }: { children: ReactNode }) {
	const [isUpdating, setUpdating] = useState(false);
	const form = useForm<FormData>();
	const value = { isUpdating, setUpdating, form };

	return <Context.Provider value={value}>{children}</Context.Provider>;
}
