// export default function handler(req, res) {
//     console.log('Hello');
//     res.status(200).json({ text: 'Hello' });
//   }
import axios from 'axios';


export async function GET() {
    try {
        const fetchData = await axios.get('https://www.lemonde.fr/rss/une.xml');
        console.log(fetchData.data);
       
        return Response.json(fetchData.data);
    } catch (error) {
        console.error(error);
    }
    return Response.json({ text: 'Hello' });
}