import { useCallback, useEffect, useState } from 'react'
import './App.css'

function App() {
  const [products, setProducts] = useState([])

  // Je récupère les données dans le frontend
  const fetchProducts = useCallback(async () => {
    const response = await fetch('http://localhost:3000/')
    const data = await response.json()
    if(data && data.products) {
      setProducts(data.products)
    }
  })

  // Initialiser les données du back au chargement de l'app
  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <>
      <div className="movies">
        <h1>Liste des produits</h1>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <h2>{product.title}</h2>
              <p>{product.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
