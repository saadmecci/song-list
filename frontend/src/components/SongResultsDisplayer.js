import React from 'react';
import styled from 'styled-components';

const SongCardContainer = styled.div`
    display: flex;
    margin: 20px 0px 12px 0px;
`
const SongCard = styled.div`
    margin: 8px;
    width: 20%;
    height: 100%;
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
const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    padding-bottom: 5px;
`
const PreviewButton = styled.div`
    cursor: pointer;
    color: white;
    padding: 2px 10px 2px 10px;
    background-color: #AC6AA1;
    border-radius: 5px;
`
const SaveButton = styled.div`
    cursor: pointer;
    color: white;
    padding: 2px 10px 2px 10px;
    background-color: #7CA3D1;
    border-radius: 5px;
`

const SongResultsDisplayer = (props) => {

    const playAudio = (url) => {
        if (url !== null) {
            window.open(url, "_blank");
        } else {
            return;
        }
    }

    return(
        <SongCardContainer>
            {props.data.map((item, index) => 
                <SongCard key={index}>
                    <ImageContainer background={item.album.images[0].url}/>
                    <SongName>
                        {item.name}
                    </SongName>
                    <ArtistName>
                        {item.artists[0].name}
                    </ArtistName>
                    <AlbumName>
                        {item.album.name}
                    </AlbumName>
                    <ButtonContainer>
                        <PreviewButton onClick={() => playAudio(item.preview_url)}>
                            &#9658;Preview
                        </PreviewButton>
                        <SaveButton>
                            &#43;Add to List
                        </SaveButton>
                    </ButtonContainer>
                </SongCard>
            )}
        </SongCardContainer>
    )
}

export default SongResultsDisplayer;