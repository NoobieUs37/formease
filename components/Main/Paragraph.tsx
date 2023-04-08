import { ChangeEvent, useState, useEffect, useContext } from "react"
import InputVariant1 from "../InputVariant1"
import { SideBoxLayout } from "./BoxLayout"
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"
import Switch from "@mui/material/Switch"
import TextArea from "../TextArea"
import { ReducerContext } from "../FormStateProvider"

interface ParagraphProps {
    index: number
    value: string
    required: boolean
}

function Paragraph({ index, value, required }: ParagraphProps) {
    const [isCheck, setCheck] = useState(required)
    const dispatch = useContext(ReducerContext)
    const [color, setColor] = useState(() => {
        return isCheck ? "red" : "purple"
    })
    const [answer, setAnswer] = useState("")

    useEffect(() => {
        dispatch({
            type: "UPDATE_QUESTION",
            payload: {
                index: index,
                key: "required",
                value: isCheck,
            },
        })
    }, [isCheck, dispatch, index])

    useEffect(() => {
        dispatch({
            type: "UPDATE_QUESTION",
            payload: {
                index,
                key: "answers",
                value: answer,
            },
        })
    }, [answer, dispatch, index])

    function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
        setAnswer(event.target.value)
    }

    function deleteQuestion() {
        dispatch({ type: "DELETE_QUESTION", payload: { index } })
    }

    return (
        <SideBoxLayout color={color}>
            <div>
                <InputVariant1
                    index={index}
                    type="text"
                    value={value}
                    placeholder={isCheck ? "Question *" : "Question"}
                />
            </div>

            <div>
                <TextArea
                    placeholder="Your answer"
                    value={undefined}
                    onChange={handleChange}
                ></TextArea>
            </div>

            <div className="text-right">
                <span
                    className="cursor-pointer border-r-4 px-2"
                    onClick={deleteQuestion}
                >
                    <DeleteOutlinedIcon className="text-gray-500 text-3xl" />
                </span>

                <span className="mx-2 px-2">
                    Required
                    <Switch
                        checked={isCheck}
                        onClick={() => {
                            setCheck((prev) => !prev)
                            setColor((prevColor) => {
                                return prevColor === "purple" ? "red" : "purple"
                            })
                        }}
                        color="secondary"
                    />
                </span>
            </div>
        </SideBoxLayout>
    )
}

export default Paragraph
