





// will help us add stripe. 


import Stripe from 'stripe';

// need this 
export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY ?? '',
  {
    apiVersion: '2022-11-15',
    appInfo: {
      name: 'Spotify Clone',
      version: '0.1.0'
    }
  }
);