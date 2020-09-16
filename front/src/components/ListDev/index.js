import React from 'react';
import './styles.css';

export default function ListDev({devs}) {
  return (
    
             <li className="dev-item" key={devs._id}>
             <header>
               <img src={devs.avatar_url} alt={devs.name} />
               <div>
               <strong>{devs.name}</strong>
               <span>{devs.techs.join(', ')}</span>
               </div>
             </header>
             <p>
             {devs.bio}
             </p>
             <a href={`https://github.com/${devs.github_username}` } target='blank' >Acessar perfil do github</a>
           </li>
         
  );
}
