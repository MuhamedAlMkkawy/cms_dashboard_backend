import { ObjectId } from "mongodb";
import { Pages } from "src/pages/entities/pages.entities";
export declare class Projects {
    _id: ObjectId;
    logo: string;
    name: string;
    description: string;
    visible: boolean;
    languages: string[];
    pages: Pages[];
}
