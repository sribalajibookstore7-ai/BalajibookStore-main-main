import type { CartItem } from "../../types/types";

type ProductCartProps = {
  cart: CartItem[]; // array de produtos no carrinho
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
};

const CartProduct = ({ cart, updateQuantity,  removeFromCart }: ProductCartProps) => {
    return(
        <div className="flex flex-col gap-6">
            {cart.map(({ product, quantity }) => (
                <div
                key={product.id}
                className="flex gap-6 border-b-2 border-gray-400 p-2"
                >
                <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1 p-4">
                    <p className="font-semibold text-lg">{product.title}</p>
                    <p className="text-gray-500">${product.price.toFixed(2)}</p>

                    {/* Controle de quantidade */}
                    <div className="flex items-center gap-3 p-2 justify-between w-full">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() =>
                            updateQuantity(product.id, Math.max(quantity - 1, 0))
                            }
                            className="px-3 py-1 border rounded cursor-pointer"
                        >
                            -
                        </button>
                        <span>{quantity}</span>
                        <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="px-3 py-1 border rounded cursor-pointer"
                        >
                            +
                        </button>
                    </div>

                    <div className="flex flex-col justify-end gap-4">
                        <div className="text-right font-semibold text-lg">
                            ${ (product.price * quantity).toFixed(2) }
                        </div>
                        <div className="flex gap-4 justify-end">
                            <button
                                onClick={() => removeFromCart(product.id)}
                                className="text-red-500 cursor-pointer"
                            >
                                Delete
                            </button>
                            <button className="text-gray-400 hover:text-gray-700 cursor-pointer active:text-red-500">
                                ♡ Save
                            </button>
                        </div>
                    </div>
                    </div>
                </div>

                
                </div>
            ))}
        </div>
    );
};

export default CartProduct;