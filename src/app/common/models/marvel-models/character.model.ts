import { Thumbnail } from "./thumbnail.model";

export class Character {
    id?: number;
    name?: string;
    description?: string;
    modified?: string;
    resourceURI?: string;
    thumbnail?: Thumbnail;
}