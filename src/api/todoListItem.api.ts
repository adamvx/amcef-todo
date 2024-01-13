import {
	TCreateTodoListItem,
	TTodoListItem,
	TUpdateTodoListItem,
} from "@custom-types/todo.types";
import coreApi from "./core.api";

export function getAllTodoListItems(listId: string) {
	return coreApi.request<TTodoListItem[]>(`/todo/${listId}/item`, {
		method: "GET",
	});
}

export function getTodoListItem(listId: string, id: string) {
	return coreApi.request<TTodoListItem>(`/todo/${listId}/item/${id}`, {
		method: "GET",
	});
}

export function createTodoListItem(listId: string, data: TCreateTodoListItem) {
	return coreApi.request<TTodoListItem>(`/todo/${listId}/item`, {
		method: "POST",
		data,
	});
}

export function updateTodoListItem(
	listId: string,
	id: string,
	data: TUpdateTodoListItem
) {
	return coreApi.request<TTodoListItem>(`/todo/${listId}/item/${id}`, {
		method: "PUT",
		data,
	});
}

export function deleteTodoListItem(listId: string, id: string) {
	return coreApi.request<TTodoListItem>(`/todo/${listId}/item/${id}`, {
		method: "DELETE",
	});
}
