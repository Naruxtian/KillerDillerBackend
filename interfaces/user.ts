import { ICartProduct } from "./cart";
import { ShippingAddress } from "./order";

export interface IUser {
    _id: string;
    name: string;
    email: string;
    password?: string;
    tags?: string[];
    cart?: ICartProduct[];
    wishlist?: ICartProduct[];
    address?: ShippingAddress;
    role: string;
    createdAt?: string;
    updatedAt?: string;
}