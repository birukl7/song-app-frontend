import React, { useRef, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import imageHome from '../assets/images/earphones.jpg';

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  backdrop-filter: blur(1000px);
  padding: 30px;
  border-radius: 10px;
  width: 400px;
  margin-top: 30px;
  position: sticky;
  top: 10px;
  z-index: 30;
  @media (max-width: 768px) {
    width: 320px;
  }
  
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
`;

const Button = styled.button`
  background-color: #5974FF;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  margin: 6px;

  &:hover {
    background-color: #45a049;
  }
`;

const ButtonMiddle = styled.button`
  background-color: #5974FF;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 100px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const Slider = styled.input`
  width: 100%;
`;

const AlbumArtContainer = styled.div`
  width: 300px;
  height: 300px;
  margin: 10px 10px;
  border-radius: 10px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const SongName = styled.h2`
  margin-bottom: 0px;
`;

const ArtistName = styled.p`
  margin: 0px;
`;

const AlbumTitle = styled.p`
  margin: 0px;
`;

const SongYear = styled.p`
  margin: 0px;
  font-size: 12px;
`;

const Message = styled.h2`
 margin-bottom: '0px';
 text-align: 'center;
`;

const AudioContainer = styled.div`
  width: 100%;
  display: 'flex';
  flexDirection: 'column';
`;

const TimeStampContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
`;

const ButtonsContainer= styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 17px 0;
`;

const SoundIcon = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin: 10px 0;
`;

const LyricsButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`;

const LyricsContainer = styled.pre`
  text-align: center;
  white-space: pre-wrap;
  overflow: hidden;
`;

const LyricsButton = styled.button`
  align-items: center;
  display: flex;
  font-size: 18px;
  border: none;
  gap: 20px;
  padding: 8px;
  border-radius: 10px;
  cursor: pointer;
`;


const CustomAudioPlayer = ({ song, onNextSong, onPreviousSong }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isLyricsShown, setIsLyricsShown] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false); 
  const [currentSong, setCurrentSong] = useState(null);
  
  useEffect(()=>{
    if(song){
      localStorage.setItem('currentSong', JSON.stringify(song));
    }
  }, [song]);

  useEffect(() => {
    const audio = audioRef.current;

    const loadAudio = () => {
      audio.src = song.audioSrc;
      audio.load();
      setIsLoading(false);
    };

    const handleLoadedData = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleSongEnd = () => {
      onNextSong();
    };

    if (song && audio) {
      setIsLoading(true);

      audio.pause();
      audio.currentTime = 0;
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleSongEnd);

      loadAudio();

      audio.addEventListener('loadeddata', handleLoadedData);
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', handleSongEnd);

      if (hasUserInteracted) {
        audio.play();
        setIsPlaying(true);
      }
    } else {
      const storedSong = localStorage.getItem('currentSong');
      if (storedSong) {
        setCurrentSong(JSON.parse(storedSong));
      }
    }

    return () => {
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleSongEnd);
    };
  }, [song, hasUserInteracted]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
      setHasUserInteracted(true); 
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (e) => {
    const time = e.target.value;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (e) => {
    const volume = e.target.value;
    audioRef.current.volume = volume;
    setVolume(volume);
  };

  const handleNextSongClick = () => {
    onNextSong();
  };

  const handlePreviousSongClick = () => {
    onPreviousSong();
  };

  return (
    <PlayerContainer>
      <span>Player</span>
      <AlbumArtContainer
        style={{
          backgroundImage: `url(${song?.imageSrc || imageHome})`,
        }}
      ></AlbumArtContainer>

      {song ? (
        <>
          <SongName>{song.songName}</SongName>
          <ArtistName >{song.artistName}</ArtistName>
          <AlbumTitle>{song.albumTitle}</AlbumTitle>
          <SongYear>{song.songYear}</SongYear>
        </>
      ) : (
        <Message>Play a song from the list to start the player</Message>
      )}

      <AudioContainer>
        <audio
          ref={audioRef}
          onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
          onDurationChange={() => setDuration(audioRef.current.duration)}
        />

        <TimeStampContainer
        >
          <span>{new Date(currentTime * 1000).toISOString().substr(11, 8)}</span>
          <Slider type="range" min="0" max={duration} value={currentTime} onChange={handleSeek} />
          <span>{song?.songDuration || '5:00'}</span>
        </TimeStampContainer>

        <ButtonsContainer>
          <Button onClick={!song ? ()=>{} : handlePreviousSongClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-left-from-line"
            >
              <path d="m9 6-6 6 6 6" />
              <path d="M3 12h14" />
              <path d="M21 19V5" />
            </svg>
          </Button>

          <ButtonMiddle onClick={!song ? ()=>{} : togglePlayPause  }>
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-pause"
              >
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-play"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
          </ButtonMiddle>

          <Button onClick={!song ? ()=>{} : handleNextSongClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-right-to-line"
            >
              <path d="M17 12H3" />
              <path d="m11 18 6-6-6-6" />
              <path d="M21 5v14" />
            </svg>
          </Button>
        </ButtonsContainer>

        <SoundIcon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-volume-2"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
          <Slider type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} />
        </SoundIcon>
        
        {song && (
          <LyricsButtonContainer>
            <LyricsButton onClick={()=>{
              const lyricsPlace = document.querySelector('#lyricsPlace');
              if(isLyricsShown){
                lyricsPlace.style.display = 'none';
                setIsLyricsShown(!isLyricsShown);
              }else {
                lyricsPlace.style.display = 'block';
                setIsLyricsShown(!isLyricsShown);
              }
            }}><span>Lyrics</span>  {isLyricsShown ? 
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-corner-left-up ">
                  <polyline points="14 9 9 4 4 9"/>
                  <path d="M20 20h-7a4 4 0 0 1-4-4V4"/>
              </svg> : 
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-corner-right-down">
                  <polyline points="10 15 15 20 20 15"/>
                  <path d="M4 4h7a4 4 0 0 1 4 4v12"/>
                </svg>}
              </LyricsButton>
            <LyricsContainer id='lyricsPlace' className='lyrics-place'>
              {
                  !song.songLyrics ? 'No Lyrics for this song' : song.songLyrics
              }
            </LyricsContainer>
          </LyricsButtonContainer>
        )}
      </AudioContainer>
    </PlayerContainer>
  );
};

export default CustomAudioPlayer;
