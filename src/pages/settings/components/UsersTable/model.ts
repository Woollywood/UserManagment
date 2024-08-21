export type ColumnUId = 'name' | 'role' | 'status' | 'actions';
export interface ColumnField {
	name: string;
	uid: ColumnUId;
}

export const statusColorMap = {
	active: 'success',
	paused: 'danger',
	vacation: 'warning',
};

export const columns: ColumnField[] = [
	{ name: 'NAME', uid: 'name' },
	{ name: 'ROLE', uid: 'role' },
	{ name: 'STATUS', uid: 'status' },
	{ name: 'ACTIONS', uid: 'actions' },
];
