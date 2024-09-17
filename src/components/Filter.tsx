import React from 'react'

interface Props {
  categories: string[],
  selectedCategory: string | null,
  setSelectedCategory: React.Dispatch<React.SetStateAction<string|null>>
}

const Filter = (props: Props) => {

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setSelectedCategory(event.target.value);
  };

  const handleAllClick = () => {
    props.setSelectedCategory(null); // Clear the selection
  };


  return (
    <aside id="default-sidebar" className="hidden md:block fixed top-0 left-0 z-40 md:w-32 lg:w-64 h-full bg-gray-50 dark:bg-gray-800 transition-transform -translate-x-full sm:translate-x-0">
      <div className="h-full px-3 py-4 overflow-y-auto">
        <ul className="mt-16 space-y-2 font-medium">
          <li>
            <div className="p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <h1 className='text-xl lg:text-4xl text-center'>Filter</h1>
            </div>
          </li>

          <li>
            <div className="p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <h1 className='text-xl lg:text-2xl text-center'>Category</h1>
            </div>
          </li>

          <li>
            <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
              <input 
                id="bordered-radio-all" 
                type="radio" 
                value="All" 
                name="category" // Same name for all radio buttons in the group
                checked={props.selectedCategory === null} // Check if "All" is selected
                onChange={() => props.setSelectedCategory(null)} // Handle change event
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label 
                htmlFor="bordered-radio-all" 
                className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                All
              </label>
            </div>
          </li>

          {props.categories.map((category, index) => (
            <li key={index}>
              <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                <input 
                  id={`bordered-radio-${index}`} 
                  type="radio" 
                  value={category} 
                  name="category" // Same name for all radio buttons in the group
                  checked={props.selectedCategory === category} // Check if this radio button is selected
                  onChange={handleRadioChange} // Handle change event
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label 
                  htmlFor={`bordered-radio-${index}`} 
                  className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {category}
                </label>
              </div>
            </li>
          ))}

        </ul>
      </div>
    </aside>
  )
}

export default Filter
function setSelectedCategory(value: string) {
  throw new Error('Function not implemented.');
}

