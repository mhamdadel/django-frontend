import React from "react";
import 'flowbite';
// import '../../../../../public/images/'
import '../styles/carousel.css'
import photo1 from '../../../assets/images/photo1.jpg';
import photo2 from '../../../assets/images/photo2.jpg';
import photo3 from '../../../assets/images/photo3.jpg';
import photo4 from '../../../assets/images/photo4.jpg';
import photo5 from '../../../assets/images/photo5.webp';
function Carousel(){
    // console.log(images)
    return(
        
<div id="default-carousel" className="relative w-full" data-carousel="slide">

    <div id="carousel" className="relative overflow-hidden rounded-lg " style={{height:'80vh'}}>

        <div  id='img1' className="hidden duration-700 ease-in-out" data-carousel-item>
        <h1 class="absolute block top-1/2 left-1/2 font-bold  -translate-x-1/2 -translate-y-1/2 sm:text-3xl ">Welcome</h1>
            <img src={photo1}  className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />


        </div>
        <div id='img2' className="hidden duration-700 ease-in-out" data-carousel-item>
        <h1 class="absolute block top-1/2 left-1/2 font-bold  -translate-x-1/2 -translate-y-1/2 sm:text-3xl ">IN</h1>
            <img src={photo2} alt="photo1" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
        </div>

        <div id="img3"className="hidden duration-700 ease-in-out" data-carousel-item>
        <h1 class="absolute block top-1/2 left-1/2 font-bold  -translate-x-1/2 -translate-y-1/2 sm:text-3xl ">Our</h1>
            <img src={photo3} alt="photo1" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
        </div>

        <div id="img4" className="hidden duration-700 ease-in-out" data-carousel-item>
        <h1 class="absolute block top-1/2 left-1/2 font-bold  -translate-x-1/2 -translate-y-1/2 sm:text-3xl ">Ecommerce</h1>
            <img src={photo4} alt="photo1" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
        </div>
        <div id="img5" className="hidden duration-700 ease-in-out" data-carousel-item>
        <h1 class="absolute block top-1/2 left-1/2 font-bold  -translate-x-1/2 -translate-y-1/2 sm:text-3xl ">Website</h1>
            <img src={photo5} alt="photo1" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
        </div>
    </div>
    <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
        <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
    </div>
    <button type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg aria-hidden="true" className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
            <span className="sr-only">Previous</span>
        </span>
    </button>
    <button type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg aria-hidden="true" className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            <span className="sr-only">Next</span>
        </span>
    </button>
</div>

    );
}
export default Carousel