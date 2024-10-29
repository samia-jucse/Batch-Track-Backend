const BatchModel = require("../Model/BatchModel");

const updateBatch  = async (req,res) =>{
    const batchId = req.headers['batch-id'];
  
    const {name,email,password} = req.body;
    
    try{
        const batch = await BatchModel.findByPk(batchId);
        if(batch){
            const updateBatch = BatchModel.update({
                name:name,
                email:email,
                password:password
            },{where:{id:batchId}})
            return res.status(200).json({message:"Update successful.",data:updateBatch});
        }
        return res.status(404).json({message:"Batch not found."});
    }catch(e){
        return res.status(500).json({message:e});
    }
}

module.exports = {updateBatch};