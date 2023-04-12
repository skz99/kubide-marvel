import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BASE_URI, PRIVATE_MARVEL_API_KEY, PUBLIC_MARVEL_API_KEY } from "../../common/security/auth.config";
import { ApiService } from "../api.service";
import { MD5 } from 'crypto-js';
import { ApiRequest, ApiResponse } from "../../common/models/api.model";
import { Character } from "src/app/common/models/marvel-models/character.model";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root'
})

export class CharacterService {

    constructor(private baseService: BaseService) { }

    // Get marvel characters
    getCharacters(request?: ApiRequest): Observable<ApiResponse<Character[]>> {
        const url = BASE_URI + 'characters';
        return this.baseService.basePetition(url, request);
    }
}