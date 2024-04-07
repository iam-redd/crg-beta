//import { Spinner } from "@material-tailwind/react";
import { CirclesWithBar , TailSpin } from 'react-loader-spinner'

export function DefaultSpinner({ width = 80, height = 80 }) {
  // return <Spinner />
  return <div className='flex justify-center mx-auto w-full'><TailSpin
    height={`${height}`}
    width={`${width}`}
    color="#FF0000"
    outerCircleColor="#4fa94d"
    innerCircleColor="#4fa94d"
    barColor="#4fa94d"
    ariaLabel="circles-with-bar-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
  />
  </div>
}