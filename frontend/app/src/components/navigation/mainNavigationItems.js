import HomeIcon from '@mui/icons-material/Home';
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PaymentsIcon from "@mui/icons-material/Payments";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import ContactSupportOutlinedIcon from "@mui/icons-material/ContactSupportOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export const mainNavBarItems = {
  private: [
    {
      id: 0,
      icon: <AccountCircleRoundedIcon />,
      label: "Profile",
      route: "/profile",
    },
    {
      id: 1,
      icon: <HomeIcon />,
      label: "Home",
      route: "/home",
    },
    {
      id: 2,
      icon: <FormatListNumberedIcon />,
      label: "Categories",
      route: "/categories",
    },
    {
      id: 3,
      icon: <AccountBalanceIcon />,
      label: "Accounts",
      route: "/accounts",
    },
    {
      id: 4,
      icon: <ReceiptLongIcon />,
      label: "Expenses",
      route: "/expenses",
    },
    {
      id: 5,
      icon: <PaymentsIcon />,
      label: "Transfers",
      route: "/transfers",
    },
    {
      id: 6,
      icon: <AnalyticsIcon />,
      label: "Analysis",
      route: "/analysis",
    },
    {
      id: 7,
      icon: <FlagCircleIcon />,
      label: "Goals",
      route: "/goals",
    },
  ],
  public: [
    {
      id: 8,
      icon: <ArrowForwardIosIcon />,
      label: "Getting Started",
      route: "/guide",
    },
    {
      id: 9,
      icon: <ContactSupportOutlinedIcon />,
      label: "Support",
      route: "/guide",
    },
    {
      id: 10,
      icon: <EmailOutlinedIcon />,
      label: "Contact",
      route: "/guide",
    },
  ],
};
