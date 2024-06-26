// ChildContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface Child {
    childId: string;
    childName: string;
    parentName: string;
    parentEmail: string;
}

interface ChildContextType {
    child: Child | null;
    setChild: (child: Child | null) => void;
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

const ChildContext = createContext<ChildContextType | undefined>(undefined);

export const ChildProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [child, setChild] = useState<Child | null>(null);
    const [visible, setVisible] = useState(false);

    return (
        <ChildContext.Provider value={{ child, setChild, visible, setVisible }}>
            {children}
        </ChildContext.Provider>
    );
};

export const useChild = (): ChildContextType => {
    const context = useContext(ChildContext);
    if (context === undefined) {
        throw new Error('useChild must be used within a ChildProvider');
    }
    return context;
};
