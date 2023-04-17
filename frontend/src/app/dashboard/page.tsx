'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image';
import Award from 'components/award';
import Loading from 'components/loading';

type TPaginate = {
  page: number,
  url: string
}

export default function Home() {
  const [userId] = useState(typeof window !== "undefined" ? window.localStorage.getItem('user_id')?.replace(/[""]/g, '') || "": "");
  const [data, setData] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [totalItem, setTotalItem] = useState<number>();
  const [pagination, setPagination] = useState<any>();
  const [currentPage, setCurrentPage] = useState<number>();
  const pageSize = 3;


  const getAllData = (userId, page=0, size=3, type?) => {
    fetch(`${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}/api/award/${userId}?page=${page}&size=${size}${type != null ? '&type=' + type : ''}`)
    .then((response) => response.json())
    .then((datas) => {
      setData(datas)
      setIsLoading(false)
      let paginate : TPaginate[] = []
      for (let i = 0; i < datas?.detail?.totalPages; i++) {
        paginate.push({
          page: i,
          url: `${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}/api/award/${userId}?page=${i}&size=${pageSize}`
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
    setIsLoading(true)
    getAllData(userId)
  }, [])

  return (
      <div className="container w-100 mt-5">
        {
          isLoading ? <Loading></Loading> :
            data?.detail?.items.length > 0 ? 
            <>
                {
                  data?.detail?.items.map((x: any, index: number) => {
                      return (
                          <div className="d-flex flex-column border-0 justify-content-center ms-auto me-auto my-4" key={x.id}>
                            <Award key={index} items={x}></Award>
                          </div>
                      )
                  }) 
                }
                <nav aria-label="Page navigation example">
                  <ul className="pagination pagination-lg justify-content-center mt-5">
                    <li className="page-item"><a className="page-link text-black" href="#" key={'previous'}>Previous</a></li>
                    {
                      pagination?.map((x: TPaginate, index: number) => {
                        return (
                          <>
                            <li className="page-item" key={x.page}>
                              <a className="page-link text-black" href='#' onClick={(e) => {
                                handleClickPagination(x.url)
                              }}>{x.page+1}
                              </a>
                            </li>
                          </>
                        )
                      })
                    }
                    
                    <li className="page-item"><a className="page-link text-black" href="#" key={'next'}>Next</a></li>
                  </ul>
                </nav>
            </>
            :
            <div className="d-flex flex-column border-0 justify-content-center ms-auto me-auto my-4">
              <div className="card w-50 shadow align-self-center border-0">
                  <Image src="/voucher.png" alt="" className="card-img img-responsive" width={500} height={140}></Image>
                  <div className="card-img-overlay">
                    <h2 className="card-text mt-4 text-center justify-content-center">No Awards Found</h2>
                  </div>
              </div>
            </div>
        }
      </div>
    )
}