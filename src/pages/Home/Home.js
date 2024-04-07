import React from 'react';
//import movie from '../../assets/kons_img4.jpg'
import roasterImg from '../../assets/roaster.png'
import skladImg from '../../assets/sklad.png'
import CoffeeCard from '../../components/CoffeeCard'
import { SHOP_WHOLESELLER, JS_BARISTA, SHOP_USER } from '../../utils/consts';
import deliveryIcon from '../../assets/icons/delivery1.svg'
import cupIcon from '../../assets/icons/cup.svg'
import starIcon from '../../assets/icons/star.svg'
import teamImg from '../../assets/crg-team.png'
import instagramIcon from '../../assets/icons/instagram-icon.svg'
import { useGetAllGoodsQuery } from '../../store/goodsApi';
import {DefaultSpinner} from '../../components/Spinner'

const Home = () => {
  const { data, isSuccess } = useGetAllGoodsQuery()
  if (isSuccess) {
    console.log(data)
  }
  // const basket = useSelector(state => state.basket.basket)
  // console.log(basket)
  return (
    <div>
      <div className="md:h-full sm:flex-wrap xl:flex xl:mx-auto xl:max-w-screen-xl 2xl:max-w-screen-2xl ">
        <div className='bg-white max-w-screen-xl 2xl:max-w-screen-2xl md:w-full h-full inset-x-0 top-0 z-0 xl:w-8/12'>
          {/*<div className='brightness-75'>
            <video className="h-full inset-x-0 top-0 z-0 object-cover" autoPlay muted loop>
              <source src={movie} type="video/webm" />
              Your browser does not support the video tag.
            </video>
  </div>*/}
          <div className='top-0 h-full sm:m-auto offer-back'>
            <div className='darkness p-6'>
              <div className='md:py-16 md:mx-10 lg:py-10'>
                <h1 className='mt-6 md:mt-0 text-2xl sm:text-4xl md:text-start w-full font-black text-white 2xl:w-2/3 2xl:text-5xl'>ЖАРИМ КОФЕ КАЖДЫЙ ДЕНЬ</h1>
                <p className='text-sm md:text-start md:text-md md:w-2/3 font-normal text-white mt-5 2xl:text-lg lg:text-lg'>Поставки свежеобжаренного кофе и сиропов собственного производства</p>
              </div>
              <div className='mt-8 md:mt-0 lg:mt-0 md:py-10 md:mx-10 flex justify-between md:justify-start'>
                <a href={SHOP_USER}><button className='main-button'>В каталог</button></a>
                <a href={SHOP_WHOLESELLER}><button className='main-button mx-2'>Кабинет оптовика</button></a>
              </div>
            </div>
          </div>
        </div>
        <div className='top-0 md:w-full xl:w-4/12 offer-bar-back'>
          <div className='darkness h-full p-6 md:p-6'>
            <div className=' md:mx-10'>
              <div className='md:py-16 lg:py-10'>
                <h1 className='text-2xl md:text-3xl md:text-start w-full md:w-full font-black text-white 2xl:w-full 2xl:text-5xl'>ШКОЛА БАРИСТА</h1>
                <p className='text-sm sm:text-base font-normal md:text-md text-white mt-5 2xl:text-lg'>Научим готовить вкусный кофе, с любовью</p>
              </div>
              <div className='py-4 md:py-2 md:mt-2 lg:pt-6 md:pt-4 xl:pt-0 2xl:pt-8'>
                <a href={JS_BARISTA} target='blank'><button className='main-button' >JS Barista</button></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <main>
        <div className='mt-10 md:h-full xl:mx-auto xl:max-w-screen-xl 2xl:max-w-screen-2xl'>
          <div>
            <div>
              <h2 className='text-xl font-bold text-center my-6 sm:my-10'>НОВИНКИ</h2>
            </div>
            <div className=''>
              <div className='flex pb-4 overflow-x-scroll scroll-smooth wrappeR snap-x snap-mandatory justify-start gap-4 flex-nowrap'>
                {
                  isSuccess ? <>
                    {
                      data.map((card, index) => index < 6 && <CoffeeCard className='snap-always' key={index} data={card} />)
                    }
                  </> : <DefaultSpinner/>
                }
              </div>
            </div>
          </div>
        </div>
        <div className='mt-10 bg-crg-opacity bg-no-repeat bg-white py-5'>
          <div className='xl:mx-auto xl:max-w-screen-xl 2xl:max-w-screen-xl'>
            <h2 className='text-2xl font-bold text-center'>COFFEE ROASTERY GROUP</h2>
            <div className='flex w-full items-center flex-wrap md:flex-nowrap'>
              <div className='flex w-full md:w-2/5 p-10'>
                <img src={roasterImg} alt='Roaster' />
              </div>
              <div className='flex w-full text-center md:w-3/5 mx-5'>
                <p className='xl:text-lg 2xl:text-lg md:text-md text-sm align-top'>Наша компания в сфере HoReCa занимается поставками свежеобжаренного кофе и сиропов собственного производства.
                  Мы обжариваем кофе уже более 5 лет на лучшем в мире оборудовании. Каждую партию отслеживаем на специальном оборудовании, что позволяет создавать стабильно качественный продукт. В свободную продажу поступает товар, прошедший строгий контроль качества.
                  <br />*Так же наша компания занимается подготовкой и обучением высококвалифицированных бариста.</p>
              </div>
            </div>
            <div className='flex w-full items-center flex-wrap md:flex-nowrap'>
              <div className='flex flex-col w-full md:w-3/5 mx-5'>
                <p className='md:text-md text-sm xl:text-lg 2xl:text-lg md:mt-5 text-center mt-3'>
                  *Большие склады для зеленого и свеже обжаренного кофе.
                </p>
                <p className='md:text-md text-sm xl:text-lg 2xl:text-lg md:mt-5 text-center mt-3 '>*Несколько видов Европейского обжарочного оборудования.
                </p>
                <p className='md:text-md text-sm xl:text-lg 2xl:text-lg md:mt-5 text-center mt-3'>*Высокая стень очистки кофе дистонером. 3-х уровневый контроль качества.
                </p>
              </div>
              <div className='flex w-full md:w-2/5 justify-center p-10 '>
                <img src={skladImg} alt='sklad' />
              </div>
            </div>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-3 row-auto gap-1 lg:gap-10 text-md items-top lg:mt-10 xl:mx-auto xl:max-w-screen-xl 2xl:max-w-screen-2xl'>
            <div className='flex-col justify-center text-center items-center p-5'>
              <img src={deliveryIcon} alt='delivert' className='mx-auto py-5' />
              <h2 className='text-2xl font-semibold'>Доставка</h2>
              <p className='my-4'>Бесплатно по г.Ташкенту с 12:00 и в течении дня, с понедельника по субботу при заказе на сумму выше 350.000</p>
            </div>
            <div className='flex-col justify-center text-center items-center p-5'>
              <img src={starIcon} alt='star' className='mx-auto py-5' />
              <h2 className='text-2xl font-semibold'>Качество</h2>
              <p className='my-4'>Мы поддерживаем микроклимат на складе для зеленого кофе, используем лучшие в мире ростеры Probat, проверяем каждую партию кофе колориметрами. А после обжарки дополнительно очищаем.</p>
            </div>
            <div className='flex-col justify-center text-center items-center p-5'>
              <img src={cupIcon} alt='cup' className='mx-auto py-5' />
              <h2 className='text-2xl font-semibold'>Every day regular</h2>
              <p className='my-4'>Жарим кофе семь дней в неделю, отправляем на следующий день после заказа, чтобы вы получали максимально свежий кофе.</p>
            </div>
          </div>
          <div className='flex flex-wrap md:flex-nowrap text-center md:text-start justify-center p-5 rounded-3xl items-center bg-gray-100 xl:mx-auto xl:max-w-screen-xl 2xl:max-w-screen-2xl mb-10'>
            <img src={teamImg} alt='Team' className='m-5' />
            <div className='m-2'>
              <span className='text-lg font-bold'>Подпишись на нас</span>
              <p className='mx-auto my-2 md:mx-0 md:mt-1 w-4/5 text-md'>Здесь мы рассказываем о том, что у нас происходит каждый день. О людях, анонсах, процессах, событиях и новых сортах кофе.</p>
            </div>
            <div className='flex flex-col justify-center'>
              <div className='flex mx-auto my-2 md:mt-0'>
                <img src={instagramIcon} alt='instagram' />
                <a href='https://instagram.com/coffeeroasterygroup?igshid=YTQwZjQ0NmI0OA==' target='blank' className='mx-1' >@coffeeroasterygroup</a>
              </div>
              <div className='flex mx-auto mt-2 md:mt-0'>
                <img src={instagramIcon} alt='instagram' />
                <a href='https://instagram.com/jsbarista.uz?igshid=MzRlODBiNWFlZA==' target='blank' className='mx-1' >@jsbarista.uz</a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

