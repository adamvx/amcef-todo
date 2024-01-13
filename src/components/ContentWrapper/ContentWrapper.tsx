import { Layout } from "@ui-kitten/components";
import React from "react";
import { SafeAreaView } from "react-native";

export type ContentWrapperProps = {
	children: React.ReactNode;
};

const LayoutWrapper: React.FC<ContentWrapperProps> = ({ children }) => {
	return (
		<Layout level="1" style={{ flex: 1 }}>
			<SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
		</Layout>
	);
};

export default LayoutWrapper;
