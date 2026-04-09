import { useSearchRestaurants } from "@/api/RestaurantApi";
import CuisineFilter from "@/components/CuisineFilter";
import LottieAnimation from "@/components/Load";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Fetch results based on searchState and city
  const { results, isLoading, error } = useSearchRestaurants(searchState, city);

  // Update sort option
  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }));
  };

  // Update selected cuisines
  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }));
  };

  // Update page number
  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  // Update search query
  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };

  // Reset search query
  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1,
    }));
  };

  // Handle loading and city check
  if (isLoading || !city) {
    return <LottieAnimation />;
  }

  // If no results are found
  const missing =  (error: Error) => {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <span className="text-xl text-gray-600">
          {error.message || "Something went wrong"}
        </span>
        <button
          onClick={() => window.location.reload()}
          className="text-purple-600 hover:text-purple-700"
        >
          Try again
        </button>
      </div>
    );
  }

  const noRestarant = () => {
    return (
      <div className="flex justify-center items-center min-h-[200px] text-gray-600">
        No restaurants found matching your criteria
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={() =>
            setIsExpanded((prevIsExpanded) => !prevIsExpanded)
          }
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder="Search by Cuisine or Restaurant Name"
          onReset={resetSearch}
        />
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <SearchResultInfo
            total={
              (!results?.data || results.data.length === 0 || error)
                ? 0
                : results.pagination.total
            }
            city={city}
          />
          <SortOptionDropdown
            sortOption={searchState.sortOption}
            onChange={(value) => setSortOption(value)}
          />
        </div>
        {!results?.data || results.data.length === 0
          ? noRestarant()
          : (error) ? missing(error) : (results.data.map((restaurant) => (
              <SearchResultCard key={restaurant._id} restaurant={restaurant} />
            )))}

        {results && <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />}
      </div>
    </div>
  );
};

export default SearchPage;
