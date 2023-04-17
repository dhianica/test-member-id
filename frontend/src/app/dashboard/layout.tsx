'use client'
import { useEffect } from 'react';
import '../../../styles/globals.scss'
import { HiMenuAlt2, HiOutlineFilter } from 'react-icons/hi'
import { GiRoundStar } from 'react-icons/gi';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  const router = useRouter()
  useEffect(() => {
    require("../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  
  const handleClick = (url) => {
    router.replace(url, { forceOptimisticNavigation: true })
  }
  return (
    <main>
      <nav className="navbar shadow rounded w-100 fixed-top bg-light ms-auto me-auto">
        <div className="container-fluid">
          <button className="navbar-toggler border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasLeftbar" aria-controls="offcanvasNavbar">
            <HiMenuAlt2 size={36} className='text-secondary'></HiMenuAlt2>
          </button>
          
          <span className="navbar-brand mb-0 fs-1">Awards</span>
          
          <button className="navbar-toggler border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRightbar" aria-controls="offcanvasNavbar">
            <HiOutlineFilter size={36} className='text-secondary'></HiOutlineFilter>
          </button>


          <div className="offcanvas offcanvas-start p-5" tabIndex={-1} id="offcanvasLeftbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <div className="offcanvas-title d-flex flex-column justify-content-start align-items-start mt-5" id="offcanvasNavbarLabel">
                <GiRoundStar 
                  size={140}
                  className='text-warning'>
                </GiRoundStar>
                  
                  <span className='fs-3 fw-bold mt-4'>Awards Menu</span>
              </div>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item my-3">
                  <a className="nav-link fw-bold active" aria-current="page" href="#">Home</a>
                </li>
                <li className="nav-item my-3">
                  <a className="nav-link fw-bold" href="#">Cards</a>
                </li>
                <li className="nav-item my-3">
                  <a className="nav-link fw-bold" href="#">Profile</a>
                </li>
                <li className="nav-item my-3">
                  <a className="nav-link fw-bold" href="#" onClick={() => handleClick('/')}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="offcanvas offcanvas-end p-5" tabIndex={-1} id="offcanvasRightbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <h2 className="offcanvas-title fw-bold" id="offcanvasNavbarLabel">Filter</h2>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body min-vh-25">
              
              <h5 className="fw-semibold" id="offcanvasNavbarLabel">Poin Needed</h5>
              <form className="d-flex mt-3" role="search">
                <input type="range" className="form-range" min="0" max="5" step="0.5" id="customRange3" />  
              </form>

              <hr></hr>

              <h5 className="fw-semibold" id="offcanvasNavbarLabel">Awards Type</h5>  
              <div className="form-check">
                <input className="form-check-input color-bg-secondary" type="checkbox" value="" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  All Type
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input color-bg-secondary" type="checkbox" value="" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  All Type
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input color-bg-secondary" type="checkbox" value="" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  All Type
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input color-bg-secondary" type="checkbox" value="" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  All Type
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input color-bg-secondary" type="checkbox" value="" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  All Type
                </label>
              </div>
            </div>

            <div className="d-grid gap-2 mt-auto">
              <button className="btn btn-secondary offcanvas-body border-0 bg-primary align-items-center" type="button" onClick={handleClick}>Button</button>
            </div>
          </div>
        </div>
      </nav>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      {children}
    </main>
  )
}
