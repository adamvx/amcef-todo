import { updateTodoListItem } from "@api/todoListItem.api";
import { TUpdateTodoListItem } from "@custom-types/todo.types";
import { UseMutationOptions, useMutation } from "react-query";
import { createTodoListItemQueryKey } from "./todoListItem.utils";

type TMutationParams = TUpdateTodoListItem & { id: string; listId: string };
type TMutationData = Awaited<ReturnType<typeof mutationFn>>;
type TOptions = UseMutationOptions<
	TMutationData,
	unknown,
	TMutationParams,
	any
>;

const mutationKey = () =>
	createTodoListItemQueryKey.detail("updateTodoListItem" as const);

const mutationFn = async (params: TMutationParams) => {
	const data = await updateTodoListItem(params.listId, params.id, params);
	return data;
};

export const getOptions = (options?: TOptions): TOptions => ({
	mutationFn: (params) => mutationFn(params),
	mutationKey: mutationKey(),
	...options,
});

function useTodoListItemUpdate(options?: TOptions) {
	return useMutation(getOptions(options));
}

const TodoListItemUpdateMutation = {
	useMutation: useTodoListItemUpdate,
	getOptions,
};

export default TodoListItemUpdateMutation;
