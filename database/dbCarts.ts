import { isValidObjectId } from "mongoose";
import { ICart } from "../interfaces";
import { Cart } from "../models";
import { db } from "./";

export const getCartById = async (id: string): Promise<ICart | null> => {
    if (!isValidObjectId(id)) {
        return null;
    }

    await db.connect();
    const cart = await Cart.findById(id).populate('products', '_id title slug images price discount size gender isSold');
    await db.disconnect();

    if (!cart) {
        return null;
    }

    return JSON.parse(JSON.stringify(cart));
};