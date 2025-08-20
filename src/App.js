import React, { useState, useEffect } from 'react';
import { Calculator, Layers, Ruler, FileText } from 'lucide-react';

// Fabric data from JSON (moved outside component to avoid dependency issues)
const fabricData = [
    {
      "Composition": "CVC 65% Cotton 35% Polyester",
      "Basic Jersey": 145308,
      "Printing": 154746,
      "Fleece / Brushed": 168540
    },
    {
      "Composition": "CVC 65% Cotton 35% Polyester (BCI Cotton)",
      "Basic Jersey": 154977,
      "Printing": 165170,
      "Fleece / Brushed": 180068
    },
    {
      "Composition": "CVC 65% Cotton 35% Polyester (Recycled Polyester)",
      "Basic Jersey": 152109,
      "Printing": 162273,
      "Fleece / Brushed": 175341
    },
    {
      "Composition": "100% Recycled Poly (rPET)",
      "Basic Jersey": 147973,
      "Printing": 155233,
      "Fleece / Brushed": 163945
    },
    {
      "Composition": "CVC 60% Cotton 35% Polyester 5% Spandex",
      "Basic Jersey": 174377,
      "Printing": 183089,
      "Fleece / Brushed": 185267
    },
    {
      "Composition": "CVC 60% Cotton 35% Polyester 5% Spandex (BCI Cotton)",
      "Basic Jersey": 185094,
      "Printing": 194503,
      "Fleece / Brushed": 196856
    },
    {
      "Composition": "CVC 60% Cotton 35% Polyester 5% Spandex (Recycled Polyester)",
      "Basic Jersey": 181904,
      "Printing": 190616,
      "Fleece / Brushed": 192068
    },
    {
      "Composition": "95% Cotton 5% Spandex",
      "Basic Jersey": 175140,
      "Printing": 184578,
      "Fleece / Brushed": 186030
    },
    {
      "Composition": "95% Cotton 5% Spandex (BCI Cotton)",
      "Basic Jersey": 188599,
      "Printing": 197311,
      "Fleece / Brushed": 199634
    },
    {
      "Composition": "90% Polyester 10% Spandex",
      "Basic Jersey": 186277,
      "Printing": 194989,
      "Fleece / Brushed": 196441
    },
    {
      "Composition": "90% Polyester 10% Spandex (Recycled Polyester)",
      "Basic Jersey": 196918,
      "Printing": 205630,
      "Fleece / Brushed": 207082
    },
    {
      "Composition": "90% Cotton 10% Spandex",
      "Basic Jersey": 188237,
      "Printing": 196949,
      "Fleece / Brushed": 198401
    },
    {
      "Composition": "90% Cotton 10% Spandex (BCI Cotton)",
      "Basic Jersey": 200682,
      "Printing": 209394,
      "Fleece / Brushed": 211717
    },
    {
      "Composition": "CVC 60% Cotton 40% Polyester",
      "Basic Jersey": 145200,
      "Printing": 155364,
      "Fleece / Brushed": 168432
    },
    {
      "Composition": "CVC 60% Cotton 40% Polyester (BCI Cotton)",
      "Basic Jersey": 154581,
      "Printing": 164628,
      "Fleece / Brushed": 179671
    },
    {
      "Composition": "CVC 60% Cotton 40% Polyester (Recycled Polyester)",
      "Basic Jersey": 152349,
      "Printing": 162513,
      "Fleece / Brushed": 175581
    },
    {
      "Composition": "100% Cotton",
      "Basic Jersey": 155509,
      "Printing": 164947,
      "Fleece / Brushed": 166399
    },
    {
      "Composition": "100% Cotton (BCI Cotton)",
      "Basic Jersey": 167949,
      "Printing": 178142,
      "Fleece / Brushed": 179711
    },
    {
      "Composition": "100% Polyester",
      "Basic Jersey": 131551,
      "Printing": 142441,
      "Fleece / Brushed": 149701
    },
    {
      "Composition": "TC 65% Polyester 35% Cotton",
      "Basic Jersey": 141751,
      "Printing": 151189,
      "Fleece / Brushed": 164983
    },
    {
      "Composition": "TC 65% Polyester 35% Cotton (BCI Cotton)",
      "Basic Jersey": 149459,
      "Printing": 159652,
      "Fleece / Brushed": 174550
    },
    {
      "Composition": "TC 65% Polyester 35% Cotton (Recycled Polyester)",
      "Basic Jersey": 150647,
      "Printing": 160085,
      "Fleece / Brushed": 173879
    },
    {
      "Composition": "80% Cotton 20% Polyester",
      "Basic Jersey": 145635,
      "Printing": 155073,
      "Fleece / Brushed": 168867
    },
    {
      "Composition": "80% Cotton 20% Polyester (BCI Cotton)",
      "Basic Jersey": 156168,
      "Printing": 166362,
      "Fleece / Brushed": 181259
    },
    {
      "Composition": "80% Cotton 20% Polyester (Recycled Polyester)",
      "Basic Jersey": 151388,
      "Printing": 160826,
      "Fleece / Brushed": 174620
    },
    {
      "Composition": "75% Cotton 25% Polyester",
      "Basic Jersey": 145526,
      "Printing": 154964,
      "Fleece / Brushed": 168758
    },
    {
      "Composition": "75% Cotton 25% Polyester (BCI Cotton)",
      "Basic Jersey": 155772,
      "Printing": 165965,
      "Fleece / Brushed": 180862
    },
    {
      "Composition": "75% Cotton 25% Polyester (Recycled Polyester)",
      "Basic Jersey": 151628,
      "Printing": 161066,
      "Fleece / Brushed": 174860
    }
];

