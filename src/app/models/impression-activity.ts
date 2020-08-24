import { IUser } from './user';


export interface ImpressionActivity {
    user: IUser,
    id: string,
    IsJoined: boolean,
    activity_id: string,
    userid: string,
}

