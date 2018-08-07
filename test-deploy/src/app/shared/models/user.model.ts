export class User {
    public id: string; //
    public avatar: string; //
    public first_name: string; //
    public last_name: string; //
    public sex: number; //
    public birthday: string; // 
    public email: string; //
    public phone: string; //
    public skype: string; //
    public address: string; //
    public degree: number; //
    public verification: number; //
    public authorization: number; //
    public career?: string;
    public date_registered?: string;
    public status?: string;
}

export class LoginRequestModel {
    public email: string;
    public password: string;
}

export class LoginResponseModel {
    public status: string;
    public id: string;
}

export class GetUserInfoRequest {
    public id: string;
}

export class GetUserByAuth {
    public authorization: string;
}
