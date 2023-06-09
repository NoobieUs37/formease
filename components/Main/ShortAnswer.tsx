import { ChangeEvent, useState, useEffect } from "react"
import InputVariant1 from "../InputVariant1"
import { SideBoxLayout } from "./BoxLayout"
import Input from "../Input"
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"
import { useTheme } from "../ThemeProvider"
import { setCurrentTheme } from "../utility/themeValidation"
import RenderSwitch from "../switches/RenderSwitch"
import Cookie from "js-cookie"

interface ShortAnswerProps {
    index: string
    value: string
    required: boolean
    deleteQuestion: (id: string) => any
    isResearcher: boolean
}

function ShortAnswer({
    index,
    value,
    required,
    deleteQuestion,
    isResearcher
}: ShortAnswerProps) {
    const [isCheck, setCheck] = useState(required)
    const currentTheme = useTheme()
    const [, setThemeTextClass] = useState("text-purple-700")
    const [, setThemeBorderClass] = useState("border-purple-700")

    useEffect(() => {
        setCurrentTheme({
            currentTheme,
            setThemeTextClass,
            setThemeBorderClass
        })
    }, [currentTheme, setThemeBorderClass, setThemeTextClass])

    return (
        <SideBoxLayout>
            <span
                className="absolute z-10 top-2 sm:top-4 left-4 font-medium text-red-400"
                hidden={isCheck === false}
            >
                *
            </span>
            <div>
                <InputVariant1
                    isCheck={isCheck}
                    disabled={isResearcher === false}
                    index={index}
                    value={value}
                    type="text"
                    placeholder={isCheck ? "Question" : "Question (Optional)"}
                />
            </div>
            <div>
                <Input
                    disabled={false}
                    type="text"
                    placeholder="Yout answer"
                    size={"text-base"}
                    value={""}
                    handleChange={function (
                        e: ChangeEvent<HTMLInputElement>
                    ): void {
                        throw new Error("Function not implemented.")
                    }}
                />
            </div>
            <div className="text-right" hidden={isResearcher === false}>
                <span
                    className="cursor-pointer border-r-4 px-2"
                    onClick={() => deleteQuestion(index)}
                >
                    <DeleteOutlinedIcon className="text-gray-500 text-3xl" />
                </span>

                <span className="mx-2 px-2">
                    Required
                    <RenderSwitch
                        isCheck={isCheck}
                        setCheck={setCheck}
                        index={index}
                        currentTheme={currentTheme}
                    />
                </span>
            </div>
        </SideBoxLayout>
    )
}

export default ShortAnswer
