import { Swiper, SwiperSlide } from 'swiper/react';
import { FaStar } from "react-icons/fa";

import 'swiper/css';
import 'swiper/css/pagination';


import { Pagination } from 'swiper/modules';

const reviews = [
    {
        name: "Alice Johnson",
        image: "https://i.ibb.co/k0KPwPv/atick.jpg",
        jobDesignation: "Software Engineer",
        rating: 4.5,
        review: "DailyDo has made managing my daily tasks a breeze! As a software engineer, I appreciate its simplicity and efficiency. It helps me stay organized and focused on what matters most."
    },
    {
        name: "David Patel",
        image: "https://i.ibb.co/pxgbRN8/pritom.jpg",
        jobDesignation: "Banker",
        rating: 4.0,
        review: "I've tried several task management apps, and DailyDo stands out for its user-friendly interface. It caters perfectly to my needs as a banker, helping me prioritize tasks and meet deadlines effortlessly."
    },
    {
        name: "Emily Chang",
        image: "https://i.ibb.co/LJ7wRGW/rohit.jpg",
        jobDesignation: "HR Specialist",
        rating: 4.2,
        review: "Managing HR tasks requires attention to detail, and DailyDo has become an essential tool for me. It's intuitive, and the ability to categorize tasks makes it easy to stay organized in the fast-paced HR environment."
    },
    {
        name: "Mark Thompson",
        image: "https://i.ibb.co/6rJTzgy/person-Image.jpg",
        jobDesignation: "Marketing Manager",
        rating: 4.8,
        review: "DailyDo has streamlined my daily workflow as a Marketing Manager. Its clean design and quick task entry feature allow me to focus more on creative aspects rather than getting bogged down by administrative tasks."
    },
    {
        name: "Sarah Davis",
        image: "https://i.ibb.co/pxgbRN8/pritom.jpg",
        jobDesignation: "Financial Analyst",
        rating: 4.3,
        review: "As a financial analyst, precision is key, and DailyDo helps me maintain that precision in my tasks. It's a simple yet powerful tool that has become an integral part of my daily routine."
    }
];

const CustomerReview = () => {
    return (
        <div className="my-10">
            <h1 className="text-3xl font-semibold text-center mb-5">Customar Reviews</h1>
            <div className="flex max-w-4xl mx-auto">
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {reviews.map((review) => {
                        return <SwiperSlide key={review.name}>
                            <div className="bg-gray-50 border-2 p-2 h-[280px] rounded-xl">
                                <div className="flex items-center gap-2">
                                    <img className="h-[80px] w-[80px] rounded-full border object-cover" src={review.image} alt="" />
                                    <div>
                                        <h1 className="text-xl font-semibold">{review.name}</h1>
                                        <div className='flex items-center gap-1'>
                                            <FaStar className="text-orange-500" />
                                            <FaStar className="text-orange-500" />
                                            <FaStar className="text-orange-500" />
                                            <FaStar className="text-orange-500" />
                                            <FaStar className="text-orange-500" />
                                            <h2>({review.rating})</h2>
                                        </div>
                                        <h2 className="bg-blue-600 text-white py-1 px-2 my-1  rounded-full">{review.jobDesignation}</h2>
                                    </div>
                                </div>
                                <p>{review.review}</p>
                            </div>
                        </SwiperSlide>
                    })}
                </Swiper>
            </div>
        </div>
    )
}

export default CustomerReview