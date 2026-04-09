import { SearchState } from "@/pages/SearchPage";
import { Restaurant, RestaurantSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetRestaurant = (restaurantId?: string) => {
  const getRestaurantByIdRequest = async (): Promise<Restaurant> => {
    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/${restaurantId}`
    );

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }

    return response.json();
  };

  const { data: restaurant, isLoading } = useQuery(
    "fetchRestaurant",
    getRestaurantByIdRequest,
    {
      enabled: !!restaurantId,
    }
  );

  return { restaurant, isLoading };
};

export const useSearchRestaurants = (
  searchState: SearchState,
  city?: string
) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));
    params.set("sortOption", searchState.sortOption);

    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to get restaurants");
    }

    return data;
  };

  const {
    data: results,
    isLoading,
    error,
    isError,
  } = useQuery<RestaurantSearchResponse, Error>(
    ["searchRestaurants", searchState, city], // Added city to dependency array
    createSearchRequest,
    {
      enabled: !!city,
      staleTime: 60000, // Cache results for 1 minute
      keepPreviousData: false, // Don't keep old results when query changes
      retry: 1, // Only retry once on failure
      onError: (error) => {
        console.error("Search request failed:", error);
      },
    }
  );

  return {
    results,
    isLoading,
    error: isError ? error : null,
  };
};