import Navbar from '../../Components/navbar/navbarParceiro';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import LogoQ from '../../img/logoquad.png';
import { FaKiwiBird } from 'react-icons/fa';
import { Formik, Form, Field } from 'formik';

function Creditos() {
  const [credito, setCredito] = useState('');

  useEffect(() => {
    // Verificar se há um usuário logado
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      window.location.href = 'http://localhost:3000/';
    }
  }, []);


  const handleClickAdicionarCredito = () => {
    axios.post("http://localhost:3001/comprarCredito", {
      email: localStorage.email,
      credito: parseFloat(credito),
    })
      .then(response => {
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'Crédito adicionado com sucesso.',
        });
        console.log("Resposta do servidor:", response.data);
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Erro ao adicionar crédito.',
        });
        console.error("Erro ao fazer a requisição:", error);
        if (error.response && error.response.data) {
          console.error("Mensagem de erro do servidor:", error.response.data.error);
        }
      });
  };

  return (
    <>
      <Navbar activeLink="/ComprarCredito" />
      <body>
        <div className='containerLogin'>
          <div className="boxDivisao">
            <img src={LogoQ} alt="LogoQ" className="logoQuadDivi" />
            <h2>Comprar Créditos</h2>
            <h4> Total R${(credito * 1.29).toFixed(2)} </h4>
            <Formik
              initialValues={{
                quantidadeCreditos: ''
              }}
              onSubmit={handleClickAdicionarCredito}
            >
              <Form className="formLogin">
                <div className="inputWrapper">
                  <i><FaKiwiBird /></i>
                  <Field
                    name="quantidadeCreditos"
                    type="number"
                    placeholder='Credito'
                    className="form-field"
                    value={credito}
                    onChange={(e) => setCredito(e.target.value)}
                  />
                </div>
                <button type="button" onClick={handleClickAdicionarCredito}>Adicionar Crédito</button>
              </Form>
            </Formik>
          </div>
        </div>
      </body>
    </>
  );
}

export default Creditos;