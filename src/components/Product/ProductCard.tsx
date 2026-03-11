import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import type { Product } from "../../types/types";
import { useNavigate } from "react-router";
import { useCart } from "../../contexts/CartContext";
import { FaShoppingCart } from "react-icons/fa";

interface ProductCardProps {
  produto?: Product;
  adicionarAoCarrinho?: (produto: Product) => void;
}

export function ProductCard({ produto }: ProductCardProps) {

  const { addToCart, getProductQuantity, updateQuantity } = useCart();
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (produto) {
      navigate(`/product/${produto.id}`);
    }
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    if (produto) {
      addToCart(produto);
    }
    e.stopPropagation();
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (produto) {
      updateQuantity(produto.id, getProductQuantity(produto.id) + 1);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (produto) {
      const current = getProductQuantity(produto.id);
      if (current > 1) {
        updateQuantity(produto.id, current - 1);
      } else {
        updateQuantity(produto.id, 0); // remover se chegar a 0
      }
    }
  };

  if (!produto) {
    return (
      <div className="p-4 rounded shadow animate-pulse">
        <Skeleton height={30} width={`80%`} />
        <Skeleton height={320} />
        <Skeleton height={20} width={100} />
        <Skeleton height={40} width={120} />
      </div>
    );
  }

  const quantity = getProductQuantity(produto.id);

  return (
    <div
      key={produto.id}
      onClick={handleCardClick}
      className="
        p-6 rounded shadow cursor-pointer bg-gray-300 flex-wrap justify-between flex flex-col
        hover:transition hover:duration-700 hover:ease-in-out hover:bg-gray-400"
    >
      <div>
        <h3 className="font-bold mb-2">{produto.title}</h3>
        <img
          src={produto.images[0]}
          alt={produto.title}
          className="w-full h-80 object-contain mb-2 rounded"
        />
      </div>

      <div className="flex p-2 justify-between items-center">
        <p className="p-2 font-bold">Preço: R${produto.price.toFixed(2)}</p>

        {quantity > 0 ? (
          <div
            className="mt-6 flex items-center gap-2 w-max rounded-lg px-4 py-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="Diminuir quantidade"
              disabled={quantity <= 1}
              onClick={handleDecrement}
              className={`w-8 h-8 text-lg font-bold border rounded transition 
                ${quantity <= 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
            >
              -
            </button>
            <span className="text-lg font-semibold px-2">{quantity}</span>
            <button
              aria-label="Aumentar quantidade"
              onClick={handleIncrement}
              className="w-8 h-8 text-lg font-bold text-gray-700 bg-white border rounded hover:bg-gray-200 transition"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCartClick}
            className="p-2 bg-blue-600 text-white rounded flex items-center gap-2
                       hover:bg-blue-700 transition ease-in-out duration-300"
          >
            <FaShoppingCart />
            Adicionar
          </button>
        )}
      </div>
    </div>
  );
}
