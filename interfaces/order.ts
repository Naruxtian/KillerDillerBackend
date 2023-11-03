import { IUser, TValidSizes } from './';

export interface IOrder {
    _id?: string;
    user?: IUser | string;
    orderItems: IOrderItem[];
    shippingAddress: ShippingAddress;
    paymentMethod?: string;

    numberOfItems: number;
    subtotal: number;
    discount: number;
    total: number;
    
    isPaid: boolean;
    transactionId?: string;
    paidAt?: string;

    createdAt?: string;
    updatedAt?: string;
};

export interface IOrderItem {
    _id: string;
    title: string;
    size: TValidSizes;
    slug: string;
    image: string;
    price: number;
    discount: number;
    gender: string;
};

export interface ShippingAddress {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    zipCode: string;
    city: string;
    country: string;
    phone: string;
}