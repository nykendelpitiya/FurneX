const express = require("express");
const router = express.Router();

const {
	saveDesign,
	getAllDesigns,
	getDesignById,
	deleteDesign,
	updateDesign
} = require("../controllers/designController");




router.post("/designs", saveDesign);
router.get("/designs", getAllDesigns);
router.get("/designs/:id", getDesignById);
router.put("/designs/:id", updateDesign);
router.delete("/designs/:id", deleteDesign);

module.exports = router;