import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import * as formik from "formik";
import axios from "axios"
import UserForm from "./components/Form"

function App() {
    
  const [emails, setEmails] = useState(["waffle@syrup.com"]);
    
    return (
      <div className="App">
          <UserForm emails={emails} setEmails={setEmails}/>
      </div>
    );
  }

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
