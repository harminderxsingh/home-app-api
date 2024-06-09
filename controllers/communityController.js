const { Community } = require("../models");


const getCommunities = async (req, res) => {
  try {
    const communities = await Community.findAll();
    res.json(communities);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching communities', error: err.message });
  }
};

module.exports = { getCommunities };
