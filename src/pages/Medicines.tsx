import React, { useState } from 'react';
import { categories } from '../data/sampleData';

export const Medicines: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const allMedicines = categories.flatMap(category => 
    category.medicines.map(medicine => ({
      ...medicine,
      category: category.name
    }))
  );

  const filteredMedicines = allMedicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || medicine.category === selectedCategory;
    const matchesPrice = (!minPrice || medicine.price >= Number(minPrice)) &&
                        (!maxPrice || medicine.price <= Number(maxPrice));
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      {/* Filters Section */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <h2 className="text-2xl font-bold mb-4">Search Medicines</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Search Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search medicines..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Min Price (₵)
            </label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="0"
              min="0"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Price (₵)
            </label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="1000"
              min="0"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Medicines Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMedicines.map((medicine) => (
          <div
            key={medicine.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={medicine.image}
              alt={medicine.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{medicine.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{medicine.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-blue-600">₵{medicine.price.toFixed(2)}</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    medicine.available
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {medicine.available ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredMedicines.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">No medicines found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};
