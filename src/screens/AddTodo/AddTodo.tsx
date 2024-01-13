import { useAppHeader } from "@components/AppHeader/AppHeader.config";
import LayoutWrapper from "@components/ContentWrapper";
import { TRootNavigator } from "@custom-types/navigation";
import TodoListItemCreateMutation from "@hooks/query/todoListItem/useTodoListItemCreate";
import { Datepicker, Divider, Input, Layout } from "@ui-kitten/components";
import { useFormik } from "formik";
import React from "react";
import { initialValues, validationSchema } from "./AddTodo.schema";
import Button from "@components/Button";
import { queryClient } from "@utils/reactQuery/reactQuery";
import TodoListItemsQuery from "@hooks/query/todoListItem/useTodoListItems";
import { StyleSheet } from "react-native";

type TNav = TRootNavigator<"AddTodo">;

export type AddTodoProps = TNav & {};

const AddTodo: React.FC<AddTodoProps> = ({ navigation, route }) => {
	const { id } = route.params;
	useAppHeader({ title: "Pridanie Todo" }, []);

	const { mutate: createTodo, isLoading } =
		TodoListItemCreateMutation.useMutation({
			onSuccess: async (item) => {
				await queryClient.refetchQueries(
					TodoListItemsQuery.getOptions({ listId: item.todoId })
				);
				navigation.goBack();
			},
		});

	const { values, errors, setFieldValue, handleChange, submitForm } = useFormik(
		{
			initialValues,
			validationSchema,
			onSubmit: (v) => createTodo({ ...v, completed: false, todoId: id }),
			validateOnBlur: true,
		}
	);

	return (
		<LayoutWrapper>
			<Layout level="2" style={styles.container}>
				<Input
					label="Názov Todo"
					placeholder="Názov sem..."
					value={values.name}
					onChangeText={handleChange("name")}
					caption={errors.name}
					status={errors.name ? "danger" : "primary"}
				/>
				<Input
					label="Popis"
					placeholder="Popis sem..."
					value={values.text}
					onChangeText={handleChange("text")}
					caption={errors.text}
					status={errors.text ? "danger" : "primary"}
					multiline
				/>
				<Datepicker
					label="Deadline"
					placeholder="Deadline sem..."
					date={values.deadline}
					onSelect={(date) => setFieldValue("deadline", date)}
					status={errors.deadline ? "danger" : "primary"}
				/>
			</Layout>
			<Divider />
			<Layout level="1" style={styles.saveWrapper}>
				<Button onPress={submitForm} isLoading={isLoading}>
					Uložiť
				</Button>
			</Layout>
		</LayoutWrapper>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16, gap: 16 },
	saveWrapper: { padding: 16 },
});

export default React.memo(AddTodo);
