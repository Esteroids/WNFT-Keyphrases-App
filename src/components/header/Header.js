import {Link}  from "react-router-dom";
import Web3Connect from "./Web3Connect";

function Header(){

  
    return (
<nav className="navbar navbar-expand-xl h-100 navbar-secondary d-flex justify-content-between">
    <div className="d-flex align-items-center">
      <Link to={'/'}>
        <svg className="navbar-brand h-100" width="161" height="44" version="2.0" alt="Esteroids logo">
          <use href="#esteroids-logo" />
        </svg>
      </Link>
      <div className="h3">WNFT Center</div>
    </div>
    
    <Web3Connect />

  </nav>
)
  
  }
  
  
  export default Header;