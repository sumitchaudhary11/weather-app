import React, { useState, useEffect } from 'react';
import Downshift from 'downshift';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { setSearchQuery } from '../store/weatherSlice';
import { getLocationData } from '../utils/getLocationData';
import { SearchIcon } from '@heroicons/react/outline';

const SearchBar: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const localityData = getLocationData();

  const handleSelection = (selectedItem: any) => {
    if (selectedItem) {
      dispatch(setSearchQuery(selectedItem.localityId));
      router.push(`/weather?localityId=${encodeURIComponent(selectedItem.localityId)}&localityName=${encodeURIComponent(selectedItem.localityName)}`);
    }
  };

  const handleSearch = () => {
    if (inputValue.trim() === '') {
      setError('Please enter a search query');
      return;
    }

    const selectedItem = localityData.find(item =>
      item.localityName.toLowerCase().includes(inputValue.toLowerCase())
    );
    if (selectedItem) {
      setError(null); // Clear error if search is successful
      handleSelection(selectedItem);
    } else {
      setError('Locality not found');
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-8">
      <Downshift
        onChange={handleSelection}
        itemToString={(item) => (item ? item.localityName : '')}
        onInputValueChange={(newInputValue) => {
          setInputValue(newInputValue ?? '');
          setError(null); // Clear error when input changes
        }}
      >
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          isOpen,
          inputValue = '',
          highlightedIndex,
        }) => (
          <div className="relative w-full ">
            <div className="flex items-center border border-gray-200 rounded-full bg-white py-2 px-4">
              <SearchIcon className="w-5 h-5 text-gray-500 mr-3" />
              <input
                {...getInputProps({
                  type: 'text',
                  className: 'w-full text-gray-700 focus:outline-none',
                  placeholder: 'Search Weather',
                })}
              />
            </div>
            {error && <p className="text-red-600 text-center mt-2">{error}</p>}
            <ul
              {...getMenuProps()}
              className={`absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto ${
                isOpen ? 'block' : 'hidden'
              }`}
            >
              {isOpen &&
                (inputValue === ''
                  ? localityData
                  : localityData.filter((item) =>
                      item.localityName.toLowerCase().includes((inputValue || '').toLowerCase())
                    )
                ).map((item, index) => (
                  <li
                    key={`${item.localityId}-${index}`}
                    {...getItemProps({
                      index,
                      item,
                      className: `flex items-center p-3 cursor-pointer hover:bg-gray-100 ${
                        highlightedIndex === index ? 'bg-gray-200' : ''
                      }`,
                    })}
                  >
                    {item.localityName}
                  </li>
                ))}
              {/* Search button at the end of the suggestions list */}
              {isOpen && (
                <li className="flex justify-center p-3">
                  <button
                    onClick={handleSearch}
                    className="w-3/2 py-2 px-3 text-black bg-gray-100 hover:outline hover:outline-2 hover:outline-gray-400 focus:outline-none focus:outline-2 focus:outline-solid focus:outline-gray-600 focus:ring-2 mt-4"
                  >
                    Weather Search
                  </button>
                </li>
              )}
            </ul>
            {!isOpen && (
              <div className="flex justify-center">
                <button
                  onClick={handleSearch}
                  className="w-3/2 py-2 px-3 text-black bg-gray-100 hover:outline hover:outline-2 hover:outline-gray-400 focus:outline-none focus:outline-2 focus:outline-solid focus:outline-gray-600 focus:ring-2 mt-4"
                >
                  Weather Search
                </button>
              </div>
            )}
          </div>
        )}
      </Downshift>
    </div>
  );
};

export default SearchBar;
