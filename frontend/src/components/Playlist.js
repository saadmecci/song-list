import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

const Playlist = (props) => {

  const SongCard = styled.div`
    margin: 8px;
    width: 45%;
    height: fit-content;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  `
  const ImageContainer = styled.div`
    background-image: ${props => `url(${props.background})`};
    background-size: cover;
    padding-bottom: 12px;
    min-height: 230px;
    height: 100%;
    width: 100%;
  `
  const SongName = styled.div`
    font-size: 14px;
    line-height: 16px;
    padding-top: 3px;
    padding-bottom: 6px;
    padding-left: 5px; 
    text-align: center;
  `
  const ArtistName = styled.div`
    font-size: 16px;
    line-height: 20px;
    padding-left: 5px;
    text-align: center;
  `
  const AlbumName = styled.div`
    font-size: 16px;
    line-height: 20px;
    margin-top: 6px;
    text-align: center;
    padding-left: 5px;
    padding-bottom: 8px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: keep-all;
  `

  return (
      <Modal show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
          <Modal.Title>Playlist</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div 
          style={{
            display:"flex", 
            flexWrap:"wrap",
            flexDirection:"row",
            justifyContent:"space-evenly"
          }}
        >
          {props.data.map((item, index) => 
            <SongCard key={index}>
              <ImageContainer background={item.imageUrl}/>
              <SongName>
                {item.songName}
              </SongName>
              <ArtistName>
                {item.songArtist}
              </ArtistName>
              <AlbumName>
                {item.albumName}
              </AlbumName>
            </SongCard>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="info" onClick={props.handleClose}>
          Close
        </Button>
      </Modal.Footer>
      </Modal>
  )
}

export default Playlist;