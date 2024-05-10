const router = require("express").Router();
const inquiryModel = require("../models/inquiry");

// Route to add a new inquiry
router.route("/add").post((req, res) => {
    const { inquirycategory, inquiryprioritization, personemail, personum, personinquiry } = req.body;
    
    const newInquiry = new inquiryModel({
        inquirycategory,
        inquiryprioritization,
        personemail,
        personum,
        personinquiry,
        addedDate: new Date() // Set the addedDate field to the current date
    });

    newInquiry.save()
        .then(() => res.json("Inquiry added"))
        .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Route to get all inquiries
router.route("/").get((req, res) => {
    inquiryModel.find()
        .then((inquiries) => res.json(inquiries))
        .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Route to update inquiry details
router.route("/update/:id").put(async (req, res) => {
    const { inquirycategory, inquiryprioritization, personemail, personum, personinquiry } = req.body;
    const inquiryId = req.params.id;

    try {
        await inquiryModel.findByIdAndUpdate(inquiryId, {
            inquirycategory,
            inquiryprioritization,
            personemail,
            personum,
            personinquiry
        });
        res.json({ status: "Inquiry updated" });
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});

// Route to delete an inquiry
router.route("/delete/:id").delete(async (req, res) => {
    const inquiryId = req.params.id;

    try {
        await inquiryModel.findByIdAndDelete(inquiryId);
        res.json({ status: "Inquiry deleted" });
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});

// Route to update inquiry status
router.route("/updateStatus/:id").put(async (req, res) => {
    const { status } = req.body;
    const inquiryId = req.params.id;

    try {
        await inquiryModel.findByIdAndUpdate(inquiryId, { status });
        res.json({ status: "Inquiry status updated" });
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});

// Route to search inquiries by prioritization (case-insensitive)
router.route("/search").get((req, res) => {
    const { priority } = req.query;

    // Using a regular expression with the 'i' flag for case-insensitive search
    const priorityRegex = new RegExp(priority, 'i');

    inquiryModel.find({ inquiryprioritization: priorityRegex })
        .then((inquiries) => res.json(inquiries))
        .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Route to add a reply to an inquiry
router.route("/addReply/:id").post(async (req, res) => {
    const { user, message } = req.body;
    const inquiryId = req.params.id;

    try {
        const inquiry = await inquiryModel.findById(inquiryId);
        inquiry.replies.push({ user, message });
        await inquiry.save();
        res.json({ status: "Reply added to inquiry" });
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});

// Route to get a specific inquiry by ID
router.route("/:id").get(async (req, res) => {
    const inquiryId = req.params.id;

    try {
        const inquiry = await inquiryModel.findById(inquiryId);
        if (!inquiry) {
            // If inquiry is not found, respond with 404 status and error message
            return res.status(404).json({ error: "Inquiry not found" });
        }
        res.json(inquiry);
    } catch (err) {
        // Handle other errors
        res.status(500).json({ error: "Internal server error" });
    }
});


router.get("/categoryTypeCounts", async (req, res) => {
    try {
      const categoryTypeCounts = await inquiryModel.aggregate([
        { $group: { _id: "$inquirycategory", count: { $sum: 1 } } },
        { $project: { category: "$_id", count: 1, _id: 0 } }
      ]);
      res.json(categoryTypeCounts);
    } catch (error) {
      console.error('Error fetching category type counts:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.get("/prioritizationCounts", async (req, res) => {
    try {
      const prioritizationCounts = await inquiryModel.aggregate([
        { $group: { _id: "$inquiryprioritization", count: { $sum: 1 } } },
        { $project: { prioritization: "$_id", count: 1, _id: 0 } }
      ]);
      res.json(prioritizationCounts);
    } catch (error) {
      console.error('Error fetching prioritization counts:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.route("/review/:id").get(async (req, res) => {
    const inquiryId = req.params.id;

    try {
        const inquiry = await inquiryModel.findById(inquiryId);
        if (!inquiry) {
            // If inquiry is not found, respond with 404 status and error message
            return res.status(404).json({ error: "Inquiry not found" });
        }
        // Render the ReviewInquiry component and pass the inquiry data as props
        res.render("review", { inquiry });
    } catch (err) {
        // Handle other errors
        console.error('Error:', err);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
