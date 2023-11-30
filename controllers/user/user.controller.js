import User from '../../models/User.model.js';
import Application from '../../models/Application.model.js';
import Sector from '../../models/Sectors.model.js';

export const createApplicationController = async(req, res) => {
    try {
        const { name, sectors, termsOfService } = req.body;

        // Find the sector by its name to get its corresponding ID
        const sector = await Sector.findOne({
            $or: [
                { 'categories.subcategories.name': sectors },
                { 'categories.subcategories.subsubcategories.name': sectors },
                { 'categories.subcategories.subsubcategories.subsubsubcategories.name': sectors }
            ]
        });

        if (!sector) {
            return res.status(404).json({
                message: 'Sector not found',
            });
        }

        // Extract the subcategory, subsubcategory, or subsubsubcategory object matching the sectors
        let foundSubcategory = null;

        sector.categories.forEach(category => {
            if (!foundSubcategory) {
                category.subcategories.forEach(sub => {
                    if (!foundSubcategory && sub.name === sectors) {
                        foundSubcategory = sub;
                    } else if (sub.subsubcategories) {
                        sub.subsubcategories.forEach(subsub => {
                            if (!foundSubcategory && subsub.name === sectors) {
                                foundSubcategory = subsub;
                            } else if (subsub.subsubsubcategories) {
                                subsub.subsubsubcategories.forEach(subsubsub => {
                                    if (!foundSubcategory && subsubsub.name === sectors) {
                                        foundSubcategory = subsubsub;
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });

        if (!foundSubcategory) {
            return res.status(404).json({
                message: 'Subcategory not found',
            });
        }

        const sectorId = foundSubcategory._id; // Extracted sector ID

        // Create the Application with the sector ID and name
        const application = await Application.create({
            name,
            sectors: {
                id: sectorId,
                name: sectors // Storing the sector name as well
            },
            termsOfService,
        });

        await application.save();

        res.status(201).json({
            message: 'Application added successfully',
            application,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: 'Error creating application',
        });
    }
};




// Get All Applications
export const getAllApplicationsController = async(req, res, next) => {
    try {
        const applications = await Application.find();
        // if query successfully send status code is 200
        res.status(200).json(applications);
    } catch (error) {
        // if any error return send status code 500
        res.status(500).json(error)
    }
}

export const getApplicationsByIdController = async(req, res, next) => {
    try {
        const application = await Application.findById(req.params.id);
        // if query successfully send status code is 200
        res.status(200).json(application);
    } catch (err) {
        // if any error return send status code 500
        next(err)
    }
}

// Function to get the sector ID by name
const getSectorIdByName = async(sectorName) => {
    const sector = await Sector.findOne({ name: sectorName });
    return sector ? sector._id : null;
};


// update application
export const updateApplicationController = async(req, res) => {
    try {
        const applicationId = req.params.applicationId;
        const updateFields = req.body;

        // Check if the request contains the sector name to update
        const { sectorName, ...otherUpdateFields } = updateFields;

        let updatedApplication = null;

        if (sectorName) {
            // Get the sector ID based on the provided sector name
            const sectorId = await getSectorIdByName(sectorName);

            if (!sectorId) {
                return res.status(404).json({ message: 'Sector not found' });
            }

            // Update the sector ID along with other fields
            const updatedFields = {
                ...otherUpdateFields,
                sector: {
                    id: sectorId,
                    name: sectorName,
                },
            };

            // Find the Application by ID and update the fields
            updatedApplication = await Application.findByIdAndUpdate(
                applicationId,
                updatedFields, {
                    new: true, // To return the updated application
                    runValidators: true, // To run schema validation on update
                }
            );
        } else {
            // If no sector update is required, update other fields directly
            updatedApplication = await Application.findByIdAndUpdate(
                applicationId,
                otherUpdateFields, {
                    new: true,
                    runValidators: true,
                }
            );
        }

        if (!updatedApplication) {
            return res.status(404).json({ message: 'App not found' });
        }

        res.status(200).json({
            message: 'Application Edited successfully',
            updatedApplication,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};