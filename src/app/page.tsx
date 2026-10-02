import Navbar from '@/components/homepage/navbar'
import Hero from '@/components/homepage/hero'
import CategoryGrid from '@/components/homepage/CategoryGrid'
import BestSellers from '@/components/homepage/BestSellers'
import BrandNarrative from '@/components/homepage/BrandNarrative'

const Homepage = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CategoryGrid />
        <BestSellers />
        <BrandNarrative />
      </main>
    </>
  )
}

export default Homepage