import { IBrand, IColor, IInformation } from "./";

export interface IProduct {
    _id: string;
    title: string;
    slug: string;
    description: string;
    information: IInformation[];
    category: string;
    gender: 'hombres'|'mujeres'|'niños'|'unisex';
    price: number;
    discount: number;
    images: string[];
    brand: IBrand;
    colors: IColor[];
    size: string;
    fit?: TValidFit;
    internalCondition: number;
    externalCondition: number;
    tags: string[];
    isSold: boolean;
    createdAt?: string;
    updatedAt?: string;
};

export type TValidSizes = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL'|'unitalla';
export type TValidFit = 'skinny'|'slim'|'regular'|'loose'|'oversize';
export type TValidType = 'playeras'|'pantalones'|'tops'|'vestidos'|'conjuntos'|'sudaderas'|'chamarras'|'abrigos'|'gorros'|'zapatos'|'accesorios'|'otros';