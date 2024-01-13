import { BackIcon, CloseIcon } from "@components/Icons";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import {
	Divider,
	Layout,
	TopNavigation,
	TopNavigationAction,
	TopNavigationProps,
} from "@ui-kitten/components";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native";

export type AppHeaderProps = TopNavigationProps & {
	showDivider?: boolean;
};

const AppHeader: React.FC<AppHeaderProps & NativeStackHeaderProps> = (
	props
) => {
	const {
		accessoryLeft,
		accessoryRight,
		options,
		navigation,
		showDivider = true,
		...rest
	} = props;
	const canShowBackIcon = options.headerBackVisible !== false;
	const isModal =
		options.presentation === "modal" ||
		options.presentation === "fullScreenModal";

	const LeftAction = React.useMemo(() => {
		if (accessoryLeft) {
			return accessoryLeft;
		} else {
			if (canShowBackIcon && !isModal && navigation.canGoBack()) {
				return () => (
					<TopNavigationAction icon={BackIcon} onPress={navigation.goBack} />
				);
			} else {
				return undefined;
			}
		}
	}, [accessoryLeft, options, navigation]);

	const RightAction = React.useMemo(() => {
		if (accessoryRight) {
			return accessoryRight;
		} else {
			if (canShowBackIcon && isModal && navigation.canGoBack()) {
				return () => (
					<TopNavigationAction icon={CloseIcon} onPress={navigation.goBack} />
				);
			} else {
				return undefined;
			}
		}
	}, [accessoryLeft, options, navigation]);

	return (
		<>
			<StatusBar style={isModal ? "light" : "dark"} />
			<Layout level="1">
				<SafeAreaView>
					<TopNavigation
						{...rest}
						alignment="center"
						accessoryLeft={LeftAction}
						accessoryRight={RightAction}
					/>
					{showDivider ? <Divider /> : null}
				</SafeAreaView>
			</Layout>
		</>
	);
};

export default AppHeader;
