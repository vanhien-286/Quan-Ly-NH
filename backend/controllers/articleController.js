const articleService = require("../services/articleService");

exports.getAllArticles = async (req, res) => {
  try {
    const result = await articleService.getAllArticles();
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getArticleById = async (req, res) => {
  try {
    const result = await articleService.getArticleById(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.createArticle = async (req, res) => {
  try {
    const result = await articleService.createArticle(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const result = await articleService.updateArticle(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const result = await articleService.deleteArticle(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
