import { useAppHeader } from "@components/AppHeader/AppHeader.config";
import LayoutWrapper from "@components/ContentWrapper";
import { PlusIcon } from "@components/Icons";
import { TRootNavigator } from "@custom-types/navigation";
import { TTodoList } from "@custom-types/todoList.types";
import TodoListsQuery from "@hooks/query/todoList/useTodoLists";
import useRefreshOnFocus from "@hooks/useRefreshOnFocus";
import {
	Divider,
	List,
	ListItem,
	TopNavigationAction,
} from "@ui-kitten/components";
import React from "react";
import { ListRenderItemInfo } from "react-native";

type TNav = TRootNavigator<"Home">;

export type HomeProps = TNav & {};

const Home: React.FC<HomeProps> = ({ navigation }) => {
	const { data, refetch } = TodoListsQuery.useQuery();
	useRefreshOnFocus(refetch);

	useAppHeader(
		{
			title: "Zoznam Todo listov",
			accessoryRight: () => (
				<TopNavigationAction
					icon={PlusIcon}
					onPress={() => navigation.push("AddList")}
				/>
			),
		},
		[navigation]
	);

	const _renderItem = React.useCallback(
		({ item }: ListRenderItemInfo<TTodoList>) => (
			<ListItem
				title={item.name}
				onPress={() => navigation.navigate("ListDetail", { id: item.id })}
			/>
		),
		[navigation]
	);

	return (
		<LayoutWrapper>
			<List
				data={data}
				ItemSeparatorComponent={Divider}
				renderItem={_renderItem}
			/>
		</LayoutWrapper>
	);
};

export default React.memo(Home);
