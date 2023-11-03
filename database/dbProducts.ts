import { db } from "./";
import { IProduct } from "../interfaces";
import { Product } from "../models";

interface ProductSlug {
    slug: string;
}


export const getProductBySlug = async(slug: string): Promise<IProduct | null> => {
    await db.connect();

    const product = await Product.findOne({ slug }).populate('information').lean();

    await db.disconnect();

    if (!product) {
        return null;
    }

    return JSON.parse(JSON.stringify(product));
}


export const getAllProductSlugs = async(): Promise<ProductSlug[]> => {
    await db.connect();
    const slugs = await Product.find().select('slug -_id').lean();
    await db.disconnect();

    return slugs;
}

export const getProductsByTerm = async(term: string): Promise<IProduct[]> => {
    term = term.toString().toLowerCase();

    await db.connect();
    const products = await Product.find({ $text: { $search: term } }).select(
        '_id title size gender images price discount isSold slug description category colors brand'
    ).lean().populate('brand').populate('colors');
    await db.disconnect();

    return products;
}

export const getAllProducts = async (): Promise<IProduct[]> => {
    await db.connect();
    const products = await Product.find().lean();
    await db.disconnect();

    return JSON.parse(JSON.stringify(products));
}

export const getAllProductTags = async () => {
    await db.connect();
    const tags = await Product.find().select('tags -_id').lean();
    await db.disconnect();

    return JSON.parse(JSON.stringify(tags));
}
