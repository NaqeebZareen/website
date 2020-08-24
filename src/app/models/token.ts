import { IRefreshTokenResponseModel } from './refresh-token-response-model';

export class IToken {
    // access_token: string;
    // refresh_token: string;
    // result: IRefreshTokenResponseModel
    // error: string;
    // token_type: string;
    access_token: string;
    expires_in: string;
    refresh_token: string;
    token_type: string;
    user_id: string;
    username: string;
    status: any;
    error: any;
}
