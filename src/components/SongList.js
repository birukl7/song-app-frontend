import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSongsRequest,
  deleteSongRequest,
  clearSongsRequest,
  updateSongRequest
} from '../features/songs/songSlice';

import styled from '@emotion/styled';
import SongForm from './SongForm';
import InFeelings from './InFeelings';
import imageHome from '../assets/images/earphones.jpg';
import CustomAudioPlayer from './CustomAudioPlayer';
import NavBar from './NavBar';
import SongListContainer from './SongListContainer';

const Container = styled.div`
  padding: 20px;
  margin: 0;
  padding-left: 20%;
  background-image: url(${process.env.PUBLIC_URL}/image/sunset1.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;

  @media(max-width: 768px){
    padding-left: 5%;
  }
`;

const List = styled.li`
  list-style-type: none;
  max-width: 600px;
  margin: 0 auto;
`;

const MiddleContainer = styled.div`
  display: flex;
  gap: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SubMiddleContainer = styled.div`
  width: 60%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SongFormContainerDiv = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SongInnerContainer = styled.div`
  backdrop-filter: blur(1000px);
  padding: 20px;
  border-radius: 20px;
  max-width: 700px;
  margin: 0 auto;
  margin-top: 20px;

`;

const IgnoreButton = styled.button`
  padding: 20px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
`;

const SongList = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.songs);
  const [songToEdit, setSongToEdit] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const scrollRef = useRef(null)


  useEffect(() => {
    const storedSong = localStorage.getItem('currentSong');
    if (storedSong) {
      setCurrentSong(JSON.parse(storedSong));
    }
  }, []);

  useEffect(() => {
    dispatch(fetchSongsRequest());
  }, [dispatch]);

  useEffect(() => {
    if (list.length > 0) {
      setCurrentSong({
        songName: list[0].title || "Unknown Title",
        artistName: list[0].artist || "Unknown Artist",
        albumTitle: list[0].album || 'Unknown Album',
        audioSrc: list[0].fileUrl,
        imageSrc: list[0].albumArtUrl || imageHome,
        songDuration: formatDuration(list[0].duration),
        songYear: list[0].year,
        songLyrics: list[0].lyrics,
        songId: 0 + 1 // Set the custom songId
      });
      setCurrentSongIndex(0);
    }
  }, [list]);


  
  const handleEdit = (song) => {
    setSongToEdit(song);
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteSongRequest(id));
  };

  const handleClear = () => {
    dispatch(clearSongsRequest());
  };

  const handleIgnoreEdit = () => {
    setSongToEdit(null);
  };

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleSongClick = (song, index) => {
    if (!song) {
      console.error("Song data is undefined");
      return;
    }

    setCurrentSong({
      songName: song.title || 'Unknown Title',
      artistName: song.artist || 'Unknown Artist',
      albumTitle: song.album || 'Unknown Album',
      audioSrc: song.fileUrl,
      imageSrc: song.albumArtUrl || imageHome,
      songDuration: formatDuration(song.duration),
      songYear: song.year || 'unknown Year',
      songLyrics: song.lyrics,
      songId: index + 1 // Set the custom songId
    });
    setCurrentSongIndex(index);
  };

  const handleUpdate = (id, updatedSong) => {
    dispatch(updateSongRequest({ id, ...updatedSong }));
  };

  const handleNextSong = () => {
    if (currentSongIndex !== null && currentSongIndex < list.length - 1) {
      const nextIndex = currentSongIndex + 1;
      handleSongClick(list[nextIndex], nextIndex);
    } else {
      alert("You have reached the end of the playlist.");
    }
  };

  const handlePreviousSong = () => {
    if (currentSongIndex !== null && currentSongIndex > 0) {
      const prevIndex = currentSongIndex - 1;
      handleSongClick(list[prevIndex], prevIndex);
    } else {
      alert("You have reached the beginning of the playlist.");
    }
    console.log(list)
  };


  const getRandomSongFromList = () => {
    if (list.length > 0) {
      const randomIndex = Math.floor(Math.random() * list.length);
      const randomSong = list[randomIndex];
      setCurrentSong(randomSong);
      setCurrentSongIndex(randomIndex);
    }
  };

  const handleListenNow = (song) => {
    setCurrentSong(song);
  };


  if (loading) return <p>Loading/uploading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <NavBar />
      <Container>
        <InFeelings
          song={currentSong}
          onListenNow={handleListenNow}
          onNextSong={getRandomSongFromList}
        />

        <MiddleContainer>
          <SubMiddleContainer>
            <SongFormContainerDiv>
              <div ref={scrollRef}>
                <SongForm songToEdit={songToEdit} setSongToEdit={setSongToEdit} onUpdate={handleUpdate} />
              </div>
            </SongFormContainerDiv>

            <SongInnerContainer>
              <h2>{!songToEdit ? "Song List" : "Song Update"}</h2>
              {songToEdit ? <IgnoreButton onClick={handleIgnoreEdit} >Ignore Updating</IgnoreButton> : ""}
              {/* <button onClick={handleClear}>Clear All Songs</button> */}

              {Array.isArray(list) ? (
                <ul>
                  {list.map((song, index) => (
                    <List key={song.id}>
                      <SongListContainer
                        id={index+1}
                        imageSrc={song.albumArtUrl || imageHome}
                        songTitle={song.title || "Unknown"}
                        artistName={song.artist || "Unknown Artist"}
                        songDuration={formatDuration(song.duration) || "4:50"}
                        onClick={() => handleSongClick(song, index)}
                        onClickDelete={() => handleDelete(song.id)}
                        onClickUpdate={() => handleEdit(song)}
                        isPlaying={currentSongIndex === index}
                      />
                    </List>
                  ))}
                </ul>
              ) : (
                <p>No songs available</p>
              )}
            </SongInnerContainer>
          </SubMiddleContainer>

          <div>
            <CustomAudioPlayer 
              song={currentSong}
              onNextSong={handleNextSong}
              onPreviousSong={handlePreviousSong} 
            />
          </div>
        </MiddleContainer>
      </Container>
    </>
  );
};

export default SongList;
