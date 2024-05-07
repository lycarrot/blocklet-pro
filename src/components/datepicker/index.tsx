import DatePicker from "tailwind-datepicker-react"
import { IOptions } from "tailwind-datepicker-react/types/Options"
import React,{useState,useEffect} from "react"

interface DatepickerProps {
    value: string; 
    onChange: (value: string) => void; 
}
const NewDatepicker:React.FC<DatepickerProps>  = ({value, onChange}) => {

	const options: IOptions = {
		autoHide: true,
		todayBtn: true,
		clearBtn: true,
		inputDateFormatProp: {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		},
		theme: {
			background: "",
			todayBtn: "",
			clearBtn: "",
			icons: "",
			text: "",
			disabledText: "",
			input: "",
			inputIcon: "",
			selected: "",
		},
        inputIdProp: "date",
        inputNameProp: "date",

	}
    const [show, setShow] = useState<boolean>(false)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    useEffect(() => {
        if (value) {
            const parsedDate = new Date(value);
            setSelectedDate(parsedDate);
        }
    }, [value]);
    const handleChange = (selectedDate: Date) => {
        setSelectedDate(selectedDate);
        onChange(switchDate(selectedDate));
    };

    const switchDate=(date:Date)=>{
        var date = new Date(date);
        const year: number = date.getFullYear();
        const month: number = date.getMonth() + 1; 
        const day: number = date.getDate();
        const formattedMonth: string = month < 10 ? '0' + month : String(month);
        const formattedDay: string = day < 10 ? '0' + day : String(day);
        return  `${year}-${formattedMonth}-${formattedDay}`;
    }
	return (
        <div className="relative w-2/4 pb-10">
        <DatePicker value={selectedDate} show={show} setShow={(state) => setShow(state)}  onChange={handleChange} options={options} classNames="absolute" />
    </div>)
}

export default NewDatepicker