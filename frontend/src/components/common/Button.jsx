import React from "react";

const Button = ({ children, className = "", ...props }) => {
  return (
    <button className={`btn ${className}`} {...props}>
      {children}
    </button>
  );
};

const ExamplePage = () => {
  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <div>
      <Button onClick={handleClick} className="btn-primary">
        Primary Button
      </Button>

      <Button onClick={handleClick} className="btn-secondary">
        Secondary Button
      </Button>

      <Button onClick={handleClick} className="btn-danger" disabled>
        Disabled Button
      </Button>
    </div>
  );
};

export default ExamplePage;
