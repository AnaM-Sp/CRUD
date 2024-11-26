import { Request, Response } from "express"
import { Produto } from "../models/Produto"

export const index = async (req: Request, res:Response) =>{

    let products = await Produto.findAll()

    res.render('pages/produtos',{
        products
    })
}

export const cadastro = async (req: Request, res:Response) =>{

    res.render('pages/cadastro')
}

export const cadastroProduto = async(req:Request, res:Response) =>{
    //recebendo os dados do form via body
    let {nome, valor,quantidade} = req.body
    if(nome && valor && quantidade){
        await Produto.create({
            nome,
            valor,
            quantidade
        })
    }
    //após cadastrar vai redirecionar para a rota produtos
    res.redirect('/produtos')
}

export const editaProduto = async(req: Request, res: Response) =>{
    let {id_produtos} = req.params
    let product = await Produto.findByPk
    res.render('pages/editar',{
        product,
        id_produtos
    })

}

export const atualizaProduto = async(req: Request, res: Response) =>{
    let {id_produtos} = req.params
    let {nome,valor,quantidade} = req.body
    
    await Produto.update({
        nome,
        valor,
        quantidade
    },{
        where:{
            id_produtos:id_produtos
        }
    })
    res.redirect('/produtos')
}

export const excluiProduto = async (req: Request, res: Response) => {
    let { id_produtos } = req.params; // Obtém o ID do produto da URL

    // Utiliza o método 'destroy' para excluir o produto com o ID fornecido
    await Produto.destroy({
        where: {
            id_produtos:id_produtos
        }
    });

    // Redireciona para a página de produtos após a exclusão
    res.redirect('/produtos');
}
