import { RootStackParamList } from "@custom-types/navigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddList from "@screens/AddList";
import AddTodo from "@screens/AddTodo";
import Home from "@screens/Home";
import ListDetail from "@screens/ListDetail";
import TodoFilter from "@screens/TodoFilter";
import React from "react";

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
	return (
		<Navigator>
			<Screen
				name="Home"
				component={Home}
				options={{ headerBackVisible: false }}
			/>
			<Screen
				name="AddList"
				component={AddList}
				options={{ presentation: "modal" }}
			/>
			<Screen name="ListDetail" component={ListDetail} />
			<Screen
				name="AddTodo"
				component={AddTodo}
				options={{ presentation: "modal" }}
			/>
			<Screen
				name="TodoFilter"
				component={TodoFilter}
				options={{ presentation: "modal" }}
			/>
		</Navigator>
	);
};

export default React.memo(RootNavigator);
