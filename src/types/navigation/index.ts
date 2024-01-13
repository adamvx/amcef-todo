import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./rootStack.types";

/**------------------------------------------------------------------------
 **                       Root stack
 *------------------------------------------------------------------------**/

export type TRootNavigator<T extends keyof RootStackParamList> =
	NativeStackScreenProps<RootStackParamList, T>;

/**------------------------------------------------------------------------
 **                       Unauthorized stack
 *------------------------------------------------------------------------**/

// export type TUnauthorizedStack<T extends keyof UnauthorizedStackParamList> =
// 	CompositeScreenProps<
// 		NativeStackScreenProps<UnauthorizedStackParamList, T>,
// 		NativeStackScreenProps<RootStackParamList>
// 	>;

export { RootStackParamList };
