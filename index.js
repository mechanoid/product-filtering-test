import express from 'express'
// import helmet from 'helmet'
import morgan from 'morgan'
import { getProductColors, getProducts } from './products.js'
import 'pug'

const app = express()
// app.use(helmet())
app.use(morgan('combined'))
app.set('view engine', 'pug')

app.use('/assets', express.static('./assets'))

const landingPage = (req, res) => {
  const { snippet = false, colors = [], from = 0 } = req.query
  const products = getProducts({ colors, from })

  if (snippet) {
    return res.render('partials/search', { products })
  }

  const availableColors = getProductColors()
  res.render('index', { availableColors, products })
}

export default config => {
  app.get('/', landingPage)
  return app
}
