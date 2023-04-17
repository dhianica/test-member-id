'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image';
import Loading from 'components/loading';
import dynamic from 'next/dynamic';
import { HiMenuAlt2, HiX } from 'react-icons/hi'
import {IoFilterSharp} from 'react-icons/io5'
import { GiRoundStar } from 'react-icons/gi';
import { useRouter } from 'next/dist/client/components/navigation';
import { formattingNumber } from 'utils/helper.util';

const Award = dynamic(() => import('components/award'), {
  ssr: true,
})

type TPaginate = {
  page: number,
  url: string
}

export default function Home() {
  const router = useRouter()
  const [userId] = useState(typeof window !== "undefined" ? window.localStorage.getItem('user_id')?.replace(/[""]/g, '') || "": "");
  const [data, setData] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [checkedAll, setCheckedAll] = useState<boolean>(true);
  const [pagination, setPagination] = useState<any>();
  const [currentPage, setCurrentPage] = useState<number>();
  const pageSize = 4;

  const [awardType, setAwardType] = useState<any>()
  const [awardTypeFilter, setAwardTypeFilter] = useState({
    awardTypeChecked: [] as any,
    awardTypeId: [] as any,
    awardTypeName: [] as any
  });

  const [minPoinNeed] = useState<number>(10000)
  const [maxPoinNeed, setMaxPoinNeed] = useState<number>(500000)
  
  const [pointNeedFilter, setPointNeedFilter] = useState<number[]>([]);

  
  const getAllAwardType = () => {
    fetch(`${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}/api/award-type`)
    .then((response) => response.json())
    .then((datas) => {
      setAwardType(datas)
      setAwardTypeFilter({
        awardTypeChecked: new Array(datas.detail.length).fill(true),
        awardTypeId: datas.detail.map((x) => x['award_type_id'] ),
        awardTypeName: datas.detail.map((x) => x['award_type_name'] )
      });
    })
  }

  const handleClickMenu = (url) => {
    router.replace(url, { forceOptimisticNavigation: true })
  }

  const handleClickFilter = () => {
    getAllData(userId)
  }

  const handleAwardAllTypeFilter = (e) => {
    const { checked } = e.target;

    const updatedCheckedState = new Array(awardType.detail.length).fill(
      checked
    );
    
    setCheckedAll(checked)
    if (checked) {
      setAwardTypeFilter({
        awardTypeChecked: updatedCheckedState,
        awardTypeId: awardType.detail.map((x) => x['award_type_id'] ),
        awardTypeName: awardType.detail.map((x) => x['award_type_name'] )
      });
    }

    else {
      setAwardTypeFilter({
        awardTypeChecked: new Array(awardType.detail.length).fill(false),
        awardTypeId: [],
        awardTypeName: [] 
      });
    }
  }
  const handleAwardTypeFilterChange = (e, position, name) => {
    // Destructuring
    const { value, checked } = e.target;
    let { awardTypeChecked, awardTypeId, awardTypeName } = awardTypeFilter;

    const updatedCheckedState = awardTypeChecked.map((item, index) => index === position ? !item : item)

    awardTypeId = [...awardTypeId.filter((e) => e !== value)]
    awardTypeName = [...awardTypeName.filter((e) => e !== name)]
    // Case 1 : The user checks the box
    if (checked) {
      setAwardTypeFilter({
        awardTypeChecked: updatedCheckedState,
        awardTypeId: [...awardTypeId, value],
        awardTypeName: [...awardTypeName, name]
      });

      awardTypeId = [...awardTypeId, value]
      awardTypeName = [...awardTypeName, name]
    }
  
    // Case 2  : The user unchecks the box
    else {
      setAwardTypeFilter({
        awardTypeChecked: updatedCheckedState,
        awardTypeId: awardTypeId,
        awardTypeName: awardTypeName
      });
    }

    if(awardType.detail.map((x) => x['award_type_id']).length === awardTypeId.length) {
      setCheckedAll(true)
    } else {
      setCheckedAll(false)
    }
  };

  const handleUpdateAwardTypeFilterChange = () => {
    setAwardTypeFilter({
      awardTypeChecked: new Array(awardType.detail.length).fill(false),
      awardTypeId: [],
      awardTypeName: []
    });
  }

  const handlePoinNeedFilterChange = (e) => {
    const { value } = e.target
    setMaxPoinNeed(value)

    setPointNeedFilter([minPoinNeed, value])
  }

  const handleClearAllFilter = () => {
    setCheckedAll(false)
    setAwardTypeFilter({
      awardTypeChecked: new Array(awardType.detail.length).fill(false),
      awardTypeId: [],
      awardTypeName: []
    });
    setPointNeedFilter([])
  }

  const getAllData = (userId) => {
    fetch(`${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}/api/award/${userId}?page=0&size=${pageSize}${awardTypeFilter.awardTypeId.length > 0 ? '&type=' + awardTypeFilter.awardTypeId.join(',') : ''}${pointNeedFilter.length > 0 ? '&price=' + pointNeedFilter.join(',') : ''}`)
    .then((response) => response.json())
    .then((datas) => {
      setData(datas)
      setIsLoading(false)
      let paginate : TPaginate[] = []
      for (let i = 0; i < datas?.detail?.totalPages; i++) {
        paginate.push({
          page: i,
          url: `${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}/api/award/${userId}?page=${i}&size=${pageSize}${awardTypeFilter.awardTypeId.length > 0 ? '&type=' + awardTypeFilter.awardTypeId.join(',') : ''}${pointNeedFilter.length > 0 ? '&price=' + pointNeedFilter.join(',') : ''}`
        })
      }
      setPagination(paginate)
      setCurrentPage(datas?.detail?.currentPage)
    })
  }

  const handleClickPagination = (url) => { 
    fetch(`${url}`)
    .then((response) => response.json())
    .then((datas) => {
      setData(datas)
      setCurrentPage(datas?.detail?.currentPage)
    })
  }

  useEffect(() => {
    require("../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js");

    getAllAwardType()
    setIsLoading(true)
    getAllData(userId)
  }, [])

  return (
      <div className="container w-100 mt-5">
        <nav className="navbar shadow rounded w-100 fixed-top bg-light ms-auto me-auto">
          <div className="container-fluid">
            <button className="navbar-toggler border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasLeftbar" aria-controls="offcanvasNavbar">
              <HiMenuAlt2 size={36} className='text-black'></HiMenuAlt2>
            </button>
            
            <span className="navbar-brand mb-0 fs-1 text-black">Awards</span>
            
            <button className="navbar-toggler border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRightbar" aria-controls="offcanvasNavbar">
              <IoFilterSharp size={36} className='text-black'></IoFilterSharp>
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
                    <a className="nav-link fw-bold active" aria-current="page" href="#" data-bs-dismiss="offcanvas">Home</a>
                  </li>
                  <li className="nav-item my-3">
                    <a className="nav-link fw-bold" href="#">Cards</a>
                  </li>
                  <li className="nav-item my-3">
                    <a className="nav-link fw-bold" href="#">Profile</a>
                  </li>
                  <li className="nav-item my-3">
                    <a className="nav-link fw-bold" href="#" onClick={() => handleClickMenu('/')}>Logout</a>
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
                {
                  pointNeedFilter.length > 0 ? 
                  <p className='btn btn-outline-primary fw-semibold my-2 fs-6' onClick={(e) => handleUpdateAwardTypeFilterChange()}>
                    Poin: {pointNeedFilter.join(' - ')}
                    <HiX size={16} className='mx-1'></HiX>
                  </p> : ''
                }
                {
                  awardTypeFilter?.awardTypeName.length > 0 ? 
                  <p className='btn btn-outline-primary fw-semibold my-2 fs-6' onClick={(e) => handleUpdateAwardTypeFilterChange()}>
                    Type: {awardTypeFilter?.awardTypeName.join(', ')}
                    <HiX size={16} className='mx-1'></HiX>
                  </p> : ''
                }
                
                {
                  awardTypeFilter?.awardTypeName.length > 0 && pointNeedFilter.length > 0? 
                  <p className='btn btn-outline-primary fw-semibold my-2 fs-6' onClick={handleClearAllFilter}>
                    Clear All Filter <HiX size={16} className='mx-1'></HiX>
                  </p> : ''
                }
                <div className='my-5'>
                  <h5 className="fw-semibold" id="offcanvasNavbarLabel">Poin Needed</h5>
                  <div className='d-flex flex-row mt-3'>
                    <label className="justify-content-start me-auto fw-semibold">{`IDR ${formattingNumber(minPoinNeed)}`}</label>
                    <label className="justify-content-end ms-auto fw-semibold">{`IDR ${formattingNumber(maxPoinNeed)}`}</label>
                  </div>
                  <input type="range" className="form-range" min="10000" max="1000000" value={maxPoinNeed} step="10000" id="customRange3" onChange={(e) => handlePoinNeedFilterChange(e)}/> 
                </div> 
                <hr></hr>

                <h5 className="fw-semibold" id="offcanvasNavbarLabel">Awards Type</h5>  
                <>
                  <div className="form-check" key={'All-Type'}>
                    <input className="form-check-input color-bg-secondary" type="checkbox" value={'All'} id="flexCheckDefault" 
                      onChange={(e) => handleAwardAllTypeFilter(e)} checked={checkedAll}
                    />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                      All Type
                    </label>
                  </div>
                  {
                    awardType?.detail?.map((x: any, index:number) => {
                      return (
                        <div className="form-check" key={index}>
                          <input className="form-check-input color-bg-secondary" type="checkbox" value={x.award_type_id} id="flexCheckDefault" 
                            checked={awardTypeFilter.awardTypeChecked[index]}
                            onChange={(e) => handleAwardTypeFilterChange(e, index, x.award_type_name)}
                          />
                          <label className="form-check-label" htmlFor="flexCheckDefault">
                            {x.award_type_name}
                          </label>
                        </div>
                      )
                    })
                  }
                </>
              <div className="d-grid gap-2 mt-4">
                <button className="btn btn-secondary offcanvas-body border-0 bg-primary align-items-center fs-4" type="button" onClick={handleClickFilter} data-bs-dismiss="offcanvas">Filter</button>
              </div>
            </div>
            </div>
          </div>
        </nav>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className='d-flex flex-column min-vh-75'>
        {
          isLoading ? <Loading></Loading> :
            data?.detail?.items.length > 0 ? 
            <>
                <div className='justify-content-center align-items-center'>
                  {
                    data?.detail?.items.map((x: any) => {
                        return (
                            <div className="d-flex flex-column border-0 justify-content-center ms-auto me-auto my-4" key={x.award_id}>
                              <Award items={x}></Award>
                            </div>
                        )
                    }) 
                  }
                </div>
                <div className="d-flex mt-auto justify-content-center mt-5 py-3">
                  <nav aria-label="Page navigation example">
                    <ul className="pagination pagination-lg">
                      {
                        pagination?.map((x: TPaginate) => {
                          return (
                            <>
                              <li className={`page-item ${currentPage === x.page ? 'active' : '' }`} key={x.url} aria-current="page">
                                <a className={`page-link ${currentPage === x.page ? 'text-white' : 'text-black' }`} href='#' onClick={(e) => {
                                  handleClickPagination(x.url)
                                }}>{x.page+1}
                                </a>
                              </li>
                            </>
                          )
                        })
                      }
                    </ul>
                  </nav>
                </div>
            </>
            :
            <div className="justify-content-center align-items-center">
              <div className="d-flex flex-column border-0 justify-content-center ms-auto me-auto my-4">
                <div className="card w-50 shadow align-self-center border-0">
                    <Image src='/voucher.png' alt="" className="card-img img-responsive" width={500} height={140}></Image>
                    <div className="card-img-overlay">
                      <h2 className="card-text mt-4 text-center justify-content-center">No Awards Found</h2>
                    </div>
                </div>
              </div>
            </div>
        }
        </div>
      </div>
    )
}