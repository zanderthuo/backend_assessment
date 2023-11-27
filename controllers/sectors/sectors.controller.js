import Sector from '../../models/Sectors.model.js';

export const getAllSectorsController = async(req, res, next) => {
    try {
        const sectors = await Sector.find();
        // if query successfully send status code is 200
        res.status(200).json(sectors);
    } catch (error) {
        // if any error return send status code 500
        res.status(500).json(error)
    }
}