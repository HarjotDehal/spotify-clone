"use client";

import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

import useSubscribeModal from '@/hooks/useSubscribeModal';
import { useUser } from '@/hooks/useUser';
import { postData } from '@/libs/helpers';
import { getStripe } from '@/libs/stripeClient';
import { Price, ProductWithPrice } from '@/types';

import Modal from './Modal';
import Button from './Button';

interface SubscribeModalProps {
  products: ProductWithPrice[];
}

const formatPrice = (price: Price) => {
  const priceString = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currency,
    minimumFractionDigits: 0
  }).format((price?.unit_amount || 0) / 100);

  return priceString;
};
// given type of currency and price, we organize it accordingly. we assume US. 

const SubscribeModal: React.FC<SubscribeModalProps> = ({
  products
}) => {
  const subscribeModal = useSubscribeModal();

// keeps track if its open or not


  const { user, isLoading, subscription } = useUser();

  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const onChange = (open: boolean) => {
    if (!open) {
      subscribeModal.onClose();
    }
  }
//   checks if its open

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);
    if (!user) {
      setPriceIdLoading(undefined);
      return toast.error('Must be logged in');
    }

    // if you try to buy but not logged in, then say u must be logged

    // if already subscribed then say that

    if (subscription) {
      setPriceIdLoading(undefined);
      return toast('Already subscribed');
    }

    try {


        // this is our checkout session. 
        // we open a new session
      const { sessionId } = await postData({
        url: '/api/create-checkout-session',
        data: { price }
      });
// gets our stripe and checkout.
// basically if you click it. then go to the stripe page. 
      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      return toast.error((error as Error)?.message);
    } finally {
      setPriceIdLoading(undefined);
    }
  };

  let content = (
    <div className="text-center">
      No products available.
    </div>
  )

  if (products.length) {

    // if there are multiple products, then we found the product that we want
    // we iterate through our products and open the wanted one. 
    // if there is no price then say no price avail
    content = (
      <div>
        {products.map((product) => {
          if (!product.prices?.length) {
            return (
              <div key={product.id}>
                No prices available
              </div>
            );
          }
            // the button has our nice green background
          return product.prices.map((price) => (
            <Button 
              key={price.id} 
              onClick={() => handleCheckout(price)}
              disabled={isLoading || price.id === priceIdLoading}
              className="mb-4"
            >
              {`Subscribe for ${formatPrice(price)} a ${price.interval}`}

              {/* formats our price nicely above. this is just styling and making sure the . goes in right spot */}
            </Button>
          ))
        })}
      </div>
    )
  }

  if (subscription) {
    content = (
      <div className="text-center">
        Already subscribed.
      </div>
    )
  }

//   this is just another nice thing in addition to toast

  return (
    <Modal
      title="Only for premium users"
      extra=''
      moreextra=''
      description="Listen to music with Spotify Premium"
      isOpen={subscribeModal.isOpen}
    // isOpen
      onChange={onChange}
    >
      {content}
    </Modal>
  );
}

export default SubscribeModal;