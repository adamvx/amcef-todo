type QueryKey = readonly unknown[];

type QueryKeysFactoryParams<T extends string> = { name: T };

export function queryKeysFactory<T extends string>({
	name,
}: QueryKeysFactoryParams<T>) {
	const keys = {
		all: () => [name] as const,
		/**
		 * Generate query key for all lists from given slice.
		 * Use for infinity query
		 * @returns queryKey
		 */
		lists: () => [...keys.all(), "list"] as const,
		/**
		 * Generate query key for specific list from slice.
		 * Use for infinity query
		 * @returns queryKey
		 */
		list: <TQueryKey extends QueryKey = QueryKey>(...args: TQueryKey) =>
			[...keys.lists(), ...args] as const,
		/**
		 * Generate query key for all searches from given slice.
		 * Use mostly for tables
		 * @returns queryKey
		 */
		searches: () => [...keys.all(), "search"] as const,
		/**
		 * Generate query key for specific search from slice.
		 * Use mostly for tables
		 * @returns queryKey
		 */
		search: <TQueryKey extends QueryKey = QueryKey>(...args: TQueryKey) =>
			[...keys.searches(), ...args] as const,
		/**
		 * Generate query key for all details in slice.
		 * @returns queryKey
		 */
		details: () => [...keys.all(), "detail"] as const,
		/**
		 * Generate query key for specific detail from slice.
		 * @returns queryKey
		 */
		detail: <TQueryKey extends QueryKey = QueryKey>(...args: TQueryKey) =>
			[...keys.details(), ...args] as const,
	} as const;

	return keys;
}
