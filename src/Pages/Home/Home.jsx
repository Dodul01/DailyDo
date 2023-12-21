import React from 'react'
import Nav from '../../Components/Nav/Nav'
import Banner from '../../Components/Banner/Banner'
import Features from '../../Components/Features/Features'
import CustomerReview from '../../Components/CustomarReviews/CustomarReviews'
import Footer from '../../Components/Footer/Footer'

const Home = () => {
  return (
    <div>
      <Nav />
      <Banner />
      <Features />
      <CustomerReview />
      <Footer />
    </div>
  )
}

export default Home