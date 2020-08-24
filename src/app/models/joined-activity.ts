import { IUser } from './user';

export class IJoinedActivity {
    user: IUser;
    id: string;
    IsJoined: boolean;
    activity_id: string;
    userid: string;
}
