import { useState, useEffect } from "react";
import Client from "../components/Client";

const Home = () => {
  const [client, setClient] = useState([]);

  useEffect(() => {
    const getClientAPI = async () => {
      try {
        const url = import.meta.env.VITE_API_URL;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setClient(resultado);
      } catch (error) {
        console.log(error);
      }
    };
    getClientAPI();
  }, []);
  //-DELETE CLIENT
  const handleDelete = async (id) => {
    const confirmatio = confirm("Do you want to delete this client?");
    if (confirmatio) {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`;
        const respuesta = await fetch(url, {
          method: "DELETE",
        });
        await respuesta.json();
        const arrayClient = client.filter((client) => client.id !== id);
        setClient(arrayClient);
      } catch (error) {
        console.log(error);
      }
    }
  };
  //-
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Customers</h1>
      <p className="mt-3">Manage your clients</p>
      <table className="w-full mt-5 table-auto shadow bg-white">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Surname</th>
            <th className="p-2">Email</th>
            <th className="p-2">Birthdate</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {client.map((client) => (
            <Client
              key={client.id}
              client={client}
              handleDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
