import React from 'react'
import first_image from '../assets/front_image1.jpg'
import { Link } from 'react-router-dom'


const PageNotFound = () => {
  return (
    <div className="relative w-full" >
      <img src={first_image} className="object-fill w-screen h-screen" alt='movies cover image' />
    <div className="absolute object-cover inset-0  bg-black opacity-60"></div>
      <section class="flex absolute  items-center top-[20%] left-[31%]  p-10  bg-black dark:bg-gray-700">
        <div class="container flex flex-col items-center ">
          <div class="flex flex-col gap-6 max-w-md text-center">
            <h2 class="font-extrabold text-9xl text-gray-600 dark:text-gray-100">
              <span class="sr-only text-gray-300">Error</span>404
            </h2>
            <p class="text-2xl md:text-3xl text-white dark:text-gray-300">Sorry, we couldn't find this page.</p>
            <Link to="/login" class="px-8 py-4 text-xl font-semibold rounded bg-red-500 text-gray-50 hover:text-gray-200">Back to home</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PageNotFound