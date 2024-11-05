const express = require('express');
const router = express.Router();
const Menu = require('../Models/savedMenuModel');

// CREATE a new menu with multiple days and meals
const addMenu = async (req, res) => {
    try {
        const newMenu = new Menu(req.body);
        await newMenu.save();
        res.status(201).json(newMenu);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// READ all menu items (optionally filter by day or mealType within nested documents)
const getMenus = async (req, res) => {
    try {
        const { day, mealType } = req.query;
        const filter = {};

        if (day) filter['days.day'] = day;
        if (mealType) filter['days.meals.mealType'] = mealType;

        const menus = await Menu.find(filter);
        res.json(menus);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// READ a specific menu item by ID
const getMenuById = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.id);
        if (!menu) return res.status(404).json({ error: 'Menu not found' });
        res.json(menu);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE a menu's specific day and meal item
const updateMenu = async (req, res) => {
    const { day, mealType } = req.body;
    const updateData = req.body.updateData;

    try {
        const menu = await Menu.findOneAndUpdate(
            { "days.day": day, "days.meals.mealType": mealType },
            { $set: { "days.$[day].meals.$[meal]": updateData } },
            {
                arrayFilters: [
                    { "day.day": day },
                    { "meal.mealType": mealType }
                ],
                new: true
            }
        );

        if (!menu) return res.status(404).json({ error: 'Menu not found for specified day and mealType' });

        res.json(menu);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// DELETE a menu item by ID
const deleteMenu = async (req, res) => {
    try {
        const deletedMenu = await Menu.findByIdAndDelete(req.params.id);
        if (!deletedMenu) return res.status(404).json({ error: 'Menu not found' });
        res.json({ message: 'Menu deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add an item to the items array based on day and mealType
const addItem = async (req, res) => {
    const { day, mealType } = req.params;
    const { item } = req.body;

    if (!item) {
        return res.status(400).json({ error: 'Item is required' });
    }

    try {
        const menu = await Menu.findOneAndUpdate(
            { "days.day": day, "days.meals.mealType": mealType },
            { $addToSet: { "days.$[day].meals.$[meal].items": item } },
            {
                arrayFilters: [
                    { "day.day": day },
                    { "meal.mealType": mealType }
                ],
                new: true
            }
        );

        if (!menu) return res.status(404).json({ error: 'Menu not found for specified day and mealType' });

        res.json(menu);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Remove an item from the items array based on day and mealType
const removeItem = async (req, res) => {
    const { day, mealType } = req.params;
    const { item } = req.body;

    if (!item) {
        return res.status(400).json({ error: 'Item is required' });
    }

    try {
        const menu = await Menu.findOneAndUpdate(
            { "days.day": day, "days.meals.mealType": mealType },
            { $pull: { "days.$[day].meals.$[meal].items": item } },
            {
                arrayFilters: [
                    { "day.day": day },
                    { "meal.mealType": mealType }
                ],
                new: true
            }
        );

        if (!menu) return res.status(404).json({ error: 'Menu not found for specified day and mealType' });

        res.json(menu);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    addItem,
    addMenu,
    deleteMenu,
    getMenuById,
    getMenus,
    updateMenu,
    removeItem
};
