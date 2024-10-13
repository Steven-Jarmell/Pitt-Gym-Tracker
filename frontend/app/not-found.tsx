import Image from "next/image"
import RocPic from "@/images/roc.png"

export default function Custom404() {
  return (
    <div className="flex flex-col justify-center items-center bg-[#040D12] h-[100vh] w-[100vw]">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <p className="text-base font-semibold leading-8 text-white">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Page not found
        </h1>
        <div className="mt-10 flex justify-center">
          <a href="/" className="text-sm font-semibold leading-7 text-white">
            <span aria-hidden="true">&larr;</span> Back to home
          </a>
        </div>
      </div>
      <Image
        src={RocPic}
        alt="Picture of Roc <3"
        className="w-[80vw] sm:w-[70vw] lg:w-[40vw]"
        priority
      />
    </div>
  )
}
