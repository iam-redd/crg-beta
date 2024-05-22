import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import LogIn from '../../Login/LogIn'

export default function Template(props) {
    const {loginVisible,children} = props
    return (
        <AnimatePresence>
            {
                loginVisible &&
                <motion.div
                    initial={{ opacity: 0, height: 0, top: '-200px' }}
                    animate={{ opacity: 1, height: 'auto', top: 200 }}
                    exit={{ height: 0, top: '-200px' }}
                    style={{ padding: '0.8rem 1.2rem', overflow: 'hidden', position: 'absolute', zIndex: 10 }}
                transition={{duration: 0.2}}
                >
                    {/* <LogIn/> */}
                </motion.div>
            }
        </AnimatePresence>
    )
}
