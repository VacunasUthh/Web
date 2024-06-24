import React, { useState, useEffect } from 'react';
import { Calendar, theme, Badge } from 'antd';
import type { CalendarProps } from 'antd';
import type { Dayjs } from 'dayjs';
import moment from 'moment';
import 'moment/locale/es';
import esES from 'antd/es/calendar/locale/es_ES';
import { API_URL } from "../../utils/constants";


moment.locale('es');

interface Vaccination {
    date: Date;
    vaccine: string;
    applied: boolean;
}

interface VaccinationResponse {
    notifications: Vaccination[];
    upcomingVaccinations: Vaccination[];
}

interface MyCalendarProps {
    childId: string;
}

const fetchVaccinationData = async (childId: string): Promise<VaccinationResponse> => {
    try {
        const response = await fetch(`${API_URL}/parents/child/${childId}`);
        if (!response.ok) {
            throw new Error('Error fetching vaccination data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching vaccination data:', error);
        return { notifications: [], upcomingVaccinations: [] };
    }
};

const MyCalendar: React.FC<MyCalendarProps> = ({ childId }) => {
    const { token } = theme.useToken();
    const [date, setDate] = useState<Dayjs | null>(null);
    const [mode, setMode] = useState<CalendarProps<Dayjs>['mode']>('year');
    const [vaccinations, setVaccinations] = useState<Vaccination[]>([]);

    useEffect(() => {
        const getData = async () => {
            const data = await fetchVaccinationData(childId);
            setVaccinations([...data.notifications, ...data.upcomingVaccinations]);
        };
        getData();
    }, [childId]);

    const wrapperStyle: React.CSSProperties = {
        width: '100%',
        maxWidth: 800,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
        overflow: 'hidden',
        margin: '0 auto',
    };

    const calendarStyle: React.CSSProperties = {
        width: '100%',
        maxHeight: 400,
        overflow: 'auto',
    };

    const dateCellRender = (value: Dayjs) => {
        const currentDayVaccinations = vaccinations.filter(
            v => moment(v.date).isSame(value.toDate(), 'day') // Convertir Dayjs a Date y luego usar moment
        );

        let cellStyle: React.CSSProperties = {};
        if (currentDayVaccinations.length > 0) {
            const allApplied = currentDayVaccinations.every(v => v.applied);
            cellStyle = { backgroundColor: allApplied ? 'lightgreen' : 'lightcoral' };
        }

        return (
            <div style={{ ...cellStyle, padding: '1px', height: '100%' }}>
                <div>
                    {currentDayVaccinations.map(item => (
                        <div key={item.vaccine} style={{ margin: '2px 0' }}>
                            <Badge 
                                status={item.applied ? "success" : "error"} 
                                text={item.vaccine} 
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const onPanelChange = (value: Dayjs, newMode: CalendarProps<Dayjs>['mode']) => {
        console.log(value.format('YYYY-MM-DD'), newMode);
        setMode(newMode);
    };

    return (
        <div style={wrapperStyle}>
            <Calendar 
                style={calendarStyle}
                fullscreen={false} 
                onPanelChange={onPanelChange} 
                dateCellRender={dateCellRender}
                mode={mode}
                locale={esES}
            />
        </div>
    );
};

export default MyCalendar;
