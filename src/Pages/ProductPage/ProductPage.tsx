import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

// Lógica de megócio
import { getProductAPI } from "../../services/api";

// Tipagem
import type { Product } from "../../types/types";

// Imagens
import leftArr from "../../assets/leftArr.png";

// Contexto
import { useCart } from "../../contexts/CartContext";

// Componentes
import ProductReviews from "../../components/Product/ProductReviews";
import ProductStockInfo from "../../components/Product/ProductStockInfo";
import ProductTags from "../../components/Product/ProductTags";
import ProductInfo from "../../components/Product/ProductInfo";

function ProductPage(){
    const { id } = useParams();
    const [produto, setProduto] = useState<Product>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const { addToCart, getProductQuantity, updateQuantity } = useCart();

    // Buscar os dados do produto pela API
    useEffect(() => {
    if (!id) return; // Segurança: se não houver id, não tenta buscar

    async function fetchProduct() {
      try {
        const data = await getProductAPI(Number(id));
        setProduto(data);
        setLoading(false);
      } catch (e) {
        setError("Erro ao buscar produto.");
        setLoading(false);
      }
    }

        fetchProduct();
    }, [id]);
    
    // Pequenas mensagens, uma para carregamento e outra para erros, respectivamente.
    if (loading) return <div className="p-8 text-4xl w-full h-dvh flex items-center justify-center">Carregando...</div>;
    if (error || !produto) return <div className="p-8 text-red-600 text-4xl w-full h-dvh flex items-center justify-center">{error}</div>;

    const quantity = getProductQuantity(produto.id);

    return(

    <section className="flex flex-col lg:flex-row gap-10 p-8 font-sans">
        {/* Esquerda: Imagem */}
        <div className="w-full lg:w-1/2 flex flex-col items-center ">
            <div className="flex flex-row w-96 justify-start items-center mb-2">
              <Link to="/" className="flex items-center hover:bg-gray-400 duration-500 ease-in-out transition rounded-2xl p-2 cursor-pointer">
                <img src={leftArr} alt="Left Arrow" className="w-12 h-12" />
                <p>Voltar</p>
              </Link>
            </div>
            <img src={produto.images[0]} alt={produto.title} className="w-full max-w-md border-gray-300 rounded-2xl border-2" />
        </div>

        {/* Direita: Detalhes */}
        <div className="w-full lg:w-1/2">
            {/* Tags do produto */}
            <ProductTags produto={produto} />
            {/* Informações gerais do produto (nome, descrição etc) */}
            <ProductInfo produto={produto} />
            {/* Estoque, garantia e outras informações */}
            <ProductStockInfo produto={produto} />
            
            {/* Botão de adicionar ao carrinho */}
            {/* Caso a quantidade seja 0, botão fica em um estado para adicionar ao carrinho */}
            {/* Caso contrário, é outro tipo de botão com a quantidade no carrinho de compras */}
            {quantity > 0 ? (
            <div className="mt-6 flex items-center gap-4 w-max rounded-lg border border-gray-300 px-4 py-2">
                <button
                className="text-xl font-bold px-3 opacity-60 hover:opacity-100 hover:bg-gray-200 rounded cursor-pointer duration-500 transition ease-in-out"
                onClick={() => updateQuantity(produto.id, quantity - 1)}
                >
                -
                </button>
                <span className="text-lg font-semibold">{quantity}</span>
                <button
                className="text-xl font-bold px-3 opacity-60 hover:opacity-100 hover:bg-gray-200 rounded cursor-pointer duration-500 transition ease-in-out"
                onClick={() => updateQuantity(produto.id, quantity + 1)}
                >
                +
                </button>
            </div>
            ) : (
            <button
                className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition cursor-pointer"
                onClick={() => addToCart(produto)}
            >
                Add to Cart
            </button>
            )}

            {/* Card de avaliações dos clientes */}
            <ProductReviews produto={produto} />
        </div>
    </section>
    );
}

export default ProductPage;
