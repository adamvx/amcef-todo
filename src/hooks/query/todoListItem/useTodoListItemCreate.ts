import { createTodoListItem } from "@api/todoListItem.api";
import { TCreateTodoListItem } from "@custom-types/todo.types";
import { useMutation, UseMutationOptions } from "react-query";
import { createTodoListItemQueryKey } from "./todoListItem.utils";

type TMutationParams = TCreateTodoListItem;
type TMutationData = Awaited<ReturnType<typeof mutationFn>>;
type TOptions = UseMutationOptions<
	TMutationData,
	unknown,
	TMutationParams,
	any
>;

const mutationKey = () =>
	createTodoListItemQueryKey.detail("createTodoListItem" as const);

const mutationFn = async (params: TMutationParams) => {
	const data = await createTodoListItem(params.todoId, params);
	return data;
};

export const getOptions = (options?: TOptions): TOptions => ({
	mutationFn: (params) => mutationFn(params),
	mutationKey: mutationKey(),
	...options,
});

function useTodoListItemCreate(options?: TOptions) {
	return useMutation(getOptions(options));
}

const TodoListItemCreateMutation = {
	useMutation: useTodoListItemCreate,
	getOptions,
};

export default TodoListItemCreateMutation;