const FabricPriceApp = () => {
  const [gsm, setGsm] = useState(200);
  const [width, setWidth] = useState(175);
  const [composition, setComposition] = useState('CVC 60% Cotton 40% Polyester');
  const [processing, setProcessing] = useState('Basic Jersey');
  const [price, setPrice] = useState(null);
  
  const compositionOptions = fabricData.map(item => item.Composition);
  const processingOptions = ['Basic Jersey', 'Printing', 'Fleece / Brushed'];
  
  useEffect(() => {
    const calculatePrice = () => {
      const selectedFabric = fabricData.find(item => item.Composition === composition);
      if (!selectedFabric) return 0;
      
      const pricePerKg = selectedFabric[processing];
      if (!pricePerKg) return 0;
      
      // Formula: (GSM * Width) * Price_per_kg / (1000 * 100)
      const pricePerMeter = (gsm * width) * pricePerKg / (1000 * 100);
      return pricePerMeter;
    };
    
    const calculatedPrice = calculatePrice();
    setPrice(calculatedPrice);
  }, [gsm, width, composition, processing]);

  const calculatePricePerKg = () => {
    const selectedFabric = fabricData.find(item => item.Composition === composition);
    if (!selectedFabric) return 0;
    return selectedFabric[processing];
  };

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

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    },
    maxWidth: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px'
    },
    headerTitle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '16px',
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: 'white'
    },
    headerSubtitle: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '1.2rem'
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      gap: '30px'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '20px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      padding: '30px',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    cardTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#333',
      marginBottom: '24px',
      display: 'flex',
      alignItems: 'center'
    },
    controlGroup: {
      marginBottom: '30px'
    },
    label: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '12px',
      fontSize: '1.1rem',
      fontWeight: '500',
      color: '#333'
    },
    sliderContainer: {
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      padding: '2px',
      borderRadius: '12px'
    },
    sliderWrapper: {
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '16px'
    },
    slider: {
      width: '100%',
      height: '8px',
      borderRadius: '4px',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      outline: 'none',
      cursor: 'pointer'
    },
    sliderValues: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '8px',
      fontSize: '14px',
      color: '#666'
    },
    currentValue: {
      fontWeight: 'bold',
      color: '#667eea',
      fontSize: '18px'
    },
    compositionBox: {
      background: 'linear-gradient(135deg, #2ecc71, #27ae60)',
      padding: '2px',
      borderRadius: '12px'
    },
    compositionContent: {
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '16px',
      textAlign: 'center'
    },
    compositionText: {
      color: '#27ae60',
      fontWeight: '500'
    },
    selectContainer: {
      background: 'linear-gradient(135deg, #2ecc71, #27ae60)',
      padding: '2px',
      borderRadius: '12px'
    },
    selectWrapper: {
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '16px'
    },
    select: {
      width: '100%',
      padding: '12px',
      border: '2px solid #27ae60',
      borderRadius: '8px',
      fontSize: '14px',
      backgroundColor: 'white',
      color: '#333',
      cursor: 'pointer',
      outline: 'none'
    },
    priceContainer: {
      textAlign: 'center',
      marginBottom: '24px'
    },
    priceBox: {
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      padding: '2px',
      borderRadius: '16px'
    },
    priceContent: {
      backgroundColor: 'white',
      borderRadius: '14px',
      padding: '24px'
    },
    priceLabel: {
      fontSize: '14px',
      color: '#666',
      marginBottom: '8px'
    },
    priceValue: {
      fontSize: '2rem',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    rangeContainer: {
      marginBottom: '16px'
    },
    rangeTitle: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#666',
      marginBottom: '8px',
      textAlign: 'center'
    },
    rangeGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px'
    },
    boundBox: {
      padding: '2px',
      borderRadius: '12px'
    },
    boundBoxRed: {
      background: 'linear-gradient(135deg, #e74c3c, #c0392b)'
    },
    boundBoxGreen: {
      background: 'linear-gradient(135deg, #2ecc71, #27ae60)'
    },
    boundContent: {
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '12px',
      textAlign: 'center'
    },
    boundLabel: {
      fontSize: '12px',
      color: '#666',
      marginBottom: '4px'
    },
    boundValueRed: {
      fontSize: '1.1rem',
      fontWeight: 'bold',
      color: '#e74c3c'
    },
    boundValueGreen: {
      fontSize: '1.1rem',
      fontWeight: 'bold',
      color: '#27ae60'
    },
    summaryBox: {
      backgroundColor: '#f8f9fa',
      borderRadius: '12px',
      padding: '16px',
      marginTop: '24px'
    },
    summaryTitle: {
      fontWeight: '600',
      color: '#333',
      marginBottom: '12px'
    },
    summaryGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px',
      fontSize: '14px'
    },
    summaryItem: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    summaryLabel: {
      color: '#666'
    },
    summaryValue: {
      fontWeight: '500'
    },
    footer: {
      textAlign: 'center',
      marginTop: '32px'
    },
    footerText: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '14px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.maxWidth}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerTitle}>
            <Calculator style={{width: '48px', height: '48px', marginRight: '12px'}} />
            Fabric Price Predictor
          </div>
          <p style={styles.headerSubtitle}>Calculate fabric pricing with precision</p>
        </div>

        {/* Main Content */}
        <div style={styles.gridContainer}>
          {/* Controls Panel */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>
              <Layers style={{width: '24px', height: '24px', marginRight: '8px', color: '#667eea'}} />
              Fabric Specifications
            </h2>
            
            {/* GSM Control */}
            <div style={styles.controlGroup}>
              <div style={styles.label}>
                <Ruler style={{width: '20px', height: '20px', marginRight: '8px', color: '#667eea'}} />
                GSM (Grams per Square Meter)
              </div>
              <div style={styles.sliderContainer}>
                <div style={styles.sliderWrapper}>
                  <input
                    type="range"
                    min="120"
                    max="300"
                    value={gsm}
                    onChange={(e) => setGsm(parseInt(e.target.value))}
                    style={styles.slider}
                  />
                  <div style={styles.sliderValues}>
                    <span>120</span>
                    <span style={styles.currentValue}>{gsm}</span>
                    <span>300</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Width Control */}
            <div style={styles.controlGroup}>
              <div style={styles.label}>
                <Ruler style={{width: '20px', height: '20px', marginRight: '8px', color: '#764ba2'}} />
                Width (cm)
              </div>
              <div style={styles.sliderContainer}>
                <div style={styles.sliderWrapper}>
                  <input
                    type="range"
                    min="150"
                    max="200"
                    value={width}
                    onChange={(e) => setWidth(parseInt(e.target.value))}
                    style={styles.slider}
                  />
                  <div style={styles.sliderValues}>
                    <span>150</span>
                    <span style={styles.currentValue}>{width}</span>
                    <span>200</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Composition Selection */}
            <div style={styles.controlGroup}>
              <div style={styles.label}>
                <FileText style={{width: '20px', height: '20px', marginRight: '8px', color: '#2ecc71'}} />
                Composition
              </div>
              <div style={styles.selectContainer}>
                <div style={styles.selectWrapper}>
                  <select
                    value={composition}
                    onChange={(e) => setComposition(e.target.value)}
                    style={styles.select}
                  >
                    {compositionOptions.map((comp) => (
                      <option key={comp} value={comp}>
                        {comp}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Processing Selection */}
            <div style={styles.controlGroup}>
              <div style={styles.label}>
                <div style={{width: '20px', height: '20px', marginRight: '8px', backgroundColor: '#ff6b6b', borderRadius: '50%'}}></div>
                Processing Type
              </div>
              <div style={styles.compositionBox}>
                <div style={styles.compositionContent}>
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '8px'}}>
                    {processingOptions.map((procOption) => (
                      <button
                        key={procOption}
                        onClick={() => setProcessing(procOption)}
                        style={{
                          padding: '12px 16px',
                          border: processing === procOption ? '2px solid #27ae60' : '1px solid #ddd',
                          borderRadius: '8px',
                          backgroundColor: processing === procOption ? '#e8f5e8' : 'white',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: processing === procOption ? 'bold' : 'normal',
                          color: processing === procOption ? '#27ae60' : '#333',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {procOption}
                      </button>
                    ))}
                  </div>
                  <div style={{marginTop: '12px', textAlign: 'center'}}>
                    <span style={{...styles.compositionText, fontSize: '14px'}}>Selected: {processing}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>
              <Calculator style={{width: '24px', height: '24px', marginRight: '8px', color: '#667eea'}} />
              Price Prediction
            </h2>

            {price && (
              <div>
                {/* Main Price */}
                <div style={styles.priceContainer}>
                  <div style={styles.priceBox}>
                    <div style={styles.priceContent}>
                      <p style={styles.priceLabel}>Price per Meter (VND)</p>
                      <p style={styles.priceValue}>
                        {formatPrice(price)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Price per Kg */}
                <div style={styles.priceContainer}>
                  <div style={{...styles.priceBox, background: 'linear-gradient(135deg, #2ecc71, #27ae60)'}}>
                    <div style={styles.priceContent}>
                      <p style={styles.priceLabel}>Price per Kg (VND)</p>
                      <p style={{...styles.priceValue, background: 'linear-gradient(135deg, #2ecc71, #27ae60)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                        {formatPricePerKg(pricePerKg)} VND/kg
                      </p>
                    </div>
                  </div>
                </div>

                {/* Price Range for Price per Meter */}
                <div style={styles.rangeContainer}>
                  <h4 style={styles.rangeTitle}>Price per Meter Range</h4>
                  <div style={styles.rangeGrid}>
                    <div style={{...styles.boundBox, ...styles.boundBoxRed}}>
                      <div style={styles.boundContent}>
                        <p style={styles.boundLabel}>Lower (-5%)</p>
                        <p style={styles.boundValueRed}>{formatPrice(lowerBound)}</p>
                      </div>
                    </div>
                    <div style={{...styles.boundBox, ...styles.boundBoxGreen}}>
                      <div style={styles.boundContent}>
                        <p style={styles.boundLabel}>Upper (+5%)</p>
                        <p style={styles.boundValueGreen}>{formatPrice(upperBound)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price Range for Price per Kg */}
                <div style={styles.rangeContainer}>
                  <h4 style={styles.rangeTitle}>Price per Kg Range</h4>
                  <div style={styles.rangeGrid}>
                    <div style={{...styles.boundBox, ...styles.boundBoxRed}}>
                      <div style={styles.boundContent}>
                        <p style={styles.boundLabel}>Lower (-5%)</p>
                        <p style={styles.boundValueRed}>{formatPricePerKg(pricePerKg * 0.95)} VND/kg</p>
                      </div>
                    </div>
                    <div style={{...styles.boundBox, ...styles.boundBoxGreen}}>
                      <div style={styles.boundContent}>
                        <p style={styles.boundLabel}>Upper (+5%)</p>
                        <p style={styles.boundValueGreen}>{formatPricePerKg(pricePerKg * 1.05)} VND/kg</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Specifications Summary */}
                <div style={styles.summaryBox}>
                  <h3 style={styles.summaryTitle}>Current Specifications:</h3>
                  <div style={styles.summaryGrid}>
                    <div style={styles.summaryItem}>
                      <span style={styles.summaryLabel}>GSM:</span>
                      <span style={styles.summaryValue}>{gsm}</span>
                    </div>
                    <div style={styles.summaryItem}>
                      <span style={styles.summaryLabel}>Processing:</span>
                      <span style={styles.summaryValue}>{processing}</span>
                    </div>
                    <div style={styles.summaryItem}>
                      <span style={styles.summaryLabel}>Width:</span>
                      <span style={styles.summaryValue}>{width} cm</span>
                    </div>
                  </div>
                  <div style={{marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #e0e0e0'}}>
                    <div style={styles.summaryItem}>
                      <span style={styles.summaryLabel}>Composition:</span>
                      <span style={{...styles.summaryValue, textAlign: 'right', fontSize: '12px'}}>{composition}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <p style={styles.footerText}>
            Price calculated using advanced fabric prediction algorithm
          </p>
        </div>
      </div>
    </div>
  );
};

export default FabricPriceApp;