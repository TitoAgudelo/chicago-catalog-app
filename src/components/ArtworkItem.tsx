import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

interface ArtworkItemProps {
  artwork: {
    id: number;
    image_id: string;
    title: string;
    medium_display: string;
    artist_display: string;
  };
  onPress: () => void;
}

const ArtworkItem: React.FC<ArtworkItemProps> = ({artwork, onPress}) => {
  console.log(artwork);

  return artwork ? (
    <TouchableHighlight onPress={onPress}>
      <View style={styles.container}>
        {artwork.image_id && (
          // <Image
          //   source={{
          //     uri: `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`,
          //   }}
          //   style={styles.thumbnail}
          //   resizeMode="cover"
          // />
          <Animated.Image
            source={{
              uri: `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`,
            }}
            style={styles.thumbnail}
            sharedTransitionTag={artwork.id.toString()}
          />
        )}
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>
            {artwork.title}
          </Text>
          <Text style={styles.medium} numberOfLines={2}>
            {artwork.medium_display}
          </Text>
          <Text style={styles.artist} numberOfLines={2}>
            {artwork.artist_display}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flex: 3,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
  },
  thumbnail: {
    width: 100,
    height: 100,
    marginRight: 15,
    borderRadius: 10,
    flex: 1,
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    flex: 2,
  },
  title: {
    display: 'flex',
    flexShrink: 1,
    fontWeight: 'bold',
    fontSize: 16,
    flexWrap: 'wrap',
    marginBottom: 5,
  },
  medium: {
    marginBottom: 5,
  },
  artist: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default ArtworkItem;
