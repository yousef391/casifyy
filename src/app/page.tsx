import Hero from '@/components/sections/Hero';
import Marquee from '@/components/sections/Marquee';
import Products from '@/components/sections/Products';
import HowItWorks from '@/components/sections/HowItWorks';
import Testimonials from '@/components/sections/Testimonials';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Products />
      <HowItWorks />
      <Testimonials />
    </>
  );
}
