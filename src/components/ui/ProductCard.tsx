import React from 'react';

interface ProductCardProps {
  id: string | number;
  name: string;
  price: number;
  image: string;
  stock: number;
  category: string;
  onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  stock,
  category,
  onClick
}) => {
  return (
    <div
      className="bg-white dark:bg-gray-900 rounded-card shadow-card hover:shadow-card-hover transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-48 rounded-t-card overflow-hidden">
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
          {/* Placeholder para imagen */}
          <span className="text-4xl">📦</span>
        </div>
        {/* En un proyecto real, aquí iría la imagen del producto */}
        {/* <img src={image} alt={name} className="w-full h-full object-cover" /> */}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">{name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{category}</p>
          </div>
          <span className="font-bold text-primary-600 dark:text-primary-400">${price.toFixed(2)}</span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className={`text-sm font-medium ${stock > 10
              ? 'text-green-600 dark:text-green-400'
              : stock > 0
                ? 'text-orange-600 dark:text-orange-400'
                : 'text-red-600 dark:text-red-400'
            }`}>
            {stock > 10
              ? 'En stock'
              : stock > 0
                ? `Solo ${stock} restantes`
                : 'Agotado'}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">ID: {id}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
