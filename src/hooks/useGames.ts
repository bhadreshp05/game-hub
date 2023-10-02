import { useQuery } from '@tanstack/react-query';
import APIClient from '../services/api-client';
import { GameQuery } from './../App';
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

const useGames = (gameQuery: GameQuery) =>
  useQuery<FetchResponse<Game>, Error>({
    queryKey: ['/games', gameQuery],
    queryFn: () =>
      apiClient.getAll({
        params: {
          genres: gameQuery.genre?.id,
          parent_platforms: gameQuery.platform?.id,
          ordering: gameQuery.sortOrder,
          search: gameQuery.searchText,
        },
      }),
  });

export default useGames;
