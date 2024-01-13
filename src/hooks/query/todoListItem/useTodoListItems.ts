import { getAllTodoListItems } from "@api/todoListItem.api";
import { useQuery, UseQueryOptions } from "react-query";
import { createTodoListItemQueryKey } from "./todoListItem.utils";

type QParams = { listId: string };
type TQueryData = Awaited<ReturnType<typeof queryFn>>;
type TOptions = UseQueryOptions<TQueryData, unknown, TQueryData, any>;

const queryKey = (params: QParams) =>
	createTodoListItemQueryKey.list("todoListItems" as const, params);

const queryFn = async ({ listId }: QParams) => {
	const data = await getAllTodoListItems(listId);
	return data;
};

const getOptions = (params: QParams, options?: TOptions): TOptions => ({
	queryKey: queryKey(params),
	queryFn: () => queryFn(params),
	...options,
});

function useTodoListItems(params: QParams, options?: TOptions) {
	const data = useQuery(getOptions(params, options));
	return data;
}

const TodoListItemsQuery = {
	useQuery: useTodoListItems,
	getOptions,
};

export default TodoListItemsQuery;
