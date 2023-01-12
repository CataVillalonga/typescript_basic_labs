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
  breed:'Chihuahua',
  fav_activities:['Sleep','Play with the ball']
  },
  {
  id:2,
  name:'Uni', 
  img:'https://images.pexels.com/photos/1564506/pexels-photo-1564506.jpeg?auto=compress&cs=tinysrgb&w=800',
  birth_date : '01/01/2023',
  breed:'Siberian Husky',
  fav_activities:['Swim','Run after cats']
  },
  {
  id:3,
  name:'Woolfie', 
  img:'https://images.pexels.com/photos/3478875/pexels-photo-3478875.jpeg?auto=compress&cs=tinysrgb&w=800',
  birth_date : '01/01/2023',
  breed:'Welsh Corgi',
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
  breed:'Welsh Springer',
  fav_activities:['Chill by the carpet','Watch tv']
  },
  {
  id:6,
  name:'cafesito', 
  img:'https://images.pexels.com/photos/97863/pexels-photo-97863.jpeg?auto=compress&cs=tinysrgb&w=800',
  birth_date : '01/01/2023',
  breed:'Yorkshire Terrier',
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

  return res.location('/api/puppies')
  .status(200)
  .json(data);
});

app.get('/api/puppies/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const puppy = data.filter(dog => dog.id === id)

  if (puppy.length !== 0) {
    return res.location('/api/puppies')
    .status(200)
    .json(puppy);
  }
  return res.status(404)
  .json({
    error: 404,
    msg: 'Puppy not found'
  });
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

    if (name && img && birth_date && breed && fav_activities && typeof name === 'string' &&  
      typeof img === 'string' &&  typeof birth_date === 'string' &&  typeof breed === 'string') {
      data.push(newPuppy)
      return res.location('/api/puppies')
      .status(202)
      .json(data);
    }
    return res.status(400)
    .json({
      error: 400,
      msg: 'Bad request, Please provide the right data'
    });
});
app.put('/api/puppies/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const { name, img, birth_date, breed, fav_activities} = req.body
  const puppy:PuppygDetails | any = data.find(puppy => puppy.id === id);

  if (name && img && birth_date && breed && fav_activities && typeof name === 'string' &&  
  typeof img === 'string' &&  typeof birth_date === 'string' &&  typeof breed === 'string') {
    const indexOfPuppy = data.indexOf(puppy);
    puppy[indexOfPuppy] = {
      id,
      name,
      img,
      birth_date,
      breed,
      fav_activities
    };
    return res.location(`/api/presidents/${puppy[indexOfPuppy].id}`)
    .status(200)
    .json(puppy[indexOfPuppy]);
  }
    return res.status(400)
    .json({
      error: 400,
      msg: 'Bad request, Please provide the right data'
    });
});

app.delete('/api/puppies/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const puppyIndex = data.findIndex(puppy => puppy.id === id);

  if (puppyIndex !== -1) {
    data.splice(puppyIndex, 1);
    return res.status(204).json('Puppy Succesfully deleted');
  }
  return res.status(404)
  .json({
    error: 404,
    msg: 'Puppy not found'
  });
  
});

export default app;
