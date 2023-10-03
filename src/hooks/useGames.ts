import { useInfiniteQuery } from '@tanstack/react-query';
import ms from 'ms';
import APIClient from '../services/api-client';
import useGameQueryStore from '../store';
import { FetchResponse } from './../services/api-client';
import { Platform } from './usePlatforms';

const apiClient = new APIClient<Game>('/games');

export interface Game {
  id: string;
  name: string;
  background_image: string;
  metacritic: number;
  parent_platforms: {
    platform: Platform;
  }[];
  rating_top: number;
}

const useGames = () => {
  const gameQuery = useGameQueryStore(state => state.gameQuery);
  return useInfiniteQuery<FetchResponse<Game>, Error>({
    queryKey: ['/games', gameQuery],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getAll({
        params: {
          genres: gameQuery.genreId,
          parent_platforms: gameQuery.platformId,
          ordering: gameQuery.sortOrder,
          search: gameQuery.searchText,
          page: pageParam,
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    staleTime: ms('24h'),
  });
};

export default useGames;
