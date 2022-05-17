import Forms from "../components/Forms";

const NewClient = () => {
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">New Client</h1>
      <p className="mt-3">
        Fill in the following paragraphs to register a client
      </p>
      <Forms />
    </>
  );
};

export default NewClient;
