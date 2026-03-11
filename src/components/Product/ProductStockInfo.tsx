import type { Product } from "../../types/types";

type ProductCardStockInfoProps = {
    produto: Product
}

const ProductStockInfo = ({ produto }: ProductCardStockInfoProps) => {

    return(
        <div className="mt-6 space-y-2 text-sm text-gray-700">
            <p><strong>Stock:</strong> {produto.stock} units</p>
            <p><strong>Warranty:</strong> {produto.warrantyInformation}</p>
            <p><strong>Shipping:</strong> {produto.shippingInformation}</p>
            <p><strong>Availability:</strong> {produto.availabilityStatus}</p>
        </div>
    );

}

export default ProductStockInfo;