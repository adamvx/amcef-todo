import * as Yup from "yup";

export type TAddTodoListForm = {
	name: string;
};

export const initialValues: TAddTodoListForm = {
	name: "",
};

export const validationSchema = Yup.object().shape({
	name: Yup.string()
		.min(2, "List musí obsahovať minimálne 2 znaky.")
		.required("Vyžadované pole"),
});
