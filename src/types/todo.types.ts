export type TTodoStatusFilter = "active" | "finished" | "all";

export type TTodoListItem = {
	id: string;
	todoId: string;
	name: string;
	text: string;
	deadline: Date;
	completed: boolean;
};

export type TCreateTodoListItem = {
	todoId: string;
	name: string;
	text: string;
	deadline: Date;
	completed: boolean;
};

export type TUpdateTodoListItem = Partial<TCreateTodoListItem>;
