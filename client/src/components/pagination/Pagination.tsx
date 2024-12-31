import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Pagination() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);
    const [totalPage, setTotalPage] = useState(0);
    const getData = async () => {
        const response = await axios.get(`http://localhost:3000/data`, {
            params: { page, limit },
        });
        setData(response.data || []);
        setTotalPage(response.data?.totalPage || 0)
    }

    useEffect(() => {
        getData();

    }, [page, limit])

    const handleNextPagination = () => {
        setPage(prevPage => (totalPage > prevPage ? prevPage + 1 : 1))
    }

    const handlePrevPagination = () => {
        setPage(prevPage => (prevPage > 1 ? prevPage - 1 : totalPage))

    }

    // const handleLimitChange = (e) => {
    //     setLimit(Number(e.event.target))
    // }

    return (
        <>
            {JSON.stringify(data)}
            <div className="flex">
                <a onClick={handlePrevPagination} href="#" className="flex items-center justify-center px-4 h-10 me-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                    </svg>
                    Previous
                </a>
                <a onClick={handleNextPagination} href="#" className="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Next
                    <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a>
                <input type='text' placeholder='limit'
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                    value={limit} onChange={(e) => {
                        setLimit(Number(e.target.value))
                        setPage(1)
                    }}
                />
            </div>
        </>
    )
}
