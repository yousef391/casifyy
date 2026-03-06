'use client';

export default function Marquee() {
  const items = [
    'Livraison 48h', 'خطة العمل الأولى', 'Custom Design', 'أغطية مخصصة',
    'iPhone · Samsung · Xiaomi', 'Qualité Premium', 'طباعة احترافية',
  ];

  return (
    <div className="bg-ink py-[18px] overflow-hidden whitespace-nowrap">
      <div className="inline-flex animate-marquee">
        {[...items, ...items].map((text, i) => (
          <span key={i} className="inline-flex items-center gap-5 px-8 font-sans text-[11px] tracking-[0.15em] uppercase text-soft font-light">
            {text}
            <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
