import React from 'react';

type CalorieIntakePopupProps = {
    setShowCalorieIntakePopup: React.Dispatch<React.SetStateAction<boolean>>;
};

const CalorieIntakePopup: React.FC<CalorieIntakePopupProps> = ({ setShowCalorieIntakePopup }) => {
    return (
        <div className="popup">
            <div>Calorie Intake Popup</div>
            <button onClick={() => setShowCalorieIntakePopup(false)}>Close</button>
        </div>
    );
};

export default CalorieIntakePopup;