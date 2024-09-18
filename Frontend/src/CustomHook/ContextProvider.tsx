import { createContext , ReactNode, useContext , useState } from "react";

interface StateContextType {
    user: string | null;
    setUser: React.Dispatch<React.SetStateAction<string | null>>;
  }


const StateContext = createContext<StateContextType | null>(null);

interface ContextProviderProps {
    children: ReactNode;  
  }

export const ContextProvider : React.FC<ContextProviderProps> = ({children} : any) =>{
    
    const[user,setUser] = useState<string | null>(null)


    return(
        <StateContext.Provider
            value ={{
                user,
                setUser
            }}>
            {children}


        </StateContext.Provider>
    )

}

export const useStateContext = () : StateContextType => {
    const context = useContext(StateContext);

    if( context === null){
        throw new Error('UseStateContext is empty');
    }
    
    return context;

}
