import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

export default function Cart({token}){
    const [carts, setCarts] = useState([])
    // const [sortedCarts, setSortetdCarts] = useState([])
    const [userSortedCarts, setUserSortedCarts] = useState([])
    const navigate = useNavigate()

    function sortCarts(carts){
        let sortedCarts = []
        carts.forEach(cart => {
            if (sortedCarts.find(sCart => sCart.product_id === cart.product_id)){
                console.log(sortedCarts.find(sCart => sCart.product_id === cart.product_id).count++)
            } else {
                sortedCarts.push({...cart, count: 1})
            }
            console.log(sortedCarts)

        })
        return sortedCarts
    }
    


    useEffect(() => {
        fetch('https://api-shop.edu.alabuga.space/api-shop/cart', {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                'Authorization': `Bearer ${token}`
            },           
        })
        .then(data => data.json())
        .then(info => {setCarts(info.data);
            setUserSortedCarts(sortCarts(info.data))

        })
    }, []);


    function deleteFromCart(id){
        for (let cart of carts){
            if (cart.product_id === id){
                fetch(`https://api-shop.edu.alabuga.space/api-shop/cart/${cart.id}`,{
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json",
                        'Authorization': `Bearer ${token}`}
                })     
            }
  
        }
        setUserSortedCarts(userSortedCarts.filter(cart => cart.product_id !== id))

    }

    function increment(id, index){
        const copy = [...userSortedCarts]
        copy[index].count++
        setUserSortedCarts(copy)
        fetch(`https://api-shop.edu.alabuga.space/api-shop/cart/${id}`,{
            method: "POST",
            headers: {
                "Content-type": "application/json",
                'Authorization': `Bearer ${token}`}
        })
    }

    function descrement(id, index){
        const copy = [...userSortedCarts]
        if (copy[index].count > 1){
            copy[index].count--
            setUserSortedCarts(copy)      
            for (let cart of carts){
                if (cart.product_id === id ){
                    fetch(`https://api-shop.edu.alabuga.space/api-shop/cart/${cart.id}`,{
                        method: "DELETE",
                        headers: {
                            "Content-type": "application/json",
                            'Authorization': `Bearer ${token}`}
                    })
                }
                break
            }
            setCarts(carts.filter(cart => cart.product_id !== id))
        }
    }

    function makeOrder(){
        fetch('https://api-shop.edu.alabuga.space/api-shop/order',{
            method:     "POST",
            headers:    {
                "Content-type": "application/json",
                'Authorization': `Bearer ${token}`}
        })
        navigate('/order')
    }

    const printCart = userSortedCarts?.map((cart, index) => {
        return(
        <div className="col" key={cart.id}>
            <div className="card mb-4 rounded-3 shadow-sm">
                <div className="card-header py-3">
                    <h4 className="my-0 fw-normal">{cart.name}</h4>
                </div>
                <div className="card-body">
                    <h1 className="card-title pricing-card-title">{cart.price}р.<small className="text-muted fw-light"> &times; {cart.count}
                        шт.</small></h1>
                    <p>{cart.description}</p>

                    <button type="button" className="btn btn-lg btn-info mb-3" onClick={() => increment(cart.product_id, index)}>+</button>
                    <button type="button" className="btn btn-lg btn-warning mb-3" onClick={() => descrement(cart.product_id, index)}>&minus;</button>
                    <button type="button" className="btn btn-lg btn-outline-danger mb-3" onClick={() => deleteFromCart(cart.product_id)}>Удалить из корзины</button>
                </div>
            </div>
        </div>
        )
    })
    return(
    <main>
        <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
            <h1 className="display-4 fw-normal">Корзина</h1>
        </div>
        <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
            {printCart}
        </div>
        <div className="row justify-content-center gap-1">
            <h2 className="mb-5">Итоговая стоимость: 600р.</h2>
            <button className="col-6 btn btn-lg btn-outline-secondary mb-3" type="button" onClick={() => navigate('/')}>Назад</button>
            { Boolean(userSortedCarts.length) && <button type="button" className="col-6 btn btn-lg btn-success mb-3" onClick={makeOrder}>Оформить заказ</button>}

        </div>
    </main>
    )
}