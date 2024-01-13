import { Icon, IconElement } from "@ui-kitten/components";
import { ImageProps } from "react-native";

export const BackIcon = (props?: Partial<ImageProps>): IconElement => (
	<Icon {...props} name="arrow-back" />
);

export const PlusIcon = (props?: Partial<ImageProps>): IconElement => (
	<Icon {...props} name="plus-circle-outline" />
);

export const CloseIcon = (props?: Partial<ImageProps>): IconElement => (
	<Icon {...props} name="close-outline" />
);

export const FilterIcon = (props?: Partial<ImageProps>): IconElement => (
	<Icon {...props} name="funnel-outline" />
);

export const FilterFilledIcon = (props?: Partial<ImageProps>): IconElement => (
	<Icon {...props} name="funnel" />
);

export const SearchIcon = (props?: Partial<ImageProps>): IconElement => (
	<Icon {...props} name="search-outline" />
);
