import CloseIcon from "@mui/icons-material/Close"
import { ChangeEvent, useContext, useEffect } from "react"
import { useState } from "react"
import { setCurrentTheme } from "../utility/themeValidation"
import { useTheme } from "../ThemeProvider"
import { ReducerContext } from "../FormStateProvider"

interface RadioButtonProps {
    index: string
    item: string
    handleChange: (event: ChangeEvent<HTMLInputElement>, index: number) => void
    id: number
    deleteItem: (id: number) => void
    isResearcher: boolean
}

function RadioButton({
    item,
    handleChange,
    index,
    id,
    deleteItem,
    isResearcher
}: RadioButtonProps) {
    const currentTheme = useTheme()
    const [themeAccentClass, setThemeAccentClass] =
        useState("accent-purple-700")
    const dispatch = useContext(ReducerContext)

    useEffect(() => {
        setCurrentTheme({
            currentTheme,
            setThemeAccentClass
        })
    }, [currentTheme])

    function handleClick(item: string) {
        dispatch({
            type: "UPDATE_QUESTION",
            payload: {
                index,
                key: "answer",
                value: item
            }
        })
    }

    return (
        <div className="flex items-center mb-5">
            <input
                type="radio"
                name={item}
                value={item}
                onClick={() => handleClick(item)}
                className={`w-5 h-5 ${themeAccentClass} cursor-pointer`}
            />
            <input
                type="text"
                value={item}
                onChange={(event) => handleChange(event, id)}
                disabled={isResearcher === false}
                className={`text-gray-700 mx-5 w-5/6 disabled:bg-white border-transparent border-b-2 focus:border-b-2 ${
                    isResearcher && "hover:border-gray-200"
                }   transition-colors duration-300 focus:outline-none`}
            />
            <div className="cursor-pointer" hidden={isResearcher === false}>
                <CloseIcon
                    className="text-gray-500"
                    onClick={() => deleteItem(id)}
                />
            </div>
        </div>
    )
}

export default RadioButton
