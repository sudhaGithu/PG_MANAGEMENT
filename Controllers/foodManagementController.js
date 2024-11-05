const FoodManagement = require('../Models/foodManagement');

// Create or Add Food Menu
const createFoodMenu = async (req, res) => {
    try {
        const foodMenu = new FoodManagement(req.body);
        await foodMenu.save();
        res.status(201).json({ message: 'Food menu created successfully', data: foodMenu });
    } catch (error) {
        res.status(400).json({ message: 'Error creating food menu', error });
    }
};

// Get All Food Menus
const getAllFoodMenus = async (req, res) => {
    try {
        const foodMenus = await FoodManagement.find();
        res.status(200).json(foodMenus);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving food menus', error });
    }
};

// Get Food Menu by ID
const getFoodMenuById = async (req, res) => {
    const { id } = req.params;
    try {
        const foodMenu = await FoodManagement.findById(id);
        if (!foodMenu) {
            return res.status(404).json({ message: 'Food menu not found' });
        }
        res.status(200).json(foodMenu);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving food menu', error });
    }
};

// Update Food Menu by ID
const updateFoodMenu = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedFoodMenu = await FoodManagement.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedFoodMenu) {
            return res.status(404).json({ message: 'Food menu not found' });
        }
        res.status(200).json({ message: 'Food menu updated successfully', data: updatedFoodMenu });
    } catch (error) {
        res.status(500).json({ message: 'Error updating food menu', error });
    }
};

// Delete Food Menu by ID
const deleteFoodMenu = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedFoodMenu = await FoodManagement.findByIdAndDelete(id);
        if (!deletedFoodMenu) {
            return res.status(404).json({ message: 'Food menu not found' });
        }
        res.status(200).json({ message: 'Food menu deleted successfully' });
    } catch (error) {
        res.status(500).json({ message:  error.message });
    }
};

// Add item to specific day and meal
const addItemToMeal =  async (req, res) => {
    const { id, day, meal } = req.params;
    const { item } = req.body;

    try {
        // Find the food management record
        const foodManagement = await FoodManagement.findById(id);
        if (!foodManagement) {
            return res.status(404).json({ message: 'Food management record not found' });
        }

        // Find the specified day
        const dayEntry = foodManagement.days.find(d => d.day.toLowerCase() === day.toLowerCase());
        if (!dayEntry) {
            return res.status(404).json({ message: 'Day not found' });
        }

        // Add the item to the specified meal
        if (dayEntry[meal]) {
            dayEntry[meal].items.push(item);
            await foodManagement.save();
            return res.status(200).json({ message: 'Item added successfully', foodManagement });
        } else {
            return res.status(400).json({ message: 'Invalid meal type' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

const deleteAnItem = async (req, res) => {
    const { id, day, meal } = req.params;
    const { item } = req.body;

    try {
        // Find the food management record
        const foodManagement = await FoodManagement.findById(id);
        if (!foodManagement) {
            return res.status(404).json({ message: 'Food management record not found' });
        }

        // Find the specified day
        const dayEntry = foodManagement.days.find(d => d.day.toLowerCase() === day.toLowerCase());
        if (!dayEntry) {
            return res.status(404).json({ message: 'Day not found' });
        }

        // Delete the item from the specified meal
        if (dayEntry[meal]) {
            const itemIndex = dayEntry[meal].items.indexOf(item);
            if (itemIndex > -1) {
                dayEntry[meal].items.splice(itemIndex, 1);
                await foodManagement.save();
                return res.status(200).json({ message: 'Item deleted successfully', foodManagement });
            } else {
                return res.status(404).json({ message: 'Item not found in the meal' });
            }
        } else {
            return res.status(400).json({ message: 'Invalid meal type' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status : false , message: error.message });
    }
};




module.exports = {
    createFoodMenu,
    getAllFoodMenus,
    getFoodMenuById,
    updateFoodMenu,
    deleteFoodMenu,
    addItemToMeal,
    deleteAnItem
}
