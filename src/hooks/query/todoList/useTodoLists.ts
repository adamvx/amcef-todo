import { useQuery, UseQueryOptions } from "react-query";
import { createTodoListQueryKey } from "./todoList.utils";
import { getAllTodoList } from "@api/todoList.api";

type QParams = {};
type TQueryData = Awaited<ReturnType<typeof queryFn>>;
type TOptions = UseQueryOptions<TQueryData, unknown, TQueryData, any>;

const queryKey = (params: QParams) =>
	createTodoListQueryKey.list("todoLists" as const, params);

const queryFn = async (_: QParams) => {
	const data = await getAllTodoList();
	return data;
};

const getOptions = (params: QParams = {}, options?: TOptions): TOptions => ({
	queryKey: queryKey(params),
	queryFn: () => queryFn(params),
	...options,
});

function useTodoLists(params: QParams = {}, options?: TOptions) {
	const data = useQuery(getOptions(params, options));
	return data;
}

const TodoListsQuery = {
	useQuery: useTodoLists,
	getOptions,
};

export default TodoListsQuery;
