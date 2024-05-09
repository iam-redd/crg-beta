import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addData } from "../../../store/slices/userSlice";
import { RegForm } from "../Registration/RegForm";
 
export function LogForm() {
  const [open, setOpen] = React.useState(false);
  const handleOpenLog = () => setOpen((cur) => !cur);

    const [isVisible, setVisible] = useState(false)
    const [loginError, setLogin] = useState(false)
    // const userInfo = useSelector(state => state.user.userInfo)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [errorMessage, setMessage] = useState('')
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            setLogin(false)
            const email = e.target.email.value
            const password = e.target.password.value

            const data = await axios.post(`/auth/login`, {
                email,
                password
            })
            console.log(data)
            if (data.status === 200) {
                console.log(data.data)
                window.localStorage.setItem('token', data.data.token)
                dispatch(addData(data.data))
                setVisible(false)
                navigate('/user')
            }
            if (data.status === 403 || data.status === 404) {
                setLogin(true)
            }
            return null

        } catch (error) {
            console.log(error)
            const status = error.response.status
            if (status === 403 || status === 404) {
                handleError('Неверный логин или пароль')
            } else if (status === 500) {
                handleError('Не удалось авторизоватся')
            } else {
                handleError(error.message)
            }
        }
    }


    const handleError = (message) => {
        setMessage(message)
        console.log(errorMessage)
        setLogin(true)
    }
    useEffect(() => {
        setVisible(true)
        // userInfo !== null && dispatch(logout())
    },[setVisible])
 
  return (
    <>
      <p onClick={handleOpenLog}>Войти</p>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpenLog}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-2">
            <h2 className="text-center font-bold text-lg">Авторизация</h2>
            <p className='pb-2 text-center'>Добро пожаловать, рады вас видеть. <br /> Чтобы войти в свой аккаунт, пожалуйста введите ваши данные.</p>
            
            <Input label="Номер телефона" size="lg" defaultValue={'+998'}/>
              
            {/*<p className="text-sm"><span className="text-red-700">*</span>Номер телефона без знака '+'</p>*/}

            <Input label="Пароль" size="lg" />

            <div className="-ml-2.5 -mt-3">
              <Checkbox label="Запомнить" />
            </div>
          </CardBody>
          {loginError &&
            <Typography
                variant="small"
                color="gray"
                className="mt-2 flex items-center gap-1 font-normal"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="-mt-px h-4 w-4"
                >
                    <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                        clipRule="evenodd"
                    />
                </svg>
                <p className="text-red-500">{errorMessage}</p>
            </Typography>
        }
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleOpenLog} fullWidth>
            {isVisible ? 'Войти' : 'Загрузка...'}
            </Button>

            <Typography variant="small" className="mt-4 flex justify-center">
              Еще нет аккаунта?
              <Typography
                as="a"
                href={<RegForm />}
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
                
              >
                Зарегистрироваться
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}