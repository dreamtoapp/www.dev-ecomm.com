import React from 'react';

import { getOfferCategory } from './actions/getOfferCategory';
import AddOfferForm from './components/AddOffer';

async function page() {
  // Fetch categories from the backend
  const offerCategory = await getOfferCategory();

  return (

    <AddOfferForm suppliers={offerCategory} />

  );
}

export default page;
