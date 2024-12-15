import React from 'react';
import MessMenu from "./lib/const/MessMenu.json"; // Ensure the path and filename are correct
import Rightbar from './Rightbar';
import { MdOutlineRestaurantMenu } from "react-icons/md";

const Menu = () => {
  const colors = ['bg-purple-200', 'bg-[#ACC3FD]', 'bg-[#BAE5F5]', 'bg-[#CCEFBF]'];

  return (
    <div className='flex flex-row justify-between'>
      {/* Main Menu Section */}
      <div className='flex flex-col w-full md:w-full mb-5 ml-5 mr-5'>
        {/* Header */}
        <div className='mt-3 text-lg w-auto font-bold flex-1 flex justify-center items-center'>
          Weekly Mess Menu
        </div>

        {/* Iterate through each day */}
        {MessMenu.map((dayMenu, dayIndex) => (
          <div key={dayIndex} className='flex flex-col mt-2'>
            {/* Day Header */}
            <h2 className='mb-2 font-bold w-full border-b flex items-center'>
              <MdOutlineRestaurantMenu className='mr-2' />
              {dayMenu.day}
            </h2>

            {/* Meals Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full h-auto'>
              {dayMenu.meals.map((meal, mealIndex) => (
                <div
                  key={mealIndex}
                  className={`p-4 rounded-md ${colors[mealIndex % colors.length]} shadow-md`}
                >
                  <ul>
                    {/* Meal Time */}
                    <li className='font-semibold mb-1 text-lg'>{meal.time}</li>

                    {/* Meal Items */}
                    {meal.items.map((item, itemIndex) => (
                      <li key={itemIndex} className='list-disc ml-4'>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Right Sidebar */}
      <div>
        <Rightbar />
      </div>
    </div>
  );
};

export default Menu;
