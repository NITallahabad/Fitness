import React, { useState } from 'react'
import './AuthPopup.css'
import Image from 'next/image'
import logo from '@/assets/logo.png'
import Input from '@mui/joy/Input';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { AiFillDelete, AiOutlineClose } from 'react-icons/ai'

interface AuthPopupProps {
    setShowpopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const handleLogin = () => { }
const handleSignup = () => { }


const AuthPopup: React.FC<AuthPopupProps> = ({ setShowpopup }) => {
    const [showSignup, setShowSignup] = React.useState<boolean>(false)
    return (
        <div className='popup'>
            <button className='close'
                onClick={() => {
                    setShowpopup(false)
                }}
            >
                <AiOutlineClose />
            </button>

            {
                showSignup ? (
                    <div className='authform'>

                        <div className='left'>
                            <Image src={logo} alt="Logo" />
                        </div>
                        <div className='right'>
                            <h1>Signup to become a freak</h1>
                            <form action="">
                                <Input
                                    color="warning"
                                    placeholder="name"
                                    size="lg"
                                    variant="solid"

                                />
                                <Input
                                    color="warning"
                                    placeholder="email"
                                    size="lg"
                                    variant="solid"


                                />
                                <Input
                                    color="warning"
                                    placeholder="password"
                                    size="lg"
                                    variant="solid"
                                    type='password'


                                />


                                <Input color="warning" size="lg" variant="solid" type="number" placeholder='Weight in kg'

                                />

                                <Select
                                    color="warning"
                                    placeholder="Gender"
                                    size="lg"
                                    variant="solid"
                                >
                                    <Option value="male">Male</Option>
                                    <Option value="female">Female</Option>
                                    <Option value="other">Other</Option>
                                </Select>

                                <label htmlFor="">Height</label>


                                <Input color="warning" size="lg" variant="solid" type="number" placeholder='cm'

                                />




                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handleSignup()
                                    }}
                                >Signup</button>
                            </form>
                            <p>Already have an account?  <button onClick={() => {
                                setShowSignup(false)
                            }}>Login</button></p>
                        </div>

                    </div>
                ) : (
                    <div className='authform'>
                        <div className='left'>
                            <Image src={logo} alt="Logo" />
                        </div>
                        <div className='right'>
                            <h1>Login to become a freak</h1>
                            <form action="">
                                <Input
                                    color="warning"
                                    placeholder="email"
                                    size="lg"
                                    variant="solid"

                                />

                                <Input
                                    color="warning"
                                    placeholder="password"
                                    size="lg"
                                    variant="solid"
                                    type='password'


                                />
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handleLogin()
                                    }}
                                >Login</button>
                            </form>
                            <p>Don't have an account?  <button onClick={() => {
                                setShowSignup(true)
                            }}>Signup</button></p>
                        </div>

                    </div>
                )
            }
        </div>
    )
}

export default AuthPopup