'use client'

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
          transform: translateY(12px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .animate-pageEnter {
        animation: pageEnter 0.35s cubic-bezier(0.16, 1, 0.3, 1);
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
        animation: pageFadeIn 0.25s ease-out;
      }
      
      /* FAQ Animations */
      @keyframes slideDown {
        from {
          opacity: 0;
          max-height: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          max-height: 500px;
          transform: translateY(0);
        }
      }
      .faq-answer-enter {
        animation: slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        overflow: hidden;
      }
      
      /* FAQ Button Hover Effects */
      .faq-button {
        position: relative;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .faq-button::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 0;
        background: linear-gradient(90deg, rgba(45, 212, 191, 0.08) 0%, rgba(45, 212, 191, 0) 100%);
        transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        pointer-events: none;
      }
      .faq-button:hover::before {
        width: 100%;
      }
      .faq-button:hover {
        background-color: #FAFAFA;
        transform: translateX(4px);
      }
      .faq-button:active {
        transform: translateX(2px) scale(0.995);
      }
      
      /* FAQ Plus/Minus Animation */
      .faq-icon {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .faq-button:hover .faq-icon {
        color: #2DD4BF;
        transform: scale(1.15) rotate(90deg);
      }
      .faq-icon.open {
        transform: rotate(180deg);
      }
      .faq-button:hover .faq-icon.open {
        transform: rotate(180deg) scale(1.15);
      }
      
      /* FAQ Card Hover */
      .faq-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        border: 1px solid #E5E7EB;
      }
      .faq-card:hover {
        border-color: #2DD4BF;
        box-shadow: 0 4px 12px rgba(45, 212, 191, 0.1);
        transform: translateY(-2px);
      }
      
      /* Question Text Hover */
      .faq-question {
        transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .faq-button:hover .faq-question {
        color: #000000;
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
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [cart, setCart] = useState([]);
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [notifyProduct, setNotifyProduct] = useState(null);
  const [notifyEmail, setNotifyEmail] = useState('');
  const [notifySubmitted, setNotifySubmitted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Set to false for launch - users will sign up

  // Mock user data (in production, this comes from Clerk/Supabase)
  const mockUser = {
    firstName: 'Alex',
    lastName: 'Chen',
    email: 'alex@example.com',
    membership: 'essential', // 'free', 'essential', 'elite'
    memberSince: '2025-01-15',
    nextBillingDate: '2026-01-15',
    storeCredit: {
      balance: 101.90, // Remaining credit
      original: 250.00, // Original credit amount (Essential = $250, Elite = $600)
      used: 148.10, // Amount already used
      expiresAt: '2025-04-15', // 90 days from membership start
      transactions: [
        {
          id: 'CR-001',
          date: '2025-01-15',
          type: 'earned',
          amount: 250.00,
          description: 'Welcome credit - Essential Membership',
          orderId: null
        },
        {
          id: 'CR-002',
          date: '2025-01-15',
          type: 'used',
          amount: -98.10,
          description: 'Applied to order #ORD-2691',
          orderId: 'ORD-2691'
        },
        {
          id: 'CR-003',
          date: '2025-01-28',
          type: 'used',
          amount: -50.00,
          description: 'Applied to order #ORD-2847',
          orderId: 'ORD-2847'
        }
      ]
    },
    orders: [
      {
        id: 'ORD-2847',
        date: '2025-01-28',
        total: 224.10,
        subtotal: 249.00,
        creditUsed: 50.00,
        discount: 24.90, // 10% member discount
        shipping: 0, // Free for members
        status: 'Shipped',
        trackingNumber: '1Z999AA10123456784',
        items: [
          { name: 'Retatrutide 30mg', quantity: 1, price: 249 }
        ]
      },
      {
        id: 'ORD-2691',
        date: '2025-01-15',
        total: 0, // Paid entirely with credit
        subtotal: 109.00,
        creditUsed: 98.10,
        discount: 10.90, // 10% member discount
        shipping: 0, // Free for members
        status: 'Delivered',
        trackingNumber: '1Z999AA10123456123',
        items: [
          { name: 'BPC-157 10mg', quantity: 1, price: 109 }
        ]
      }
    ],
    savedAddresses: [
      {
        id: 1,
        label: 'Home',
        name: 'Alex Chen',
        street: '742 Evergreen Terrace',
        city: 'Santa Barbara',
        state: 'CA',
        zip: '93101',
        isDefault: true
      }
    ]
  };

  // Navigate to page with scroll to top and smooth animation
  const navigateTo = (page) => {
    setPageTransition(true);
    setTimeout(() => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'instant' });
      setTimeout(() => {
        setPageTransition(false);
      }, 50);
    }, 200);
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
  inStock: false,
      id: 'TC-001',
      name: 'Retatrutide',
      category: 'glp1',
      purity: '99%+',
      cas: '2381089-83-2',
      molecular: 'C₂₂₅H₃₄₁N₆₁O₆₇S',
      weight: '4960.37',
      price: '$179.00',
      priceNum: 179.00,
      sizes: ['10mg', '30mg', '60mg'],
      sizesPricing: { '10mg': 179.00, '30mg': 449.00, '60mg': 579.00 },
      badge: 'Best Seller',
      description: 'Triple agonist GLP-1/GIP/glucagon receptor compound for metabolic research',
      fullDescription: 'Triple agonist GLP-1/GIP/glucagon receptor compound for metabolic research',
      form: 'Lyophilized powder',
      storage: '2-8°C short term, -20°C long term',
      solubility: 'Water, DMSO',
      stability: '12 months at -20°C',
      mechanism: 'Triple agonist simultaneously activating GLP-1, GIP, and glucagon receptors for comprehensive metabolic pathway research.',
      researchFindings: 'Research models demonstrate superior efficacy in metabolic studies compared to single-pathway agonists.',
      researchApplications: [
        'Metabolic pathway research',
        'Receptor binding studies',
        'Hormonal signaling investigation',
        'Compound pharmacokinetics analysis'
      ],
      stock: 'OUT OF STOCK'
    },
{
  inStock: false,
      id: 'TC-002',
      name: 'BPC-157',
      category: 'recovery',
      purity: '99%+',
      cas: '137525-51-0',
      molecular: 'C₆₂H₉₈N₁₆O₂₂',
      weight: '1419.53',
      price: '$109.00',
      priceNum: 109.00,
      sizes: ['10mg'],
      sizesPricing: { '10mg': 109.00 },
      badge: 'Essential',
      description: 'Body Protection Compound-157, synthetic peptide derived from gastric juice protein BPC',
      fullDescription: 'Body Protection Compound-157, synthetic peptide derived from gastric juice protein BPC',
      form: 'Lyophilized powder',
      storage: '2-8°C short term, -20°C long term',
      solubility: 'Water, saline',
      stability: '24 months at -20°C',
      mechanism: 'Promotes angiogenesis and tissue repair through growth factor modulation and cellular signaling pathways.',
      researchFindings: 'Extensively researched for tissue healing, angiogenesis, and gastrointestinal protection in laboratory models.',
      researchApplications: [
        'Tissue repair research',
        'Angiogenesis studies',
        'Gastrointestinal research',
        'Healing mechanism investigation'
      ],
      stock: 'OUT OF STOCK'
    },
{
  inStock: false,
      id: 'TC-003',
      name: 'AOD-9604',
      category: 'metabolic',
      purity: '99%+',
      cas: '221231-10-3',
      molecular: 'C₇₈H₁₂₃N₂₃O₂₃S₂',
      weight: '1815.08',
      price: '$119.00',
      priceNum: 119.00,
      sizes: ['5mg', '10mg'],
      sizesPricing: { '5mg': 119.00, '10mg': 139.00 },
      badge: '',
      description: 'Modified C-terminal fragment of human growth hormone for metabolic research',
      fullDescription: 'Modified C-terminal fragment of human growth hormone for metabolic research',
      form: 'Lyophilized powder',
      storage: '-20°C',
      solubility: 'Water, saline',
      stability: '24 months at -20°C',
      mechanism: 'Lipolytic effects through hGH fragment mechanisms without growth-promoting properties.',
      researchFindings: 'Research on fat metabolism pathways without the growth effects of full-length hGH.',
      researchApplications: [
        'Lipolysis research',
        'Fat metabolism studies',
        'hGH fragment investigation',
        'Metabolic pathway research'
      ],
      stock: 'OUT OF STOCK'
    },
{
  inStock: false,
      id: 'TC-004',
      name: 'BPC-157 / TB-500 (Wolverine)',
      category: 'recovery',
      purity: '99%+',
      cas: 'N/A (Combination)',
      molecular: 'Proprietary blend',
      weight: 'Variable',
      price: '$169.00',
      priceNum: 169.00,
      sizes: ['13mg'],
      sizesPricing: { '13mg': 169.00 },
      badge: '',
      description: 'Synergistic combination of BPC-157 and TB-500 (Thymosin Beta-4) for enhanced tissue research',
      fullDescription: 'Synergistic combination of BPC-157 and TB-500 (Thymosin Beta-4) for enhanced tissue research',
      form: 'Lyophilized powder',
      storage: '2-8°C short term, -20°C long term',
      solubility: 'Water, bacteriostatic water',
      stability: '12 months at -20°C',
      mechanism: 'Combined action of BPC-157 angiogenesis with TB-500 cell migration and differentiation properties.',
      researchFindings: 'Research indicates synergistic effects in tissue repair and cellular regeneration studies.',
      researchApplications: [
        'Enhanced tissue repair research',
        'Cell migration studies',
        'Wound healing investigation',
        'Regenerative research models'
      ],
      stock: 'OUT OF STOCK'
    },
{
  inStock: false,
      id: 'TC-005',
      name: 'CJC-1295 / Ipamorelin',
      category: 'growth',
      purity: '99%+',
      cas: 'N/A (Combination)',
      molecular: 'Proprietary combination',
      weight: 'Variable',
      price: '$119.00',
      priceNum: 119.00,
      sizes: ['10mg'],
      sizesPricing: { '10mg': 119.00 },
      badge: '',
      description: 'Combination of GHRH analog with selective ghrelin receptor agonist for growth hormone research',
      fullDescription: 'Combination of GHRH analog with selective ghrelin receptor agonist for growth hormone research',
      form: 'Lyophilized powder',
      storage: '2-8°C short term, -20°C long term',
      solubility: 'Bacteriostatic water',
      stability: '12 months at -20°C',
      mechanism: 'Synergistic action of GHRH pathway stimulation with selective ghrelin receptor activation.',
      researchFindings: 'Research demonstrates enhanced growth hormone secretion patterns in controlled laboratory studies.',
      researchApplications: [
        'Growth hormone pathway research',
        'Pituitary function studies',
        'Secretagogue mechanism investigation',
        'Hormonal regulation research'
      ],
      stock: 'OUT OF STOCK'
    },
{
  inStock: false,
      id: 'TC-006',
      name: 'Epithalon',
      category: 'metabolic',
      purity: '99%+',
      cas: '307297-39-8',
      molecular: 'C₁₄H₂₂N₄O₉',
      weight: '390.35',
      price: '$149.00',
      priceNum: 149.00,
      sizes: ['50mg'],
      sizesPricing: { '50mg': 149.00 },
      badge: '',
      description: 'Synthetic tetrapeptide derived from epithalamin for longevity research',
      fullDescription: 'Synthetic tetrapeptide derived from epithalamin for longevity research',
      form: 'Lyophilized powder',
      storage: '-20°C',
      solubility: 'Water, saline',
      stability: '24 months at -20°C',
      mechanism: 'Telomerase activation and circadian regulation research through pineal gland peptide mechanisms.',
      researchFindings: 'Studied in aging research models for effects on telomere length and cellular senescence.',
      researchApplications: [
        'Telomere research',
        'Cellular aging studies',
        'Circadian biology investigation',
        'Longevity mechanism research'
      ],
      stock: 'OUT OF STOCK'
    },
{
  inStock: false,
      id: 'TC-007',
      name: 'GHK-Cu',
      category: 'recovery',
      purity: '99%+',
      cas: '49557-75-7',
      molecular: 'C₁₄H₂₄CuN₆O₄',
      weight: '404.93',
      price: '$109.00',
      priceNum: 109.00,
      sizes: ['50mg'],
      sizesPricing: { '50mg': 109.00 },
      badge: '',
      description: 'Glycyl-L-Histidyl-L-Lysine-Copper complex, naturally occurring copper peptide',
      fullDescription: 'Glycyl-L-Histidyl-L-Lysine-Copper complex, naturally occurring copper peptide',
      form: 'Lyophilized powder',
      storage: '2-8°C short term, -20°C long term',
      solubility: 'Water, slightly acidic solutions',
      stability: '18 months at -20°C',
      mechanism: 'Copper-binding peptide modulating collagen synthesis, antioxidant pathways, and cellular repair mechanisms.',
      researchFindings: 'Well-documented in dermatological research for collagen production and tissue remodeling studies.',
      researchApplications: [
        'Collagen synthesis research',
        'Wound healing studies',
        'Antioxidant pathway investigation',
        'Skin biology research'
      ],
      stock: 'OUT OF STOCK'
    },
{
  inStock: false,
      id: 'TC-008',
      name: 'GLOW',
      category: 'recovery',
      purity: '99%+',
      cas: 'N/A (Blend)',
      molecular: 'Proprietary formulation',
      weight: 'Variable',
      price: '$179.00',
      priceNum: 179.00,
      sizes: ['70mg'],
      sizesPricing: { '70mg': 179.00 },
      badge: '',
      description: 'Proprietary aesthetic peptide blend for skin research applications',
      fullDescription: 'Proprietary aesthetic peptide blend for skin research applications',
      form: 'Lyophilized powder',
      storage: '2-8°C short term, -20°C long term',
      solubility: 'Sterile water',
      stability: '12 months at -20°C',
      mechanism: 'Multi-pathway approach to skin biology research through combined peptide mechanisms.',
      researchFindings: 'Formulated based on established peptide research for comprehensive skin biology studies.',
      researchApplications: [
        'Skin biology research',
        'Collagen pathway studies',
        'Aesthetic research models',
        'Cellular regeneration investigation'
      ],
      stock: 'OUT OF STOCK'
    },
{
  inStock: false,
      id: 'TC-009',
      name: 'KLOW',
      category: 'recovery',
      purity: '99%+',
      cas: 'N/A (Blend)',
      molecular: 'Proprietary formulation',
      weight: 'Variable',
      price: '$209.00',
      priceNum: 209.00,
      sizes: ['80mg'],
      sizesPricing: { '80mg': 209.00 },
      badge: '',
      description: 'Advanced aesthetic peptide formulation for comprehensive skin research',
      fullDescription: 'Advanced aesthetic peptide formulation for comprehensive skin research',
      form: 'Lyophilized powder',
      storage: '2-8°C short term, -20°C long term',
      solubility: 'Sterile water',
      stability: '12 months at -20°C',
      mechanism: 'Enhanced multi-target peptide blend for advanced dermatological research applications.',
      researchFindings: 'Premium formulation based on cutting-edge peptide research for skin biology studies.',
      researchApplications: [
        'Advanced skin research',
        'Multi-pathway investigation',
        'Dermatological studies',
        'Enhanced aesthetic research'
      ],
      stock: 'OUT OF STOCK'
    },
{
  inStock: false,
      id: 'TC-010',
      name: 'KPV',
      category: 'recovery',
      purity: '99%+',
      cas: '28305-03-1',
      molecular: 'C₁₈H₃₄N₆O₄',
      weight: '398.50',
      price: '$129.00',
      priceNum: 129.00,
      sizes: ['10mg'],
      sizesPricing: { '10mg': 129.00 },
      badge: '',
      description: 'C-terminal tripeptide of alpha-MSH for anti-inflammatory research',
      fullDescription: 'C-terminal tripeptide of alpha-MSH for anti-inflammatory research',
      form: 'Lyophilized powder',
      storage: '-20°C',
      solubility: 'Water, PBS',
      stability: '24 months at -20°C',
      mechanism: 'Potent anti-inflammatory through melanocortin pathway modulation and cytokine regulation.',
      researchFindings: 'Research demonstrates significant anti-inflammatory effects in gastrointestinal models.',
      researchApplications: [
        'Anti-inflammatory research',
        'Gastrointestinal studies',
        'Melanocortin pathway investigation',
        'IBD research models'
      ],
      stock: 'OUT OF STOCK'
    },
{
  inStock: false,
      id: 'TC-011',
      name: 'Kisspeptin-10',
      category: 'growth',
      purity: '99%+',
      cas: '374675-21-5',
      molecular: 'C₆₃H₈₃N₁₇O₁₄',
      weight: '1302.43',
      price: '$119.00',
      priceNum: 119.00,
      sizes: ['10mg'],
      sizesPricing: { '10mg': 119.00 },
      badge: '',
      description: 'Neuropeptide regulating reproductive hormone research',
      fullDescription: 'Neuropeptide regulating reproductive hormone research',
      form: 'Lyophilized powder',
      storage: '-20°C',
      solubility: 'Water, DMSO',
      stability: '18 months at -20°C',
      mechanism: 'GnRH release stimulation through kisspeptin receptor activation for reproductive research.',
      researchFindings: 'Key regulator in reproductive hormone research with extensive HPG axis studies.',
      researchApplications: [
        'Reproductive hormone research',
        'GnRH pathway studies',
        'HPG axis investigation',
        'Fertility research models'
      ],
      stock: 'OUT OF STOCK'
    },
{
  inStock: false,
      id: 'TC-012',
      name: 'MOTS-C',
      category: 'metabolic',
      purity: '99%+',
      cas: '1627580-64-6',
      molecular: 'C₁₀₂H₁₅₂N₂₈O₂₂S₂',
      weight: '2174.52',
      price: '$109.00',
      priceNum: 109.00,
      sizes: ['10mg'],
      sizesPricing: { '10mg': 109.00 },
      badge: '',
      description: 'Mitochondrial-derived peptide for metabolic and longevity research',
      fullDescription: 'Mitochondrial-derived peptide for metabolic and longevity research',
      form: 'Lyophilized powder',
      storage: '-20°C',
      solubility: 'Water, DMSO',
      stability: '12 months at -20°C',
      mechanism: 'Mitochondrial signaling peptide regulating metabolic homeostasis and insulin sensitivity.',
      researchFindings: 'Research indicates effects on metabolic regulation and age-related metabolic dysfunction.',
      researchApplications: [
        'Mitochondrial function research',
        'Metabolic regulation studies',
        'Insulin sensitivity investigation',
        'Aging metabolism research'
      ],
      stock: 'OUT OF STOCK'
    },
{
  inStock: false,
      id: 'TC-013',
      name: 'Melanotan II (MT2)',
      category: 'recovery',
      purity: '99%+',
      cas: '121062-08-6',
      molecular: 'C₅₀H₆₉N₁₅O₉',
      weight: '1024.18',
      price: '$99.00',
      priceNum: 99.00,
      sizes: ['10mg'],
      sizesPricing: { '10mg': 99.00 },
      badge: '',
      description: 'Synthetic analog of melanocyte-stimulating hormone for pigmentation research',
      fullDescription: 'Synthetic analog of melanocyte-stimulating hormone for pigmentation research',
      form: 'Lyophilized powder',
      storage: '-20°C',
      solubility: 'Bacteriostatic water',
      stability: '12 months at -20°C',
      mechanism: 'Melanocortin receptor agonist affecting melanin production and receptor signaling pathways.',
      researchFindings: 'Research focuses on melanocortin receptor mechanisms and pigmentation pathways.',
      researchApplications: [
        'Melanocortin research',
        'Pigmentation studies',
        'Receptor signaling investigation',
        'Skin biology research'
      ],
      stock: 'OUT OF STOCK'
    },
{
  inStock: false,
      id: 'TC-014',
      name: 'NAD+',
      category: 'metabolic',
      purity: '99%+',
      cas: '53-84-9',
      molecular: 'C₂₁H₂₇N₇O₁₄P₂',
      weight: '663.43',
      price: '$189.00',
      priceNum: 189.00,
      sizes: ['1000mg'],
      sizesPricing: { '1000mg': 189.00 },
      badge: '',
      description: 'Nicotinamide Adenine Dinucleotide, essential coenzyme for cellular energy metabolism',
      fullDescription: 'Nicotinamide Adenine Dinucleotide, essential coenzyme for cellular energy metabolism',
      form: 'Lyophilized powder',
      storage: '-20°C',
      solubility: 'Water',
      stability: '18 months at -20°C',
      mechanism: 'Essential coenzyme in redox reactions and sirtuin activation for cellular energy metabolism research.',
      researchFindings: 'Fundamental cellular coenzyme with extensive research in energy metabolism and aging pathways.',
      researchApplications: [
        'Cellular metabolism research',
        'Mitochondrial function studies',
        'Sirtuin pathway investigation',
        'NAD+ precursor research'
      ],
      stock: 'OUT OF STOCK'
    },
{
  inStock: false,
      id: 'TC-015',
      name: 'Selank',
      category: 'metabolic',
      purity: '99%+',
      cas: '129954-34-3',
      molecular: 'C₃₃H₅₇N₁₁O₉',
      weight: '751.87',
      price: '$119.00',
      priceNum: 119.00,
      sizes: ['20mg'],
      sizesPricing: { '20mg': 119.00 },
      badge: '',
      description: 'Synthetic anxiolytic nootropic peptide derived from tuftsin',
      fullDescription: 'Synthetic anxiolytic nootropic peptide derived from tuftsin',
      form: 'Lyophilized powder',
      storage: '-20°C',
      solubility: 'Water, saline',
      stability: '18 months at -20°C',
      mechanism: 'Anxiolytic and cognitive effects through GABA, serotonin, and dopamine modulation.',
      researchFindings: 'Research indicates anxiolytic properties and cognitive enhancement in behavioral studies.',
      researchApplications: [
        'Anxiolytic research',
        'Cognitive function studies',
        'Neurotransmitter investigation',
        'Behavioral research models'
      ],
      stock: 'OUT OF STOCK'
    },
{
  inStock: false,
      id: 'TC-016',
      name: 'Semaglutide',
      category: 'glp1',
      purity: '99%+',
      cas: '910463-68-2',
      molecular: 'C₁₈₇H₂₉₁N₄₅O₅₉',
      weight: '4113.57',
      price: '$169.00',
      priceNum: 169.00,
      sizes: ['10mg', '30mg', '60mg'],
      sizesPricing: { '10mg': 169.00, '30mg': 249.00, '60mg': 319.00 },
      badge: '',
      description: 'GLP-1 receptor agonist analog for metabolic and cardiovascular research',
      fullDescription: 'GLP-1 receptor agonist analog for metabolic and cardiovascular research',
      form: 'Lyophilized powder',
      storage: '2-8°C short term, -20°C long term',
      solubility: 'Water, phosphate buffer',
      stability: '18 months at -20°C',
      mechanism: 'GLP-1 receptor agonist with extended half-life properties for sustained research applications.',
      researchFindings: 'Widely studied GLP-1 analog with extensive research documentation in metabolic pathways.',
      researchApplications: [
        'GLP-1 pathway research',
        'Long-acting peptide studies',
        'Cardiovascular research models',
        'Metabolic regulation investigation'
      ],
      stock: 'OUT OF STOCK'
    },
{
  inStock: false,
      id: 'TC-017',
      name: 'Semax',
      category: 'metabolic',
      purity: '99%+',
      cas: '80714-61-0',
      molecular: 'C₃₇H₅₁N₉O₁₀S',
      weight: '813.92',
      price: '$119.00',
      priceNum: 119.00,
      sizes: ['20mg'],
      sizesPricing: { '20mg': 119.00 },
      badge: '',
      description: 'Synthetic ACTH analog nootropic peptide for cognitive research',
      fullDescription: 'Synthetic ACTH analog nootropic peptide for cognitive research',
      form: 'Lyophilized powder',
      storage: '-20°C',
      solubility: 'Water, saline',
      stability: '18 months at -20°C',
      mechanism: 'BDNF elevation and neuroprotection through ACTH 4-10 analog mechanisms.',
      researchFindings: 'Extensive research on cognitive enhancement and neuroprotection in various models.',
      researchApplications: [
        'Cognitive enhancement research',
        'Neuroprotection studies',
        'BDNF pathway investigation',
        'Neuroplasticity research'
      ],
      stock: 'OUT OF STOCK'
    },
{
  inStock: false,
      id: 'TC-018',
      name: 'Tesamorelin',
      category: 'growth',
      purity: '99%+',
      cas: '804475-66-9',
      molecular: 'C₂₂₁H₃₆₆N₇₂O₆₇S',
      weight: '5135.77',
      price: '$139.00',
      priceNum: 139.00,
      sizes: ['10mg', '20mg'],
      sizesPricing: { '10mg': 139.00, '20mg': 199.00 },
      badge: '',
      description: 'Synthetic GHRH (Growth Hormone Releasing Hormone) analog for metabolic research',
      fullDescription: 'Synthetic GHRH (Growth Hormone Releasing Hormone) analog for metabolic research',
      form: 'Lyophilized powder',
      storage: '2-8°C short term, -20°C long term',
      solubility: 'Sterile water',
      stability: '24 months at -20°C',
      mechanism: 'GHRH analog stimulating anterior pituitary growth hormone secretion through specific receptor activation.',
      researchFindings: 'FDA-approved compound with extensive research on lipid metabolism and visceral adiposity.',
      researchApplications: [
        'Growth hormone research',
        'Lipid metabolism studies',
        'Visceral fat research',
        'Pituitary signaling investigation'
      ],
      stock: 'OUT OF STOCK'
    },
{
  inStock: false,
      id: 'TC-019',
      name: 'Thymosin Alpha-1 (TA1)',
      category: 'recovery',
      purity: '99%+',
      cas: '62304-98-7',
      molecular: 'C₁₂₉H₂₁₅N₃₃O₅₅',
      weight: '3108.28',
      price: '$149.00',
      priceNum: 149.00,
      sizes: ['10mg'],
      sizesPricing: { '10mg': 149.00 },
      badge: '',
      description: 'Naturally occurring peptide from thymus gland for immune system research',
      fullDescription: 'Naturally occurring peptide from thymus gland for immune system research',
      form: 'Lyophilized powder',
      storage: '2-8°C short term, -20°C long term',
      solubility: 'Sterile water',
      stability: '24 months at -20°C',
      mechanism: 'Immune modulation through T-cell differentiation and cytokine regulation pathways.',
      researchFindings: 'Extensively researched for immune enhancement and viral response in laboratory models.',
      researchApplications: [
        'Immune system research',
        'T-cell function studies',
        'Cytokine regulation investigation',
        'Viral response research'
      ],
      stock: 'OUT OF STOCK'
    },
{
  inStock: false,
      id: 'TC-020',
      name: 'Tirzepatide',
      category: 'glp1',
      purity: '99%+',
      cas: '2023788-19-2',
      molecular: 'C₂₂₅H₃₄₈N₅₈O₆₈',
      weight: '4813.53',
      price: '$199.00',
      priceNum: 199.00,
      sizes: ['10mg', '30mg', '60mg', '100mg'],
      sizesPricing: { '10mg': 199.00, '30mg': 249.00, '60mg': 319.00, '100mg': 369.00 },
      badge: 'Popular',
      description: 'Dual GIP/GLP-1 receptor agonist for metabolic research applications',
      fullDescription: 'Dual GIP/GLP-1 receptor agonist for metabolic research applications',
      form: 'Lyophilized powder',
      storage: '2-8°C short term, -20°C long term',
      solubility: 'Water, bacteriostatic water',
      stability: '12 months at -20°C',
      mechanism: 'Dual agonist targeting both GIP and GLP-1 receptors for metabolic research applications.',
      researchFindings: 'Extensively studied in research models for glucose-dependent mechanisms and metabolic effects.',
      researchApplications: [
        'Dual receptor pathway research',
        'Glucose metabolism studies',
        'Incretin research',
        'Metabolic signaling investigation'
      ],
      stock: 'OUT OF STOCK'
    }
  ];

  // Medical Supplies Products
  const medicalSupplies = [
    {
      id: 'MS-001',
      name: 'Reusable Pen Injector',
      category: 'injection-devices',
      price: '$79.99',
      priceNum: 79.99,
      image: 'pen-injector',
      badge: 'Popular',
      description: 'FDA 510(k) cleared metered-dose injection device compatible with standard 3mL cartridges',
      fullDescription: 'Professional-grade reusable pen injector with precision dosing mechanism. FDA 510(k) cleared medical device manufactured to pharmaceutical standards.',
      specifications: {
        'Dose Range': '1-75 units',
        'Cartridge Compatibility': 'Standard 3mL cartridges',
        'Reusable': 'Up to 3,000 injections',
        'Precision': '±5% accuracy',
        'Manufacturer': 'Wuxi NEST Biotechnology Co., Ltd',
        'FDA Status': '510(k) Cleared'
      },
      included: [
        'Reusable pen injector device',
        'Carrying case',
        'User instructions',
        'Manufacturer documentation'
      ],
      inStock: true
    },
    {
      id: 'MS-002',
      name: 'Insulin Syringes 31G (100 pack)',
      category: 'sterile-supplies',
      price: '$24.99',
      priceNum: 24.99,
      image: 'syringes',
      badge: '',
      description: 'Sterile insulin syringes with ultra-fine 31-gauge needles, 0.3mL capacity',
      fullDescription: 'Medical-grade sterile insulin syringes with ultra-fine 31-gauge needles for comfortable subcutaneous administration. Individually packaged for sterility.',
      specifications: {
        'Needle Gauge': '31G (0.25mm)',
        'Needle Length': '6mm',
        'Capacity': '0.3mL (30 units)',
        'Quantity': '100 syringes',
        'Sterility': 'Individually wrapped',
        'Tip Type': 'Ultra-fine'
      },
      included: [
        '100 sterile insulin syringes',
        'Individual sterile packaging',
        'Safety caps'
      ],
      inStock: true
    },
    {
      id: 'MS-003',
      name: 'Alcohol Prep Pads (200 pack)',
      category: 'sterile-supplies',
      price: '$12.99',
      priceNum: 12.99,
      image: 'prep-pads',
      badge: '',
      description: 'Sterile alcohol preparation pads, 70% isopropyl alcohol, individually wrapped',
      fullDescription: 'Medical-grade sterile alcohol preparation pads for proper skin preparation. 70% isopropyl alcohol in convenient, individually wrapped pads.',
      specifications: {
        'Alcohol Content': '70% Isopropyl',
        'Pad Size': '2" x 2"',
        'Quantity': '200 pads',
        'Packaging': 'Individually wrapped',
        'Sterility': 'Medical-grade sterile'
      },
      included: [
        '200 sterile alcohol prep pads',
        'Individual foil packaging'
      ],
      inStock: true
    },
    {
      id: 'MS-004',
      name: 'Bacteriostatic Water 30mL',
      category: 'sterile-supplies',
      price: '$14.99',
      priceNum: 14.99,
      image: 'bac-water',
      badge: '',
      description: 'Sterile bacteriostatic water for reconstitution, 30mL vial with 0.9% benzyl alcohol',
      fullDescription: 'Pharmaceutical-grade bacteriostatic water for reconstitution of lyophilized compounds. Sterile water with 0.9% benzyl alcohol as preservative.',
      specifications: {
        'Volume': '30mL',
        'Preservative': '0.9% Benzyl Alcohol',
        'Sterility': 'Sterile filtered',
        'pH': '5.0-7.0',
        'Container': 'Multi-dose vial'
      },
      included: [
        '30mL sterile bacteriostatic water',
        'Sealed multi-dose vial',
        'Rubber stopper top'
      ],
      inStock: true
    },
    {
      id: 'MS-005',
      name: 'Sharps Container 1 Quart',
      category: 'safety-equipment',
      price: '$8.99',
      priceNum: 8.99,
      image: 'sharps',
      badge: '',
      description: 'FDA-approved sharps disposal container, 1 quart capacity, puncture-resistant',
      fullDescription: 'Medical-grade sharps disposal container meeting FDA requirements. Puncture-resistant construction with secure lid for safe disposal of needles and syringes.',
      specifications: {
        'Capacity': '1 Quart',
        'Material': 'Puncture-resistant plastic',
        'Closure': 'Permanent lock lid',
        'Compliance': 'FDA approved',
        'Color': 'Red'
      },
      included: [
        '1 quart sharps container',
        'Secure locking lid',
        'Wall mounting bracket'
      ],
      inStock: true
    },
    {
      id: 'MS-006',
      name: 'Needle Tips 23G (100 pack)',
      category: 'injection-devices',
      price: '$16.99',
      priceNum: 16.99,
      image: 'needle-tips',
      badge: '',
      description: 'Sterile screw-on needle tips, 23-gauge, compatible with pen injectors',
      fullDescription: 'Medical-grade sterile needle tips designed for use with reusable pen injectors. Precision-engineered screw-on connection for secure attachment.',
      specifications: {
        'Needle Gauge': '23G',
        'Needle Length': '6mm',
        'Connection Type': 'Screw-on',
        'Quantity': '100 tips',
        'Sterility': 'Individually wrapped',
        'Compatibility': 'Standard 3mL pen injectors'
      },
      included: [
        '100 sterile needle tips',
        'Individual sterile packaging',
        'Safety caps'
      ],
      inStock: true
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

  const filteredProducts = [...products, ...medicalSupplies].filter(product => {
    // Category filter - use categoryFilter on products page, selectedCategory elsewhere
    const activeCategory = currentPage === 'products' ? categoryFilter : selectedCategory;
    
    // Special handling for medical supplies category
    if (activeCategory === 'medical-supplies') {
      return product.id.startsWith('MS-');
    }
    
    if (activeCategory && product.category !== activeCategory) return false;
    // Search filter
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(query) ||
      product.id.toLowerCase().includes(query) ||
      (product.cas && product.cas.includes(query)) ||
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

  // Handle stock notification request
  const handleNotifyClick = (product) => {
    setNotifyProduct(product);
    setShowNotifyModal(true);
    setNotifySubmitted(false);
    setNotifyEmail('');
  };

  const submitNotification = () => {
    if (notifyEmail && notifyEmail.includes('@')) {
      // In production, send to Omnisend/Klaviyo API
      console.log(`Stock notification requested for ${notifyProduct.name} by ${notifyEmail}`);
      // Example Omnisend integration:
      // fetch('https://api.omnisend.com/v3/contacts', {
      //   method: 'POST',
      //   headers: {
      //     'X-API-KEY': 'your-api-key',
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     email: notifyEmail,
      //     tags: [`waitlist-${notifyProduct.id}`]
      //   })
      // });
      setNotifySubmitted(true);
      setTimeout(() => {
        setShowNotifyModal(false);
      }, 2000);
    }
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
                <button 
                  onClick={() => navigateTo('membership')}
                  className="text-sm font-medium text-teal-600 hover:text-teal-500"
                >
                  Research Club
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

        {/* Research Club CTA - Premium & Exclusive */}
        <section className="relative py-32 px-6 lg:px-12 bg-black overflow-hidden">
          {/* Teal accent dots */}
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute top-20 left-[10%] w-2 h-2 bg-teal-400 rounded-full"></div>
            <div className="absolute top-40 right-[15%] w-1.5 h-1.5 bg-teal-400 rounded-full"></div>
            <div className="absolute bottom-32 left-[20%] w-1 h-1 bg-teal-400 rounded-full"></div>
            <div className="absolute bottom-20 right-[25%] w-2 h-2 bg-teal-400 rounded-full"></div>
          </div>

          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-400/5 via-transparent to-transparent pointer-events-none"></div>

          <div className="max-w-[900px] mx-auto relative z-10">
            {/* Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-teal-400/30 bg-teal-400/5">
                <div className="w-1.5 h-1.5 bg-teal-400 rounded-full"></div>
                <span className="text-[10px] font-mono tracking-[0.2em] text-teal-400 uppercase">Exclusive Membership</span>
                <div className="w-1.5 h-1.5 bg-teal-400 rounded-full"></div>
              </div>
            </div>

            {/* Headline */}
            <h2 className="text-4xl lg:text-5xl font-bold text-white text-center mb-4 leading-tight">
              Unlock Full Research Access
            </h2>

            {/* Subheading */}
            <p className="text-lg text-gray-400 text-center mb-12 max-w-[650px] mx-auto">
              Get 10% off all products, free shipping, and early access to new compounds.
            </p>

            {/* Benefits Grid */}
            <div className="grid sm:grid-cols-3 gap-6 mb-10">
              <div className="text-center">
                <div className="text-3xl font-mono font-bold text-teal-400 mb-2">10%</div>
                <div className="text-sm text-gray-400">Member Savings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-mono font-bold text-teal-400 mb-2">Free</div>
                <div className="text-sm text-gray-400">Priority Shipping</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-mono font-bold text-teal-400 mb-2">24h</div>
                <div className="text-sm text-gray-400">Early Access</div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <button
                onClick={() => navigateTo('membership')}
                className="inline-flex items-center gap-3 px-8 py-4 bg-teal-400 text-black font-mono text-sm font-bold hover:bg-teal-300 transition-all"
              >
                View Membership Options
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <p className="text-xs text-gray-600 mt-4 font-mono">Starting at $199/year · Cancel anytime</p>
            </div>
          </div>
        </section>

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
                <li><button onClick={() => goToCategory('bundles')} className="text-gray-300 hover:text-white transition-colors">Bundles</button></li>
                <li><button onClick={() => navigateTo('membership')} className="text-gray-300 hover:text-white transition-colors">Research Club</button></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <div className="text-xs font-mono tracking-wider text-gray-400 uppercase mb-4">Resources</div>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => navigateTo('coa')} className="text-gray-300 hover:text-white transition-colors">Certificates of Analysis</button></li>
                <li><button onClick={() => navigateTo('testing')} className="text-gray-300 hover:text-white transition-colors">Testing Methodology</button></li>
                <li><button onClick={() => navigateTo('faq')} className="text-gray-300 hover:text-white transition-colors">FAQ</button></li>
                <li><button onClick={() => goToCategory(null)} className="text-gray-300 hover:text-white transition-colors">All Products</button></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <div className="text-xs font-mono tracking-wider text-gray-400 uppercase mb-4">Company</div>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => navigateTo('ourstory')} className="text-gray-300 hover:text-white transition-colors">About Us</button></li>
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
                © 2025 truechem. All rights reserved.
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
                onClick={() => navigateTo('products')}
                className="px-8 py-4 bg-black text-white font-mono text-sm hover:bg-gray-800 transition-all inline-block"
              >
                View Products
              </button>
            </div>

          </div>
        </section>

        {/* Research Club CTA - Premium & Exclusive */}
        <section className="relative py-32 px-6 lg:px-12 bg-black overflow-hidden">
          {/* Teal accent dots */}
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute top-20 left-[10%] w-2 h-2 bg-teal-400 rounded-full"></div>
            <div className="absolute top-40 right-[15%] w-1.5 h-1.5 bg-teal-400 rounded-full"></div>
            <div className="absolute bottom-32 left-[20%] w-1 h-1 bg-teal-400 rounded-full"></div>
            <div className="absolute bottom-20 right-[25%] w-2 h-2 bg-teal-400 rounded-full"></div>
          </div>

          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-400/5 via-transparent to-transparent pointer-events-none"></div>

          <div className="max-w-[900px] mx-auto relative z-10">
            {/* Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-teal-400/30 bg-teal-400/5">
                <div className="w-1.5 h-1.5 bg-teal-400 rounded-full"></div>
                <span className="text-[10px] font-mono tracking-[0.2em] text-teal-400 uppercase">Exclusive Membership</span>
                <div className="w-1.5 h-1.5 bg-teal-400 rounded-full"></div>
              </div>
            </div>

            {/* Headline */}
            <h2 className="text-4xl lg:text-5xl font-bold text-white text-center mb-4 leading-tight">
              Unlock Full Research Access
            </h2>

            {/* Subheading */}
            <p className="text-lg text-gray-400 text-center mb-12 max-w-[650px] mx-auto">
              Get 10% off all products, free shipping, and early access to new compounds.
            </p>

            {/* Benefits Grid */}
            <div className="grid sm:grid-cols-3 gap-6 mb-10">
              <div className="text-center">
                <div className="text-3xl font-mono font-bold text-teal-400 mb-2">10%</div>
                <div className="text-sm text-gray-400">Member Savings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-mono font-bold text-teal-400 mb-2">Free</div>
                <div className="text-sm text-gray-400">Priority Shipping</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-mono font-bold text-teal-400 mb-2">24h</div>
                <div className="text-sm text-gray-400">Early Access</div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <button
                onClick={() => navigateTo('membership')}
                className="inline-flex items-center gap-3 px-8 py-4 bg-teal-400 text-black font-mono text-sm font-bold hover:bg-teal-300 transition-all"
              >
                View Membership Options
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <p className="text-xs text-gray-600 mt-4 font-mono">Starting at $199/year · Cancel anytime</p>
            </div>
          </div>
        </section>

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
                <li><button onClick={() => goToCategory('bundles')} className="text-gray-300 hover:text-white transition-colors">Bundles</button></li>
                <li><button onClick={() => navigateTo('membership')} className="text-gray-300 hover:text-white transition-colors">Research Club</button></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <div className="text-xs font-mono tracking-wider text-gray-400 uppercase mb-4">Resources</div>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => navigateTo('coa')} className="text-gray-300 hover:text-white transition-colors">Certificates of Analysis</button></li>
                <li><button onClick={() => navigateTo('testing')} className="text-gray-300 hover:text-white transition-colors">Testing Methodology</button></li>
                <li><button onClick={() => navigateTo('faq')} className="text-gray-300 hover:text-white transition-colors">FAQ</button></li>
                <li><button onClick={() => goToCategory(null)} className="text-gray-300 hover:text-white transition-colors">All Products</button></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <div className="text-xs font-mono tracking-wider text-gray-400 uppercase mb-4">Company</div>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => navigateTo('ourstory')} className="text-gray-300 hover:text-white transition-colors">About Us</button></li>
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
                © 2025 truechem. All rights reserved.
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
                    <button className="w-full py-3 sm:py-4 bg-black text-white mb-2 sm:mb-3 hover:bg-gray-800 font-mono text-sm transition-all shadow-[0_0_0_1px_rgba(0,0,0,0.1)]">
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



  // ========================================
  if (currentPage === 'membership') {
    return (
      <div className="min-h-screen bg-black">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-800">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between h-20">
              <button onClick={() => navigateTo('home')} className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white flex items-center justify-center"><VialIcon inverted={true} size={38} /></div>
                <div>
                  <div className="text-2xl font-mono text-white lowercase" style={{ letterSpacing: '0.08em' }}>
                    <span className="font-bold">true</span>
                    <span className="font-normal">chem</span>
                  </div>
                  <div className="text-[9px] font-mono tracking-[0.15em] text-gray-400 uppercase">99%+ Certified</div>
                </div>
              </button>
              <button 
                onClick={() => navigateTo('cart')}
                className="p-2 hover:bg-gray-900 rounded-lg relative"
              >
                <ShoppingCart size={20} className="text-white" />
                {cartItemCount > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-teal-400 text-black text-[10px] font-mono font-bold rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 lg:px-12 bg-black text-white">
          <div className="max-w-[1400px] mx-auto text-center">
            <div className="inline-block px-4 py-1 bg-white bg-opacity-10 text-xs font-mono tracking-wider uppercase mb-6">
              Research Club
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Exclusive Access.<br />Premium Research.
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Join an elite community of researchers with access to premium compounds, 
              in-depth analysis, and dedicated support.
            </p>
          </div>
        </section>

        {/* Membership Tiers */}
        <section className="py-20 px-6 lg:px-12 bg-black">
          <div className="max-w-[1400px] mx-auto">
            
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Free Tier */}
              <div className="bg-black border-2 border-gray-800 hover:border-gray-700 transition-all">
                <div className="p-8">
                  <div className="text-xs font-mono tracking-wider text-gray-500 uppercase mb-2">Newsletter</div>
                  <h3 className="text-3xl font-bold text-white mb-2">Free</h3>
                  <div className="text-4xl font-mono font-bold text-white mb-6">
                    $0<span className="text-lg text-gray-500">/month</span>
                  </div>
                  <button 
                    onClick={() => alert('Newsletter signup coming soon!')}
                    className="w-full py-3 border-2 border-gray-700 font-mono text-sm text-white hover:bg-gray-900 transition-all mb-8"
                  >
                    Subscribe
                  </button>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-black"></div>
                      </div>
                      <div className="text-sm">Monthly research newsletter</div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-black"></div>
                      </div>
                      <div className="text-sm">New product announcements</div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-black"></div>
                      </div>
                      <div className="text-sm">Basic dosing guidelines</div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-black"></div>
                      </div>
                      <div className="text-sm">Community access</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Premium Tier */}
              <div className="bg-black border-2 border-teal-400 relative shadow-[0_0_30px_rgba(45,212,191,0.3)]">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="bg-teal-400 text-black px-4 py-1 text-xs font-mono tracking-wider uppercase font-bold">
                    Most Popular
                  </div>
                </div>
                <div className="p-8">
                  <div className="text-xs font-mono tracking-wider text-teal-400 uppercase mb-2">Premium</div>
                  <h3 className="text-3xl font-bold text-white mb-2">Research Club</h3>
                  <div className="text-4xl font-mono font-bold text-white mb-6">
                    $199<span className="text-lg text-gray-500">/year</span>
                  </div>
                  <button 
                    onClick={() => alert('Membership signup coming soon!')}
                    className="w-full py-3 bg-teal-400 text-black font-mono text-sm hover:bg-teal-300 transition-all mb-8"
                  >
                    Join Now
                  </button>
                  
                  <div className="space-y-4">
                    {/* Store Credit Highlight */}
                    <div className="bg-teal-400/10 border border-teal-400/30 p-4 -mx-2 mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-xs font-mono uppercase tracking-wider text-teal-400">Welcome Bonus</div>
                        <div className="text-2xl font-mono font-bold text-teal-400">$250</div>
                      </div>
                      <div className="text-xs text-gray-400">Store credit • Use within 90 days</div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-teal-400"></div>
                      </div>
                      <div className="text-sm font-bold text-white">Everything in Free, plus:</div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-teal-400"></div>
                      </div>
                      <div className="text-sm text-gray-300">10% off all products</div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-teal-400"></div>
                      </div>
                      <div className="text-sm text-gray-300">Free priority shipping</div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-teal-400"></div>
                      </div>
                      <div className="text-sm text-gray-300">Enhanced weekly newsletter</div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-teal-400"></div>
                      </div>
                      <div className="text-sm text-gray-300">Detailed research protocols</div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-black"></div>
                      </div>
                      <div className="text-sm">Early product access</div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-black"></div>
                      </div>
                      <div className="text-sm">Members-only bundles</div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-black"></div>
                      </div>
                      <div className="text-sm">Priority customer support</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Elite Tier */}
              <div className="bg-gray-900 text-white border-2 border-gray-800 hover:border-gray-700 transition-all">
                <div className="p-8">
                  <div className="text-xs font-mono tracking-wider text-gray-500 uppercase mb-2">Elite</div>
                  <h3 className="text-3xl font-bold mb-2">Concierge</h3>
                  <div className="text-4xl font-mono font-bold mb-6">
                    $499<span className="text-lg text-gray-400">/month</span>
                  </div>
                  <button 
                    onClick={() => alert('Elite membership signup coming soon!')}
                    className="w-full py-3 bg-white text-black font-mono text-sm hover:bg-gray-200 transition-all mb-8"
                  >
                    Apply Now
                  </button>
                  
                  <div className="space-y-4">
                    {/* Store Credit Highlight */}
                    <div className="bg-teal-400/10 border border-teal-400/30 p-4 -mx-2 mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-xs font-mono uppercase tracking-wider text-teal-400">Welcome Bonus</div>
                        <div className="text-2xl font-mono font-bold text-teal-400">$600</div>
                      </div>
                      <div className="text-xs text-gray-400">First month credit • Use within 60 days</div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white"></div>
                      </div>
                      <div className="text-sm font-bold">Everything in Premium, plus:</div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-teal-400"></div>
                      </div>
                      <div className="text-sm text-gray-300">15% off all additional purchases</div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-teal-400"></div>
                      </div>
                      <div className="text-sm">Comprehensive research library</div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-teal-400"></div>
                      </div>
                      <div className="text-sm">Advanced dosing & stacking guides</div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-teal-400"></div>
                      </div>
                      <div className="text-sm">1-on-1 research consultations</div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-teal-400"></div>
                      </div>
                      <div className="text-sm">Dedicated account manager</div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-teal-400"></div>
                      </div>
                      <div className="text-sm">Exclusive private community</div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-teal-400"></div>
                      </div>
                      <div className="text-sm">Custom research requests</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Value Comparison */}
        <section className="py-20 px-6 lg:px-12 bg-black border-t border-gray-900">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">Compare Membership Value</h2>
            
            <div className="bg-gray-900 border border-gray-800 p-8">
              <div className="grid md:grid-cols-2 gap-12">
                
                {/* Premium Breakdown */}
                <div>
                  <h3 className="text-lg font-bold mb-6 pb-3 border-b border-gray-800 text-white">Premium ($199/year)</h3>
                  <div className="space-y-4 text-sm font-mono">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Annual membership</span>
                      <span className="font-bold text-white">$199</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">10% savings on $2,000</span>
                      <span className="font-bold text-white">$200</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Free shipping (4 orders)</span>
                      <span className="font-bold text-white">~$40</span>
                    </div>
                    <div className="pt-4 border-t border-gray-800 flex justify-between">
                      <span className="font-bold text-white">Total value</span>
                      <span className="font-bold text-white">$240+</span>
                    </div>
                    <div className="flex justify-between text-teal-400">
                      <span className="font-bold">You save</span>
                      <span className="font-bold">$41+/year</span>
                    </div>
                  </div>
                </div>

                {/* Elite Breakdown */}
                <div>
                  <h3 className="text-lg font-bold mb-6 pb-3 border-b">Elite ($499/month)</h3>
                  <div className="space-y-4 text-sm font-mono">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly membership</span>
                      <span className="font-bold">$499</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Included vial value</span>
                      <span className="font-bold">~$150</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">15% savings on purchases</span>
                      <span className="font-bold">$75+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Research library access</span>
                      <span className="font-bold">$99</span>
                    </div>
                    <div className="pt-4 border-t flex justify-between">
                      <span className="font-bold">Total monthly value</span>
                      <span className="font-bold">$324+</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-400 font-mono">
                Break even with just 4 orders per year on Premium. Elite members receive $1,800+ 
                in compound value annually, plus exclusive research access.
              </p>
            </div>
          </div>
        </section>

        {/* Features Deep Dive */}
        <section className="py-20 px-6 lg:px-12 bg-black">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16 text-white">What You Get</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              
              <div className="bg-gray-900 border border-gray-800 p-8 hover:border-gray-700 transition-all">
                <div className="w-12 h-12 bg-teal-400 flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Verified Purity</h3>
                <p className="text-gray-400 leading-relaxed">
                  Every batch third-party tested and certified above 99% purity. 
                  Members get early access to COA reports before product launches.
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 p-8 hover:border-gray-700 transition-all">
                <div className="w-12 h-12 bg-teal-400 flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Research Library</h3>
                <p className="text-gray-400 leading-relaxed">
                  Premium members get access to our expanding database of research papers, 
                  clinical studies, and detailed compound mechanisms. Elite members receive 
                  custom research summaries.
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 p-8 hover:border-gray-700 transition-all">
                <div className="w-12 h-12 bg-teal-400 flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Private Community</h3>
                <p className="text-gray-400 leading-relaxed">
                  Join an exclusive community of serious researchers. Share protocols, 
                  discuss findings, and collaborate on research. Elite members get access 
                  to private channels.
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 p-8 hover:border-gray-700 transition-all">
                <div className="w-12 h-12 bg-teal-400 flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Expert Newsletter</h3>
                <p className="text-gray-400 leading-relaxed">
                  Premium members receive weekly deep-dives on specific compounds, 
                  dosing strategies, and research updates. Elite members get personalized 
                  research summaries based on their interests.
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 p-8 hover:border-gray-700 transition-all">
                <div className="w-12 h-12 bg-teal-400 flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Early Access</h3>
                <p className="text-gray-400 leading-relaxed">
                  Be first to access new compounds and limited batches. Premium members 
                  get 24-hour advance notice. Elite members can request specific compounds 
                  for priority sourcing.
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 p-8 hover:border-gray-700 transition-all">
                <div className="w-12 h-12 bg-teal-400 flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Dedicated Support</h3>
                <p className="text-gray-400 leading-relaxed">
                  Premium members get priority email support with faster response times. 
                  Elite members have a dedicated account manager available for research 
                  consultations and product guidance.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Research Club CTA - Premium & Exclusive */}
        <section className="relative py-32 px-6 lg:px-12 bg-black overflow-hidden">
          {/* Teal accent dots */}
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute top-20 left-[10%] w-2 h-2 bg-teal-400 rounded-full"></div>
            <div className="absolute top-40 right-[15%] w-1.5 h-1.5 bg-teal-400 rounded-full"></div>
            <div className="absolute bottom-32 left-[20%] w-1 h-1 bg-teal-400 rounded-full"></div>
            <div className="absolute bottom-20 right-[25%] w-2 h-2 bg-teal-400 rounded-full"></div>
          </div>

          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-400/5 via-transparent to-transparent pointer-events-none"></div>

          <div className="max-w-[900px] mx-auto relative z-10">
            {/* Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-teal-400/30 bg-teal-400/5">
                <div className="w-1.5 h-1.5 bg-teal-400 rounded-full"></div>
                <span className="text-[10px] font-mono tracking-[0.2em] text-teal-400 uppercase">Exclusive Access</span>
                <div className="w-1.5 h-1.5 bg-teal-400 rounded-full"></div>
              </div>
            </div>

            {/* Headline */}
            <h2 className="text-5xl lg:text-6xl font-bold text-white text-center mb-6 leading-tight">
              Join the Research Club
            </h2>

            {/* Subheading */}
            <p className="text-xl text-gray-400 text-center mb-16 max-w-[650px] mx-auto leading-relaxed">
              Access premium research compounds, exclusive member pricing, and expert protocols. 
              <span className="text-teal-400"> Limited memberships available.</span>
            </p>

            {/* Membership Tiers */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {/* Essential Tier */}
              <div className="group relative bg-white/5 border border-white/10 p-8 hover:border-white/30 transition-all duration-300 hover:-translate-y-1">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                
                <div className="text-xs font-mono tracking-[0.15em] text-gray-500 uppercase mb-2">Essential</div>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-mono font-bold text-white">$199</span>
                  <span className="text-gray-500 font-mono text-sm">/year</span>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3 text-sm text-gray-300">
                    <div className="w-1 h-1 bg-white rounded-full mt-2 shrink-0"></div>
                    <span>10% off all products</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-gray-300">
                    <div className="w-1 h-1 bg-white rounded-full mt-2 shrink-0"></div>
                    <span>Free shipping on all orders</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-gray-300">
                    <div className="w-1 h-1 bg-white rounded-full mt-2 shrink-0"></div>
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-gray-300">
                    <div className="w-1 h-1 bg-white rounded-full mt-2 shrink-0"></div>
                    <span>Members-only bundles</span>
                  </li>
                </ul>

                <button
                  onClick={() => navigateTo('membership')}
                  className="w-full py-4 bg-white text-black font-mono text-sm hover:bg-gray-100 transition-all group-hover:bg-white"
                >
                  START ESSENTIAL
                </button>
              </div>

              {/* Elite Tier */}
              <div className="group relative bg-gradient-to-br from-teal-400/10 via-teal-400/5 to-transparent border border-teal-400/30 p-8 hover:border-teal-400/50 transition-all duration-300 hover:-translate-y-1">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-teal-400 to-transparent"></div>
                
                {/* Elite Badge */}
                <div className="absolute -top-3 right-8">
                  <div className="px-3 py-1 bg-teal-400 text-black text-[9px] font-mono tracking-[0.15em] uppercase">
                    💎 Elite Access
                  </div>
                </div>

                <div className="text-xs font-mono tracking-[0.15em] text-teal-400 uppercase mb-2">Elite</div>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-mono font-bold text-white">$499</span>
                  <span className="text-gray-500 font-mono text-sm">/month</span>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3 text-sm text-white">
                    <div className="w-1 h-1 bg-teal-400 rounded-full mt-2 shrink-0"></div>
                    <span><strong className="text-teal-400">1 free vial/month</strong> (your choice)</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-white">
                    <div className="w-1 h-1 bg-teal-400 rounded-full mt-2 shrink-0"></div>
                    <span>15% off additional products</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-white">
                    <div className="w-1 h-1 bg-teal-400 rounded-full mt-2 shrink-0"></div>
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-white">
                    <div className="w-1 h-1 bg-teal-400 rounded-full mt-2 shrink-0"></div>
                    <span>Custom dosing protocols</span>
                  </li>
                </ul>

                <button
                  onClick={() => navigateTo('membership')}
                  className="w-full py-4 bg-teal-400 text-black font-mono text-sm hover:bg-teal-300 transition-all"
                >
                  APPLY FOR ELITE
                </button>
              </div>
            </div>

            {/* Bottom text */}
            <div className="text-center">
              <p className="text-xs font-mono text-gray-600 mb-3">
                No commitment. Cancel anytime.
              </p>
              <button
                onClick={() => navigateTo('membership')}
                className="text-sm text-teal-400 hover:text-teal-300 font-mono transition-colors inline-flex items-center gap-2"
              >
                View all membership benefits
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
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
                <li><button onClick={() => goToCategory('bundles')} className="text-gray-300 hover:text-white transition-colors">Bundles</button></li>
                <li><button onClick={() => navigateTo('membership')} className="text-gray-300 hover:text-white transition-colors">Research Club</button></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <div className="text-xs font-mono tracking-wider text-gray-400 uppercase mb-4">Resources</div>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => navigateTo('coa')} className="text-gray-300 hover:text-white transition-colors">Certificates of Analysis</button></li>
                <li><button onClick={() => navigateTo('testing')} className="text-gray-300 hover:text-white transition-colors">Testing Methodology</button></li>
                <li><button onClick={() => navigateTo('faq')} className="text-gray-300 hover:text-white transition-colors">FAQ</button></li>
                <li><button onClick={() => goToCategory(null)} className="text-gray-300 hover:text-white transition-colors">All Products</button></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <div className="text-xs font-mono tracking-wider text-gray-400 uppercase mb-4">Company</div>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => navigateTo('ourstory')} className="text-gray-300 hover:text-white transition-colors">About Us</button></li>
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
                © 2025 truechem. All rights reserved.
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

  if (currentPage === 'products') {
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
              <nav className="hidden md:flex items-center space-x-8">
                <button 
                  onClick={() => navigateTo('products')}
                  className="text-sm font-medium text-black hover:text-gray-600"
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
                  onClick={() => navigateTo('ourstory')}
                  className="text-sm font-medium text-black"
                >
                  Why Truechem
                </button>
                <button 
                  onClick={() => navigateTo('membership')}
                  className="text-sm font-medium text-teal-600 hover:text-teal-500"
                >
                  Research Club
                </button>
              </nav>
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
        </header>

        <section className="pt-32 pb-16 px-6 lg:px-12">
          <div className="max-w-[1400px] mx-auto">
            
            <div className="mb-12">
              <h1 className="text-5xl font-bold mb-4">All Products</h1>
              <p className="text-xl text-gray-600">Research-grade peptides and professional medical supplies</p>
            </div>

            <div className="mb-12">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setCategoryFilter(null)}
                  className={`px-6 py-3 font-mono text-sm transition-all ${
                    categoryFilter === null ? 'bg-black text-white' : 'bg-white border border-gray-300 hover:border-black'
                  }`}
                >
                  All Products
                </button>
                <button
                  onClick={() => setCategoryFilter('glp1')}
                  className={`px-6 py-3 font-mono text-sm transition-all ${
                    categoryFilter === 'glp1' ? 'bg-black text-white' : 'bg-white border border-gray-300 hover:border-black'
                  }`}
                >
                  GLP-1 Agonists
                </button>
                <button
                  onClick={() => setCategoryFilter('recovery')}
                  className={`px-6 py-3 font-mono text-sm transition-all ${
                    categoryFilter === 'recovery' ? 'bg-black text-white' : 'bg-white border border-gray-300 hover:border-black'
                  }`}
                >
                  Recovery
                </button>
                <button
                  onClick={() => setCategoryFilter('growth')}
                  className={`px-6 py-3 font-mono text-sm transition-all ${
                    categoryFilter === 'growth' ? 'bg-black text-white' : 'bg-white border border-gray-300 hover:border-black'
                  }`}
                >
                  Growth Hormone
                </button>
                <button
                  onClick={() => setCategoryFilter('metabolic')}
                  className={`px-6 py-3 font-mono text-sm transition-all ${
                    categoryFilter === 'metabolic' ? 'bg-black text-white' : 'bg-white border border-gray-300 hover:border-black'
                  }`}
                >
                  Metabolic
                </button>
                <button
                  onClick={() => setCategoryFilter('bundles')}
                  className={`px-6 py-3 font-mono text-sm transition-all ${
                    categoryFilter === 'bundles' ? 'bg-black text-white' : 'bg-white border border-gray-300 hover:border-black'
                  }`}
                >
                  Bundles
                </button>
                <button
                  onClick={() => setCategoryFilter('medical-supplies')}
                  className={`px-6 py-3 font-mono text-sm transition-all ${
                    categoryFilter === 'medical-supplies' ? 'bg-black text-white' : 'bg-white border border-gray-300 hover:border-black'
                  }`}
                >
                  Medical Supplies
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id} 
                  onClick={() => viewProduct(product)}
                  className="bg-white border-2 border-gray-200 hover:border-black hover:shadow-2xl transition-all duration-200 group cursor-pointer flex flex-col hover:scale-105 hover:-translate-y-2"
                >
                  <div className="aspect-square bg-gray-50 flex items-center justify-center p-8 border-b-2 border-gray-200 group-hover:border-black transition-colors duration-200">
                    <Beaker size={80} className="text-gray-300 group-hover:text-black transition-colors duration-200" />
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="text-[10px] font-mono text-gray-400 mb-3">{product.id}</div>
                    
                    <div className="flex flex-wrap gap-2 mb-4 min-h-[28px]">
                      {product.badge && (
                        <div className="inline-block px-2 py-1 bg-black text-white text-[8px] font-mono uppercase">
                          {product.badge}
                        </div>
                      )}
                      {!product.inStock && (
                        <div className="inline-block px-2 py-1 bg-red-600 text-white text-[8px] font-mono uppercase">
                          OUT OF STOCK
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-bold mb-3 min-h-[56px]">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[40px]">{product.description}</p>
                    
                    {product.purity ? (
                      <div className="mb-4 min-h-[32px] flex items-start">
                        <span className="inline-block px-3 py-1 bg-black text-white text-[10px] font-mono font-bold">
                          {product.purity}
                        </span>
                      </div>
                    ) : (
                      <div className="mb-4 min-h-[32px]"></div>
                    )}
                    
                    <div className="text-2xl font-mono font-bold mb-6">{product.price}</div>

                    <div className="flex gap-2 mt-auto">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          viewProduct(product);
                        }}
                        className="flex-1 py-3 border-2 border-black font-mono text-xs hover:bg-black hover:text-white transition-all"
                      >
                        View Details
                      </button>
                      {product.inStock ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product, product.sizes ? product.sizes[0] : null);
                          }}
                          className="flex-1 py-3 bg-black text-white font-mono text-xs hover:bg-gray-800 transition-all"
                        >
                          Add to Cart
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNotifyClick(product);
                          }}
                          className="flex-1 py-3 bg-gray-800 text-white font-mono text-xs hover:bg-gray-700 transition-all"
                        >
                          Notify Me
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-xl text-gray-500">No products found in this category</p>
              </div>
            )}

          </div>
        </section>

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
                <li><button onClick={() => goToCategory('bundles')} className="text-gray-300 hover:text-white transition-colors">Bundles</button></li>
                <li><button onClick={() => navigateTo('membership')} className="text-gray-300 hover:text-white transition-colors">Research Club</button></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <div className="text-xs font-mono tracking-wider text-gray-400 uppercase mb-4">Resources</div>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => navigateTo('coa')} className="text-gray-300 hover:text-white transition-colors">Certificates of Analysis</button></li>
                <li><button onClick={() => navigateTo('testing')} className="text-gray-300 hover:text-white transition-colors">Testing Methodology</button></li>
                <li><button onClick={() => navigateTo('faq')} className="text-gray-300 hover:text-white transition-colors">FAQ</button></li>
                <li><button onClick={() => goToCategory(null)} className="text-gray-300 hover:text-white transition-colors">All Products</button></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <div className="text-xs font-mono tracking-wider text-gray-400 uppercase mb-4">Company</div>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => navigateTo('ourstory')} className="text-gray-300 hover:text-white transition-colors">About Us</button></li>
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
                © 2025 truechem. All rights reserved.
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

      {/* Stock Notification Modal */}
      {showNotifyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowNotifyModal(false)}>
          <div className="bg-white max-w-md w-full p-8 relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowNotifyModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {!notifySubmitted ? (
              <>
                <h3 className="text-2xl font-bold mb-4">Get Notified When Back in Stock</h3>
                <p className="text-gray-600 mb-6">
                  <strong>{notifyProduct?.name}</strong> is currently out of stock. Enter your email and we'll notify you as soon as it's available.
                </p>
                
                <div className="mb-6">
                  <label className="block text-sm font-mono mb-2">Email Address</label>
                  <input
                    type="email"
                    value={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-gray-300 font-mono text-sm focus:outline-none focus:border-black"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') submitNotification();
                    }}
                  />
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowNotifyModal(false)}
                    className="flex-1 py-3 border border-gray-300 font-mono text-sm hover:border-black transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitNotification}
                    disabled={!notifyEmail || !notifyEmail.includes('@')}
                    className="flex-1 py-3 bg-black text-white font-mono text-sm hover:bg-gray-800 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Notify Me
                  </button>
                </div>
                
                <p className="text-xs text-gray-500 mt-4 font-mono">
                  We'll send you one email when this product is back in stock. No spam.
                </p>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-black text-white flex items-center justify-center mx-auto mb-4 rounded-full">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">You're on the list!</h3>
                <p className="text-gray-600">
                  We'll email you at <strong>{notifyEmail}</strong> when {notifyProduct?.name} is back in stock.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      </div>
    );
  }


  // ========================================
  // CHECKOUT PAGE
  // ========================================
  if (currentPage === 'checkout') {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 0;
    const total = subtotal + shipping;

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button onClick={() => navigateTo('home')} className="flex items-center space-x-3">
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
              <button 
                onClick={() => navigateTo('cart')}
                className="text-sm font-mono text-gray-600 hover:text-black"
              >
                ← Back to Cart
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-mono font-bold mb-8">Checkout</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-white border p-6 mb-6">
                <h2 className="text-xl font-mono font-bold mb-4">Order Summary</h2>
                <div className="space-y-3">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start border-b pb-3">
                      <div className="flex-1">
                        <div className="font-mono text-sm font-bold">{item.name}</div>
                        <div className="font-mono text-xs text-gray-500">{item.size} × {item.quantity}</div>
                      </div>
                      <div className="font-mono text-sm">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border p-6">
                <h2 className="text-xl font-mono font-bold mb-4">Checkout Options</h2>
                <p className="text-gray-600 font-mono text-sm mb-6">
                  For checkout, please contact us directly or use one of these payment methods:
                </p>
                <div className="space-y-3">
                  <button className="w-full py-4 bg-black text-white font-mono hover:bg-gray-800 flex items-center justify-center gap-2">
                    <svg width="42" height="18" viewBox="0 0 42 18" fill="none">
                      <path d="M7.4 0.9c-0.4 0.5-1 0.8-1.7 0.8-0.1 0-0.1-0.1-0.1-0.1 0-0.5 0.2-1 0.5-1.4 0.4-0.5 1-0.9 1.6-0.9 0.1 0 0.1 0.1 0.1 0.1 0 0.5-0.2 0.9-0.4 1.5zM7.5 2c-0.9 0-1.6 0.5-2 0.5-0.5 0-1.2-0.5-2-0.5-1 0-2 0.6-2.5 1.5-1.1 1.8-0.3 4.5 0.8 6 0.5 0.7 1.1 1.5 2 1.5 0.8 0 1.1-0.5 2-0.5 0.9 0 1.1 0.5 2 0.5 0.8 0 1.4-0.8 1.9-1.5 0.6-0.8 0.8-1.6 0.8-1.6 0 0-1.6-0.6-1.6-2.4 0-1.5 1.2-2.2 1.3-2.3-0.7-1-1.8-1.2-2.2-1.2z" fill="currentColor"/>
                    </svg>
                    Pay with Apple Pay
                  </button>
                  <button 
                    onClick={() => navigateTo('contact')}
                    className="w-full py-4 border-2 border-black font-mono hover:bg-black hover:text-white transition-all"
                  >
                    Contact for Payment Options
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Total */}
            <div className="lg:col-span-1">
              <div className="bg-white border p-6 sticky top-24">
                <h2 className="text-xl font-mono font-bold mb-4">Total</h2>
                <div className="space-y-3 mb-6 pb-6 border-b">
                  <div className="flex justify-between text-sm">
                    <span className="font-mono">Subtotal</span>
                    <span className="font-mono">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-mono">Shipping</span>
                    <span className="font-mono text-green-600">FREE</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-mono text-sm uppercase">Total</span>
                  <span className="text-3xl font-mono font-bold">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ========================================
  // ACCOUNT PAGE
  // ========================================
  if (currentPage === 'account') {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
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
        </header>

        {/* Main Content */}
        <div className="pt-32 pb-20 px-6">
          <div className="max-w-md mx-auto">
            
            {/* Sign Up / Login Form */}
            <div className="text-center mb-12">
              <div className="inline-block px-3 py-1 bg-black text-white text-[10px] font-mono tracking-[0.2em] uppercase mb-6">
                Research Club
              </div>
              <h1 className="text-4xl font-bold mb-4">Create Your Account</h1>
              <p className="text-gray-600">
                Join truechem to access premium research compounds, get notified when products are back in stock, and manage your orders.
              </p>
            </div>

            {/* Clerk Sign-Up Component Will Go Here */}
            <div className="bg-gray-50 border-2 border-gray-200 p-8 mb-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-full mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold mb-2">Clerk Authentication</h2>
                <p className="text-sm text-gray-600 mb-6">
                  Secure sign-up and login powered by Clerk
                </p>
              </div>

              {/* Placeholder - Replace with Clerk Component */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-mono font-bold mb-2">Email</label>
                  <input 
                    type="email" 
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-mono font-bold mb-2">Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none font-mono text-sm"
                  />
                </div>
                <button 
                  onClick={() => alert('Integrate Clerk authentication here')}
                  className="w-full py-3 bg-black text-white font-mono text-sm hover:bg-gray-800 transition-all"
                >
                  Create Account
                </button>
                <div className="text-center">
                  <button 
                    onClick={() => alert('Integrate Clerk login here')}
                    className="text-sm text-gray-600 hover:text-black font-mono"
                  >
                    Already have an account? <span className="underline">Log in</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Email List Sign-Up (Omnisend) */}
            <div className="bg-black text-white p-8 mb-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-400 text-black rounded-full mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold mb-2">Stay Updated</h2>
                <p className="text-sm text-gray-400">
                  Get notified about new products, restock alerts, and exclusive member offers
                </p>
              </div>

              {/* Omnisend Integration Placeholder */}
              <div className="space-y-4">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-white text-black border-2 border-gray-800 focus:border-teal-400 focus:outline-none font-mono text-sm"
                />
                <button 
                  onClick={() => alert('Integrate Omnisend email list here')}
                  className="w-full py-3 bg-teal-400 text-black font-mono text-sm font-bold hover:bg-teal-300 transition-all"
                >
                  Subscribe to Updates
                </button>
                <p className="text-xs text-gray-500 text-center">
                  We'll never spam you. Unsubscribe anytime.
                </p>
              </div>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-gray-200 p-4">
                <div className="w-8 h-8 bg-black text-white flex items-center justify-center mb-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold mb-1">Restock Alerts</h3>
                <p className="text-xs text-gray-600">Get notified when products are back</p>
              </div>
              
              <div className="border border-gray-200 p-4">
                <div className="w-8 h-8 bg-black text-white flex items-center justify-center mb-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold mb-1">Early Access</h3>
                <p className="text-xs text-gray-600">Be first to access new compounds</p>
              </div>
              
              <div className="border border-gray-200 p-4">
                <div className="w-8 h-8 bg-black text-white flex items-center justify-center mb-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold mb-1">Order Tracking</h3>
                <p className="text-xs text-gray-600">Track all your orders in one place</p>
              </div>
              
              <div className="border border-gray-200 p-4">
                <div className="w-8 h-8 bg-black text-white flex items-center justify-center mb-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold mb-1">COA Library</h3>
                <p className="text-xs text-gray-600">Access all certificates of analysis</p>
              </div>
            </div>

            {/* Back to Home */}
            <div className="text-center mt-8">
              <button 
                onClick={() => navigateTo('home')}
                className="text-sm text-gray-600 hover:text-black font-mono"
              >
                ← Back to Home
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="py-16 px-6 lg:px-12 bg-black text-white">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-white flex items-center justify-center"><VialIcon inverted={true} size={38} /></div>
                <div>
                  <div className="text-2xl font-mono lowercase" style={{ letterSpacing: '0.08em' }}>
                    <span className="font-bold">true</span>
                    <span className="font-normal">chem</span>
                  </div>
                  <div className="text-[9px] font-mono tracking-[0.15em] text-gray-400 uppercase">99%+ Certified</div>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Ultra-pure research compounds for scientific research
              </p>
              <div className="text-xs text-gray-500 font-mono">
                © 2025 truechem. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

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

        {/* Research Club CTA - Premium & Exclusive */}
        <section className="relative py-32 px-6 lg:px-12 bg-black overflow-hidden">
          {/* Teal accent dots */}
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute top-20 left-[10%] w-2 h-2 bg-teal-400 rounded-full"></div>
            <div className="absolute top-40 right-[15%] w-1.5 h-1.5 bg-teal-400 rounded-full"></div>
            <div className="absolute bottom-32 left-[20%] w-1 h-1 bg-teal-400 rounded-full"></div>
            <div className="absolute bottom-20 right-[25%] w-2 h-2 bg-teal-400 rounded-full"></div>
          </div>

          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-400/5 via-transparent to-transparent pointer-events-none"></div>

          <div className="max-w-[900px] mx-auto relative z-10">
            {/* Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-teal-400/30 bg-teal-400/5">
                <div className="w-1.5 h-1.5 bg-teal-400 rounded-full"></div>
                <span className="text-[10px] font-mono tracking-[0.2em] text-teal-400 uppercase">Exclusive Membership</span>
                <div className="w-1.5 h-1.5 bg-teal-400 rounded-full"></div>
              </div>
            </div>

            {/* Headline */}
            <h2 className="text-4xl lg:text-5xl font-bold text-white text-center mb-4 leading-tight">
              Unlock Full Research Access
            </h2>

            {/* Subheading */}
            <p className="text-lg text-gray-400 text-center mb-12 max-w-[650px] mx-auto">
              Get 10% off all products, free shipping, and early access to new compounds.
            </p>

            {/* Benefits Grid */}
            <div className="grid sm:grid-cols-3 gap-6 mb-10">
              <div className="text-center">
                <div className="text-3xl font-mono font-bold text-teal-400 mb-2">10%</div>
                <div className="text-sm text-gray-400">Member Savings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-mono font-bold text-teal-400 mb-2">Free</div>
                <div className="text-sm text-gray-400">Priority Shipping</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-mono font-bold text-teal-400 mb-2">24h</div>
                <div className="text-sm text-gray-400">Early Access</div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <button
                onClick={() => navigateTo('membership')}
                className="inline-flex items-center gap-3 px-8 py-4 bg-teal-400 text-black font-mono text-sm font-bold hover:bg-teal-300 transition-all"
              >
                View Membership Options
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <p className="text-xs text-gray-600 mt-4 font-mono">Starting at $199/year · Cancel anytime</p>
            </div>
          </div>
        </section>

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
                <li><button onClick={() => goToCategory('bundles')} className="text-gray-300 hover:text-white transition-colors">Bundles</button></li>
                <li><button onClick={() => navigateTo('membership')} className="text-gray-300 hover:text-white transition-colors">Research Club</button></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <div className="text-xs font-mono tracking-wider text-gray-400 uppercase mb-4">Resources</div>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => navigateTo('coa')} className="text-gray-300 hover:text-white transition-colors">Certificates of Analysis</button></li>
                <li><button onClick={() => navigateTo('testing')} className="text-gray-300 hover:text-white transition-colors">Testing Methodology</button></li>
                <li><button onClick={() => navigateTo('faq')} className="text-gray-300 hover:text-white transition-colors">FAQ</button></li>
                <li><button onClick={() => goToCategory(null)} className="text-gray-300 hover:text-white transition-colors">All Products</button></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <div className="text-xs font-mono tracking-wider text-gray-400 uppercase mb-4">Company</div>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => navigateTo('ourstory')} className="text-gray-300 hover:text-white transition-colors">About Us</button></li>
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
                © 2025 truechem. All rights reserved.
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

  // FAQ PAGE
  if (currentPage === 'faq') {
    const faqCategories = [
      {
        category: "Products & Quality",
        questions: [
          {
            q: "What purity level do your products have?",
            a: "All truechem products are >99% pure, verified through third-party testing. Each batch includes a Certificate of Analysis (COA) showing exact purity levels from independent laboratories."
          },
          {
            q: "Are your products tested by third parties?",
            a: "Yes. Every single batch is tested by independent, accredited laboratories including Eurofins, SGS, and Charles River Laboratories. We provide full COAs with HPLC, mass spectrometry, and contamination testing results."
          },
          {
            q: "Where are your products manufactured?",
            a: "All truechem products are manufactured in ISO 9001:2015 certified facilities in the United States. We maintain strict pharmaceutical-grade quality control throughout the entire production process."
          },
          {
            q: "What makes truechem different from competitors?",
            a: "We're actually made in the USA (not relabeled Chinese imports), third-party tested every batch (not just claiming it), and transparent with real COAs. Most competitors can't honestly claim all three."
          },
          {
            q: "Do you provide Certificates of Analysis?",
            a: "Yes. Every product ships with a batch-specific COA showing HPLC purity analysis, mass spectrometry results, and contamination testing. You can also access COAs on our website before purchasing."
          }
        ]
      },
      {
        category: "Ordering & Shipping",
        questions: [
          {
            q: "How long does shipping take?",
            a: "Orders ship within 1-2 business days. Domestic shipping typically takes 2-5 business days depending on your location. We use discreet, temperature-controlled packaging."
          },
          {
            q: "Do you ship internationally?",
            a: "Currently we only ship within the United States. International shipping requires compliance with various regulations we're not yet equipped to handle."
          },
          {
            q: "What payment methods do you accept?",
            a: "We accept major credit cards, debit cards, and cryptocurrency. All transactions are processed through secure, encrypted payment gateways."
          },
          {
            q: "Is my purchase discreet?",
            a: "Yes. All orders ship in plain packaging with no external branding. The return address and shipping label contain no reference to peptides or research chemicals."
          },
          {
            q: "Can I cancel or modify my order?",
            a: "Orders can be modified or cancelled within 2 hours of placement. Contact us immediately at support@truechem.io if you need to make changes."
          }
        ]
      },
      {
        category: "Storage & Handling",
        questions: [
          {
            q: "How should I store my products?",
            a: "Lyophilized (powder) products should be stored at 2-8°C (refrigerated) and are stable for up to 2 years. Once reconstituted, refrigerate and use within 30 days. Never freeze reconstituted peptides."
          },
          {
            q: "What if my product arrives warm?",
            a: "Lyophilized peptides are remarkably stable at room temperature for several days. If your package arrived warm but wasn't sitting in extreme heat for extended periods, your product is fine. Refrigerate immediately upon receipt."
          },
          {
            q: "What's the shelf life of your products?",
            a: "Unopened lyophilized peptides stored properly (2-8°C) remain stable for 24+ months. Once reconstituted, use within 30 days when refrigerated. We include manufacture and expiration dates on every vial."
          }
        ]
      },
      {
        category: "Legal & Compliance",
        questions: [
          {
            q: "Are research peptides legal?",
            a: "Research peptides are legal to purchase and possess for laboratory research purposes. They are NOT approved for human consumption and should only be used in research settings by qualified individuals."
          },
          {
            q: "Do I need a license to purchase?",
            a: "No license is required for research peptide purchases. However, you must be 21+ years old and agree that products are for research purposes only, not for human consumption."
          },
          {
            q: "Can I use these products for personal use?",
            a: "No. Our products are sold strictly for laboratory research purposes only. They are not intended for human consumption, therapeutic use, or any non-research applications. This is stated clearly in our Terms of Service."
          },
          {
            q: "Do your products come with usage instructions?",
            a: "We provide storage, handling, and reconstitution guidelines for laboratory use. We do NOT provide dosing protocols, administration methods, or any information related to human use as this violates federal regulations."
          }
        ]
      },
      {
        category: "Returns & Support",
        questions: [
          {
            q: "What's your return policy?",
            a: "We do not accept returns due to the nature of research chemicals. However, if you receive a damaged, incorrect, or defective product due to our error, contact us immediately and we'll send a replacement at no cost. We stand behind the quality of every product we ship."
          },
          {
            q: "What if I'm not satisfied with my purchase?",
            a: "We stand behind our products 100%. If you're not satisfied with the quality or purity of your purchase, contact us with your concerns and COA results. We'll make it right."
          },
          {
            q: "How do I contact customer support?",
            a: "Email us at support@truechem.io. We respond to all inquiries within 24 hours, typically much faster. For order-specific questions, please include your order number."
          },
          {
            q: "Do you offer wholesale or bulk pricing?",
            a: "Yes. For research institutions, universities, or businesses requiring larger quantities, contact us at wholesale@truechem.io for custom pricing and terms."
          }
        ]
      }
    ];

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
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 bg-black text-white text-[10px] font-mono tracking-[0.2em] uppercase mb-6">
                Frequently Asked Questions
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-black mb-4">Common Questions</h1>
              <p className="text-lg text-gray-600">
                Everything you need to know about truechem products, quality, and ordering.
              </p>
            </div>

            {faqCategories.map((category, catIndex) => (
              <div key={catIndex} className="mb-12">
                <h2 className="text-xl font-bold text-black mb-6 font-mono tracking-wide">{category.category}</h2>
                <div className="space-y-3">
                  {category.questions.map((faq, faqIndex) => {
                    const faqId = `${catIndex}-${faqIndex}`;
                    const isOpen = openFAQ === faqId;
                    
                    return (
                      <div key={faqIndex} className="faq-card bg-white overflow-hidden rounded-sm">
                        <button
                          onClick={() => setOpenFAQ(isOpen ? null : faqId)}
                          className="faq-button w-full px-6 py-5 text-left flex items-start justify-between"
                        >
                          <span className="faq-question font-medium text-gray-800 pr-8">{faq.q}</span>
                          <span className={`faq-icon text-gray-400 text-xl flex-shrink-0 mt-[-2px] ${isOpen ? 'open' : ''}`}>
                            {isOpen ? '−' : '+'}
                          </span>
                        </button>
                        {isOpen && (
                          <div className="faq-answer-enter px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100">
                            <p className="pt-4">{faq.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Still Have Questions */}
            <div className="mt-16 bg-black text-white p-8 text-center">
              <h3 className="text-2xl font-bold mb-3">Still Have Questions?</h3>
              <p className="text-gray-400 mb-6">
                Can't find what you're looking for? Our team is here to help.
              </p>
              <button 
                onClick={() => navigateTo('contact')}
                className="inline-block px-8 py-3 bg-white text-black font-mono text-sm hover:bg-teal-400 hover:text-black transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-teal-400/50"
              >
                Contact Support
              </button>
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
              <button 
                onClick={() => navigateTo('products')}
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

              {/* Account Buttons */}
              {isLoggedIn ? (
                <button 
                  onClick={() => navigateTo('account')}
                  className="hidden md:flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-all group"
                >
                  <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-full font-mono text-sm group-hover:bg-gray-800 transition-all">
                    {mockUser.firstName[0]}
                  </div>
                  <span className="text-sm font-medium">Account</span>
                </button>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <button 
                    onClick={() => navigateTo('account')}
                    className="px-4 py-2 text-sm font-mono hover:bg-gray-100 rounded-lg transition-all"
                  >
                    Log In
                  </button>
                  <button 
                    onClick={() => navigateTo('account')}
                    className="px-4 py-2 bg-black text-white text-sm font-mono hover:bg-gray-800 rounded-lg transition-all"
                  >
                    Sign Up
                  </button>
                </div>
              )}
              
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
            <button 
              onClick={() => navigateTo('products')}
              className="px-8 py-4 bg-black text-white font-mono text-sm hover:bg-gray-800 transition-all shadow-[0_0_0_1px_rgba(0,0,0,0.1)]"
            >
              View Products
            </button>
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
            <button 
              onClick={() => navigateTo('products')}
              className="px-6 py-3 bg-white text-black font-mono text-sm hover:bg-gray-100 transition-all"
            >
              Explore Compounds
            </button>
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
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
            <p className="text-gray-600">Our most popular research compounds</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.filter(p => ["Retatrutide", "BPC-157", "GHK-Cu", "CJC-1295 / Ipamorelin"].includes(p.name)).map((product) => (
              <div 
                key={product.id}
                onClick={() => viewProduct(product)}
                className="bg-white border-2 border-gray-200 hover:border-black cursor-pointer p-6 transition-all duration-200 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl flex flex-col group"
              >
                <div className="text-xs font-mono text-gray-400 mb-3">{product.id}</div>
                
                <div className="flex flex-wrap gap-2 mb-4 min-h-[28px]">
                  {product.badge && (
                    <div className="inline-block px-2 py-1 bg-black text-white text-[9px] font-mono uppercase">
                      {product.badge}
                    </div>
                  )}
                  {!product.inStock && (
                    <div className="inline-block px-2 py-1 bg-red-600 text-white text-[9px] font-mono uppercase">
                      OUT OF STOCK
                    </div>
                  )}
                </div>
                
                <h3 className="text-2xl font-bold mb-3">{product.name}</h3>
                <div className="font-mono text-sm text-gray-500 mb-4">{product.molecular}</div>
                
                {product.purity ? (
                  <div className="mb-4 min-h-[32px] flex items-start">
                    <span className="inline-block px-3 py-1 bg-black text-white text-xs font-mono font-bold">
                      {product.purity}
                    </span>
                  </div>
                ) : (
                  <div className="mb-4 min-h-[32px]"></div>
                )}
                
                <div className="text-2xl font-mono font-bold mb-6">{product.price}</div>
                
                <div className="mt-auto">
                  {product.inStock ? (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, product.sizes ? product.sizes[0] : null);
                      }}
                      className="w-full py-3 bg-black text-white font-mono text-sm hover:bg-gray-800 mb-2 transition-all"
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNotifyClick(product);
                      }}
                      className="w-full py-3 bg-gray-800 text-white font-mono text-sm hover:bg-gray-700 mb-2 transition-all"
                    >
                      Notify When Available
                    </button>
                  )}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      viewProduct(product);
                    }}
                    className="w-full py-3 border-2 border-black font-mono text-sm hover:bg-black hover:text-white transition-all"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Explore All Products Button */}
          <div className="mt-12 text-center">
            <button
              onClick={() => navigateTo('products')}
              className="px-12 py-4 bg-black text-white font-mono text-sm hover:bg-gray-800 transition-all"
            >
              Explore All Products →
            </button>
          </div>
        </div>
      </section>

      {/* Membership CTA Section - Clean & Exclusive */}
      <section className="relative py-20 px-6 bg-black overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-400/10 to-transparent pointer-events-none"></div>
        
        {/* Content */}
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          
          {/* Badge */}
          <div className="inline-block px-4 py-2 border border-teal-400/30 bg-teal-400/5 mb-6">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-teal-400">Exclusive Membership</span>
          </div>
          
          {/* Headline */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Join Research Club
          </h2>
          
          {/* Benefits List */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8 text-sm md:text-base">
            <div className="flex items-center gap-2 text-gray-300">
              <div className="w-1.5 h-1.5 bg-teal-400 rounded-full"></div>
              <span><strong className="text-white">10% off</strong> all products</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <div className="w-1.5 h-1.5 bg-teal-400 rounded-full"></div>
              <span><strong className="text-white">Free shipping</strong> on all orders</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <div className="w-1.5 h-1.5 bg-teal-400 rounded-full"></div>
              <span><strong className="text-white">Early access</strong> to new compounds</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <div className="w-1.5 h-1.5 bg-teal-400 rounded-full"></div>
              <span>Priority support</span>
            </div>
          </div>
          
          {/* CTA */}
          <button 
            onClick={() => navigateTo('membership')}
            className="group px-10 py-4 bg-teal-400 text-black font-mono text-sm font-bold uppercase tracking-wider hover:bg-teal-300 transition-all inline-flex items-center gap-3 shadow-[0_0_30px_rgba(45,212,191,0.3)] hover:shadow-[0_0_40px_rgba(45,212,191,0.5)]"
          >
            View Membership Options
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <p className="mt-6 text-xs font-mono text-gray-600 uppercase tracking-wider">
            Join 1,000+ researchers • Cancel anytime
          </p>
          
        </div>
      </section>

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
                <li><button onClick={() => goToCategory('bundles')} className="text-gray-300 hover:text-white transition-colors">Bundles</button></li>
                <li><button onClick={() => navigateTo('membership')} className="text-gray-300 hover:text-white transition-colors">Research Club</button></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <div className="text-xs font-mono tracking-wider text-gray-400 uppercase mb-4">Resources</div>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => navigateTo('coa')} className="text-gray-300 hover:text-white transition-colors">Certificates of Analysis</button></li>
                <li><button onClick={() => navigateTo('testing')} className="text-gray-300 hover:text-white transition-colors">Testing Methodology</button></li>
                <li><button onClick={() => navigateTo('faq')} className="text-gray-300 hover:text-white transition-colors">FAQ</button></li>
                <li><button onClick={() => goToCategory(null)} className="text-gray-300 hover:text-white transition-colors">All Products</button></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <div className="text-xs font-mono tracking-wider text-gray-400 uppercase mb-4">Company</div>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => navigateTo('ourstory')} className="text-gray-300 hover:text-white transition-colors">About Us</button></li>
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
                © 2025 truechem. All rights reserved.
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

      {/* Stock Notification Modal */}
      {showNotifyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowNotifyModal(false)}>
          <div className="bg-white max-w-md w-full p-8 relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowNotifyModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {!notifySubmitted ? (
              <>
                <h3 className="text-2xl font-bold mb-4">Get Notified When Back in Stock</h3>
                <p className="text-gray-600 mb-6">
                  <strong>{notifyProduct?.name}</strong> is currently out of stock. Enter your email and we'll notify you as soon as it's available.
                </p>
                
                <div className="mb-6">
                  <label className="block text-sm font-mono mb-2">Email Address</label>
                  <input
                    type="email"
                    value={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-gray-300 font-mono text-sm focus:outline-none focus:border-black"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') submitNotification();
                    }}
                  />
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowNotifyModal(false)}
                    className="flex-1 py-3 border border-gray-300 font-mono text-sm hover:border-black transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitNotification}
                    disabled={!notifyEmail || !notifyEmail.includes('@')}
                    className="flex-1 py-3 bg-black text-white font-mono text-sm hover:bg-gray-800 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Notify Me
                  </button>
                </div>
                
                <p className="text-xs text-gray-500 mt-4 font-mono">
                  We'll send you one email when this product is back in stock. No spam.
                </p>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-black text-white flex items-center justify-center mx-auto mb-4 rounded-full">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">You're on the list!</h3>
                <p className="text-gray-600">
                  We'll email you at <strong>{notifyEmail}</strong> when {notifyProduct?.name} is back in stock.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
