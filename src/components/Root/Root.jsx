import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Toaster } from 'react-hot-toast';

const Root = () => {
    return (
        <div className='flex flex-col min-h-screen bg-[#F7F9F9]'>
            <Navbar />
            <div className='grow'>
                <Outlet>

                </Outlet>
            </div>
            <Footer />

            <Toaster position="bottom-right"/>
        </div>
    );
};

export default Root;