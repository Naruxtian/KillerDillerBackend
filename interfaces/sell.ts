import { TValidSizes, TValidType } from "./";

export interface ISellRequest {
    name: string;
    email: string;
    message: string;
    products: ISellRequestProduct[]
} 

export interface ISellRequestProduct {
    category: TValidType;
    description: string;
    size: TValidSizes;
    images: string[];
}