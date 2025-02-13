import { pool } from "./dbconnection";
import { checkProduct, checkUser } from "./utilities";

/*
    create new review,
    get all reviews by a product,
    get all review for a store,


*/

interface Review {
    review_id: number,
    user_id: number,
    product_id: number,
    text: string,
    points: string,
}

interface Reviewbystore {
    texts: string,
    points: string,
    store_name: string,
    productn_name: string,
}

export const CreateNewReview = async (userId: number, productId: number, text: string, points: string) => {
    try {
        await checkUser(userId);
        await checkProduct(productId);
        const query = `
        INSERT INTO "Review" ("user_id", "product_id", "text", "points")
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;

        await pool.query(query, [userId, productId, text, points]);
    } catch (error) {
        console.error(error);
        throw new Error('Error creating new review');
    }

};

export const GetAllReviewsByProduct = async (productId: number): Promise<Review[] | []> => {

    try {
        const query = `
    SELECT * FROM "Review" WHERE "product_id" = $1;
`;

        const result = await pool.query(query, [productId]);
        return result.rows;
    } catch (error) {
        console.error(error);
        throw new Error('Error getting all reviews by product');
    }
}

export const GetAllReviewsByStore = async (storeId: number): Promise<Reviewbystore[] | []> => {
    try {
        const query = `
    select r.texts , r.points, s.store_name , p.name as productn_name from 
    reviews r join product p on r.product_id = p.product_id 
    join storefronts s on p.storefront_id = s.storefront_id  
    where s.storefront_id = $1`

        const result = await pool.query(query, [storeId]);
        return result.rows;
    } catch (error) {
        console.error(error);
        throw new Error('Error getting all reviews by store');
    }
}

