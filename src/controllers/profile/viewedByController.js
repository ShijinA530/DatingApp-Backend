import UserModel from "../../models/user.model.js";

export const viewedBy = async (req, res) => {
    try {
        // Find the user
        const user = await UserModel.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Check if the user has already been viewed
        const alreadyViewed = user.viewedBy.some(u => u.toString() === req.params.id);

        if (alreadyViewed) {
            return res.status(400).json({
                success: false,
                message: "User has already been viewed"
            });
        }

        // Update the viewedBy list
        const updatedUser = await UserModel.findByIdAndUpdate(
            req.user._id,
            { $push: { viewedBy: req.params.id } },
            { new: true }
        );

        console.log(updatedUser);
        

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: updatedUser
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
