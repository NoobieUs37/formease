import { alpha, styled } from "@mui/material/styles"
import { yellow } from "@mui/material/colors"
import Switch from "@mui/material/Switch"

const YellowSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
        color: yellow[800],
        "&:hover": {
            backgroundColor: alpha(
                yellow[800],
                theme.palette.action.hoverOpacity
            ),
        },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
        backgroundColor: yellow[800],
    },
}))

export default YellowSwitch
