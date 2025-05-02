import Button from "./components/Button";
import UserForm from "./components/UserForm";

const Page = () => {
  return (
    <>
      <Button
        onClick={(e) => {
          e.preventDefault();
          alert("Page Button Clicked");
        }}
        className="bg-green-500 text-white font-bold py-2 px-4 rounded"
      >
        Page Button
      </Button>
      <UserForm
        onSubmit={(user) => {
          alert(`User: ${JSON.stringify(user)}`);
        }}
        action="#"
        method="POST"
      />
    </>
  );
};

export { Page };
