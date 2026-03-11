import { Link, useNavigate } from "react-router";
import { useCart } from "../../contexts/CartContext";
import { useState } from "react";
import CartProduct from "./CartProduct";

export function WebCart() {
  
    const navigate = useNavigate();

    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

    // Estado para promo code
    const [promoCode, setPromoCode] = useState<string>("");
    const [discountPercent, setDiscountPercent] = useState<number>(0);

    // Cálculos simples
    const subtotal = cart.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );
    const discountAmount = (subtotal * discountPercent) / 100;
    const tax = 14; // fixo só pra exemplo
    const deliveryCost = 0; // grátis por exemplo
    const total = subtotal - discountAmount + tax + deliveryCost;

    // Aplica o cupom simples
    const applyPromoCode = () => {
        if (promoCode.toLowerCase() === "50off") {
        setDiscountPercent(50);
        } else {
        setDiscountPercent(0);
        alert("Promo code inválido");
        }
    };

    if (cart.length === 0) {
        return <div className="w-full h-dvh flex flex-col gap-4 items-center text-4xl justify-center">
            Seu carrinho está vazio. 
            <span className="opacity-60 hover:underline hover:opacity-100 duration-300 ease-in-out transition">
            <Link to={'/'}>Voltar à página Inicial</Link></span></div>;
    }

    return (
        <div className="flex gap-8 p-8 bg-gray-50 min-h-screen">
        {/* Lista de itens */}
        <div className="flex-1 bg-white p-6 rounded shadow">
            <h2 className="text-4xl font-bold mb-6 p-4 border-b-2 border-gray-400">Cart</h2>
            <CartProduct cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity}/>
        </div>

        {/* Resumo do pedido */}
        <div className="w-96 bg-white p-6 rounded shadow flex flex-col gap-6">
            <div>
            <h3 className="font-semibold mb-2">Frete</h3>
            <div className="flex gap-2 mb-1">
                <button className="bg-gray-200 px-3 py-1 rounded">Grátis</button>
                <button className="bg-gray-100 px-3 py-1 rounded text-gray-600">
                Expresso: $9.99
                </button>
            </div>
            <p className="text-sm text-gray-500 mb-4">Data de Entrega: Agosto 24, 2025</p>
            </div>

            <div>
            <input
                type="text"
                placeholder="Código de Promoção (50off)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="border rounded px-3 py-2 w-full"
            />
            <button
                onClick={applyPromoCode}
                className="mt-2 w-full bg-gray-300 py-2 rounded hover:bg-gray-400 transition"
            >
                Aplicar
            </button>
            {discountPercent > 0 && (
                <p className="text-green-600 mt-1">Desconto de 50% aplicado!</p>
            )}
            </div>

            <div className="text-sm text-gray-700 border-t pt-4">
            <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
                <span>Desconto</span>
                <span>({discountPercent}%) -${discountAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
                <span>Frete</span>
                <span>${deliveryCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
                <span>Taxa Adicional</span>
                <span>+${tax.toFixed(2)}</span>
            </div>
            </div>

            <div className="flex justify-between font-bold text-lg border-t pt-4">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
            </div>

            <button className="mt-4 bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
            onClick={() => {
                alert(`Obrigado por comprar em nossa loja! \nTotal da Compra: $${total.toFixed(2)}\n\nOnlineStore agradece a preferência!`);
                clearCart();
            }}
            >
            Finalizar Compra
            </button>
            <button className="mt-2 border border-gray-300 py-3 rounded hover:bg-gray-100 transition cursor-pointer"
            onClick={()=>{navigate('/')}}
            >
            Continuar Comprando
            </button>
        </div>
        </div>
    );
}