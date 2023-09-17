import { useState } from "react";

import Form from "../project/Form";
import Message from "../layout/Message";

function Home() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
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
      setShowSuccessMessage(true)

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
    })
    .catch(err => console.log(err));

  }

  return (
      <div>
        {showSuccessMessage && (
          <Message type="success" msg="Dados enviados com sucesso!" />
        )}
        <Form handleSubmit={createPost}/>
      </div>
  );
}

export default Home;