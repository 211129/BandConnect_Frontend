import {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Sound from 'react-native-sound';
import Ionicons from 'react-native-vector-icons/Ionicons';

type MessageAudioItemProps = {
  audioUri: string;
  time: string;
  isSender?: boolean;
};

const MessageAudioItem = ({audioUri, time, isSender}: MessageAudioItemProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<Sound | null>(null);

  useEffect(() => {
    if (audioUri) {
      const sound = new Sound(audioUri, undefined, error => {
        if (error) {
          console.log('Failed to load the sound', error);
          return;
        }
        setAudio(sound);
      });

      return () => {
        if (sound) {
          sound.release();
        }
      };
    }
  }, [audioUri]);

  const playPauseAudio = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play(success => {
          if (success) {
            console.log('Finished playing');
          } else {
            console.log('Playback failed due to audio decoding errors');
          }
          setIsPlaying(false);
        });
        setIsPlaying(true);
      }
    }
  };

  return (
    <View style={[styles.container, isSender && styles.senderContainer]}>
      <View style={[styles.messageBox, isSender ? styles.senderMessageBox : styles.receiverMessageBox]}>
        <View style={styles.containerAudio}>
          <TouchableOpacity
            onPress={playPauseAudio}
            style={styles.playPauseButton}>
            <Ionicons
              name={isPlaying ? 'pause' : 'play'}
              size={30}
              color="#FFFFFF" // White color for play/pause button
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'flex-start',
    gap: 10,
  },
  senderContainer: {
    alignItems: 'flex-end',
  },
  messageBox: {
    maxWidth: '70%',
    padding: 20,
    borderRadius: 10,
  },
  senderMessageBox: {
    backgroundColor: '#0A84FF', // Blue color for sender
  },
  receiverMessageBox: {
    backgroundColor: '#333333', // Dark color for receiver
  },
  message: {
    fontSize: 16,
    color: '#1E1E1E',
  },
  timeContainer: {
    marginLeft: 10,
    alignItems: 'center',
  },
  time: {
    fontSize: 12,
    color: 'gray',
  },
  containerAudio: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  playPauseButton: {
    borderRadius: 30,
    padding: 10,
  },
});

export default MessageAudioItem;