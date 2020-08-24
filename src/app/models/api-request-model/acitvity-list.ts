export class IActivityRequestBody {
    title: string;
    city: string[][];
    user_id: string;
    categories: any[] = [];
    date_range: string[] = [];
    records_per_page: number;
    page_no: number;
    is_new_api: boolean;
}
