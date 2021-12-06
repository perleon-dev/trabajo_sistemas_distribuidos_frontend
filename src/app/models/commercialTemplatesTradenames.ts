export class CommercialTemplateTradename {
    commercial_template_tradename_id: number;
    commercial_template_id: number;
    tradename_id: number;
    business_area_id: number;
    state: number;
    rubricName: string;
    tradeName: string;
    register_user_id: number;
    register_user_fullname: string;
    register_datetime: Date;
    update_user_id: number;
    update_user_fullname: string;
    update_datetime: Date;
}

export class CommercialTemplateTradenameFindAll {
    item1: Array<CommercialTemplateTradename>;
    item2: number;
}