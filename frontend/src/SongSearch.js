import React, { useRef, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getAuth, getSong } from './api/SpotifyApi';
import SongResultsDisplayer from './components/SongResultsDisplayer';

const SongInput = () => {

    const searchRef = useRef();
    let [spotifyToken, setSpotifyToken] = useState();
    let [songResults, setSongResults] = useState([]);

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
                console.log(response.tracks.items);
            });
        searchRef.current.value = "";
    }

    return (
        <>
        <Card>
            <Card.Body>
                <Form onSubmit={songSearch}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Song</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Song name"
                            ref={searchRef}
                        />
                    </Form.Group>
                    <Button variant="info" type="submit">
                        Submit
                    </Button>
                </Form>
            </Card.Body>
        </Card>
        <SongResultsDisplayer data={songResults}/>
        </>
    )
}

export default SongInput;