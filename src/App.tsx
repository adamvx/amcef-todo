import * as eva from "@eva-design/eva";
import RootNavigator from "@navigators/RootNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { Provider as ReduxProvider } from "react-redux";
import store from "./store";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@utils/reactQuery/reactQuery";

export default function App() {
	return (
		<>
			<IconRegistry icons={EvaIconsPack} />
			<ApplicationProvider {...eva} theme={eva.light}>
				<ReduxProvider store={store}>
					<QueryClientProvider client={queryClient}>
						<NavigationContainer>
							<RootNavigator />
						</NavigationContainer>
					</QueryClientProvider>
				</ReduxProvider>
			</ApplicationProvider>
		</>
	);
}
