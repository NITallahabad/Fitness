import React from 'react';
import '../popup.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AiFillDelete, AiOutlineClose } from 'react-icons/ai';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeClock } from '@mui/x-date-pickers/TimeClock';
import dayjs, { Dayjs } from 'dayjs';



type CalorieIntakePopupProps = {
  setShowCalorieIntakePopup: React.Dispatch<React.SetStateAction<boolean>>;
};

const CalorieIntakePopup: React.FC<CalorieIntakePopupProps> = ({ setShowCalorieIntakePopup }) => {
  const [date, setDate] = React.useState<Date | null>(new Date());
  const [time, setTime] = React.useState<Dayjs | null>(null);

  const handleDateChange = (val: Date | null) => {
    setDate(val);
    console.log(val);
  };

  const handleTimeChange = (newValue: Dayjs | null) => {
    setTime(newValue);
    console.log(newValue);
  };

  return (
    <div className="popupout">
      <div className="popupbox">
        <button className="close" onClick={() => setShowCalorieIntakePopup(false)}>
          Close <AiOutlineClose />
        </button>
        <DatePicker
          selected={date}
          onChange={handleDateChange}
          maxDate={new Date()} // Example: sets the maximum selectable date to today
          dateFormat="MMMM" // Sets the format of the date displayed
        />
        <TextField id="outlined-basic" label="Food item name" variant="outlined" color="warning" />
        <TextField id="outlined-basic" label="Food item amount (in gms)" variant="outlined" color="warning" />
        <div className="timebox">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              value={time}
              onChange={handleTimeChange}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </LocalizationProvider>
          <Button variant="contained" color="warning">
            Save
          </Button>
          <div className='hrline'></div>
          <div className='items'>
            <div className='item'>
              <h3>Apple</h3>
              <h3>100 gms</h3>
              <button> <AiFillDelete /></button>
            </div>
            <div className='item'>
              <h3>Banana</h3>
              <h3>200 gms</h3>
              <button> <AiFillDelete /></button>

            </div>
            <div className='item'>
              <h3>Rice</h3>
              <h3>300 gms</h3>
              <button> <AiFillDelete /></button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CalorieIntakePopup;
