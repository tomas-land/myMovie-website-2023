'use client';
import React, { createContext, useState, useContext } from 'react';
interface iGlobalContextProps {
    isSearchOpen: boolean;
    setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
    toggleSearch: () => void;
    isInputFocused: boolean;
    setIsInputFocused: React.Dispatch<React.SetStateAction<boolean>>;

}
const GlobalContext = createContext<iGlobalContextProps | undefined>(undefined);
export const useGlobalContext = (): iGlobalContextProps => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
};
export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isInputFocused, setIsInputFocused] = useState(false);

    const toggleSearch = () => {
        setIsSearchOpen((prev) => !prev);
        setIsInputFocused(true); // Set the state to focus the header search input
    };
    const contextValue: iGlobalContextProps = {
        isSearchOpen,
        setIsSearchOpen,
        toggleSearch,
        isInputFocused,
        setIsInputFocused,

    };
    return <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>;
};
