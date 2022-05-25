import React from "react";

function TableCard() {
  return (
    <React.Fragment>
      <div className="pb-2 flex items-center justify-between text-gray-600 dark:text-gray-400 border-b dark:border-gray-600">
        {/* <!-- Header --> */}
      </div>
      <div className="mt-6 flex justify-between text-gray-600 dark:text-gray-400">
        {/* <!-- List sorting --> */}

        <div className="ml-10 pl-2 flex capitalize">
          {/* <!-- Left side --> */}
          <span className="ml-8 flex items-center">
            name
            <svg
              className="ml-1 h-5 w-5 fill-current text-green-500 dark:text-green-200"
              viewBox="0 0 24 24"
            >
              <path d="M18 21l-4-4h3V7h-3l4-4 4 4h-3v10h3M2 19v-2h10v2M2 13v-2h7v2M2 7V5h4v2H2z"></path>
            </svg>
          </span>
          <span className="ml-24 flex items-center">
            login
            <svg className="ml-1 h-5 w-5 fill-current" viewBox="0 0 24 24">
              <path d="M18 21l-4-4h3V7h-3l4-4 4 4h-3v10h3M2 19v-2h10v2M2 13v-2h7v2M2 7V5h4v2H2z"></path>
            </svg>
          </span>
        </div>

        <div className="mr-12 flex capitalize">
          {/* <!-- Right side --> */}

          <span className="mr-16 pr-1 flex items-center">
            project
            <svg className="ml-1 h-5 w-5 fill-current" viewBox="0 0 24 24">
              <path
                d="M18 21l-4-4h3V7h-3l4-4 4 4h-3v10h3M2
								19v-2h10v2M2 13v-2h7v2M2 7V5h4v2H2z"
              ></path>
            </svg>
          </span>

          <span className="mr-16 pr-2 flex items-center">
            role
            <svg className="ml-1 h-5 w-5 fill-current" viewBox="0 0 24 24">
              <path
                d="M18 21l-4-4h3V7h-3l4-4 4 4h-3v10h3M2
								19v-2h10v2M2 13v-2h7v2M2 7V5h4v2H2z"
              ></path>
            </svg>
          </span>

          <span className="mr-12 flex items-center">
            status
            <svg className="ml-1 h-5 w-5 fill-current" viewBox="0 0 24 24">
              <path
                d="M18 21l-4-4h3V7h-3l4-4 4 4h-3v10h3M2
								19v-2h10v2M2 13v-2h7v2M2 7V5h4v2H2z"
              ></path>
            </svg>
          </span>
          <span className="mr-16 flex items-center">
            date
            <svg className="ml-1 h-5 w-5 fill-current" viewBox="0 0 24 24">
              <path
                d="M18 21l-4-4h3V7h-3l4-4 4 4h-3v10h3M2
								19v-2h10v2M2 13v-2h7v2M2 7V5h4v2H2z"
              ></path>
            </svg>
          </span>
        </div>
      </div>
    </React.Fragment>
  );
}

export default TableCard;
