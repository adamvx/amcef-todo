import React from "react";
import { View } from "react-native";
import {
	Button as KittenButton,
	ButtonProps as KittenButtonProps,
	Spinner,
} from "@ui-kitten/components";

export type ButtonProps = KittenButtonProps & {
	isLoading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ isLoading, children, ...rest }) => {
	return (
		<KittenButton {...rest} appearance="outline">
			{isLoading ? (
				<View>
					<Spinner size="tiny" status={rest.status || "primary"} />
				</View>
			) : (
				children
			)}
		</KittenButton>
	);
};

export default Button;
