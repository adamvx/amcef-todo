import {
	NativeStackNavigationOptions,
	NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import AppHeader, { AppHeaderProps } from "./AppHeader";
import { useNavigation } from "@react-navigation/native";
import React from "react";

export const createBaseStackHeaderConfig = (
	props: AppHeaderProps
): NativeStackNavigationOptions => {
	return {
		header: (p) => <AppHeader {...p} {...props} />,
	};
};

export const useAppHeader = <T extends NativeStackNavigationProp<any>>(
	props: AppHeaderProps,
	deps: React.DependencyList
) => {
	const { setOptions } = useNavigation<T>();
	React.useEffect(
		() => setOptions(createBaseStackHeaderConfig(props)),
		[props, setOptions, deps]
	);
};
