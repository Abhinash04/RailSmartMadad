import React from 'react'
import UserReview from './UserReview';

const Section5 = () => {
  return (
    <div className='Wrapper'id='section5'>
      <span id="sub-heading" className="animate-pulse text-center">RAIL MADAD</span>
      <span id="heading" className='mb-8 text-center block text-4xl font-bold'>USER REVIEW</span>
      <div className='container'>
        <UserReview/>
      </div>
      <div className='container flex items-center md:justify-center lg:justify-start'>
        <a href="/" className="btn btn-primary text-center max-w-[300px] mx-auto">Add a Review</a>
        <a href="/Community" className='btn btn-primary text-center max-w-[300px] mx-auto'>Community Page</a>
      </div>
    </div>
  )
}

export default Section5