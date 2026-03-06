'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { WILAYAS } from '@/lib/constants';

export default function OrderModal({ onClose }: { onClose: () => void }) {
  const { items, totalPrice, clearCart } = useCart();
  const { locale } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const t = {
    title: locale === 'ar' ? 'إتمام الطلب' : locale === 'en' ? 'Complete Order' : 'Finaliser la commande',
    name: locale === 'ar' ? 'الاسم الكامل' : locale === 'en' ? 'Full Name' : 'Nom complet',
    phone: locale === 'ar' ? 'الهاتف' : locale === 'en' ? 'Phone' : 'Téléphone',
    wilaya: locale === 'ar' ? 'الولاية' : locale === 'en' ? 'Wilaya' : 'Wilaya',
    address: locale === 'ar' ? 'العنوان' : locale === 'en' ? 'Address' : 'Adresse',
    notes: locale === 'ar' ? 'ملاحظات' : locale === 'en' ? 'Notes' : 'Notes',
    confirm: locale === 'ar' ? 'تأكيد الطلب' : locale === 'en' ? 'Confirm Order' : 'Confirmer la commande',
    total: locale === 'ar' ? 'المجموع' : locale === 'en' ? 'Total' : 'Total',
    success: locale === 'ar' ? 'تم إرسال طلبك بنجاح!' : locale === 'en' ? 'Your order has been sent!' : 'Votre commande a été envoyée !',
    successSub: locale === 'ar' ? 'سنتواصل معك قريباً' : locale === 'en' ? 'We will contact you soon' : 'Nous vous contacterons bientôt',
    close: locale === 'ar' ? 'تم' : locale === 'en' ? 'Done' : 'Terminé',
  };

  const handleSubmit = () => {
    setSubmitted(true);
    clearCart();
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-[90]"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-lg bg-white z-[95] overflow-hidden max-h-[90vh] flex flex-col shadow-2xl"
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center text-muted hover:text-ink transition-colors">
          <X className="w-5 h-5" />
        </button>

        <div className="flex-1 overflow-y-auto p-8">
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green" />
              </div>
              <h3 className="font-serif text-2xl font-light text-ink mb-2">{t.success}</h3>
              <p className="font-sans text-sm text-muted">{t.successSub}</p>
              <button onClick={onClose} className="mt-8 bg-ink text-cream px-8 py-3 font-sans text-xs tracking-widest uppercase">
                {t.close}
              </button>
            </div>
          ) : (
            <>
              <h3 className="font-serif text-2xl font-light text-ink mb-6">{t.title}</h3>

              {/* Summary */}
              <div className="space-y-2 mb-6 pb-6 border-b border-sand">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between font-sans text-sm">
                    <span className="text-muted">{item.product.name} × {item.quantity}</span>
                    <span className="text-ink font-medium">{(item.product.price * item.quantity).toLocaleString()} DA</span>
                  </div>
                ))}
                <div className="flex justify-between pt-2">
                  <span className="font-sans text-sm font-medium text-ink">{t.total}</span>
                  <span className="font-serif text-xl text-accent">{totalPrice.toLocaleString()} DA</span>
                </div>
              </div>

              {/* Form */}
              <div className="space-y-3">
                <div>
                  <label className="block font-sans text-[10px] tracking-[0.1em] uppercase text-muted mb-1.5">{t.name}</label>
                  <input className="w-full h-[42px] bg-cream border border-sand rounded px-3 font-sans text-[13px] text-ink outline-none focus:border-accent transition-colors" />
                </div>
                <div>
                  <label className="block font-sans text-[10px] tracking-[0.1em] uppercase text-muted mb-1.5">{t.phone}</label>
                  <input className="w-full h-[42px] bg-cream border border-sand rounded px-3 font-sans text-[13px] text-ink outline-none focus:border-accent transition-colors" type="tel" />
                </div>
                <div>
                  <label className="block font-sans text-[10px] tracking-[0.1em] uppercase text-muted mb-1.5">{t.wilaya}</label>
                  <select className="w-full h-[42px] bg-cream border border-sand rounded px-3 font-sans text-[13px] text-ink outline-none focus:border-accent transition-colors appearance-none">
                    <option value="">-- {t.wilaya} --</option>
                    {WILAYAS.map((w) => <option key={w} value={w}>{w}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-sans text-[10px] tracking-[0.1em] uppercase text-muted mb-1.5">{t.address}</label>
                  <input className="w-full h-[42px] bg-cream border border-sand rounded px-3 font-sans text-[13px] text-ink outline-none focus:border-accent transition-colors" />
                </div>
                <div>
                  <label className="block font-sans text-[10px] tracking-[0.1em] uppercase text-muted mb-1.5">{t.notes}</label>
                  <textarea className="w-full bg-cream border border-sand rounded p-3 font-sans text-[13px] text-ink resize-y min-h-[60px] outline-none focus:border-accent transition-colors" />
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="group relative w-full mt-5 bg-ink text-cream py-4 font-sans text-xs tracking-[0.12em] uppercase font-medium flex items-center justify-center gap-3 overflow-hidden"
              >
                <span className="absolute inset-0 bg-accent -translate-x-full group-hover:translate-x-0 transition-transform duration-400" />
                <span className="relative z-[1]">{t.confirm}</span>
                <span className="relative z-[1]">→</span>
              </button>
            </>
          )}
        </div>
      </motion.div>
    </>
  );
}
