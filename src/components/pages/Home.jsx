import { redirect, useNavigate } from "react-router-dom"

import Form from "../layout/Form";

function Home() {

  const navigate = useNavigate();
  
  //Envia o dados para o "banco de dados"
  //substituir todo project por people
  function createPost(project) {

    fetch("http://localhost:5000/peoples", {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(project),
    }).then((resp) => resp.json())
    .then((data) => {
      console.log(data)
      //redirect
    })
    .catch(err => console.log(err));

  }

  return (
      <>
        <Form handleSubmit={createPost}/>
      </>
  );
}

export default Home;