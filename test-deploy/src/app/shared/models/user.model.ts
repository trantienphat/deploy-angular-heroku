export class User {
    public id: string;
    public avatar: string;
    public first_name: string;
    public last_name: string;
    public sex: number;
    public birthday: string;
    public email: string;
    public phone: string;
    public skype: string;
    public address: string;
    public degree: number;
    public verification: number;
    public authorization: number;
    public career?: string;
    public date_registered?: string;
    public status?: string;
    public degree_name?: string;

    constructor(data?: any) {
        if (!data) {return;}
        this.id = data.id;
        this.avatar = data.avatar;
        this.first_name = data.first_name;
        this.last_name = data.last_name;
        this.sex = data.sex;
        this.birthday = data.birthday;
        this.email = data.email;
        this.phone = data.phone;
        this.skype = data.skype;
        this.address = data.address;
        this.degree = data.degree;
        this.verification = data.verification;
        this.authorization = data.authorization;
        this.career = data.career;
        this.date_registered = data.date_registered;
        this.status = data.status;
        this.degree_name = data.degree_name;
    }
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

export class CheckOldPasswordRequest {
    public id: string;
    public oldPassword: string;
}

export class CheckOldPasswordResponse {
    public status: string;
}
// Model new password for change
export class ChangePasswordRequest {
    public id: string;
    public password: string;
}

export class ChangePasswordResponse {
    public status: string;
}

export class BannedRequest {
    public id: string;
    public authorization: string;
}

export class BannedResponse {
    public status: string;
}

export class ChangeVerificationRequest {
    public id: string;
    public verification: string;
}

export class ChangeVerificationResponse {
    public status: string;
}
