const TagScheme = require("../models/tag.js");

exports.create = async(req,res)=>{
  const {title,description,slug} = req.body;

  const tag = new TagScheme({title,description,slug});

  await tag.save();

  res.json({success:true,tag:{title,description,slug}})
};



exports.latest = async (req, res) => {
    const result = await TagScheme.find().sort({ createdAt: "-1" }).limit(10);
    const tags = result.map((tag) => {
        const { id,title, description, slug } = tag;
        return {
          id,  title, description, slug
        };
    });
    res.json(tags);
}
