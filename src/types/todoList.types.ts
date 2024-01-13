export type TTodoList = {
	id: string;
	name: string;
};

export type TCreateTodoList = {
	name: string;
};

export type TUpdateTodoList = Partial<TCreateTodoList>;
