import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import ArtworkItem from '../components/ArtworkItem';
import {fetchItems} from '../api';

interface Artwork {
  id: number;
  image_id: string;
  title: string;
  artist_display: string;
  medium_display: string;
}

interface Pagination {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
  next_url: string | null;
}

interface ApiResponse {
  pagination: Pagination;
  data: Artwork[];
}

interface ArtworkListScreenProps {}

const ArtworkListScreen: React.FC<ArtworkListScreenProps> = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const navigation = useNavigation();

  const fetchArtworks = useCallback(async () => {
    try {
      const response: ApiResponse = await fetchItems();
      setArtworks(prevArtworks => [...prevArtworks, ...response.data]);
      setPagination(response.pagination);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [page]);

  useEffect(() => {
    fetchArtworks();
  }, [fetchArtworks]);

  const handleLoadMore = () => {
    if (pagination?.next_url) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleArtworkPress = (artwork: Artwork) => {
    navigation.navigate('ArtworkDetail', {artworkId: artwork.id});
  };

  return (
    <SafeAreaView style={{flexDirection: 'column', flex: 1}}>
      {loading && <ActivityIndicator style={styles.loadingIndicator} />}
      <View style={{padding: 10}}>
        <FlatList
          data={artworks}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <ArtworkItem
              artwork={item}
              onPress={() => handleArtworkPress(item)}
            />
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingIndicator: {
    marginVertical: 20,
  },
});

export default ArtworkListScreen;
