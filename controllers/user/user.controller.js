import User from '../../models/User.model.js';
import Application from '../../models/Application.model.js';

// Todo: Fix issue with find application by id for a user and the edit

//create application
export const createApplicationController = async(req, res) => {
    try {
        // const { userId } = req.params;
        const { username, name, sectors, termsOfService } = req.body;

        const user = await User.findOne({ username })
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Create the Application
        const application = await Application.create({
            username: user._id,
            name,
            sectors,
            termsOfService,
        });

        await application.save()

        user.applications.push(application);
        await user.save();

        res.status(201).json({
            message: 'Application added successfully',
            application
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: 'Error creating application'
        });
    }
};


// Get all applications for a user
export const getAllApplicationsForUserController = async(req, res) => {
    try {
        const { username } = req.params;

        const user = await User.findOne({ username }).populate('applications');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({
            applications: user.applications
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: 'Error fetching applications for the user'
        });
    }
};

// get one application by id for a specific user
export const getApplicationByIdForUserController = async(req, res) => {
    try {
        const { username, applicationId } = req.params;

        // find user by username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Find the application by ID within the user's applications array
        const application = user.applications.find(app => app._id.toString() === applicationId);

        if (!application) {
            return res.status(404).json({ message: 'Application not found for this user' });
        }

        res.status(200).json({ application });

        // res.status(200).json({ application });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: 'Error fetching user application by ID'
        });
    }
};

// edit application by id for a specific user
export const editApplicationByUserController = async(req, res) => {
    try {
        const { username, applicationId } = req.params;
        const updatedApplicationData = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Find the application by ID within the user's applications array
        const applicationToUpdate = user.applications.find(app => app._id.toString() === applicationId);

        if (!applicationToUpdate) {
            return res.status(404).json({ message: 'Application not found for this user' });
        }

        const application = user.applications.find(app => app._id.toString() === applicationId);
        if (!application) {
            return res.status(404).json({ error: 'Application not found for the user' });
        }

        // Update the application data
        Object.assign(applicationToUpdate, updatedApplicationData);

        // Save the user (with updated application)
        await user.save();

        // update the application in the application schema
        const updatedApplication = await Application.findByIdAndUpdate(
            applicationId,
            updatedApplicationData, { new: true }
        );

        if (!updatedApplication) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.status(200).json({
            message: 'Application updated successfully',
            application: updatedApplication,
        });

    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: 'Error updating user application'
        });
    }
};