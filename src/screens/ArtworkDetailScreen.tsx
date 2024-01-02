import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Dimensions,
  Pressable,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import Animated from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';

import {fetchArtwork} from '../api';

type RootStackParamList = {
  ArtworkList: undefined;
  ArtworkDetail: {artworkId: string};
};

type ArtworkDetailScreenProps = StackScreenProps<
  RootStackParamList,
  'ArtworkDetail'
>;

interface Artwork {
  id: number;
  image_id: string;
  title: string;
  artist_display: string;
  medium_display: string;
  short_description?: string;
}

interface ApiResponse {
  data: Artwork;
  info: {};
  config: {};
}

const ArtworkDetailScreen: React.FC<ArtworkDetailScreenProps> = ({route}) => {
  const {artworkId} = route.params;
  const [artwork, setArtwork] = useState<Artwork>();
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation();

  const fetchArtworkDetail = useCallback(async () => {
    try {
      const response: ApiResponse = await fetchArtwork(artworkId);
      setArtwork(prevArtwork => ({...prevArtwork, ...response.data}));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [artworkId]);

  useEffect(() => {
    fetchArtworkDetail();
  }, [fetchArtworkDetail]);

  return (
    <View style={styles.container}>
      {artwork && artwork.id && (
        <>
          {artwork.image_id && (
            // <Image
            //   source={{
            //     uri: `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`,
            //   }}
            //   style={styles.image}
            //   resizeMode="cover"
            // />
            <Animated.Image
              source={{
                uri: `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`,
              }}
              style={{
                width: Dimensions.get('window').width,
                height: 400,
                marginBottom: 20,
              }}
              sharedTransitionTag={artwork.id.toString()}
            />
          )}
          {loading && <ActivityIndicator style={styles.loadingIndicator} />}
          <View style={styles.info}>
            <Text style={styles.title}>{artwork.title}</Text>
            <Text style={styles.artist}>Artist: {artwork.artist_display}</Text>
            <Text style={styles.medium}>{artwork.medium_display}</Text>
            <Text style={styles.medium}>{artwork.short_description}</Text>
            <View style={{alignItems: 'center'}}>
              <Pressable
                title="Go back"
                style={styles.back}
                onPress={() => navigation.goBack()}>
                <Text style={styles.backText}>Back</Text>
              </Pressable>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingIndicator: {
    marginVertical: 20,
  },
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  image: {
    flex: 1,
    marginBottom: 20,
    borderRadius: 10,
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  title: {
    display: 'flex',
    flexShrink: 1,
    fontWeight: 'bold',
    fontSize: 20,
    flexWrap: 'wrap',
    marginBottom: 15,
    textAlign: 'center',
  },
  medium: {
    marginBottom: 5,
    fontSize: 16,
  },
  artist: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  back: {
    backgroundColor: '#323232',
    paddingHorizontal: 32,
    paddingVertical: 10,
    width: 150,
    alignItems: 'center',
    borderRadius: 10,
  },
  backText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ArtworkDetailScreen;
