import { useState } from "react"
import { TextInput } from "./TextInput"
import { useFetch } from "../Hooks/useFetch"
import useAppContext from "../ContextManagment/AppContext"

export const ModalPayment = () => {

    const [card, setCard] = useState()
    const {actions, store} = useAppContext()
    const handleUserInput = (e) => {
        setCard({
            ...card,
            [e.target.name]: e.target.value
        })
    }

    const handlePayment = (e) => {
        e.preventDefault()
        actions.setPayment()
    }
    return(
        <dialog id="modal_payment" className="modal">
            <div className="modal-box w-11/12 max-w-5xl bg-black opacity-[80%] h-[30rem]">
                
                
                <form method="dialog h-[30rem]" onSubmit={handlePayment}>
                    <div className="h-[20rem] flex gap-3 justify-around">
                        <div className="flex flex-col gap-3 h-[20rem] " >
                            <label className="flex flex-col">
                                Name
                                <TextInput placeholder={'Name'} name={'card_name'} action={handleUserInput} required={true}/>
                            </label>
                            <label className="flex flex-col">
                                Card Number
                                <TextInput placeholder={'6724 9733 8371 9721'} name={'card_number'} action={handleUserInput} required={true} type="number"/>
                            </label>
                            
                            <div className="flex gap-3">
                                <label className="flex flex-col w-20">
                                    Expiraction
                                    <TextInput placeholder={'03/25'} name={'card_exp'} action={handleUserInput} required={true}/>
                                </label>
                                <label className="flex flex-col" >
                                    CVV
                                    <TextInput placeholder={'CVV'} name={'card_cvv'} action={handleUserInput} required={true} type={'number'}/>
                                </label>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold">Total: $500</h2>

                            <div className="card bg-green-400 w-[20rem] h-[12rem] mt-5">
                                <div className="text-black p-2">
                                    <h6 className=" text-[12px]">Card Holder</h6>
                                    <p>{card?.card_name.toUpperCase()|| 'Jhon Smith'}</p>
                                    <h2 className="mt-1 text-[12px]">Card Number</h2>
                                    <p>{card?.card_number|| '6724 9733 8371 9721'}</p>
                                    <div className="flex gap-2 items-center">
                                        <h2 className="mt-1 text-[12px]">Expiration</h2>
                                        <p>{card?.card_exp || '03/25'}</p>
                                    </div>
                                </div>
                                <div className="bg-black w-full h-10 flex items-center justify-end gap-2 pe-4">
                                    <h2>CVV</h2>
                                    <p>{card?.card_cvv || ' 972'}</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* if there is a button, it will close the modal */}
                    <div className="flex justify-center">
                        <button className="btn w-[70%]" type="submit">Pagar</button>
                    </div>
                </form>
            </div>
           
        </dialog>

    )
}