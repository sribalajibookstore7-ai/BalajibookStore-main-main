import type { Product } from "../../types/types"

type ProductCardInfoProps = {
    produto: Product
}

const ProductInfo = ({ produto }: ProductCardInfoProps) => {
    
    const finalPrice = (produto.price * (1 - produto.discountPercentage / 100)).toFixed(2); 

    return(
        <>
            <h1 className="text-3xl font-bold mt-1">{produto.title}</h1>
            <p className="text-sm text-gray-600 mt-1">by {produto.brand}</p>
            <div className="flex flex-col gap-4 mt-4">
                <div className="flex gap-4 items-center">
                    <span className="text-2xl font-bold text-gray-800">${finalPrice}</span>
                    <span className="line-through text-gray-500">${produto.price}</span>
                    <span className="text-red-500 font-semibold text-sm">
                        {produto.discountPercentage.toFixed(0)}% off
                    </span>
                </div>
            <div className="mt-6 text-sm text-gray-700 leading-relaxed">
                {produto.description}
            </div>
            </div>
        </>
    );
};

export default ProductInfo;