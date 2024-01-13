import { useAppHeader } from "@components/AppHeader/AppHeader.config";
import LayoutWrapper from "@components/ContentWrapper";
import {
	FilterFilledIcon,
	FilterIcon,
	PlusIcon,
	SearchIcon,
} from "@components/Icons";
import { TRootNavigator } from "@custom-types/navigation";
import { TTodoListItem } from "@custom-types/todo.types";
import TodoListItemsQuery from "@hooks/query/todoListItem/useTodoListItems";
import { useDebounce } from "@hooks/useDebounce";
import useRefreshOnFocus from "@hooks/useRefreshOnFocus";
import { useAppSelector } from "@store/index";
import {
	Divider,
	Input,
	List,
	TopNavigationAction,
} from "@ui-kitten/components";
import React, { useMemo, useState } from "react";
import { ListRenderItemInfo, StyleSheet, View } from "react-native";
import ListDetailItem from "./components/ListDetailItem";

type TNav = TRootNavigator<"ListDetail">;

export type ListDetailProps = TNav & {};

const ListDetail: React.FC<ListDetailProps> = ({ navigation, route }) => {
	const { id } = route.params;

	const [search, setSearch] = useState("");
	const debouncedSearch = useDebounce(search);
	const statusFilter = useAppSelector((state) => state.app.statusFilter);
	const filterEnabled = statusFilter !== "all";

	const { data, refetch } = TodoListItemsQuery.useQuery({ listId: id });
	useRefreshOnFocus(refetch);

	const filteredData = useMemo(() => {
		const searched = data?.filter((x) => x.name.includes(debouncedSearch));
		switch (statusFilter) {
			case "all": {
				return searched;
			}
			case "active": {
				return searched?.filter((x) => x.completed === false);
			}
			case "finished": {
				return searched?.filter((x) => x.completed === true);
			}
		}
	}, [debouncedSearch, statusFilter, data]);

	useAppHeader(
		{
			title: "Todo's",
			showDivider: false,
			accessoryRight: () => (
				<>
					<TopNavigationAction
						icon={PlusIcon}
						onPress={() => navigation.push("AddTodo", { id: id })}
					/>
					<TopNavigationAction
						icon={filterEnabled ? FilterFilledIcon : FilterIcon}
						onPress={() => navigation.push("TodoFilter")}
					/>
				</>
			),
		},
		[navigation, filterEnabled]
	);

	const _renderItem = React.useCallback(
		({ item }: ListRenderItemInfo<TTodoListItem>) => (
			<ListDetailItem item={item} />
		),
		[navigation]
	);

	return (
		<LayoutWrapper>
			<View style={styles.search}>
				<Input
					value={search}
					placeholder="Vyhľadávanie"
					accessoryLeft={SearchIcon}
					onChangeText={(nextValue) => setSearch(nextValue)}
				/>
			</View>
			<Divider />
			<List
				data={filteredData}
				renderItem={_renderItem}
				ItemSeparatorComponent={() => <View style={styles.divider} />}
				contentContainerStyle={styles.contentContainer}
			/>
		</LayoutWrapper>
	);
};

const styles = StyleSheet.create({
	search: { padding: 16 },
	divider: { height: 4 },
	contentContainer: { padding: 4 },
});

export default React.memo(ListDetail);
