import { useAppHeader } from "@components/AppHeader/AppHeader.config";
import Button from "@components/Button";
import LayoutWrapper from "@components/ContentWrapper";
import { TRootNavigator } from "@custom-types/navigation";
import TodoListCreateMutation from "@hooks/query/todoList/useTodoListCreate";
import { Divider, Input, Layout } from "@ui-kitten/components";
import { useFormik } from "formik";
import React from "react";
import { initialValues, validationSchema } from "./AddList.schema";
import { queryClient } from "@utils/reactQuery/reactQuery";
import TodoListsQuery from "@hooks/query/todoList/useTodoLists";

type TNav = TRootNavigator<"AddList">;

export type AddListProps = TNav & {};

const AddList: React.FC<AddListProps> = ({ navigation }) => {
	useAppHeader({ title: "Pridanie Todo listu" }, []);
	const { mutate: createList, isLoading } = TodoListCreateMutation.useMutation({
		onSuccess: async () => {
			await queryClient.refetchQueries(TodoListsQuery.getOptions());
			navigation.goBack();
		},
	});

	const { values, errors, handleChange, submitForm } = useFormik({
		initialValues,
		validationSchema,
		onSubmit: (v) => createList(v),
		validateOnBlur: true,
	});

	return (
		<LayoutWrapper>
			<Layout level="2" style={{ flex: 1, padding: 16 }}>
				<Input
					label="Názov Todo listu"
					placeholder="Názov sem..."
					value={values.name}
					onChangeText={handleChange("name")}
					caption={errors.name}
					status={errors.name ? "danger" : "primary"}
				/>
			</Layout>
			<Divider />
			<Layout level="1" style={{ padding: 16 }}>
				<Button onPress={submitForm} isLoading={isLoading}>
					Uložiť
				</Button>
			</Layout>
		</LayoutWrapper>
	);
};

export default React.memo(AddList);
