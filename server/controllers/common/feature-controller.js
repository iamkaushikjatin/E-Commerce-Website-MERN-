import Feature from '../../models/Feature.js'

const addFeatureImage = async(req,res)=>{
    try {
        const {image} = req.body;

        const featureImage = new Feature({image});

        await featureImage.save();

        res.status(200).json({
            success : true,
            data : featureImage
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message: "Error"
        })
        
    }
}


const getFeatureImages = async(req,res)=>{
    try {
        const images = await Feature.find({})

        res.status(200).json({
            success : true,
            data : images
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message: "Error"
        })
        
    }
}

export {addFeatureImage,getFeatureImages};