import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import LogIn from '../../Login/LogIn';
import Registration from '../../Registration/Registration';
import CodePage from '../../../CodeVerify/CodePage';
export default function Modals() {
    const userInfo = useSelector(state => state.user.userInfo)
    const [loginVisible, setLoginVisible] = useState(false)
    const [registerVisible, setRegisterVisible] = useState(false)
    const [codeFormVisible, setCodeFormVisible] = useState(false)
    useEffect(() => {
        if (userInfo === null && registerVisible === false && codeFormVisible === false) setLoginVisible(true)
    }, []);
    return (
        <>
            {/* <button style={{
                width: 300,
                backgroundColor: '#ddd',
                padding: '0.8rem 1.2rem'
            }}
                onClick={() => setLoginVisible(!loginVisible)}>Click me</button> */}
            <AnimatePresence>
                {
                    loginVisible &&
                    <motion.div
                        initial={{ opacity: 0, height: 0, top: '-200px' }}
                        animate={{ opacity: 1, height: 'auto', top: 80 }}
                        exit={{ height: 0, top: '-200px' }}
                        style={{ padding: '0.8rem 1.2rem', overflow: 'hidden', position: 'absolute', zIndex: 10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <LogIn setLoginVisible={setLoginVisible} setRegisterVisible={setRegisterVisible} setCodeFormVisible={setCodeFormVisible} />
                    </motion.div>
                }
            </AnimatePresence>
            <AnimatePresence>
                {
                    registerVisible &&
                    <motion.div
                        initial={{ opacity: 0, height: 0, top: '-200px' }}
                        animate={{ opacity: 1, height: 'auto', top: 80 }}
                        exit={{ height: 0, top: '-200px' }}
                        style={{ padding: '0.8rem 1.2rem', overflow: 'hidden', position: 'absolute', zIndex: 10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Registration setLoginVisible={setLoginVisible} setRegisterVisible={setRegisterVisible} setCodeFormVisible={setCodeFormVisible} />
                    </motion.div>
                }
            </AnimatePresence>
            <AnimatePresence>
                {
                    codeFormVisible &&
                    <motion.div
                        initial={{ opacity: 0, height: 0, top: '-200px' }}
                        animate={{ opacity: 1, height: 'auto', top: 80 }}
                        exit={{ height: 0, top: '-200px' }}
                        style={{ padding: '0.8rem 1.2rem', overflow: 'hidden', position: 'absolute', zIndex: 10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <CodePage setCodeFormVisible={setCodeFormVisible} />
                    </motion.div>
                }
            </AnimatePresence>
        </>
    )
}
