import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from '@nextui-org/table';
import { Skeleton } from '@nextui-org/skeleton';

import { columns, ColumnUId } from './model';

function generateEmptyArray(length: number): { id: number }[] {
	return Array(length)
		.fill(null)
		.reduce((acc, item, index) => [...acc, { ...item, id: index }], []);
}

export default function SkeletonWrapper() {
	console.log(generateEmptyArray(10));

	return (
		<Table aria-label='Example table with custom cells'>
			<TableHeader columns={columns}>
				{(column) => (
					<TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody items={generateEmptyArray(10)}>
				{(item) => (
					<TableRow key={item.id}>
						{() => (
							<TableCell>
								<Skeleton className='rounded-3xl'>
									<div className='h-8 rounded-lg bg-default-300' />
								</Skeleton>
							</TableCell>
						)}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
