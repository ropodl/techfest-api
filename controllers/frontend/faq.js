const FaqSchema = require("../../models/faq");
const { paginate } = require("../../utils/paginate");

exports.faqs = async (req, res) => {
  const paginatedFaq = await paginate(
    FaqSchema,
    1,
    0,
    { status: "Published" },
    { createdAt: "-1" }
  );
  const faqs = await Promise.all(
    paginatedFaq.documents.map(async (faq) => {
      const { id, title, content } = faq;
      return {
        id,
        title,
        content,
      };
    })
  );
  // Response
  res.json(faqs);
};
