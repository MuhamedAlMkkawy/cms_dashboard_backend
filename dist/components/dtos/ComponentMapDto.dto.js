"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentDtoMap = void 0;
const Accordion_dto_1 = require("./fields/Accordion.dto");
const Buttons_dto_1 = require("./fields/Buttons.dto");
const CardSliderDto_dto_1 = require("./fields/CardSliderDto.dto");
const CustomHtml_dto_1 = require("./fields/CustomHtml.dto");
const LogoDto_dto_1 = require("./fields/LogoDto.dto");
const MenuDto_dto_1 = require("./fields/MenuDto.dto");
const SocialFields_dto_1 = require("./fields/SocialFields.dto");
const TabsDto_dto_1 = require("./fields/TabsDto.dto");
const Timeline_dto_1 = require("./fields/Timeline.dto");
exports.componentDtoMap = {
    logo: LogoDto_dto_1.LogoFieldsDto,
    timeline: Timeline_dto_1.TimelineFieldsDto,
    'card-slider': CardSliderDto_dto_1.CardSliderDto,
    'nav-menu': MenuDto_dto_1.MenuContentDto,
    'custom-html': CustomHtml_dto_1.CustomHtmlDto,
    buttons: Buttons_dto_1.ButtonsFieldsDto,
    accordion: Accordion_dto_1.AccordionFieldsDto,
    'social-media': SocialFields_dto_1.SocialMediaFieldsDto,
    tabs: TabsDto_dto_1.TabsFieldsDto,
};
//# sourceMappingURL=ComponentMapDto.dto.js.map