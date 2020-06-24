import axios from 'axios';

export const getAuth = async () => {
    const response = await axios({
        url: "/token",
        method: "GET",
    })
    if (response.status === 200) {
        return response.data
    } else {
        console.log(response);
    }
}

export const getSong = async (token, songName) => {
    const response = await axios({
        url: 
            "https://api.spotify.com/v1/search?q=" +
            encodeURIComponent(songName) +
            "&type=track&market=US&limit=5"
        ,
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization" : "Bearer " + token
        }
    });
    if (response.status === 200) {
        return response.data
    } else {
        console.log(response);
    }
}