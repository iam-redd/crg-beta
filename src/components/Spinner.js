//import { Spinner } from "@material-tailwind/react";
import { CirclesWithBar } from 'react-loader-spinner'

export function DefaultSpinner({ width = 80, height = 80 }) {
  // return <Spinner />
  return <CirclesWithBar
    height={`${height}`}
    width={`${width}`}
    color="#4fa94d"
    outerCircleColor="#4fa94d"
    innerCircleColor="#4fa94d"
    barColor="#4fa94d"
    ariaLabel="circles-with-bar-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
  />
}