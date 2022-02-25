import React, {useEffect, useState, useMemo} from 'react';
import Pagination1 from 'react-js-pagination';
import Header from '../Header';
import {TableHeader, Search} from '../DataTable';
import useFullPageLoader from '../../hooks/useFullPageLoader';
// import ExternalInfo from "components/ExternalInfo";
// import AppConfig from "App.config";
function countpage(totalItems, ITEMS_PER_PAGE) {
    let result;
    if (totalItems % ITEMS_PER_PAGE === 0) {
        result = totalItems / ITEMS_PER_PAGE;
    } else {
        result = parseInt(totalItems / ITEMS_PER_PAGE + 1, 10);
    }
    return result;
}
const DataTable = () => {
    const [comments, setComments] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [sorting, setSorting] = useState({field: '', order: ''});

    const ITEMS_PER_PAGE = 10;

    const headers = [
        {name: 'ID', field: 'otteid', sortable: true},
        {name: '제목', field: 'title', sortable: true},
        {name: '개봉일', field: 'release_date', sortable: true},
        {name: '러닝타임', field: 'runtime', sortable: true},
        {name: '평점', field: 'popularity', sortable: true},
        {name: '국가', field: 'original_language', sortable: true}
    ];

    useEffect(() => {
        const getData = () => {
            showLoader();

            fetch('http://localhost:8000/apimovie/')
                .then((response) => response.json())
                .then((json) => {
                    hideLoader();
                    setComments(json);
                    // console.log(json);
                });
        };

        getData();
    }, []);

    const commentsData = useMemo(() => {
        let computedComments = comments;

        if (search) {
            computedComments = computedComments.filter((comment) =>
                comment.title.toLowerCase().includes(search.toLowerCase())
            );
        }
        setTotalItems(computedComments.length);
        if (sorting.field) {
            console.log(sorting.field);
            console.log(typeof sorting.field);
            console.log(typeof field);
            console.log(sorting.order);
            const reversed = sorting.order === 'asc' ? 1 : -1;
            computedComments = computedComments.sort(
                (a, b) =>
                    reversed *
                    String(a[sorting.field]).localeCompare(
                        String(b[sorting.field])
                    )
            );
        }
        return computedComments.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );
    }, [comments, currentPage, search, sorting]);

    return (
        <>
            <Header title="OTTE DATA SEARCH TABLE" />

            <div className="row w-100">
                <div className="col mb-3 col-12 text-center">
                    <div className="row">
                        <div className="col-md-6">
                            <Pagination1
                                activePage={currentPage}
                                itemsCountPerPage={ITEMS_PER_PAGE}
                                totalItemsCount={totalItems}
                                pageRangeDisplayed={5}
                                prevPageText="‹"
                                nextPageText="›"
                                onChange={(page) => setCurrentPage(page)}
                            />
                            총 {totalItems}개 데이터,{'  '}
                            {countpage(totalItems, ITEMS_PER_PAGE)} 페이지
                        </div>
                        <div className="col-md-6 d-flex flex-row-reverse">
                            <Search
                                onSearch={(value) => {
                                    setSearch(value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>
                    </div>

                    <table className="table table-striped">
                        <TableHeader
                            headers={headers}
                            onSorting={(field, order) =>
                                setSorting({field, order})
                            }
                        />
                        <tbody>
                            {commentsData.map((comment) => (
                                <tr>
                                    <th scope="row" key={comment.otteid}>
                                        {comment.otteid}
                                    </th>
                                    <td>{comment.title}</td>
                                    <td>{comment.release_date}</td>
                                    <td>{comment.runtime}</td>
                                    <td>{comment.popularity}</td>
                                    <td>{comment.original_language}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {loader}
        </>
    );
};

export default DataTable;
