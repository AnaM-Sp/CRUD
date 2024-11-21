import { Request, Response } from "express"
import { Produto } from "../models/Produto"

export const index = async (req: Request, res:Response) =>{
    res.render('pages/produtos')
}