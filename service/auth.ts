import axios from "axios";
import {
  QueryFunctionContext,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { useMemo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_API_URL = "https://api.themoviedb.org/3/";

const API = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTViNjg3OGNjY2VlYzRkNGJmNDA3YWRjY2RkZTI5NiIsInN1YiI6IjY1ZDFmMTllZjk0NzViMDE4NmRhZjNiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-92SO7sNr4vitVaGbpOolMsVRISc4Ihe2HvV4KYe-wY",
  },
});

export const getTrailerByMovieId = async (id: string) => {
  const data = await API.get(`movie/${id}/videos`);
  return data;
};

export const getLanaguges = async () => {
  const data = await API.get(`configuration/languages`);
  return data;
};

export const getGenres = async () => {
  const data = await API.get(`genre/movie/list`);
  return data;
};

export const getKeywords = async (keyword: string) => {
  const data = await API.get(`search/keyword?query=${keyword}`);
  return data;
};

export const movieList = ({
  pageParam = 1,
  queryKey,
}: QueryFunctionContext<(Record<string, any> | undefined | string)[], any>) => {
  try {
    if (typeof queryKey[1] === "object") {
      // const filter = queryKey[1]?.filters;
      const queryParams = {
        sort_by: queryKey[1]?.sortByValue,
        // with_keywords: filter?.keywords,
        // with_original_language: filter?.language,
        // with_genres: filter?.genres,
        // certification: filter?.certification,
      };
      const queryString = Object.entries(queryParams)
        .filter(
          ([_, value]) => value !== undefined && value !== null && value !== ""
        )
        .map(([key, value]) => `${key}=${value}`)
        .join("&");
      const response = API.get(`discover/movie?${queryString}`);
      console.warn(response);
      // await AsyncStorage.setItem("movieData", JSON.stringify(response.data));
      return response ;
    } else return API.get(`discover/movie?page=${pageParam}`);
  } catch (error) {
    console.error("Error fetching movie data:", error);
    throw new Error("Failed to fetch movie data");
  }
};

export const useInfiniteMovies = (q?: Record<string, any>) => {
  const queryKey = useMemo(() => ["movies", q], [q]);
  return useInfiniteQuery({
    queryKey: queryKey,
    queryFn: movieList,
    getNextPageParam: (lastPage: any) => {
      const pageDataLen = lastPage?.data?.results?.length;
      const totalPages = lastPage?.data?.total_pages;
      const currentPage = lastPage?.data?.page;
      if (pageDataLen < totalPages) {
        return currentPage + 1;
      }
      return null;
    },
    getPreviousPageParam: (currentPage: any) => {
      const prevPage = currentPage?.data?.page - 1;
      if (prevPage > 0) {
        return prevPage;
      }
      return null;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useMovieTrailer = (movieId: string) => {
  return useQuery({
    queryKey: ["movie-video", movieId],
    queryFn: () => getTrailerByMovieId(movieId),
    staleTime: 15 * 60 * 1000,
  });
};

export const useLanguages = () => {
  return useQuery({
    queryKey: ["languages"],
    queryFn: getLanaguges,
    staleTime: 15 * 60 * 1000,
  });
};

export const useGenres = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
    staleTime: 15 * 60 * 1000,
  });
};

export const useKeywords = (keyword: string) => {
  return useQuery({
    queryKey: ["keywords", keyword],
    queryFn: () => getKeywords(keyword),
    staleTime: 15 * 60 * 1000,
  });
};
