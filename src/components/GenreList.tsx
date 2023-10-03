import {
  Button,
  HStack,
  Heading,
  Image,
  List,
  ListItem,
  Spinner,
} from '@chakra-ui/react';
import useGenres from '../hooks/useGenres';
import getCroppedImageUrl from '../services/image-url';
import useGameQueryStore from '../store';

const GenreList = () => {
  const { data, isLoading, error } = useGenres();
  const selectedGenreId = useGameQueryStore(state => state.gameQuery.genreId);
  const setSelectedGenreId = useGameQueryStore(state => state.setGenreId);

  if (error) return null;
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Heading fontSize='2xl' marginBottom={3}>
        Genres
      </Heading>
      <List>
        {data?.results.map(genre => (
          <ListItem key={genre.id} paddingY='5px'>
            <HStack>
              <Image
                objectFit='cover'
                src={getCroppedImageUrl(genre.image_background)}
                alt={genre.name}
                boxSize='32px'
                borderRadius={8}
              />
              <Button
                textAlign='left'
                whiteSpace='normal'
                fontWeight={selectedGenreId === genre.id ? 'bold' : 'normal'}
                fontSize='lg'
                variant='link'
                onClick={() => setSelectedGenreId(genre.id)}
              >
                {genre.name}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default GenreList;
