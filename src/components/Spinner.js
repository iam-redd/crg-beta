//import { Spinner } from "@material-tailwind/react";
import { MutatingDots } from 'react-loader-spinner'

export function DefaultSpinner({ width = 80, height = 80 }) {
  // return <Spinner />
  return <div className='flex justify-center mx-auto w-full h-full'>
  <MutatingDots
  visible={true}
  height="500"
  width="100"
  color="#ba181b"
  secondaryColor="#ba181b"
  radius="15"
  ariaLabel="mutating-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
  </div>
}