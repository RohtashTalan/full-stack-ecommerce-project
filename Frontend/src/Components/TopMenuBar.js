import React from 'react'

const TopMenuBar = () => {
  return (
    <>
    <nav className='shadow'>
        <ul className='container mx-auto flex flex-wrap justify-between py-2 font-medium'>
            <li className='p-1 rounded'><a href='#'>Electronics</a></li>
            <li className='p-1 rounded'><a href='#'>TVs & Appliances</a></li>
            <li className='p-1 rounded'><a href='#'>Men</a></li>
            <li className='p-1 rounded'><a href='#'>Women</a></li>
            <li className='p-1 rounded'><a href='#'>Baby & Kids</a></li>
            <li className='p-1 rounded'><a href='#'>Home & Furniture</a></li>
            <li className='p-1 rounded'><a href='#'>Sports, Books & More</a></li>
            <li className='p-1 rounded'><a href='#'>Flights</a></li>
            <li className='p-1 rounded'><a href='#'>OfferZone</a></li>
        </ul>
    </nav>
    </>
  )
}

export default TopMenuBar