// import { redirect, useNavigate } from "react-router-dom"

import Form from "../layout/Form";

function Home() {

  // const navigate = useNavigate();
  
  //Envia o dados para o "banco de dados"
  function createPost(person) {

    fetch("http://localhost:5000/people", {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(person),
    }).then((resp) => resp.json())
    .then((data) => {
      console.log(data)

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