import React, { createContext, useState, useContext, Dispatch, SetStateAction } from 'react';

interface iGlobalContextProps {
    isSearchOpen: boolean;
    setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
    toggleSearch: () => void;
    isInputFocused: boolean;
    setIsInputFocused: React.Dispatch<React.SetStateAction<boolean>>;
    currentRatingPopupId: string | null | undefined;
    setCurrentRatingPopupId: Dispatch<SetStateAction<string | null | undefined>>;
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
    // search bar =======================================================================================================
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isInputFocused, setIsInputFocused] = useState(false);

    const toggleSearch = () => {
        setIsSearchOpen((prev) => !prev);
        setIsInputFocused(true);
    };

    // rating popup =====================================================================================================
    const [currentRatingPopupId, setCurrentRatingPopupId] = useState<string | null | undefined>(null); 

    const contextValue: iGlobalContextProps = {
        isSearchOpen,
        setIsSearchOpen,
        toggleSearch,
        isInputFocused,
        setIsInputFocused,
        currentRatingPopupId,
        setCurrentRatingPopupId
    };

    return <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>;
};