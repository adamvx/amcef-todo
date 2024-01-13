import { useFocusEffect } from "@react-navigation/native";
import React from "react";

function useRefreshOnFocus<T>(refetch: () => Promise<T> | T) {
	const enabledRef = React.useRef(false);

	useFocusEffect(
		React.useCallback(() => {
			if (enabledRef.current) {
				refetch();
			} else {
				enabledRef.current = true;
			}
		}, [refetch])
	);
}

export default useRefreshOnFocus;
