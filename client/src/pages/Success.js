import React, { useEffect } from 'react'
import { useHistory } from "react-router-dom"
import { idbPromise } from "../utils/helpers"
import Jumbotron from '../components/Jumbotron';
import { useMutation } from '@apollo/react-hooks';
import {ADD_ORDER} from "../utils/mutations"

export default function Success() {
    const [addOrder] = useMutation(ADD_ORDER);
    const history = useHistory()
    useEffect(() => {
        async function saveOrder() {
            const cart = await idbPromise('cart', 'get');
            const products = cart.map(item => item._id);
            if (products.length) {
                const { data } = await addOrder({ variables: { products } });
                const productData = data.addOrder.products;

                productData.forEach((item) => {
                    idbPromise('cart', 'delete', item);
                });
            }
            setTimeout(()=>{
                history.push('/')
            },3000)
        }

        saveOrder();
    }, [addOrder]);
    return (
        <div>
            <Jumbotron>
                <h1>Success</h1>
                <h2>Thanks!</h2>
                <h3>You will be redirected shortly</h3>
            </Jumbotron>
        </div>
    )
}
