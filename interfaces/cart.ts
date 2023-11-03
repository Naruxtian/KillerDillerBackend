import { TValidSizes } from './';

export interface ICart {
    _id: string;
    products: ICartProduct[];
    user: string;
}

export interface ICartProduct {
    _id: string;
    title: string;
    slug: string;
    image: string;
    price: number;
    discount: number;
    size: TValidSizes;
    gender: 'hombres'|'mujeres'|'niños'|'unisex';
    isSold: boolean;

    images?: string[];
};