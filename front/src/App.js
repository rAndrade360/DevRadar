import React,{useEffect, useState} from 'react';

import './global.css';
import './SideBar.css'
import './App.css'
import './main.css'
import api from './services/api';
import ListDev from './components/ListDev';
import DevForm from './components/DevForm';

function App() {
const [devs, setDevs] = useState([])


 
  useEffect(()=>{
   async function loadDevs(){
      const response = await api.get('/users');
      setDevs(response.data);
   }
   loadDevs()
  }, []);

  async function handleSubmit(data){

  const response = await api.post('/users',data);
  
 
  setDevs([...devs, response.data]);

  }

  return (
    <div className="App">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleSubmit} />
      </aside>
      <main>
      <ul>
          {devs.map(dev => (
        <ListDev devs={dev} />
        ))}     
        </ul>
      </main>
    </div>
  );
}

export default App;
