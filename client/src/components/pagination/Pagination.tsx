import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDebounce } from '../../hooks/useDebounce';

export default function Pagination() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState(5);
    const [limit, setLimit] = useState(5);
    const [totalPage, setTotalPage] = useState(0);
    const debouncedValue = useDebounce(searchText, 1000);
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

    type Direc = 'prev' | 'next'

    // interface Direction {
    //     direction: 'prev' | 'next'
    // }

    // const handlePagination = (direction: Direction['direction']) => {

    const handlePagination = (direction: Direc) => {
        setPage((currentPage) => {
            if (direction === 'next') {
                return currentPage < totalPage ? currentPage + 1 : 1
            } else if (direction === 'prev') {
                return currentPage > 1 ? currentPage - 1 : totalPage
            }
            return currentPage
        })
    }

    useEffect(() => {
        if (debouncedValue) {
            console.log("Searching for:", debouncedValue);
            setLimit(debouncedValue)
        }
    }, [debouncedValue]);

    // const debounce = <T extends (...args: any[]) => void>(func: T, delay: number): T => {
    //     let timer: number;
    //     return ((...args: Parameters<T>) => {
    //         clearTimeout(timer);
    //         timer = setTimeout(() => func(...args), delay);
    //     }) as T;
    // };

    // const handleLimitChange = debounce((value: number) => {
    //     setLimit(value);
    //     setPage(1);
    // }, 500);

    return (
        <>
            <div className="flex">
                <a onClick={() => handlePagination('prev')} href="#" className="flex items-center justify-center px-4 h-10 me-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                    </svg>
                    Previous
                </a>
                <a onClick={() => handlePagination('next')} href="#" className="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Next
                    <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a>
                <input type='text' placeholder='limit'
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                    value={searchText}
                    // onChange={(e) => handleLimitChange(Number(e.target.value))}
                    onChange={(e) => {
                        setSearchText(Number(e.target.value))
                        // setPage(1)
                    }}
                />
            </div>
            {JSON.stringify(data)}
        </>
    )
}
