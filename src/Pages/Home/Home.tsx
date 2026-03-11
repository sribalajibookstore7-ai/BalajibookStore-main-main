// Home.tsx
import { useEffect, useState } from "react";
import { getProductsAPI } from "../../services/api";
import { ProductCard } from "../../components/Product/ProductCard";
import { Banner } from '../../components/Banner/Banner';
import type { Product } from "../../types/types";

function Home() {
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [skip, setSkip] = useState<number>(0);
  const limit: number = 12;
  const [total, setTotal] = useState<number>(0); // total de produtos para paginação

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError("");

      try {
        const response = await getProductsAPI(limit, skip);
        setProdutos(response.products);
        setTotal(response.total || 0); // se API retorna total de produtos
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
        setError("Erro ao buscar produtos. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [skip]);

  return (
    <section className="w-full h-full flex flex-col items-center justify-center">
      <Banner/>
      <div className="text-center p-6">
        <h2 className="gradient-hover text-4xl font-bold p-2">Navegue pelos itens que estão em nosso estoque!</h2>
      </div>
      <div className="container p-4 mb-4 w-full max-w-7xl">
        {error && <p className="text-red-600 mb-4">{error}</p>}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading
            ? Array.from({ length: limit }).map((_, i) => <ProductCard key={i} />)
            : produtos.map((produto) => <ProductCard key={produto.id} produto={produto} />)
          }
        </div>
      </div>

      <div className="p-6 gap-4 flex w-full justify-center items-center">
        <button
          onClick={() => setSkip((prev) => Math.max(prev - limit, 0))}
          disabled={skip === 0 || loading}
          className="p-2 bg-blue-500 text-white rounded cursor-pointer duration-500 ease-in-out transition
          disabled:opacity-50 disabled:pointer-events-none disabled:pointer-none:
          hover:bg-blue-600"
        >
          Anterior
        </button>
        <button
          onClick={() => setSkip((prev) => prev + limit)}
          disabled={skip + limit >= total || loading}
          className="
          p-2 bg-blue-500 text-white rounded cursor-pointer duration-500 ease-in-out transition
          disabled:opacity-50 disabled:pointer-events-none disabled:pointer-none:
          hover:bg-blue-600"
        >
          Próximo
        </button>
      </div>
    </section>
  );
}

export default Home;
