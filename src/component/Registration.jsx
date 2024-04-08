import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

export default function Registration(){
    const [email, setEmail] = useState('')
    const [fio, setFio] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    function registration(event){
        event.preventDefault();
        fetch('https://api-shop.edu.alabuga.space/api-shop/signup', {
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({fio, email, password})
        })
        .then(data => data.json())
        .then(info => {
            if (info.data){
                navigate('/login')
            } else {
                setError(info.error.message)
            }
        })
    }

    return(
    <main>
        <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
            <h1 className="display-4 fw-normal">Регистрация</h1>
        </div>
        <div className="row row-cols-1 row-cols-md-3 mb-3 text-center justify-content-center">
            <div className="col">
                <div className="row">
                <p className="text-danger">{error}</p>
                    <form>
                        <h1 className="h3 mb-3 fw-normal">Пожалуйста заполните все поля</h1>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingFio" placeholder="ФИО" value={fio} onChange={event => setFio(event.target.value)}/>
                            <label for="floatingFio">ФИО</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value={email} onChange={event => setEmail(event.target.value)}/>
                            <label for="floatingInput">Email</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)}/>
                            <label for="floatingPassword">Password</label>
                        </div>

                        <button className="w-100 btn btn-lg btn-success mb-3" type="submit" onClick={registration}>Зарегистрироваться</button>
                        <button className="w-100 btn btn-lg btn-outline-secondary" type="submit" onClick={() => navigate('/')}>Назад</button>
                    </form>
                </div>

            </div>
        </div>
    </main>
    )
}