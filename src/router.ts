import { Router } from "express";
import { AllReviewForProduct, CreateRewview, GetReviewsByProduct } from "./controller";


const router: Router = Router();

router.post('/createreview',CreateRewview)

router.get('/getreviewbyproduct',GetReviewsByProduct)

router.get('/storereview',AllReviewForProduct)


export default router