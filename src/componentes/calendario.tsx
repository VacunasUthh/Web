import React, { useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './estilos/MyCalendar.css'; // Import the CSS file

interface Vaccination {
    date: Date;
    vaccine: string;
    applied: boolean;
}

const MyCalendar: React.FC = () => {
    const [view, setView] = useState<'year' | 'month'>('year');
    const [date, setDate] = useState<Date>(new Date());

    // Sample vaccination data
    const vaccinations: Vaccination[] = [
        { date: new Date(2024, 5, 19), vaccine: 'Hepatitis', applied: false },
        { date: new Date(2024, 5, 20), vaccine: 'Influenza', applied: true },
        { date: new Date(2024, 5, 21), vaccine: 'SRP', applied: false },
        // Add more sample data as needed
    ];

    const onChange: CalendarProps['onChange'] = (value) => {
        if (value instanceof Date) {
            if (view === 'year') {
                setDate(value);
                setView('month');
            } else {
                setDate(value);
            }
        }
    };

    const onClickMonth = (value: Date) => {
        setDate(value);
        setView('month');
    };

    const onClickYear = (value: Date) => {
        setDate(value);
        setView('year');
    };

    const tileContent = ({ date, view }: { date: Date, view: string }) => {
        if (view === 'month') {
            const vaccination = vaccinations.find(v => v.date.toDateString() === date.toDateString());
            if (vaccination) {
                return (
                    <div style={{ color: vaccination.applied ? 'green' : 'red' }}>
                        {vaccination.vaccine}
                    </div>
                );
            }
        }
        return null;
    };

    const tileClassName = ({ date, view }: { date: Date, view: string }) => {
        if (view === 'month') {
            const vaccination = vaccinations.find(v => v.date.toDateString() === date.toDateString());
            if (vaccination) {
                return vaccination.applied ? 'applied-vaccine' : 'pending-vaccine';
            }
        }
        return '';
    };

    return (
        <div className="calendar-container">
            <Calendar
                onChange={onChange}
                value={date}
                view={view}
                onClickMonth={onClickMonth}
                onClickYear={onClickYear}
                tileContent={tileContent}
                tileClassName={tileClassName}
            />
            <div>
                <button onClick={() => setView('year')}>Volver a vista anual</button>
            </div>
        </div>
    );
};

export default MyCalendar;
