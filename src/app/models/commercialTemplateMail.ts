export class CommercialTemplateMail{
    commercial_template_mail_id: number;
    commercial_template_id: number;
    email: string;
    state: number;
    register_user_id: number;
    register_user_fullname: string;
    register_datetime: Date;
    update_user_id: number;
    update_user_fullname: string;
    update_datetime: Date;
}

export class CommercialTemplateMailFindAll {
    item1: Array<CommercialTemplateMail>;
    item2: number;
}