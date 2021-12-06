export class CommercialTemplateContact{
    commercial_template_contact_id : number;
    commercial_template_id : number;
    name : string;
    last_name : string;
    document_number : string;
    phone_number : string;
    email : string;
    contact_type : number;
    register_user_id : number;
    register_user_fullname : string;
    register_datetime : Date;
    update_user_id : number;
    update_user_fullname : string;
    update_datetime : Date;
    state: number;
}

export class CommercialTemplateContactFindAll {
    item1: Array<CommercialTemplateContact>;
    item2: number;
}