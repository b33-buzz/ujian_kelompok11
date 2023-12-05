const Button = ({ onClick }) => {
  return (
    <>
      <button
        onClick={onClick}
        className="btn btn-primary mx-8 w-[150px] font-bold text-white"
      >
        Add
      </button>
    </>
  );
};

export default Button;
