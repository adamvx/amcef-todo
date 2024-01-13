import { deleteTodoListItem } from "@api/todoListItem.api";
import { UseMutationOptions, useMutation } from "react-query";
import { createTodoListItemQueryKey } from "./todoListItem.utils";

type TMutationParams = { listId: string; id: string };
type TMutationData = Awaited<ReturnType<typeof mutationFn>>;
type TOptions = UseMutationOptions<
	TMutationData,
	unknown,
	TMutationParams,
	any
>;

const mutationKey = () =>
	createTodoListItemQueryKey.detail("deleteTodoListItem" as const);

const mutationFn = async (params: TMutationParams) => {
	const data = await deleteTodoListItem(params.listId, params.id);
	return data;
};

export const getOptions = (options?: TOptions): TOptions => ({
	mutationFn: (params) => mutationFn(params),
	mutationKey: mutationKey(),
	...options,
});

function useTodoListItemDelete(options?: TOptions) {
	return useMutation(getOptions(options));
}

const TodoListItemDeleteMutation = {
	useMutation: useTodoListItemDelete,
	getOptions,
};

export default TodoListItemDeleteMutation;
