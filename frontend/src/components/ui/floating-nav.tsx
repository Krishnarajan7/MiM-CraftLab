"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Search, ShoppingCart, User, Heart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { SearchModal, SearchItem } from "@/components/ui/search-modal";
import { Tv, Sofa, Package } from "lucide-react";

const searchData: SearchItem[] = [
  { id: "1", title: "Smart LED TV 55 inch", description: "4K Ultra HD Smart Television", category: "Electronics", icon: Tv, href: "/products?category=electronics" },
  { id: "2", title: "Double Door Refrigerator", description: "500L Frost Free with Inverter", category: "Home Appliances", icon: Home, href: "/products?category=home-appliances" },
  { id: "3", title: "Wooden Dining Table", description: "6 Seater Solid Wood Table", category: "Furnitures", icon: Sofa, href: "/products?category=furnitures" },
  { id: "4", title: "Plastic Storage Containers", description: "Set of 12 Airtight Containers", category: "Plastic", icon: Package, href: "/products?category=plastic" },
];

const FloatingNav = () => {
  const location = useLocation();
  const [active, setActive] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLAnchorElement | HTMLButtonElement | null)[]>([]);

  const items = [
    { id: 0, icon: Home, label: "Home", href: "/" },
    { id: 1, icon: Search, label: "Search", href: null, isSearch: true },
    { id: 2, icon: Heart, label: "Wishlist", href: "/account" },
    { id: 3, icon: ShoppingCart, label: "Cart", href: "/cart", badge: 3 },
    { id: 4, icon: User, label: "Account", href: "/account" },
  ];

  // Set active based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === "/") setActive(0);
    else if (path === "/cart") setActive(3);
    else if (path === "/account") setActive(4);
    else setActive(-1);
  }, [location.pathname]);

  // Update indicator position when active changes or resize
  useEffect(() => {
    const updateIndicator = () => {
      if (active >= 0 && btnRefs.current[active] && containerRef.current) {
        const btn = btnRefs.current[active];
        const container = containerRef.current;
        if (!btn) return;
        const btnRect = btn.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        setIndicatorStyle({
          width: btnRect.width,
          left: btnRect.left - containerRect.left,
        });
      }
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [active]);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-2 pb-2 pointer-events-none">
      <nav
        ref={containerRef}
        className="relative flex items-center justify-around bg-card/95 backdrop-blur-md border border-border rounded-xl shadow-lg py-1 pointer-events-auto"
      >
        {items.map((item, index) => {
          const Icon = item.icon;
          const isActive = active === index;
          
          if (item.isSearch) {
            return (
              <SearchModal key={item.id} data={searchData}>
                <button
                  ref={(el) => (btnRefs.current[index] = el)}
                  className="relative flex flex-col items-center justify-center flex-1 px-1 py-1 text-xs font-medium text-muted-foreground"
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[9px] mt-0.5">{item.label}</span>
                </button>
              </SearchModal>
            );
          }

          return (
            <Link
              key={item.id}
              to={item.href!}
              ref={(el) => (btnRefs.current[index] = el)}
              onClick={() => setActive(index)}
              className={`relative flex flex-col items-center justify-center flex-1 px-1 py-1 text-xs font-medium transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.badge && (
                  <span className="absolute -top-1 -right-1.5 bg-primary text-primary-foreground text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[9px] mt-0.5">{item.label}</span>
            </Link>
          );
        })}

        {/* Sliding Active Indicator */}
        {active >= 0 && (
          <motion.div
            className="absolute top-0 h-0.5 bg-primary rounded-full"
            initial={false}
            animate={{
              width: indicatorStyle.width * 0.5,
              left: indicatorStyle.left + indicatorStyle.width * 0.25,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
      </nav>
    </div>
  );
};

export default FloatingNav;