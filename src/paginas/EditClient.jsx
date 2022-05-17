import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Forms from "../components/Forms";

const EditClient = () => {
  const [client, setClient] = useState({});
  const [load, setLoad] = useState(true);

  const { id } = useParams();
  useEffect(() => {
    const getClientAPI = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setClient(resultado);
      } catch (error) {
        console.log(error);
      }
      setLoad(!load);
    };
    getClientAPI();
  }, []);
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Edit Customer</h1>
      <p className="mt-3">Use this form to edit customer data</p>
      {client?.name ? (
        <Forms client={client} load={load} />
      ) : (
        <p>Invalid Client ID</p>
      )}
    </>
  );
};

export default EditClient;
