var express = require('express');
var router = express.Router();
const expressAsyncHandler = require('express-async-handler');
const Recent = require('../modals/recentModel');
const protect = require('../middleware/authmiddleware');
const Crop = require('../modals/recentCropModel');

// For storing searched crop names
router.post('/store_crop_name', protect, expressAsyncHandler(async (req, res, next) => {
    try {
        const searchExist = await Crop.findOne({Crop:req.body.cropname})
        if(!searchExist){
            const search = new Recent({
                user : req.id,
                crop : req.body.cropname,
            })
            await search.save();
            res.send({data:search});
        }
        else{
            throw new Error("Crop name exist")
        }
    } catch (error) {
        throw new Error("Crop already exists");
    }
}))

// Form submit to store info of soil 
router.post('/submit', protect, expressAsyncHandler(async (req, res, next) => {
    try {
        const { nitrogen, phosphorous, potassium, temperature, humidity, rainfall, ph } = req.body;
        const newCropInfo = new Recent({
            user: req.id,
            Nitrogen: req.body.nitrogen,
            Phosphorous: req.body.phosphorous,
            Potassium: req.body.potassium,
            Temperature: req.body.temperature,
            Humidity: req.body.humidity,
            Rainfall: req.body.rainfall,
            Ph: req.body.ph
        });
        await newCropInfo.save();

        res.status(201).send({ message: 'Soil information stored successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}));

router.get('/recent_crop', protect, expressAsyncHandler(async (req, res, next) => {
    try {
        const recentCrop = await Recent.find({ user: req.id }).select('crop').exec();
        res.status(200).send({ recentCrop });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}))

router.get('/recent_soil', protect, expressAsyncHandler(async (req, res, next) => {
    try {
        const recentSearch = await Recent.find({ user: req.id }).select('-crop').exec();
        res.status(200).send({ recentSearch });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}))

module.exports = router;