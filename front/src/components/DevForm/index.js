import React, {useEffect, useState} from 'react';
import './styles.css'

export default function DevForm({onSubmit}) {

  const [latitude, setLatitude] = useState('');
const [longitude, setLongitude] = useState('');
const[git, setGit] = useState('');
const [techs, setTechs] = useState('');

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(
     (position)=>{
      const {latitude, longitude} = position.coords;
      setLatitude(latitude);
      setLongitude(longitude)
   },
   (err)=>{
     console.log(err)
   },{
     timeout: 30000
   })
  }, []);

 async function handleSubmit(e) {

  e.preventDefault();

await onSubmit(
    {
      github_username: git,
      techs: techs,
      latitude: latitude,
      longitude: longitude
    }
   )

   setGit('');
   setTechs('');
  }


  return (
    <form onSubmit={handleSubmit}>
          <div className='input-block'>
            <label htmlFor='github_username'>Usuário no github</label>

            <input 
            name='github_username' 
            onChange={(e)=>{setGit(e.target.value)}} 
            id='github_username' 
            required 
            value={git} />
          </div>

          <div className='input-block'>
            <label htmlFor='techs'>Tecnologias</label>

            <input 
            name='techs' 
            id='techs' 
            required 
            onChange={(e)=>{setTechs(e.target.value)}}
            value={techs}
             />

          </div>

          <div className='input-group'>
          <div className='input-block'>
            <label htmlFor='latitude'>Latitude</label>
            <input 
            name='latitude' 
            onChange={(e) =>{setLatitude(e.target.value)}} 
            id='latitude' 
            
            required 
            value={latitude}
             />

          </div>
          <div className='input-block'>
            <label htmlFor='longitude'>Longitude</label>
            <input name='longitude' id='longitude'  onChange={(e) =>{setLongitude(e.target.value)}} required value={longitude} />
          </div>
          </div>
          <button type='submit'>Salvar</button>
        </form>
  );
}
