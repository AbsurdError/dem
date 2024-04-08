import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

export default function Order({token}){
    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        fetch('https://api-shop.edu.alabuga.space/api-shop/order',{
            method: 'GET',
            headers: {
                "Content-type": "application/json",
                'Authorization': `Bearer ${token}`}
        })
        .then(data => data.json())
        .then(info => {setOrders(info.data); console.log(info.data)})
    }, []);

    useEffect(() => {
        fetch('https://api-shop.edu.alabuga.space/api-shop/products')
        .then(data => data.json())
        .then(info => setProducts(info.data))
        .catch(error => console.error('Ошибка при загрузке продуктов:', error))
    }, []);

    // function sortCarts(products){
    //     let sortedProducts = []
    //     products.forEach((product, index) => {
    //         let newElem
    //         if (newElem.key === product){
               
    //         }

    //     })
    //     return sortedCarts
    // }

    const printOrders = orders.map(order => {
        return(
            <div className="row row-cols-1 row-cols-md-3 mb-3 text-center bg-light" key={order.id}>
            <h2 className="w-100">Заказ №{order.id}</h2>
            {order.products.map(prod => {
                for (let product of products){
                    if (product.id === prod){
                        return(
                            <div className="col">
                                <div className="card mb-4 rounded-3 shadow-sm">
                                    <div className="card-header py-3">
                                        <h4 className="my-0 fw-normal">{product.name}</h4>
                                    </div>
                                    <div className="card-body">
                                        <h1 className="card-title pricing-card-title">{product.price}р.<small className="text-muted fw-light"> &times; 2 шт.</small></h1>
                                        <p>{product.description}</p>
                                    </div>
                                </div>
                            </div>
   
                        )
                    }
                }
            })}

            <h2 className="w-100">Итоговая стоимость: {order.order_price}р.</h2>
        </div>
        )
    })

    return(
    <main>
        <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
            <h1 className="display-4 fw-normal">Ваши заказы</h1>
        </div>
        {printOrders}

        <div className="row justify-content-center gap-1">
            <button className="col-6 btn btn-lg btn-outline-secondary mb-3" type="button" onClick={() => navigate('/')}>Назад</button>
        </div>
    </main>

    )
}