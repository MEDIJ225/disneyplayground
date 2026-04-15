import { Target, TextLinkVariants } from "../../models/text-link.types";
import { TextHeaderSizes } from "../wdpr-text-header/wdpr-text-header.model";
export interface ActionableListItemConfig {
    id: string;
    headerLabel: string;
    headerLeadingIcon?: string;
    preHeader?: string;
    subtextLabel?: string;
    headerSize?: TextHeaderSizes;
    linkText: string;
    linkHref: string;
    linkLeadingIcon?: string;
    linkTrailingIcon?: string;
    linkVariant?: TextLinkVariants;
    linkTarget?: Target;
    linkA11yLabel?: string;
    linkDisabled?: boolean;
    linkRel?: string;
}
