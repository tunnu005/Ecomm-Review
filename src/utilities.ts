import { pool } from "./dbconnection";

export const checkUser = async(userId:number)=>{
    try {
        const query = `SELECT COUNT(*) FROM users WHERE user_id = $1;`;
        const result = await pool.query(query, [userId]);
        if(result.rows[0].count === 0){
            throw new Error('User not found');
        }
    } catch (error) {
        console.error(error);
        throw new Error('User not found');
    }
}

export const checkProduct = async(productId:number)=>{
    try {
        const query = `SELECT COUNT(*) FROM product WHERE product_id = $1 `;
        const result = await pool.query(query, [productId]);
        if(result.rows[0].count === 0){
            throw new Error('Product not found');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Product not found');
    }
}