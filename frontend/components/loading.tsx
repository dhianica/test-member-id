import '../styles/globals.scss'
import Image from 'next/image'

export default function Loading() {
    return (
        <div className="d-flex flex-column border-0 justify-content-center ms-auto me-auto my-4 text-secondary" role="status">
            <Image 
                src="/loading-blue.gif"
                alt="Tanpa Karet"
                width={120}
                height={100}
                className='position-relative align-self-center'
            ></Image>
        </div>
    )
}