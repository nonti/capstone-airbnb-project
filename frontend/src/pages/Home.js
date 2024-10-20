import React from 'react';
import CardTiles from '../components/cardtiles/CardTiles';
import Experiences from '../components/experiences/Experiences';
import GiftCard from '../components/gift/GiftCard';
import Host from '../components/host/Host';
import Inspiration from '../components/inspiration/Inspiration';
import Footer from '../components/footer/Footer';
import Banner from '../components/banner/Banner';
import HeaderBottom from '../components/header/HeaderBottom';
const Home = () => {
  return (
    <div className='home-background'>
      <HeaderBottom/>
      <Banner />
      <CardTiles/>
      <Experiences/>
      <GiftCard/>
      <Host/>
      <Inspiration/>
      <Footer/>
    </div>
  )
}

export default Home