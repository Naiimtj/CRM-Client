import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const SeeClients = () => {
  const [client, setClient] = useState({});
  const [load, setLoad] = useState(true);

  const { id } = useParams();
  useEffect(() => {
    const clientAPI = async () => {
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
    clientAPI();
  }, []);

  return load ? (
    <Spinner />
  ) : Object.keys(client).length === 0 ? (
    <p>No results</p>
  ) : (
    <div>
      <h1 className="font-black text-4xl text-blue-900">
        Customer: {client.name}
      </h1>
      <p className="mt-3">Client information</p>

      <p className=" text-xl text-gray-700 mt-10">
        <span className="text-gray-800 uppercase font-bold">Customer: </span>
        {client.name}
      </p>

      <p className=" text-xl text-gray-600 mt-4">
        <span className="text-gray-800 uppercase font-bold">
          Customer Surname:{" "}
        </span>
        {client.surname}
      </p>

      <p className=" text-xl text-gray-600 mt-4">
        <span className="text-gray-800 uppercase font-bold">Email: </span>
        {client.email}
      </p>

      {client.birthdate && (
        <p className=" text-xl text-gray-600 mt-4">
          <span className="text-gray-800 uppercase font-bold">Birthdate: </span>
          {client.birthdate}
        </p>
      )}

      {client.notes && (
        <p className=" text-lg text-gray-600 mt-4">
          <span className="text-gray-800 uppercase font-bold">Note: </span>
          {client.notes}
        </p>
      )}
    </div>
  );
};

export default SeeClients;
