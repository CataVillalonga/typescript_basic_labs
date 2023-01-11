import express from 'express';
import { Request, Response, Application } from 'express';

const app: Application = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


const data = [{
  id:1,
  name:'Bobby', 
  img:'https://images.pexels.com/photos/235805/pexels-photo-235805.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  birth_date : '01/01/2023',
  breed:'banana',
  fav_activities:['Sleep','Play with the ball']
  },
  {
  id:2,
  name:'Uni', 
  img:'https://images.pexels.com/photos/1564506/pexels-photo-1564506.jpeg?auto=compress&cs=tinysrgb&w=800',
  birth_date : '01/01/2023',
  breed:'banana',
  fav_activities:['Swim','Run after cats']
  },
  {
  id:3,
  name:'Woolfie', 
  img:'https://images.pexels.com/photos/3478875/pexels-photo-3478875.jpeg?auto=compress&cs=tinysrgb&w=800',
  birth_date : '01/01/2023',
  breed:'banana',
  fav_activities:['Eat','Look at people walk by']
  },
  {
  id:4,
  name:'Salchi', 
  img:'https://images.pexels.com/photos/1307630/pexels-photo-1307630.jpeg?auto=compress&cs=tinysrgb&w=800',
  birth_date : '01/01/2023',
  breed:'banana',
  fav_activities:['Run','Sleep']
  },
  {
  id:5,
  name:'Snow', 
  img:'https://images.pexels.com/photos/3860306/pexels-photo-3860306.jpeg?auto=compress&cs=tinysrgb&w=800',
  birth_date : '01/01/2023',
  breed:'banana',
  fav_activities:['Chill by the carpet','Watch tv']
  },
  {
  id:6,
  name:'cafesito', 
  img:'https://images.pexels.com/photos/97863/pexels-photo-97863.jpeg?auto=compress&cs=tinysrgb&w=800',
  birth_date : '01/01/2023',
  breed:'banana',
  fav_activities:['Fetch the ball','Barck at everything that moves']
  },
]

interface PuppygDetails {
  id: number
  name: string
  img: string
  birth_date : string
  breed:string
  fav_activities:string[]
}

app.get('/api/puppies', (_req: Request, res: Response) => {
  return res.status(200).json(data);
});

app.get('/api/puppies/:id', (req: Request, res: Response) => {
  const id :number = Number(req.params.id)
  const puppy = data.filter(dog => dog.id === id)
  return res.status(200).json(puppy);
});

app.post('/api/puppies', (req: Request, res: Response) => {
  const { name, img, birth_date, breed, fav_activities} = req.body
  const newPuppy:PuppygDetails = {
    id : data.length + 1,
    name,
    img,
    birth_date,
    breed,
    fav_activities
  }
  data.push(newPuppy)
    if (name && img && birth_date && breed && fav_activities) {
      return res.status(202).json(data);
    }
    return res.status(400).json('Please provide the right data');
});

app.delete('/api/puppies/:id', (req: Request, res: Response) => {
  const id :number = Number(req.params.id)
  const puppyIndex = data.findIndex(puppy => puppy.id === id);
  data.splice(puppyIndex, 1);
  return res.status(204).json('Puppy Succesfully deleted');
});

export default app;
