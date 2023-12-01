import { useEffect, useState } from 'react';
import { IoMoon, IoSunny } from "react-icons/io5";

const Switch = () => {
  const [darkThemeIcon, setDarkThemeIcon] = useState(false);
  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
    localStorage.setItem("selectedTheme", "dark");
    setDarkThemeIcon(true);
  }

  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
    localStorage.setItem("selectedTheme", "light");
    setDarkThemeIcon(false);
  }
  const selectedTheme = localStorage.getItem("selectedTheme");

  useEffect(() => {
    if (selectedTheme === "dark") {
      setDarkMode();
    }
  }, [])

  const toggleTheme = e => {
    if (e.target.checked) {
        setDarkMode();
    } else {
        setLightMode();
    }
  }
  return (
    <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={e => toggleTheme(e)} defaultChecked={selectedTheme === "dark"}/>
        <label className="form-check-label text-light" htmlFor="flexSwitchCheckDefault">{darkThemeIcon ? (<IoMoon className="mb-1"/>) : (<IoSunny className="mb-1"/>)}</label>
    </div>
  )
}

export default Switch