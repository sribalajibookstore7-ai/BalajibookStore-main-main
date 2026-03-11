import type { Product } from "../../types/types";

type ProductCardTagsProps ={
    produto: Product
}

const ProductTags = ({ produto }: ProductCardTagsProps) => {
    return(
        <>
            <div className="flex flex-wrap gap-2 mt-4">
                {produto.tags.map((tag, index) => (
                    <span
                        key={index}
                        className="bg-gray-600 text-white text-xs font-medium p-2 rounded-full"
                    >
                        #{tag}
                    </span>
                ))}
            </div>
        </>
    );
}

export default ProductTags;