const ProductModel= require("../models/product");
exports.createProduct = async(req,res)=>{
    try{
    const {title,description,price,imgUrl}=req.body;
    let newProduct = new ProductModel({
        title,
        description,
        price,
        imgUrl,
    });
newProduct=await newProduct.save();//this function saves the new product in the database.
res.status(200).json(newProduct);// res is actually the response to be send to the user.
    }
catch(e){
    res.status(500).json({error:e.message});
    
}
};
exports.product = async(req,res)=>{
try{
const products = await ProductModel.find();//this function finds all the products present in our database
res.status(200).json(products);
}catch(e){
    res.status(500).json({error:e.message});

}
}
exports.singleProduct = async(req,res)=>{
    try{
    const singleProduct = req.params.id;//req is used to get the information from the user.
    
    const oneProduct = await ProductModel.findById(singleProduct);//this function finds a  particular product with the Id
    if(!oneProduct){
        return res.status(404).json({message:`No such product found`});
    }
    res.status(200).json(oneProduct);
     
    }
    catch(e){
        res.status(500).json({error:e.message});
    
    }
}
exports.deleteProduct = async(req,res)=>{
    try{
       const productId = req.params.id;
       const deleteProduct = await ProductModel.findByIdAndDelete(productId);//this function takes the product Id s the argument and deletes it 
       res.status(200).json({message:`Product with id ${productId} deleted successfully!`}); 
    }
    catch(e){
        res.status(500).json({error:e.message});
    
    }
}
exports.updateProduct = async(req,res)=>{
    try{
        const {title,description,price,imgUrl}=req.body;
        const id= req.params.id;//while updating a product it is very important to get the id from the user.
        let newProduct = new ProductModel({
            title,
            description,
            price,
            imgUrl,
            _id:id
        });
        newProduct = await ProductModel.findByIdAndUpdate(id,newProduct);//this function takes two arguments one is the id nd the other is the updated productModel.
        res.status(200).json({message:"Updated model"});

}
catch(e){
    res.status(500).json({error:e.message});

}
}