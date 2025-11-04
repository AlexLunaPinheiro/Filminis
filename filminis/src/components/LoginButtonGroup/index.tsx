import './LoginButtonGroup.css';

function ButtonGroup(){
  return (
    <div className="button-group-container">
      <button className="tab-button active">Registro</button>
      <button className="tab-button">Login</button>
    </div>
  );
};

export default ButtonGroup;