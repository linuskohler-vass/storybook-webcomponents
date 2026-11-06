/**
 * Browser-only entrypoint: registers all custom elements.
 *
 * Importing this module is safe in any environment — outside the browser
 * (e.g. during SSR in Next.js) it is a no-op, since `customElements`
 * does not exist and the element classes fall back to a plain base class.
 */
import { LikoButton } from "./components/atoms/LikoButton.js";
import { LikoFlipCard } from "./components/atoms/LikoFlipCard.js";
import { LikoStackCard } from "./components/atoms/LikoStackCard.js";
import { LikoTag } from "./components/atoms/LikoTag.js";
import { LikoButtonList } from "./components/molecules/LikoButtonList.js";
import { LikoCard } from "./components/molecules/LikoCard.js";
import { LikoFilterBar } from "./components/molecules/LikoFilterBar.js";
import { LikoHeader } from "./components/molecules/LikoHeader.js";
import { LikoMetaList } from "./components/molecules/LikoMetaList.js";
import { LikoCardFilter } from "./components/organisms/LikoCardFilter.js";
import { LikoCardGrid } from "./components/organisms/LikoCardGrid.js";
import { LikoCardStack } from "./components/organisms/LikoCardStack.js";
import { LikoFlipCardGrid } from "./components/organisms/LikoFlipCardGrid.js";
import { LikoCardGridPage } from "./components/pages/LikoCardGridPage.js";
import { LikoHomePage } from "./components/pages/LikoHomePage.js";
import { LikoPage } from "./components/pages/LikoPage.js";
import { LikoProjectDetail } from "./components/pages/LikoProjectDetail.js";

const ELEMENTS = {
    "liko-button": LikoButton,
    "liko-flip-card": LikoFlipCard,
    "liko-stack-card": LikoStackCard,
    "liko-tag": LikoTag,
    "liko-button-list": LikoButtonList,
    "liko-card": LikoCard,
    "liko-filter-bar": LikoFilterBar,
    "liko-header": LikoHeader,
    "liko-meta-list": LikoMetaList,
    "liko-card-filter": LikoCardFilter,
    "liko-card-grid": LikoCardGrid,
    "liko-card-stack": LikoCardStack,
    "liko-flip-card-grid": LikoFlipCardGrid,
    "liko-card-grid-page": LikoCardGridPage,
    "liko-home-page": LikoHomePage,
    "liko-page": LikoPage,
    "liko-project-detail": LikoProjectDetail,
};

export const registerComponents = () => {
    if (typeof customElements === "undefined") return;
    for (const [name, ctor] of Object.entries(ELEMENTS)) {
        if (!customElements.get(name)) {
            customElements.define(name, ctor);
        }
    }
};

registerComponents();
