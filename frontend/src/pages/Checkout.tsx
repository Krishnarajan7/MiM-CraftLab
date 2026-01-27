import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ArrowLeft, 
  CreditCard, 
  Truck, 
  Shield, 
  Lock,
  CheckCircle2,
  Package,
  MapPin,
  Phone,
  Mail
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

// Mock cart data
const cartItems = [
  {
    id: "1",
    name: "Geometric Desk Organizer",
    price: 34.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop",
  },
  {
    id: "2",
    name: "Custom Name Night Light",
    price: 29.99,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
  },
];

const Checkout = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postcode: '',
    phone: '',
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 4.99;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('confirmation');
    }, 2000);
  };

  // Order Confirmation View
  if (step === 'confirmation') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="container-page py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 mx-auto rounded-full bg-green-500/10 flex items-center justify-center mb-8"
            >
              <CheckCircle2 className="h-12 w-12 text-green-500" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              Order Confirmed!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground text-lg mb-8"
            >
              Thank you for your order. We've sent a confirmation email to{" "}
              <span className="text-foreground font-medium">{formData.email || 'your email'}</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-card rounded-2xl border border-border/60 p-6 md:p-8 mb-8"
            >
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-border/60">
                <div>
                  <p className="text-sm text-muted-foreground">Order Number</p>
                  <p className="text-lg font-bold text-foreground">#ORD-{Date.now().toString().slice(-8)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                  <p className="text-lg font-bold text-foreground">3-5 Business Days</p>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-foreground">£{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-border/60 pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Paid</span>
                  <span className="text-primary">£{total.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>

            {/* Delivery Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid sm:grid-cols-2 gap-4 mb-8"
            >
              <div className="bg-card rounded-xl border border-border/60 p-5 text-left">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <p className="font-semibold text-foreground">Delivery Address</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {formData.firstName} {formData.lastName}<br />
                  {formData.address || '123 Example Street'}<br />
                  {formData.city || 'London'}, {formData.postcode || 'SW1A 1AA'}
                </p>
              </div>

              <div className="bg-card rounded-xl border border-border/60 p-5 text-left">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <p className="font-semibold text-foreground">Shipping Method</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Standard Delivery<br />
                  {shipping === 0 ? 'Free Shipping' : `£${shipping.toFixed(2)}`}<br />
                  3-5 Business Days
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/shop">Continue Shopping</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link to="/dashboard">View Order History</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container-page py-8 md:py-12">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-8">
            <Button asChild variant="ghost" size="sm" className="mb-4 -ml-2">
              <Link to="/cart">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Cart
              </Link>
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Secure <span className="font-brand text-primary">Checkout</span>
            </h1>
          </div>
        </ScrollReveal>

        {/* Progress Steps */}
        <ScrollReveal delay={0.1}>
          <div className="flex items-center justify-center gap-4 mb-10">
            {['Details', 'Payment'].map((label, index) => (
              <div key={label} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  (index === 0 && step === 'details') || (index === 1 && step === 'payment')
                    ? 'bg-primary text-primary-foreground'
                    : index === 0 && step === 'payment'
                    ? 'bg-green-500 text-white'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {index === 0 && step === 'payment' ? <CheckCircle2 className="h-4 w-4" /> : index + 1}
                </div>
                <span className={`text-sm font-medium ${
                  (index === 0 && step === 'details') || (index === 1 && step === 'payment')
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                }`}>
                  {label}
                </span>
                {index === 0 && (
                  <div className="w-16 h-0.5 bg-muted ml-2">
                    <div className={`h-full bg-primary transition-all ${step === 'payment' ? 'w-full' : 'w-0'}`} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {step === 'details' && (
                <motion.form
                  key="details"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleSubmitDetails}
                  className="space-y-6"
                >
                  {/* Contact Info */}
                  <div className="bg-card rounded-2xl border border-border/60 p-6 md:p-8">
                    <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                      <Mail className="h-5 w-5 text-primary" />
                      Contact Information
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="mt-1.5"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+44 7123 456789"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="mt-1.5"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="bg-card rounded-2xl border border-border/60 p-6 md:p-8">
                    <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                      <Truck className="h-5 w-5 text-primary" />
                      Shipping Address
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="mt-1.5"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="mt-1.5"
                          required
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input
                          id="address"
                          name="address"
                          placeholder="123 Main Street"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="mt-1.5"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          placeholder="London"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="mt-1.5"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="postcode">Postcode</Label>
                        <Input
                          id="postcode"
                          name="postcode"
                          placeholder="SW1A 1AA"
                          value={formData.postcode}
                          onChange={handleInputChange}
                          className="mt-1.5"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full rounded-full h-12">
                    Continue to Payment
                  </Button>
                </motion.form>
              )}

              {step === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  {/* Payment Method */}
                  <div className="bg-card rounded-2xl border border-border/60 p-6 md:p-8">
                    <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-primary" />
                      Payment Method
                    </h2>
                    
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                      <div className={`flex items-center space-x-3 p-4 rounded-xl border transition-colors cursor-pointer ${
                        paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-border/60 hover:border-primary/30'
                      }`}>
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex-1 cursor-pointer flex items-center gap-3">
                          <CreditCard className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Credit / Debit Card</p>
                            <p className="text-sm text-muted-foreground">Visa, Mastercard, Amex</p>
                          </div>
                        </Label>
                      </div>
                      <div className={`flex items-center space-x-3 p-4 rounded-xl border transition-colors cursor-pointer ${
                        paymentMethod === 'paypal' ? 'border-primary bg-primary/5' : 'border-border/60 hover:border-primary/30'
                      }`}>
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal" className="flex-1 cursor-pointer flex items-center gap-3">
                          <div className="w-5 h-5 bg-blue-600 rounded text-white text-xs font-bold flex items-center justify-center">P</div>
                          <div>
                            <p className="font-medium">PayPal</p>
                            <p className="text-sm text-muted-foreground">Fast and secure payment</p>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>

                    {paymentMethod === 'card' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-6 space-y-4"
                      >
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            className="mt-1.5"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input
                              id="expiry"
                              placeholder="MM/YY"
                              className="mt-1.5"
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              className="mt-1.5"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input
                            id="cardName"
                            placeholder="John Doe"
                            className="mt-1.5"
                          />
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Billing Same as Shipping */}
                  <div className="flex items-center space-x-3 p-4 bg-card rounded-xl border border-border/60">
                    <Checkbox id="sameBilling" defaultChecked />
                    <Label htmlFor="sameBilling" className="cursor-pointer text-sm">
                      Billing address is the same as shipping address
                    </Label>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => setStep('details')}
                      className="rounded-full"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button
                      size="lg"
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className="flex-1 rounded-full h-12 relative overflow-hidden"
                    >
                      <AnimatePresence mode="wait">
                        {isProcessing ? (
                          <motion.span
                            key="processing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2"
                          >
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                            />
                            Processing...
                          </motion.span>
                        ) : (
                          <motion.span
                            key="place"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2"
                          >
                            <Lock className="h-4 w-4" />
                            Place Order - £{total.toFixed(2)}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <ScrollReveal delay={0.2}>
              <div className="sticky top-24 bg-card rounded-2xl border border-border/60 p-6 md:p-8">
                <h2 className="text-lg font-semibold text-foreground mb-6">Order Summary</h2>

                {/* Items */}
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-muted relative">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm line-clamp-1">{item.name}</p>
                        <p className="text-sm text-muted-foreground">£{item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 text-sm border-t border-border/60 pt-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-foreground">£{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-foreground">
                      {shipping === 0 ? "Free" : `£${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="border-t border-border/60 pt-3 mt-3">
                    <div className="flex justify-between text-base">
                      <span className="font-semibold text-foreground">Total</span>
                      <span className="font-bold text-foreground text-lg">£{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="mt-6 pt-6 border-t border-border/60">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span>Secure 256-bit SSL encryption</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Truck className="h-4 w-4 text-primary" />
                    <span>Free shipping on orders over £50</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;