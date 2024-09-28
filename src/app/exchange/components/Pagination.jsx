import React from 'react'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';

export default function Pagination({ pageNumber, handleNextPage, handlePrevPage, isLastPage, goToPage ,totals}) {
  return (
    <div className="flex justify-between w-full gap-x-2 items-center mt-4">
      <div className="flex items-center justify-end">
        {

          <p className="flex items-center justify-between px-2 py-1 p_1_sm bg-gradient-to-r from-orange-900 to-orange-500 text-white font-bold  rounded">
            Page {pageNumber}
          </p>
        }
      </div>
      <div className="flex items-center gap-x-2">
        {
          pageNumber > 4 &&
          <button onClick={() => goToPage(1)} className="flex items-center justify-between px-2 py-1 p_1_sm bg-gradient-to-r from-orange-900 to-orange-500 text-white font-bold  rounded">
            <KeyboardArrowLeftRoundedIcon className="text-white" fontSize="small" />
            First
          </button>
        }
        {
          pageNumber > 1 &&
          <button onClick={handlePrevPage} disabled={pageNumber === 1} className="flex items-center justify-between px-2 py-1  p_1_sm bg-gradient-to-r from-orange-900 to-orange-500 text-white font-bold  rounded">
            <KeyboardArrowLeftRoundedIcon className="text-white" fontSize="small" />
            {pageNumber > 1 && pageNumber - 1}
          </button>
        }

        {
          !isLastPage &&
          <button onClick={handleNextPage} className="flex items-center justify-between px-2 py-1  p_1_sm bg-gradient-to-r from-orange-900 to-orange-500 text-white font-bold  rounded">
            Next
            <KeyboardArrowRightRoundedIcon className="text-white" fontSize="small" />
          </button>
        }
      </div>
    </div>

    // <div className="pagination">
    //   <nav aria-label="Page navigation example">
    //     <ul class="inline-flex -space-x-px text-sm">
    //       <li>
    //         <a
    //           href="#"
    //           class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
    //         >
    //           Previous
    //         </a>
    //       </li>
    //       <li>
    //         <a
    //           href="#"
    //           class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
    //         >
    //           1
    //         </a>
    //       </li>
    //       <li>
    //         <a
    //           href="#"
    //           class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
    //         >
    //           2
    //         </a>
    //       </li>
    //       <li>
    //         <a
    //           href="#"
    //           aria-current="page"
    //           class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
    //         >
    //           3
    //         </a>
    //       </li>
    //       <li>
    //         <a
    //           href="#"
    //           class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
    //         >
    //           4
    //         </a>
    //       </li>
    //       <li>
    //         <a
    //           href="#"
    //           class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
    //         >
    //           5
    //         </a>
    //       </li>
    //       <li>
    //         <a
    //           href="#"
    //           class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
    //         >
    //           Next
    //         </a>
    //       </li>
    //     </ul>
    //   </nav>
    // </div>
  );
}
