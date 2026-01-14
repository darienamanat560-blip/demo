import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Menu, X, CheckCircle, Shield, Award, Beaker, FileText, AlertCircle } from 'lucide-react';

// Vial Logo Component - Inverts on light backgrounds
const VialIcon = ({ inverted = false, size = 40 }) => {
  return (
    <img 
      src="/vial-logo.png" 
      alt="truechem" 
      width={size} 
      height={size} 
      style={{ 
        display: 'block',
        filter: inverted ? 'invert(1)' : 'none'
      }}
    />
  );
};

export default function TruchemWebsite() {
  // Add CSS for smooth animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .animate-fadeIn {
        animation: fadeIn 0.2s ease-out;
      }
      @keyframes pageEnter {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .animate-pageEnter {
        animation: pageEnter 0.4s ease-out;
      }
      @keyframes pageFadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      .animate-pageFadeIn {
        animation: pageFadeIn 0.3s ease-out;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState('home');
  const [pageTransition, setPageTransition] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [ageVerified, setAgeVerified] = useState(false);
  const [purityValue, setPurityValue] = useState(0);
  const [purityComplete, setPurityComplete] = useState(false);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [showCartHover, setShowCartHover] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState([]);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [shippingInfo, setShippingInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zip: '',
    phone: ''
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('apple');

  // Navigate to page with scroll to top and animation
  const navigateTo = (page) => {
    setPageTransition(true);
    setTimeout(() => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'instant' });
      setPageTransition(false);
    }, 150);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animated purity meter effect
  useEffect(() => {
    if (ageVerified && currentPage === 'home') {
      // Reset purity to 0 and color state
      setPurityValue(0);
      setPurityComplete(false);
      
      // Ultra-smooth easing function (ease-out cubic - smoother than quart)
      const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
      
      const targetPurity = 99.65;
      const duration = 2500; // 2.5 seconds - sweet spot for smoothness
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutCubic(progress);
        const currentValue = easedProgress * targetPurity;
        
        setPurityValue(currentValue);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Animation complete - trigger color change after a tiny delay
          setTimeout(() => {
            setPurityComplete(true);
          }, 100);
        }
      };
      
      // Start animation after a small delay
      setTimeout(() => {
        animate();
      }, 300);
    }
  }, [ageVerified, currentPage]);

  const products = [
    {
      id: 'TC-001',
      name: 'Retatrutide',
      category: 'glp1',
      purity: '99.65%',
      cas: '2381089-83-2',
      molecular: 'C₂₂₅H₃₄₁N₆₁O₆₇S',
      weight: '4960.37',
      price: '$95.00',
      priceNum: 95.00,
      sizes: ['5mg', '10mg', '15mg', '30mg'],
      sizesPricing: {
        '5mg': 95.00,
        '10mg': 179.00,
        '15mg': 259.00,
        '30mg': 479.00
      },
      badge: 'Best Seller',
      description: 'Triple agonist GLP-1/GIP/glucagon receptor',
      fullDescription: 'Retatrutide is a novel triple agonist research compound targeting GLP-1, GIP, and glucagon receptors. This compound represents advanced research in metabolic pathway modulation and receptor pharmacology.',
      researchApplications: [
        'Metabolic pathway research',
        'Receptor binding studies',
        'Hormonal signaling investigation',
        'Compound pharmacokinetics analysis'
      ],
      storage: '2-8°C short term, -20°C long term',
      form: 'Lyophilized powder',
      solubility: 'Water (1 mg/ml), DMSO',
      stability: '12 months at -20°C',
      mechanism: 'Triple agonist simultaneously activating GLP-1, GIP, and glucagon receptors. GLP-1 pathway influences glucose-dependent insulin secretion and appetite regulation via hypothalamic signaling. GIP receptor engagement modulates incretin responses and lipid metabolism. Glucagon receptor interaction affects hepatic glucose output and energy expenditure.',
      researchFindings: 'Research models demonstrate superior efficacy compared to single-pathway GLP-1 agonists, with statistically significant changes in body composition, metabolic markers, and energy expenditure in laboratory settings.',
      researchDosing: 'Typical research protocols: 0.5-1mg weekly initial, gradual escalation over 4-8 weeks to 4-12mg weekly maintenance doses in research models.'
    },
    {
      id: 'TC-002',
      name: 'SLU-PP-332',
      category: 'metabolic',
      purity: '98.8%',
      cas: '2919794-09-9',
      molecular: 'C₁₉H₂₁N₃O₃',
      weight: '339.39',
      price: '$149.00',
      priceNum: 149.00,
      sizes: ['5mg', '10mg', '15mg', '30mg'],
      sizesPricing: {
        '5mg': 149.00,
        '10mg': 279.00,
        '15mg': 399.00,
        '30mg': 729.00
      },
      badge: 'Best Seller',
      description: 'Exercise mimetic compound for research',
      fullDescription: 'SLU-PP-332 is an investigational exercise mimetic compound designed for laboratory research into metabolic and physiological responses.',
      researchApplications: [
        'Metabolic response studies',
        'Cellular energy pathway research',
        'Mitochondrial function investigation',
        'Exercise physiology modeling'
      ],
      storage: '-20°C, protected from moisture',
      form: 'Lyophilized powder',
      solubility: 'DMSO (50 mg/ml), ethanol',
      stability: '24 months at -20°C',
      mechanism: 'ERRα/γ agonist that activates estrogen-related receptors, upregulating PGC-1α signaling (master regulator of mitochondrial biogenesis). Enhances oxidative metabolism in skeletal muscle tissue and influences AMPK pathways associated with cellular energy sensing.',
      researchFindings: 'Published research (Nature Metabolism, 2023) documented 70-80% improvements in endurance capacity in sedentary models, with metabolic adaptations comparable to 8 weeks of intensive endurance training protocols. Studies show increased mitochondrial density and oxidative fiber-type composition.',
      researchDosing: 'Typical research protocols: 10-30mg daily, administered 60 minutes prior to activity in research models.'
    },
    {
      id: 'TC-003',
      name: 'BPC-157 / TB-500',
      category: 'recovery',
      purity: '99.5%',
      cas: '137525-51-0',
      molecular: 'C₆₂H₉₈N₁₆O₂₂',
      weight: '1419.55',
      price: '$89.00',
      priceNum: 89.00,
      sizes: ['5mg', '10mg', '20mg', '30mg'],
      sizesPricing: {
        '5mg': 89.00,
        '10mg': 169.00,
        '20mg': 319.00,
        '30mg': 449.00
      },
      description: 'Recovery compound blend',
      fullDescription: 'This proprietary blend combines BPC-157 and TB-500 for comprehensive tissue repair and cellular regeneration research.',
      researchApplications: [
        'Tissue regeneration studies',
        'Wound healing research',
        'Cellular repair mechanisms',
        'Angiogenesis investigation'
      ],
      storage: '2-8°C short term, -20°C long term',
      form: 'Lyophilized powder',
      solubility: 'Sterile water (1 mg/ml), bacteriostatic water',
      stability: '24 months at -20°C',
      mechanism: 'BPC-157 (pentadecapeptide) promotes angiogenesis via VEGF receptor pathways and modulates growth hormone receptor expression. TB-500 (thymosin beta-4 fragment) acts as actin-binding protein regulating cellular migration, upregulates matrix metalloproteinases, and promotes endothelial cell differentiation.',
      researchFindings: 'Studies document 50-60% accelerated tissue repair in tendon/ligament injury models. Both compounds demonstrate systemic distribution following local administration, with effects observable throughout the body in research settings. Synergistic outcomes observed versus monotherapy.',
      researchDosing: 'Typical research protocols: BPC-157 at 250-500mcg daily, TB-500 at 2-5mg weekly loading phase, 2mg weekly maintenance. Combined protocols show enhanced outcomes.'
    },
    {
      id: 'TC-004',
      name: 'L-Carnitine Injectable',
      category: 'metabolic',
      purity: '99.8%',
      cas: '541-15-1',
      molecular: 'C₇H₁₅NO₃',
      weight: '161.20',
      price: '$45.00',
      priceNum: 45.00,
      sizes: ['10ml', '20ml', '30ml', '50ml'],
      sizesPricing: {
        '10ml': 45.00,
        '20ml': 79.00,
        '30ml': 109.00,
        '50ml': 169.00
      },
      description: 'High-purity injectable carnitine',
      fullDescription: 'Pharmaceutical-grade L-Carnitine in injectable solution for research into fatty acid metabolism and mitochondrial function.',
      researchApplications: [
        'Fatty acid metabolism research',
        'Mitochondrial transport studies',
        'Energy production pathways',
        'Cellular bioenergetics'
      ],
      storage: '20-25°C, protect from light',
      form: 'Sterile solution',
      solubility: 'Pre-dissolved in sterile water (200 mg/ml)',
      stability: '24 months unopened',
      mechanism: 'Essential cofactor for fatty acid transport into mitochondria via the carnitine shuttle system. Facilitates long-chain fatty acid oxidation and ATP production. Modulates acetyl-CoA/CoA ratios affecting glucose metabolism and reduces accumulation of toxic acyl metabolites.',
      researchFindings: 'Research demonstrates enhanced fat oxidation rates, improved exercise performance markers, and increased mitochondrial efficiency in laboratory models. Studies show effects on reducing muscle damage markers and supporting recovery in research protocols.',
      researchDosing: 'Typical research protocols: 500-2000mg daily in divided doses. Injectable forms show superior bioavailability versus oral administration in research models.'
    },
    {
      id: 'TC-005',
      name: 'GHK-Cu',
      category: 'recovery',
      purity: '99.3%',
      cas: '49557-75-7',
      molecular: 'C₁₄H₂₂CuN₆O₄',
      weight: '402.91',
      price: '$65.00',
      priceNum: 65.00,
      sizes: ['50mg', '100mg', '200mg', '500mg'],
      sizesPricing: {
        '50mg': 65.00,
        '100mg': 119.00,
        '200mg': 219.00,
        '500mg': 499.00
      },
      description: 'Copper compound complex',
      fullDescription: 'GHK-Cu is a naturally-occurring copper complex studied in tissue remodeling and collagen synthesis research.',
      researchApplications: [
        'Collagen synthesis studies',
        'Tissue remodeling research',
        'Copper-compound interactions',
        'Cellular differentiation pathways'
      ],
      storage: '2-8°C short term, -20°C long term',
      form: 'Lyophilized powder',
      solubility: 'Water (10 mg/ml), saline',
      stability: '24 months at -20°C',
      mechanism: 'Copper-binding tripeptide that modulates multiple signaling pathways. Influences transforming growth factor-beta (TGF-β) expression, stimulates collagen synthesis and glycosaminoglycan production. Acts as potent tissue remodeling signal and modulates metalloproteinase activity in extracellular matrix.',
      researchFindings: 'Studies document enhanced collagen density, improved wound closure rates, and tissue remodeling effects in research models. Research shows influences on gene expression related to tissue repair, anti-inflammatory responses, and antioxidant enzyme activity.',
      researchDosing: 'Typical research protocols: 1-3mg daily subcutaneous administration, or topical application at 0.5-2% concentration in research settings.'
    },
    {
      id: 'TC-006',
      name: 'CJC-1295 / Ipamorelin',
      category: 'growth',
      purity: '99.1%',
      cas: '863288-34-0',
      molecular: 'C₁₆₅H₂₆₉N₄₇O₄₆',
      weight: '3647.28',
      price: '$109.00',
      priceNum: 109.00,
      sizes: ['5mg', '10mg', '15mg', '30mg'],
      sizesPricing: {
        '5mg': 109.00,
        '10mg': 199.00,
        '15mg': 279.00,
        '30mg': 519.00
      },
      description: 'Growth hormone secretagogue blend',
      fullDescription: 'This research compound combination pairs CJC-1295 with Ipamorelin for studies in endocrine signaling and pituitary function.',
      researchApplications: [
        'Growth hormone pathway research',
        'Pituitary function studies',
        'Endocrine signaling mechanisms',
        'Compound synergy investigation'
      ],
      storage: '2-8°C short term, -20°C long term',
      form: 'Lyophilized powder',
      solubility: 'Sterile water (1 mg/ml), bacteriostatic water',
      stability: '12 months at -20°C',
      mechanism: 'CJC-1295 is modified GHRH analog with extended half-life (6-8 days) that amplifies endogenous growth hormone pulse amplitude without suppressing natural pituitary function. Ipamorelin acts as selective ghrelin receptor agonist, stimulating GH release without affecting cortisol or prolactin levels. Synergistic activation of complementary pathways.',
      researchFindings: 'Research documents 5-10% increases in lean mass deposition over 12-week protocols. Studies show 50-100% elevation in IGF-1 levels within physiological ranges. Research models demonstrate enhanced protein synthesis, improved bone mineral density markers, and increased collagen density.',
      researchDosing: 'Typical research protocols: CJC-1295 at 1-2mg weekly, Ipamorelin at 100-300mcg administered 1-3x daily. Pre-sleep administration maximizes natural GH pulse synergy in research models.'
    }
  ];

  const addToCart = (product, size) => {
    const priceForSize = product.sizesPricing?.[size] || product.priceNum;
    const existingItem = cart.find(item => item.id === product.id && item.size === size);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, {
        id: product.id,
        name: product.name,
        size: size,
        quantity: 1,
        price: priceForSize,
        purity: product.purity
      }]);
    }
    
    // Show success popup
    setAddedProduct({ ...product, selectedSize: size });
    setShowCartPopup(true);
  };

  const removeFromCart = (id, size) => {
    setCart(cart.filter(item => !(item.id === id && item.size === size)));
  };

  const updateQuantity = (id, size, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(id, size);
    } else {
      setCart(cart.map(item =>
        item.id === id && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const viewProduct = (product) => {
    setSelectedProduct(product);
    setSelectedSize(product.sizes[0]);
    setPageTransition(true);
    setTimeout(() => {
      setCurrentPage('product');
      window.scrollTo({ top: 0, behavior: 'instant' });
      setPageTransition(false);
    }, 150);
  };

  const filteredProducts = products.filter(product => {
    // Category filter
    if (selectedCategory && product.category !== selectedCategory) return false;
    // Search filter
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(query) ||
      product.id.toLowerCase().includes(query) ||
      product.cas.includes(query) ||
      (product.description && product.description.toLowerCase().includes(query))
    );
  });

  // Helper to navigate to products with category filter
  const goToCategory = (category) => {
    setSelectedCategory(category);
    setPageTransition(true);
    setTimeout(() => {
      setCurrentPage('home');
      window.scrollTo({ top: 0, behavior: 'instant' });
      setPageTransition(false);
      setTimeout(() => {
        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 150);
  };

  // Mock PayRio payment processing (replace with actual PayRio SDK when ready)
  const processPayment = async (method, amount) => {
    // TODO: Replace with actual PayRio integration
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          transactionId: `TC-${Date.now()}`,
          amount: amount,
          method: method
        });
      }, 2000);
    });
  };

  // Mock Pearl API order submission (replace with actual Pearl API when ready)
  const submitOrderToPearl = async (orderData) => {
    // TODO: Replace with actual Pearl API endpoint
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          orderId: `TC-${Date.now()}`,
          trackingNumber: null,
          estimatedDelivery: '5-7 business days'
        });
      }, 1000);
    });
  };

  // COA PAGE
  if (currentPage === 'coa') {
    return (
      <div className={`min-h-screen bg-[#FAFAFA] ${pageTransition ? 'opacity-0' : 'animate-pageEnter'}`}>
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setCurrentPage('home')}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <div className="w-10 h-10 bg-black flex items-center justify-center">
                  <VialIcon inverted={false} size={38} />
                </div>
                <div>
                  <div className="text-2xl font-mono text-black lowercase" style={{ letterSpacing: '0.08em' }}>
                    <span className="font-bold">true</span>
                    <span className="font-normal">chem</span>
                  </div>
                  <div className="text-[9px] font-mono tracking-[0.15em] text-gray-500 uppercase">99%+ Certified</div>
                </div>
              </button>
              
              {/* Navigation */}
              <nav className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
                <button 
                  onClick={() => { setCurrentPage('home'); setTimeout(() => { document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }, 100); }}
                  className="text-sm font-medium hover:text-gray-600"
                >
                  Products
                </button>
                <button 
                  onClick={() => navigateTo('manufacturing')}
                  className="text-sm font-medium hover:text-gray-600"
                >
                  Actually U.S. made?
                </button>
                <button 
                  onClick={() => navigateTo('our-story')}
                  className="text-sm font-medium hover:text-gray-600"
                >
                  Why Truechem
                </button>
                <button 
                  onClick={() => navigateTo('coa')}
                  className="text-sm font-medium text-black"
                >
                  View COAs
                </button>
              </nav>

              <div className="flex items-center space-x-4">
                {/* Mobile Menu Button */}
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {isMenuOpen ? (
                      <path d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path d="M3 12h18M3 6h18M3 18h18" />
                    )}
                  </svg>
                </button>
                
                <div 
                  className="relative"
                  onMouseEnter={() => setShowCartHover(true)}
                  onMouseLeave={() => setShowCartHover(false)}
                >
                  <button 
                    onClick={() => navigateTo('cart')}
                    className="p-2 hover:bg-gray-100 rounded-lg relative transition-all duration-200"
                  >
                    <ShoppingCart size={20} />
                    {cart.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-mono">
                        {cart.length}
                      </span>
                    )}
                  </button>

                  {/* Cart Hover Preview - Hidden on mobile */}
                  {showCartHover && cart.length > 0 && (
                    <div className="hidden md:block absolute right-0 top-10 w-96 bg-white border border-gray-200 shadow-xl rounded-lg z-50 animate-fadeIn">
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-sm font-bold">Cart ({cart.length})</span>
                          <span className="text-xs text-gray-500">Hover to keep open</span>
                        </div>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {cart.map((item, index) => (
                          <div key={index} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                            <div className="flex justify-between items-start gap-3">
                              <button
                                onClick={() => {
                                  setSelectedProduct(products.find(p => p.name === item.name));
                                  setShowCartHover(false);
                                  setCurrentPage('home');
                                }}
                                className="flex-1 text-left hover:text-gray-600 transition-colors"
                              >
                                <div className="font-medium text-sm">{item.name}</div>
                                <div className="text-xs text-gray-500 mt-1">{item.size}</div>
                              </button>
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 bg-gray-100 rounded px-2 py-1">
                                  <button
                                    onClick={() => {
                                      const newCart = [...cart];
                                      if (newCart[index].quantity > 1) {
                                        newCart[index].quantity -= 1;
                                        setCart(newCart);
                                      }
                                    }}
                                    className="text-gray-600 hover:text-black text-sm font-mono"
                                  >
                                    −
                                  </button>
                                  <span className="text-xs font-mono w-6 text-center">{item.quantity || 1}</span>
                                  <button
                                    onClick={() => {
                                      const newCart = [...cart];
                                      newCart[index].quantity = (newCart[index].quantity || 1) + 1;
                                      setCart(newCart);
                                    }}
                                    className="text-gray-600 hover:text-black text-sm font-mono"
                                  >
                                    +
                                  </button>
                                </div>
                                <div className="text-sm font-mono w-16 text-right">${(parseFloat(item.price) * (item.quantity || 1)).toFixed(2)}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-4 bg-gray-50">
                        <button
                          onClick={() => { setCurrentPage('cart'); setShowCartHover(false); }}
                          className="w-full py-2 bg-black text-white font-mono text-sm hover:bg-gray-800 transition-colors duration-200"
                        >
                          View Cart
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden fixed top-[72px] left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-40 animate-fadeIn">
            <nav className="px-6 py-4 space-y-4">
              <button 
                onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); setTimeout(() => { document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }, 100); }}
                className="block w-full text-left text-base font-medium text-gray-900 hover:text-gray-600 hover:bg-gray-50 py-2 px-3 rounded-lg transition-all duration-200"
              >
                Products
              </button>
              <button 
                onClick={() => { setCurrentPage('manufacturing'); setIsMenuOpen(false); }}
                className="block w-full text-left text-base font-medium text-gray-900 hover:text-gray-600 hover:bg-gray-50 py-2 px-3 rounded-lg transition-all duration-200"
              >
                Actually U.S. made?
              </button>
              <button 
                onClick={() => { navigateTo('our-story'); setIsMenuOpen(false); }}
                className="block w-full text-left text-base font-medium text-gray-900 hover:text-gray-600 hover:bg-gray-50 py-2 px-3 rounded-lg transition-all duration-200"
              >
                Why Truechem
              </button>
              <button 
                onClick={() => { setCurrentPage('coa'); setIsMenuOpen(false); }}
                className="block w-full text-left text-base font-medium text-black hover:bg-gray-50 py-2 px-3 rounded-lg transition-all duration-200"
              >
                View COAs
              </button>
            </nav>
          </div>
        )}

        {/* COA Content */}
        <section className="py-20 px-6 lg:px-12 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 bg-black text-white text-[10px] font-mono tracking-[0.2em] uppercase mb-6">
                Certificates of Analysis
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-black mb-6">
                Cleaner. Safer. Stronger.
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Every batch is third-party tested. Download Certificates of Analysis for complete transparency and verification.
              </p>
            </div>

            {/* COA Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white border-2 border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-black mb-2">{product.name}</h3>
                    <div className="text-xs font-mono text-gray-500 mb-1">CAS: {product.cas}</div>
                    <div className="text-xs font-mono text-gray-500 mb-3">Purity: {product.purity}</div>
                  </div>
                  
                  <div className="flex gap-2 mb-4">
                    <button className="flex-1 px-4 py-3 bg-black text-white font-mono text-xs hover:bg-gray-800 transition-all shadow-[0_0_0_1px_rgba(0,0,0,0.1)]">
                      <span className="underline underline-offset-2">Current Batch</span>
                    </button>
                    <button className="flex-1 px-4 py-3 border border-gray-300 text-gray-900 font-mono text-xs hover:border-black transition-all shadow-[0_0_0_1px_rgba(0,0,0,0.05)]">
                      <span className="underline underline-offset-2">Previous Batch</span>
                    </button>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Batch: {product.id.toUpperCase()}-2024</span>
                      <span>Tested: Dec 2024</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Info Section */}
            <div className="mt-16 bg-gray-50 border border-gray-200 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4">What's in a COA?</h2>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div>
                  <div className="font-bold mb-2">Purity Analysis</div>
                  <p className="text-gray-600">HPLC verification showing compound purity exceeding 99%</p>
                </div>
                <div>
                  <div className="font-bold mb-2">Identity Confirmation</div>
                  <p className="text-gray-600">Mass spectrometry and NMR verification of molecular structure</p>
                </div>
                <div>
                  <div className="font-bold mb-2">Safety Testing</div>
                  <p className="text-gray-600">Heavy metal screening and microbial contamination testing</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COA Education Section */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12 bg-black text-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block px-3 py-1 border border-gray-700 text-[10px] font-mono tracking-[0.2em] uppercase mb-6 text-gray-400">
                Education
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                How to Read a Certificate of Analysis
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                A COA is your proof of quality. Here's what to look for—and why most suppliers don't want you to know this.
              </p>
            </div>
            
            {/* Interactive COA Breakdown */}
            <div className="bg-gray-900 border border-gray-800 p-6 sm:p-8 mb-8">
              <div className="flex items-center gap-2 mb-6">
                <FileText size={18} className="text-teal-400" />
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Sample COA Breakdown</span>
              </div>
              
              <div className="space-y-6">
                {/* Purity */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-800">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-teal-400 font-mono text-sm">01</span>
                      <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">Purity (HPLC)</span>
                    </div>
                    <p className="text-sm text-gray-400">
                      Percentage of actual compound vs. impurities. <span className="text-white">Our standard: 99%+.</span>
                    </p>
                  </div>
                  <div className="text-right mt-4 sm:mt-0">
                    <div className="text-3xl font-mono font-bold text-teal-400">99.65%</div>
                    <div className="text-xs font-mono text-gray-500">SPECIFICATION: ≥99%</div>
                  </div>
                </div>
                
                {/* Mass Spec */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-800">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-teal-400 font-mono text-sm">02</span>
                      <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">Molecular Weight (MS)</span>
                    </div>
                    <p className="text-sm text-gray-400">
                      Identity confirmation via mass spectrometry. <span className="text-white">Verifies correct compound.</span>
                    </p>
                  </div>
                  <div className="text-right mt-4 sm:mt-0">
                    <div className="text-3xl font-mono font-bold text-teal-400">4960.4</div>
                    <div className="text-xs font-mono text-gray-500">EXPECTED: 4960.37</div>
                  </div>
                </div>
                
                {/* Sterility */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-teal-400 font-mono text-sm">03</span>
                      <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">Sterility & Endotoxins</span>
                    </div>
                    <p className="text-sm text-gray-400">
                      Bacterial contamination screening. <span className="text-white">Many suppliers skip this.</span>
                    </p>
                  </div>
                  <div className="text-right mt-4 sm:mt-0">
                    <div className="text-3xl font-mono font-bold text-teal-400">&lt;0.25</div>
                    <div className="text-xs font-mono text-gray-500">LIMIT: &lt;0.5 EU/mg</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Red Flags */}
            <div className="bg-gray-900 border border-red-900/50 p-6">
              <div className="flex items-center gap-2 mb-6">
                <AlertCircle size={18} className="text-red-400" />
                <span className="font-bold">Red Flags: Signs of a Fake or Misleading COA</span>
              </div>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-0.5">✕</span>
                  <span>No independent lab name (in-house testing only)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-0.5">✕</span>
                  <span>Batch numbers that don't match your product</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-0.5">✕</span>
                  <span>Missing or expired test dates</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-0.5">✕</span>
                  <span>Only purity listed—no identity or sterility</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-0.5">✕</span>
                  <span>Generic templates used across all products</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Learn More CTA Section */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12 bg-white">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-black mb-4">
              Want to learn more?
            </h3>
            <p className="text-gray-600 mb-8">
              See our complete testing methodology and quality control process.
            </p>
            <button 
              onClick={() => navigateTo('testing')}
              className="px-8 py-4 bg-black text-white font-mono text-sm hover:bg-gray-800 transition-all"
            >
              View Testing Methodology →
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-6 lg:px-12 bg-black text-white">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              {/* Company */}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-black flex items-center justify-center"><VialIcon inverted={false} size={38} /></div>
                  <div>
                    <div className="text-2xl font-mono lowercase" style={{ letterSpacing: '0.08em' }}>
                      <span className="font-bold">true</span>
                      <span className="font-normal">chem</span>
                    </div>
                    <div className="text-[9px] font-mono tracking-[0.15em] text-gray-400 uppercase">99%+ Certified</div>
                  </div>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Manufactured in ISO 9001:2015 certified facilities. Ultra-pure compounds exceeding 99% purity for scientific research.
                </p>
              </div>

              {/* Products */}
              <div>
                <div className="text-xs font-mono tracking-wider text-gray-400 uppercase mb-4">Products</div>
                <ul className="space-y-2 text-sm">
                  <li><button onClick={() => goToCategory('glp1')} className="text-gray-300 hover:text-white transition-colors">GLP-1 Agonists</button></li>
                  <li><button onClick={() => goToCategory('growth')} className="text-gray-300 hover:text-white transition-colors">Growth Factors</button></li>
                  <li><button onClick={() => goToCategory('recovery')} className="text-gray-300 hover:text-white transition-colors">Recovery Compounds</button></li>
                  <li><button onClick={() => goToCategory('metabolic')} className="text-gray-300 hover:text-white transition-colors">Metabolic Compounds</button></li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <div className="text-xs font-mono tracking-wider text-gray-400 uppercase mb-4">Resources</div>
                <ul className="space-y-2 text-sm">
                  <li><button onClick={() => navigateTo('coa')} className="text-gray-300 hover:text-white transition-colors">Certificates of Analysis</button></li>
                  <li><button onClick={() => navigateTo('testing')} className="text-gray-300 hover:text-white transition-colors">Testing Methodology</button></li>
                  <li><button onClick={() => goToCategory(null)} className="text-gray-300 hover:text-white transition-colors">All Products</button></li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <div className="text-xs font-mono tracking-wider text-gray-400 uppercase mb-4">Company</div>
                <ul className="space-y-2 text-sm">
                  <li><button onClick={() => navigateTo('our-story')} className="text-gray-300 hover:text-white transition-colors">About Us</button></li>
                  <li><button onClick={() => navigateTo('testing')} className="text-gray-300 hover:text-white transition-colors">Quality Assurance</button></li>
                  <li><button onClick={() => navigateTo('contact')} className="text-gray-300 hover:text-white transition-colors">Contact</button></li>
                  <li><button onClick={() => navigateTo('tos')} className="text-gray-300 hover:text-white transition-colors">Terms of Service</button></li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-gray-800">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="text-xs font-mono text-gray-500">
                  © 2024 truechem. All rights reserved.
                </div>
                <div className="flex items-center space-x-6 text-xs font-mono text-gray-500">
                  <span>ISO 9001:2015 FACILITIES</span>
                  <span>•</span>
                  <span>THIRD-PARTY TESTED</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // MANUFACTURING PAGE
  if (currentPage === 'manufacturing') {
    return (
      <div className={`min-h-screen bg-[#FAFAFA] ${pageTransition ? 'opacity-0' : 'animate-pageEnter'}`}>
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setCurrentPage('home')}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <div className="w-10 h-10 bg-black flex items-center justify-center">
                  <VialIcon inverted={false} size={38} />
                </div>
                <div>
                  <div className="text-2xl font-mono text-black lowercase" style={{ letterSpacing: '0.08em' }}>
                    <span className="font-bold">true</span>
                    <span className="font-normal">chem</span>
                  </div>
                  <div className="text-[9px] font-mono tracking-[0.15em] text-gray-500 uppercase">99%+ Certified</div>
                </div>
              </button>
              
              {/* Navigation */}
              <nav className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
                <button 
                  onClick={() => { setCurrentPage('home'); setTimeout(() => { document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }, 100); }}
                  className="text-sm font-medium hover:text-gray-600"
                >
                  Products
                </button>
                <button 
                  onClick={() => navigateTo('manufacturing')}
                  className="text-sm font-medium text-black"
                >
                  Actually U.S. made?
                </button>
                <button 
                  onClick={() => { setCurrentPage('home'); setTimeout(() => { document.getElementById('why-truechem')?.scrollIntoView({ behavior: 'smooth' }); }, 100); }}
                  className="text-sm font-medium hover:text-gray-600"
                >
                  Why Truechem
                </button>
                <button 
                  onClick={() => { setCurrentPage('home'); setTimeout(() => { document.getElementById('purity')?.scrollIntoView({ behavior: 'smooth' }); }, 100); }}
                  className="text-sm font-medium hover:text-gray-600"
                >
                  Purity
                </button>
              </nav>

              <div className="flex items-center space-x-4">
                {/* Mobile Menu Button */}
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {isMenuOpen ? (
                      <path d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path d="M3 12h18M3 6h18M3 18h18" />
                    )}
                  </svg>
                </button>
                
                <div 
                  className="relative"
                  onMouseEnter={() => setShowCartHover(true)}
                  onMouseLeave={() => setShowCartHover(false)}
                >
                  <button 
                    onClick={() => navigateTo('cart')}
                    className="p-2 hover:bg-gray-100 rounded-lg relative transition-all duration-200"
                  >
                    <ShoppingCart size={20} />
                    {cart.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-mono">
                        {cart.length}
                      </span>
                    )}
                  </button>

                  {/* Cart Hover Preview - Hidden on mobile */}
                  {showCartHover && cart.length > 0 && (
                    <div className="hidden md:block absolute right-0 top-10 w-96 bg-white border border-gray-200 shadow-xl rounded-lg z-50 animate-fadeIn">
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-sm font-bold">Cart ({cart.length})</span>
                          <span className="text-xs text-gray-500">Hover to keep open</span>
                        </div>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {cart.map((item, index) => (
                          <div key={index} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                            <div className="flex justify-between items-start gap-3">
                              <button
                                onClick={() => {
                                  setSelectedProduct(products.find(p => p.name === item.name));
                                  setShowCartHover(false);
                                  setCurrentPage('home');
                                }}
                                className="flex-1 text-left hover:text-gray-600 transition-colors"
                              >
                                <div className="font-medium text-sm">{item.name}</div>
                                <div className="text-xs text-gray-500 mt-1">{item.size}</div>
                              </button>
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 bg-gray-100 rounded px-2 py-1">
                                  <button
                                    onClick={() => {
                                      const newCart = [...cart];
                                      if (newCart[index].quantity > 1) {
                                        newCart[index].quantity -= 1;
                                        setCart(newCart);
                                      }
                                    }}
                                    className="text-gray-600 hover:text-black text-sm font-mono"
                                  >
                                    −
                                  </button>
                                  <span className="text-xs font-mono w-6 text-center">{item.quantity || 1}</span>
                                  <button
                                    onClick={() => {
                                      const newCart = [...cart];
                                      newCart[index].quantity = (newCart[index].quantity || 1) + 1;
                                      setCart(newCart);
                                    }}
                                    className="text-gray-600 hover:text-black text-sm font-mono"
                                  >
                                    +
                                  </button>
                                </div>
                                <div className="text-sm font-mono w-16 text-right">${(parseFloat(item.price) * (item.quantity || 1)).toFixed(2)}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-4 bg-gray-50">
                        <button
                          onClick={() => { setCurrentPage('cart'); setShowCartHover(false); }}
                          className="w-full py-2 bg-black text-white font-mono text-sm hover:bg-gray-800 transition-colors duration-200"
                        >
                          View Cart
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden fixed top-[72px] left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-40 animate-fadeIn">
            <nav className="px-6 py-4 space-y-4">
              <button 
                onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); setTimeout(() => { document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }, 100); }}
                className="block w-full text-left text-base font-medium text-gray-900 hover:text-gray-600 hover:bg-gray-50 py-2 px-3 rounded-lg transition-all duration-200"
              >
                Products
              </button>
              <button 
                onClick={() => { setCurrentPage('manufacturing'); setIsMenuOpen(false); }}
                className="block w-full text-left text-base font-medium text-black hover:bg-gray-50 py-2 px-3 rounded-lg transition-all duration-200"
              >
                Actually U.S. made?
              </button>
              <button 
                onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); setTimeout(() => { document.getElementById('why-truechem')?.scrollIntoView({ behavior: 'smooth' }); }, 100); }}
                className="block w-full text-left text-base font-medium text-gray-900 hover:text-gray-600 hover:bg-gray-50 py-2 px-3 rounded-lg transition-all duration-200"
              >
                Why Truechem
              </button>
              <button 
                onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); setTimeout(() => { document.getElementById('purity')?.scrollIntoView({ behavior: 'smooth' }); }, 100); }}
                className="block w-full text-left text-base font-medium text-gray-900 hover:text-gray-600 hover:bg-gray-50 py-2 px-3 rounded-lg transition-all duration-200"
              >
                Purity
              </button>
            </nav>
          </div>
        )}

        {/* Manufacturing Transparency Content */}
        <section className="py-20 px-6 lg:px-12 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block px-3 py-1 bg-black text-white text-[10px] font-mono tracking-[0.2em] uppercase mb-6">
                Manufacturing Transparency
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-black mb-6">
                Not All "U.S. Companies" Use U.S. Manufacturing
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The research peptide industry has a transparency problem. Here's what you should know.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* The Problem */}
              <div className="bg-gray-50 border border-gray-200 p-8">
                <h2 className="text-xl font-bold mb-4 text-gray-900">The Industry Reality</h2>
                <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                  <p>
                    Many U.S.-based peptide suppliers source their compounds from overseas manufacturers, 
                    primarily in China and India, then relabel and resell them as their own products.
                  </p>
                  <p>
                    <span className="font-bold">There is no legal requirement to disclose manufacturing origin</span> for 
                    research compounds. A company can have a U.S. address, U.S. website, and U.S. customer 
                    service while manufacturing 100% overseas.
                  </p>
                  <p>
                    The peptide industry is largely unregulated. Unlike pharmaceutical drugs, research peptides 
                    don't require FDA approval, GMP certification, or origin disclosure.
                  </p>
                </div>
              </div>

              {/* Why It Matters */}
              <div className="bg-gray-50 border border-gray-200 p-8">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Why This Matters</h2>
                <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                  <p>
                    <span className="font-bold">Quality Control:</span> Overseas facilities often lack the 
                    rigorous quality standards required in U.S. pharmaceutical manufacturing. Average purity 
                    from overseas sources: 85-92%. U.S. pharmaceutical-grade: 98%+.
                  </p>
                  <p>
                    <span className="font-bold">Testing Inconsistency:</span> Many suppliers rely on manufacturer-provided 
                    Certificates of Analysis rather than independent third-party testing. The same batch tested 
                    by different labs can show purity variances of 5-10%.
                  </p>
                  <p>
                    <span className="font-bold">Supply Chain Opacity:</span> When your supplier doesn't manufacture, 
                    they can't control formulation, sterility, or storage conditions. You're trusting a middleman 
                    who's trusting a factory they may have never visited.
                  </p>
                </div>
              </div>
            </div>

            {/* The Facts */}
            <div className="bg-black text-white p-8 mb-12">
              <h2 className="text-2xl font-bold mb-6 text-center">Industry Facts</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-mono font-bold mb-2">~80%</div>
                  <div className="text-sm text-gray-400">
                    Estimated percentage of U.S. peptide suppliers sourcing from overseas manufacturers
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-mono font-bold mb-2">0</div>
                  <div className="text-sm text-gray-400">
                    Federal regulations requiring origin disclosure for research compounds
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-mono font-bold mb-2">5-10%</div>
                  <div className="text-sm text-gray-400">
                    Average purity variance between claimed and independently tested results
                  </div>
                </div>
              </div>
            </div>

            {/* How to Verify */}
            <div className="border border-gray-200 p-8 mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">How to Verify Manufacturing Origin</h2>
              <div className="space-y-4 text-sm text-gray-700">
                <div className="flex items-start space-x-3">
                  <span className="font-mono text-black font-bold text-lg">1.</span>
                  <p>
                    <span className="font-bold">Ask directly:</span> "Where is this compound manufactured?" 
                    A U.S. manufacturer will answer confidently. A reseller will dodge or give vague answers.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="font-mono text-black font-bold text-lg">2.</span>
                  <p>
                    <span className="font-bold">Request facility documentation:</span> U.S. manufacturers can 
                    provide GMP certification, ISO accreditation, and facility inspection records. Resellers cannot.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="font-mono text-black font-bold text-lg">3.</span>
                  <p>
                    <span className="font-bold">Examine the COA:</span> Check the testing lab location. If the COA 
                    comes from an overseas lab, the product was likely manufactured overseas.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="font-mono text-black font-bold text-lg">4.</span>
                  <p>
                    <span className="font-bold">Compare pricing:</span> U.S. manufacturing costs more. If prices 
                    are significantly below market average, they're likely sourcing cheaply from overseas.
                  </p>
                </div>
              </div>
            </div>

            {/* truechem's Position */}
            <div className="bg-gray-50 border-2 border-black p-10">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-black flex items-center justify-center flex-shrink-0"><VialIcon size={38} /></div>
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900">Our Commitment</h2>
                  <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                    <p>
                      truechem compounds are manufactured in ISO-certified U.S. facilities under pharmaceutical-grade 
                      standards. We don't outsource, relabel, or resell imported products.
                    </p>
                    <p>
                      Every batch undergoes independent third-party HPLC testing by U.S.-based laboratories. 
                      We provide the complete Certificate of Analysis—not a manufacturer's summary—with every order.
                    </p>
                    <p>
                      We charge more because U.S. manufacturing costs more. But you're paying for verifiable 
                      quality, transparent supply chains, and compounds that actually match their labels.
                    </p>
                    <div className="pt-4 border-t border-gray-300 mt-6">
                      <p className="font-mono text-xs text-gray-600">
                        Manufacturing facility documentation available upon request.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 text-center">
              <button
                onClick={() => setCurrentPage('home')}
                className="px-8 py-4 bg-black text-white font-mono text-sm hover:bg-gray-800 transition-all inline-block"
              >
                View Products
              </button>
            </div>

          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-6 lg:px-12 bg-black text-white">
          <div className="max-w-[1400px] mx-auto text-center">
            <div className="text-sm text-gray-400">
              © 2024 truechem. Research use only.
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // CART PAGE
  if (currentPage === 'cart') {
    return (
      <div className={`min-h-screen flex flex-col bg-[#FAFAFA] ${pageTransition ? 'opacity-0' : 'animate-pageEnter'}`}>
        <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between h-20">
              <button onClick={() => navigateTo('home')} className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-black flex items-center justify-center"><VialIcon inverted={false} size={38} /></div>
                <div>
                  <div className="text-2xl font-mono text-black lowercase" style={{ letterSpacing: '0.08em' }}>
                    <span className="font-bold">true</span>
                    <span className="font-normal">chem</span>
                  </div>
                  <div className="text-[9px] font-mono tracking-[0.15em] text-gray-500 uppercase">99%+ Certified</div>
                </div>
              </button>
              <button 
                onClick={() => setCurrentPage('home')}
                className="text-sm font-medium text-gray-900 hover:text-gray-600"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </header>

        <section className="flex-1 pt-24 sm:pt-32 pb-8 sm:pb-16 px-4 sm:px-6 lg:px-12">
          <div className="max-w-[1200px] mx-auto">
            <h1 className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-4">Shopping Cart</h1>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-12">Review your order</p>

            {cart.length === 0 ? (
              <div className="bg-white p-8 sm:p-12 text-center border">
                <ShoppingCart size={36} className="mx-auto mb-3 text-gray-300 sm:w-12 sm:h-12" />
                <h3 className="text-lg sm:text-xl font-bold mb-2">Your cart is empty</h3>
                <button 
                  onClick={() => setCurrentPage('home')}
                  className="mt-3 px-6 py-2.5 sm:mt-4 sm:px-8 sm:py-3 bg-black text-white font-mono text-sm hover:bg-gray-800 transition-all shadow-[0_0_0_1px_rgba(0,0,0,0.1)]"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-4 sm:gap-8">
                <div className="lg:col-span-2 space-y-3 sm:space-y-4">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="bg-white border p-3 sm:p-6">
                      <div className="flex gap-3 sm:gap-6">
                        <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gray-100 border flex items-center justify-center flex-shrink-0">
                          <Beaker size={24} className="text-gray-400 sm:w-8 sm:h-8" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2 sm:mb-3">
                            <div className="min-w-0">
                              <div className="text-[10px] sm:text-xs font-mono text-gray-400">{item.id}</div>
                              <h3 className="text-base sm:text-xl font-bold truncate">{item.name}</h3>
                              <div className="text-xs sm:text-sm font-mono text-gray-500">
                                {item.size} • {item.purity}
                              </div>
                            </div>
                            <button onClick={() => removeFromCart(item.id, item.size)} className="p-1 -mr-1">
                              <X size={18} className="sm:w-5 sm:h-5" />
                            </button>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-1 sm:space-x-2">
                              <button 
                                onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                className="w-7 h-7 sm:w-8 sm:h-8 border hover:bg-black hover:text-white text-sm"
                              >
                                -
                              </button>
                              <span className="w-8 sm:w-12 text-center font-mono text-sm">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                className="w-7 h-7 sm:w-8 sm:h-8 border hover:bg-black hover:text-white text-sm"
                              >
                                +
                              </button>
                            </div>
                            <div className="text-lg sm:text-2xl font-mono font-bold">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="lg:col-span-1">
                  <div className="bg-white border p-4 sm:p-6 sticky top-24">
                    <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6">Order Summary</h3>
                    <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b">
                      <div className="flex justify-between text-sm sm:text-base">
                        <span>Subtotal ({cartItemCount} items)</span>
                        <span className="font-mono">${cartTotal.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mb-4 sm:mb-6">
                      <span className="font-mono uppercase text-xs sm:text-sm">Total</span>
                      <span className="text-2xl sm:text-3xl font-mono font-bold">${cartTotal.toFixed(2)}</span>
                    </div>
                    <button 
                      onClick={() => navigateTo('checkout')}
                      className="w-full py-3 sm:py-4 bg-black text-white mb-2 sm:mb-3 hover:bg-gray-800 font-mono text-sm transition-all shadow-[0_0_0_1px_rgba(0,0,0,0.1)]"
                    >
                      <svg width="42" height="18" viewBox="0 0 42 18" fill="none" className="inline mr-2">
                        <path d="M7.4 0.9c-0.4 0.5-1 0.8-1.7 0.8-0.1 0-0.1-0.1-0.1-0.1 0-0.5 0.2-1 0.5-1.4 0.4-0.5 1-0.9 1.6-0.9 0.1 0 0.1 0.1 0.1 0.1 0 0.5-0.2 0.9-0.4 1.5zM7.5 2c-0.9 0-1.6 0.5-2 0.5-0.5 0-1.2-0.5-2-0.5-1 0-2 0.6-2.5 1.5-1.1 1.8-0.3 4.5 0.8 6 0.5 0.7 1.1 1.5 2 1.5 0.8 0 1.1-0.5 2-0.5 0.9 0 1.1 0.5 2 0.5 0.8 0 1.4-0.8 1.9-1.5 0.6-0.8 0.8-1.6 0.8-1.6 0 0-1.6-0.6-1.6-2.4 0-1.5 1.2-2.2 1.3-2.3-0.7-1-1.8-1.2-2.2-1.2z" fill="currentColor"/>
                      </svg>
                      Pay
                    </button>
                    <button 
                      onClick={() => navigateTo('checkout')}
                      className="w-full py-3 sm:py-4 border-2 border-black font-mono text-sm hover:bg-black hover:text-white transition-all shadow-[0_0_0_1px_rgba(0,0,0,0.08)]"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-auto py-8 sm:py-16 px-4 sm:px-6 lg:px-12 bg-black text-white">
          <div className="max-w-[1400px] mx-auto">
            {/* Mobile: Simple footer */}
            <div className="md:hidden">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-black flex items-center justify-center"><VialIcon inverted={false} size={30} /></div>
                <div>
                  <div className="text-xl font-mono lowercase" style={{ letterSpacing: '0.08em' }}>
                    <span className="font-bold">true</span>
                    <span className="font-normal">chem</span>
                  </div>
                </div>
              </div>
              <div className="text-center text-xs text-gray-500 space-y-2">
                <div>ISO 9001:2015 FACILITIES • THIRD-PARTY TESTED</div>
                <div>© 2024 truechem. All rights reserved.</div>
              </div>
            </div>
            
            {/* Desktop: Full footer */}
            <div className="hidden md:block">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              {/* Company */}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-black flex items-center justify-center"><VialIcon inverted={false} size={38} /></div>
                  <div>
                    <div className="text-2xl font-mono lowercase" style={{ letterSpacing: '0.08em' }}>
                      <span className="font-bold">true</span>
                      <span className="font-normal">chem</span>
                    </div>
                    <div className="text-[9px] font-mono tracking-[0.15em] text-gray-400 uppercase">99%+ Certified</div>
                  </div>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Manufactured in ISO 9001:2015 certified facilities. Ultra-pure compounds exceeding 99% purity for scientific research.
                </p>
              </div>

              {/* Products */}
              <div>
                <div className="text-xs font-mono tracking-wider text-gray-400 uppercase mb-4">Products</div>
                <ul className="space-y-2 text-sm">
                  <li><button onClick={() => goToCategory('glp1')} className="text-gray-300 hover:text-white transition-colors">GLP-1 Agonists</button></li>
                  <li><button onClick={() => goToCategory('growth')} className="text-gray-300 hover:text-white transition-colors">Growth Factors</button></li>
                  <li><button onClick={() => goToCategory('recovery')} className="text-gray-300 hover:text-white transition-colors">Recovery Compounds</button></li>
                  <li><button onClick={() => goToCategory('metabolic')} className="text-gray-300 hover:text-white transition-colors">Metabolic Compounds</button></li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <div className="text-xs font-mono tracking-wider text-gray-400 uppercase mb-4">Resources</div>
                <ul className="space-y-2 text-sm">
                  <li><button onClick={() => navigateTo('coa')} className="text-gray-300 hover:text-white transition-colors">Certificates of Analysis</button></li>
                  <li><button onClick={() => navigateTo('testing')} className="text-gray-300 hover:text-white transition-colors">Testing Methodology</button></li>
                  <li><button onClick={() => goToCategory(null)} className="text-gray-300 hover:text-white transition-colors">All Products</button></li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <div className="text-xs font-mono tracking-wider text-gray-400 uppercase mb-4">Company</div>
                <ul className="space-y-2 text-sm">
                  <li><button onClick={() => navigateTo('our-story')} className="text-gray-300 hover:text-white transition-colors">About Us</button></li>
                  <li><button onClick={() => navigateTo('testing')} className="text-gray-300 hover:text-white transition-colors">Quality Assurance</button></li>
                  <li><button onClick={() => navigateTo('contact')} className="text-gray-300 hover:text-white transition-colors">Contact</button></li>
                  <li><button onClick={() => navigateTo('tos')} className="text-gray-300 hover:text-white transition-colors">Terms of Service</button></li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-gray-800">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="text-xs font-mono text-gray-500">
                  © 2024 truechem. All rights reserved.
                </div>
                <div className="flex items-center space-x-6 text-xs font-mono text-gray-500">
                  <span>ISO 9001:2015 FACILITIES</span>
                  <span>•</span>
                  <span>THIRD-PARTY TESTED</span>
                </div>
              </div>
            </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // PRODUCT PAGE  
  if (currentPage === 'product' && selectedProduct) {
    return (
      <div className={`min-h-screen bg-[#FAFAFA] ${pageTransition ? 'opacity-0' : 'animate-pageEnter'}`}>
        <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between h-20">
              <button onClick={() => navigateTo('home')} className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-black flex items-center justify-center"><VialIcon inverted={false} size={38} /></div>
                <div>
                  <div className="text-2xl font-mono text-black lowercase" style={{ letterSpacing: '0.08em' }}>
                    <span className="font-bold">true</span>
                    <span className="font-normal">chem</span>
                  </div>
                  <div className="text-[9px] font-mono tracking-[0.15em] text-gray-500 uppercase">99%+ Certified</div>
                </div>
              </button>
              <div className="flex items-center space-x-6">
                <button 
                  onClick={() => setCurrentPage('home')}
                  className="text-sm font-medium hover:text-gray-600"
                >
                  ← Back to Products
                </button>
                <button 
                  onClick={() => navigateTo('cart')}
                  className="p-2 hover:bg-gray-100 rounded-lg relative"
                >
                  <ShoppingCart size={20} />
                  {cartItemCount > 0 && (
                    <span className="absolute top-1 right-1 w-5 h-5 bg-black text-white text-[10px] font-mono font-bold rounded-full flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>

        <section className="pt-32 pb-16 px-6 lg:px-12">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              <div className="bg-white border p-12 flex items-center justify-center aspect-square">
                <Beaker size={120} className="text-gray-300" />
              </div>

              <div>
                <div className="text-xs font-mono text-gray-400 mb-3">{selectedProduct.id}</div>
                {selectedProduct.badge && (
                  <div className="inline-block px-3 py-1 bg-black text-white text-[9px] font-mono uppercase mb-4">
                    {selectedProduct.badge}
                  </div>
                )}
                <h1 className="text-5xl font-bold mb-4">{selectedProduct.name}</h1>
                <p className="text-lg text-gray-600 mb-8">{selectedProduct.fullDescription}</p>

                <div className="inline-flex items-center space-x-4 mb-8">
                  <div className="px-4 py-2 bg-black text-white text-sm font-mono font-bold">
                    PURITY: {selectedProduct.purity}
                  </div>
                </div>

                <div className="border bg-white p-6 mb-8">
                  <div className="text-xs font-mono text-gray-400 uppercase mb-4">Technical Specifications</div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm font-mono">
                      <span className="text-gray-600">CAS Number</span>
                      <span>{selectedProduct.cas}</span>
                    </div>
                    <div className="flex justify-between text-sm font-mono">
                      <span className="text-gray-600">Molecular Formula</span>
                      <span>{selectedProduct.molecular}</span>
                    </div>
                    <div className="flex justify-between text-sm font-mono">
                      <span className="text-gray-600">Molecular Weight</span>
                      <span>{selectedProduct.weight} g/mol</span>
                    </div>
                    <div className="flex justify-between text-sm font-mono">
                      <span className="text-gray-600">Form</span>
                      <span>{selectedProduct.form}</span>
                    </div>
                    <div className="flex justify-between text-sm font-mono">
                      <span className="text-gray-600">Storage</span>
                      <span>{selectedProduct.storage}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-xs font-mono text-gray-400 uppercase mb-3">Select Size</div>
                  <div className="grid grid-cols-4 gap-3">
                    {selectedProduct.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-3 px-4 border-2 font-mono text-sm ${
                          selectedSize === size
                            ? 'border-black bg-black text-white'
                            : 'border-gray-300 hover:border-black'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-4xl font-mono font-bold mb-8">
                  ${selectedProduct.sizesPricing?.[selectedSize] || selectedProduct.priceNum}
                </div>

                <button
                  onClick={() => {
                    addToCart(selectedProduct, selectedSize);
                  }}
                  className="w-full py-4 bg-black text-white font-mono text-sm hover:bg-gray-800 mb-3 transition-all shadow-[0_0_0_1px_rgba(0,0,0,0.1)]"
                >
                  Add to Cart — ${selectedProduct.sizesPricing?.[selectedSize] || selectedProduct.priceNum}
                </button>

                <button
                  onClick={() => navigateTo('cart')}
                  className="w-full py-4 border-2 border-gray-300 font-mono text-sm hover:border-black transition-all shadow-[0_0_0_1px_rgba(0,0,0,0.05)]"
                >
                  View Cart
                </button>
              </div>
            </div>

            {/* Mechanism of Action */}
            {selectedProduct.mechanism && (
              <div className="bg-white border p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">Mechanism of Action</h2>
                <p className="text-gray-700 leading-relaxed">
                  {selectedProduct.mechanism}
                </p>
              </div>
            )}

            {/* Research Findings */}
            {selectedProduct.researchFindings && (
              <div className="bg-white border p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">Published Research</h2>
                <p className="text-gray-700 leading-relaxed">
                  {selectedProduct.researchFindings}
                </p>
              </div>
            )}

            <div className="bg-white border p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Research Applications</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {selectedProduct.researchApplications.map((app, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <CheckCircle size={20} className="mt-0.5" />
                    <span>{app}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border p-8 mb-8">
              <h2 className="text-2xl font-bold mb-3">Certificate of Analysis</h2>
              <p className="text-gray-600 mb-6">
                Third-party tested and verified. View comprehensive purity analysis.
              </p>
              <button className="px-6 py-3 border-2 border-black font-mono text-sm hover:bg-black hover:text-white transition-all shadow-[0_0_0_1px_rgba(0,0,0,0.08)]">
                Download COA (PDF)
              </button>
            </div>

            <div className="bg-black text-white p-8">
              <div className="flex items-start space-x-4">
                <Shield size={32} className="flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-3">Research Use Only</h3>
                  <p className="text-gray-300 mb-4">
                    This product is intended for laboratory research purposes only. NOT FOR HUMAN CONSUMPTION.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• You are a qualified research professional</li>
                    <li>• This product will be used solely for in-vitro research</li>
                    <li>• This product has not been evaluated for safety in humans</li>
                    <li>• You comply with all applicable regulations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-6 lg:px-12 bg-black text-white">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              {/* Company */}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-black flex items-center justify-center"><VialIcon inverted={false} size={38} /></div>
                  <div>
                    <div className="text-2xl font-mono lowercase" style={{ letterSpacing: '0.08em' }}>
                      <span className="font-bold">true</span>
                      <span className="font-normal">chem</span>
                    </div>
                    <div className="text-[9px] font-mono tracking-[0.15em] text-gray-400 uppercase">99%+ Certified</div>
                  </div>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Manufactured in ISO 9001:2015 certified facilities. Ultra-pure compounds exceeding 99% purity for scientific research.
                </p>
              </div>

              {/* Products */}
              <div>
                <div className="text-xs font-mono tracking-wider text-gray-400 uppercase mb-4">Products</div>
                <ul className="space-y-2 text-sm">
                  <li><button onClick={() => goToCategory('glp1')} className="text-gray-300 hover:text-white transition-colors">GLP-1 Agonists</button></li>
                  <li><button onClick={() => goToCategory('growth')} className="text-gray-300 hover:text-white transition-colors">Growth Factors</button></li>
                  <li><button onClick={() => goToCategory('recovery')} className="text-gray-300 hover:text-white transition-colors">Recovery Compounds</button></li>
                  <li><button onClick={() => goToCategory('metabolic')} className="text-gray-300 hover:text-white transition-colors">Metabolic Compounds</button></li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <div className="text-xs font-mono tracking-wider text-gray-400 uppercase mb-4">Resources</div>
                <ul className="space-y-2 text-sm">
                  <li><button onClick={() => navigateTo('coa')} className="text-gray-300 hover:text-white transition-colors">Certificates of Analysis</button></li>
                  <li><button onClick={() => navigateTo('testing')} className="text-gray-300 hover:text-white transition-colors">Testing Methodology</button></li>
                  <li><button onClick={() => goToCategory(null)} className="text-gray-300 hover:text-white transition-colors">All Products</button></li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <div className="text-xs font-mono tracking-wider text-gray-400 uppercase mb-4">Company</div>
                <ul className="space-y-2 text-sm">
                  <li><button onClick={() => navigateTo('our-story')} className="text-gray-300 hover:text-white transition-colors">About Us</button></li>
                  <li><button onClick={() => navigateTo('testing')} className="text-gray-300 hover:text-white transition-colors">Quality Assurance</button></li>
                  <li><button onClick={() => navigateTo('contact')} className="text-gray-300 hover:text-white transition-colors">Contact</button></li>
                  <li><button onClick={() => navigateTo('tos')} className="text-gray-300 hover:text-white transition-colors">Terms of Service</button></li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-gray-800">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="text-xs font-mono text-gray-500">
                  © 2024 truechem. All rights reserved.
                </div>
                <div className="flex items-center space-x-6 text-xs font-mono text-gray-500">
                  <span>ISO 9001:2015 FACILITIES</span>
                  <span>•</span>
                  <span>THIRD-PARTY TESTED</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // OUR STORY PAGE
  if (currentPage === 'our-story') {
    return (
      <div className={`min-h-screen bg-black ${pageTransition ? 'opacity-0' : 'animate-pageEnter'}`}>
        <header className="bg-black border-b border-gray-800 sticky top-0 z-50">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6">
            <div className="flex items-center justify-between">
              <button onClick={() => setCurrentPage('home')} className="flex items-center space-x-3 cursor-pointer">
                <div className="w-10 h-10 bg-white flex items-center justify-center"><VialIcon inverted={true} size={38} /></div>
                <div>
                  <div className="text-2xl font-mono text-white lowercase" style={{ letterSpacing: '0.08em' }}>
                    <span className="font-bold">true</span><span className="font-normal">chem</span>
                  </div>
                  <div className="text-[9px] font-mono tracking-[0.15em] text-gray-500 uppercase">99%+ Certified</div>
                </div>
              </button>
              <button onClick={() => navigateTo('home')} className="text-sm font-medium text-gray-400 hover:text-white">
                ← Back to Home
              </button>
            </div>
          </div>
        </header>

        {/* Our Story */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block px-3 py-1 border border-gray-700 text-[10px] font-mono tracking-[0.2em] uppercase mb-6 text-gray-400">
                Our Story
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                Why truechem Exists
              </h1>
            </div>
            
            <div className="space-y-6 text-gray-300 text-base sm:text-lg leading-relaxed">
              <p>
                We started truechem because we were tired of the gamble.
              </p>
              <p>
                As researchers ourselves, we ordered from dozens of suppliers. Some products worked. Most didn't. 
                The "99% purity" on the label rarely matched reality. When we sent samples to independent labs, 
                we found <span className="text-white font-semibold">purities as low as 72%</span> from suppliers claiming research-grade quality.
              </p>
              <p>
                Many of these same suppliers advertised "US-made"—but when we looked closer, their COAs came from 
                overseas labs. The compounds were imported, relabeled, and sold as domestic.
              </p>
              <p className="text-gray-400 italic">
                Ever wonder where your peptides actually come from? <button onClick={() => navigateTo('manufacturing')} className="text-white underline underline-offset-2 hover:text-gray-300 not-italic">We did too.</button>
              </p>
              <p className="text-white font-medium text-lg sm:text-xl border-l-4 border-white pl-4 sm:pl-6 py-2">
                We built truechem to be the company we wished existed when we were buying peptides.
              </p>
              <p>
                Where every batch is independently tested. Where every result is published. Where U.S. manufacturing 
                means actually made here—not imported and relabeled.
              </p>
            </div>
            
            <div className="mt-12 grid grid-cols-3 gap-4 sm:gap-8 pt-8 border-t border-gray-800">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-mono font-bold text-white mb-1">2024</div>
                <div className="text-[10px] sm:text-xs font-mono text-gray-500 uppercase">Founded</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-mono font-bold text-white mb-1">100%</div>
                <div className="text-[10px] sm:text-xs font-mono text-gray-500 uppercase">US Made</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-mono font-bold text-white mb-1">0</div>
                <div className="text-[10px] sm:text-xs font-mono text-gray-500 uppercase">Middlemen</div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Wished Existed */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-t border-gray-800">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
              What we wished existed.
            </h2>
            
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>
                A supplier where you didn't have to take their word for it.
              </p>
              <p>
                Where every batch was tested by someone with no stake in the results. 
                Where you could look up your exact batch and see the data yourself. 
                Where "US-made" actually meant synthesized here—not imported and relabeled.
              </p>
              <p>
                We couldn't find that company. So we built it.
              </p>
            </div>
          </div>
        </section>

        {/* How We Operate - Visual */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-t border-gray-800">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-12 text-center">
              How we operate.
            </h2>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="border border-gray-800 p-6 hover:border-teal-400/50 transition-all duration-300 group">
                <div className="w-12 h-12 border border-gray-700 flex items-center justify-center mb-4 group-hover:border-teal-400/50 transition-colors">
                  <Shield size={24} className="text-teal-400" />
                </div>
                <h3 className="text-white font-bold mb-2">US Manufacturing</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Synthesized in ISO-certified facilities here. Not imported. Not relabeled.
                </p>
              </div>

              <div className="border border-gray-800 p-6 hover:border-teal-400/50 transition-all duration-300 group">
                <div className="w-12 h-12 border border-gray-700 flex items-center justify-center mb-4 group-hover:border-teal-400/50 transition-colors">
                  <Award size={24} className="text-teal-400" />
                </div>
                <h3 className="text-white font-bold mb-2">Independent Testing</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Every batch goes to a third-party lab. We don't grade our own homework.
                </p>
              </div>

              <div className="border border-gray-800 p-6 hover:border-teal-400/50 transition-all duration-300 group">
                <div className="w-12 h-12 border border-gray-700 flex items-center justify-center mb-4 group-hover:border-teal-400/50 transition-colors">
                  <FileText size={24} className="text-teal-400" />
                </div>
                <h3 className="text-white font-bold mb-2">Published Results</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Every COA is on our site. Look up your batch before you use it.
                </p>
              </div>

              <div className="border border-gray-800 p-6 hover:border-teal-400/50 transition-all duration-300 group">
                <div className="w-12 h-12 border border-gray-700 flex items-center justify-center mb-4 group-hover:border-teal-400/50 transition-colors">
                  <CheckCircle size={24} className="text-teal-400" />
                </div>
                <h3 className="text-white font-bold mb-2">No Exceptions</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  If it doesn't pass, it doesn't ship. Simple as that.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why We Cost More */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-t border-gray-800">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
              A note on pricing.
            </h2>

            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>
                We're not the cheapest option. We know that.
              </p>
              <p>
                US manufacturing costs more. Independent testing costs more. 
                We've accepted that as the cost of doing things the way we think they should be done.
              </p>
              <p className="text-gray-400">
                For some people, price is the priority—and that's okay. 
                For others, knowing exactly what they're getting is worth paying a bit more.
              </p>
              <p className="text-white">
                We built truechem for the second group.
              </p>
            </div>
          </div>
        </section>

        {/* Soft Close */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-t border-gray-800">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-gray-400 leading-relaxed">
              That's our story. If it resonates, take a look around. 
              If you have questions, we're happy to answer them.
            </p>
          </div>
        </section>

        <footer className="bg-black text-white py-12 px-6 lg:px-12 border-t border-gray-800">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white flex items-center justify-center"><VialIcon size={30} inverted={true} /></div>
                <span className="text-lg font-mono lowercase" style={{ letterSpacing: '0.08em' }}>
                  <span className="font-bold">true</span><span className="font-normal">chem</span>
                </span>
              </div>
              <div className="text-xs text-gray-500">
                For research purposes only. © 2024 truechem
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // TESTING METHODOLOGY PAGE
  if (currentPage === 'testing') {
    return (
      <div className={`min-h-screen bg-white ${pageTransition ? 'opacity-0' : 'animate-pageEnter'}`}>
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6">
            <div className="flex items-center justify-between">
              <button onClick={() => setCurrentPage('home')} className="flex items-center space-x-3 cursor-pointer">
                <div className="w-10 h-10 bg-black flex items-center justify-center"><VialIcon inverted={false} size={38} /></div>
                <div>
                  <div className="text-2xl font-mono text-black lowercase" style={{ letterSpacing: '0.08em' }}>
                    <span className="font-bold">true</span><span className="font-normal">chem</span>
                  </div>
                  <div className="text-[9px] font-mono tracking-[0.15em] text-gray-500 uppercase">99%+ Certified</div>
                </div>
              </button>
              <button onClick={() => navigateTo('home')} className="text-sm font-medium text-gray-600 hover:text-black">
                ← Back to Home
              </button>
            </div>
          </div>
        </header>

        {/* Hero - Clean, minimal */}
        <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 bg-white border-b border-gray-100">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 text-xs font-mono tracking-wider uppercase mb-8 text-gray-500">
              <Shield size={14} className="text-gray-400" />
              Quality Assurance
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6 tracking-tight">
              Testing & Verification
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto">
              Every compound is independently verified before it reaches you. Here's exactly how we ensure purity, identity, and sterility.
            </p>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="py-8 px-4 sm:px-6 lg:px-12 bg-gray-100">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-2xl sm:text-3xl font-mono font-bold text-black mb-1">100%</div>
                <div className="text-xs font-mono text-gray-500 uppercase tracking-wider">Third-Party Tested</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-mono font-bold text-black mb-1">99%+</div>
                <div className="text-xs font-mono text-gray-500 uppercase tracking-wider">Purity Standard</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-mono font-bold text-black mb-1">0%</div>
                <div className="text-xs font-mono text-gray-500 uppercase tracking-wider">In-House COAs</div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Independent Testing - Clean prose */}
        <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-12">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-black mb-8">
              Why independent testing matters
            </h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                Most suppliers rely on Certificates of Analysis provided by the manufacturer—the same company that profits from higher purity claims. This creates an obvious conflict of interest.
              </p>
              <p>
                We take a different approach. Every batch we produce is sent to an independent, third-party laboratory that has no financial stake in the results. If a compound doesn't meet our standards, we don't ship it.
              </p>
              <p className="text-black font-medium">
                Independent verification isn't just a marketing claim—it's the foundation of research integrity.
              </p>
            </div>
          </div>
        </section>

        {/* The Three Pillars of Testing */}
        <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-12 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
                Three pillars of verification
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Each compound undergoes three distinct types of analysis before release.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Purity */}
              <div className="bg-white p-8 border border-gray-200">
                <div className="w-14 h-14 bg-black flex items-center justify-center mb-6">
                  <span className="text-white font-mono font-bold text-lg">01</span>
                </div>
                <h3 className="text-xl font-bold text-black mb-3">Purity Analysis</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  High-Performance Liquid Chromatography (HPLC) separates the target compound from any impurities and calculates the exact percentage of pure substance.
                </p>
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-gray-400 uppercase">Our Standard</span>
                    <span className="text-lg font-mono font-bold text-black">≥99%</span>
                  </div>
                </div>
              </div>

              {/* Identity */}
              <div className="bg-white p-8 border border-gray-200">
                <div className="w-14 h-14 bg-black flex items-center justify-center mb-6">
                  <span className="text-white font-mono font-bold text-lg">02</span>
                </div>
                <h3 className="text-xl font-bold text-black mb-3">Identity Confirmation</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Mass Spectrometry (MS) measures the molecular weight to confirm you're receiving the correct compound—not a substitute, degraded product, or mislabeled substance.
                </p>
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-gray-400 uppercase">Verification</span>
                    <span className="text-lg font-mono font-bold text-black">MS Confirmed</span>
                  </div>
                </div>
              </div>

              {/* Sterility */}
              <div className="bg-white p-8 border border-gray-200">
                <div className="w-14 h-14 bg-black flex items-center justify-center mb-6">
                  <span className="text-white font-mono font-bold text-lg">03</span>
                </div>
                <h3 className="text-xl font-bold text-black mb-3">Sterility & Endotoxins</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  LAL testing detects bacterial endotoxins (pyrogens) that could compromise research results. This critical test is often skipped by other suppliers.
                </p>
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-gray-400 uppercase">Limit</span>
                    <span className="text-lg font-mono font-bold text-black">&lt;0.5 EU/mg</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Timeline - Clean steps */}
        <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-black mb-4 text-center">
              From synthesis to shipment
            </h2>
            <p className="text-gray-500 text-center mb-16 max-w-xl mx-auto">
              Our quality control process at every stage.
            </p>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-200 hidden sm:block" />

              <div className="space-y-12">
                {/* Step 1 */}
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-black text-white flex items-center justify-center flex-shrink-0 font-mono font-bold z-10">
                    1
                  </div>
                  <div className="pt-2">
                    <h3 className="font-bold text-black text-lg mb-2">Synthesis in ISO-Certified Facilities</h3>
                    <p className="text-gray-600 leading-relaxed">
                      All compounds are synthesized domestically in ISO 9001:2015 certified facilities with full environmental controls. Each batch receives a unique lot number for complete traceability.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-black text-white flex items-center justify-center flex-shrink-0 font-mono font-bold z-10">
                    2
                  </div>
                  <div className="pt-2">
                    <h3 className="font-bold text-black text-lg mb-2">Independent Laboratory Submission</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Representative samples from each batch are sent to a third-party analytical laboratory. The lab operates independently—they have no financial relationship with our manufacturing.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-black text-white flex items-center justify-center flex-shrink-0 font-mono font-bold z-10">
                    3
                  </div>
                  <div className="pt-2">
                    <h3 className="font-bold text-black text-lg mb-2">Comprehensive Analysis</h3>
                    <p className="text-gray-600 leading-relaxed">
                      The laboratory performs HPLC purity testing, mass spectrometry identity confirmation, and endotoxin screening. Results include raw chromatographic data, calibration records, and analyst verification.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-black text-white flex items-center justify-center flex-shrink-0 font-mono font-bold z-10">
                    4
                  </div>
                  <div className="pt-2">
                    <h3 className="font-bold text-black text-lg mb-2">Quality Review & Release</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Results are reviewed against our specifications. Batches meeting all criteria (≥99% purity, confirmed identity, sterility pass) are approved. Failing batches are rejected—no exceptions.
                    </p>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-black text-white flex items-center justify-center flex-shrink-0 font-mono font-bold z-10">
                    5
                  </div>
                  <div className="pt-2">
                    <h3 className="font-bold text-black text-lg mb-2">Documentation & Transparency</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Every Certificate of Analysis is published on our website. You can verify your exact batch before use—the same results we reviewed are available to you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reading a COA */}
        <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-12 bg-black text-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Understanding your Certificate of Analysis
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                A COA is your proof of quality. Here's what each section means.
              </p>
            </div>

            {/* COA Example */}
            <div className="bg-gray-900 border border-gray-800 p-8 mb-12">
              <div className="flex items-center gap-2 mb-8">
                <FileText size={18} className="text-teal-400" />
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Sample Certificate of Analysis</span>
              </div>
              
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-800">
                  <div>
                    <div className="text-xs font-mono text-gray-500 mb-1">PURITY (HPLC)</div>
                    <div className="text-sm text-gray-400">Percentage of target compound vs. impurities</div>
                  </div>
                  <div className="text-right mt-4 sm:mt-0">
                    <div className="text-3xl font-mono font-bold text-teal-400">99.65%</div>
                    <div className="text-xs font-mono text-gray-500">SPECIFICATION: ≥99%</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-800">
                  <div>
                    <div className="text-xs font-mono text-gray-500 mb-1">MOLECULAR WEIGHT (MS)</div>
                    <div className="text-sm text-gray-400">Identity confirmation via mass spectrometry</div>
                  </div>
                  <div className="text-right mt-4 sm:mt-0">
                    <div className="text-3xl font-mono font-bold text-teal-400">4960.4</div>
                    <div className="text-xs font-mono text-gray-500">EXPECTED: 4960.37</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    <div className="text-xs font-mono text-gray-500 mb-1">ENDOTOXIN (LAL)</div>
                    <div className="text-sm text-gray-400">Bacterial contamination screening</div>
                  </div>
                  <div className="text-right mt-4 sm:mt-0">
                    <div className="text-3xl font-mono font-bold text-teal-400">&lt;0.25</div>
                    <div className="text-xs font-mono text-gray-500">LIMIT: &lt;0.5 EU/mg</div>
                  </div>
                </div>
              </div>
            </div>

            {/* What to look for */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-900 border border-gray-800 p-6">
                <div className="flex items-center gap-2 mb-6">
                  <CheckCircle size={18} className="text-teal-400" />
                  <span className="font-bold">Signs of a legitimate COA</span>
                </div>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex items-start gap-3">
                    <span className="text-teal-400 mt-0.5">✓</span>
                    <span>Independent laboratory name and accreditation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-teal-400 mt-0.5">✓</span>
                    <span>Batch/lot number matching your product</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-teal-400 mt-0.5">✓</span>
                    <span>Test date within the past 12 months</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-teal-400 mt-0.5">✓</span>
                    <span>Multiple test types (purity, identity, sterility)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-teal-400 mt-0.5">✓</span>
                    <span>Analyst signature or electronic approval</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-900 border border-red-900/50 p-6">
                <div className="flex items-center gap-2 mb-6">
                  <AlertCircle size={18} className="text-red-400" />
                  <span className="font-bold">Warning signs to avoid</span>
                </div>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-0.5">✕</span>
                    <span>No independent lab (in-house testing only)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-0.5">✕</span>
                    <span>Generic batch numbers or missing lot info</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-0.5">✕</span>
                    <span>Outdated or missing test dates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-0.5">✕</span>
                    <span>Only purity listed—no identity or sterility</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-0.5">✕</span>
                    <span>Same template used across all products</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-12 bg-white">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-black mb-4">
              Verify any batch
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Every product we sell has a published Certificate of Analysis. Look up your batch and see the exact test results.
            </p>
            <button 
              onClick={() => navigateTo('coa')}
              className="px-10 py-4 bg-black text-white font-mono text-sm hover:bg-gray-800 transition-all"
            >
              View Certificates of Analysis →
            </button>
          </div>
        </section>

        <footer className="bg-white py-12 px-6 lg:px-12 border-t border-gray-200">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-black flex items-center justify-center"><VialIcon size={30} inverted={false} /></div>
                <span className="text-lg font-mono text-black lowercase" style={{ letterSpacing: '0.08em' }}>
                  <span className="font-bold">true</span><span className="font-normal">chem</span>
                </span>
              </div>
              <div className="text-xs text-gray-500">
                For research purposes only. © 2024 truechem
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // TERMS OF SERVICE PAGE
  if (currentPage === 'tos') {
    return (
      <div className={`min-h-screen bg-white ${pageTransition ? 'opacity-0' : 'animate-pageEnter'}`}>
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6">
            <div className="flex items-center justify-between">
              <button onClick={() => setCurrentPage('home')} className="flex items-center space-x-3 cursor-pointer">
                <div className="w-10 h-10 bg-black flex items-center justify-center"><VialIcon inverted={false} size={38} /></div>
                <div>
                  <div className="text-2xl font-mono text-black lowercase" style={{ letterSpacing: '0.08em' }}>
                    <span className="font-bold">true</span><span className="font-normal">chem</span>
                  </div>
                  <div className="text-[9px] font-mono tracking-[0.15em] text-gray-500 uppercase">99%+ Certified</div>
                </div>
              </button>
              <button onClick={() => navigateTo('home')} className="text-sm font-medium text-gray-600 hover:text-black">
                ← Back to Home
              </button>
            </div>
          </div>
        </header>

        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <div className="mb-12">
              <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4">Terms of Service</h1>
              <p className="text-sm text-gray-500 font-mono">Last Updated: January 2025</p>
            </div>

            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-8">
                These Terms of Service ("Terms") govern your access to and use of the website located at https://www.truechem.io (the "Site"), operated by TrueChem LLC ("TrueChem," "we," "us," or "our"). By accessing or using the Site, you agree to be bound by these Terms. If you do not agree, you must not use the Site.
              </p>

              <div className="space-y-8">
                {/* Section 1 */}
                <div>
                  <h2 className="text-lg font-bold text-black mb-3">1. Eligibility</h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    You must be at least twenty-one (21) years of age to access or purchase from this Site. By using the Site, you represent and warrant that you meet this requirement and have the legal capacity to enter into these Terms.
                  </p>
                </div>

                {/* Section 2 */}
                <div>
                  <h2 className="text-lg font-bold text-black mb-3">2. Research Use Only</h2>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    All products sold by TrueChem LLC are offered strictly for laboratory research purposes only. Products are not intended for:
                  </p>
                  <ul className="text-gray-600 text-sm leading-relaxed ml-4 space-y-1">
                    <li>• human or animal consumption</li>
                    <li>• clinical use</li>
                    <li>• diagnostic use</li>
                    <li>• therapeutic use</li>
                    <li>• personal or cosmetic application</li>
                  </ul>
                  <p className="text-gray-600 text-sm leading-relaxed mt-3">
                    By purchasing from this Site, you acknowledge and agree that you are acquiring products solely for lawful research purposes and assume full responsibility for their proper handling and use.
                  </p>
                </div>

                {/* Section 3 */}
                <div>
                  <h2 className="text-lg font-bold text-black mb-3">3. No Medical or Scientific Advice</h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Information provided on the Site, including product descriptions, documentation, and educational content, is for general informational purposes only and does not constitute medical, scientific, or professional advice. TrueChem LLC does not provide guidance regarding human use, dosage, administration, or outcomes.
                  </p>
                </div>

                {/* Section 4 */}
                <div>
                  <h2 className="text-lg font-bold text-black mb-3">4. Certificates of Analysis</h2>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    Certificates of Analysis ("COAs") are provided for informational and verification purposes only. COAs:
                  </p>
                  <ul className="text-gray-600 text-sm leading-relaxed ml-4 space-y-1">
                    <li>• correspond to specific batches</li>
                    <li>• reflect analytical testing results at the time of analysis</li>
                    <li>• do not constitute a warranty of fitness for any particular purpose</li>
                  </ul>
                  <p className="text-gray-600 text-sm leading-relaxed mt-3">
                    The presence of a COA does not imply approval for any use beyond stated research purposes.
                  </p>
                </div>

                {/* Section 5 */}
                <div>
                  <h2 className="text-lg font-bold text-black mb-3">5. Ordering and Acceptance</h2>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    All orders placed through the Site are subject to acceptance by TrueChem LLC. We reserve the right to:
                  </p>
                  <ul className="text-gray-600 text-sm leading-relaxed ml-4 space-y-1">
                    <li>• refuse or cancel any order</li>
                    <li>• limit quantities per order</li>
                    <li>• discontinue products at any time</li>
                  </ul>
                  <p className="text-gray-600 text-sm leading-relaxed mt-3">
                    Prices and availability are subject to change without notice.
                  </p>
                </div>

                {/* Section 6 */}
                <div>
                  <h2 className="text-lg font-bold text-black mb-3">6. Fulfillment and Shipping</h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Orders are fulfilled by a third-party U.S. laboratory partner. Shipping times are estimates only and are not guaranteed. TrueChem LLC is not responsible for delays caused by carriers, weather, customs, or other circumstances beyond our control. Risk of loss passes to the purchaser upon shipment.
                  </p>
                </div>

                {/* Section 7 */}
                <div>
                  <h2 className="text-lg font-bold text-black mb-3">7. Returns, Refunds, and Replacements</h2>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    Due to the nature of research materials:
                  </p>
                  <ul className="text-gray-600 text-sm leading-relaxed ml-4 space-y-1">
                    <li>• all sales are final</li>
                    <li>• returns of opened or used products are not accepted</li>
                  </ul>
                  <p className="text-gray-600 text-sm leading-relaxed mt-3">
                    In the event of damaged shipments, incorrect items, or verified defects, please contact us promptly. At our discretion, we may issue a replacement or reshipment.
                  </p>
                </div>

                {/* Section 8 */}
                <div>
                  <h2 className="text-lg font-bold text-black mb-3">8. Prohibited Use</h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Use of TrueChem products for any purpose other than lawful laboratory research is strictly prohibited. TrueChem LLC expressly disclaims any liability arising from use of products for personal, clinical, diagnostic, therapeutic, or consumptive purposes.
                  </p>
                </div>

                {/* Section 9 */}
                <div>
                  <h2 className="text-lg font-bold text-black mb-3">9. Customer Indemnification</h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    You agree to indemnify, defend, and hold harmless TrueChem LLC, its members, managers, officers, agents, and affiliates from any and all claims, damages, losses, liabilities, costs, or expenses (including reasonable attorneys' fees) arising out of or related to your handling, storage, transfer, use, or misuse of any product, including any use inconsistent with stated research-only purposes or applicable laws.
                  </p>
                </div>

                {/* Section 10 */}
                <div>
                  <h2 className="text-lg font-bold text-black mb-3">10. No Reliance on Representations</h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    You acknowledge that you have not relied upon any oral or written representations, statements, advice, or guidance beyond the written documentation expressly provided by TrueChem LLC, including Certificates of Analysis. You assume full responsibility for independent evaluation, compliance with applicable laws, and proper use of any products purchased.
                  </p>
                </div>

                {/* Section 11 */}
                <div>
                  <h2 className="text-lg font-bold text-black mb-3">11. Assumption of Risk</h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    You acknowledge that research materials involve inherent risks and agree that you assume all responsibility for the handling, storage, and use of any products purchased from TrueChem LLC.
                  </p>
                </div>

                {/* Section 12 */}
                <div>
                  <h2 className="text-lg font-bold text-black mb-3">12. Disclaimer of Warranties</h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    All products and services are provided "as is" and "as available." To the fullest extent permitted by law, TrueChem LLC disclaims all warranties, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement.
                  </p>
                </div>

                {/* Section 13 */}
                <div>
                  <h2 className="text-lg font-bold text-black mb-3">13. Limitation of Liability</h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    To the fullest extent permitted by law, TrueChem LLC's total cumulative liability for any claim arising out of or relating to any product, transaction, or use of the Site shall not exceed the amount paid for the specific product giving rise to the claim. In no event shall TrueChem LLC be liable for indirect, incidental, consequential, or punitive damages.
                  </p>
                </div>

                {/* Section 14 */}
                <div>
                  <h2 className="text-lg font-bold text-black mb-3">14. Intellectual Property</h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    All content on the Site, including text, graphics, logos, and design elements, is the property of TrueChem LLC or its licensors and may not be used without prior written consent.
                  </p>
                </div>

                {/* Section 15 */}
                <div>
                  <h2 className="text-lg font-bold text-black mb-3">15. Termination</h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We reserve the right to suspend or terminate access to the Site for violations of these Terms or applicable laws.
                  </p>
                </div>

                {/* Section 16 */}
                <div>
                  <h2 className="text-lg font-bold text-black mb-3">16. Governing Law</h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    These Terms are governed by and construed in accordance with the laws of the State of Wyoming, without regard to conflict-of-law principles.
                  </p>
                </div>

                {/* Section 17 */}
                <div>
                  <h2 className="text-lg font-bold text-black mb-3">17. Changes to Terms</h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We may update these Terms from time to time. Continued use of the Site following changes constitutes acceptance of the revised Terms.
                  </p>
                </div>

                {/* Section 18 */}
                <div>
                  <h2 className="text-lg font-bold text-black mb-3">18. Contact Information</h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    For questions regarding these Terms, please contact:
                  </p>
                  <div className="mt-3 text-sm">
                    <p className="text-black font-medium">TrueChem LLC</p>
                    <p className="text-gray-600">Email: admin@truechem.io</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-white py-12 px-6 lg:px-12 border-t border-gray-200">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-black flex items-center justify-center"><VialIcon size={30} inverted={false} /></div>
                <span className="text-lg font-mono text-black lowercase" style={{ letterSpacing: '0.08em' }}>
                  <span className="font-bold">true</span><span className="font-normal">chem</span>
                </span>
              </div>
              <div className="text-xs text-gray-500">
                For research purposes only. © 2024 truechem
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // CONTACT PAGE
  if (currentPage === 'contact') {
    return (
      <div className={`min-h-screen bg-[#FAFAFA] ${pageTransition ? 'opacity-0' : 'animate-pageEnter'}`}>
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6">
            <div className="flex items-center justify-between">
              <button onClick={() => setCurrentPage('home')} className="flex items-center space-x-3 cursor-pointer">
                <div className="w-10 h-10 bg-black flex items-center justify-center"><VialIcon inverted={false} size={38} /></div>
                <div>
                  <div className="text-2xl font-mono text-black lowercase" style={{ letterSpacing: '0.08em' }}>
                    <span className="font-bold">true</span><span className="font-normal">chem</span>
                  </div>
                  <div className="text-[9px] font-mono tracking-[0.15em] text-gray-500 uppercase">99%+ Certified</div>
                </div>
              </button>
              <button onClick={() => navigateTo('home')} className="text-sm font-medium text-gray-600 hover:text-black">
                ← Back to Home
              </button>
            </div>
          </div>
        </header>

        <section className="py-20 px-6 lg:px-12">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block px-3 py-1 bg-black text-white text-[10px] font-mono tracking-[0.2em] uppercase mb-6">
                Get in Touch
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-black mb-4">Contact Us</h1>
              <p className="text-lg text-gray-600">
                Questions about our products or need help with an order? We're here to help.
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-mono text-gray-600 uppercase tracking-wider mb-2">Email</label>
                  <input 
                    type="email" 
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-sm font-mono text-gray-600 uppercase tracking-wider mb-2">Subject</label>
                  <select className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none font-mono bg-white">
                    <option>General Inquiry</option>
                    <option>Order Status</option>
                    <option>Product Question</option>
                    <option>Wholesale/Bulk Orders</option>
                    <option>Custom Synthesis Request</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-mono text-gray-600 uppercase tracking-wider mb-2">Message</label>
                  <textarea 
                    rows={5}
                    placeholder="How can we help?"
                    className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none font-mono resize-none"
                  />
                </div>
                <button className="w-full py-4 bg-black text-white font-mono text-sm hover:bg-gray-800 transition-all">
                  Send Message
                </button>
              </div>
            </div>

            <div className="mt-12 grid sm:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 p-6 text-center">
                <div className="text-2xl mb-2">📧</div>
                <div className="font-mono text-sm text-gray-600 uppercase tracking-wider mb-1">Email</div>
                <div className="font-medium">support@truechem.io</div>
              </div>
              <div className="bg-white border border-gray-200 p-6 text-center">
                <div className="text-2xl mb-2">⏱️</div>
                <div className="font-mono text-sm text-gray-600 uppercase tracking-wider mb-1">Response Time</div>
                <div className="font-medium">Within 24 hours</div>
              </div>
            </div>
          </div>
        </section>

        <footer className="py-8 px-6 bg-black text-white">
          <div className="max-w-[1400px] mx-auto text-center">
            <div className="text-xs font-mono text-gray-500">
              © 2024 truechem. All rights reserved. • ISO 9001:2015 FACILITIES • THIRD-PARTY TESTED
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // CHECKOUT PAGE
  if (currentPage === 'checkout') {
    const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 0;
    const processingFee = cartSubtotal * 0.09; // 9% hidden in pricing
    const orderTotal = cartSubtotal + shipping; // Show subtotal as total (fee absorbed)

    return (
      <div className={`min-h-screen flex flex-col bg-[#FAFAFA] ${pageTransition ? 'opacity-0' : 'animate-pageEnter'}`}>
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between h-20">
              <button onClick={() => navigateTo('home')} className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-black flex items-center justify-center"><VialIcon inverted={false} size={38} /></div>
                <div>
                  <div className="text-2xl font-mono text-black lowercase" style={{ letterSpacing: '0.08em' }}>
                    <span className="font-bold">true</span>
                    <span className="font-normal">chem</span>
                  </div>
                  <div className="text-[9px] font-mono tracking-[0.15em] text-gray-500 uppercase">99%+ Certified</div>
                </div>
              </button>
              <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-gray-400">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${checkoutStep >= 1 ? 'bg-black text-white' : 'border border-gray-300'}`}>1</div>
                <span className={checkoutStep >= 1 ? 'text-black' : ''}>Info</span>
                <div className="w-8 h-px bg-gray-300"></div>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${checkoutStep >= 2 ? 'bg-black text-white' : 'border border-gray-300'}`}>2</div>
                <span className={checkoutStep >= 2 ? 'text-black' : ''}>Payment</span>
                <div className="w-8 h-px bg-gray-300"></div>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${checkoutStep >= 3 ? 'bg-black text-white' : 'border border-gray-300'}`}>3</div>
                <span className={checkoutStep >= 3 ? 'text-black' : ''}>Done</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <section className="flex-1 pt-24 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-12">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Left: Checkout Form */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Step 1: Shipping Information */}
                {checkoutStep === 1 && (
                  <>
                    <div className="space-y-8">
                      <h2 className="text-3xl font-bold font-mono">CHECKOUT</h2>
                      
                      {/* Age Verification Banner - Monospace aesthetic */}
                      <div className="bg-white border-2 border-black p-6">
                        <div className="flex items-start gap-4">
                          <AlertCircle size={24} className="flex-shrink-0 mt-1" />
                          <div className="font-mono">
                            <div className="font-bold mb-2 tracking-wide text-base">AGE VERIFICATION REQUIRED</div>
                            <div className="text-gray-600 text-sm leading-relaxed">You must be 21+ to purchase. By proceeding, you confirm you are of legal age.</div>
                          </div>
                        </div>
                      </div>

                      {/* Research Disclaimer - Monospace aesthetic */}
                      <div className="bg-white border border-gray-300 p-6">
                        <div className="flex items-start gap-4">
                          <AlertCircle size={24} className="text-gray-500 flex-shrink-0 mt-1" />
                          <div className="font-mono">
                            <div className="font-bold mb-2 tracking-wide text-base">FOR RESEARCH PURPOSES ONLY</div>
                            <div className="text-gray-600 text-sm leading-relaxed">These compounds are intended solely for laboratory research and are not for human consumption.</div>
                          </div>
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div className="bg-white border p-8">
                        <h3 className="font-mono font-bold mb-6 text-lg tracking-wide">CONTACT</h3>
                        <input
                          type="email"
                          placeholder="Email address"
                          value={shippingInfo.email}
                          onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                          className="w-full px-4 py-4 border border-gray-300 focus:outline-none focus:border-black font-mono text-sm"
                        />
                      </div>

                      {/* Shipping Address */}
                      <div className="bg-white border p-8">
                        <h3 className="font-mono font-bold mb-6 text-lg tracking-wide">SHIPPING ADDRESS</h3>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <input
                              type="text"
                              placeholder="First name"
                              value={shippingInfo.firstName}
                              onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                              className="px-4 py-4 border border-gray-300 focus:outline-none focus:border-black font-mono text-sm"
                            />
                            <input
                              type="text"
                              placeholder="Last name"
                              value={shippingInfo.lastName}
                              onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                              className="px-4 py-4 border border-gray-300 focus:outline-none focus:border-black font-mono text-sm"
                            />
                          </div>
                          <input
                            type="text"
                            placeholder="Street address"
                            value={shippingInfo.address}
                            onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                            className="w-full px-4 py-4 border border-gray-300 focus:outline-none focus:border-black font-mono text-sm"
                          />
                          <input
                            type="text"
                            placeholder="Apartment, suite, etc. (optional)"
                            value={shippingInfo.apartment}
                            onChange={(e) => setShippingInfo({...shippingInfo, apartment: e.target.value})}
                            className="w-full px-4 py-4 border border-gray-300 focus:outline-none focus:border-black font-mono text-sm"
                          />
                          <div className="grid grid-cols-3 gap-4">
                            <input
                              type="text"
                              placeholder="City"
                              value={shippingInfo.city}
                              onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                              className="px-4 py-4 border border-gray-300 focus:outline-none focus:border-black font-mono text-sm"
                            />
                            <input
                              type="text"
                              placeholder="State"
                              value={shippingInfo.state}
                              onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                              className="px-4 py-4 border border-gray-300 focus:outline-none focus:border-black font-mono text-sm"
                            />
                            <input
                              type="text"
                              placeholder="ZIP"
                              value={shippingInfo.zip}
                              onChange={(e) => setShippingInfo({...shippingInfo, zip: e.target.value})}
                              className="px-4 py-4 border border-gray-300 focus:outline-none focus:border-black font-mono text-sm"
                            />
                          </div>
                          <input
                            type="tel"
                            placeholder="Phone number"
                            value={shippingInfo.phone}
                            onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                            className="w-full px-4 py-4 border border-gray-300 focus:outline-none focus:border-black font-mono text-sm"
                          />
                        </div>
                      </div>

                      {/* Terms of Service - Scrollable */}
                      <div className="bg-white border p-8">
                        <h3 className="font-mono font-bold mb-6 text-lg tracking-wide">TERMS OF SERVICE</h3>
                        
                        {/* Scrollable TOS Content */}
                        <div className="border border-gray-300 p-6 h-64 overflow-y-auto mb-6 bg-gray-50 text-sm font-mono leading-relaxed">
                          <div className="space-y-4 text-gray-700">
                            <div>
                              <div className="font-bold mb-2">1. ACCEPTANCE OF TERMS</div>
                              <div>By purchasing from truechem, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, you may not purchase our products.</div>
                            </div>
                            
                            <div>
                              <div className="font-bold mb-2">2. AGE REQUIREMENT</div>
                              <div>You must be at least 21 years of age to purchase products from truechem. By placing an order, you confirm that you meet this age requirement.</div>
                            </div>
                            
                            <div>
                              <div className="font-bold mb-2">3. RESEARCH USE ONLY</div>
                              <div>All products sold by truechem are intended strictly for laboratory research purposes only. These products are NOT intended for human consumption, animal consumption, or any in-vivo use. By purchasing our products, you agree that you will use them solely for legitimate research purposes in appropriate laboratory settings.</div>
                            </div>
                            
                            <div>
                              <div className="font-bold mb-2">4. QUALIFICATIONS</div>
                              <div>You represent that you are a qualified researcher or purchasing on behalf of a qualified research institution. You acknowledge that proper training and laboratory facilities are required to handle these compounds safely.</div>
                            </div>
                            
                            <div>
                              <div className="font-bold mb-2">5. PRODUCT INFORMATION</div>
                              <div>While we strive for accuracy, we make no warranties regarding the completeness or accuracy of product descriptions. All products are sold "as is" and we recommend independent verification of product specifications.</div>
                            </div>
                            
                            <div>
                              <div className="font-bold mb-2">6. SHIPPING & DELIVERY</div>
                              <div>Estimated delivery times are 5-7 business days within the United States. We are not responsible for delays caused by shipping carriers or customs. Title and risk of loss pass to you upon delivery to the carrier.</div>
                            </div>
                            
                            <div>
                              <div className="font-bold mb-2">7. RETURNS & REFUNDS</div>
                              <div>Due to the nature of research chemicals, we cannot accept returns of opened or used products. Unopened products may be returned within 14 days of receipt for a refund, minus shipping costs. Products must be in original condition.</div>
                            </div>
                            
                            <div>
                              <div className="font-bold mb-2">8. SAFETY & LIABILITY</div>
                              <div>You assume all risks associated with the purchase, handling, storage, and use of our products. truechem shall not be liable for any damages, injuries, or losses resulting from the use or misuse of our products. You agree to indemnify and hold truechem harmless from any claims arising from your use of our products.</div>
                            </div>
                            
                            <div>
                              <div className="font-bold mb-2">9. PROHIBITED USES</div>
                              <div>You agree not to: (a) use products for human or animal consumption; (b) resell products without authorization; (c) use products in violation of any laws or regulations; (d) misrepresent the intended use of products.</div>
                            </div>
                            
                            <div>
                              <div className="font-bold mb-2">10. INTELLECTUAL PROPERTY</div>
                              <div>All content on truechem.io, including text, graphics, logos, and images, is the property of truechem and protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without written permission.</div>
                            </div>
                            
                            <div>
                              <div className="font-bold mb-2">11. PRIVACY</div>
                              <div>Your personal information is handled according to our Privacy Policy. We collect only information necessary to process orders and communicate with customers.</div>
                            </div>
                            
                            <div>
                              <div className="font-bold mb-2">12. LIMITATION OF LIABILITY</div>
                              <div>To the maximum extent permitted by law, truechem's total liability shall not exceed the amount you paid for the product(s) in question. We shall not be liable for indirect, incidental, consequential, or punitive damages.</div>
                            </div>
                            
                            <div>
                              <div className="font-bold mb-2">13. GOVERNING LAW</div>
                              <div>These terms shall be governed by the laws of the United States and the state where truechem is registered, without regard to conflict of law principles.</div>
                            </div>
                            
                            <div>
                              <div className="font-bold mb-2">14. MODIFICATIONS</div>
                              <div>truechem reserves the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of modified terms.</div>
                            </div>
                            
                            <div>
                              <div className="font-bold mb-2">15. CONTACT</div>
                              <div>For questions regarding these terms, contact us at support@truechem.io</div>
                            </div>
                            
                            <div className="pt-4 border-t border-gray-300">
                              <div className="text-xs text-gray-500">Last Updated: January 2026</div>
                            </div>
                          </div>
                        </div>

                        {/* Agreement Checkbox */}
                        <label className="flex items-start gap-4 cursor-pointer p-4 border border-gray-300 hover:border-black transition-colors">
                          <input
                            type="checkbox"
                            checked={agreedToTerms}
                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                            className="mt-1 w-5 h-5 flex-shrink-0"
                          />
                          <span className="text-sm text-gray-700 font-mono leading-relaxed">
                            I confirm that I am 21+ years old, have read and agree to the Terms of Service above, and understand these products are for research purposes only and not for human consumption.
                          </span>
                        </label>
                      </div>

                      {/* Navigation Buttons - More spacing */}
                      <div className="flex justify-between items-center pt-4">
                        <button
                          onClick={() => navigateTo('cart')}
                          className="text-sm text-gray-600 hover:text-black font-mono"
                        >
                          ← Back to cart
                        </button>
                        <button
                          onClick={() => {
                            if (!shippingInfo.email || !shippingInfo.firstName || !shippingInfo.lastName || 
                                !shippingInfo.address || !shippingInfo.city || !shippingInfo.state || 
                                !shippingInfo.zip || !shippingInfo.phone || !agreedToTerms) {
                              alert('Please fill in all required fields and agree to terms');
                              return;
                            }
                            setCheckoutStep(2);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="px-10 py-4 bg-black text-white font-mono text-sm hover:bg-gray-800 transition-all"
                        >
                          Continue to Payment →
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {/* Step 2: Payment */}
                {checkoutStep === 2 && (
                  <>
                    <div>
                      <h2 className="text-2xl font-bold mb-6">Payment Method</h2>

                      {/* Payment Method Selection */}
                      <div className="space-y-4 mb-6">
                        {/* Apple Pay - Primary */}
                        <button
                          onClick={() => setSelectedPaymentMethod('apple')}
                          className={`w-full p-6 border-2 transition-all text-left ${
                            selectedPaymentMethod === 'apple' 
                              ? 'border-black bg-black text-white' 
                              : 'border-gray-200 bg-white hover:border-gray-400'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-full border-2 ${
                                selectedPaymentMethod === 'apple' ? 'border-white' : 'border-gray-300'
                              } flex items-center justify-center`}>
                                {selectedPaymentMethod === 'apple' && <div className="w-3 h-3 rounded-full bg-white"></div>}
                              </div>
                              <div>
                                <div className="font-bold mb-1 font-mono">Apple Pay</div>
                                <div className={`text-sm font-mono ${selectedPaymentMethod === 'apple' ? 'text-gray-300' : 'text-gray-500'}`}>
                                  One-tap checkout with Face ID or Touch ID
                                </div>
                              </div>
                            </div>
                            <svg width="42" height="18" viewBox="0 0 42 18" fill="none" className="flex-shrink-0">
                              <path d="M7.4 0.9c-0.4 0.5-1 0.8-1.7 0.8-0.1 0-0.1-0.1-0.1-0.1 0-0.5 0.2-1 0.5-1.4 0.4-0.5 1-0.9 1.6-0.9 0.1 0 0.1 0.1 0.1 0.1 0 0.5-0.2 0.9-0.4 1.5zM7.5 2c-0.9 0-1.6 0.5-2 0.5-0.5 0-1.2-0.5-2-0.5-1 0-2 0.6-2.5 1.5-1.1 1.8-0.3 4.5 0.8 6 0.5 0.7 1.1 1.5 2 1.5 0.8 0 1.1-0.5 2-0.5 0.9 0 1.1 0.5 2 0.5 0.8 0 1.4-0.8 1.9-1.5 0.6-0.8 0.8-1.6 0.8-1.6 0 0-1.6-0.6-1.6-2.4 0-1.5 1.2-2.2 1.3-2.3-0.7-1-1.8-1.2-2.2-1.2z" fill="currentColor"/>
                            </svg>
                          </div>
                        </button>

                        {/* Google Pay */}
                        <button
                          onClick={() => setSelectedPaymentMethod('google')}
                          className={`w-full p-6 border-2 transition-all text-left ${
                            selectedPaymentMethod === 'google' 
                              ? 'border-black bg-white' 
                              : 'border-gray-200 bg-white hover:border-gray-400'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-full border-2 ${
                                selectedPaymentMethod === 'google' ? 'border-black' : 'border-gray-300'
                              } flex items-center justify-center`}>
                                {selectedPaymentMethod === 'google' && <div className="w-3 h-3 rounded-full bg-black"></div>}
                              </div>
                              <div>
                                <div className="font-bold mb-1 text-black font-mono">Google Pay</div>
                                <div className="text-sm text-gray-500 font-mono">Fast and secure checkout</div>
                              </div>
                            </div>
                            <div className="text-black font-bold text-xl">G Pay</div>
                          </div>
                        </button>

                        {/* Credit/Debit Card */}
                        <button
                          onClick={() => setSelectedPaymentMethod('card')}
                          className={`w-full p-6 border-2 transition-all text-left ${
                            selectedPaymentMethod === 'card' 
                              ? 'border-black bg-white' 
                              : 'border-gray-200 bg-white hover:border-gray-400'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 ${
                              selectedPaymentMethod === 'card' ? 'border-black' : 'border-gray-300'
                            } flex items-center justify-center`}>
                              {selectedPaymentMethod === 'card' && <div className="w-3 h-3 rounded-full bg-black"></div>}
                            </div>
                            <div>
                              <div className="font-bold mb-1 text-black font-mono">Credit or Debit Card</div>
                              <div className="text-sm text-gray-500 font-mono">Visa, Mastercard, Amex, Discover</div>
                            </div>
                          </div>
                        </button>
                      </div>

                      {/* Card Form (only show if card selected) */}
                      {selectedPaymentMethod === 'card' && (
                        <div className="bg-white border p-6 mb-6">
                          <h3 className="font-bold mb-4">Card Information</h3>
                          <div className="space-y-4">
                            <input
                              type="text"
                              placeholder="Card number"
                              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black font-mono text-sm"
                            />
                            <div className="grid grid-cols-2 gap-4">
                              <input
                                type="text"
                                placeholder="MM / YY"
                                className="px-4 py-3 border border-gray-300 focus:outline-none focus:border-black font-mono text-sm"
                              />
                              <input
                                type="text"
                                placeholder="CVC"
                                className="px-4 py-3 border border-gray-300 focus:outline-none focus:border-black font-mono text-sm"
                              />
                            </div>
                          </div>
                          <div className="mt-4 p-3 bg-gray-50 border text-xs text-gray-600 font-mono">
                            <Shield size={14} className="inline mr-2" />
                            Your payment information is encrypted and secure.
                          </div>
                        </div>
                      )}

                      {/* Pricing Note */}
                      <div className="bg-white border border-gray-300 p-4 mb-6 text-sm font-mono text-gray-600">
                        <div className="text-xs">
                          Note: Payment processing fees are included in product pricing.
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <button
                          onClick={() => {
                            setCheckoutStep(1);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="text-sm text-gray-600 hover:text-black font-mono"
                        >
                          ← Back to shipping
                        </button>
                        <button
                          onClick={async () => {
                            try {
                              const paymentResult = await processPayment(selectedPaymentMethod, orderTotal);
                              
                              if (paymentResult.success) {
                                const orderData = {
                                  items: cart,
                                  shipping: shippingInfo,
                                  payment: {
                                    transactionId: paymentResult.transactionId,
                                    method: paymentResult.method,
                                    amount: orderTotal
                                  },
                                  totals: {
                                    subtotal: cartSubtotal,
                                    shipping: shipping,
                                    total: orderTotal
                                  }
                                };

                                const pearlResponse = await submitOrderToPearl(orderData);
                                
                                if (pearlResponse.success) {
                                  setOrderDetails({
                                    ...orderData,
                                    orderId: pearlResponse.orderId,
                                    estimatedDelivery: pearlResponse.estimatedDelivery,
                                    orderDate: new Date().toISOString()
                                  });
                                  setOrderPlaced(true);
                                  setCart([]);
                                  navigateTo('confirmation');
                                }
                              }
                            } catch (error) {
                              alert('Payment failed. Please try again.');
                              console.error(error);
                            }
                          }}
                          className="px-8 py-3 bg-black text-white font-mono text-sm hover:bg-gray-800 transition-all"
                        >
                          Place Order - ${orderTotal.toFixed(2)}
                        </button>
                      </div>
                    </div>
                  </>
                )}

              </div>

              {/* Right: Order Summary (Sticky) */}
              <div className="lg:col-span-1">
                <div className="bg-white border p-6 sticky top-24">
                  <h3 className="text-lg font-bold mb-6">Order Summary</h3>
                  
                  {/* Cart Items */}
                  <div className="space-y-4 mb-6 pb-6 border-b">
                    {cart.map((item) => (
                      <div key={`${item.id}-${item.size}`} className="flex gap-4">
                        <div className="w-16 h-16 bg-gray-100 border flex items-center justify-center flex-shrink-0">
                          <Beaker size={20} className="text-gray-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-sm truncate">{item.name}</div>
                          <div className="text-xs font-mono text-gray-500">{item.size} • Qty {item.quantity}</div>
                          <div className="text-sm font-mono font-bold mt-1">${(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="space-y-3 mb-6 pb-6 border-b">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span className="font-mono">${cartSubtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span className="font-mono text-green-600">FREE</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="font-mono uppercase text-sm">Total</span>
                    <span className="text-3xl font-mono font-bold">${orderTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-auto py-8 px-6 bg-black text-white text-center text-xs text-gray-500 font-mono">
          <div>ISO 9001:2015 FACILITIES • THIRD-PARTY TESTED</div>
          <div className="mt-2">© 2024 truechem. All rights reserved.</div>
        </footer>
      </div>
    );
  }

  // ORDER CONFIRMATION PAGE
  if (currentPage === 'confirmation' && orderPlaced && orderDetails) {
    return (
      <div className={`min-h-screen flex flex-col bg-[#FAFAFA] ${pageTransition ? 'opacity-0' : 'animate-pageEnter'}`}>
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between h-20">
              <button onClick={() => navigateTo('home')} className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-black flex items-center justify-center"><VialIcon inverted={false} size={38} /></div>
                <div>
                  <div className="text-2xl font-mono text-black lowercase" style={{ letterSpacing: '0.08em' }}>
                    <span className="font-bold">true</span>
                    <span className="font-normal">chem</span>
                  </div>
                  <div className="text-[9px] font-mono tracking-[0.15em] text-gray-500 uppercase">99%+ Certified</div>
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <section className="flex-1 pt-24 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-12">
          <div className="max-w-[800px] mx-auto">
            
            {/* Success Message */}
            <div className="bg-white border-2 border-black p-8 mb-8 text-center">
              <CheckCircle size={64} className="mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-2 font-mono">ORDER CONFIRMED</h1>
              <p className="text-lg text-gray-700 font-mono">Thank you for your purchase.</p>
            </div>

            {/* Order Details */}
            <div className="bg-white border p-6 mb-6">
              <div className="flex justify-between items-start mb-6 pb-6 border-b">
                <div>
                  <div className="text-sm text-gray-500 mb-1 font-mono">Order Number</div>
                  <div className="text-2xl font-mono font-bold">{orderDetails.orderId}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-1 font-mono">Order Date</div>
                  <div className="font-mono">{new Date(orderDetails.orderDate).toLocaleDateString()}</div>
                </div>
              </div>

              {/* Confirmation Email Notice */}
              <div className="bg-white border border-gray-300 p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle size={20} className="text-gray-500 flex-shrink-0 mt-0.5" />
                  <div className="text-sm font-mono">
                    <div className="font-bold mb-1">CONFIRMATION EMAIL SENT</div>
                    <div className="text-gray-600 text-xs">Order confirmation sent to <strong>{orderDetails.shipping.email}</strong></div>
                  </div>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="mb-6">
                <h3 className="font-bold mb-3 font-mono">SHIPPING TO</h3>
                <div className="text-sm text-gray-700 font-mono">
                  <div>{orderDetails.shipping.firstName} {orderDetails.shipping.lastName}</div>
                  <div>{orderDetails.shipping.address}</div>
                  {orderDetails.shipping.apartment && <div>{orderDetails.shipping.apartment}</div>}
                  <div>{orderDetails.shipping.city}, {orderDetails.shipping.state} {orderDetails.shipping.zip}</div>
                  <div className="mt-2 text-gray-500">{orderDetails.shipping.phone}</div>
                </div>
              </div>

              {/* Estimated Delivery */}
              <div className="bg-gray-50 border p-4 mb-6">
                <div className="flex items-center gap-3">
                  <Shield size={24} className="text-gray-600" />
                  <div className="font-mono">
                    <div className="font-bold text-sm">ESTIMATED DELIVERY</div>
                    <div className="text-xs text-gray-600">{orderDetails.estimatedDelivery}</div>
                  </div>
                </div>
              </div>

              {/* Items Ordered */}
              <div>
                <h3 className="font-bold mb-4 font-mono">ITEMS ORDERED</h3>
                <div className="space-y-4">
                  {orderDetails.items.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-4 pb-4 border-b last:border-0">
                      <div className="w-16 h-16 bg-gray-100 border flex items-center justify-center">
                        <Beaker size={20} className="text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold font-mono">{item.name}</div>
                        <div className="text-sm font-mono text-gray-500">{item.size} • {item.purity}</div>
                        <div className="text-sm text-gray-500 font-mono">Qty: {item.quantity}</div>
                      </div>
                      <div className="font-mono font-bold">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Total */}
              <div className="mt-6 pt-6 border-t space-y-2 font-mono">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${orderDetails.totals.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold pt-4 border-t">
                  <span>TOTAL PAID</span>
                  <span>${orderDetails.totals.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Research Disclaimer */}
            <div className="bg-white border border-gray-300 p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle size={20} className="text-gray-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm font-mono">
                  <div className="font-bold mb-1">IMPORTANT REMINDER</div>
                  <div className="text-gray-600 text-xs">These compounds are for research purposes only and not intended for human consumption.</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigateTo('home')}
                className="flex-1 py-3 bg-black text-white font-mono text-sm hover:bg-gray-800 transition-all"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => navigateTo('contact')}
                className="flex-1 py-3 border-2 border-black font-mono text-sm hover:bg-black hover:text-white transition-all"
              >
                Contact Support
              </button>
            </div>

          </div>
        </section>

        {/* Footer */}
        <footer className="mt-auto py-8 px-6 bg-black text-white text-center text-xs text-gray-500 font-mono">
          <div>ISO 9001:2015 FACILITIES • THIRD-PARTY TESTED</div>
          <div className="mt-2">© 2024 truechem. All rights reserved.</div>
        </footer>
      </div>
    );
  }

  // HOME PAGE
  return (
    <div className={`min-h-screen bg-[#FAFAFA] ${pageTransition ? 'opacity-0' : 'animate-pageFadeIn'}`}>
      {/* Age Verification Modal */}
      {!ageVerified && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-6">
          <div className="bg-white max-w-md w-full p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-black mx-auto flex items-center justify-center mb-4"><VialIcon inverted={false} size={62} /></div>
              <div className="text-3xl font-mono text-black lowercase mb-2" style={{ letterSpacing: '0.08em' }}>
                <span className="font-bold">true</span>
                <span className="font-normal">chem</span>
              </div>
              <div className="text-[10px] font-mono tracking-[0.15em] text-gray-500 uppercase">99%+ Certified</div>
            </div>

            <div className="border-t border-b border-gray-200 py-6 mb-6">
              <h2 className="text-2xl font-bold text-black mb-4 text-center">Age Verification</h2>
              <p className="text-sm text-gray-600 text-center leading-relaxed">
                You must be 21 years or older to access this site. Our products are intended for 
                laboratory research purposes only.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setAgeVerified(true)}
                className="w-full py-4 bg-black text-white font-mono text-sm hover:bg-gray-800 transition-all shadow-[0_0_0_1px_rgba(0,0,0,0.1)]"
              >
                I am 21+ and understand
              </button>
              <button
                onClick={() => window.location.href = 'https://google.com'}
                className="w-full py-4 border-2 border-gray-300 font-mono text-sm hover:border-black transition-all shadow-[0_0_0_1px_rgba(0,0,0,0.05)]"
              >
                Exit
              </button>
            </div>

            <p className="text-[10px] font-mono text-gray-400 text-center mt-6 leading-relaxed">
              By entering this site, you confirm you are purchasing for research purposes only and comply with all applicable regulations.
            </p>
          </div>
        </div>
      )}

      {/* Cart Success Popup */}
      {showCartPopup && addedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-20 z-[90] flex items-center justify-center p-6">
          <div className="bg-white max-w-lg w-full shadow-xl border border-gray-200 animate-fadeInUp">
            {/* Success Header - Softer */}
            <div className="bg-gray-50 border-b border-gray-200 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center">
                  <CheckCircle size={18} className="text-green-600" />
                </div>
                <div>
                  <div className="font-bold text-sm">Added to cart</div>
                  <div className="text-xs text-gray-500 font-mono">
                    {addedProduct.name} · {addedProduct.selectedSize}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setShowCartPopup(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            {/* Recommendations - Compact */}
            <div className="p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-3">You may also need</h3>
              <div className="grid grid-cols-2 gap-3">
                {products
                  .filter(p => p.id !== addedProduct.id)
                  .slice(0, 2)
                  .map(product => (
                    <div key={product.id} className="border border-gray-200 p-3 hover:border-gray-400 transition-all bg-gray-50">
                      <h4 className="font-bold text-xs mb-1 text-gray-900">{product.name}</h4>
                      <div className="text-[10px] font-mono text-gray-500 mb-2">{product.purity}</div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-mono font-bold text-gray-900">{product.price}</div>
                        <button
                          onClick={() => {
                            addToCart(product, product.sizes[0]);
                          }}
                          className="px-3 py-1 bg-white border border-gray-300 text-gray-700 font-mono text-[10px] hover:border-gray-900 hover:text-gray-900 transition-all"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Action Buttons - Checkout Emphasized */}
            <div className="p-5 pt-0 flex gap-3">
              <button
                onClick={() => {
                  setShowCartPopup(false);
                  setCurrentPage('cart');
                }}
                className="flex-1 py-3 border border-gray-300 text-gray-700 font-mono text-sm hover:border-gray-900 hover:text-gray-900 transition-all"
              >
                View Cart
              </button>
              <button
                onClick={() => {
                  setShowCartPopup(false);
                  setCurrentPage('cart');
                }}
                className="flex-1 py-3 bg-gradient-to-r from-gray-900 to-black text-white font-mono text-sm hover:shadow-lg transform hover:scale-[1.02] transition-all relative overflow-hidden group"
              >
                <span className="relative z-10">Checkout ({cartItemCount})</span>
                <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </div>
          </div>
        </div>
      )}

      <header className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? 'bg-white shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-black flex items-center justify-center"><VialIcon inverted={false} size={38} /></div>
              <div>
                <div className="text-2xl font-mono text-black lowercase" style={{ letterSpacing: '0.08em' }}>
                  <span className="font-bold">true</span>
                  <span className="font-normal">chem</span>
                </div>
                <div className="text-[9px] font-mono tracking-[0.15em] text-gray-500 uppercase">99%+ Certified</div>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
              <a href="#products" className="text-sm font-medium hover:text-gray-600">Products</a>
              <button 
                onClick={() => navigateTo('manufacturing')}
                className="text-sm font-medium hover:text-gray-600"
              >
                Actually U.S. made?
              </button>
              <a href="#why-truechem" className="text-sm font-medium hover:text-gray-600">Why Truechem</a>
              <button 
                onClick={() => navigateTo('coa')}
                className="text-sm font-medium hover:text-gray-600"
              >
                View COAs
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {isMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M3 12h18M3 6h18M3 18h18" />
                  )}
                </svg>
              </button>
              
              <div 
                className="relative"
                onMouseEnter={() => setShowCartHover(true)}
                onMouseLeave={() => setShowCartHover(false)}
              >
                <button 
                  onClick={() => navigateTo('cart')}
                  className="p-2 hover:bg-gray-100 rounded-lg relative transition-all duration-200"
                >
                  <ShoppingCart size={20} />
                  {cartItemCount > 0 && (
                    <span className="absolute top-1 right-1 w-5 h-5 bg-black text-white text-[10px] font-mono font-bold rounded-full flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </button>

                {/* Cart Hover Preview - Hidden on mobile */}
                {showCartHover && cartItemCount > 0 && (
                  <div className="hidden md:block absolute right-0 top-10 w-96 bg-white border border-gray-200 shadow-xl rounded-lg z-50 animate-fadeIn">
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm font-bold">Cart ({cartItemCount})</span>
                        <span className="text-xs text-gray-500">Hover to keep open</span>
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {cart.map((item, index) => (
                        <div key={index} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                          <div className="flex justify-between items-start gap-3">
                            <button
                              onClick={() => {
                                setSelectedProduct(products.find(p => p.name === item.name));
                                setShowCartHover(false);
                              }}
                              className="flex-1 text-left hover:text-gray-600 transition-colors"
                            >
                              <div className="font-medium text-sm">{item.name}</div>
                              <div className="text-xs text-gray-500 mt-1">{item.size}</div>
                            </button>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2 bg-gray-100 rounded px-2 py-1">
                                <button
                                  onClick={() => {
                                    const newCart = [...cart];
                                    if (newCart[index].quantity > 1) {
                                      newCart[index].quantity -= 1;
                                      setCart(newCart);
                                    }
                                  }}
                                  className="text-gray-600 hover:text-black text-sm font-mono"
                                >
                                  −
                                </button>
                                <span className="text-xs font-mono w-6 text-center">{item.quantity || 1}</span>
                                <button
                                  onClick={() => {
                                    const newCart = [...cart];
                                    newCart[index].quantity = (newCart[index].quantity || 1) + 1;
                                    setCart(newCart);
                                  }}
                                  className="text-gray-600 hover:text-black text-sm font-mono"
                                >
                                  +
                                </button>
                              </div>
                              <div className="text-sm font-mono w-16 text-right">${(parseFloat(item.price) * (item.quantity || 1)).toFixed(2)}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 bg-gray-50">
                      <button
                        onClick={() => { setCurrentPage('cart'); setShowCartHover(false); }}
                        className="w-full py-2 bg-black text-white font-mono text-sm hover:bg-gray-800 transition-colors duration-200"
                      >
                        View Cart
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-20 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-40 animate-fadeIn">
          <nav className="px-6 py-4 space-y-4">
            <a 
              href="#products" 
              onClick={() => setIsMenuOpen(false)}
              className="block text-base font-medium text-gray-900 hover:text-gray-600 hover:bg-gray-50 py-2 px-3 rounded-lg transition-all duration-200"
            >
              Products
            </a>
            <button 
              onClick={() => { setCurrentPage('manufacturing'); setIsMenuOpen(false); }}
              className="block w-full text-left text-base font-medium text-gray-900 hover:text-gray-600 hover:bg-gray-50 py-2 px-3 rounded-lg transition-all duration-200"
            >
              Actually U.S. made?
            </button>
            <a 
              href="#why-truechem" 
              onClick={() => setIsMenuOpen(false)}
              className="block text-base font-medium text-gray-900 hover:text-gray-600 hover:bg-gray-50 py-2 px-3 rounded-lg transition-all duration-200"
            >
              Why Truechem
            </a>
            <button 
              onClick={() => { setCurrentPage('coa'); setIsMenuOpen(false); }}
              className="block w-full text-left text-base font-medium text-gray-900 hover:text-gray-600 hover:bg-gray-50 py-2 px-3 rounded-lg transition-all duration-200"
            >
              View COAs
            </button>
          </nav>
        </div>
      )}

      <section className="pt-32 pb-16 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="inline-block px-3 py-1 bg-black text-white text-[10px] font-mono tracking-[0.2em] uppercase mb-8">
            ISO 9001:2015 Certified Facilities
          </div>
          
          <h1 className="text-6xl lg:text-8xl font-bold mb-8 leading-[0.95]">Ultra-Pure<br/>Research<br/>Compounds</h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl">
            Precision compounds for scientific research. Third-party tested. 
            Certificate of Analysis provided with every order. <em>Actually</em> U.S. made.
          </p>

          <div className="flex items-center space-x-4 mb-12">
            <a href="#products" className="px-8 py-4 bg-black text-white font-mono text-sm hover:bg-gray-800 transition-all shadow-[0_0_0_1px_rgba(0,0,0,0.1)]">
              View Products
            </a>
            <button 
              onClick={() => navigateTo('coa')}
              className="px-8 py-4 border border-gray-300 text-gray-900 font-mono text-sm hover:border-black transition-all shadow-[0_0_0_1px_rgba(0,0,0,0.05)]"
            >
              View COAs
            </button>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-lg">
              <div>
                <div className="text-lg sm:text-xl md:text-2xl font-mono font-bold text-black mb-1">98.5%</div>
                <div className="text-[8px] sm:text-[10px] font-mono tracking-wider text-gray-500 uppercase">Min. Purity</div>
              </div>
              <div>
                <div className="text-lg sm:text-xl md:text-2xl font-mono font-bold text-black mb-1">24HR</div>
                <div className="text-[8px] sm:text-[10px] font-mono tracking-wider text-gray-500 uppercase">Shipping</div>
              </div>
              <div>
                <div className="text-lg sm:text-xl md:text-2xl font-mono font-bold text-black mb-1">100%</div>
                <div className="text-[8px] sm:text-[10px] font-mono tracking-wider text-gray-500 uppercase">Verified</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Purity Meter Section - FIRST */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-3 py-1 bg-black text-white text-[10px] font-mono tracking-[0.2em] uppercase mb-6">
              ISO 9001:2015 Certified Facilities
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4">
              Average Purity Across All Batches
            </h2>
            
            <p className="text-base sm:text-lg text-gray-600 mb-10 sm:mb-12">
              Every batch tested by independent laboratories
            </p>

            {/* Purity Meter */}
            <div className="bg-white border border-gray-200 p-6 sm:p-10 mb-8">
              <div className="text-5xl sm:text-7xl lg:text-7xl font-bold mb-6 sm:mb-8 tabular-nums text-black">
                {purityValue.toFixed(1)}%
              </div>
              
              <div className="relative h-3 sm:h-4 bg-gray-200 overflow-hidden mb-6">
                <div 
                  className="absolute inset-y-0 left-0 will-change-transform bg-black"
                  style={{ width: `${purityValue}%` }}
                />
              </div>

              <div className="flex justify-between text-xs font-mono text-gray-500">
                <span>90%</span>
                <span>95%</span>
                <span>100%</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-xl mx-auto">
              <div className="text-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-mono font-bold text-black mb-1">847</div>
                <div className="text-[9px] sm:text-xs font-mono text-gray-500 uppercase tracking-wider">Batches Tested</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-mono font-bold text-black mb-1">100%</div>
                <div className="text-[9px] sm:text-xs font-mono text-gray-500 uppercase tracking-wider">Third-Party Verified</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-mono font-bold text-black mb-1">99.65%</div>
                <div className="text-[9px] sm:text-xs font-mono text-gray-500 uppercase tracking-wider">Avg Purity</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why truechem Section - Cards */}
      <section id="why-truechem" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12 bg-[#FAFAFA]">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 sm:mb-6">
              Why <span className="font-mono text-black lowercase" style={{ letterSpacing: '0.08em' }}>
                <span className="font-bold">true</span>
                <span className="font-normal">chem</span>
              </span>?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              We're not just another compound supplier. We're researchers who got tired of inconsistent quality.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {/* Reason 1 */}
            <div className="bg-white border border-gray-200 p-6 sm:p-8 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-black mx-auto mb-4 sm:mb-6 flex items-center justify-center">
                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gray-900 border border-gray-700 flex items-center justify-center">
                  <Shield size={24} className="text-white" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4">US-Based Manufacturing</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                Unlike most suppliers who import from overseas, we use ISO 9001:2015 certified facilities operating domestically under strict quality controls.
              </p>
              <div className="text-xs sm:text-sm font-mono text-gray-500">
                <CheckCircle size={14} className="inline mr-2" />
                Zero customs delays
              </div>
            </div>

            {/* Reason 2 */}
            <div className="bg-white border border-gray-200 p-6 sm:p-8 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-black mx-auto mb-4 sm:mb-6 flex items-center justify-center">
                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gray-900 border border-gray-700 flex items-center justify-center">
                  <Award size={24} className="text-white" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4">Every Batch Tested</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                We don't trust manufacturer COAs. Every single batch gets independent third-party HPLC and mass spectrometry analysis.
              </p>
              <div className="text-xs sm:text-sm font-mono text-gray-500">
                <CheckCircle size={14} className="inline mr-2" />
                100% verification rate
              </div>
            </div>

            {/* Reason 3 */}
            <div className="bg-white border border-gray-200 p-6 sm:p-8 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-black mx-auto mb-4 sm:mb-6 flex items-center justify-center">
                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gray-900 border border-gray-700 flex items-center justify-center">
                  <Beaker size={24} className="text-white" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4">Research-First Approach</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                We're chemists, not salespeople. We understand what researchers need: consistency, documentation, and purity you can trust.
              </p>
              <div className="text-xs sm:text-sm font-mono text-gray-500">
                <CheckCircle size={14} className="inline mr-2" />
                Made by researchers
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 sm:mt-16 pt-10 sm:pt-12 border-t border-gray-200 max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
              <div>
                <div className="text-xl sm:text-2xl md:text-3xl font-mono font-bold text-black mb-1 sm:mb-2">5,000+</div>
                <div className="text-[9px] sm:text-xs font-mono text-gray-500 uppercase tracking-wider">Orders Shipped</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl md:text-3xl font-mono font-bold text-black mb-1 sm:mb-2">24HR</div>
                <div className="text-[9px] sm:text-xs font-mono text-gray-500 uppercase tracking-wider">Average Delivery</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl md:text-3xl font-mono font-bold text-black mb-1 sm:mb-2">99.65%</div>
                <div className="text-[9px] sm:text-xs font-mono text-gray-500 uppercase tracking-wider">Avg Purity</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl md:text-3xl font-mono font-bold text-black mb-1 sm:mb-2">4.9★</div>
                <div className="text-[9px] sm:text-xs font-mono text-gray-500 uppercase tracking-wider">Customer Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Standards Comparison */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-black mb-4">Industry Standards</h3>
            <p className="text-gray-600 mb-8 sm:mb-10">
              Most "US-based" peptide companies are actually just importing bulk powder from overseas and repackaging it. Here's how we compare.
            </p>
            
            <div className="space-y-4 sm:space-y-6 text-left">
              {/* truechem */}
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-black flex items-center justify-center flex-shrink-0"><VialIcon size={20} /></div>
                    <span className="font-bold text-sm">truechem</span>
                    <span className="text-[10px] sm:text-xs font-mono text-gray-500 whitespace-nowrap">(US-Mfg, Third-Party COA)</span>
                  </div>
                  <span className="text-base sm:text-lg font-mono font-bold text-black ml-10 sm:ml-0">99.65%</span>
                </div>
                <div className="h-6 sm:h-8 bg-gray-200 relative overflow-hidden">
                  <div className="h-full bg-black transition-all duration-300" style={{ width: '99.65%' }} />
                </div>
              </div>

              {/* Research Grade Standard */}
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <span className="text-xs sm:text-sm text-gray-600">Research Grade Standard</span>
                    <span className="text-[10px] sm:text-xs font-mono text-gray-400 whitespace-nowrap">(Industry Min)</span>
                  </div>
                  <span className="text-base sm:text-lg font-mono font-bold text-gray-600">95.0%</span>
                </div>
                <div className="h-5 sm:h-7 bg-gray-200 relative overflow-hidden">
                  <div className="h-full bg-gray-400 transition-all duration-300" style={{ width: '95%' }} />
                </div>
              </div>

              {/* Chinese Manufacturing */}
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <span className="text-xs sm:text-sm text-gray-600">Overseas Import</span>
                    <span className="text-[10px] sm:text-xs font-mono text-gray-400 whitespace-nowrap">(Typical "US" Supplier)</span>
                  </div>
                  <span className="text-base sm:text-lg font-mono font-bold text-gray-600">85-92%</span>
                </div>
                <div className="h-5 sm:h-7 bg-gray-200 relative overflow-hidden">
                  <div className="h-full bg-gray-300 transition-all duration-300" style={{ width: '88.5%' }} />
                </div>
              </div>

              {/* Underground Labs */}
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <span className="text-xs sm:text-sm text-gray-600">Underground Labs</span>
                    <span className="text-[10px] sm:text-xs font-mono text-gray-400 whitespace-nowrap">(Unverified)</span>
                  </div>
                  <span className="text-base sm:text-lg font-mono font-bold text-gray-600">70-85%</span>
                </div>
                <div className="h-5 sm:h-7 bg-gray-200 relative overflow-hidden">
                  <div className="h-full bg-gray-300 transition-all duration-300" style={{ width: '77.5%' }} />
                </div>
              </div>
            </div>

            <div className="mt-8 bg-black p-6 sm:p-8 text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                Ever wonder where your peptides actually come from?
              </h3>
              <button 
                onClick={() => navigateTo('manufacturing')}
                className="text-sm font-mono text-gray-400 hover:text-white transition-colors underline underline-offset-4"
              >
                Click here to find out →
              </button>
            </div>

            <p className="text-[10px] sm:text-xs text-gray-500 mt-6 font-mono">
              *Industry ranges based on publicly available testing data and supplier specifications
            </p>
          </div>
        </div>
      </section>

      {/* Why truechem Exists - Black Background */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12 bg-black text-white">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-4">Our Story</div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">Why truechem Exists</h2>
          
          <p className="text-gray-300 leading-relaxed mb-6">
            We ordered from dozens of suppliers claiming "99% purity" and "US-made." 
            When we sent samples to independent labs, one came back at <span className="text-white font-semibold">72%</span>.
          </p>
          <p className="text-gray-400 text-sm">
            That's when we decided to build something different.
          </p>
          
          <div className="mt-8">
            <button 
              onClick={() => navigateTo('our-story')}
              className="text-sm font-mono text-gray-400 hover:text-white transition-colors underline underline-offset-4"
            >
              Read our full story →
            </button>
          </div>
        </div>
      </section>

      {/* COA Proof Teaser */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-12 bg-[#FAFAFA]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-4">Transparency</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4">
            Every batch includes a Certificate of Analysis.
          </h2>
          <p className="text-gray-600 mb-6">
            Independent lab verification you can look up anytime.
          </p>
          <button 
            onClick={() => navigateTo('coa')}
            className="px-6 py-3 bg-black text-white font-mono text-sm hover:bg-gray-800 transition-all"
          >
            View COAs
          </button>
        </div>
      </section>

      {/* Who is truechem for - Simplified Checklist */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4">
              Who is truechem for?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {/* FOR */}
            <div className="bg-[#FAFAFA] border border-gray-200 p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">✓</span>
                <h3 className="font-bold text-lg">truechem is for you if...</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 bg-black text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                  <span className="text-sm text-gray-700">You've been burned by products that didn't deliver</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 bg-black text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                  <span className="text-sm text-gray-700">You want to verify what you're getting</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 bg-black text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                  <span className="text-sm text-gray-700">You understand quality costs more</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 bg-black text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                  <span className="text-sm text-gray-700">You value transparency over marketing</span>
                </li>
              </ul>
            </div>
            
            {/* NOT FOR */}
            <div className="bg-gray-100 border border-gray-200 p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl text-gray-500">✕</span>
                <h3 className="font-bold text-lg text-gray-700">truechem is NOT for you if...</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 bg-gray-400 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">✕</span>
                  <span className="text-sm text-gray-600">You're shopping purely on price</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 bg-gray-400 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">✕</span>
                  <span className="text-sm text-gray-600">You trust labels without verification</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 bg-gray-400 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">✕</span>
                  <span className="text-sm text-gray-600">You don't care where compounds come from</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 bg-gray-400 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">✕</span>
                  <span className="text-sm text-gray-600">You think all suppliers are the same</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12 bg-black text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            Ready to try research-grade quality?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#products" 
              className="px-6 py-3 bg-white text-black font-mono text-sm hover:bg-gray-100 transition-all"
            >
              Explore Compounds
            </a>
            <button 
              onClick={() => navigateTo('coa')}
              className="px-6 py-3 border border-white font-mono text-sm hover:bg-white hover:text-black transition-all"
            >
              View COAs
            </button>
          </div>
        </div>
      </section>

      <section id="products" className="py-16 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <h2 className="text-3xl font-bold mb-4 sm:mb-0">Products</h2>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all ${!selectedCategory ? 'bg-black text-white' : 'border border-gray-300 hover:border-black'}`}
              >
                All
              </button>
              <button 
                onClick={() => setSelectedCategory('glp1')}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all ${selectedCategory === 'glp1' ? 'bg-black text-white' : 'border border-gray-300 hover:border-black'}`}
              >
                GLP-1
              </button>
              <button 
                onClick={() => setSelectedCategory('growth')}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all ${selectedCategory === 'growth' ? 'bg-black text-white' : 'border border-gray-300 hover:border-black'}`}
              >
                Growth
              </button>
              <button 
                onClick={() => setSelectedCategory('recovery')}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all ${selectedCategory === 'recovery' ? 'bg-black text-white' : 'border border-gray-300 hover:border-black'}`}
              >
                Recovery
              </button>
              <button 
                onClick={() => setSelectedCategory('metabolic')}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all ${selectedCategory === 'metabolic' ? 'bg-black text-white' : 'border border-gray-300 hover:border-black'}`}
              >
                Metabolic
              </button>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                onClick={() => viewProduct(product)}
                className="bg-white border hover:border-black cursor-pointer p-6 transition-all"
              >
                <div className="text-xs font-mono text-gray-400 mb-2">{product.id}</div>
                {product.badge && (
                  <div className="inline-block px-2 py-1 bg-black text-white text-[9px] font-mono uppercase mb-3">
                    {product.badge}
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                <div className="font-mono text-sm text-gray-500 mb-4">{product.molecular}</div>
                <div className="inline-block px-3 py-1 bg-black text-white text-xs font-mono mb-4">
                  {product.purity}
                </div>
                <div className="text-2xl font-mono font-bold mb-4">{product.price}</div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product, product.sizes[0]);
                  }}
                  className="w-full py-3 bg-black text-white font-mono text-sm hover:bg-gray-800 mb-2 transition-all shadow-[0_0_0_1px_rgba(0,0,0,0.1)]"
                >
                  Add to Cart
                </button>
                <button className="w-full py-3 border border-gray-300 font-mono text-sm hover:border-black transition-all shadow-[0_0_0_1px_rgba(0,0,0,0.05)]">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 lg:px-12 bg-black text-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Company */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-black flex items-center justify-center"><VialIcon inverted={false} size={38} /></div>
                <div>
                  <div className="text-2xl font-mono lowercase" style={{ letterSpacing: '0.08em' }}>
                    <span className="font-bold">true</span>
                    <span className="font-normal">chem</span>
                  </div>
                  <div className="text-[9px] font-mono tracking-[0.15em] text-gray-400 uppercase">99%+ Certified</div>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Manufactured in ISO 9001:2015 certified facilities. Ultra-pure compounds exceeding 99% purity for scientific research.
              </p>
            </div>

            {/* Products */}
            <div>
              <div className="text-xs font-mono tracking-wider text-gray-400 uppercase mb-4">Products</div>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => goToCategory('glp1')} className="text-gray-300 hover:text-white transition-colors">GLP-1 Agonists</button></li>
                <li><button onClick={() => goToCategory('growth')} className="text-gray-300 hover:text-white transition-colors">Growth Factors</button></li>
                <li><button onClick={() => goToCategory('recovery')} className="text-gray-300 hover:text-white transition-colors">Recovery Compounds</button></li>
                <li><button onClick={() => goToCategory('metabolic')} className="text-gray-300 hover:text-white transition-colors">Metabolic Compounds</button></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <div className="text-xs font-mono tracking-wider text-gray-400 uppercase mb-4">Resources</div>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => navigateTo('coa')} className="text-gray-300 hover:text-white transition-colors">Certificates of Analysis</button></li>
                <li><button onClick={() => navigateTo('testing')} className="text-gray-300 hover:text-white transition-colors">Testing Methodology</button></li>
                <li><button onClick={() => goToCategory(null)} className="text-gray-300 hover:text-white transition-colors">All Products</button></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <div className="text-xs font-mono tracking-wider text-gray-400 uppercase mb-4">Company</div>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => navigateTo('our-story')} className="text-gray-300 hover:text-white transition-colors">About Us</button></li>
                <li><button onClick={() => navigateTo('testing')} className="text-gray-300 hover:text-white transition-colors">Quality Assurance</button></li>
                <li><button onClick={() => navigateTo('contact')} className="text-gray-300 hover:text-white transition-colors">Contact</button></li>
                <li><button onClick={() => navigateTo('tos')} className="text-gray-300 hover:text-white transition-colors">Terms of Service</button></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-xs font-mono text-gray-500">
                © 2024 truechem. All rights reserved.
              </div>
              <div className="flex items-center space-x-6 text-xs font-mono text-gray-500">
                <span>ISO 9001:2015 FACILITIES</span>
                <span>•</span>
                <span>THIRD-PARTY TESTED</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
