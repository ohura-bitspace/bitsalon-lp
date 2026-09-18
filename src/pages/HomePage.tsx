import CtaSection from '../sections/CtaSection';
import FeatureList from '../sections/FeatureList';
import FlowBand from '../sections/FlowBand';
import Hero from '../sections/Hero';
import PricingSection from '../sections/PricingSection';
import PricingTeaser from '../sections/PricingTeaser';
import ProductMock from '../sections/ProductMock';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductMock />
      <FlowBand />
      <PricingTeaser />
      <FeatureList />
      <PricingSection />
      <CtaSection />
    </>
  );
}
