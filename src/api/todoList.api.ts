import {
	TCreateTodoList,
	TTodoList,
	TUpdateTodoList,
} from "@custom-types/todoList.types";
import coreApi from "./core.api";

export function getAllTodoList() {
	return coreApi.request<TTodoList[]>("/todo", {
		method: "GET",
	});
}

export function getTodoList(id: string) {
	return coreApi.request<TTodoList>(`/todo/${id}`, {
		method: "GET",
	});
}

export function createTodoList(data: TCreateTodoList) {
	return coreApi.request<TTodoList>(`/todo`, {
		method: "POST",
		data,
	});
}

export function updateTodoList(id: string, data: TUpdateTodoList) {
	return coreApi.request<TTodoList>(`/todo/${id}`, {
		method: "PUT",
		data,
	});
}

export function deleteTodoList(id: string) {
	return coreApi.request<TTodoList>(`/todo/${id}`, {
		method: "DELETE",
	});
}
