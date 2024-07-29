
import React from 'react';

import img1 from '../../assets/IMG_0434.JPG';
import img2 from '../../assets/IMG_0433.JPG';
import img3 from '../../assets/111.jpg';
import img4 from '../../assets/IMG_0436.JPG';
import img5 from '../../assets/IMG_0437.JPG';
import img6 from '../../assets/IMG_0447.JPG';
import {JS_BARISTA} from "../../utils/consts";
import {Link} from "react-router-dom";

const About = () => {
    return (
        <div className="mt-14 md:h-full sm:flex-wrap xl:flex xl:mx-auto xl:max-w-screen-xl 2xl:max-w-screen-2xl">
            <div>
                <h2 className='text-2xl border-b border-b-blue-gray-400 pb-1 font-bold '>О нас</h2>
                <p className='mt-10 text-lg'>Мы обжариваем кофе уже более 5 лет на лучшем в мире оборудовании. Каждую
                    партию
                    отслеживаем на специальном оборудовании, что позволяет создавать стабильно качественный продукт. В
                    свободную продажу поступает товар, прошедший строгий контроль качества.</p>

                <h3 className='text-xl mt-10 font-medium'>В нашем ассортименте вы найдете:</h3>
                <div className='flex flex-col gap-2 mt-4 text-lg'>
                    <p className='text-lg'>- Простые понятные сорта кофе на каждый день</p>
                    <p className='text-lg'>- Редкие и не обычные сорта которые смогут вас удивить</p>
                    <p className='text-lg'>- И бонусом можете попробовать большую часть как в дрип пакетах, так и в
                        капсулах</p>
                    <p className='text-lg'>- Сиропы высокого качества, подходящие как для различных лимонадов и
                        коктелей, так и для кофе</p>
                </div>

                <div className='flex flex-col gap-2 mt-4'>
                    <h3 className='text-lg'>Так же наша компания занимается подготовкой и обучением
                        высококвалифицированных бариста.</h3>
                    <p className='text-lg'>Более подробно о школе можете узнать на нашем инстаграм странице &#160;
                    <span className='text-red-500 font-medium'>
                        <Link to={JS_BARISTA}>
                        JS
                        Barista
                    </Link>
                    </span></p>
                </div>

            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-2 mb-10 pb-10">
                <div className="grid gap-4">
                    <div>
                        <img
                            className="h-auto max-w-full rounded-lg object-cover object-center"
                            src={img4}
                            alt="gallery-photo"
                        />
                    </div>
                    <div>
                        <img
                            className="h-auto max-w-full rounded-lg object-cover object-center "
                            src={img1}
                            alt="gallery-photo"
                        />
                    </div>
                    <div>
                        <img
                            className="h-auto max-w-full rounded-lg object-cover object-center"
                            src={img2}
                            alt="gallery-photo"
                        />
                    </div>
                </div>
                <div className="grid gap-4">
                    <div>
                        <img
                            className="h-auto max-w-full rounded-lg object-cover object-center"
                            src={img3}
                            alt="gallery-photo"
                        />
                    </div>
                    <div>
                        <img
                            className="h-auto max-w-full rounded-lg object-cover object-center"
                            src={img5}
                            alt="gallery-photo"
                        />
                    </div>
                    <div>
                        <img
                            className="h-auto max-w-full rounded-lg object-cover object-center "
                            src={img6}
                            alt="gallery-photo"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;