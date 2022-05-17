import { useNavigate } from "react-router-dom";

const Client = ({ client, handleDelete }) => {
  const navigate = useNavigate();

  const { name, surname, email, birthdate, notes, id } = client;
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-3">{name}</td>
      <td className="p-3">{surname}</td>
      <td className="p-3">{email}</td>
      <td className="p-3">{birthdate}</td>
      <td className="p-3">
        <button
          type="button"
          className="bg-yellow-500 hover:bg-yellow-600 block w-full text-white p-2 uppercase font-bold text-xs"
          onClick={() => navigate(`/client/${id}`)}
        >
          See
        </button>
        <button
          type="button"
          className="bg-blue-600 hover:bg-blue-700 block w-full text-white p-2 uppercase font-bold text-xs mt-2"
          onClick={() => navigate(`/client/edit/${id}`)}
        >
          Edit
        </button>
        <button
          type="button"
          className="bg-red-600 hover:bg-red-700 block w-full text-white p-2 uppercase font-bold text-xs mt-2"
          onClick={() => handleDelete(id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Client;
