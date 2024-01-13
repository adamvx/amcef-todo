import * as Yup from "yup";

export type TAddTodoForm = {
	name: string;
	text: string;
	deadline: Date;
};

export const initialValues: TAddTodoForm = {
	name: "",
	text: "",
	deadline: new Date(),
};

export const validationSchema = Yup.object().shape({
	name: Yup.string()
		.min(2, "List musí obsahovať minimálne 2 znaky.")
		.required("Vyžadované pole"),
	text: Yup.string()
		.min(2, "List musí obsahovať minimálne 2 znaky.")
		.required("Vyžadované pole"),
	deadline: Yup.date().required("Vyžadované pole"),
});
