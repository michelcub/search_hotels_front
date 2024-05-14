import React, { useState } from 'react';
import toast from 'react-hot-toast';

export const DateRangePicker = ({ action }) => {
    const [initDate, setInitDate] = useState(''); // Inicializa con la fecha actual
    const [endDate, setEndDate] = useState(''); // Inicializa con la fecha actual

    const handleSelectDate = (event) => {
        const selectedDate = event.target.value;
        const currentDate = new Date().toISOString().split('T')[0]; // Obtiene la fecha actual en formato YYYY-MM-DD

        if (event.target.name === 'init') {
            if (selectedDate < currentDate) {
                toast.error('No se pueden seleccionar días anteriores al día presente');
                setInitDate(''); // Actualiza el valor a la fecha actual
            } else {
                setInitDate(selectedDate);
            }
            document.getElementById('endDate').focus();
        } else if (event.target.name === 'end') {
            if (selectedDate <= currentDate) {
                toast.error('La fecha de finalización debe ser posterior al día actual');
                // Calcula el día siguiente al actual
                const nextDay = new Date();
                nextDay.setDate(nextDay.getDate() + 1);
                setEndDate(''); // Actualiza el valor al día siguiente
            } else {
                setEndDate(selectedDate);
            }
        }
        action(event);
    };

    return (
        <div className="flex items-center gap-3">
            <input
                id="initDate"
                className="input w-full max-w-xs bg-white opacity-[70%] rounded-none text-black text-lg"
                name={'init'}
                onChange={handleSelectDate}
                type="date"
                value={initDate} // Establece el valor del input como initDate
                required={true}
            />
            <i className="fa-solid fa-arrow-right"></i>
            <input
                id="endDate"
                className="input w-full max-w-xs bg-white opacity-[70%] rounded-none text-black text-lg"
                name={'end'}
                onChange={handleSelectDate}
                type="date"
                value={endDate} // Establece el valor del input como endDate
                required={true}
            />
        </div>
    );
};
