import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet } from 'react-native';

interface VideoProps {
    videoSource: string;
}

export function Video({ videoSource }: VideoProps) {
    const player = useVideoPlayer(videoSource, player => {
        player.loop = true;
        player.pause();
    });

    return (
        <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture contentFit='contain' nativeControls />

    );
}

const styles = StyleSheet.create({

    video: {
        width: 200,
        height: 180,
        borderRadius: 8,
    },

});
