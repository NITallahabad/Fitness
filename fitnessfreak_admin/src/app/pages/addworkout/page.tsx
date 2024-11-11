"use client"
import React from 'react'
import './addworkout.css'
import {toast} from 'react-toastify';

interface Workout {
    name: string;
    description: string;
    durationInMinutes: number;
    exercises: Exercise[];
    imageURL: string;
    imageFile: File | null;
}

interface Exercise{
    name: string;
    description: string;
    sets: number;
    reps: number;
    imageURL: string;
    imageFile: File | null;
}

const page = () => {
    const[workout,setWorkout] = React.useState<Workout>({
        name: '',
        description: '',
        durationInMinutes: 0,
        exercises: [],
        imageURL: '',
        imageFile: null
    });

    const[exercise,setExercise] = React.useState<Exercise>({
        name: '',
        description: '',
        sets: 0,
        reps: 0,
        imageURL: '',
        imageFile: null
    });

    const handleWorkoutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWorkout({
            ...workout,
            [e.target.name]: e.target.value
        })
    }
    const addExerciseToWorkout = () => {}
    const deleteExerciseFromWorkout = (index: number) => {}
    const uploadImage = async(image: File) => {}
    const checkLogin = async () => {}
    const saveWorkout = async () => {}

  return (
    <div className='formpage'>
        <h1 className='title'>Add Workout</h1>

    </div>
  )
}

export default page