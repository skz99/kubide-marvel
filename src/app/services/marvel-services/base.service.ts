import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PRIVATE_MARVEL_API_KEY, PUBLIC_MARVEL_API_KEY } from "../../common/security/auth.config";
import { ApiService } from "../api.service";
import { MD5 } from 'crypto-js';
import { ApiResponse } from "../../common/models/api.model";

@Injectable({
    providedIn: 'root'
})

export class BaseService {

    constructor(private apiService: ApiService) { }

    // Base petition where we need to hash the private and public key to obtain granted access to marvel api
    basePetition(url: string, filters?: any): Observable<ApiResponse<any>> {
        let ts = new Date().toISOString();
        const hashedMD5 = MD5(ts + PRIVATE_MARVEL_API_KEY + PUBLIC_MARVEL_API_KEY);
        let hashedUrl = `${url}?ts=${ts}&apikey=${PUBLIC_MARVEL_API_KEY}&hash=${hashedMD5}`;
        if (filters) {
            Object.keys(filters as any).forEach((filter_key: any) => {
                if (filters[filter_key]) {
                    hashedUrl += `&${filter_key}=${filters[filter_key]}`
                }

            })
        }
        return this.apiService.get(hashedUrl);
    }
}