export class VerificationDocument {
    public id: string;
    public user_id: string;
    public verification_document_type_id: string;
    public card_number: string;
    public img_front_side: string;
    public img_back_side: string;
    public verification: string;

    constructor(data?: any) {
        if (!data) { return; }
        this.id = data.id;
        this.user_id = data.user_id;
        this.verification_document_type_id = data.verification_document_type_id;
        this.card_number = data.card_number;
        this.img_back_side = data.img_back_side;
        this.img_front_side = data.img_front_side;
        this.verification = data.verification;
    }
}

export class GetVerificationDocumentUserRequest {
    public user_id: string;
}
