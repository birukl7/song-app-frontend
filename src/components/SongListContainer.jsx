import styled from '@emotion/styled';
import React from 'react';
import imageHome from '../assets/images/earphones.jpg';

const SongListContain = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
  margin-top: 10px;
  padding: 5px 10px;
  border-radius: 10px;
`;

const ImageContainer = styled.div`
  width: 100px;
  height: 100px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const SongInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  alignItems: center;
  gap: 8px;

  span{
    margin-top: 9px;
  }
`;

const PlayButton = styled.button`
  border: none;
  border-radius: 10px;
  padding: 5px;
  cursor: pointer;
`;

const EditButton = styled.button`
  padding: 10px;
  background-color: #5974FF;
  border: none;
  color: white;
  padding: 10px 20px;
  fontSize: 17px;
  marginLeft: 5px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  padding: 10px;
  margin-left: 5px;
  background-color: rgba(250, 10, 10, 0.6);
  border: none;
  color: white;
  padding: 10px 20px;
  fontSize: 17px;
  cursor: pointer;
`;

function SongListContainer({
  id,
  imageSrc,
  songTitle,
  artistName,
  songDuration,
  isPlaying,
  onClick,
  onClickDelete,
  onClickUpdate,
}) {
  return (
    <SongListContain style={{
      outline: `${isPlaying? '1px solid white' : 'none' }`
    }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <span>{!id ? '01' : id}</span>
        <ImageContainer
          style={{
            backgroundImage: `url(${!imageSrc ? imageHome : imageSrc})`,
          }}
        ></ImageContainer>

        <SongInfoContainer>
          <strong>{!songTitle ? 'Havana' : songTitle}</strong>
          <span>{!artistName ? 'Camila Cabelo' : artistName}</span>
        </SongInfoContainer>
      </div>

      <ButtonContainer
        style={{

        }}
      >
        <span>{!songDuration ? '3:45' : songDuration}</span>
        <PlayButton onClick={onClick}>
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
              <rect x="14" y="4" width="4" height="16" rx="1" />
              <rect x="6" y="4" width="4" height="16" rx="1" />
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
              <polygon points="6 3 20 12 6 21 6 3" />
            </svg>
          )}
        </PlayButton>
        {/*<EditButton
          onClick={onClickUpdate}
        >
          Edit
          </EditButton>*/}
        <DeleteButton
          onClick={onClickDelete}
        >
          Delete
        </DeleteButton>
      </ButtonContainer>
    </SongListContain>
  );
}

export default SongListContainer;
