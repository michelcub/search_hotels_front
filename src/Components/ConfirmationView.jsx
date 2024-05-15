export const ConfirmationView = () => {
    return(
        <section className="w-screen h-[80vh] bg-transparent text-white flex justify-center items-center ">
                <div className="bg-black opacity-[60%] w-[60vw] h-[70vh] rounded-2xl p-6">
                    <div className="flex items-center justify-around">
                        <div>
                            <h1 className="text-3xl">Services Available</h1>
                            <p className="text-lg">Select the services you want to include in your reservation</p>
                        </div>
                        <div>
                            <button className="btn bg-green-400 border-0" onClick={handleNextStep}>Next Step</button>
                        </div>
                    </div>
                    <div className="w-full h-[55vh] transparent mt-5 rounded-2xl flex justify-center items-center flex-col gap-3 overflow-x-auto p-6">
                        
                        
                    </div>
                </div>
            </section>
        )
    
}