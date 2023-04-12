export class ApiResponse<T> {
    code?: number
    status?: string;
    copyright?: string;
    attributionText: string = ''
    attributionHTML: string = '';
    data?: Data<T>;
    etag?: string;
}

export class Data<T> {
    count?: number;
    limit?: number;
    offset?: number;
    results?: T;
    total?: number;
}

export class ApiRequest {
    nameStartsWith?: string;
    offset?: number;
}