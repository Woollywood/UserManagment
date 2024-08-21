import { useCallback, useEffect, useState } from 'react';
import { User } from '@nextui-org/user';
import { Chip } from '@nextui-org/chip';
import { Tooltip } from '@nextui-org/tooltip';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from '@nextui-org/table';

import Skeleton from './Skeleton';
import { columns, ColumnUId } from './model';

import { supabase } from '@/supabase';
import { Database } from '@/types/supabase';
import { EditIcon, DeleteIcon, EyeIcon } from '@/components/icons';

export default function UsersTable() {
	const [isLoading, setLoading] = useState(true);
	const [users, setUsers] = useState<Database['public']['Tables']['profiles']['Row'][]>([]);

	useEffect(() => {
		async function getProfiles() {
			const { data } = await supabase.from('profiles').select('*');

			setUsers(data!);
			setLoading(false);
		}
		getProfiles();
	}, []);

	const renderCell = useCallback((user: Database['public']['Tables']['profiles']['Row'], columnKey: ColumnUId) => {
		switch (columnKey) {
			case 'name':
				return (
					<User
						avatarProps={{ radius: 'lg', src: user.avatar_url! }}
						description={user.email}
						name={user.username}>
						{user.email}
					</User>
				);
			case 'role':
				return (
					<div className='flex flex-col'>
						<p className='text-bold text-sm capitalize'>CEO</p>
						<p className='text-bold text-sm capitalize text-default-400'>Management</p>
					</div>
				);
			case 'status':
				return (
					<Chip className='capitalize' color='success' size='sm' variant='flat'>
						active
					</Chip>
				);
			case 'actions':
				return (
					<div className='relative flex items-center gap-2'>
						<Tooltip content='Details'>
							<span className='cursor-pointer text-lg text-default-400 active:opacity-50'>
								<EyeIcon />
							</span>
						</Tooltip>
						<Tooltip content='Edit user'>
							<span className='cursor-pointer text-lg text-default-400 active:opacity-50'>
								<EditIcon />
							</span>
						</Tooltip>
						<Tooltip color='danger' content='Delete user'>
							<span className='cursor-pointer text-lg text-danger active:opacity-50'>
								<DeleteIcon />
							</span>
						</Tooltip>
					</div>
				);
			default:
				throw new Error('unknown column');
		}
	}, []);

	return (
		<>
			{isLoading ? (
				<Skeleton />
			) : (
				<Table aria-label='Example table with custom cells'>
					<TableHeader columns={columns}>
						{(column) => (
							<TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
								{column.name}
							</TableColumn>
						)}
					</TableHeader>
					<TableBody items={users}>
						{(item) => (
							<TableRow key={item.id}>
								{(columnKey) => <TableCell>{renderCell(item, columnKey as ColumnUId)}</TableCell>}
							</TableRow>
						)}
					</TableBody>
				</Table>
			)}
		</>
	);
}
