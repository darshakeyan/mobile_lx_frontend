import axios from "axios";
import {
  QueryFunctionContext,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";

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

export const movieList = ({
  pageParam = 1,
  queryKey,
}: QueryFunctionContext<(Record<string, any> | undefined | string)[], any>) => {
  if (typeof queryKey[1] === "object") {
    return API.get(
      `discover/movie?page=${pageParam}&sort_by=${queryKey[1]?.sortBy}`
    );
  } else return API.get(pageParam);
};

export const useInfiniteMovies = (q?: Record<string, any>) => {
  return useInfiniteQuery({
    queryKey: ["movies", q],
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
