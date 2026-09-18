import CtaSection from '../sections/CtaSection';
import FeatureList from '../sections/FeatureList';
import Hero from '../sections/Hero';
import PricingSection from '../sections/PricingSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureList />
      <PricingSection />
      <CtaSection />
    </>
  );
}
