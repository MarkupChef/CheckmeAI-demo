import { FC } from 'react';
import defaultClasses from './cardPrice.module.css';

interface CardPriceProps {
  price: number;
}

const CardPrice: FC<CardPriceProps> = ({ price }) => {
  if (Number.isInteger(price) || price === 0) {
    return <>{price}</>;
  }

  const [first, second] = `${price}`.split('.');

  return (
    <span className={defaultClasses.root}>
      {first} <sup className={defaultClasses.sup}>.{second}</sup>
    </span>
  );
};

export default CardPrice;
