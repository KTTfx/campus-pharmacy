import React from 'react';
import { useLocation } from 'react-router-dom';
import { categories, pharmacies } from '../data/sampleData';

export const SearchResults: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q')?.toLowerCase() || '';

  // Find all medicines that match the search query
  const matchingMedicines = categories.flatMap(category =>
    category.medicines.filter(medicine =>
      medicine.name.toLowerCase().includes(query) ||
      medicine.description.toLowerCase().includes(query)
    )
  );

  // Find pharmacies that have matching medicines
  const pharmaciesWithMedicine = pharmacies.map(pharmacy => ({
    ...pharmacy,
    matchingMedicines: matchingMedicines.filter(medicine => 
      // In a real app, this would check the pharmacy's inventory
      pharmacy.available
    )
  })).filter(pharmacy => pharmacy.matchingMedicines.length > 0);

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-2xl font-bold mb-6">
        Search Results for "{query}"
      </h1>

      {pharmaciesWithMedicine.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No pharmacies found with matching medicines.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {pharmaciesWithMedicine.map(pharmacy => (
            <div key={pharmacy.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-start">
                  <div className="w-1/4">
                    <img 
                      src={pharmacy.image} 
                      alt={pharmacy.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <div className="w-3/4 pl-6">
                    <h2 className="text-xl font-semibold mb-2">{pharmacy.name}</h2>
                    <div className="space-y-2 text-gray-600 mb-4">
                      <p><strong>Location:</strong> {pharmacy.location}</p>
                      <p><strong>Hours:</strong> {pharmacy.hours}</p>
                      <p><strong>Phone:</strong> {pharmacy.phone}</p>
                    </div>
                    <div className="border-t pt-4">
                      <h3 className="font-semibold mb-2">Available Medicines:</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        {pharmacy.matchingMedicines.map(medicine => (
                          <div key={medicine.id} className="flex items-center space-x-4">
                            <img 
                              src={medicine.image} 
                              alt={medicine.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div>
                              <p className="font-medium">{medicine.name}</p>
                              <p className="text-green-600">₵{medicine.price.toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
