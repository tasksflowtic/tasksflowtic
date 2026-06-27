import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import FlightTakeoffRoundedIcon from '@mui/icons-material/FlightTakeoffRounded';
import WorkspacesRoundedIcon from '@mui/icons-material/WorkspacesRounded';

const categories = [
    { name: "Work", text: "#2563EB", bg: "#DBEAFE", icon: <WorkRoundedIcon sx={{ fontSize: 14 }} />},
    { name: "Personal", text: "#16A34A", bg: "#DCFCE7", icon: <PersonRoundedIcon sx={{ fontSize: 14 }}/>},
    { name: "Shopping", text: "#D97706", bg: "#FEF3C7", icon: <ShoppingCartRoundedIcon sx={{ fontSize: 14 }}/>},
    { name: "Study", text: "#7C3AED", bg: "#EDE9FE", icon: <MenuBookRoundedIcon sx={{ fontSize: 14 }}/>},
    { name: "Health", text: "#DC2626", bg: "#FEE2E2", icon: <FavoriteRoundedIcon sx={{ fontSize: 14 }}/>},
    { name: "Home", text: "#BE185D", bg: "#FCE7F3", icon: <HomeRoundedIcon sx={{ fontSize: 14 }}/>},
    { name: "Finance", text: "#065F46", bg: "#D1FAE5", icon: <AccountBalanceWalletRoundedIcon sx={{ fontSize: 14 }}/>},
    { name: "Travel", text: "#0EA5E9", bg: "#E0F2FE", icon: <FlightTakeoffRoundedIcon sx={{ fontSize: 14 }}/>},
    { name: "Others", text: "#374151", bg: "#F3F4F6", icon: <WorkspacesRoundedIcon sx={{ fontSize: 14 }}/>}
];

export default categories