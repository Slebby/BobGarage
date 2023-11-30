import { Fragment } from 'react';
import { IoMoon, IoSunny } from "react-icons/io5";

const Switch = () => {
  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
  }

  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
  }

  const toggleTheme = e => {
    if (e.target.checked) setLightMode();
    else setDarkMode();
  }
  return (
    <div className="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={e => toggleTheme(e)}/>
        <label class="form-check-label text-light" for="flexSwitchCheckDefault">Theme</label>
    </div>
  )
}

export default Switch