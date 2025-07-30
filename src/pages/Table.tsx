import { useEffect, useState } from "react";
import { getDataAPI } from "../api/getDataAPI";

interface Artwork {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string | null;
  inscriptions: string;
  date_start: string;
  date_end: string;
}

// interface ArtApiResponse {
//   data: Artwork[];
//   pagination: {
//     total: number;
//     limit: number;
//     offset: number;
//     total_pages: number;
//     current_page: number;
//     next_url: string | null;
//   };
// }

const Table = () => {

  const [data, setData] = useState<Artwork[]>([]);
  const [loader, setLoader] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const getDataFunc = (page: number, limit: number) => {
      setLoader(true);
      getDataAPI(page, limit).then((res: any) => {
        if (res.status === 200) {
          setLoader(false);
          setData(res?.data?.data);
          setTotalPages(Number(res?.data?.pagination?.total_pages));
        } else {
          setLoader(false);
          console.log("Data Fetching Failed!");
        }
      });
    };
    getDataFunc(page, limit);
  }, [page, limit]);


  // const getDataFunc = async (page: number, limit: number) => {
  //   setLoader(true);
  //   const res = await getDataAPI(page, limit);

  //   if (res && res.status === 200) {
  //     const responseData = res.data as APIResponse;
  //     setData(responseData.data);
  //     setTotalPages(responseData.pagination.total_pages);
  //   } else {
  //     console.error("Data fetching failed.");
  //   }
  //   setLoader(false);
  // };

  // useEffect(() => {
  //   getDataFunc(page, limit);
  // }, [page, limit]);

  return (
    <div className="relative sm:rounded-lg p-3 w-full h-full" id="movetop">
      {loader ? (
        <div className="flex justify-center items-center w-full h-full overflow-hidden">
          <p>Loading....</p>
        </div>
      ) : (
        <>
          <center> <p className="text-2xl">ARTISTS</p> </center>
          <div className="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-x-auto m-3">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-all-search"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        disabled
                      />
                      <label htmlFor="checkbox-all-search" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Place of Origin
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Artist
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Inscription
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Start Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    End Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {data && data.length > 0
                  ? data.map((item, index) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      key={index}
                    >
                      <td className="w-4 p-4">
                        <div className="flex items-center">
                          <input
                            id="checkbox-table-search-1"
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            disabled
                          />
                          <label
                            htmlFor="checkbox-table-search-1"
                            className="sr-only"
                          >
                            checkbox
                          </label>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-base font-semibold">
                        {item?.title || "—"}
                      </td>

                      <td className="px-6 py-4">
                        {item?.place_of_origin || "—"}
                      </td>

                      <td className="px-6 py-4">
                        {item?.artist_display || "—"}
                      </td>

                      <td className="px-6 py-4">
                        {item?.inscriptions || "—"}
                      </td>

                      <td className="px-6 py-4">
                        {item?.date_start || "—"}
                      </td>

                      <td className="px-6 py-4">
                        {item?.date_end || "—"}
                      </td>
                    </tr>
                  ))
                  : null}
              </tbody>
            </table>
          </div>

          {data && data.length > 0 ? null : (
            <div className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 flex justify-center">
              <h1 className="p-3">No Data Found</h1>
            </div>
          )}

          <div
            className="flex flex-row justify-end p-2 bg-white dark:bg-gray-800 rounded-bl-lg rounded-br-lg"
            id="flextorow"
          >
            <a
              className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              id="toogle"
            >
              Rows per page
            </a>

            <div className="flex items-center justify-center leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <select
                name="rowsperpage"
                id="rowsperpage"
                className="pt-1 pb-1 pl-3 pr-7 border border-gray-300 rounded"
                value={limit}
                onChange={(e) => {
                  setLimit(Number(e.target.value));
                }}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="75">75</option>
                <option value="100">100</option>
              </select>
            </div>

            {data.length > 0 ? (
              <a className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                {/* {page} of {Math.ceil(totalPosts / postsPerPage)} */}
                {page} of {Math.ceil(totalPages)}
              </a>
            ) : (
              <a className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                0 of 0
              </a>
            )}

            <nav aria-label="Page navigation example">
              <ul className="inline-flex -space-x-px text-sm">
                <li>
                  <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="px-3 h-8 border rounded-l-lg bg-white text-gray-500 hover:bg-gray-100 disabled:opacity-50 dark:bg-gray-800 dark:text-gray-400 cursor-pointer"
                  >
                    Previous
                  </button>
                </li>

                <li>

                  <button
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages || totalPages === 0}
                    className="px-3 h-8 border rounded-r-lg bg-white text-gray-500 hover:bg-gray-100 disabled:opacity-50 dark:bg-gray-800 dark:text-gray-400 cursor-pointer"
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default Table;



// import { useEffect, useState } from "react";
// import axios from "axios";

// const Table = () => {
//   const [data, setData] = useState([]);
//   const [loader, setLoader] = useState(true);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);

//   const getDataFunc = async (page: number) => {
//     try {
//       setLoader(true);
//       const res = await axios.get(
//         `https://api.artic.edu/api/v1/artworks?page=${page}&limit=12`
//       );
//       if (res.status === 200) {
//         setData(res.data.data);
//         setTotalPages(res.data.pagination.total_pages);
//       } else {
//         console.log("Error fetching data.");
//       }
//     } catch (err) {
//       console.error("Fetch error:", err);
//     } finally {
//       setLoader(false);
//     }
//   };

//   useEffect(() => {
//     getDataFunc(page);
//   }, [page]);

//   return (
//     <div className="relative sm:rounded-lg p-3 w-full h-full" id="movetop">
//       {loader ? (
//         <div className="flex justify-center items-center w-full h-full overflow-hidden">
//           <p>Loading....</p>
//         </div>
//       ) : (
//         <>
//           <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
//             <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//               <tr>
//                 <th className="px-6 py-3">ID</th>
//                 <th className="px-6 py-3">Title</th>
//                 <th className="px-6 py-3">Artist</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((item: any) => (
//                 <tr
//                   key={item.id}
//                   className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
//                 >
//                   <td className="px-6 py-4">{item.id}</td>
//                   <td className="px-6 py-4">{item.title}</td>
//                   <td className="px-6 py-4">{item.artist_display || "—"}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <div className="flex justify-end items-center gap-4 mt-4">
//             <button
//               disabled={page === 1}
//               onClick={() => setPage((prev) => prev - 1)}
//               className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//             >
//               Previous
//             </button>
//             <span>
//               Page {page} of {totalPages}
//             </span>
//             <button
//               disabled={page === totalPages}
//               onClick={() => setPage((prev) => prev + 1)}
//               className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Table;

