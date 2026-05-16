import Product from '../models/productModel.js';

const escapeRegex = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const buildProductFilter = (query = {}) => {
  const { category, gender, keyword, featured } = query;
  const filter = {};

  if (gender) {
    filter.gender = String(gender).toLowerCase().trim();
  }

  if (category) {
    const slug = String(category).toLowerCase().trim();
    const pattern = slug.replace(/-/g, '[\\s-]*');
    filter.category = new RegExp(`^${pattern}$`, 'i');
  }

  if (keyword) {
    const trimmed = String(keyword).trim();
    if (trimmed) {
      const regex = new RegExp(escapeRegex(trimmed), 'i');
      filter.$or = [{ name: regex }, { category: regex }, { tags: regex }];
    }
  }

  if (featured === 'true') {
    filter.isFeatured = true;
  }

  return filter;
};

const getProducts = async (req, res) => {
  try {
    const filter = buildProductFilter(req.query);
    const { sort } = req.query;

    let query = Product.find(filter);

    if (sort === 'newest') {
      query = query.sort({ createdAt: -1 });
    }

    const products = await query.exec();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getProducts, getProductById };
