import axios from 'axios';

export const addSong = (imageUrl, name, artist, album) => {
    axios({
        url: "/add-song",
        method: "POST",
        data: {
            imageUrl,
            name,
            artist,
            album
        }
    });
}

export const getPlaylist = async () => {
    const response = await axios({
        url: "/playlist",
        method: "GET"
    });
    if (response.status === 200) {
        return response.data
    } else {
        console.log(response);
    }
}