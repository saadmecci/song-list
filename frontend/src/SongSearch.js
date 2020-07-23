import React, { useRef, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styled from 'styled-components';
import { getAuth, getSong } from './api/spotifyApi';
import { addSong, getPlaylist} from './api/songApi';
import Playlist from './components/Playlist';
import SongResultsDisplayer from './components/SongResultsDisplayer';

const SongInput = () => {

    const CardContainer = styled.div`
        display: flex;
    `
    const [show, setShow] = useState(false);
    let [spotifyToken, setSpotifyToken] = useState();
    let [songResults, setSongResults] = useState([]);
    let [playlistData, setPlaylistData] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const searchRef = useRef();

    useEffect(() => {
        getAuth().then((response) => {
            setSpotifyToken(response);
        });
    }, []);

    const songSearch = (event) => {
        event.preventDefault();
        getSong(spotifyToken, searchRef.current.value)
            .then((response) => {
                setSongResults(response.tracks.items);
            });
        searchRef.current.value = "";
    }
    const viewPlaylist = (event) => {
        event.preventDefault();
        handleShow();
        getPlaylist()
            .then((response) => {
                setPlaylistData(response);
            });
    }

    return (
        <>
        <CardContainer>
            <Card style={{width: "300px"}}>
                <Card.Body>
                    <Form onSubmit={songSearch}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Search for a Song</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Song name"
                                ref={searchRef}
                            />
                        </Form.Group>
                        <Button variant="info" type="submit">
                            Search
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <Card style={{width: "200px"}}>
                <Card.Body>
                        <Button variant="info" onClick={viewPlaylist}>
                            View Playlist
                        </Button>
                </Card.Body>
            </Card>
        </CardContainer>
        <SongResultsDisplayer data={songResults} addSong={addSong}/>
        <Playlist show={show} handleClose={handleClose} data={playlistData}/>
        </>
    )
}

export default SongInput;