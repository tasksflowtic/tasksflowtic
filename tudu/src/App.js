import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from './AppRoutes';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import './Components/Controller/AxiosIntercaptor'
import AccountSuspend from './Components/User/AccountSuspend';
export const ThemeContext = createContext()

function App() {

  const URL = process.env.REACT_APP_SERVER_URL
  const [role, setrole] = useState()
  const [user, setuser] = useState()
  const [isActive, setisActive] = useState(true)
  const [loading, setloading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${URL}/getdata`, {
          withCredentials: true
        })
        setuser(res?.data?.user)
        setrole(res?.data?.user?.Role)
        setisActive(res?.data?.user?.isActive)
        setloading(true)
      } catch (error) {
        const status = error?.response?.status
        setloading(true)
        if (status === 400 || status === 404 || status === 500) {
          alert(error?.response?.data?.message)
        } else if (status === 403) {
          setisActive(false)
        }
      }
    }
    if (URL) {
      fetchData()
    }
  }, [URL])

  if(!isActive) return <AccountSuspend/>
  if(!loading) return <h1>Loading...</h1>

  return (
    <div className="App">
      <ThemeContext.Provider value={{ user, role }}>
        <Router>
          <AppRoutes />
        </Router>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
