import React from 'react'
import { Navigate, Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements, useLocation } from 'react-router-dom'
import { Login } from '../pages/login';
import { Doc } from '../pages/document';

export const Router = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            // <Routes location={location} key={location.pathname}>
            <>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/document" element={<Doc />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
            </>
            // </Routes>
        )
    );
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}
