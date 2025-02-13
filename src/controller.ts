import { Request, RequestHandler, Response } from "express";
import { CreateNewReview, GetAllReviewsByProduct, GetAllReviewsByStore } from "./queries";

/*
    create new review,
    get all reviews by a product,
    get all review for a store,


*/

export const CreateRewview:RequestHandler = async(req: Request, res: Response) =>{

    const userId = parseInt(req.params.userId);
    const { product_id, text, points} = req.body;

    try {
        if(!userId ||!product_id ||!text ||!points){
            res.status(400).json({ message: 'All fields are required' });
            return;
        }
        await CreateNewReview(userId,product_id,text,points)
        res.status(200).json({message : "Review created successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error});
    }

}

export const GetReviewsByProduct:RequestHandler = async(req: Request, res: Response) =>{

    const productId = parseInt(req.params.productId);
    try {
        if(!productId){
            res.status(400).json({ message: 'productId is required' });
            return;
        }
        const ProductReview = await GetAllReviewsByProduct(productId)
        res.status(200).json(ProductReview);
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export const AllReviewForProduct:RequestHandler = async(req:Request,res:Response) =>{
    const storeId = parseInt(req.params.storeId);

    try {
        if(!storeId){
            res.status(400).json({ message: 'storeId is required' });
            return;
        }
        const storeReviews = await GetAllReviewsByStore(storeId)
        res.status(200).json(storeReviews);
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}