import { getAllTodoListItems, getTodoListItem } from "@api/todoListItem.api";
import { useQuery, UseQueryOptions } from "react-query";
import { createTodoListItemQueryKey } from "./todoListItem.utils";

type QParams = { listId: string; id: string };
type TQueryData = Awaited<ReturnType<typeof queryFn>>;
type TOptions = UseQueryOptions<TQueryData, unknown, TQueryData, any>;

const queryKey = (params: QParams) =>
	createTodoListItemQueryKey.list("todoListItem" as const, params);

const queryFn = async ({ listId, id }: QParams) => {
	const data = await getTodoListItem(listId, id);
	return data;
};

const getOptions = (params: QParams, options?: TOptions): TOptions => ({
	queryKey: queryKey(params),
	queryFn: () => queryFn(params),
	...options,
});

function useTodoListItem(params: QParams, options?: TOptions) {
	const data = useQuery(getOptions(params, options));
	return data;
}

const TodoListItemQuery = {
	useQuery: useTodoListItem,
	getOptions,
};

export default TodoListItemQuery;
