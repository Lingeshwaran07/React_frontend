import React from 'react'
import NetflixLogo from '../assets/Netflix_Logo_PMS.png'

const Footer = () => {
  return (
    <div className='inset-0 bg-black ' >
    <div className='flex' ><div className='flex-1'><img src = {NetflixLogo} className='w-[580px]'></img></div><div className='flex-1'>

<footer class=" ">
    <div class="mx-auto w-full max-w-screen-xl">
      <div class="grid grid-cols-3 gap-6 pr-4 pl-4  py-6 lg:py-8 md:grid-cols-3">
        <div>
            <h2 class="mb-6 text-sm font-semibold text-white uppercase dark:text-white">Company</h2>
            <ul class="text-white font-medium">
                <li class="mb-4">
                    <a href="#" class=" hover:underline">About</a>
                </li>
                <li class="mb-4">
                    <a href="#" class="hover:underline">Careers</a>
                </li>
                <li class="mb-4">
                    <a href="#" class="hover:underline">Brand Center</a>
                </li>
                <li class="mb-4">
                    <a href="#" class="hover:underline">Blog</a>
                </li>
            </ul>
        </div>
        {/* <div>
            <h2 class="mb-6 text-sm font-semibold text-white uppercase ">Help center</h2>
            <ul class="text-white">
                <li class="mb-4">
                    <a href="#" class="hover:underline">Discord Server</a>
                </li>
                <li class="mb-4">
                    <a href="#" class="hover:underline">Twitter</a>
                </li>
                <li class="mb-4">
                    <a href="#" class="hover:underline">Facebook</a>
                </li>
                <li class="mb-4">
                    <a href="#" class="hover:underline">Contact Us</a>
                </li>
            </ul>
        </div> */}
        <div>
            <h2 class="mb-6 text-sm font-semibold text-white uppercase dark:text-white">Legal</h2>
            <ul class="text-white font-medium">
                <li class="mb-4">
                    <a href="#" class="hover:underline">Privacy Policy</a>
                </li>
                <li class="mb-4">
                    <a href="#" class="hover:underline">Licensing</a>
                </li>
                <li class="mb-4">
                    <a href="#" class="hover:underline">Terms &amp; Conditions</a>
                </li>
                <li class="mb-4">
                    <a href="#" class="hover:underline">Help &amp;  Center</a>
                </li>
            </ul>
        </div>
        <div className='flex-col'>
            <h2 class=" text-sm mb-6 font-semibold text-white uppercase ">Double Tap to Rate us</h2>
            {/* xs */}

<div className="rating flex rating-xs mb-2">
  <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" checked />
  <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
</div>
{/* sm */}
<div className="rating flex rating-sm mb-2">
  <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" checked />
  <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
</div>
{/* md */}
<div className="rating rating-md mb-2">
  <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" checked />
  <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
</div>
{/* lg */}
<div className="rating rating-lg mb-2">
  <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" checked />
  <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" />
</div>
        </div>
    </div>
    
    </div>
</footer>
</div></div>
    <div className='  text-white text-justify  text-[12px] '   >The information contained in this website is for general information purposes only. The information is provided by business name and while we endeavour to keep the information up to date and we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk. In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website. Through this website you are able to link to other websites which are not under the control of [business name]. We have no control over the nature, content and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.Every effort is made to keep the website up and running smoothly. However, [business name] takes no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues beyond our control. This website is made for education purpose and not to scam anybody. This website is developed in react js for UI,tailwind for styling , django rest framework for authentication and hosted on netlify pfm  </div>
    </div>
  )
}

export default Footer