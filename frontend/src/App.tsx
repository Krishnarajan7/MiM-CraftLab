import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Courses from "./pages/Courses";
import CustomOrders from "./pages/CustomOrders";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import { SimpleToastProvider } from "./components/ui/simple-toast";
import { ScrollToTop } from "./components/ScrollToTop";
import FloatingNav from "./components/ui/floating-nav";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SimpleToastProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <ScrollToTop />
        <Routes>
          {/* Auth routes without Layout */}
          <Route path="/auth" element={<Auth />} />
          <Route path="/signin" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />
          
          {/* All other routes with Layout */}
          <Route path="/" element={<Layout><Index /></Layout>} />
          <Route path="/shop" element={<Layout><Shop /></Layout>} />
          <Route path="/product/:id" element={<Layout><ProductDetail /></Layout>} />
          <Route path="/cart" element={<Layout><Cart /></Layout>} />
          <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
          <Route path="/wishlist" element={<Layout><Wishlist /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/courses" element={<Layout><Courses /></Layout>} />
          <Route path="/custom-orders" element={<Layout><CustomOrders /></Layout>} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
        <FloatingNav />
      </BrowserRouter>
      </SimpleToastProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
