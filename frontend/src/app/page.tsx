'use client'
import { useEffect, useState } from 'react';
import { GiRoundStar } from 'react-icons/gi'
import { useLocalStorage } from 'components/useLocalStorage';
import {useRouter} from 'next/navigation'
import axios from 'axios';

interface Error {
  name: string;
  message: string;
}

export default function Home() {
  const router = useRouter()
  const [btnStatus, setBtnStatus] = useState<boolean>(true)
  const [email, setEmail] = useState<string>('')
  const [userEmailLocalStorage, setUserEmailLocalStorage] = useLocalStorage<string>('user_email', '')
  const [userIdLocalStorage, setUserIdLocalStorage] = useLocalStorage<string>('user_id', '')

  const [isValid, setIsValid] = useState<boolean>()
  const [error, setError] = useState<string>()

  useEffect(() => {
    setBtnStatus(false)
    setEmail('')
    setIsValid(false)
    setError('')

    window.localStorage.clear();
  }, [])

  const handleClick = async () => {
    setBtnStatus(current => !current)

    try {
      if(email === undefined || email === '' || email === null) {
      
        setIsValid(false)
        setError('Email must be required!')
  
        setTimeout(() => {
          setBtnStatus(current => !current)
          setError('')
        }, 5000);
        return
      }
  
      const result = await axios.get(`${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}/api/user/${email}`)
      
      if(result.data.status === 'Success' && result.data.message  === 'Found') {
        setIsValid(true)
        setUserEmailLocalStorage(result.data.detail.user_email || '')
        setUserIdLocalStorage(result.data.detail.user_id || '')
  
        setTimeout(() => {
          router.replace('/dashboard', {forceOptimisticNavigation: true})
        }, 500);
      } else {
        setIsValid(false)
        setError('Email does not exist!')
  
        setTimeout(() => {
          setError('')
          setBtnStatus(current => !current)
        }, 3000);
      }
    } catch (error) {
      setIsValid(false)
      setError('Internal Server Error')

      setTimeout(() => {
        setError('')
        setBtnStatus(current => !current)
      }, 3000);
    }

   
  }
  return (
    <div>
      <div className="d-flex flex-column justify-content-center align-items-center mt-5">
        <GiRoundStar 
          size={180}
          className='text-warning'></GiRoundStar>
        <h1 className="text-black fw-bold">AWARD</h1>
      </div>
      <div className="d-flex justify-content-center mt-5">
        <div className="d-flex flex-column align-items-center">
          <h4 className="text-secondary fw-semibold text-center">Enter your email address to sign in and continue</h4>
          <input type="email" className="form-control form-control-lg p-3 mt-2" placeholder="Email Address" aria-label=".form-control-lg email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
          <button onClick={handleClick} disabled={btnStatus} type="button" className={`btn bg-gradient btn-sm btn-md btn-lg  p-3 mt-4 fs-3 fw-normal ${btnStatus ? 'btn-dark' : 'btn-secondary'}`} style={{ width: '220px' }} > Sign In </button>
          <div className="align-items-center"><label className='text-danger my-3 mx-auto fw-semibold fs-4'>{error}</label></div>
        </div>
      </div>
    </div>
  )
}
