import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Truck, ShieldCheck, Upload, Minus, Plus, Check, ImageIcon, X, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import api from '../utils/api';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [productPrices, setProductPrices] = useState([]);
    const [loading, setLoading] = useState(true);

    // Determine if this is a Fridge Magnet (ID 1) or Magnetic Frame (ID 2)
    const isFridgeMagnet = id === '1';

    // UI States - set defaults based on product type
    const [selectedShape, setSelectedShape] = useState('circle');
    const [selectedSize, setSelectedSize] = useState(isFridgeMagnet ? '2x3' : 'mini');
    const [selectedColor, setSelectedColor] = useState('natural');
    const [quantity, setQuantity] = useState(1);
    const [imageFile, setImageFile] = useState(null);
    const [imageData, setImageData] = useState('');
    const [addedToCart, setAddedToCart] = useState(false);

    // Modal state
    const [showPreview, setShowPreview] = useState(false);

    // Calculate current price based on selection
    const getCurrentPrice = () => {
        if (productPrices.length === 0) {
            return parseFloat(product?.price) || 0;
        }

        if (isFridgeMagnet) {
            // For circle shape, size is always 23mm
            const sizeToMatch = selectedShape === 'circle' ? '23mm' : selectedSize;
            const priceEntry = productPrices.find(p => p.shape === selectedShape && p.size === sizeToMatch);
            return parseFloat(priceEntry?.price) || parseFloat(product?.price) || 0;
        } else {
            // Magnetic frames - no shape, just size (mini or wall)
            const priceEntry = productPrices.find(p => p.size === selectedSize);
            return parseFloat(priceEntry?.price) || parseFloat(product?.price) || 0;
        }
    };

    // Reset size when shape changes for Fridge Magnets
    useEffect(() => {
        if (isFridgeMagnet && selectedShape === 'rectangle') {
            setSelectedSize('2x3');
        }
    }, [selectedShape, isFridgeMagnet]);

    // Set correct default size when product loads
    useEffect(() => {
        if (!isFridgeMagnet) {
            setSelectedSize('mini');
        }
    }, [id, isFridgeMagnet]);

    useEffect(() => {
        window.scrollTo(0, 0);

        // Fetch product details
        fetch(api.getProductDetail(id))
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });

        // Fetch product prices
        fetch(api.getProductPrices(id))
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setProductPrices(data);
                }
            })
            .catch(err => console.error('Error fetching prices:', err));
    }, [id]);

    // Close modal on Escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setShowPreview(false);
            }
        };
        if (showPreview) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [showPreview]);

    const handleQuantityChange = (delta) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    const handleImageUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);

            // Convert to base64 for storage
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageData(reader.result);
                // Show preview when image is uploaded
                setShowPreview(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const getDisplaySize = () => {
        if (isFridgeMagnet) {
            return selectedShape === 'circle' ? '23mm' : selectedSize;
        }
        return selectedSize;
    };

    const handleAddToCart = () => {
        if (!product) return;

        // Require image upload
        if (!imageData) {
            alert('Please upload your image before adding to cart.');
            return;
        }

        const currentPrice = getCurrentPrice();

        addToCart({
            productId: parseInt(id),
            name: product.name,
            price: currentPrice,
            image: product.image_url,
            shape: isFridgeMagnet ? selectedShape : null,
            size: getDisplaySize(),
            color: isFridgeMagnet ? null : selectedColor,
            quantity: quantity,
            imageData: imageData
        });

        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    const handleBuyNow = () => {
        if (!imageData) {
            alert('Please upload your image before purchasing.');
            return;
        }
        handleAddToCart();
        setTimeout(() => navigate('/checkout'), 300);
    };

    // Handle shape selection
    const handleShapeSelect = (shape) => {
        setSelectedShape(shape);
    };

    // Handle size selection
    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    // Handle color selection
    const handleColorSelect = (color) => {
        setSelectedColor(color);
    };

    // Get frame color based on selection
    const getFrameColor = () => {
        switch (selectedColor) {
            case 'natural': return '#D4C4A8';
            case 'black': return '#1A1A1A';
            case 'walnut': return '#5D4037';
            default: return '#D4C4A8';
        }
    };

    // Get frame dimensions based on size - scaled for modal
    const getFrameDimensions = () => {
        if (selectedSize === 'mini') {
            return { width: 160, height: 220, borderWidth: 12 };
        }
        return { width: 200, height: 280, borderWidth: 14 };
    };

    // Get magnet dimensions based on shape and size - scaled for modal
    const getMagnetDimensions = () => {
        if (selectedShape === 'circle') {
            return { width: 160, height: 160, isCircle: true };
        }
        if (selectedSize === '2x3') {
            return { width: 140, height: 210, isCircle: false };
        }
        return { width: 180, height: 240, isCircle: false };
    };

    // Fridge Magnet Preview Component
    const FridgeMagnetPreview = () => {
        const dimensions = getMagnetDimensions();
        const sizeLabel = selectedShape === 'circle' ? '23mm' : (selectedSize === '2x3' ? '2 × 3 inch' : '3 × 4 inch');

        return (
            <div className="flex flex-col items-center justify-center p-4">
                <div className="text-center mb-4">
                    <span className="text-xs font-semibold text-earth-400 tracking-[0.2em] uppercase">Preview</span>
                    <h3 className="text-lg font-serif text-earth-700 mt-1">Your Fridge Magnet</h3>
                </div>

                {/* Fridge Background */}
                <div
                    className="relative rounded-xl shadow-inner flex items-center justify-center"
                    style={{
                        width: Math.max(dimensions.width + 60, 240),
                        height: Math.max(dimensions.height + 60, 260),
                        background: 'linear-gradient(145deg, #e8e8e8, #d0d0d0)'
                    }}
                >
                    {/* Fridge texture lines */}
                    <div className="absolute inset-0 opacity-30">
                        <div className="absolute left-1/4 top-4 bottom-4 w-px bg-gray-400"></div>
                        <div className="absolute right-1/4 top-4 bottom-4 w-px bg-gray-400"></div>
                    </div>

                    {/* Magnet */}
                    <div
                        className="relative shadow-lg transition-all duration-300 overflow-hidden flex items-center justify-center"
                        style={{
                            width: dimensions.width,
                            height: dimensions.height,
                            borderRadius: dimensions.isCircle ? '50%' : '8px',
                            backgroundColor: imageData ? 'transparent' : '#f5f0e6',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.2), 0 2px 6px rgba(0,0,0,0.15)'
                        }}
                    >
                        {imageData ? (
                            <img
                                src={imageData}
                                alt="Your uploaded image"
                                className="w-full h-full object-contain"
                                style={{ borderRadius: dimensions.isCircle ? '50%' : '6px' }}
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center text-earth-400 p-4">
                                <ImageIcon size={dimensions.isCircle ? 40 : 48} strokeWidth={1.5} />
                                <span className="text-xs mt-2 text-center">Upload an image to preview</span>
                            </div>
                        )}

                        {/* Glossy overlay effect */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                borderRadius: dimensions.isCircle ? '50%' : '6px',
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(0,0,0,0.05) 100%)'
                            }}
                        />
                    </div>
                </div>

                {/* Size Label */}
                <div className="mt-6 px-4 py-2 bg-earth-100 rounded-full">
                    <span className="text-sm font-medium text-earth-700">
                        {selectedShape === 'circle' ? 'Circle' : 'Rectangle'} • {sizeLabel}
                    </span>
                </div>
            </div>
        );
    };

    // Magnetic Frame Preview Component
    const MagneticFramePreview = () => {
        const { width, height, borderWidth } = getFrameDimensions();
        const frameColor = getFrameColor();
        const sizeLabel = selectedSize === 'mini' ? 'Mini Frame (2 × 3 inch)' : 'Wall Frame (3 × 5 inch)';
        const colorLabel = selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1);

        return (
            <div className="flex flex-col items-center justify-center p-4">
                <div className="text-center mb-4">
                    <span className="text-xs font-semibold text-earth-400 tracking-[0.2em] uppercase">Preview</span>
                    <h3 className="text-lg font-serif text-earth-700 mt-1">Your Magnetic Frame</h3>
                </div>

                {/* Wall Background */}
                <div
                    className="relative rounded-xl flex items-center justify-center"
                    style={{
                        width: width + 60,
                        height: height + 50,
                        background: 'linear-gradient(180deg, #f8f4ef 0%, #ebe5db 100%)',
                        boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.05)'
                    }}
                >
                    {/* Wall texture pattern */}
                    <div
                        className="absolute inset-0 opacity-20 rounded-xl"
                        style={{
                            backgroundImage: 'radial-gradient(circle, #d4c4a8 1px, transparent 1px)',
                            backgroundSize: '20px 20px'
                        }}
                    />

                    {/* Frame */}
                    <div
                        className="relative transition-all duration-300"
                        style={{
                            padding: borderWidth,
                            backgroundColor: frameColor,
                            boxShadow: '0 8px 25px rgba(0,0,0,0.25), 0 4px 10px rgba(0,0,0,0.15)',
                            borderRadius: '4px'
                        }}
                    >
                        {/* Wood grain texture overlay */}
                        <div
                            className="absolute inset-0 pointer-events-none opacity-30 rounded"
                            style={{
                                background: `repeating-linear-gradient(
                                    90deg,
                                    transparent,
                                    transparent 2px,
                                    rgba(0,0,0,0.1) 2px,
                                    rgba(0,0,0,0.1) 4px
                                )`
                            }}
                        />

                        {/* Inner frame shadow */}
                        <div
                            className="absolute pointer-events-none"
                            style={{
                                top: borderWidth - 3,
                                left: borderWidth - 3,
                                right: borderWidth - 3,
                                bottom: borderWidth - 3,
                                boxShadow: 'inset 0 0 8px rgba(0,0,0,0.3)',
                                borderRadius: '2px'
                            }}
                        />

                        {/* Image area */}
                        <div
                            className="relative bg-white overflow-hidden flex items-center justify-center"
                            style={{
                                width: width - borderWidth * 2,
                                height: height - borderWidth * 2,
                                borderRadius: '2px'
                            }}
                        >
                            {imageData ? (
                                <img
                                    src={imageData}
                                    alt="Your uploaded image"
                                    className="w-full h-full object-contain bg-white"
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center text-earth-400 p-4 bg-earth-50 w-full h-full">
                                    <ImageIcon size={48} strokeWidth={1.5} />
                                    <span className="text-xs mt-2 text-center">Upload an image to preview</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Labels */}
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                    <div className="px-4 py-2 bg-earth-100 rounded-full">
                        <span className="text-sm font-medium text-earth-700">{sizeLabel}</span>
                    </div>
                    <div className="px-4 py-2 bg-earth-100 rounded-full flex items-center gap-2">
                        <div
                            className="w-4 h-4 rounded-full border border-earth-300"
                            style={{ backgroundColor: frameColor }}
                        />
                        <span className="text-sm font-medium text-earth-700">{colorLabel}</span>
                    </div>
                </div>
            </div>
        );
    };

    // Preview Modal Component
    const PreviewModal = () => {
        if (!showPreview) return null;

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                {/* Backdrop with blur */}
                <div
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={() => setShowPreview(false)}
                />

                {/* Modal Content */}
                <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 max-h-[90vh] overflow-auto animate-fade-in">
                    {/* Close Button */}
                    <button
                        onClick={() => setShowPreview(false)}
                        className="absolute top-4 right-4 z-10 p-2 bg-earth-100 hover:bg-earth-200 rounded-full transition-colors"
                        aria-label="Close preview"
                    >
                        <X size={20} className="text-earth-700" />
                    </button>

                    {/* Preview Content */}
                    <div className="p-4">
                        {isFridgeMagnet ? <FridgeMagnetPreview /> : <MagneticFramePreview />}
                    </div>

                    {/* Close Button at Bottom */}
                    <div className="p-6 pt-0 flex justify-center">
                        <button
                            onClick={() => setShowPreview(false)}
                            className="px-8 py-3 bg-earth-900 text-white rounded-full font-medium uppercase tracking-wide hover:bg-earth-800 transition-colors"
                        >
                            Close Preview
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    if (loading) return <div className="min-h-screen pt-32 text-center text-earth-600">Loading details...</div>;
    if (!product) return <div className="min-h-screen pt-32 text-center text-earth-600">Product not found.</div>;

    return (
        <div className="pt-24 min-h-screen bg-earth-50">
            {/* Preview Modal */}
            <PreviewModal />

            {/* Breadcrumb / Back */}
            <div className="container mx-auto px-6 py-6">
                <Link to="/catalog" className="inline-flex items-center gap-2 text-earth-500 hover:text-earth-900 transition-colors text-sm uppercase tracking-wide font-medium">
                    <ArrowLeft size={16} /> Back to Catalog
                </Link>
            </div>

            <div className="container mx-auto px-4 md:px-6 lg:px-12 pb-20">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">

                    {/* LEFT COLUMN: Product Image */}
                    <div className="w-full lg:w-[55%]">
                        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-earth-100 lg:sticky lg:top-28">
                            <div className="aspect-[4/3] lg:aspect-[4/5] bg-earth-50">
                                <img
                                    src={isFridgeMagnet ? '/images/fridge-magnets.png' : '/images/magnetic-frames.png'}
                                    alt={product.name}
                                    className="w-full h-full object-contain p-4"
                                />
                            </div>
                            {/* Preview Button Overlay - Only show when image is uploaded */}
                            {imageData && (
                                <div className="p-4 border-t border-earth-100">
                                    <button
                                        onClick={() => setShowPreview(true)}
                                        className="w-full py-3 bg-terracotta-50 text-terracotta-700 rounded-lg font-medium hover:bg-terracotta-100 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Eye size={20} />
                                        <span>Preview Your Design</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Details */}
                    <div className="w-full lg:w-[45%] space-y-6">
                        {/* Header */}
                        <div>
                            <span className="text-xs font-semibold text-earth-400 tracking-[0.2em] uppercase block mb-3">AVCrafts Handcrafted</span>
                            <h1 className="text-4xl lg:text-5xl font-serif font-medium text-earth-900 mb-4 leading-tight">{product.name}</h1>
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-2xl font-medium text-earth-900">₹{getCurrentPrice() * quantity}</span>
                                {quantity > 1 && <span className="text-sm text-earth-500">(₹{getCurrentPrice()} each)</span>}
                            </div>
                            <p className="text-xs text-earth-500">Shipping calculated at checkout.</p>
                        </div>

                        {/* FRIDGE MAGNET SPECIFIC: Shape Selection */}
                        {isFridgeMagnet && (
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-earth-900 uppercase tracking-wide">Shape</label>
                                <div className="flex gap-4">
                                    <button
                                        className={`flex-1 py-3 px-4 rounded-full border text-sm font-medium transition-all ${selectedShape === 'circle' ? 'bg-earth-900 text-white border-earth-900' : 'bg-transparent text-earth-700 border-earth-200 hover:border-earth-400'}`}
                                        onClick={() => handleShapeSelect('circle')}
                                    >
                                        Circle
                                    </button>
                                    <button
                                        className={`flex-1 py-3 px-4 rounded-full border text-sm font-medium transition-all ${selectedShape === 'rectangle' ? 'bg-earth-900 text-white border-earth-900' : 'bg-transparent text-earth-700 border-earth-200 hover:border-earth-400'}`}
                                        onClick={() => handleShapeSelect('rectangle')}
                                    >
                                        Rectangle
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* FRIDGE MAGNET: Size (conditional) */}
                        {isFridgeMagnet && (
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-earth-900 uppercase tracking-wide">Size</label>
                                {selectedShape === 'circle' ? (
                                    <div className="py-3 px-4 bg-earth-100 rounded-lg text-earth-700 text-sm font-medium">
                                        23 mm (Fixed for Circle)
                                    </div>
                                ) : (
                                    <div className="flex gap-4">
                                        <button
                                            className={`flex-1 py-3 px-4 rounded-full border text-sm font-medium transition-all ${selectedSize === '2x3' ? 'bg-earth-900 text-white border-earth-900' : 'bg-transparent text-earth-700 border-earth-200 hover:border-earth-400'}`}
                                            onClick={() => handleSizeSelect('2x3')}
                                        >
                                            2 × 3 inch
                                        </button>
                                        <button
                                            className={`flex-1 py-3 px-4 rounded-full border text-sm font-medium transition-all ${selectedSize === '3x4' ? 'bg-earth-900 text-white border-earth-900' : 'bg-transparent text-earth-700 border-earth-200 hover:border-earth-400'}`}
                                            onClick={() => handleSizeSelect('3x4')}
                                        >
                                            3 × 4 inch
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* MAGNETIC FRAMES: Size Selection (Mini/Wall) */}
                        {!isFridgeMagnet && (
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-earth-900 uppercase tracking-wide">Size</label>
                                <div className="flex gap-4">
                                    <button
                                        className={`flex-1 py-3 px-4 rounded-full border text-sm font-medium transition-all ${selectedSize === 'mini' ? 'bg-earth-900 text-white border-earth-900' : 'bg-transparent text-earth-700 border-earth-200 hover:border-earth-400'}`}
                                        onClick={() => handleSizeSelect('mini')}
                                    >
                                        Mini Frame
                                    </button>
                                    <button
                                        className={`flex-1 py-3 px-4 rounded-full border text-sm font-medium transition-all ${selectedSize === 'wall' ? 'bg-earth-900 text-white border-earth-900' : 'bg-transparent text-earth-700 border-earth-200 hover:border-earth-400'}`}
                                        onClick={() => handleSizeSelect('wall')}
                                    >
                                        Wall Frame
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* MAGNETIC FRAMES ONLY: Color Selection */}
                        {!isFridgeMagnet && (
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-earth-900 uppercase tracking-wide">Color</label>
                                <div className="flex gap-3">
                                    {['natural', 'black', 'walnut'].map(color => (
                                        <button
                                            key={color}
                                            className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor === color ? 'border-earth-900 scale-110' : 'border-transparent hover:scale-110'}`}
                                            onClick={() => handleColorSelect(color)}
                                            aria-label={`Select ${color}`}
                                        >
                                            <div className={`w-full h-full rounded-full border border-black/10`}
                                                style={{ backgroundColor: color === 'natural' ? '#E5DCC5' : color === 'walnut' ? '#5D4037' : '#1A1A1A' }}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-earth-900 uppercase tracking-wide">Quantity</label>
                            <div className="flex items-center w-32 border border-earth-200 rounded-md">
                                <button onClick={() => handleQuantityChange(-1)} className="p-3 text-earth-600 hover:bg-earth-50 rounded-l-md transition-colors"><Minus size={16} /></button>
                                <span className="flex-1 text-center font-medium text-earth-900">{quantity}</span>
                                <button onClick={() => handleQuantityChange(1)} className="p-3 text-earth-600 hover:bg-earth-50 rounded-r-md transition-colors"><Plus size={16} /></button>
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className="space-y-3 pt-2">
                            <label className="text-sm font-medium text-earth-900 uppercase tracking-wide">Upload an image</label>
                            <div className="relative">
                                <input
                                    type="file"
                                    id="image-upload"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                                <label
                                    htmlFor="image-upload"
                                    className="flex items-center justify-center gap-3 w-full py-4 border-2 border-dashed border-terracotta-400/50 bg-terracotta-50/50 rounded-lg text-terracotta-700 font-medium cursor-pointer hover:bg-terracotta-50 transition-colors"
                                >
                                    <Upload size={20} />
                                    {imageFile ? imageFile.name : 'Choose images'}
                                </label>
                            </div>
                            <p className="text-xs text-earth-400">Supported formats: JPG, PNG. Max size: 10MB.</p>
                            {!imageData && (
                                <p className="text-xs text-red-500 mt-1">* Image upload is required</p>
                            )}
                        </div>

                        {/* Preview Button - Only show when image is uploaded */}
                        {imageData && (
                            <button
                                onClick={() => setShowPreview(true)}
                                className="w-full py-3 bg-earth-100 text-earth-700 rounded-full font-medium uppercase tracking-wide hover:bg-earth-200 transition-colors flex items-center justify-center gap-2"
                            >
                                <Eye size={18} />
                                Preview Your Design
                            </button>
                        )}

                        {/* Actions */}
                        <div className="space-y-4 pt-2">
                            <button
                                onClick={handleAddToCart}
                                disabled={!imageData}
                                className={`w-full py-4 border rounded-full font-medium uppercase tracking-wide flex items-center justify-center gap-2 transition-colors ${imageData ? 'bg-transparent border-earth-900 text-earth-900 hover:bg-earth-50' : 'border-earth-300 text-earth-400 cursor-not-allowed'}`}
                            >
                                {addedToCart ? <><Check size={18} /> Added to Cart</> : 'Add to cart'}
                            </button>
                            <button
                                onClick={handleBuyNow}
                                disabled={!imageData}
                                className={`w-full py-4 rounded-full font-medium uppercase tracking-wide transition-all ${imageData ? 'bg-earth-900 text-white hover:bg-earth-800 shadow-md hover:shadow-lg' : 'bg-earth-300 text-earth-500 cursor-not-allowed'}`}
                            >
                                Buy it now
                            </button>
                        </div>

                        {/* Size Details Info */}
                        <div className="bg-white p-6 rounded-lg border border-earth-100 shadow-sm mt-6">
                            <h4 className="font-serif font-medium text-earth-900 mb-3">Product Dimensions</h4>
                            <div className="space-y-2 text-sm text-stone-600 leading-relaxed">
                                {isFridgeMagnet ? (
                                    <>
                                        <p><strong className="text-earth-800">Circle:</strong> 23 mm diameter - Perfect compact size.</p>
                                        <p><strong className="text-earth-800">Rectangle 2×3:</strong> 2 × 3 inches - Classic photo size.</p>
                                        <p><strong className="text-earth-800">Rectangle 3×4:</strong> 3 × 4 inches - Larger display.</p>
                                    </>
                                ) : (
                                    <>
                                        <p><strong className="text-earth-800">Mini Frame:</strong> Photo size 2 × 3 inches - Perfect for fridge or desk.</p>
                                        <p><strong className="text-earth-800">Wall Frame:</strong> Photo size 3 × 5 inches - Ideal for gallery walls.</p>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-3 gap-4 pt-6 text-center">
                            <div className="flex flex-col items-center gap-2">
                                <Clock size={20} className="text-earth-400" />
                                <span className="text-[10px] uppercase tracking-wider text-earth-500 font-medium">Made in 2 Days</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Truck size={20} className="text-earth-400" />
                                <span className="text-[10px] uppercase tracking-wider text-earth-500 font-medium">Fast Shipping</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <ShieldCheck size={20} className="text-earth-400" />
                                <span className="text-[10px] uppercase tracking-wider text-earth-500 font-medium">Quality Check</span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="pt-6 border-t border-earth-200">
                            <p className="text-stone-600 leading-relaxed">{product.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
