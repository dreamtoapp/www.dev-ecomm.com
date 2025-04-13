import React from 'react'

import LoginPage from './component/login-from'

async function page({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const redirect = resolvedSearchParams.redirect;



  return (
    <LoginPage redirect={redirect || "/"} />
  )
}

export default page


