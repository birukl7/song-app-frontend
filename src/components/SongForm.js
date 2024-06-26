import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { uploadSongRequest, updateSongRequest } from '../features/songs/songSlice';
import styled from '@emotion/styled';
import imageHome from '../assets/images/earphones.jpg';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  backdrop-filter: blur(1000px);
  padding: 20px;
  border-radius: 20px;
  overflow: clip;
  position: sticky;
  top: 5px;

  span{
    font-weight: bold;
  }
`;

const DropzoneContainer = styled.div`
  padding: 20px;
  border: 2px dashed #cccccc;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  margin-bottom: 10px;
  height: 500px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const SongToBeEditedContainer = styled.div`
  width: 100px;
  height: 100px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding: 20px;
  margin-top: 15px;
`;

const SongInfoContainer = styled.div`
  display: flex;
  padding: 20px 5px;
  gap: 25px;
  span{
    font-weight: normal;
  }
`;

const SongForm = ({ songToEdit, setSongToEdit }) => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (songToEdit) {
      // Reset file when songToEdit changes
    } else {
      setFile(null);
    }
  }, [songToEdit]);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      if (!file.type.startsWith('audio/')) {
        alert('Please upload a valid audio file');
        setFile(null);
        return;
      }

      if (file.size > 10 * 1024 * 1024) { // 10MB in bytes
        alert('File size should not exceed 10MB');
        setFile(null);
        return;
      }

      setFile(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please upload a file before submitting');
      return;
    }

    if (songToEdit) {
      dispatch(updateSongRequest({ id: songToEdit.id, file }));
      window.location.reload();
    } else {
      dispatch(uploadSongRequest({ file }));
    }
    setFile(null);
    setSongToEdit && setSongToEdit(null);
  };

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Form onSubmit={handleSubmit}>
      {songToEdit && (
        <div>
          <div><span>Editing:</span> {songToEdit.title}</div>
          <SongToBeEditedContainer
            style={{
              backgroundImage: `url(${songToEdit.albumArtUrl || imageHome})`
            }}
          ></SongToBeEditedContainer>

          <SongInfoContainer>
            <span>{songToEdit.title}</span>
            <span>{songToEdit.artist}</span>
            <span>{formatDuration(songToEdit.duration)}</span>
          </SongInfoContainer>
        </div>
      )}

      <DropzoneContainer {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </DropzoneContainer>
      
      {file && <p>Selected file: {file.name}</p>}
      <Button type="submit">{songToEdit ? 'Update Song' : 'Upload Song'}</Button>
    </Form>
  );
};

export default SongForm;
