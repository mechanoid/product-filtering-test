import faker from 'faker'

const COLOR_POOL = ['plum', 'purple', 'red', 'maroon', 'blue',
  'maroon', 'gold', 'tan', 'red', 'white']

const createProduct = () => {
  const product = {
    id: faker.random.number(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    productMaterial: faker.commerce.productMaterial(),
    productDescription: faker.commerce.productDescription(),
    image: faker.image.fashion(),
    color: faker.helpers.randomize(COLOR_POOL)
  }
  product.slug = faker.helpers.slugify(product.name)
  return product
}

const products = []

for (let i = 0; i < 200; i++) {
  products.push(createProduct())
}

export const getProducts = ({ from = 0, limit = 25, colors = [] } = {}) => {
  const filtered = (colors.length > 0
    ? products.filter(p => colors.includes(p.color))
    : products)

  if (from > filtered.length) {
    return []
  }
  return filtered.slice(from, (from + limit) % filtered.length)
}

export const getProductColors = () => [...new Set(products.map(p => p.color))]
