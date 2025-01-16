import React, { useRef } from "react";

const CategoryScroll = ({ currentTab, categories, category, setCategory }) => {
  const categoriesRef = useRef(null);

  return (
    <div className="relative">
      {/* Scroll Buttons */}
      {categories.length > 0 && (
        <>
          <div className="absolute inset-y-0 left-0 flex items-center">
            <button
              className="bg-black text-white px-2 py-1 rounded-full"
              onClick={() => {
                if (categoriesRef.current) {
                  categoriesRef.current.scrollBy({ left: -150, behavior: "smooth" });
                }
              }}
            >
              &#8592;
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button
              className="bg-black text-white px-2 py-1 rounded-full"
              onClick={() => {
                if (categoriesRef.current) {
                  categoriesRef.current.scrollBy({ left: 150, behavior: "smooth" });
                }
              }}
            >
              &#8594;
            </button>
          </div>
        </>
      )}

      {/* Categories List */}
      <div
        ref={categoriesRef}
        className="flex items-center bg-black gap-x-2 overflow-x-auto px-4 py-2 scrollbar-hide"
      >
        {currentTab === 0
          ? ""
          : categories.length > 0
          ? categories.map((categoryItem, index) => (
              <p
                key={index}
                className={`font-medium uppercase hover:border-b text-xs px-4 py-1 rounded-[20px] whitespace-nowrap cursor-pointer transition-all duration-700 ease-in-out text-white ${
                  category === categoryItem.category
                    ? "border-yellow-400 border"
                    : "border-r border-gray-100"
                }`}
                onClick={() => setCategory(categoryItem.category)}
              >
                {categoryItem.category}
              </p>
            ))
          : ""}
      </div>
    </div>
  );
};

export default CategoryScroll;
