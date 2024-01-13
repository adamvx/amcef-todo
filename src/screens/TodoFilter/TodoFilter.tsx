import { useAppHeader } from "@components/AppHeader/AppHeader.config";
import LayoutWrapper from "@components/ContentWrapper";
import { TRootNavigator } from "@custom-types/navigation";
import { TTodoStatusFilter } from "@custom-types/todo.types";
import { appActions } from "@store/app/app.slice";
import { useAppDispatch, useAppSelector } from "@store/index";
import { IndexPath, Layout, Select, SelectItem } from "@ui-kitten/components";
import React, { useCallback } from "react";

type TNav = TRootNavigator<"TodoFilter">;

export type TodoFilterProps = TNav & {};

const todoStatusIndexMap: Record<number, TTodoStatusFilter> = {
	0: "all",
	1: "active",
	2: "finished",
};

const todoStatusTextMap: Record<TTodoStatusFilter, string> = {
	all: "Všetky",
	active: "Aktívne",
	finished: "Dokončené",
};

const TodoFilter: React.FC<TodoFilterProps> = ({}) => {
	const filter = useAppSelector((state) => state.app.statusFilter);
	const dispatch = useAppDispatch();

	useAppHeader({ title: "Filter" }, []);

	const selected = new IndexPath(
		Object.values(todoStatusIndexMap).findIndex((x) => x === filter)
	);

	const onSelect = useCallback(
		(index: IndexPath) => {
			dispatch(appActions.setStatusFilter(todoStatusIndexMap[index.row]));
		},
		[dispatch]
	);

	return (
		<LayoutWrapper>
			<Layout level="2" style={{ flex: 1, padding: 16, gap: 16 }}>
				<Select
					value={todoStatusTextMap[filter]}
					selectedIndex={selected}
					onSelect={onSelect as any}
				>
					{Object.values(todoStatusIndexMap).map((x) => (
						<SelectItem key={x} title={todoStatusTextMap[x]} />
					))}
				</Select>
			</Layout>
		</LayoutWrapper>
	);
};

export default React.memo(TodoFilter);
