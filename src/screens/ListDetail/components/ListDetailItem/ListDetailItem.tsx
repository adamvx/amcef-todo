import Button from "@components/Button";
import { TTodoListItem } from "@custom-types/todo.types";
import TodoListItemDeleteMutation from "@hooks/query/todoListItem/useTodoListItemDelete";
import TodoListItemUpdateMutation from "@hooks/query/todoListItem/useTodoListItemUpdate";
import TodoListItemsQuery from "@hooks/query/todoListItem/useTodoListItems";
import { Card, Text } from "@ui-kitten/components";
import { queryClient } from "@utils/reactQuery/reactQuery";
import dayjs from "dayjs";
import React from "react";
import { View } from "react-native";

export type ListDetailItemProps = {
	item: TTodoListItem;
};

const ListDetailItem: React.FC<ListDetailItemProps> = ({ item }) => {
	const { mutate: deleteItem, isLoading: isDeleteLoading } =
		TodoListItemDeleteMutation.useMutation({
			onSuccess: async (item) => {
				await queryClient.refetchQueries(
					TodoListItemsQuery.getOptions({ listId: item.todoId })
				);
			},
		});

	const { mutate: updateItem, isLoading: isUpdateLoading } =
		TodoListItemUpdateMutation.useMutation({
			onSuccess: async (item) => {
				await queryClient.refetchQueries(
					TodoListItemsQuery.getOptions({ listId: item.todoId })
				);
			},
		});

	return (
		<Card
			header={(props) => (
				<View {...props}>
					<Text category="h6">{item.name}</Text>
					<Text category="s1">
						Deadline: {dayjs(item.deadline).format("DD.MM.YYYY")}
					</Text>
					<Text>Dokončené: {item.completed ? "Áno" : "Nie"}</Text>
				</View>
			)}
			footer={(props) => (
				<View
					{...props}
					style={[
						props?.style,
						{ flexDirection: "row", justifyContent: "flex-end", gap: 4 },
					]}
				>
					{item.completed ? null : (
						<Button
							size="small"
							status="primary"
							isLoading={isUpdateLoading}
							onPress={() =>
								updateItem({
									listId: item.todoId,
									id: item.id,
									completed: true,
								})
							}
						>
							DOKONČIŤ
						</Button>
					)}

					<Button
						size="small"
						status="danger"
						isLoading={isDeleteLoading}
						onPress={() => deleteItem({ listId: item.todoId, id: item.id })}
					>
						VYMAZAŤ
					</Button>
				</View>
			)}
		>
			<View style={{ gap: 4 }}>
				<Text category="s1">Description:</Text>
				<Text>{item.text}</Text>
			</View>
		</Card>
	);
};

export default React.memo(ListDetailItem);
