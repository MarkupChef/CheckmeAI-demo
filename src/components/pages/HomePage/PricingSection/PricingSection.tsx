import PriceCardList from '@components/PriceCardList';
import { Price } from '@types';
import { FC } from 'react';

interface PricingSectionProps {
  prices: Price[];
}

const PricingSection: FC<PricingSectionProps> = ({ prices }) => {
  return (
    <section className={'relative pt-[70px] md:min-h-screen lg:pt-[100px]'}>
      <div className={'circle-decor circle-decor--bottom'}>
        <div className={'container relative z-[2]'}>
          <h2 className={'mb-[0.5em] text-center text-4xl font-semibold sm:text-6xl'}>
            Choose your way
            <br />
            <span className={'text-seagreen-500'}>to check or improve yourself</span>
          </h2>
          <p className={'mx-auto mb-[64px] max-w-[580px] text-center text-lg sm:text-xl'}>
            Check out the interview modes and choose which one you want to take now.
          </p>
        </div>
        <div className={'relative z-[2]'}>
          <PriceCardList prices={prices} />
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
