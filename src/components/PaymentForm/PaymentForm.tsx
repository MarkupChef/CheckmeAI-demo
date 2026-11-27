import LoadingIcon from '@components/Icons/LoadingIcon';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { StripeError } from '@stripe/stripe-js';
import { NEXT_PUBLIC_URL } from '@utils/constants/environments';
import { ROUTES } from '@utils/constants/routes';
import { Button, Card } from 'flowbite-react';
import { MouseEvent, useState } from 'react';

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [isStipeLoaded, setIsStipeLoaded] = useState(false);
  const [isStipeError, setIsStipeError] = useState(false);

  const confirmPayment = async () => {
    if (stripe && elements) {
      try {
        const result: { error: StripeError } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `${NEXT_PUBLIC_URL}/${ROUTES.successful_payment}`,
          },
        });

        if ('error' in result) {
          setIsStipeError(true);
          console.error(`Error of confirmCardPayment: ${result.error.message}`);
        }
        /* TODO: remove this if it not needed */
        /* else {
          const paymentIntent = (result as { paymentIntent: PaymentIntent }).paymentIntent;

          if (paymentIntent && paymentIntent.status === 'succeeded') {
            console.log('payment success');
          }
        } */
      } catch (err: any) {
        console.error(`Error of confirmCardPayment: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleClick = async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    setIsStipeError(false);
    await confirmPayment();
  };

  // the Stripe Link block moves the button on the field blur, so the payment starts on mouse down
  const handleMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
    if (event.button === 0) {
      handleClick();
    }
  };

  const handleKeyboardClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (event.detail === 0) {
      handleClick();
    }
  };

  const handleStipeReady = () => {
    setIsStipeLoaded(true);
  };

  return (
    <div className={'relative box-content w-full max-w-2xl'}>
      {!isStipeLoaded ? <LoadingIcon /> : null}
      <Card className={`${!isStipeLoaded ? 'absolute top-[-9999px]' : ''}`}>
        <PaymentElement onReady={handleStipeReady} />

        <Button
          size={'sm'}
          type={'button'}
          className={'py-2 lg:py-0'}
          onMouseDown={handleMouseDown}
          onClick={handleKeyboardClick}
        >
          {isLoading ? 'Loading...' : 'Pay'}
        </Button>
        {isStipeError && <p className={'text-red'}>Error: Something went wrong. Try again later or contact us.</p>}
      </Card>
    </div>
  );
}
