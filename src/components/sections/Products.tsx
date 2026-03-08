'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Heart, ShoppingBag, Loader2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { fetchProducts } from '@/lib/api';
import type { Product } from '@/types';

const FILTERS = [
  { id: 'all', fr: 'Tous', en: 'All', ar: 'الكل' },
  { id: 'calligraphy', fr: 'Calligraphie', en: 'Calligraphy', ar: 'خط عربي' },
  { id: 'nature', fr: 'Nature', en: 'Nature', ar: 'طبيعة' },
  { id: 'artistic', fr: 'Artistique', en: 'Artistic', ar: 'فني' },
  { id: 'personalized', fr: 'Personnalisé', en: 'Personalized', ar: 'مخصص' },
  { id: 'geometric', fr: 'Géométrique', en: 'Geometric', ar: 'هندسي' },
];

export default function Products() {
  const { locale } = useLanguage();
  const { addItem } = useCart();
  const [activeFilter, setActiveFilter] = useState('all');
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeFilter === 'all' ? products : products.filter(p => p.category === activeFilter);

  const toggleLike = (id: string) => {
    setLiked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filterLabel = (f: typeof FILTERS[0]) =>
    locale === 'ar' ? f.ar : locale === 'en' ? f.en : f.fr;

  const title = locale === 'ar' ? 'أغطية جاهزة' : locale === 'en' ? 'Ready to order' : 'Prêtes à commander';
  const titleAccent = locale === 'ar' ? 'للطلب' : locale === 'en' ? 'cases' : 'coques';
  const eyebrow = locale === 'ar' ? 'أعمالنا' : locale === 'en' ? 'Our Creations' : 'Nos Créations';
  const orderBtn = locale === 'ar' ? 'طلب' : locale === 'en' ? 'Order' : 'Commander';

  return (
    <section id="products" className="px-5 md:px-12 lg:px-20 py-16 md:py-24 bg-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
        <div>
          <div className="section-eyebrow mb-2">{eyebrow}</div>
          <h2 className="font-serif text-[clamp(28px,3.5vw,48px)] font-light text-ink leading-[1.15]">
            {title} <em className="italic text-accent">{titleAccent}</em>
          </h2>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-10 overflow-x-auto scrollbar-hide pb-2 -mx-5 px-5 md:mx-0 md:px-0">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`shrink-0 font-sans text-[11px] tracking-[0.08em] uppercase px-4 py-2 rounded-full border transition-all duration-200 ${
              activeFilter === f.id
                ? 'bg-ink text-cream border-ink'
                : 'bg-transparent text-muted border-soft/60 hover:border-accent hover:text-accent'
            }`}
          >
            {filterLabel(f)}
          </button>
        ))}
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
        </div>
      ) : (
        /* Product grid */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="product-card group relative bg-cream rounded-xl overflow-hidden border border-soft/20 shadow-[0_4px_24px_rgba(44,31,20,0.08)] hover:shadow-[0_12px_40px_rgba(44,31,20,0.14)] hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                {product.popular && (
                  <span className="absolute top-2.5 left-2.5 z-10 bg-accent text-cream font-sans text-[8px] md:text-[9px] tracking-[0.1em] uppercase px-2.5 py-1 rounded-full shadow-sm">
                    Bestseller
                  </span>
                )}

                {/* Like button */}
                <button
                  onClick={() => toggleLike(product.id)}
                  className="absolute top-2.5 right-2.5 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-all hover:bg-white hover:scale-110 shadow-sm"
                >
                  <Heart className={`w-3.5 h-3.5 transition-colors ${liked.has(product.id) ? 'fill-red-400 text-red-400' : 'text-muted'}`} />
                </button>

                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />

                {/* Quick add overlay (desktop) */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 via-ink/30 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden md:flex">
                  <button
                    onClick={() => addItem(product)}
                    className="w-full flex items-center justify-center gap-2 bg-cream/95 text-ink py-2.5 text-center font-sans text-[10px] tracking-[0.1em] uppercase font-medium rounded-lg hover:bg-white transition-colors shadow-sm"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    {orderBtn}
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-3 md:p-4">
                <p className="font-serif text-[14px] md:text-[15px] text-ink font-normal mb-1 truncate">{product.name}</p>
                <div className="flex justify-between items-center">
                  <span className="font-serif text-lg md:text-xl font-normal text-ink">
                    {product.price.toLocaleString()} <span className="font-sans text-[10px] text-muted font-medium">DA</span>
                  </span>
                  {/* Mobile add button */}
                  <button
                    onClick={() => addItem(product)}
                    className="md:hidden w-8 h-8 bg-ink text-cream rounded-full flex items-center justify-center hover:bg-accent transition-colors shadow-sm"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
