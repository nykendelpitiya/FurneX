const Design = require("../models/designModel");

// Save design
exports.saveDesign = async (req, res) => {
  try {
    const design = new Design(req.body);
    const savedDesign = await design.save();

    res.status(201).json(savedDesign);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all designs
exports.getAllDesigns = async (req, res) => {
  try {
    const designs = await Design.find().sort({ createdAt: -1 });
    res.json(designs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get design by ID
exports.getDesignById = async (req, res) => {
  try {
    const design = await Design.findById(req.params.id);

    if (!design) {
      return res.status(404).json({ message: "Design not found" });
    }

    res.json(design);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete design
exports.deleteDesign = async (req, res) => {
  try {
    const deletedDesign = await Design.findByIdAndDelete(req.params.id);

    if (!deletedDesign) {
      return res.status(404).json({ message: "Design not found" });
    }

    res.json({ message: "Design deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update design
exports.updateDesign = async (req, res) => {
  try {

    const updatedDesign = await Design.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedDesign) {
      return res.status(404).json({ message: "Design not found" });
    }

    res.json(updatedDesign);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};