import { createTodoList } from "@api/todoList.api";
import { TCreateTodoList } from "@custom-types/todoList.types";
import { useMutation, UseMutationOptions } from "react-query";
import { createTodoListQueryKey } from "./todoList.utils";

type TMutationParams = TCreateTodoList;
type TMutationData = Awaited<ReturnType<typeof mutationFn>>;
type TOptions = UseMutationOptions<
	TMutationData,
	unknown,
	TMutationParams,
	any
>;

const mutationKey = () =>
	createTodoListQueryKey.detail("createTodoList" as const);

const mutationFn = async (params: TMutationParams) => {
	const data = await createTodoList(params);
	return data;
};

export const getOptions = (options?: TOptions): TOptions => ({
	mutationFn: (params) => mutationFn(params),
	mutationKey: mutationKey(),
	...options,
});

function useTodoListCreate(options?: TOptions) {
	return useMutation(getOptions(options));
}

const TodoListCreateMutation = {
	useMutation: useTodoListCreate,
	getOptions,
};

export default TodoListCreateMutation;
