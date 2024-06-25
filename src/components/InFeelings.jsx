import React from 'react';
import styled from '@emotion/styled';
import wave from '../assets/gifs/audio-wave.gif';

const Contain = styled.div`
  backdrop-filter: blur(1000px);
  padding: 50px;
  border-radius: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-size: 50px;
    margin: 0;
  }

  p {
    margin: 0;
    margin-bottom: 20px;
  }

  button {
    border: none;
    padding: 10px;
    border-radius: 300px;
    padding-right: 15px;
    padding-left: 15px;
    font-size: 15px;
    cursor: pointer; /* Ensure the button shows as clickable */
  }
`;

const ImageContainer = styled.div`
  height: 200px;
  width: 200px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 10px;
  margin-right: 40px;
`;

const SongInfoContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const ListenNowButton = styled.button`
  display: flex;
  alignItems: center;
  gap: 20px;
`;

function InFeelings({ song, onListenNow, onNextSong }) {
  const handleListenNow = () => {
    if (song) {
      onListenNow(song);
    }
  };

  return (
    <Contain>
      <div>
        <p>Trending Hit</p>
        <div>
          <h1>{song ? song.songName : 'In My Feelings'}</h1>
          <p>{song ? song.artistName : 'Camilla Cabello'}</p>


          <SongInfoContainer>
            <ListenNowButton 
              onClick={handleListenNow}>Listening Now 
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-headphones"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></svg>
            </ListenNowButton>
          </SongInfoContainer>

        </div>
      </div>
      <div>
        <ImageContainer style={{ backgroundImage: `url(${song ? song.imageSrc : ''})` }} />
      </div>
    </Contain>
  );
}

export default InFeelings;
