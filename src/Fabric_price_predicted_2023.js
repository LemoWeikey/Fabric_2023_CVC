import React, { useState, useEffect } from 'react';
import { Calculator, Layers, Ruler, FileText } from 'lucide-react';

const FabricPriceApp = () => {
  const [gsm, setGsm] = useState(200);
  const [width, setWidth] = useState(175);
  const [composition] = useState('60% Cotton, 40% Polyester');
  const [price, setPrice] = useState(null);
  
  // Constants from your formula
  const x_opt_avg = 32232.698415;
  const y_opt_avg = 36108.573417;
  const z_opt_avg = 999.995000;
  
  const calculatePrice = () => {
    // Using your formula: (((((GSM * width / (1000*100)) * y + x) * 1.1 + z) * 1.1 * 1.2) / 23612) - (Price_per_m_VND_mean / 23612)
    // Since we don't have Price_per_m_VND_mean, I'll assume it's 0 for the base calculation
    const priceUSD = (((((gsm * width / (1000 * 100)) * y_opt_avg + x_opt_avg) * 1.1 + z_opt_avg) * 1.1 * 1.2) / 23612);
    
    // Convert to VND
    const priceVND = priceUSD * 23612;
    
    return priceVND;
  };

  const calculatePricePerKg = () => {
    if (!price) return 0;
    // Price_per_kg = (Price_per_m × 1000) / (GSM × (Width_cm / 100))
    return (price * 1000) / (gsm * (width / 100));
  };

  useEffect(() => {
    const calculatedPrice = calculatePrice();
    setPrice(calculatedPrice);
  }, [gsm, width]);

  const formatPrice = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPricePerKg = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const pricePerKg = calculatePricePerKg();

  const lowerBound = price ? price * 0.95 : 0;
  const upperBound = price ? price * 1.05 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="w-12 h-12 text-indigo-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Fabric Price Predictor</h1>
          </div>
          <p className="text-gray-600 text-lg">Calculate fabric pricing with precision</p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Controls Panel */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <Layers className="w-6 h-6 mr-2 text-indigo-600" />
              Fabric Specifications
            </h2>
            
            {/* GSM Control */}
            <div className="mb-8">
              <div className="flex items-center mb-3">
                <Ruler className="w-5 h-5 text-indigo-500 mr-2" />
                <label className="text-lg font-medium text-gray-700">GSM (Grams per Square Meter)</label>
              </div>
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-0.5 rounded-xl">
                <div className="bg-white rounded-xl p-4">
                  <input
                    type="range"
                    min="120"
                    max="300"
                    value={gsm}
                    onChange={(e) => setGsm(parseInt(e.target.value))}
                    className="w-full h-3 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>120</span>
                    <span className="font-semibold text-indigo-600 text-lg">{gsm}</span>
                    <span>300</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Width Control */}
            <div className="mb-8">
              <div className="flex items-center mb-3">
                <Ruler className="w-5 h-5 text-purple-500 mr-2" />
                <label className="text-lg font-medium text-gray-700">Width (cm)</label>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-0.5 rounded-xl">
                <div className="bg-white rounded-xl p-4">
                  <input
                    type="range"
                    min="150"
                    max="200"
                    value={width}
                    onChange={(e) => setWidth(parseInt(e.target.value))}
                    className="w-full h-3 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>150</span>
                    <span className="font-semibold text-purple-600 text-lg">{width}</span>
                    <span>200</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Composition Display */}
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <FileText className="w-5 h-5 text-green-500 mr-2" />
                <label className="text-lg font-medium text-gray-700">Composition</label>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-teal-600 p-0.5 rounded-xl">
                <div className="bg-white rounded-xl p-4">
                  <p className="text-green-700 font-medium text-center">{composition}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <Calculator className="w-6 h-6 mr-2 text-indigo-600" />
              Price Prediction
            </h2>

            {price && (
              <div className="space-y-6">
                {/* Main Price */}
                <div className="text-center">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-0.5 rounded-2xl">
                    <div className="bg-white rounded-2xl p-6">
                      <p className="text-sm text-gray-500 mb-2">Price per Meter (VND)</p>
                      <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                        {formatPrice(price)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Price per Kg */}
                <div className="text-center">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-0.5 rounded-2xl">
                    <div className="bg-white rounded-2xl p-6">
                      <p className="text-sm text-gray-500 mb-2">Price per Kg (VND)</p>
                      <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                        {formatPricePerKg(pricePerKg)} VND/kg
                      </p>
                    </div>
                  </div>
                </div>

                {/* Price Range for Price per Meter */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-600 mb-2 text-center">Price per Meter Range</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-r from-red-400 to-red-500 p-0.5 rounded-xl">
                      <div className="bg-white rounded-xl p-3 text-center">
                        <p className="text-xs text-gray-500 mb-1">Lower (-5%)</p>
                        <p className="text-lg font-bold text-red-600">{formatPrice(lowerBound)}</p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-green-400 to-green-500 p-0.5 rounded-xl">
                      <div className="bg-white rounded-xl p-3 text-center">
                        <p className="text-xs text-gray-500 mb-1">Upper (+5%)</p>
                        <p className="text-lg font-bold text-green-600">{formatPrice(upperBound)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price Range for Price per Kg */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-600 mb-2 text-center">Price per Kg Range</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-r from-red-400 to-red-500 p-0.5 rounded-xl">
                      <div className="bg-white rounded-xl p-3 text-center">
                        <p className="text-xs text-gray-500 mb-1">Lower (-5%)</p>
                        <p className="text-lg font-bold text-red-600">{formatPricePerKg(pricePerKg * 0.95)} VND/kg</p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-green-400 to-green-500 p-0.5 rounded-xl">
                      <div className="bg-white rounded-xl p-3 text-center">
                        <p className="text-xs text-gray-500 mb-1">Upper (+5%)</p>
                        <p className="text-lg font-bold text-green-600">{formatPricePerKg(pricePerKg * 1.05)} VND/kg</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Specifications Summary */}
                <div className="bg-gray-50 rounded-xl p-4 mt-6">
                  <h3 className="font-semibold text-gray-700 mb-3">Current Specifications:</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">GSM:</span>
                      <span className="font-medium">{gsm}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Width:</span>
                      <span className="font-medium">{width} cm</span>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Composition:</span>
                      <span className="font-medium text-right">{composition}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Price calculated using advanced fabric prediction algorithm
          </p>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: linear-gradient(45deg, #6366f1, #8b5cf6);
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          border: 2px solid white;
        }
        
        .slider::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: linear-gradient(45deg, #6366f1, #8b5cf6);
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          border: 2px solid white;
        }
      `}</style>
    </div>
  );
};

export default FabricPriceApp;