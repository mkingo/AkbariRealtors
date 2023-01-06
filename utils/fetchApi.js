import axios from "axios";
export const baseUrl = 'https://bayut.p.rapidapi.com'


export const fetchApi = async(url) => {
    const { data } = await axios.get((url), {
        headers: {
            'X-RapidAPI-Key': '018671d6a3msha1d914ac4b6976dp18a525jsncd7a41d85726',
            'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
          }
    })

    return data;
}