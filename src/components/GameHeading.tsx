import { Heading } from '@chakra-ui/react';
import useGenres from '../hooks/useGenres';
import usePlatforms from '../hooks/usePlatforms';
import useGameQueryStore from '../store';

const GameHeading = () => {
  const genreId = useGameQueryStore(state => state.gameQuery.genreId);
  const { data: geners } = useGenres();

  const platformId = useGameQueryStore(state => state.gameQuery.platformId);
  const { data: platforms } = usePlatforms();

  const genre = geners?.results.find(genre => genre.id === genreId);
  const platform = platforms?.results.find(
    platform => platform.id === platformId
  );

  const heading = `${platform?.name || ''} ${genre?.name || ''} Games`;
  return (
    <Heading as='h1' marginY={5} fontSize='5xl'>
      {heading}
    </Heading>
  );
};

export default GameHeading;
